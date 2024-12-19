<script setup>
import { computed, onUpdated, ref } from "vue";
import useResponsive from "@/composables/useResponsive";
import useMaps from "@/composables/useMaps";
import Actions from "./Actions.vue";
import Landmarks from "./Landmarks.vue";
const { isLarge, isMedium } = useResponsive();
const [anchorMapLg, anchorMapMd, anchorMapSm] = useMaps([
  "anchor-map-lg",
  "anchor-map-md",
  "anchor-map-sm",
]);

const targetMap = computed(() => {
  return isLarge.value
    ? anchorMapLg.value
    : isMedium.value
    ? anchorMapMd.value
    : anchorMapSm.value;
});

function animateAnchor() {
  const anchors = document.querySelectorAll('[id^="anchor-"]');
  anchors.forEach((anchor) => {
    anchor.style.animation = "bounce-anchor 2s infinite";
  });
  const selectedAnchors = [
    "207",
    "208",
    "220",
    "221",
    "222",
    "239",
    "242",
    "251",
    "252",
    "253",
  ];
  selectedAnchors.forEach((selectedAnchor) => {
    document.querySelector(`#anchor-${selectedAnchor}`).style.display = "block";
    document
      .querySelector(`#ddistrict-${selectedAnchor}`)
      .classList.add("active-district");
  });
}

onUpdated(() => {
  setTimeout(() => {
    // requestAnimationFrame(animate);
    animateAnchor();
  }, 1000);
});
</script>

<template>
  <div class="map-container">
    <div class="lg:w-[1440px] md:w-[768px] w-[390px]">
      <!-- 4-1> project selection -->
      <div class="relative project-container z-20">
        <div class="project-badge active">五溝一堰計畫</div>
        <div class="project-badge">水環境巡守隊</div>
        <div class="project-badge">淨海合作社</div>
      </div>

      <div class="relative mt-2 lg:h-[725px] md:h-[915px] h-[740px] w-full">
        <!-- 4-2) map -->
        <div class="absolute z-10 map" v-html="targetMap"></div>

        <!-- 4-3) map title -->
        <div
          class="absolute lg:top-[60px] lg:right-[810px] md:top-[34px] md:right-[70px] right-5 top-[210px] z-20 flex flex-col gap-x-2"
        >
          <div
            class="font-semibold font-serif text-[#2F3941] lg:text-[50px] md:text-[40px] text-[36px]"
          >
            新北市
          </div>
          <div
            class="mt-1 font-semibold font-serif text-[#2F3941] lg:text-sm text-xs"
          >
            New Taipei City
          </div>
        </div>

        <!-- 4-4) description -->
        <div
          class="absolute z-20 lg:top-[60px] lg:left-[760px] md:top-[539px] md:left-[63px] top-[350px] flex flex-row lg:h-[130px] md:h-[108px] h-[135px]"
        >
          <div
            v-if="isMedium"
            class="lg:w-[130px] md:w-[108px] md:flex justify-center items-center"
          >
            <img src="@/assets/ball.svg" />
          </div>
          <div
            class="lg:ml-5 md:ml-[18px] ml-[33px] flex flex-col justify-center"
          >
            <div class="description">
              新北市政府推動「五溝一堰」計畫，全面整治湳仔溝、瓦磘溝、鴨母港溝、藤寮坑溝、大窠坑溪和碧潭堰，旨在解決水污染，恢復生態，提升生活品質。
            </div>
            <div class="click-map">點擊看地圖 ➜</div>
          </div>
        </div>

        <!-- 4-5) landmark anchor -->
        <Landmarks></Landmarks>

        <!-- 4-6) actions -->
        <Actions
          class="absolute z-20 lg:-right-[100px] lg:bottom-[90px] bottom-[0px]"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.map-container {
  @apply lg:pt-16 md:pt-9 pt-[29px] lg:pb-[100px] md:pb-20 pb-[60px] w-full bg-white flex flex-col items-center;
}
.project-badge {
  @apply cursor-pointer bg-[#F8F9F9] border border-solid border-[#C2C8CC] rounded-[40px] pt-1 pb-[6px] px-4 text-[#87929D] text-[15px] font-sans tracking-[.08em] whitespace-nowrap;
  &.active {
    @apply text-[#2F3941] bg-[#FFFFFF];
  }
}
.map {
  @media (width < 768px) {
    transform: translateX(-8px);
    @apply w-[390px] -top-8 overflow-hidden;
  }
  @media (width >= 768px) {
    @apply left-[90px] top-1;
  }
  @media (width >= 1440px) {
    @apply lg:-left-5;
  }
}
.project-container {
  @apply lg:ml-12 md:ml-[35px] ml-[33px]  flex flex-row gap-x-5 flex-nowrap overflow-x-auto;
}
.description {
  @apply lg:w-[400px] md:w-[409px] w-[335px] font-sans lg:text-base md:text-[15px] text-[#2F3941] font-normal tracking-[.08em] lg:leading-[28.8px] leading-[27px];
}
.click-map {
  @apply cursor-pointer font-sans lg:text-base text-[15px] text-[#7ECCDE] font-medium tracking-[.08em] lg:leading-[28.8px] leading-[27px];
}
</style>
