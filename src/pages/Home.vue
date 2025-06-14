<template>
  <div class="q-pa-md text-center">
    <h4 class="text-h4 q-mb-md">তুর্কি ভাষা শিখুন বাংলায়</h4>
    <p class="q-mb-lg">এই ওয়েবসাইটে আপনাকে স্বাগতম। এখানে আপনি তুর্কি ভাষার ব্যাকরণ এবং অন্যান্য বিষয় সম্পর্কে জানতে পারবেন।</p>

    <div class="flex gap-2 justify-center">
      <router-link to="/grammar" custom v-slot="{ navigate }">
        <Button label="ব্যাকরণ দেখুন" @click="navigate" />
      </router-link>
      <router-link to="/about" custom v-slot="{ navigate }">
        <Button label="আমাদের সম্পর্কে" @click="navigate" class="p-button-secondary" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
</script>

<style scoped>
.text-h4 {
  font-weight: bold;
}
.q-pa-md {
    padding: 16px;
}
.q-mb-md {
    margin-bottom: 16px;
}
.q-mb-lg {
    margin-bottom: 32px;
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
