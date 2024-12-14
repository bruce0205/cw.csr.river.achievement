<script setup>
// const Cookie = useQuasar().cookies;
import { ref } from "vue";
const hasConfirmed = ref(false);

function checkCooliePolicy(decision) {
  if (!decision) {
    hasConfirmed.value = true;
    return;
  }
  // Cookie.set('hasVisited', true, { expires: 30 });
  hasConfirmed.value = true;
}
</script>

<template>
  <div class="cookie-bar" :class="{ show: !hasConfirmed }">
    <p class="cookie-bar__content">
      本館使用 cookies 來最佳化體驗<a
        href="https://member.cwg.tw/privacy-policy?pk_vid=9c4c82b8964b8f7f1693487618d16e48"
        target="_blank"
        class="cookie-bar__anchor"
        >隱私權政策</a
      >
    </p>
    <div class="cookie-bar__actions">
      <button class="button--accept" @click="() => checkCooliePolicy(true)">
        接受
      </button>
      <button class="button--reject" @click="() => checkCooliePolicy(false)">
        拒絕
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/mixins/_media" as media;
.cookie-bar {
  position: fixed;
  bottom: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 9px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 0;
  visibility: hidden;
  background: rgb(248 249 249 / 70%);
  backdrop-filter: blur(3px);
  opacity: 0;
  transition: all 0.45s ease-out;
  translate: 0 100%;
  @include media.md {
    // @media (min-width: 1440px) {
    flex-direction: row;
    gap: 15px;
  }
  &.show {
    visibility: visible;
    opacity: 1;
    translate: 0 0;
  }
  &__content {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 14px;
    line-height: 1.8;
    color: #2f3941;
    letter-spacing: 1.12px;
    opacity: 0.8;
  }
  &__anchor {
    font-family: "Noto Sans TC";
    color: var(--grey-800, #2f3941);
    text-decoration-line: underline;
    opacity: 0.7;
  }
}
.button {
  padding: 3px 14px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
  color: #2f3941;
  letter-spacing: 1.12px;
  cursor: pointer;
  background: transparent;
  border: 0;
  &--accept {
    background: rgb(255 255 255 / 80%);
    border-radius: 40px;
    @extend .button;
  }
  &--reject {
    opacity: 0.7;
    @extend .button;
  }
}
</style>
