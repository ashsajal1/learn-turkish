<template>
  <div class="quiz-container p-4 md:p-6 max-w-4xl mx-auto">
    <!-- Quiz Content -->
    <div v-if="!quizStarted" class="text-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6">
        <h2 class="text-2xl font-semibold mb-4">তুর্কি কুইজে অংশ নেবেন?</h2>
        <p class="mb-6 text-gray-600 dark:text-gray-300">
          এই কুইজে {{ questionCount }}টি প্রশ্ন রয়েছে, যা আপনাকে শেখার জন্য বিভিন্ন ধরণের চ্যালেঞ্জ দেবে।
        </p>
        <Button 
          label="কুইজ শুরু করুন" 
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
            প্রশ্ন {{ currentQuestionIndex + 1 }} / {{ questionCount }}
          </span>
          <span class="text-sm font-medium">
            স্কোর: {{ score }}/{{ questionCount }}
          </span>
        </div>
        <ProgressBar 
          :value="((currentQuestionIndex + 1) / questionCount) * 100" 
          :showValue="true"
          :displayValueTemplate="progressTemplate"
          :pt="{
            value: { style: { background: progressColor } }
          }"
          class="h-2"
        />
      </div>

      <!-- Question Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <!-- Translation Question -->
        <div v-if="currentQuestion.type === 'translation'" class="text-center">
          <div class="text-2xl font-bold mb-6">
            "{{ currentQuestion.word }}" শব্দের বাংলা অনুবাদ কী?
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
            "<span class="text-primary-600 dark:text-primary-400">{{ currentQuestion.translation }}</span>" শব্দের তুর্কি কী?
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
            শব্দটি শুনুন এবং সঠিক বাংলা অনুবাদ নির্বাচন করুন:
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

        <!-- Speaking Question -->
        <div v-else-if="currentQuestion.type === 'speaking'" class="text-center">
          <div class="text-2xl font-bold mb-4">
            "<span class="text-primary-600 dark:text-primary-400">{{ currentQuestion.translation }}</span>" শব্দের তুর্কি উচ্চারণ করুন:
          </div>
          <div class="mb-2 text-base text-gray-700 dark:text-gray-200">
            <span class="font-semibold">হিন্ট (তুর্কি শব্দ):</span>
            <span class="text-primary-700 dark:text-primary-300 font-bold">{{ currentQuestion.word }}</span>
          </div>
          <div class="mb-4 flex flex-col items-center gap-2">
            <Button 
              :label="isListening ? 'শোনা হচ্ছে...' : 'উচ্চারণ শুরু করুন'"
              icon="pi pi-microphone"
              :disabled="isListening || selectedAnswer !== null"
              @click="startListening"
              class="p-button-lg"
            />
            <Button
              v-if="selectedAnswer === null && !isListening"
              label="এটি বাদ দিন"
              icon="pi pi-forward"
              class="p-button-secondary p-button-text mt-2"
              @click="nextQuestion"
            />
          </div>
          <div v-if="spokenText" class="mb-2 text-lg">
            <span class="font-semibold">আপনার উচ্চারণ:</span> {{ spokenText }}
          </div>
          <div v-if="selectedAnswer !== null" class="mt-2">
            <Button
              label="সঠিক উচ্চারণ শুনুন"
              icon="pi pi-volume-up"
              class="p-button-text"
              @click="speak(currentQuestion.word)"
            />
          </div>
        </div>
      </div>

      <!-- Feedback & Next Button -->
      <div class="text-center">
        <div v-if="isCorrect !== null" class="mb-4">
          <div v-if="isCorrect" class="text-green-600 dark:text-green-400 text-lg font-medium">
            <i class="pi pi-check-circle mr-2"></i> সঠিক! দারুণ!
          </div>
          <div v-else class="text-red-600 dark:text-red-400 text-lg font-medium">
            <i class="pi pi-times-circle mr-2"></i> ভুল! সঠিক উত্তর: "{{ currentQuestion.correctAnswer }}"
          </div>
          <div v-if="currentQuestion.type === 'listening'" class="mt-2 text-base text-gray-700 dark:text-gray-200">
            <span class="font-semibold">উত্তর শব্দটি ছিল:</span> <span class="text-primary-600 dark:text-primary-400 font-bold">{{ currentQuestion.word }}</span>
          </div>
        </div>
        
        <Button 
          v-if="selectedAnswer !== null"
          :label="isLastQuestion ? 'কুইজ শেষ করুন' : 'পরবর্তী প্রশ্ন'"
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
      header="কুইজ সম্পন্ন!"
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
          আপনার স্কোর: {{ score }}/{{ questionCount }}
        </p>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          {{ getResultDescription() }}
        </p>
        <div class="flex justify-center gap-4">
          <Button 
            label="আবার চেষ্টা করুন" 
            icon="pi pi-refresh" 
            @click="restartQuiz" 
            class="p-button-outlined"
          />
          <Button 
            label="হোমে ফিরে যান" 
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
const spokenText = ref('');

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
  type: 'translation' | 'reverse-translation' | 'listening' | 'speaking';
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
      summary: 'অডিও সমর্থিত নয়',
      detail: 'টেক্সট-টু-স্পিচ আপনার ব্রাউজারে সমর্থিত নয়।',
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
  const baseTypes = ['translation', 'reverse-translation', 'listening'] as const;
  const questionTypes = speechSupported ? [...baseTypes, 'speaking'] as const : baseTypes;
  // Shuffle words and take the first questionCount
  const shuffledWords = [...words].sort(() => 0.5 - Math.random()).slice(0, questionCount);
  questions.value = shuffledWords.map((word, index) => {
    const type: 'translation' | 'reverse-translation' | 'listening' | 'speaking' = questionTypes[index % questionTypes.length];
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
    } else if (type === 'speaking') {
      // Speaking test: user must say the Turkish word for the Bengali translation
      return {
        word: word.word,
        translation: word.translation,
        type,
        options: [], // No options, user must speak
        correctAnswer: word.word
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

// --- Speech Recognition Handler ---
const startListening = () => {
  if (!speechSupported || !recognition) return;
  isListening.value = true;
  spokenText.value = '';
  recognition.start();
  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript.trim();
    spokenText.value = transcript;
    isListening.value = false;
    checkSpokenAnswer(transcript);
  };
  recognition.onerror = (event: any) => {
    isListening.value = false;
    toast.add({
      severity: 'error',
      summary: 'শোনার সময় ত্রুটি',
      detail: event.error || 'কিছু ভুল হয়েছে।',
      life: 3000
    });
  };
  recognition.onend = () => {
    isListening.value = false;
  };
};

const checkSpokenAnswer = (transcript: string) => {
  selectedAnswer.value = transcript;
  // Accept answer if it matches Turkish word (case-insensitive, ignore diacritics)
  const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  isCorrect.value = normalize(transcript) === normalize(currentQuestion.value.correctAnswer);
  if (isCorrect.value) {
    score.value++;
  }
  questions.value[currentQuestionIndex.value] = {
    ...currentQuestion.value,
    userAnswer: transcript,
    isCorrect: isCorrect.value
  };
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

// Update result messages and descriptions to Bengali
const getResultMessage = () => {
  const percentage = (score.value / questionCount) * 100;
  if (percentage >= 80) return 'অসাধারণ!';
  if (percentage >= 60) return 'ভালো হয়েছে!';
  if (percentage >= 40) return 'মোটামুটি!';
  return 'চেষ্টা চালিয়ে যান!';
};

const getResultDescription = () => {
  const percentage = (score.value / questionCount) * 100;
  if (percentage >= 80) return 'আপনার তুর্কি শব্দভাণ্ডার চমৎকার! এভাবেই চালিয়ে যান!';
  if (percentage >= 60) return 'আপনার তুর্কি শব্দভাণ্ডার ভালো। আরও অনুশীলন করুন!';
  if (percentage >= 40) return 'আপনি কিছু তুর্কি শব্দ জানেন। আরও চর্চা করুন!';
  return 'নতুন ভাষা শিখতে সময় লাগে। চর্চা চালিয়ে যান, উন্নতি হবে!';
};

// Progress bar value template
const progressTemplate = () => {
  return `${currentQuestionIndex.value + 1} / ${questionCount}`;
};
// Progress color based on progress
const progressColor = computed(() => {
  const percent = ((currentQuestionIndex.value + 1) / questionCount) * 100;
  if (percent >= 80) return '#16a34a'; // green
  if (percent >= 60) return '#facc15'; // yellow
  if (percent >= 40) return '#f59e42'; // orange
  return '#ef4444'; // red
});

// Initialize with a welcome message
onMounted(() => {
  toast.add({
    severity: 'info',
    summary: 'তুর্কি কুইজে স্বাগতম!',
    detail: 'আপনার তুর্কি শব্দভাণ্ডার পরীক্ষা করুন।',
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