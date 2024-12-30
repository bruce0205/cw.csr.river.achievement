<script setup>
import { computed } from "vue";
import useResponsive from "@/composables/useResponsive";
import dayjs from "dayjs";
import whiteRiverIcon from "@/assets/images/white-hamburger.svg";
import blueRiverIcon from "@/assets/images/blue-hamburger.svg";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const place = computed(() => {
  if (props.data.dis_name) {
    return `${props.data.city_name}/${props.data.dis_name}`;
  }
  return `${props.data.city_name}`;
});

const { isLarge } = useResponsive();

const imgSrc = computed(() => {
  if (props.data?.act_award === 1) {
    if (
      dayjs().isBefore(props.data.act_signup_end) ||
      !dayjs(props.data.act_signup_end).isValid()
    ) {
      return blueRiverIcon;
    } else {
      return whiteRiverIcon;
    }
  }
});
const iconBg = computed(() => {
  const endAt = props.data?.act_signup_end
    ? dayjs(props.data?.act_signup_end, "YYYY-MM-DD HH:mm:ss")
    : dayjs("2099-12-31");
  if (props.data?.act_award === 1 && !dayjs().isBefore(endAt))
    return "#0202024f";
  if (props.data?.act_award === 1 && dayjs().isBefore(endAt))
    return "#ffffffe0";
});
</script>

<template>
  <div v-if="isLarge" class="card-lg">
    <div
      class="flex items-start"
      :style="{ justifyContent: data.act_award ? 'space-between' : 'flex-end' }"
    >
      <div
        v-if="data.act_award"
        class="rounded-[50px] backdrop-blur-sm w-[56px] h-[35px] flex justify-center items-center item-river"
      >
        <img
          :src="imgSrc"
          alt="流域行動大賞 icon"
          class="w-[32px] h-[22px] self-center block"
        />
      </div>
      <div class="card-lg__badge">
        {{ data.exh_name }}
      </div>
    </div>
    <div class="grow"></div>
    <p class="card-lg__description font-serif">
      {{ data.act_subtitle }}
    </p>
    <p class="card-lg__caption">
      <span class="card-lg__brand">
        {{ data.org_short }}
      </span>
      <span class="card-lg__place">
        {{ place }}
      </span>
      <span class="card-lg__date">
        {{ data.act_date }}
      </span>
    </p>
    <div class="card-lg__img">
      <img :src="data.act_cover_image" alt="" />
    </div>
  </div>

  <div v-else class="action-card">
    <div class="action-card__img">
      <img :src="data.act_cover_image" alt="action card image" />
    </div>
    <p class="action-card__description">
      {{ data.act_subtitle }}
    </p>
    <div class="action-card__brand">
      {{ data.org_short }}
    </div>
    <div class="action-card__place">{{ place }}</div>
    <div class="action-card__date">
      {{ data.act_date }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/mixins/_media" as media;
.action-card {
  display: grid;
  grid-template:
    "img . . . . . ." 3.5px
    "img . badge badge badge badge badge" 21px
    "img . . . . . ." 4px
    "img . description description description description description" 58px
    "img . . . . . ." 8px
    "img . brand . place . date" auto
    "img . . . . . ." 3.5px / auto 14px auto 6px auto 6px 1fr;
  width: 333px;
  height: 136px;
  padding: 10px 12px 10px 10px;
  cursor: pointer;
  background-color: #f8f9f9;
  border-radius: 14px;
  &__img {
    grid-area: img;
    width: 87px;
    height: 116px;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  &__badge {
    display: flex;
    grid-area: badge;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: 21px;
    padding: 1px 8px 2px;
    background-color: #c2c8cc;
    border-radius: 10px;
    color: #fff;
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%;
    letter-spacing: 0.88px;
  }
  &__description {
    display: -webkit-box;
    grid-area: description;
    overflow: hidden;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%; /* 28.8px */
    color: var(--grey-800, #2f3941);
    letter-spacing: 1.44px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  &__brand {
    grid-area: brand;
    color: #68737d;
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%;
    letter-spacing: 0.88px;
  }
  &__place {
    grid-area: place;
    color: #68737d;
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%;
    letter-spacing: 0.88px;
  }
  &__date {
    grid-area: date;
    color: #68737d;
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%;
    letter-spacing: 0.88px;
  }
}
.card-lg {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 274px;
  padding: 13px;
  // background-image: v-bind('imgUrl');
  // background-repeat: no-repeat;
  // background-position: center;
  // background-size: cover;
  overflow: hidden;
  color: #fff;
  cursor: pointer;
  border-radius: 15px;
  transition: all 0.25s ease-out;
  &::after {
    position: absolute;
    inset: 0;
    display: block;
    content: "";
    background: linear-gradient(
      180deg,
      rgb(0 0 0 / 0%) 58.85%,
      rgb(0 0 0 / 39%) 100%
    );
    border-radius: 15px;
  }
  &:hover {
    .card-lg__img {
      scale: 1.05;
    }
  }
  &__img {
    position: absolute;
    inset: 0;
    z-index: -10;
    transition: all 250ms linear;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__badge {
    // align-self: flex-end;
    width: fit-content;
    padding: 4px 12px;
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: 600;
    line-height: 19.2px;
    color: #fff;
    letter-spacing: 0.96px;
    background-color: rgb(233 235 237 / 30%);
    backdrop-filter: blur(3px);
    border-radius: 40px;
  }
  &__description {
    position: relative;
    z-index: 10;
    display: -webkit-box;
    height: 58px;
    margin-bottom: 6px;
    overflow: hidden;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.6;
    letter-spacing: 1.44px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  &__caption {
    position: relative;
    z-index: 10;
    display: flex;
    gap: 5px;
    align-items: center;
    width: 100%;
    overflow-x: scroll;
    font-size: 11px;
    > div {
      flex: 0 0 auto;
    }
  }
  &__brand {
    font-weight: 500;
    line-height: 1.6;
    letter-spacing: 0.88px;
  }
  &__place {
    line-height: 1.6;
    letter-spacing: 0.88px;
  }
  &__date {
    line-height: 1.6;
    letter-spacing: 0.88px;
  }
  .item-river {
    background: v-bind("iconBg");
  }
}
</style>
