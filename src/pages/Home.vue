<template>
  <div class="home-container p-4 md:p-8 max-w-6xl mx-auto">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
        তুর্কি ভাষা শিখুন বাংলায়
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        এই ওয়েবসাইটে আপনাকে স্বাগতম। এখানে আপনি তুর্কি ভাষার ব্যাকরণ, শব্দভাণ্ডার এবং মজাদার অনুশীলনী শিখতে পারবেন।
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <router-link to="/grammar" class="feature-card">
        <div class="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow h-full">
          <div class="text-blue-500 dark:text-blue-400 mb-4">
            <i class="pi pi-book text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">ব্যাকরণ</h3>
          <p class="text-gray-600 dark:text-gray-300">তুর্কি ভাষার ব্যাকরণের মৌলিক বিষয়গুলি শিখুন</p>
        </div>
      </router-link>

      <router-link to="/words" class="feature-card">
        <div class="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow h-full">
          <div class="text-green-500 dark:text-green-400 mb-4">
            <i class="pi pi-list text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">শব্দভাণ্ডার</h3>
          <p class="text-gray-600 dark:text-gray-300">দরকারী তুর্কি শব্দ এবং বাক্যাংশ শিখুন</p>
        </div>
      </router-link>

      <router-link to="/quiz" class="feature-card">
        <div class="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow h-full">
          <div class="text-purple-500 dark:text-purple-400 mb-4">
            <i class="pi pi-question-circle text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">কুইজ</h3>
          <p class="text-gray-600 dark:text-gray-300">আপনার জ্ঞান পরীক্ষা করুন মজাদার কুইজের মাধ্যমে</p>
        </div>
      </router-link>

      <router-link to="/puzzle" class="feature-card">
        <div class="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow h-full">
          <div class="text-yellow-500 dark:text-yellow-400 mb-4">
            <i class="pi pi-th-large text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">শব্দ মেলান</h3>
          <p class="text-gray-600 dark:text-gray-300">মজাদার গেমের মাধ্যমে শব্দ শিখুন</p>
        </div>
      </router-link>

      <router-link to="/about" class="feature-card">
        <div class="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow h-full">
          <div class="text-red-500 dark:text-red-400 mb-4">
            <i class="pi pi-info-circle text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">আমাদের সম্পর্কে</h3>
          <p class="text-gray-600 dark:text-gray-300">আমাদের উদ্দেশ্য এবং লক্ষ্য সম্পর্কে জানুন</p>
        </div>
      </router-link>
    </div>

    <!-- Quick Links -->
    <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
      <h2 class="text-2xl font-bold text-center mb-6 text-blue-700 dark:text-blue-300">দ্রুত শুরু করুন</h2>
      <div class="flex flex-wrap justify-center gap-4">
        <router-link to="/grammar">
          <Button label="ব্যাকরণ" icon="pi pi-book" class="p-button-outlined" />
        </router-link>
        <router-link to="/words">
          <Button label="শব্দভাণ্ডার" icon="pi pi-list" class="p-button-outlined" />
        </router-link>
        <router-link to="/quiz">
          <Button label="কুইজ" icon="pi pi-question-circle" class="p-button-outlined" />
        </router-link>
        <router-link to="/puzzle">
          <Button label="শব্দ মেলান" icon="pi pi-th-large" class="p-button-outlined" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
</script>

<style scoped>
.home-container {
  min-height: calc(100vh - 150px);
}

.feature-card {
  display: block;
  text-decoration: none;
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
}

/* Dark mode transitions */
.bg-white, .bg-blue-50, .dark\:bg-gray-800, .dark\:bg-blue-900\/20 {
  transition: background-color 0.3s ease-in-out;
}

/* Ensure text colors transition smoothly in dark mode */
.text-gray-800, .text-gray-600, .dark\:text-white, .dark\:text-gray-300 {
  transition: color 0.3s ease-in-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .home-container {
    padding: 1rem;
  }
  
  .feature-card {
    margin-bottom: 1rem;
  }
}
.text-center {
    text-align: center;
}
.justify-center {
    justify-content: center;
}
.gap-2 {
  gap: 0.5rem;
}
.flex {
  display: flex;
}
</style>
