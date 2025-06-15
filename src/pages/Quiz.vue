<template>
  <div class="quiz-container p-4 md:p-6 max-w-4xl mx-auto">
    <!-- Quiz Content -->
    <div v-if="!quizStarted" class="text-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6">
        <h2 class="text-2xl font-semibold mb-4">Ready to test your Turkish?</h2>
        <p class="mb-6 text-gray-600 dark:text-gray-300">
          This quiz includes {{ questionCount }} questions with different types of challenges to help you learn.
        </p>
        <Button 
          label="Start Quiz" 
          icon="pi pi-play" 
          @click="startQuiz" 
          class="p-button-lg"
        />
      </div>
    </div>

    <!-- Quiz In Progress -->
    <div v-else>
      <!-- Progress Bar -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium">
            Question {{ currentQuestionIndex + 1 }} of {{ questionCount }}
          </span>
          <span class="text-sm font-medium">
            Score: {{ score }}/{{ questionCount }}
          </span>
        </div>
        <ProgressBar 
          :value="((currentQuestionIndex) / questionCount) * 100" 
          :showValue="false"
          class="h-2"
        />
      </div>

      <!-- Question Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <!-- Translation Question -->
        <div v-if="currentQuestion.type === 'translation'" class="text-center">
          <div class="text-2xl font-bold mb-6">
            What is the English translation of "{{ currentQuestion.word }}"?
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              v-for="(option, index) in currentQuestion.options" 
              :key="index"
              :label="option"
              @click="checkAnswer(option)"
              class="p-button-outlined"
              :class="{ 
                'p-button-success': selectedAnswer === option && isCorrect !== null && isCorrect,
                'p-button-danger': selectedAnswer === option && isCorrect !== null && !isCorrect
              }"
              :disabled="selectedAnswer !== null"
            />
          </div>
        </div>

        <!-- Reverse Translation Question (Bengali to Turkish) -->
        <div v-else-if="currentQuestion.type === 'reverse-translation'" class="text-center">
          <div class="text-2xl font-bold mb-6">
            What is the Turkish word for "<span class="text-primary-600 dark:text-primary-400">{{ currentQuestion.translation }}</span>"?
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              v-for="(option, index) in currentQuestion.options" 
              :key="index"
              :label="option"
              @click="checkAnswer(option)"
              class="p-button-outlined"
              :class="{ 
                'p-button-success': selectedAnswer === option && isCorrect !== null && isCorrect,
                'p-button-danger': selectedAnswer === option && isCorrect !== null && !isCorrect
              }"
              :disabled="selectedAnswer !== null"
            />
          </div>
        </div>

        <!-- Listening Question -->
        <div v-else-if="currentQuestion.type === 'listening'" class="text-center">
          <div class="mb-6">
            <Button 
              icon="pi pi-volume-up" 
              @click="speak(currentQuestion.word)" 
              class="p-button-rounded p-button-text text-4xl"
            />
          </div>
          <div class="text-xl mb-6">
            Listen to the word and select its correct translation:
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              v-for="(option, index) in currentQuestion.options" 
              :key="index"
              :label="option"
              @click="checkAnswer(option)"
              class="p-button-outlined"
              :class="{ 
                'p-button-success': selectedAnswer === option && isCorrect !== null && isCorrect,
                'p-button-danger': selectedAnswer === option && isCorrect !== null && !isCorrect
              }"
              :disabled="selectedAnswer !== null"
            />
          </div>
        </div>
      </div>

      <!-- Feedback & Next Button -->
      <div class="text-center">
        <div v-if="isCorrect !== null" class="mb-4">
          <div v-if="isCorrect" class="text-green-600 dark:text-green-400 text-lg font-medium">
            <i class="pi pi-check-circle mr-2"></i> Correct! Well done!
          </div>
          <div v-else class="text-red-600 dark:text-red-400 text-lg font-medium">
            <i class="pi pi-times-circle mr-2"></i> Oops! The correct answer is "{{ currentQuestion.correctAnswer }}"
          </div>
        </div>
        
        <Button 
          v-if="selectedAnswer !== null"
          :label="isLastQuestion ? 'Finish Quiz' : 'Next Question'"
          icon="pi pi-arrow-right"
          iconPos="right"
          @click="nextQuestion"
          class="p-button-lg"
        />
      </div>
    </div>

    <!-- Quiz Results -->
    <Dialog 
      v-model:visible="showResults" 
      :modal="true" 
      :style="{width: '450px'}" 
      header="Quiz Completed!"
      :closable="false"
    >
      <div class="text-center py-4">
        <div class="text-6xl mb-4" :class="score >= questionCount / 2 ? 'text-green-500' : 'text-yellow-500'">
          <i :class="score >= questionCount / 2 ? 'pi pi-smile' : 'pi pi-meh'"></i>
        </div>
        <h3 class="text-2xl font-bold mb-2">
          {{ getResultMessage() }}
        </h3>
        <p class="text-xl font-semibold mb-4">
          Your score: {{ score }}/{{ questionCount }}
        </p>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          {{ getResultDescription() }}
        </p>
        <div class="flex justify-center gap-4">
          <Button 
            label="Try Again" 
            icon="pi pi-refresh" 
            @click="restartQuiz" 
            class="p-button-outlined"
          />
          <Button 
            label="Back to Home" 
            @click="$router.push('/')" 
            class="p-button-text"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { words } from '../utils/words';
import Button from 'primevue/button';
import ProgressBar from 'primevue/progressbar';
import Dialog from 'primevue/dialog';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

// Quiz state
const quizStarted = ref(false);
const currentQuestionIndex = ref(0);
const score = ref(0);
const selectedAnswer = ref<string | null>(null);
const isCorrect = ref<boolean | null>(null);
const showResults = ref(false);
const questionCount = 10; // Number of questions in the quiz

// Questions array will be populated when quiz starts
const questions = ref<Array<{
  word: string;
  translation: string;
  type: 'translation' | 'reverse-translation' | 'listening';
  options: string[];
  correctAnswer: string;
  userAnswer?: string;
  isCorrect?: boolean;
}>>([]);

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1);

// Text-to-speech for listening questions
const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR'; // Turkish language
    speechSynthesis.speak(utterance);
  } else {
    toast.add({
      severity: 'warn',
      summary: 'Audio not supported',
      detail: 'Text-to-speech is not supported in your browser.',
      life: 3000
    });
  }
};

// Start the quiz
const startQuiz = () => {
  // Reset quiz state
  quizStarted.value = true;
  currentQuestionIndex.value = 0;
  score.value = 0;
  selectedAnswer.value = null;
  isCorrect.value = null;
  
  // Generate questions
  generateQuestions();
};

// Generate random questions
const generateQuestions = () => {
  const questionTypes: Array<'translation' | 'reverse-translation' | 'listening'> = 
    ['translation', 'reverse-translation', 'listening'];
  
  // Shuffle words and take the first questionCount
  const shuffledWords = [...words].sort(() => 0.5 - Math.random()).slice(0, questionCount);
  
  questions.value = shuffledWords.map((word, index) => {
    // Determine question type (distribute evenly)
    const type = questionTypes[index % questionTypes.length];
    
    if (type === 'reverse-translation') {
      // For reverse translation (Bengali to Turkish)
      // Get 3 random incorrect Turkish words
      const allTurkishWords = words
        .filter(w => w.word !== word.word)
        .map(w => w.word);
      
      const shuffledIncorrect = [...allTurkishWords]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      const options = [...shuffledIncorrect, word.word]
        .sort(() => 0.5 - Math.random());
      
      return {
        word: word.word,
        translation: word.translation,
        type,
        options,
        correctAnswer: word.word  // The correct Turkish word
      };
    } else {
      // For regular translation and listening questions (Turkish to Bengali)
      // Get 3 random incorrect Bengali translations
      const allTranslations = words
        .filter(w => w.translation !== word.translation)
        .map(w => w.translation);
      
      const shuffledIncorrect = [...allTranslations]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      const options = [...shuffledIncorrect, word.translation]
        .sort(() => 0.5 - Math.random());
      
      return {
        word: word.word,
        translation: word.translation,
        type,
        options,
        correctAnswer: word.translation
      };
    }
  });
};

// Check if the selected answer is correct
const checkAnswer = (selectedOption: string) => {
  selectedAnswer.value = selectedOption;
  isCorrect.value = selectedOption === currentQuestion.value.correctAnswer;
  
  // Update score if correct
  if (isCorrect.value) {
    score.value++;
  }
  
  // Update the question with user's answer
  questions.value[currentQuestionIndex.value] = {
    ...currentQuestion.value,
    userAnswer: selectedOption,
    isCorrect: isCorrect.value
  };
};

// Move to the next question or finish quiz
const nextQuestion = () => {
  if (isLastQuestion.value) {
    showResults.value = true;
  } else {
    currentQuestionIndex.value++;
    selectedAnswer.value = null;
    isCorrect.value = null;
  }
};

// Restart the quiz
const restartQuiz = () => {
  showResults.value = false;
  startQuiz();
};

// Get result message based on score
const getResultMessage = () => {
  const percentage = (score.value / questionCount) * 100;
  if (percentage >= 80) return 'Excellent Work!';
  if (percentage >= 60) return 'Good Job!';
  if (percentage >= 40) return 'Not Bad!';
  return 'Keep Practicing!';
};

// Get result description
const getResultDescription = () => {
  const percentage = (score.value / questionCount) * 100;
  if (percentage >= 80) return 'You have an impressive Turkish vocabulary! Keep up the great work!';
  if (percentage >= 60) return 'You have a good grasp of Turkish vocabulary. Keep practicing to improve further!';
  if (percentage >= 40) return 'You know some Turkish words. With more practice, you\'ll get even better!';
  return 'Learning a new language takes time. Keep practicing and you\'ll see improvement soon!';
};

// Initialize with a welcome message
onMounted(() => {
  toast.add({
    severity: 'info',
    summary: 'Welcome to Turkish Quiz!',
    detail: 'Test your knowledge of Turkish vocabulary.',
    life: 3000
  });
});
</script>

<style scoped>
.quiz-container {
  min-height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;
}

:deep(.p-button) {
  margin: 0.25rem;
  transition: all 0.2s;
}

:deep(.p-button:not(:disabled):hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

:deep(.p-button.p-button-success) {
  background-color: var(--green-500);
  border-color: var(--green-500);
}

:deep(.p-button.p-button-danger) {
  background-color: var(--red-500);
  border-color: var(--red-500);
  color: white;
}

:deep(.p-progressbar) {
  height: 0.5rem;
  border-radius: 0.25rem;
  overflow: hidden;
}

:deep(.p-progressbar-value) {
  background-color: var(--primary-color);
}

/* Animation for correct/wrong answer */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

:deep(.p-button.p-button-success),
:deep(.p-button.p-button-danger) {
  animation: pulse 0.5s ease-in-out;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .quiz-container {
    padding: 1rem;
  }
  
  :deep(.p-button) {
    width: 100%;
    margin: 0.25rem 0;
  }
}
</style>