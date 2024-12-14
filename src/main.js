import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "@fontsource/noto-serif-tc";
import "@fontsource/noto-sans-tc";
import "virtual:svg-icons-register";
import Vue3Marquee from "vue3-marquee";

createApp(App).use(Vue3Marquee).mount("#app");
