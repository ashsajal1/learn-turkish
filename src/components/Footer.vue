<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About Section -->
        <div class="space-y-4">
          <div class="flex items-center">
            <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">তুর্কি শিখুন</span>
          </div>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            বাংলা ভাষাভাষীদের জন্য তুর্কি ভাষা শেখার সহজ ও কার্যকরী প্ল্যাটফর্ম। ব্যাকরণ, শব্দভাণ্ডার এবং অনুশীলনীর মাধ্যমে তুর্কি ভাষা শিখুন।
          </p>
          <div class="flex space-x-4 pt-2">
            <a href="#" class="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
              <span class="sr-only">Facebook</span>
              <i class="pi pi-facebook text-xl"></i>
            </a>
            <a href="#" class="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-400">
              <span class="sr-only">Twitter</span>
              <i class="pi pi-twitter text-xl"></i>
            </a>
            <a href="#" class="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500">
              <span class="sr-only">Instagram</span>
              <i class="pi pi-instagram text-xl"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="grid grid-cols-2 gap-8">
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">মেনু</h3>
            <ul class="mt-4 space-y-2">
              <li v-for="item in navItems" :key="item.path">
                <RouterLink 
                  :to="item.path" 
                  class="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                >
                  {{ item.name }}
                </RouterLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">সম্পর্কিত</h3>
            <ul class="mt-4 space-y-2">
              <li>
                <a href="#" class="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                  গোপনীয়তা নীতি
                </a>
              </li>
              <li>
                <a href="#" class="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                  ব্যবহারের শর্তাবলী
                </a>
              </li>
              <li>
                <a href="#" class="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                  সাহায্য
                </a>
              </li>
              <li>
                <a href="#" class="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                  যোগাযোগ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">যোগাযোগ</h3>
          <ul class="mt-4 space-y-3">
            <li class="flex items-start">
              <i class="pi pi-envelope text-gray-500 mt-1 mr-2"></i>
              <span class="text-sm text-gray-600 dark:text-gray-300">example@example.com</span>
            </li>
            <li class="flex items-start">
              <i class="pi pi-globe text-gray-500 mt-1 mr-2"></i>
              <span class="text-sm text-gray-600 dark:text-gray-300">www.example.com</span>
            </li>
          </ul>
          
          <div class="mt-6">
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">নিউজলেটার সাবস্ক্রাইব করুন</h4>
            <div class="flex">
              <input 
                type="email" 
                placeholder="আপনার ইমেইল" 
                class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-blue-500 focus:border-blue-500 block w-full text-sm dark:bg-gray-800 dark:text-white"
              >
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md text-sm font-medium transition-colors">
                সাবমিট
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            &copy; {{ new Date().getFullYear() }} তুর্কি শিখুন. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 text-sm">
              গোপনীয়তা নীতি
            </a>
            <a href="#" class="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 text-sm">
              শর্তাবলী
            </a>
            <a href="#" class="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 text-sm">
              কুকি নীতি
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

const navItems = [
  { name: 'হোম', path: '/' },
  { name: 'উচ্চারণ', path: '/pronunciation' },
  { name: 'ব্যাকরণ', path: '/grammar' },
  { name: 'শব্দভাণ্ডার', path: '/words' },
  { name: 'কুইজ', path: '/quiz' },
  { name: 'শব্দ মেলান', path: '/puzzle' },
  { name: 'ব্যবহার', path: '/usage' },
  { name: 'আমাদের সম্পর্কে', path: '/about' },
];
</script>

<style scoped>
/* Smooth transitions for dark mode */
footer {
  transition: background-color 0.3s, border-color 0.3s;
}

a {
  transition: color 0.2s;
}

input {
  transition: all 0.2s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  
  .grid-cols-2 {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
</style>
