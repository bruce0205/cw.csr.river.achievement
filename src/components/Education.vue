<script setup></script>

<template>
  <div
    class="lg:pb-[120px] md:pb-[100px] pb-20 lg:w-[790px] md:w-[660px] w-[320px] flex flex-col items-center"
  >
    <div class="title">“ 倡議平台全面升級，從流域減污到生態共好 ”</div>
    <div
      class="lg:mt-[60px] md:mt-[40px] mt-[30px] w-full grid md:grid-cols-2 grid-cols-1 lg:gap-x-[30px] gap-x-5 gap-y-5"
    >
      <div class="card">
        <div class="card-name">Resources</div>
        <img src="@/assets/education.svg" />
        <div class="card-title">教育資源</div>
        <div class="description">
          除透過公開發表支持喚起大眾的意識，讓更多人意識到保護淡水河與環境的重要性水河與環境外。
        </div>
      </div>
      <div class="card">
        <div class="card-name">Action</div>
        <img src="@/assets/action.svg" />
        <div class="card-title">永續行動呼籲</div>
        <div class="description">
          除透過公開發表支持喚起大眾的意識，讓更多人意識到保護淡水河與環境的重要性水河與環境外。
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  @apply font-serif lg:text-2xl text-[22px] font-semibold text-[#2F3941] tracking-[.08em] text-center lg:leading-[38px] leading-[35px] px-2;
  @media (width <= 768px) {
    @apply w-[282px];
  }
}
.card {
  @apply lg:h-[350px] h-[360px] pt-[30px] lg:px-[43px] px-[37px] border border-solid border-[#D8DCDE] bg-white rounded-[20px] flex flex-col items-center gap-y-4;
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
