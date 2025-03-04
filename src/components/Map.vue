<script setup>
import { computed, onUpdated, watch } from "vue";
import useResponsive from "@/composables/useResponsive";
import { useMapStore } from "@/stores/mapStore";
import { useAppStore } from "@/stores/appStore";
import { storeToRefs } from "pinia";
import useMaps from "@/composables/useMaps";
import Actions from "./Actions.vue";
import Landmarks from "./Landmarks.vue";

const appStore = useAppStore();
const mapStore = useMapStore();
const { mapSection } = storeToRefs(appStore);
const {
  projectList,
  selectedProjectNo,
  selectedProject,
  selectedDistrictList,
  selectedDistrictNo,
  selectedDistrict,
} = storeToRefs(mapStore);
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

const mapDescription = computed(() => {
  if (!!selectedDistrict.value?.description)
    return selectedDistrict.value?.description;
  return selectedProject.value?.description;
});

function handleDistrictClick(e) {
  mapStore.$patch({ selectedDistrictNo: e.target.id.slice(-3) });
}

function animateAnchor() {
  const selectedAnchors = selectedDistrictList.value.map((selectedDistrict) => {
    return selectedDistrict?.districtNo?.toString();
  });

  // 1) reset anchor style
  const anchors = document.querySelectorAll('[id^="anchor-"]');
  anchors.forEach((anchor) => {
    anchor.style.animation = "bounce-anchor 2s infinite";
    anchor.style.display = "none";
  });

  // 2) reset district style & event listener
  const districts = document.querySelectorAll('[id^="ddistrict-"]');
  districts.forEach((districtEl) => {
    districtEl.classList.remove("active-district");
    districtEl.removeEventListener("click", handleDistrictClick);
  });

  // 3) enable style & event listner
  selectedAnchors.forEach((selectedAnchor) => {
    const anchorEl = document.querySelector(`#anchor-${selectedAnchor}`);
    if (!!anchorEl) anchorEl.style.display = "block";

    const districtEl = document.querySelector(`#ddistrict-${selectedAnchor}`);
    if (!!districtEl) {
      districtEl.classList.add("active-district");
      districtEl.addEventListener("click", handleDistrictClick);
    }
  });
}

function openProjectMap(url) {
  if (!!url) {
    window.open(url, "_blank");
  }
}

onUpdated(() => {
  animateAnchor();
  setTimeout(() => {
    // requestAnimationFrame(animate);
  }, 1000);
});

watch(selectedDistrictNo, (newValue) => {
  const oldEl = document.querySelector(
    '[style*="fill: rgb(228, 231, 233)"][id^="ddistrict-"]'
  );
  if (oldEl) oldEl.style.fill = "";

  const newEl = document.querySelector(`#ddistrict-${newValue}`);
  if (newEl) newEl.style.fill = "#E4E7E9";
});
</script>

<template>
  <div id="map" v-track-viewport="'map-viewed'" class="map-container">
    <div class="lg:w-[1440px] md:w-[768px] w-[390px]">
      <!-- 4-1> project selection -->
      <div class="relative map-project-container z-20">
        <div
          v-for="(project, index) in projectList"
          :key="index"
          :class="[
            'project-badge',
            selectedProjectNo === project.projectNo ? 'active' : '',
          ]"
          @click="() => mapStore.selectProject(project.projectNo)"
        >
          {{ project.projectName }}
        </div>
      </div>

      <div class="relative mt-2 lg:h-[725px] md:h-[915px] h-[740px] w-full">
        <!-- 4-2) map -->
        <div class="absolute z-10 map" v-html="targetMap"></div>

        <!-- 4-3) map title -->
        <div
          class="absolute lg:top-[60px] lg:right-[810px] md:top-[34px] md:right-[70px] right-5 top-[210px] z-20 flex flex-col gap-x-2"
        >
          <h2
            class="font-semibold font-serif text-[#2F3941] lg:text-[50px] md:text-[40px] text-[36px]"
          >
            {{ mapSection?.title }}
          </h2>
          <h3
            class="mt-1 font-semibold font-serif text-[#2F3941] lg:text-sm text-xs"
          >
            {{ mapSection?.subtitle }}
          </h3>
        </div>

        <!-- 4-4) description -->
        <div
          class="absolute z-20 lg:top-[60px] lg:left-[760px] md:top-[539px] md:left-[63px] top-[350px] flex flex-row lg:h-[130px] md:h-[108px] h-[135px]"
        >
          <div
            v-if="isMedium"
            class="lg:w-[130px] md:w-[108px] md:flex justify-center items-center"
          >
            <img :src="selectedProject?.iconUrl" />
          </div>
          <div
            class="lg:ml-5 md:ml-[18px] ml-[33px] flex flex-col justify-center"
          >
            <div class="map-description">
              {{ mapDescription }}
            </div>
            <div
              v-if="!!selectedProject?.mapUrl"
              class="click-map"
              @click="openProjectMap(selectedProject?.mapUrl)"
            >
              點擊看地圖 ➜
            </div>
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

<style lang="scss">
.map-container {
  @apply lg:pt-16 md:pt-9 pt-[29px] lg:pb-[100px] md:pb-20 pb-[60px] w-full bg-white flex flex-col items-center;

  .project-badge {
    @apply cursor-pointer bg-[#F8F9F9] border border-solid border-[#C2C8CC] rounded-[40px] pt-1 pb-[6px] px-4 text-[#87929D] text-[15px] font-sans tracking-[.08em] whitespace-nowrap;
    &.active {
      @apply text-[#2F3941] bg-[#FFFFFF];
    }
  }
  @media (width < 768px) {
    .map > svg {
      transform: translateX(-12px);
    }
  }
  .map {
    @media (width < 768px) {
      @apply w-[390px] -top-8 overflow-hidden;
    }
    @media (width >= 768px) {
      @apply left-[90px] top-1;
    }
    @media (width >= 1440px) {
      @apply lg:-left-5;
    }
  }
  .map-project-container {
    @apply lg:ml-12 md:ml-[35px] ml-[33px]  flex flex-row gap-x-5 flex-nowrap overflow-x-auto;
  }
  .map-description {
    @apply lg:w-[400px] md:w-[409px] w-[335px] font-sans lg:text-base md:text-[15px] text-[#2F3941] font-normal tracking-[.08em] lg:leading-[28.8px] leading-[27px];
  }
  .click-map {
    @apply cursor-pointer font-sans lg:text-base text-[15px] text-[#7ECCDE] font-medium tracking-[.08em] lg:leading-[28.8px] leading-[27px];
  }
}
</style>
