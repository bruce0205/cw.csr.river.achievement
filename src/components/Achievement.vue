<script setup>
import { ref, onMounted } from "vue";
import { fetchAchievement } from "@/api/sheetApi";
import useResponsive from "@/composables/useResponsive";
const { isLarge } = useResponsive();

const achievementData = ref([
  ...Array(5).fill({
    loading: true,
  }),
]);

onMounted(async () => {
  const data = await fetchAchievement();
  achievementData.value = data;
});
</script>

<template>
  <div
    id="achievement"
    v-track-viewport="'achievement-viewed'"
    class="lg:pt-20 md:pt-[60px] pt-10 lg:pb-[120px] md:pb-[100px] pb-20 lg:w-[1210px] md:w-[768px] w-full"
  >
    <div class="flex flex-row gap-x-[60px] relative">
      <div
        v-if="isLarge"
        class="absolute left-0 h-full w-40 z-20 bg-gradient-to-r from-[#F8F9F9]"
      ></div>
      <div
        v-if="isLarge"
        class="absolute right-0 h-full w-40 z-20 bg-gradient-to-l from-[#F8F9F9]"
      ></div>
      <Vue3Marquee
        :pause-on-hover="true"
        @on-pause="playState = 'paused'"
        @on-resume="playState = 'playing'"
      >
        <div
          v-for="(data, index) in achievementData"
          :key="index"
          class="z-10 w-[300px] relative"
        >
          <div
            class="absolute border-b-2 border-solid border-[#E9EBED] w-[140px] top-8 -right-12"
          ></div>
          <div class="w-[240px] flex flex-col items-center">
            <div class="w-[70px] h-[70px] rounded-full bg-[#BDE1EFE1] relative">
              <div
                class="absolute bottom-2 left-5 font-serif text-[26px] text-[#2F3941] tracking-[.06em] font-semibold"
              >
                {{ data.year }}
              </div>
            </div>
            <div
              class="mt-[30px] font-serif text-xl font-semibold tracking-[0.08em]"
            >
              {{ data.title }}
            </div>
            <div
              class="mt-[10px] h-[120px] font-sans text-sm tracking-[.08em] text-[#2F3941] leading-[25px] overflow-y-hidden"
            >
              {{ data.description }}
            </div>
          </div>
        </div>
      </Vue3Marquee>
    </div>
    <img class="lg:mt-[35px] md:mt-[30px]" src="@/assets/achievement.svg" />
  </div>
</template>

<style lang="scss" scoped></style>
