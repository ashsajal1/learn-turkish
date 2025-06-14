<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">তুর্কি ব্যাকরণ</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">তুর্কি ভাষা শেখার জন্য প্রয়োজনীয় সব ব্যাকরণের নিয়ম</p>
    </div>

    <!-- Grammar Sections -->
    <div class="space-y-12">
      <!-- General Overview Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div class="p-6 md:p-8">
          <div class="flex items-center mb-6">
            <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
              <i class="pi pi-book text-2xl text-blue-600 dark:text-blue-300"></i>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">সাধারণ পরিচিতি</h2>
          </div>
          
          <div class="prose dark:prose-invert max-w-none">
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              তুর্কি এবং ইংরেজি উভয় ভাষাই ল্যাটিন বর্ণমালা ব্যবহার করে। তবে তুর্কি বর্ণমালায় ২৯টি অক্ষর রয়েছে, যার মধ্যে ৬টি ইংরেজিতে নেই: 
              <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">ç, ğ, ı, ö, ş, ü</span>
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">সাধারণ মিল এবং অমিল</h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <i class="pi pi-check-circle text-green-500 mt-1 mr-2"></i>
                <div>
                  <span class="font-medium">লিঙ্গ (Gender):</span> 
                  <span class="text-gray-600 dark:text-gray-400">ইংরেজীর মতো তুর্কি ভাষাতেও বস্তুর জন্য কোনো ব্যাকরণগত লিঙ্গ নেই।</span>
                </div>
              </li>
              <li class="flex items-start">
                <i class="pi pi-check-circle text-green-500 mt-1 mr-2"></i>
                <div>
                  <span class="font-medium">Article:</span> 
                  <span class="text-gray-600 dark:text-gray-400">ইংরেজীর 'the' এর মতো কোনো নির্দিষ্ট Article তুর্কিতে নেই।</span>
                </div>
              </li>
              <li class="flex items-start">
                <i class="pi pi-check-circle text-green-500 mt-1 mr-2"></i>
                <div>
                  <span class="font-medium">বহুবচন (Plural):</span> 
                  <span class="text-gray-600 dark:text-gray-400">সংখ্যার পর বিশেষ্য (noun) একবচনে থাকে। যেমন: <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">"iki elma"</span> (দুটি আপেল), "elmaları" নয়।</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Word Order Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div class="p-6 md:p-8">
          <div class="flex items-center mb-6">
            <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4">
              <i class="pi pi-sort-alt text-2xl text-purple-600 dark:text-purple-300"></i>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">পদক্রম (Word Order)</h2>
          </div>
          
          <div class="prose dark:prose-invert max-w-none">
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              তুর্কি ভাষার সাধারণ পদক্রম হলো <span class="font-bold">Subject-Object-Verb (SOV)</span>।
            </p>
            
            <div class="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500 my-6">
              <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">উদাহরণ:</h4>
              <div class="space-y-2">
                <div class="flex flex-wrap items-baseline">
                  <span class="bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2">Subject-Object-Verb</span>
                  <span class="text-gray-700 dark:text-gray-300">Ben (I) elma (apple) yerim (eat) → আমি আপেল খাই</span>
                </div>
                <div class="flex flex-wrap items-baseline">
                  <span class="bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2">Object-Subject-Verb</span>
                  <span class="text-gray-700 dark:text-gray-300">Elmayı (apple-ACC) ben (I) yerim (eat) → আপেলটা আমি খাই</span>
                </div>
              </div>
            </div>
            
            <p class="text-gray-700 dark:text-gray-300">
              জোর দেওয়ার জন্য এই ক্রম পরিবর্তন হতে পারে, তবে SOV হলো সবচেয়ে সাধারণ এবং নিরপেক্ষ পদক্রম।
            </p>
          </div>
        </div>
      </div>

      <!-- Word Structure Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div class="p-6 md:p-8">
          <div class="flex items-center mb-6">
            <div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
              <i class="pi pi-sitemap text-2xl text-green-600 dark:text-green-300"></i>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">শব্দ গঠন এবং প্রত্যয়</h2>
          </div>
          
          <div class="prose dark:prose-invert max-w-none">
            <p class="text-gray-700 dark:text-gray-300 mb-6">
              তুর্কি একটি <span class="font-medium">প্রত্যয়প্রধান (agglutinative) ভাষা</span>। এর মানে হলো শব্দের মূলের সাথে একাধিক প্রত্যয় (suffix) যোগ করে নতুন শব্দ তৈরি হয়।
            </p>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-lg">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-3">উদাহরণ:</h4>
                <ul class="space-y-3">
                  <li>
                    <div class="font-mono text-lg">Göz</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">চোখ</div>
                  </li>
                  <li>
                    <div class="font-mono text-lg">Göz + lük → Gözlük</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">চোখ + প্রত্যয় = চশমা</div>
                  </li>
                  <li>
                    <div class="font-mono text-lg">Gözlük + çü → Gözlükçü</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">চশমা + প্রত্যয় = চশমা বিক্রেতা</div>
                  </li>
                </ul>
              </div>
              
              <div class="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-lg border-l-4 border-amber-400">
                <h4 class="font-semibold text-amber-800 dark:text-amber-200 mb-3">প্রত্যয়ের বৈশিষ্ট্য:</h4>
                <ul class="space-y-2 text-amber-800 dark:text-amber-100">
                  <li class="flex items-start">
                    <i class="pi pi-check-circle text-amber-500 mt-1 mr-2"></i>
                    <span>প্রত্যয়গুলি সর্বদা একটি নির্দিষ্ট ক্রমে যোগ হয়</span>
                  </li>
                  <li class="flex items-start">
                    <i class="pi pi-check-circle text-amber-500 mt-1 mr-2"></i>
                    <span>প্রত্যেক প্রত্যয়ের একটি নির্দিষ্ট অর্থ থাকে</span>
                  </li>
                  <li class="flex items-start">
                    <i class="pi pi-check-circle text-amber-500 mt-1 mr-2"></i>
                    <span>স্বরসঙ্গতি (vowel harmony) নিয়ম মেনে চলে</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Suffixes, Vowel Harmony, and Buffers Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div class="p-6 md:p-8">
          <div class="flex items-center mb-6">
            <div class="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg mr-4">
              <i class="pi pi-filter text-2xl text-indigo-600 dark:text-indigo-300"></i>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">প্রত্যয়, স্বরসঙ্গতি এবং বাফার</h2>
          </div>
          
          <div class="prose dark:prose-invert max-w-none">
            <p class="text-gray-700 dark:text-gray-300 mb-6">
              তুর্কি ব্যাকরণের একটি গুরুত্বপূর্ণ নিয়ম হলো স্বরসঙ্গতি। এর মানে হলো একটি শব্দের স্বরবর্ণগুলো একে অপরের সাথে সঙ্গতিপূর্ণ হতে হয়। প্রত্যয় যোগ করার সময় এই নিয়ম মেনে চলতে হয়।
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">বাফার (Buffers)</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              দুটি স্বরবর্ণ পাশাপাশি এলে তাদের মধ্যে একটি বাফার (y, n, s) ব্যবহৃত হয়।
            </p>
            
            <div class="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-lg">
              <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-3">উদাহরণ:</h4>
              <ul class="space-y-3">
                <li>
                  <div class="font-mono text-lg">Göz + lük → Gözlük</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">চোখ + প্রত্যয় = চশমা</div>
                </li>
                <li>
                  <div class="font-mono text-lg">Gözlük + çü → Gözlükçü</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">চশমা + প্রত্যয় = চশমা বিক্রেতা</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Possessives Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div class="p-6 md:p-8">
          <div class="flex items-center mb-6">
            <div class="p-3 bg-pink-100 dark:bg-pink-900 rounded-lg mr-4">
              <i class="pi pi-user text-2xl text-pink-600 dark:text-pink-300"></i>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">সম্বন্ধ পদ (Possessives)</h2>
          </div>
          
          <div class="prose dark:prose-invert max-w-none">
            <p class="text-gray-700 dark:text-gray-300 mb-6">
              সম্বন্ধ পদ বোঝানোর জন্য আলাদা কোনো শব্দ নেই, বরং বিশেষ্যের সাথে প্রত্যয় যোগ করা হয়।
            </p>
            
            <div class="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-lg">
              <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-3">উদাহরণ:</h4>
              <ul class="space-y-3">
                <li>
                  <div class="font-mono text-lg">Benim arabam</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">আমার গাড়ি</div>
                </li>
                <li>
                  <div class="font-mono text-lg">Senin evin</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">তোমার বাড়ি</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Verbs and Conjugation Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div class="p-6 md:p-8">
          <div class="flex items-center mb-6">
            <div class="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg mr-4">
              <i class="pi pi-chart-bar text-2xl text-orange-600 dark:text-orange-300"></i>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">ক্রিয়া এবং ক্রিয়ার কাল</h2>
          </div>
          
          <div class="prose dark:prose-invert max-w-none">
            <p class="text-gray-700 dark:text-gray-300 mb-6">
              তুর্কি ভাষায় ক্রিয়ার রূপ কর্তা (subject), কাল (tense), এবং বচন (number) অনুযায়ী পরিবর্তিত হয়।
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">ক্রিয়ার কাল</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              তুর্কি ভাষায় ক্রিয়ার কাল বোঝানোর জন্য বিভিন্ন প্রত্যয় ব্যবহার করা হয়।
            </p>
            
            <div class="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-lg">
              <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-3">উদাহরণ:</h4>
              <ul class="space-y-3">
                <li>
                  <div class="font-mono text-lg">Ben (I) elma (apple) yerim (eat)</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">আমি আপেল খাই</div>
                </li>
                <li>
                  <div class="font-mono text-lg">Ben (I) elma (apple) yedim (ate)</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">আমি আপেল খেয়েছি</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GrammarPage'
}
</script>

<style scoped>
/* Smooth scrolling for anchor links */
.prose a {
  @apply text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200;
}

/* Custom bullet points for lists */

ul {
  padding-left: 20px;
}
li {
  margin-bottom: 5px;
}
</style>