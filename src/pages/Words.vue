<template>
  <div class="p-4 md:p-6 max-w-6xl mx-auto">
    <!-- Hero Section -->
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">তুর্কি শব্দ এক্সপ্লোরার</h1>
      <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        অনুবাদ, উচ্চারণ ও উদাহরণসহ তুর্কি শব্দ আবিষ্কার ও শিখুন।
      </p>
    </div>
    
    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-8 border border-gray-100 dark:border-gray-700">
      <div class="flex flex-col md:flex-row gap-4 items-end">
        <div class="w-full md:w-56">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ধরন অনুযায়ী ফিল্টার করুন</label>
          <Dropdown 
            v-model="selectedPart" 
            :options="partsOfSpeechTypes" 
            optionLabel="name" 
            optionValue="value"
            class="w-full"
            :showClear="true"
            :pt="{
              root: { class: 'w-full' },
              input: { class: 'w-full' }
            }"
          />
        </div>
        
        <div class="flex-1 w-full">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">শব্দ অনুসন্ধান করুন</label>
          <div class="relative w-full">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <i class="pi pi-search text-gray-400" />
            </span>
            <InputText 
              id="search" 
              v-model="search" 
              class="w-full pl-10 pr-3 py-2 rounded border border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring focus:ring-primary-200 dark:bg-gray-900 dark:text-gray-100 transition"
              placeholder="শব্দ বা অনুবাদ দিয়ে অনুসন্ধান করুন..."
              autocomplete="off"
              inputmode="text"
              lang="tr"
              @focus="setTurkishKeyboard"
            />
          </div>
        </div>
        
        <div class="w-full md:w-auto">
          <Button 
            label="ফিল্টার রিসেট করুন" 
            icon="pi pi-refresh" 
            class="p-button-outlined w-full"
            @click="resetFilters"
          />
        </div>
      </div>
      
      <!-- Active Filters -->
      <div v-if="selectedPart || search" class="flex flex-wrap gap-2 mt-3">
        <Tag 
          v-if="selectedPart" 
          :value="'ধরন: ' + partsOfSpeechTypes.find(t => t.value === selectedPart)?.name" 
          icon="pi pi-tag" 
          severity="info"
          @click="selectedPart = ''"
          class="cursor-pointer hover:opacity-80 transition-opacity"
        />
        <Tag 
          v-if="search" 
          :value="'অনুসন্ধান: ' + search" 
          icon="pi pi-search" 
          severity="success"
          @click="search = ''"
          class="cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>
    </div>

    <!-- Word Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
      <DataTable 
        :value="filteredWords" 
        :paginator="true" 
        :rows="10"
        :rowsPerPageOptions="[10,25,50]"
        :loading="loading"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} words"
        class="p-datatable-sm"
        responsiveLayout="scroll"
        stripedRows
        :pt="{
          wrapper: { class: 'border-0' },
          thead: { class: 'bg-gray-50 dark:bg-gray-700' },
          paginator: { class: 'bg-transparent border-t border-gray-100 dark:border-gray-700 px-4 py-3' },
          emptyMessage: { class: 'p-6' }
        }"
      >
        <template #header>
          <div class="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">শব্দ তালিকা</h2>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ filteredWords.length }} {{ filteredWords.length === 1 ? 'শব্দ' : 'শব্দ' }} পাওয়া গেছে
            </div>
          </div>
        </template>
        
        <!-- Remove the ID column from the DataTable -->
        <!-- <Column field="id" header="#" style="width: 60px">
          <template #body="{ data }">
            <div class="text-center text-gray-500 dark:text-gray-400 text-sm">
              {{ data.id }}
            </div>
          </template>
        </Column> -->
        
        <Column field="word" header="শব্দ" sortable style="min-width: 180px">
          <template #body="{ data }">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2 group">
                <span class="font-semibold text-primary-600 dark:text-primary-400">{{ data.word }}</span>
                <Button 
                  icon="pi pi-volume-up" 
                  class="p-button-text p-button-sm p-button-rounded p-button-secondary" 
                  @click="playAudio(data.word)"
                  v-tooltip.top="'Listen pronunciation'"
                />
                <Button
                  v-if="speechSupported"
                  :icon="isListening && speakingWord === data.word ? 'pi pi-spin pi-microphone' : 'pi pi-microphone'"
                  class="p-button-text p-button-sm p-button-rounded p-button-help"
                  @click="speakAndCompare(data.word)"
                  :disabled="isListening && speakingWord === data.word"
                  v-tooltip.top="'Speak & Compare'"
                />
              </div>
              <div v-if="isListening && speakingWord === data.word" class="text-xs text-blue-600 dark:text-blue-300 mt-1">Listening...</div>
              <div v-else-if="lastSpokenResult && lastSpokenResult.word === data.word" class="text-xs mt-1" :class="lastSpokenResult.success ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                <template v-if="lastSpokenResult.success">
                  <i class="pi pi-check-circle mr-1"></i>Correct! You said: "{{ lastSpokenResult.transcript }}"
                </template>
                <template v-else>
                  <i class="pi pi-times-circle mr-1"></i>Incorrect. You said: "{{ lastSpokenResult.transcript }}"
                </template>
              </div>
            </div>
          </template>
        </Column>
        
        <Column field="translation" header="অনুবাদ" sortable>
          <template #body="{ data }">
            <div class="flex items-center justify-between">
              <span>{{ data.translation }}</span>
              <Button 
                icon="pi pi-copy" 
                class="p-button-text p-button-sm p-button-rounded p-button-secondary opacity-0 group-hover:opacity-100 transition-opacity" 
                @click="copyToClipboard(data.translation)"
                v-tooltip.top="'Copy to clipboard'"
              />
            </div>
          </template>
        </Column>
        
        <Column field="partsOfSpeech" header="শব্দের ধরন" sortable style="width: 160px">
          <template #body="{ data }">
            <Tag 
              :value="data.partsOfSpeech" 
              :severity="getSeverity(data.partsOfSpeech)" 
              :pt="{
                root: { class: 'px-3 py-1 text-xs font-medium' }
              }"
            />
          </template>
        </Column>
        
        <template #empty>
          <div class="flex flex-col items-center justify-center p-8 text-center">
            <img 
              src="https://www.primefaces.org/cdn/primevue/images/empty-illustration.svg" 
              alt="No results" 
              class="w-40 h-40 mb-4 opacity-50"
            />
            <h3 class="text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">কোনো শব্দ পাওয়া যায়নি</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">
              {{ search || selectedPart ? 'অনুগ্রহ করে আপনার অনুসন্ধান বা ফিল্টার পরিবর্তন করুন' : 'কোনো শব্দ নেই' }}
            </p>
            <Button 
              v-if="search || selectedPart"
              label="ফিল্টার ক্লিয়ার করুন" 
              icon="pi pi-times" 
              class="p-button-text"
              @click="resetFilters"
            />
          </div>
        </template>
        
        <template #loading>
          <div class="flex items-center justify-center p-8">
            <ProgressSpinner style="width: 50px; height: 50px" />
          </div>
        </template>
        
        <!-- Removed invalid global body slot. Use per-column body slots instead. -->
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { words } from '../utils/words';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import { useTurkishSpeakerStore } from '../stores/turkishSpeaker';

const turkishSpeaker = useTurkishSpeakerStore();
const toast = useToast();
const loading = ref(false);

// Filtering state
const selectedPart = ref('');
const search = ref('');

// Reset all filters
const resetFilters = () => {
  selectedPart.value = '';
  search.value = '';
};

// Play audio for word pronunciation (now uses Turkish speaker store)
const playAudio = (word: string) => {
  turkishSpeaker.speak(word);
};

// Copy text to clipboard
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.add({
      severity: 'success',
      summary: 'Copied!',
      detail: 'Text copied to clipboard',
      life: 2000
    });
  } catch (err) {
    console.error('Failed to copy text: ', err);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to copy text',
      life: 3000
    });
  }
};
  
// 🧠 Unique parts of speech with labels
const partsOfSpeechTypes = computed(() => {
  const types = new Set(words.map((w) => w.partsOfSpeech));
  return [
    { name: 'All Types', value: '' },
    ...Array.from(types).map(type => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: type
    }))
  ];
});

// Get severity for tag based on part of speech
const getSeverity = (type: string) => {
  switch (type.toLowerCase()) {
    case 'noun': return 'primary';
    case 'verb': return 'success';
    case 'adjective': return 'info';
    case 'adverb': return 'warning';
    case 'pronoun': return 'danger';
    case 'preposition': return 'help';
    default: return 'secondary';
  }
};
  
// 🔍 Filtered list
const filteredWords = computed(() => {
  return words
    .filter((w) => selectedPart.value ? w.partsOfSpeech === selectedPart.value : true)
    .filter((w) => {
      const term = search.value.toLowerCase();
      return (
        w.word.toLowerCase().includes(term) ||
        w.translation.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => Number(a.id) - Number(b.id));
});

// --- Speech Recognition Support ---
const speechSupported = typeof window !== 'undefined' && (
  'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
);
let recognition: any = null;
if (speechSupported) {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'tr-TR';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
}
const isListening = ref(false);
const speakingWord = ref('');
const lastSpokenResult = ref<{ word: string; transcript: string; success: boolean } | null>(null);

const speakAndCompare = (word: string) => {
  if (!speechSupported || !recognition) {
    toast.add({
      severity: 'warn',
      summary: 'Not supported',
      detail: 'Speech recognition is not supported in your browser.',
      life: 3000
    });
    return;
  }
  speakingWord.value = word;
  isListening.value = true;
  lastSpokenResult.value = null;
  recognition.start();
  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript.trim();
    isListening.value = false;
    speakingWord.value = '';
    // Compare ignoring diacritics and case
    const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
    const success = normalize(transcript) === normalize(word);
    lastSpokenResult.value = { word, transcript, success };
    if (success) {
      toast.add({
        severity: 'success',
        summary: 'Correct!',
        detail: `You pronounced "${word}" correctly!`,
        life: 2500
      });
    } else {
      toast.add({
        severity: 'error',
        summary: 'Try Again',
        detail: `You said: "${transcript}". Correct: "${word}"`,
        life: 3500
      });
    }
  };
  recognition.onerror = (event: any) => {
    isListening.value = false;
    speakingWord.value = '';
    lastSpokenResult.value = null;
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: event.error || 'Something went wrong.',
      life: 3000
    });
  };
  recognition.onend = () => {
    isListening.value = false;
    speakingWord.value = '';
  };
};

// Set Turkish keyboard layout if possible
const setTurkishKeyboard = (e: Event) => {
  const input = e.target as HTMLInputElement;
  // Set lang attribute for virtual keyboard support
  input.setAttribute('lang', 'tr');
  // Optionally, set inputmode if needed
  input.setAttribute('inputmode', 'text');
};
</script>

<style scoped>
:deep(.p-datatable .p-datatable-thead > tr > th) {
  @apply bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700;
  padding: 0.75rem 1rem;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  @apply border-b border-gray-100 dark:border-gray-700;
  padding: 1rem;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  @apply transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700/50;
}

:deep(.p-paginator) {
  @apply bg-transparent border-0 px-6 py-4;
}

:deep(.p-paginator-current) {
  @apply text-gray-600 dark:text-gray-300 text-sm;
}

:deep(.p-paginator-rpp-options) {
  @apply text-sm;
}

:deep(.p-inputtext) {
  @apply w-full text-sm;
}

:deep(.p-dropdown) {
  @apply w-full;
}

:deep(.p-tag) {
  @apply text-xs font-medium px-3 py-1;
}

:deep(.p-button.p-button-sm) {
  @apply w-8 h-8;
}

:deep(.p-button.p-button-text) {
  @apply text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400;
}

@media (max-width: 768px) {
  :deep(.p-datatable .p-datatable-thead > tr > th,
  .p-datatable .p-datatable-tbody > tr > td) {
    @apply px-3 py-2 text-sm;
  }
  
  :deep(.p-datatable .p-datatable-header) {
    @apply p-3;
  }
}

/* Dark mode adjustments */
:deep(.p-datatable .p-sortable-column:not(.p-highlight):hover) {
  @apply bg-gray-700 text-gray-200;
}

:deep(.p-datatable .p-sortable-column.p-highlight) {
  @apply bg-primary-500/10 text-primary-600 dark:text-primary-400;
}

:deep(.p-datatable .p-sortable-column:focus) {
  @apply shadow-none;
}
</style>