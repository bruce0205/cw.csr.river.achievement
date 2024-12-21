<script setup>
import { ref, watch } from "vue";
import useResponsive from "@/composables/useResponsive";
import ActionCard from "./ActionCard.vue";
import SvgIcon from "@/components/SvgIcon.vue";
const { isLarge, isMedium, screenType } = useResponsive();
const currentIndex = ref(0);

const filterMapData = [];
for (let i = 1; i <= 6; i++) {
  filterMapData.push({
    id: 100,
    org_short: "組織企業",
    city_name: "台北市/大安",
    act_date: "2023.09.24",
    act_subtitle: `${i}.淡水三芝海岸淨灘行動`,
    exh_name: "生態保育",
    award: true,
    isSignup: true,
    act_cover_image:
      "https://csr.cw.com.tw/topics/2023river/pixs/action/horizontal/action_pc-55.jpg",
  });
}

watch(
  () => screenType,
  () => {
    currentIndex.value = isLarge.value ? 3 : isMedium.value ? 2 : 1;
  },
  { immediate: true }
);

// .actions__body
function moveActionCard(info, containerSelector) {
  const container = document.querySelector(containerSelector);
  const cards = [...container.children];
  if (typeof info === "number") {
    const targetIndex = info > cards.length ? cards.length - 1 : info - 1;
    const targetCard = cards[targetIndex];
    const xCoord =
      targetCard.offsetLeft - container.clientWidth + targetCard.clientWidth;
    container.scrollTo({
      left: xCoord,
      behavior: "smooth",
    });
  }
  // cards.forEach((card) => {
  //   card.style.opacity = 0.3;
  // });

  const spaceReduction = isLarge.value ? 0 : isMedium.value ? 0 : 27 + 1;
  const showLine =
    container.getBoundingClientRect().left +
    container.clientWidth -
    spaceReduction;

  const passedCards = cards.filter((card) => {
    const cardLeft = card.getBoundingClientRect().left;

    return cardLeft <= showLine;
  });

  passedCards.forEach((card) => {
    card.style.opacity = 1;
  });
  currentIndex.value = passedCards.length;
}

async function goToAction(id) {
  // FIXME: await navigateTo({ name: 'action-id', params: { id } });
}

function showNavigator() {
  const baseCount = isLarge ? 3 : isMedium ? 2 : 1;
  return filterMapData.length > baseCount;
}
</script>

<template>
  <div class="actions">
    <div class="actions__title">
      <p class="title font-serif">•推薦行動</p>
    </div>
    <div
      id="actions__body"
      class="actions__body"
      @scroll="(info) => moveActionCard(info, '.actions__body')"
    >
      <ActionCard
        v-for="(data, index) in filterMapData"
        :key="index"
        :data="data"
        @click="() => goToAction(data.id)"
      />
    </div>
    <SvgIcon
      v-show="showNavigator() && isLarge"
      name="action-navigator-previous"
      class="navigator--previous"
      @click="() => moveActionCard(currentIndex - 1, '.actions__body')"
    />
    <SvgIcon
      v-show="showNavigator() && isMedium"
      name="action-navigator-next"
      class="navigator--next"
      @click="() => moveActionCard(currentIndex + 1, '.actions__body')"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/mixins/_media" as media;
.actions {
  // position: relative;
  padding: 0 0 0 10px;
  @apply absolute z-20 lg:-right-[100px] lg:bottom-[90px] bottom-[0px];
  @include media.md {
    padding: 0;
    translate: 50px 0;
  }
  @include media.lg {
    padding: 0;
    translate: -124px 0;
  }
  &__body {
    display: flex;
    gap: 20px;
    width: 380px;
    overflow: scroll hidden;
    @include media.md {
      gap: 30px;
      width: 696px;
    }
    @include media.lg {
      width: 780px;
    }
    > * {
      flex: 0 0 auto;
    }
  }
}
.title {
  padding: 0 20px;
  margin-bottom: 10px;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
  color: var(--grey-800, #2f3941);
  letter-spacing: 1.2px;
  @include media.md {
    padding: 0;
    margin-bottom: 12px;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
    color: var(--grey-800, #2f3941);
    letter-spacing: 1.2px;
  }
  @include media.lg {
    padding: 0 0 0 120px;
    margin-bottom: 14px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
    color: var(--grey-800, #2f3941);
    letter-spacing: 1.28px;
  }
}
.navigator {
  position: absolute;
  top: 100px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 350ms ease-out;
  translate: 0 -50%;
  @include media.md {
    top: 102px;
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
      left: 50px;
    }
    @include media.lg {
      left: 10px;
    }
    @extend .navigator;
  }
  &--next {
    right: 10px;
    @include media.md {
      right: 22px;
    }
    @include media.lg {
      // right: -88px;
    }
    @extend .navigator;
  }
}
</style>
