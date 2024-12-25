<script setup>
import { ref, onMounted } from "vue";
import { useAppStore } from "@/stores/appStore";
import { storeToRefs } from "pinia";
import { fetchIntroduction } from "@/api/sheetApi";

const appStore = useAppStore();
const { introductionSection } = storeToRefs(appStore);
const introductionData = ref([
  ...Array(3).fill({
    loading: true,
  }),
]);

onMounted(async () => {
  const data = await fetchIntroduction();
  introductionData.value = data;
});
</script>

<template>
  <div
    id="introduction"
    v-track-viewport="'introduction-viewed'"
    class="lg:pt-20 lg:pb-[120px] md:pt-[60px] md:pb-[100px] pt-10 pb-20 lg:w-[972px] md:w-[678px] w-[282px] flex flex-col items-center"
  >
    <h2 class="title">{{ introductionSection?.title }}</h2>
    <div
      class="lg:mt-10 md:mt-[26px] mt-6 w-full grid md:grid-cols-3 grid-cols-1 lg:gap-x-[120px] md:gap-x-[60px] gap-y-[60px]"
    >
      <div
        v-for="(data, index) in introductionData"
        :key="index"
        class="flex flex-col items-center md:min-h-[390px]"
      >
        <div class="logo">
          <img :src="data.iconUrl" />
        </div>
        <div class="subtitle">{{ data.title }}</div>
        <div class="description">
          {{ data.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  @apply font-serif lg:text-2xl text-[22px] font-semibold text-[#2F3941] tracking-[.08em] text-center lg:leading-[38px] leading-[35px] px-2;
}
.logo {
  @apply lg:w-[180px] lg:h-[140px] w-[144px] h-[112px];
}
.subtitle {
  @apply font-serif lg:text-2xl text-xl font-semibold text-[#2F3941] tracking-[.08em];
}
.description {
  @apply lg:mt-[10px] mt-2 font-sans lg:text-[15px] text-sm lg:leading-[27px] leading-[25.2px] text-[#2F3941] tracking-[.08em];
}
</style>
