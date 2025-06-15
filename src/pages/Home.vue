<template>
  <div class="home-container p-4 md:p-8 max-w-6xl mx-auto relative">
    <!-- Turkish Particles Animation Canvas -->
    <canvas id="turkish-particles-canvas" class="particles-canvas"></canvas>
    <div class="main-content" style="position: relative; z-index: 1;">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          তুর্কি ভাষা শিখুন বাংলায়
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          এই ওয়েবসাইটে আপনাকে স্বাগতম। এখানে আপনি তুর্কি ভাষার ব্যাকরণ, শব্দভাণ্ডার, উচ্চারণ এবং মজাদার অনুশীলনী শিখতে পারবেন।
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

        <router-link to="/pronunciation" class="feature-card">
          <div class="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow h-full">
            <div class="text-pink-500 dark:text-pink-400 mb-4">
              <i class="pi pi-volume-up text-4xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">উচ্চারণ</h3>
            <p class="text-gray-600 dark:text-gray-300">তুর্কি শব্দের সঠিক উচ্চারণ শিখুন</p>
          </div>
        </router-link>

        <router-link to="/accent" class="feature-card">
          <div class="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow h-full">
            <div class="text-teal-500 dark:text-teal-400 mb-4">
              <i class="pi pi-comment text-4xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">অ্যাকসেন্ট</h3>
            <p class="text-gray-600 dark:text-gray-300">তুর্কি ভাষার সুর ও উচ্চারণের সূক্ষ্মতা বুঝুন</p>
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
          <router-link to="/pronunciation">
            <Button label="উচ্চারণ" icon="pi pi-volume-up" class="p-button-outlined" />
          </router-link>
          <router-link to="/accent">
            <Button label="অ্যাকসেন্ট" icon="pi pi-comment" class="p-button-outlined" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import Button from 'primevue/button';

// Turkish Particles Animation
let animationFrameId;
let canvas, ctx, particles = [];
const PARTICLE_COUNT = 40;
const COLORS = ['#e30a17', '#fff']; // Turkish flag colors
const SHAPES = ['circle', 'star', 'crescent'];

function drawStar(cx, cy, spikes, outerRadius, innerRadius, color) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes * 2; i++) {
    const angle = Math.PI / spikes * i;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    ctx.lineTo(cx + Math.sin(angle) * r, cy - Math.cos(angle) * r);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawCrescent(cx, cy, r, color) {
  ctx.save();
  ctx.globalAlpha = 1.0; // Always draw crescent at full alpha, let parent handle opacity
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(cx + r * 0.4, cy - r * 0.1, r * 0.8, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  ctx.restore();
}

function createParticle() {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const size = Math.random() * 18 + 12;
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: Math.random() * 0.5 + 0.2,
    size,
    color,
    shape,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.01
  };
}

function drawParticle(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = 0.35; // Lower opacity for all particles
  if (p.shape === 'circle') {
    ctx.beginPath();
    ctx.arc(0, 0, p.size / 2, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 8;
    ctx.fill();
  } else if (p.shape === 'star') {
    drawStar(0, 0, 5, p.size / 2, p.size / 4, p.color);
  } else if (p.shape === 'crescent') {
    ctx.globalAlpha = 0.35; // Set opacity for crescent here
    drawCrescent(0, 0, p.size / 2, p.color);
  }
  ctx.restore();
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotationSpeed;
    if (p.y - p.size > canvas.height) {
      // Respawn at top
      Object.assign(p, createParticle(), { y: -p.size });
    }
    drawParticle(p);
  }
  animationFrameId = requestAnimationFrame(animateParticles);
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}

onMounted(() => {
  canvas = document.getElementById('turkish-particles-canvas');
  ctx = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  animateParticles();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', resizeCanvas);
});
</script>

<style scoped>
.home-container {
  min-height: calc(100vh - 150px);
  position: relative;
}
.particles-canvas {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 0;
  pointer-events: none;
}
.main-content {
  position: relative;
  z-index: 1;
}

.feature-card {
  display: block;
  text-decoration: none;
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card div {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.feature-card i {
  transition: transform 0.3s;
}

.feature-card:hover i {
  transform: scale(1.1);
}

/* Dark mode transitions */
.dark .feature-card {
  transition: all 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .home-container {
    padding: 1.5rem 1rem;
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
