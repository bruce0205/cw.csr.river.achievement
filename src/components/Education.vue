<script setup>
import { ref, onMounted, reactive } from "vue";
async function getSheet() {
  const originalUrl =
    "https://script.google.com/macros/s/AKfycbxh8DdxrPIEAcSdOoljDdm-LeRYJn-o1NIB2ST82BBauRJkKphIwY11LOniRLb_TFlS5Q/exec";
  const response = await fetch(originalUrl, {
    method: "GET",
    redirect: "follow", // 默认值就是 'follow'
  });
  const data = await response.text();
  console.log(data);
}
const topic = ref("“ 倡議平台全面升級，從流域減污到生態共好 ”");
// const topic = ref("")
const resourceData = reactive({
  name: "Resources",
  title: "教育資源",
  description:
    "除透過公開發表支持喚起大眾的意識，讓更多人意識到保護淡水河與環境的重要性水河與環境外。",
});

const actionData = reactive({
  name: "Action",
  title: "永續行動呼籲",
  description:
    "除透過公開發表支持喚起大眾的意識，讓更多人意識到保護淡水河與環境的重要性水河與環境外。",
});

onMounted(async () => {
  getSheet();
});
</script>

<template>
  <div
    class="lg:pb-[120px] md:pb-[100px] pb-20 lg:w-[790px] md:w-[660px] w-[320px] flex flex-col items-center"
  >
    <div class="topic">{{ topic }}</div>
    <div
      class="lg:mt-[60px] md:mt-[40px] mt-[30px] w-full grid md:grid-cols-2 grid-cols-1 lg:gap-x-[30px] gap-x-5 gap-y-5"
    >
      <div class="card">
        <div class="card-name">{{ resourceData.name }}</div>
        <img src="@/assets/resource.svg" />
        <div class="card-title">{{ resourceData.title }}</div>
        <div class="description">{{ resourceData.description }}</div>
      </div>
      <div class="card">
        <div class="card-name">{{ actionData.name }}</div>
        <img src="@/assets/action.svg" />
        <div class="card-title">{{ actionData.title }}</div>
        <div class="description">{{ actionData.description }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.topic {
  @apply font-serif lg:text-2xl text-[22px] font-semibold text-[#2F3941] tracking-[.08em] text-center lg:leading-[38px] leading-[35px] px-2;
  @media (width <= 768px) {
    @apply w-[282px] h-[70px];
  }
  @media (width > 768px) {
    @apply h-[38px];
  }
}
.card {
  @apply lg:h-[350px] h-[360px] pt-[30px] lg:px-[43px] px-[37px] border border-solid border-[#D8DCDE] bg-white rounded-[20px] flex flex-col items-center gap-y-4 cursor-pointer hover:scale-105 transition-transform;
}
.card-name {
  @apply font-serif text-sm font-semibold tracking-[.08em] text-[#68737D];
}
.card-title {
  @apply text-xl font-serif font-semibold tracking-[.08em] text-[#2F3941];
}
.description {
  @apply text-[#2F3941] text-[15px] font-sans leading-[27px] tracking-[.08em];
}
</style>
