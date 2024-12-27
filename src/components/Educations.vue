<script setup>
import { ref, watch, onMounted } from "vue";
import { useAppStore } from "@/stores/appStore";
import { storeToRefs } from "pinia";
import useResponsive from "@/composables/useResponsive";
import EducationCard from "./EducationCard.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { fetchEducation } from "@/api/sheetApi";

const appStore = useAppStore();
const { educationSection } = storeToRefs(appStore);
const educationData = ref([]);
const { isMedium, screenType } = useResponsive();
const currentIndex = ref(0);

onMounted(async () => {
  const data = await fetchEducation();
  educationData.value = data;
});

watch(
  () => screenType,
  () => {
    currentIndex.value = isMedium.value ? 2 : 1;
  },
  { immediate: true }
);

function moveCard(info, containerSelector) {
  const container = document.querySelector(containerSelector);
  const cards = [...container.children];
  if (typeof info === "number") {
    const targetIndex = info > cards.length ? cards.length - 1 : info - 1;
    const targetCard = cards[targetIndex];
    // "2"是因為卡片有border
    const xCoord =
      targetCard.offsetLeft -
      container.clientWidth +
      targetCard.clientWidth +
      2;
    container.scrollTo({
      left: xCoord,
      behavior: "smooth",
    });
  }

  const showLine = container.getBoundingClientRect().right;
  const passedCards = cards.filter((card) => {
    const cardLeft = card.getBoundingClientRect().left;
    return cardLeft <= showLine;
  });

  currentIndex.value = passedCards.length;
}

async function goToLink(url) {}

function showNavigator() {
  const baseCount = isMedium ? 2 : 1;
  return educationData.value.length > baseCount;
}
</script>

<template>
  <div
    id="external-resources"
    v-track-viewport="'education-viewed'"
    class="lg:pb-[120px] md:pb-[100px] pb-20 lg:w-[790px] md:w-[660px] w-[320px] flex flex-col items-center"
  >
    <h2 class="topic">{{ educationSection?.title }}</h2>
    <div class="educations lg:mt-[60px] md:mt-[40px] mt-[30px]">
      <div
        id="educations__body"
        class="educations__body"
        @scroll="(info) => moveCard(info, '.educations__body')"
      >
        <EducationCard
          v-for="(data, index) in educationData"
          :key="index"
          :data="data"
          @click="() => goToLink(data.url)"
        />
      </div>
      <SvgIcon
        v-show="showNavigator()"
        name="action-navigator-previous"
        class="navigator--previous"
        @click="() => moveCard(currentIndex - 1, '.educations__body')"
      />
      <SvgIcon
        v-show="showNavigator()"
        name="action-navigator-next"
        class="navigator--next"
        @click="() => moveCard(currentIndex + 1, '.educations__body')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/mixins/_media" as media;
.topic {
  @apply font-serif lg:text-2xl text-[22px] font-semibold text-[#2F3941] tracking-[.08em] text-center lg:leading-[38px] leading-[35px] px-2;
  @media (width <= 768px) {
    @apply w-[282px] h-[70px];
  }
  @media (width > 768px) {
    @apply h-[38px];
  }
}
.educations {
  position: relative;
  &__body {
    display: flex;
    gap: 20px;
    width: 320px;
    overflow: scroll hidden;
    @include media.md {
      gap: 20px;
      width: 660px;
    }
    @include media.lg {
      gap: 30px;
      width: 790px;
    }
    > * {
      flex: 0 0 auto;
    }
  }
}
.navigator {
  position: absolute;
  top: 180px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 350ms ease-out;
  translate: 0 -50%;
  @include media.md {
    top: 180px;
  }
  @include media.lg {
    top: 175px;
  }
  &:hover {
    opacity: 1;
  }
  &--previous {
    left: 10px;
    @include media.md {
      left: 22px;
    }
    @extend .navigator;
  }
  &--next {
    right: 10px;
    @include media.md {
      right: 22px;
    }
    @extend .navigator;
  }
}
</style>
