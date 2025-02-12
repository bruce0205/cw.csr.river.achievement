<script setup>
import { onMounted, onUpdated } from "vue";
import { useAppStore } from "@/stores/appStore";
import { useMapStore } from "@/stores/mapStore";
import Hero from "@/components/Hero.vue";
import Introduction from "@/components/Introduction.vue";
import Achievement from "@/components/Achievement.vue";
import Map from "@/components/Map.vue";
import BeautyGallery from "@/components/BeautyGallery.vue";
import Educations from "@/components/Educations.vue";
import Footer from "@/components/Footer.vue";
import CookieBar from "@/components/CookieBar.vue";
import { loadGtm } from "@/utils/gtm-loader";
const GTM_ID = import.meta.env.VITE_GTM_ID;

const appStore = useAppStore();
const mapStore = useMapStore();

onMounted(() => {
  console.log("GTM_ID", GTM_ID)
  if (!!GTM_ID) loadGtm(GTM_ID);
});

onMounted(async () => {
  appStore.setSections();
  mapStore.initMap();
});
</script>

<template>
  <!-- 1) hero -->
  <Hero></Hero>
  <div class="body">
    <img class="md:mt-20 mt-10 lg:w-[380px] md:w-[320px] w-[240px] aspect-[531/174]" src="@/assets/newtaipei-logo.png" />
    <!-- 2) 前言 -->
    <Introduction></Introduction>

    <!-- 3) 里程碑 -->
    <Achievement></Achievement>

    <!-- 4) 地圖 -->
    <Map></Map>

    <!-- 5) 多媒體 -->
    <div class="w-full overflow-hidden">
      <BeautyGallery />
    </div>

    <!-- 6) 教育資源 -->
    <Educations></Educations>
  </div>
  <Footer></Footer>
  <CookieBar />
</template>

<style lang="scss">
.body {
  @apply w-full bg-[#F8F9F9] flex flex-col items-center;
}
@keyframes bounce-anchor {
  0%,
  100% {
    transform: translateY(0); /* Default position */
  }
  50% {
    transform: translateY(-2px); /* Move upward */
  }
  25%,
  75% {
    transform: translateY(-4px); /* Move downward */
  }
}
.active-district {
  cursor: pointer;
  fill: #f1f3f3;
  transition: fill 250ms ease-out;
  &:hover {
    fill: #e4e7e9;
  }
  &.active {
    fill: #e4e7e9;
  }
}
</style>
