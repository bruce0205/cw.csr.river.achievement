<script setup>
import { ref, computed, watchEffect, onMounted, onUpdated, watch } from "vue";
import useResponsive from "@/composables/useResponsive";
const { isLarge, isMedium, screenType } = useResponsive();
// const currentIndex = ref(0);

const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);
const landmarkContainer = ref(null);
const landmarks = ref([
  {
    id: 1,
    name: "伊莉莎海灘咖啡館",
    url: "https://maps.app.goo.gl/31QfwLpv3SwkhXYN8",
  },
  {
    id: 2,
    name: "豬爸爸石花凍",
    url: "https://maps.app.goo.gl/Qw5Sq6ZwjKhm5Yci7",
  },
  {
    id: 3,
    name: "豬小妹石花凍燒烤飲品",
    url: "https://maps.app.goo.gl/iQ912kRo7hEJ86dGA",
  },
  {
    id: 4,
    name: "白沙灣哈那海邊咖啡屋",
    url: "https://maps.app.goo.gl/nrVHuNepfdYJn6vq9",
  },
  {
    id: 5,
    name: "黑皮小吃",
    url: "https://maps.app.goo.gl/B1ydZdBnRFwoiuHV7",
  },
  {
    id: 6,
    name: "山海芳園景觀咖啡廳",
    url: "https://maps.app.goo.gl/CQjY8ga3RcVzqPxX9",
  },
  {
    id: 7,
    name: "靖瑜平價海鮮",
  },
  {
    id: 8,
    name: "福泰翡翠灣渡假飯店",
  },
  {
    id: 9,
    name: "馬納蒂 Manatee Diner",
  },
  {
    id: 10,
    name: "卯澳小吃",
  },
  {
    id: 11,
    name: "龍洞鼻頭角潛水店",
  },
]);

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
  if (data?.url) {
    window.open(data.url, "_blank");
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
        v-if="isLarge"
        class="absolute left-0 w-[34px] h-[34px] flex justify-center items-center z-20 cursor-pointer"
        @click="() => movePreviousCard()"
      >
        <img src="@/assets/chevron-circle.svg" />
      </div>
      <div
        v-if="isLarge"
        class="absolute right-0 w-[34px] h-[34px] flex justify-center items-center z-20 cursor-pointer rotate-180"
        @click="() => moveNextCard()"
      >
        <img src="@/assets/chevron-circle.svg" />
      </div>
      <div
        v-if="isLarge"
        class="absolute left-0 h-full w-32 z-10 bg-gradient-to-r from-white"
      ></div>
      <div
        v-if="isLarge"
        class="absolute right-0 h-full w-32 z-10 bg-gradient-to-l from-white"
      ></div>
      <div
        ref="landmarkContainer"
        class="landmark-container"
        @mousedown="startDrag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
        @mousemove="onDrag"
      >
        <div
          v-for="(data, index) in landmarks"
          class="landmark"
          :key="index"
          @click="clickLandmark(data)"
        >
          {{ data.name }}
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
  @apply bg-[#BDE1EF4D] text-[#2F3941] text-[15px] font-sans tracking-[.08em] w-fit px-4 py-2 rounded-[40px] cursor-pointer select-none;
}
</style>
