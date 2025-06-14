<template>
  <div class="p-4 md:p-6 max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Word Explorer</h1>
    
    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="w-full md:w-48">
        <span class="p-float-label">
          <Dropdown 
            v-model="selectedPart" 
            :options="partsOfSpeechTypes" 
            optionLabel="name" 
            optionValue="value"
            class="w-full"
            :showClear="true"
          />
          <label>Filter by Type</label>
        </span>
      </div>
      
      <span class="p-float-label flex-1">
        <InputText 
          id="search" 
          v-model="search" 
          class="w-full"
        />
        <label for="search">Search words or translations</label>
      </span>
    </div>

    <!-- Word Table -->
    <div class="card">
      <DataTable 
        :value="filteredWords" 
        :paginator="true" 
        :rows="10"
        :rowsPerPageOptions="[5,10,25,50]"
        tableStyle="min-width: 50rem" 
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} words"
        class="p-datatable-sm"
        stripedRows
      >
        <Column field="id" header="ID" style="width: 5%"></Column>
        <Column field="word" header="Word" sortable>
          <template #body="{ data }">
            <span class="font-semibold text-primary-700 dark:text-primary-400">{{ data.word }}</span>
          </template>
        </Column>
        <Column field="translation" header="Translation" sortable></Column>
        <Column field="partsOfSpeech" header="Part of Speech" sortable>
          <template #body="{ data }">
            <Tag :value="data.partsOfSpeech" :severity="getSeverity(data.partsOfSpeech)" />
          </template>
        </Column>
        <template #empty>
          <div class="p-4 text-center text-gray-500">
            <i class="pi pi-search text-3xl mb-2 block"></i>
            <p>No matching words found.</p>
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { words } from '../utils/words';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Tag from 'primevue/tag';

// 📚 Combine all words into one list
const allWords = words;

// 🎯 Filtering state
const selectedPart = ref('');
const search = ref('');
  
// 🧠 Unique parts of speech with labels
const partsOfSpeechTypes = computed(() => {
  const types = new Set(allWords.map((w) => w.partsOfSpeech));
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
  return allWords
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
</script>

<style scoped>
:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: var(--surface-50);
  color: var(--surface-700);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 0.75rem 1rem;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background-color: var(--surface-50);
  transition: background-color 0.2s;
}

:deep(.p-paginator) {
  background: transparent;
  border: none;
  padding: 1rem 0;
}

:deep(.p-inputtext) {
  width: 100%;
}

:deep(.p-dropdown) {
  width: 100%;
}

@media (max-width: 640px) {
  :deep(.p-datatable .p-datatable-thead > tr > th,
  .p-datatable .p-datatable-tbody > tr > td) {
    padding: 0.5rem;
  }
}
</style>