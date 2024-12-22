<script setup>
import { ref, watch, onUpdated } from "vue";
import useResponsive from "@/composables/useResponsive";
import { useMapStore } from "@/stores/mapStore";
import { storeToRefs } from "pinia";

const mapStore = useMapStore();
const { selectedLandmarkList, selectedProject } = storeToRefs(mapStore);
const { isLarge } = useResponsive();

const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);
const landmarkContainer = ref(null);
const showNavigator = ref(false);

onUpdated(() => {
  if (!selectedLandmarkList.value.length) {
    showNavigator.value = false;
    return;
  }
  const containerRight = landmarkContainer.value.getBoundingClientRect().right;
  const lastCardRight =
    landmarkContainer.value.children[
      landmarkContainer.value.children.length - 1
    ].getBoundingClientRect().right;

  showNavigator.value = containerRight <= lastCardRight;
});

watch(
  () => selectedProject.value?.projectNo,
  () => {
    landmarkContainer.value.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }
);

const moveNextCard = () => {
  const cards = [...landmarkContainer.value.children];
  let currentIndex = 0;
  // 1) get current card's index
  cards.forEach((card, index) => {
    if (
      Math.floor(card.getBoundingClientRect().right) <=
      Math.floor(landmarkContainer.value.getBoundingClientRect().right)
    ) {
      currentIndex = index;
    }
  });

  if (cards[currentIndex + 1]) {
    // 2) move to next card
    landmarkContainer.value.scrollTo({
      left:
        landmarkContainer.value.scrollLeft +
        cards[currentIndex + 1].getBoundingClientRect().right -
        landmarkContainer.value.getBoundingClientRect().right,
      behavior: "smooth",
    });
  }
};

const movePreviousCard = () => {
  const cards = [...landmarkContainer.value.children];
  let currentIndex = 0;
  // 1) get current card's index
  for (let i = cards.length - 1; i >= 0; i--) {
    if (
      Math.floor(cards[i].getBoundingClientRect().left) >=
      Math.floor(landmarkContainer.value.getBoundingClientRect().left)
    ) {
      currentIndex = i;
    }
  }

  if (cards[currentIndex - 1]) {
    // 2) move to previouse card
    landmarkContainer.value.scrollTo({
      left:
        landmarkContainer.value.scrollLeft +
        cards[currentIndex - 1].getBoundingClientRect().left -
        landmarkContainer.value.getBoundingClientRect().left,
      behavior: "smooth",
    });
  }
};

const clickLandmark = (data) => {
  if (data?.landmarkUrl) {
    window.open(data.landmarkUrl, "_blank");
  }
};

const startDrag = (e) => {
  if (!landmarkContainer.value) return; // Ensure the container is defined
  isDragging.value = true;
  startX.value = e.pageX - landmarkContainer.value.offsetLeft;
  scrollLeft.value = landmarkContainer.value.scrollLeft;
};

const stopDrag = () => {
  isDragging.value = false;
};

const onDrag = (e) => {
  if (!isDragging.value || !landmarkContainer.value) return; // Ensure dragging and container are defined
  e.preventDefault();
  const x = e.pageX - landmarkContainer.value.offsetLeft;
  const walk = (x - startX.value) * 2; // Adjust scrolling speed
  landmarkContainer.value.scrollLeft = scrollLeft.value - walk;
};
</script>
<template>
  <div
    class="absolute z-20 lg:top-[225px] lg:left-[765px] md:top-[682px] md:left-[60px] left-[30px] top-[510px] lg:w-[640px] md:w-[710px] w-[360px]"
  >
    <div class="lg:w-[640px] md:w-[710px] w-[360px] h-[34px] relative">
      <div
        v-if="isLarge && showNavigator"
        class="absolute left-0 w-[34px] h-[34px] flex justify-center items-center z-20 cursor-pointer"
        @click="() => movePreviousCard()"
      >
        <img src="@/assets/chevron-circle.svg" />
      </div>
      <div
        v-if="isLarge && showNavigator"
        class="absolute right-0 w-[34px] h-[34px] flex justify-center items-center z-20 cursor-pointer rotate-180"
        @click="() => moveNextCard()"
      >
        <img src="@/assets/chevron-circle.svg" />
      </div>
      <div
        v-if="isLarge"
        class="absolute left-0 h-full w-16 z-10 bg-gradient-to-r from-white"
      ></div>
      <div
        v-if="isLarge"
        class="absolute right-0 h-full w-16 z-10 bg-gradient-to-l from-white"
      ></div>
      <div
        id="landmarks__body"
        ref="landmarkContainer"
        class="landmark-container"
        @mousedown="startDrag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
        @mousemove="onDrag"
      >
        <div
          v-for="(data, index) in selectedLandmarkList"
          class="landmark"
          :key="index"
          @click="clickLandmark(data)"
        >
          {{ data.landmarkName }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.landmark-container {
  @apply flex flex-row gap-x-4 flex-nowrap whitespace-nowrap overflow-x-auto absolute lg:ml-10 lg:w-[560px] md:w-[710px] w-[360px] h-[34px];
  &:active {
    cursor: grab;
  }
}
.landmark {
  @apply bg-[#BDE1EF4D] text-[#2F3941] text-[15px] font-sans tracking-[.08em] w-fit px-4 py-2 rounded-[40px] cursor-pointer select-none flex items-center;
}
</style>
