import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/Home/index.vue";

const routes = [{ path: "/", name: "Home", component: HomePage }];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
  },
});

export default router;
