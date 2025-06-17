<template>
  <div class="max-w-xl mx-auto py-10 px-2 sm:px-4">
    <div class="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 sm:p-10 flex flex-col gap-6">
      <div class="flex items-center mb-2">
        <!-- Turkish Crescent Logo -->
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-3">
          <circle cx="20" cy="20" r="20" fill="#e30a17"/>
          <path d="M27.5 20c0 4.142-3.358 7.5-7.5 7.5s-7.5-3.358-7.5-7.5 3.358-7.5 7.5-7.5c1.13 0 2.2.24 3.16.67A6 6 0 1 0 27.5 20z" fill="#fff"/>
          <circle cx="26.5" cy="20" r="2.5" fill="#fff"/>
        </svg>
        <h1 class="text-3xl font-bold text-blue-700 dark:text-blue-300">Speak Test</h1>
      </div>
      <p class="mb-2 text-gray-700 dark:text-gray-200">
        Test your Turkish pronunciation! Select a part of speech, get 10 random words, and try to pronounce them.
      </p>
      <div class="mb-2 flex flex-wrap gap-2 items-center">
        <label class="font-medium mr-2">Part of Speech:</label>
        <select v-model="selectedPart" class="border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-400">
          <option value="all">All</option>
          <option v-for="part in partsOfSpeech" :key="part" :value="part">{{ part }}</option>
        </select>
        <button class="ml-2 text-sm text-blue-600 hover:underline" @click="getRandomWords">New Set</button>
      </div>
      <div class="flex flex-col items-center space-y-4">
        <div class="w-full flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>Word {{ currentIndex + 1 }} / {{ randomWords.length || 10 }}</span>
          <button class="text-xs text-gray-400 hover:text-blue-500 transition" @click="getRandomWords" title="Restart">
            <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582M20 20v-5h-.581M5.582 9A7.978 7.978 0 0 1 12 4c2.21 0 4.21.896 5.657 2.343M18.418 15A7.978 7.978 0 0 1 12 20a7.978 7.978 0 0 1-5.657-2.343"/></svg>
            Restart
          </button>
        </div>
        <div class="text-2xl font-semibold bg-blue-50 dark:bg-blue-950 px-6 py-3 rounded-lg shadow-inner min-h-[3rem] flex items-center justify-center w-full">
          {{ currentWord }}
        </div>
        <div class="flex gap-2 flex-wrap justify-center">
          <button
            class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex items-center focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition"
            @click="playWord"
            :aria-label="`Play ${currentWord}`"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v18l15-9-15-9z" />
            </svg>
            Play
          </button>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full flex items-center focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
            @click="startRecognition"
            :disabled="isListening"
          >
            <svg v-if="!isListening" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18v2m0 0a4 4 0 0 0 4-4h-8a4 4 0 0 0 4 4zm0-2V6a4 4 0 1 0-8 0v6a4 4 0 0 0 8 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mr-2 animate-pulse">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18v2m0 0a4 4 0 0 0 4-4h-8a4 4 0 0 0 4 4zm0-2V6a4 4 0 1 0-8 0v6a4 4 0 0 0 8 0z" />
            </svg>
            {{ isListening ? 'Listening...' : 'Start Speaking' }}
          </button>
        </div>
        <div v-if="result" class="mt-2 text-lg flex items-center gap-2">
          <span v-if="result === 'Correct!'" class="text-green-600 flex items-center">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            {{ result }}
          </span>
          <span v-else class="text-red-600 flex items-center">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            {{ result }}
          </span>
        </div>
        <button
          class="mt-2 text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1 transition"
          @click="nextWord"
        >Next Word</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { getRandomWordsByPart } from '../utils/words';

const partsOfSpeech = [
  'Noun', 'Verb', 'Adjective', 'Adverb', 'Conjunction', 'Interjection', 'Pronoun', 'Preposition'
];
const selectedPart = ref('all');
const randomWords = ref<any[]>([]);
const currentIndex = ref(0);
const currentWord = computed(() => randomWords.value.length ? randomWords.value[currentIndex.value].word : '');
const isListening = ref(false);
const result = ref('');

function getRandomWords() {
  randomWords.value = getRandomWordsByPart(selectedPart.value, 10);
  currentIndex.value = 0;
  result.value = '';
}

function nextWord() {
  if (randomWords.value.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % randomWords.value.length;
  result.value = '';
}

// Speech Recognition
let recognition: any = null;
function startRecognition() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Speech Recognition is not supported in this browser.');
    return;
  }
  const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  recognition = new SpeechRecognitionClass();
  recognition.lang = 'tr-TR';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  isListening.value = true;
  result.value = '';

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    if (transcript === currentWord.value.toLowerCase()) {
      result.value = 'Correct!';
    } else {
      result.value = `You said: "${transcript}"`;
    }
    isListening.value = false;
  };
  recognition.onerror = () => {
    result.value = 'Could not recognize. Try again!';
    isListening.value = false;
  };
  recognition.onend = () => {
    isListening.value = false;
  };
  recognition.start();
}

function playWord() {
  if (!currentWord.value) return;
  const utter = new window.SpeechSynthesisUtterance(currentWord.value);
  utter.lang = 'tr-TR';
  window.speechSynthesis.speak(utter);
}

// Initialize with 10 random words and play the first word automatically
getRandomWords();
setTimeout(() => {
  playWord();
}, 500);
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
