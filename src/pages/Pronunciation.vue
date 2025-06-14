<template>
  <div class="pronunciation-container">
    <h1>Turkish Pronunciation Guide</h1>
    <p>
      Turkish is a phonetic language, which means that words are pronounced as they are written. Each letter corresponds to a single sound. However, there are a few special characters in the Turkish alphabet that might be unfamiliar to English speakers.
    </p>

    <h2>Special Characters</h2>
    <p>Here are the special characters in the Turkish alphabet and how to pronounce them:</p>

    <table class="pronunciation-table">
      <thead>
        <tr>
          <th>Character</th>
          <th>Pronunciation</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Ç, ç</strong></td>
          <td>Like 'ch' in "church"</td>
          <td><em>çay</em> (tea)</td>
        </tr>
        <tr>
          <td><strong>Ğ, ğ</strong></td>
          <td>The "soft g" is usually silent. It lengthens the preceding vowel.</td>
          <td><em>dağ</em> (mountain) is pronounced like "daa"</td>
        </tr>
        <tr>
          <td><strong>I, ı</strong></td>
          <td>Like the 'a' in "sofa" or the 'u' in "radium". It's an unstressed vowel sound.</td>
          <td><em>ılık</em> (warm)</td>
        </tr>
        <tr>
          <td><strong>İ, i</strong></td>
          <td>Like 'ee' in "see"</td>
          <td><em>isim</em> (name)</td>
        </tr>
        <tr>
          <td><strong>Ö, ö</strong></td>
          <td>Like the German 'ö' or the 'u' in "burn". Round your lips as if to say "o" but pronounce "e".</td>
          <td><em>göz</em> (eye)</td>
        </tr>
        <tr>
          <td><strong>Ş, ş</strong></td>
          <td>Like 'sh' in "shoe"</td>
          <td><em>şapka</em> (hat)</td>
        </tr>
        <tr>
          <td><strong>Ü, ü</strong></td>
          <td>Like the German 'ü'. Round your lips as if to say "oo" but pronounce "ee".</td>
          <td><em>üzüm</em> (grape)</td>
        </tr>
      </tbody>
    </table>

    <h2>Vowel Harmony</h2>
    <p>
      One of the most important features of Turkish is vowel harmony. This means that vowels within a word must belong to the same class (either front or back vowels). This affects how suffixes are added to words. While you don't need to master this from day one, being aware of it will help you understand the structure of the language.
    </p>
  </div>
</template>

<style scoped>
.pronunciation-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
  line-height: 1.6;
}

h1, h2 {
  color: #2c3e50;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

.pronunciation-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 20px;
}

.pronunciation-table th, .pronunciation-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.pronunciation-table th {
  background-color: #42b983;
  color: white;
}

.pronunciation-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.pronunciation-table strong {
  color: #d63384;
  font-size: 1.2em;
}

em {
  font-style: italic;
  color: #0d6efd;
}
</style>