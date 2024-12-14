<script setup>
function scrollToOpening() {
  const opening = document.getElementById("riverPrizeInstruction");
  if (opening) {
    opening.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<template>
  <div class="hero">
    <img class="lg:w-[400px] md:w-[312px] w-[250px]" src="@/assets/logo.svg" />
    <h1 class="title">新北流域共好</h1>
    <h2 class="subtitle">看見水環境的蛻變實踐</h2>
    <div
      id="scroll-div"
      class="lg:mt-[150px] md:mt-[200px] mt-[200px]"
      @click="scrollToOpening"
    >
      <img src="@/assets/chevron.svg" />
      Scroll
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  background-image: url("@/assets/hero-lg.jpeg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  @apply flex flex-col items-center w-full h-screen lg:pt-[204px] lg:pb-[93px] md:pt-[384px] md:pb-[97px] pt-[278px] pb-[176px];
}
.title {
  font-family: "Noto Serif TC", serif;
  font-weight: 500;
  color: #f8f9f9;
  letter-spacing: 0.2em;
  @apply lg:mt-[30px] md:mt-[25px] mt-[20px] lg:text-[44px] md:text-[32px] text-2xl;
}
.subtitle {
  font-family: "Noto Serif TC", serif;
  font-weight: 400;
  color: #f8f9f9;
  letter-spacing: 0.2em;
  @apply lg:mt-6 md:mt-[18px] mt-[15px] lg:text-xl md:text-base text-xs;
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
</style>
