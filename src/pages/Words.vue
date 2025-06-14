<template>




































    <div class="p-6 max-w-5xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Word Explorer</h1>
  
      <!-- Filters -->
      <div class="flex flex-wrap gap-4 mb-6">
        <select v-model="selectedPart" class="border rounded p-2">
          <option value="">All Types</option>
          <option
            v-for="type in partsOfSpeechTypes"
            :key="type"
            :value="type"
          >
            {{ type }}
          </option>
        </select>
  
        <input
          v-model="search"
          type="text"
          placeholder="Search word or translation..."
          class="border rounded p-2 flex-1"
        />
      </div>
  
      <!-- Word Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full border text-left">
          <thead class="bg-gray-100">
            <tr>
              <th class="border p-2">ID</th>
              <th class="border p-2">Word</th>
              <th class="border p-2">Translation</th>
              <th class="border p-2">Part of Speech</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="word in filteredWords"
              :key="word.id"
              class="hover:bg-gray-50"
            >
              <td class="border p-2">{{ word.id }}</td>
              <td class="border p-2 font-semibold">{{ word.word }}</td>
              <td class="border p-2">{{ word.translation }}</td>
              <td class="border p-2 italic">{{ word.partsOfSpeech }}</td>
            </tr>
          </tbody>
        </table>
  
        <p v-if="filteredWords.length === 0" class="mt-4 text-gray-500">
          No matching words found.
        </p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed } from 'vue'
import { words } from '../utils/words';
  

  
  // 📚 Combine all words into one list
  const allWords = words

  // 🎯 Filtering state
  const selectedPart = ref('')
  const search = ref('')
  
  // 🧠 Unique parts of speech
  const partsOfSpeechTypes = computed(() => {
    const types = new Set(allWords.map((w) => w.partsOfSpeech))
    return Array.from(types)
  })
  
  // 🔍 Filtered list
  const filteredWords = computed(() => {
    return allWords
      .filter((w) =>
        selectedPart.value ? w.partsOfSpeech === selectedPart.value : true
      )
      .filter((w) => {
        const term = search.value.toLowerCase()
        return (
          w.word.toLowerCase().includes(term) ||
          w.translation.toLowerCase().includes(term)
        )
      })
      .sort((a, b) => a.id - b.id)
  })
  </script>
  
  <style scoped>
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th,
  td {
    border: 1px solid #ddd;
  }
  </style>
  