<template>
  <div class="max-w-xl mx-auto py-10 px-4">
    <div class="flex items-center mb-6">
      <!-- Turkish Crescent Logo -->
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-3">
        <circle cx="20" cy="20" r="20" fill="#e30a17"/>
        <path d="M27.5 20c0 4.142-3.358 7.5-7.5 7.5s-7.5-3.358-7.5-7.5 3.358-7.5 7.5-7.5c1.13 0 2.2.24 3.16.67A6 6 0 1 0 27.5 20z" fill="#fff"/>
        <circle cx="26.5" cy="20" r="2.5" fill="#fff"/>
      </svg>
      <h1 class="text-3xl font-bold text-blue-700 dark:text-blue-300">Speak Test</h1>
    </div>
    <p class="mb-4 text-gray-700 dark:text-gray-200">
      Test your Turkish pronunciation! Click the microphone, say the word, and see if you pronounced it correctly.
    </p>
    <div class="flex flex-col items-center space-y-4">
      <div class="text-2xl font-semibold">{{ currentWord }}</div>
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full flex items-center focus:outline-none focus:ring-2 focus:ring-blue-400"
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
      <div v-if="result" class="mt-2 text-lg">
        <span :class="result === 'Correct!' ? 'text-green-600' : 'text-red-600'">{{ result }}</span>
      </div>
      <button
        class="mt-4 text-sm text-blue-600 hover:underline"
        @click="nextWord"
      >Next Word</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Extend the Window interface to include SpeechRecognition and webkitSpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const words = [
  'merhaba',
  'teşekkürler',
  'güle güle',
  'evet',
  'hayır',
  'lütfen',
  'günaydın',
  'iyi akşamlar',
  'nasılsın',
  'hoşça kal'
];

const currentIndex = ref(0);
const currentWord = ref(words[currentIndex.value]);
const isListening = ref(false);
const result = ref('');
// TypeScript compatibility for SpeechRecognition
type SpeechRecognitionType = typeof window.SpeechRecognition extends undefined
  ? typeof window.webkitSpeechRecognition
  : typeof window.SpeechRecognition;

let recognition: InstanceType<SpeechRecognitionType> | null = null;

function nextWord() {
  currentIndex.value = (currentIndex.value + 1) % words.length;
  currentWord.value = words[currentIndex.value];
  result.value = '';
}

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
