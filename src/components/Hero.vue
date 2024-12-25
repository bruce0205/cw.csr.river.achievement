<script setup>
import { useAppStore } from "@/stores/appStore";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { heroSection } = storeToRefs(appStore);

function scrollToOpening() {
  const opening = document.getElementById("introduction");
  if (opening) {
    opening.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<template>
  <div id="hero" class="hero">
    <video
      class="video"
      autoplay
      muted
      loop
      playsinline
      webkit-playsinline
      x5-playsinline
      preload="auto"
      src="https://event.cw.com.tw/2024newtaipeiriver/kvbackground.mp4"
    ></video>
    <!-- src="https://storage.googleapis.com/web-csr-cw-com-tw/2023river/pixs/hero/0921herofinal2.mp4" -->
    <div
      class="absolute lg:top-[204px] md:top-[384px] top-[278px] debug-border-red lg:w-[400px] md:w-[312px] w-[250px] flex flex-col items-center"
    >
      <img class="" src="@/assets/logo.svg" />
      <h1 class="title">{{ heroSection?.title }}</h1>
      <h2 class="subtitle">{{ heroSection?.subtitle }}</h2>
      <div
        id="scroll-div"
        class="lg:mt-[150px] md:mt-[200px] mt-[200px]"
        @click="scrollToOpening"
      >
        <img src="@/assets/chevron.svg" />
        Scroll
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  // background-image: url("@/assets/hero-lg.jpeg");
  // background-repeat: no-repeat;
  // background-attachment: fixed;
  // background-position: center;
  // background-size: cover;
  @apply relative flex flex-col items-center w-full h-screen select-none;
  // lg:pt-[204px] lg:pb-[93px] md:pt-[384px] md:pb-[97px] pt-[278px] pb-[176px]
}
.title {
  font-family: "Noto Serif TC", serif;
  font-weight: 500;
  color: #f8f9f9;
  letter-spacing: 0.2em;
  @apply lg:mt-[30px] md:mt-[25px] mt-[20px] lg:text-[44px] md:text-[32px] text-2xl h-[32px];
}
.subtitle {
  font-family: "Noto Serif TC", serif;
  font-weight: 400;
  color: #f8f9f9;
  letter-spacing: 0.2em;
  @apply lg:mt-6 md:mt-[18px] mt-[15px] lg:text-xl md:text-base text-xs h-[28px];
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0); /* Default position */
  }
  50% {
    transform: translateY(-4px); /* Move upward */
  }
  25%,
  75% {
    transform: translateY(4px); /* Move downward */
  }
}
#scroll-div {
  animation: bounce 2s infinite;
  @apply py-4 px-2 rounded-md cursor-pointer text-white text-sm font-sans flex flex-col items-center select-none hover:bg-zinc-400 hover:bg-opacity-20;
}
.video {
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: cover;
}
</style>
