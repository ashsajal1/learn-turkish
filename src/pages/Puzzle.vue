<template>
  <div class="puzzle-container p-4 md:p-6 max-w-4xl mx-auto">
    <!-- Game Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Turkish-Bengali Word Match</h1>
      <p class="text-gray-600 dark:text-gray-400">Match the Turkish words with their Bengali translations</p>
      
      <div class="flex justify-center items-center gap-4 mt-4">
        <div class="flex items-center">
          <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
          <span class="text-sm">Matched</span>
        </div>
        <div class="flex items-center">
          <span class="w-4 h-4 bg-blue-100 dark:bg-blue-900 rounded-full border border-blue-500 mr-2"></span>
          <span class="text-sm">Selected</span>
        </div>
        <Button 
          label="New Game" 
          icon="pi pi-refresh" 
          @click="startNewGame" 
          class="p-button-text p-button-sm"
        />
      </div>
    </div>

    <!-- Game Board -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Turkish Words Column -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h2 class="text-xl font-semibold mb-4 text-center text-blue-600 dark:text-blue-400">Turkish Words</h2>
        <div class="space-y-3">
          <div 
            v-for="(word, index) in turkishWords" 
            :key="'turkish-' + index"
            @click="selectWord('turkish', index)"
            class="p-3 rounded-lg border-2 transition-all cursor-pointer select-none"
            :class="getWordClasses('turkish', index)"
          >
            {{ word.word }}
          </div>
        </div>
      </div>

      <!-- Bengali Translations Column -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h2 class="text-xl font-semibold mb-4 text-center text-green-600 dark:text-green-400">Bengali Translations</h2>
        <div class="space-y-3">
          <div 
            v-for="(word, index) in shuffledBengaliWords" 
            :key="'bengali-' + index"
            @click="selectWord('bengali', index)"
            class="p-3 rounded-lg border-2 transition-all cursor-pointer select-none"
            :class="getWordClasses('bengali', index)"
          >
            {{ word.translation }}
          </div>
        </div>
      </div>
    </div>

    <!-- Game Status -->
    <div class="text-center">
      <div v-if="!gameComplete" class="text-lg font-medium mb-4">
        Matches: <span class="font-bold">{{ matches.length / 2 }}</span> / {{ turkishWords.length }}
      </div>
      
      <div v-if="gameComplete" class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg mb-6">
        <div class="text-4xl mb-2">🎉</div>
        <h3 class="text-2xl font-bold mb-2">Congratulations!</h3>
        <p class="mb-4">You've matched all the words correctly!</p>
        <Button 
          label="Play Again" 
          icon="pi pi-refresh" 
          @click="startNewGame" 
          class="p-button-success"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { words } from '../utils/words';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

// Game state
const gameComplete = ref(false);
const selectedWords = ref<{type: 'turkish' | 'bengali', index: number}[]>([]);
const matches = ref<number[]>([]);
const incorrectSelection = ref(false);
const turkishWords = ref<{word: string, index: number}[]>([]);
const bengaliWords = ref<{translation: string, index: number}[]>([]);
const shuffledBengaliWords = ref<{translation: string, index: number}[]>([]);

// Number of word pairs to use in the game (adjust as needed)
const wordCount = 8;

// Get word classes based on selection and match state
const getWordClasses = (type: 'turkish' | 'bengali', index: number) => {
  const isSelected = selectedWords.value.some(sw => sw.type === type && sw.index === index);
  
  // Get the correct word object based on type and whether it's shuffled
  const wordObj = type === 'turkish' 
    ? turkishWords.value[index]
    : shuffledBengaliWords.value[index];
  
  const isMatched = matches.value.includes(wordObj.index);
  const isIncorrect = incorrectSelection.value && isSelected;
  
  return {
    'bg-blue-100 dark:bg-blue-900 border-blue-500': isSelected && !isMatched && !isIncorrect,
    'bg-green-100 dark:bg-green-900 border-green-500': isMatched,
    'bg-red-100 dark:bg-red-900 border-red-500': isIncorrect,
    'hover:bg-gray-100 dark:hover:bg-gray-700': !isSelected && !isMatched,
    'border-gray-200 dark:border-gray-600': !isSelected && !isMatched && !isIncorrect,
    'opacity-50': isMatched,
    'cursor-default': isMatched,
  };
};

// Check if two selected words match
const checkMatch = () => {
  if (selectedWords.value.length !== 2) return;

  const [first, second] = selectedWords.value;

  // Get the full word objects for the selected items
  const firstWordObject = first.type === 'turkish'
    ? turkishWords.value[first.index]
    : shuffledBengaliWords.value[first.index];

  const secondWordObject = second.type === 'turkish'
    ? turkishWords.value[second.index]
    : shuffledBengaliWords.value[second.index];

  // If the original indices match and they're from different columns, it's a match
  if (firstWordObject.index === secondWordObject.index && first.type !== second.type) {
    matches.value.push(firstWordObject.index);
    
    // Clear selection immediately for correct matches
    selectedWords.value = [];
    
    // Check if all words are matched
    if (matches.value.length === wordCount) {
      gameComplete.value = true;
      toast.add({
        severity: 'success',
        summary: 'Congratulations!',
        detail: 'You\'ve matched all the words!',
        life: 3000
      });
    } else {
      toast.add({
        severity: 'success',
        summary: 'Good job!',
        detail: 'You found a match!',
        life: 1000
      });
    }
  } else {
    // Show incorrect match feedback
    incorrectSelection.value = true;
    
    toast.add({
      severity: 'warn',
      summary: 'No match',
      detail: 'Try again!',
      life: 1000
    });
    
    // Clear selection and reset incorrect state after a delay
    setTimeout(() => {
      selectedWords.value = [];
      incorrectSelection.value = false;
    }, 1000);
  }
};

// Handle word selection
const selectWord = (type: 'turkish' | 'bengali', index: number) => {
  // Don't allow selecting during incorrect selection feedback
  if (incorrectSelection.value) return;
  
  // Don't allow selecting already matched words
  const wordObj = type === 'turkish' 
    ? turkishWords.value[index]
    : shuffledBengaliWords.value[index];
    
  if (matches.value.includes(wordObj.index)) return;
  
  // Don't allow selecting the same word twice
  if (selectedWords.value.some(sw => sw.type === type && sw.index === index)) {
    selectedWords.value = selectedWords.value.filter(sw => !(sw.type === type && sw.index === index));
    return;
  }
  
  // Don't allow selecting more than 2 words
  if (selectedWords.value.length >= 2) return;
  
  // Add the selected word
  selectedWords.value.push({ type, index });
  
  // Check for a match if two words are selected
  if (selectedWords.value.length === 2) {
    checkMatch();
  }
};

// Start a new game
const startNewGame = () => {
  // Reset game state
  selectedWords.value = [];
  matches.value = [];
  gameComplete.value = false;
  
  // Select random words
  const shuffled = [...words]
    .sort(() => 0.5 - Math.random())
    .slice(0, wordCount);
  
  // Create word lists with original indices
  turkishWords.value = shuffled.map((word, i) => ({
    word: word.word,
    index: i
  }));
  
  bengaliWords.value = shuffled.map((word, i) => ({
    translation: word.translation,
    index: i
  }));
  
  // Shuffle the Bengali words for the right column
  shuffledBengaliWords.value = [...bengaliWords.value]
    .sort(() => 0.5 - Math.random());
};

// Initialize the game when component mounts
onMounted(() => {
  startNewGame();
  
  toast.add({
    severity: 'info',
    summary: 'How to Play',
    detail: 'Match the Turkish words with their Bengali translations by clicking on pairs.',
    life: 5000
  });
});
</script>

<style scoped>
.puzzle-container {
  min-height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;
}

/* Smooth transitions for word cards */
[class*="bg-"] {
  transition: background-color 0.3s, border-color 0.3s, opacity 0.3s;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .puzzle-container {
    padding: 1rem;
  }
  
  .grid-cols-2 {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>