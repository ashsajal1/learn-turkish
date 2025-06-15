<template>
  <div class="p-4 md:p-6 max-w-6xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">Turkish Parts of Speech Usage</h1>
      <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Explore example sentences for all types of Turkish parts of speech. Filter by type or search for a word ("ara").
      </p>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-8 border border-gray-100 dark:border-gray-700">
      <div class="flex flex-col md:flex-row gap-4 items-end">
        <div class="w-full md:w-56">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter by Type</label>
          <Dropdown 
            v-model="selectedPart" 
            :options="partsOfSpeechTypes" 
            optionLabel="name" 
            optionValue="value"
            class="w-full"
            :showClear="true"
          />
        </div>
        <div class="flex-1 w-full">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search ("ara")</label>
          <span class="p-input-icon-left w-full">
            <i class="pi pi-search text-gray-400" />
            <InputText 
              v-model="search" 
              class="w-full"
              placeholder="Search Turkish or Bengali..."
            />
          </span>
        </div>
        <div class="w-full md:w-auto">
          <Button 
            label="Reset Filters" 
            icon="pi pi-refresh" 
            class="p-button-outlined w-full"
            @click="resetFilters"
          />
        </div>
      </div>
    </div>

    <!-- Usage Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
      <DataTable 
        :value="filteredUsages" 
        :paginator="true" 
        :rows="10"
        :rowsPerPageOptions="[10,25,50]"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} usages"
        class="p-datatable-sm"
        responsiveLayout="scroll"
        stripedRows
      >
        <template #header>
          <div class="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Usage Examples</h2>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ filteredUsages.length }} {{ filteredUsages.length === 1 ? 'usage' : 'usages' }} found
            </div>
          </div>
        </template>
        <Column field="type" header="Type" style="width: 120px">
          <template #body="{ data }">
            <Tag :value="data.type" :severity="getSeverity(data.type)" />
          </template>
        </Column>
        <Column field="turkish" header="Turkish" style="min-width: 180px">
          <template #body="{ data }">
            <span class="font-semibold text-primary-600 dark:text-primary-400">{{ data.turkish }}</span>
          </template>
        </Column>
        <Column field="bengali" header="Bengali" style="min-width: 180px">
          <template #body="{ data }">
            <span>{{ data.bengali }}</span>
          </template>
        </Column>
        <Column field="example" header="Example Sentence" style="min-width: 260px">
          <template #body="{ data }">
            <span>{{ data.example }}</span>
          </template>
        </Column>
        <template #empty>
          <div class="flex flex-col items-center justify-center p-8 text-center">
            <h3 class="text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">No usages found</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">
              {{ search || selectedPart ? 'Try adjusting your search or filter' : 'No usages available' }}
            </p>
            <Button 
              v-if="search || selectedPart"
              label="Clear filters" 
              icon="pi pi-times" 
              class="p-button-text"
              @click="resetFilters"
            />
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Tag from 'primevue/tag';
import Button from 'primevue/button';

// Example data for all parts of speech
const usages = [
  { type: 'noun', turkish: 'ev', bengali: 'বাড়ি', example: 'Benim bir evim var. (I have a house.)' },
  { type: 'verb', turkish: 'gitmek', bengali: 'যাওয়া', example: 'Okula gitmek istiyorum. (I want to go to school.)' },
  { type: 'adjective', turkish: 'güzel', bengali: 'সুন্দর', example: 'Bu çiçek çok güzel. (This flower is very beautiful.)' },
  { type: 'adverb', turkish: 'hızlıca', bengali: 'দ্রুত', example: 'O hızlıca koştu. (He ran quickly.)' },
  { type: 'pronoun', turkish: 'o', bengali: 'সে', example: 'O bugün gelmedi. (He/She did not come today.)' },
  { type: 'preposition', turkish: 'ile', bengali: 'সাথে', example: 'Annem ile pazara gittim. (I went to the market with my mother.)' },
  { type: 'conjunction', turkish: 've', bengali: 'এবং', example: 'Ali ve Ayşe arkadaş. (Ali and Ayşe are friends.)' },
  { type: 'interjection', turkish: 'Aman!', bengali: 'আহা!', example: 'Aman! Çok sıcak. (Oh! It is very hot.)' },
  // Add more examples as needed
];

const selectedPart = ref('');
const search = ref('');

const resetFilters = () => {
  selectedPart.value = '';
  search.value = '';
};

const partsOfSpeechTypes = computed(() => {
  const types = Array.from(new Set(usages.map(u => u.type)));
  return [
    { name: 'All Types', value: '' },
    ...types.map(type => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: type
    }))
  ];
});

const getSeverity = (type: string) => {
  switch (type.toLowerCase()) {
    case 'noun': return 'primary';
    case 'verb': return 'success';
    case 'adjective': return 'info';
    case 'adverb': return 'warning';
    case 'pronoun': return 'danger';
    case 'preposition': return 'help';
    case 'conjunction': return 'secondary';
    case 'interjection': return 'contrast';
    default: return 'secondary';
  }
};

const filteredUsages = computed(() => {
  return usages
    .filter(u => selectedPart.value ? u.type === selectedPart.value : true)
    .filter(u => {
      const term = search.value.toLowerCase();
      return (
        u.turkish.toLowerCase().includes(term) ||
        u.bengali.toLowerCase().includes(term) ||
        u.example.toLowerCase().includes(term)
      );
    });
});
</script>
