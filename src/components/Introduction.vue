<script setup></script>

<template>
  <div
    id="riverPrizeInstruction"
    class="lg:pt-20 lg:pb-[120px] md:pt-[60px] md:pb-[100px] pt-10 pb-20 lg:w-[972px] md:w-[678px] w-[282px] flex flex-col items-center"
  >
    <div class="title">“ 倡議平台全面升級，從流域減污到生態共好 ”</div>
    <div
      class="lg:mt-10 md:mt-[26px] mt-6 w-full grid md:grid-cols-3 grid-cols-1 lg:gap-x-[120px] md:gap-x-[60px] gap-y-[60px]"
    >
      <div class="flex flex-col items-center">
        <div class="logo">
          <img src="@/assets/declaration.svg" />
        </div>
        <div class="subtitle">2050永續宣言</div>
        <div class="description">
          承諾2050年達成全市淨零碳排放目標，推動四大策略：能源轉型、智慧運輸、循環經濟和城市韌性調適​。將於八里區建設淨零碳示範區，涵蓋能源結構轉型、交通電動化、環保設施建設，成為淨零碳排目標的先行示範​。
        </div>
      </div>
      <div class="flex flex-col items-center">
        <div class="logo">
          <img src="@/assets/vision.svg" />
        </div>
        <div class="subtitle">2030永續願景目標</div>
        <div class="description">
          新北市承諾2030年前恢復淡水河生態，透過源頭減量、稽查與污水管理改善水質。並設PM2.5目標10μg/m³，持續改善空氣品質減少污染源。資源回收率提升至70%，強化分類與再利用，推動永續環境。
        </div>
      </div>
      <div class="flex flex-col items-center">
        <div class="logo">
          <img src="@/assets/metrics.svg" />
        </div>
        <div class="subtitle">永續淨零關鍵數據</div>
        <div class="description">
          新北市環境改善成效顯著：淡水河水質大幅提升，污水接管覆蓋率達72.41%，重污染區由21.4%降至1.7%。空氣品質優化，PM2.5濃度降至10.5μg/m³。此外，市民回收率達63.56%，並設立超過50個無塑市集與100家環保商店，全力推動永續發展。
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
