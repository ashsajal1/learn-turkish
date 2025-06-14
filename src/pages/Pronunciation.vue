<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-emerald-500">
        Turkish Pronunciation Guide
      </h1>
      
      <p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        Turkish is a phonetic language, which means that words are pronounced as they are written. 
        Each letter corresponds to a single sound. However, there are a few special characters in the 
        Turkish alphabet that might be unfamiliar to English speakers.
      </p>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4 pb-2 border-b border-emerald-400">
        Special Characters
      </h2>
      
      <p class="text-gray-700 dark:text-gray-300 mb-6">
        Here are the special characters in the Turkish alphabet and how to pronounce them:
      </p>

      <div class="overflow-x-auto rounded-lg shadow-md mb-8">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-emerald-600 dark:bg-emerald-700">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Character
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Pronunciation
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Example
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-pink-600 dark:text-pink-400">
                Ç, ç
              </td>
              <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                Like 'ch' in "church"
              </td>
              <td class="px-6 py-4 text-sm text-blue-600 dark:text-blue-400 italic">
                çay <span class="text-gray-500 dark:text-gray-400">(tea)</span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-pink-600 dark:text-pink-400">
                Ğ, ğ
              </td>
              <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                The "soft g" is usually silent. It lengthens the preceding vowel.
              </td>
              <td class="px-6 py-4 text-sm text-blue-600 dark:text-blue-400 italic">
                dağ <span class="text-gray-500 dark:text-gray-400">(mountain) is pronounced like "daa"</span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-pink-600 dark:text-pink-400">
                I, ı
              </td>
              <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                Like the 'a' in "sofa" or the 'u' in "radium". It's an unstressed vowel sound.
              </td>
              <td class="px-6 py-4 text-sm text-blue-600 dark:text-blue-400 italic">
                ılık <span class="text-gray-500 dark:text-gray-400">(warm)</span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-pink-600 dark:text-pink-400">
                İ, i
              </td>
              <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                Like 'ee' in "see"
              </td>
              <td class="px-6 py-4 text-sm text-blue-600 dark:text-blue-400 italic">
                isim <span class="text-gray-500 dark:text-gray-400">(name)</span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-pink-600 dark:text-pink-400">
                Ö, ö
              </td>
              <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                Like the German 'ö' or the 'u' in "burn". Round your lips as if to say "o" but pronounce "e".
              </td>
              <td class="px-6 py-4 text-sm text-blue-600 dark:text-blue-400 italic">
                göz <span class="text-gray-500 dark:text-gray-400">(eye)</span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-pink-600 dark:text-pink-400">
                Ş, ş
              </td>
              <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                Like 'sh' in "shoe"
              </td>
              <td class="px-6 py-4 text-sm text-blue-600 dark:text-blue-400 italic">
                şapka <span class="text-gray-500 dark:text-gray-400">(hat)</span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-pink-600 dark:text-pink-400">
                Ü, ü
              </td>
              <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                Like the German 'ü'. Round your lips as if to say "oo" but pronounce "ee".
              </td>
              <td class="px-6 py-4 text-sm text-blue-600 dark:text-blue-400 italic">
                üzüm <span class="text-gray-500 dark:text-gray-400">(grape)</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4 pb-2 border-b border-emerald-400">
        Vowel Harmony
      </h2>
      
      <div class="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg border border-emerald-100 dark:border-emerald-800 mb-8">
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          One of the most important features of Turkish is vowel harmony. This means that vowels within a word must belong to the same class (either front or back vowels). This affects how suffixes are added to words. While you don't need to master this from day one, being aware of it will help you understand the structure of the language.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// This component uses Tailwind CSS for styling with dark mode support
// Dark mode is automatically applied based on the user's system preference
// or can be toggled if you have a theme switcher in your app
</script>