<template>
  <nav 
  ref="navbar" 
  class="fixed  top-0 left-0 right-0 z-50 transition-all duration-300"
  :class="{
    'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md': isScrolled,
    'bg-white/0 dark:bg-gray-900/0': !isScrolled,
    
  }"
>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-[80px]">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <RouterLink to="/" class="text-2xl font-bold text-blue-600 dark:text-blue-400">
            তুর্কি শিখুন
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:ml-6 md:flex md:items-center md:space-x-8">
          <RouterLink 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path === item.path }"
          >
            {{ item.name }}
          </RouterLink>
          
          <Button 
            :icon="themeIcon" 
            @click="next()" 
            text 
            :pt="{
              root: {
                class: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-colors'
              }
            }"
          />
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <Button 
            :icon="themeIcon" 
            @click="next()" 
            text 
            class="mr-2"
            :pt="{
              root: {
                class: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-colors'
              }
            }"
          />
          <Button 
            icon="pi pi-bars" 
            @click="toggleDrawer" 
            text 
            :pt="{
              root: {
                class: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-colors'
              }
            }"
          />
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Drawer -->
  <Drawer v-model:visible="isDrawerOpen" position="right" modal>
    <template #header>
      <div class="flex items-center justify-between w-full p-4 border-b dark:border-gray-700">
        <span class="text-lg font-semibold text-gray-900 dark:text-white">মেনু</span>
        <Button 
          icon="pi pi-times" 
          @click="isDrawerOpen = false" 
          text 
          severity="secondary"
        />
      </div>
    </template>
    
    <div class="flex flex-col space-y-1 p-2">
      <RouterLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        @click="isDrawerOpen = false"
        class="px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md flex items-center"
        :class="{ 'bg-gray-100 dark:bg-gray-800': $route.path === item.path }"
      >
        <i :class="item.icon" class="mr-3"></i>
        <span>{{ item.name }}</span>
      </RouterLink>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { useColorMode, useCycleList } from "@vueuse/core";
import { Button, Drawer } from "primevue";
import { watchEffect, computed, ref, onMounted, onUnmounted } from "vue";

// Navigation items
const navItems = [
  { name: 'হোম', path: '/', icon: 'pi pi-home' },
  { name: 'উচ্চারণ', path: '/pronunciation', icon: 'pi pi-volume-up' },
  { name: 'স্বরভঙ্গি', path: '/accent', icon: 'pi pi-sliders-h' },
  { name: 'বলার অনুশীলন', path: '/speak', icon: 'pi pi-microphone' },
  { name: 'ব্যাকরণ', path: '/grammar', icon: 'pi pi-book' },
  { name: 'শব্দভাণ্ডার', path: '/words', icon: 'pi pi-list' },
  { name: 'কুইজ', path: '/quiz', icon: 'pi pi-question-circle' },
  { name: 'শব্দ মেলান', path: '/puzzle', icon: 'pi pi-th-large' },
  { name: 'ব্যবহার', path: '/usage', icon: 'pi pi-check-square' },
  { name: 'আমাদের সম্পর্কে', path: '/about', icon: 'pi pi-info-circle' },
];

// Theme toggle
const mode = useColorMode({
  emitAuto: true,
  modes: {
    dark: 'dark',
    light: 'light',
  },
});

const { state, next } = useCycleList(["dark", "light"] as const, {
  initialValue: mode,
});

const isDrawerOpen = ref(false);
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

watchEffect(() => (mode.value = state.value));
const themeIcon = computed(() =>
  state.value === "dark" ? "pi pi-sun" : "pi pi-moon"
);

// Navbar scroll effect
const navbar = ref<HTMLElement | null>(null);
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);  
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
