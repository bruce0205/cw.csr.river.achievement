import { createApp } from "vue";
import { createPinia } from 'pinia';
import "./style.css";
import App from "./App.vue";
import "@fontsource/noto-serif-tc";
import "@fontsource/noto-sans-tc";
import "virtual:svg-icons-register";
import Vue3Marquee from "vue3-marquee";
import TrackViewport from './directives/TrackViewport';
// import router from './router';

const app = createApp(App);

app.directive('track-viewport', TrackViewport);
// app.use(router);
app.use(createPinia());
app.use(Vue3Marquee)

app.mount("#app");
