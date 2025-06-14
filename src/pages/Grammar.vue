<template>
  <div class="q-pa-md">
    <h4 class="text-h4">তুর্কি ব্যাকরণ</h4>

    <div class="q-mb-lg">
      <h5 class="text-h5">সাধারণ अवलोकन (General Overview)</h5>
      <p>তুর্কি এবং ইংরেজি উভয় ভাষাই ল্যাটিন বর্ণমালা ব্যবহার করে। তবে তুর্কি বর্ণমালায় ২৯টি অক্ষর রয়েছে, যার মধ্যে ৬টি ইংরেজিতে নেই (-ç, -ğ, -ı, -ö, -ş, -ü)।</p>
      <p>কিছু সাধারণ মিল এবং অমিল নিচে দেওয়া হলো:</p>
      <ul>
        <li><strong>লিঙ্গ (Gender):</strong> ইংরেজীর মতো তুর্কি ভাষাতেও বস্তুর জন্য কোনো ব্যাকরণগত লিঙ্গ নেই।</li>
        <li><strong>Article:</strong> ইংরেজীর 'the' এর মতো কোনো নির্দিষ্ট Article তুর্কিতে নেই।</li>
        <li><strong>বহুবচন (Plural):</strong> সংখ্যার পর বিশেষ্য (noun) একবচনে থাকে। যেমন: "iki elma" (দুটি আপেল), "elmaları" নয়।</li>
      </ul>
    </div>

    <div class="q-mb-lg">
      <h5 class="text-h5">পদক্রম (Word Order)</h5>
      <p>তুর্কি ভাষার সাধারণ পদক্রম হলো Subject-Object-Verb (SOV)।</p>
      <p>উদাহরণ:</p>
      <ul>
        <li>Ben (Subject) elma (Object) yerim (Verb)। - আমি আপেল খাই।</li>
      </ul>
      <p>তবে, জোর দেওয়ার জন্য এই ক্রম পরিবর্তন হতে পারে।</p>
    </div>

    <div class="q-mb-lg">
      <h5 class="text-h5">শব্দ গঠন এবং প্রত্যয় (Word Structure and Agglutination)</h5>
      <p>তুর্কি একটি প্রত্যয়প্রধান (agglutinative) ভাষা। এর মানে হলো শব্দের মূলের সাথে প্রত্যয় (suffix) যোগ করে নতুন শব্দ তৈরি হয়।</p>
      <p>উদাহরণ:</p>
      <ul>
        <li><strong>Göz:</strong> চোখ</li>
        <li><strong>Gözlük:</strong> চশমা</li>
        <li><strong>Gözlükçü:</strong> চশমা বিক্রেতা</li>
        <li><strong>Gözlükçülük:</strong> চশমা বিক্রির ব্যবসা</li>
      </ul>
    </div>

    <div class="q-mb-lg">
      <h5 class="text-h5">প্রত্যয়, স্বরসঙ্গতি এবং বাফার (Suffixes, Vowel Harmony, and Buffers)</h5>
      <p><strong>স্বরসঙ্গতি (Vowel Harmony):</strong> তুর্কি ব্যাকরণের একটি গুরুত্বপূর্ণ নিয়ম হলো স্বরসঙ্গতি। এর মানে হলো একটি শব্দের স্বরবর্ণগুলো একে অপরের সাথে সঙ্গতিপূর্ণ হতে হয়। প্রত্যয় যোগ করার সময় এই নিয়ম মেনে চলতে হয়।</p>
      <p><strong>বাফার (Buffers):</strong> দুটি স্বরবর্ণ পাশাপাশি এলে তাদের মধ্যে একটি বাফার (y, n, s) ব্যবহৃত হয়।</p>
    </div>

    <div class="q-mb-lg">
      <h5 class="text-h5">সম্বন্ধ পদ (Possessives)</h5>
      <p>সম্বন্ধ পদ বোঝানোর জন্য আলাদা কোনো শব্দ নেই, বরং বিশেষ্যের সাথে প্রত্যয় যোগ করা হয়।</p>
      <p> উদাহরণ:</p>
      <ul>
        <li>Benim arabam - আমার গাড়ি</li>
        <li>Senin evin - তোমার বাড়ি</li>
      </ul>
    </div>

    <div class="q-mb-lg">
      <h5 class="text-h5">ক্রিয়া এবং ক্রিয়ার কাল (Verbs and Conjugation)</h5>
      <p>তুর্কি ভাষায় ক্রিয়ার রূপ कर्ता (subject), কাল (tense), এবং বচন (number) অনুযায়ী পরিবর্তিত হয়।</p>
      <p>একটি বিশেষ কাল হলো "Reported Past Tense", যা বক্তা নিজে দেখেননি কিন্তু শুনেছেন এমন ঘটনা বর্ণনা করতে ব্যবহৃত হয়।</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'GrammarPage'
}
</script>

<style scoped>
.text-h4 {
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.text-h5 {
  margin-top: 20px;
  margin-bottom: 10px;
}
ul {
  padding-left: 20px;
}
li {
  margin-bottom: 5px;
}
</style>