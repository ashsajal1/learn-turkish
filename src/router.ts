import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./pages/Home.vue";
import AboutView from "./pages/About.vue";
import NotFound from "./pages/NotFound.vue";
import Grammar from "./pages/Grammar.vue";
import Words from "./pages/Words.vue";

const routes = [
  {
    path: "/",
    meta: { title: "Home", description: "Welcome to our homepage." },
    component: HomeView,
  },
  {
    path: "/grammar",
    meta: { title: "Grammar", description: "Welcome to our grammar page." },
    component: Grammar,
  },
  {
    path: "/words",
    meta: { title: "Words", description: "Welcome to our words page." },
    component: Words,
  },
  {
    path: "/about",
    component: AboutView,
    meta: {
      title: "About Us",
      description: "Learn more about us on this page.",
    },
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
