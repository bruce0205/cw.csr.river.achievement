<script setup>
import { ref, onMounted, reactive } from "vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card">
    <div class="card-name">{{ data.name }}</div>
    <img v-if="data.icon === 'resource'" src="@/assets/resource.svg" />
    <img v-if="data.icon === 'action'" src="@/assets/action.svg" />
    <div class="card-title">{{ data.title }}</div>
    <div class="description">{{ data.description }}</div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply lg:w-[380px] w-[320px] lg:h-[350px] h-[360px] pt-[30px] lg:px-[43px] px-[37px] border border-solid border-[#D8DCDE] bg-white rounded-[20px] flex flex-col items-center gap-y-4 cursor-pointer;
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
