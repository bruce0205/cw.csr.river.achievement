<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
</script>

<template>
  <div
    id="footer"
    v-track-viewport="'footer-viewed'"
    class="w-full lg:py-20 md:py-[60px] py-10 flex flex-col items-center"
  >
    <img class="lg:w-[270px] w-[230px]" src="@/assets/logo.svg" />
    <div
      class="mt-[21px] text-2xl font-serif font-semibold text-[#C2C8CC] tracking-[.2em]"
    >
      新北流域共好
    </div>
    <div class="md:mt-[50px] mt-10 flex flex-row gap-x-5">
      <a target="_blank" href="https://csr.cw.com.tw/">
        <SvgIcon class="w-[30px] h-[30px]" name="google" />
      </a>
      <a target="_blank" href="https://www.facebook.com/CSR.cw?locale=zh_TW">
        <SvgIcon class="w-[30px] h-[30px]" name="facebook" />
      </a>
      <a target="_blank" href="https://www.instagram.com/csrcw/">
        <SvgIcon class="w-[30px] h-[30px]" name="instagram" />
      </a>
    </div>
    <a
      target="_blank"
      href="https://member.cwg.tw/privacy-policy"
      class="mt-[22px] cursor-pointer underline underline-offset-2 text-[#2F3941] text-[15px]"
    >
      隱私權政策
    </a>
    <div
      class="md:w-full w-[259px] mt-[22px] text-[#87929D] text-xs font-sans tracking-[.08em] text-center leading-[21.6px]"
    >
      Copyright © 2024 天下整合傳播部企劃製作 All rights reserved.
    </div>
    <div class="mt-[5px] text-[#87929D] text-xs font-sans tracking-[.08em]">
      版權所有，禁止擅自轉貼節錄
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
