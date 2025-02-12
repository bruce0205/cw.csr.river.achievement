<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import useResponsive from "@/composables/useResponsive";
const { isLarge, isMedium, isSmall, screenType } = useResponsive();
import gsap from "gsap";
import { fetchGallery, fetchGalleryMessage } from "@/api/sheetApi";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const photoData = ref([]);
const messageData = ref([]);
const horizontalScrollConfig = {
  sm: { start: "top top", additionX: 15 },
  md: { start: "top top", additionX: 60 },
  lg: { start: "top top", additionX: 80 },
};
const currentScrollConfig = computed(
  () => horizontalScrollConfig[screenType] ?? horizontalScrollConfig.lg
);

const formatText = function (message) {
  if (message) {
    return message.replace(/\n/g, "<br>");
  }
  return ""
}

const scrollAnimation = ref(null);
onMounted(async () => {
  const response = await fetchGallery();
  const messsageResponse = await fetchGalleryMessage();
  photoData.value = response;
  messageData.value = messsageResponse;
  
  scrollAnimation.value = gsap.to(".scroll-box", {
    x() {
      const container = document.querySelector("#media-gallery");
      return `${-(
        container.scrollWidth -
        container.clientWidth +
        currentScrollConfig.value.additionX
      )}px`;
    },
    ease: "none",
    scrollTrigger: {
      // markers: true,
      trigger: ".scroll-container",
      start: () => currentScrollConfig.value.start,
      scrub: true,
      pin: ".scroll-container",
      invalidateOnRefresh: true,
    },
  });

  ScrollTrigger.refresh();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".collage-1",
      start: "left center",
      scrub: true,
      once: true,
    },
    defaults: { ease: "none" },
  });
  tl.from(".collage-1 .text-en", { opacity: 0 })
    .from(".collage-1 .left .text-ch", { opacity: 0 })
    .from(".collage-1 .right-bottom .text-ch", { opacity: 0 })
    .from(".collage-2 .left .text-en", { opacity: 0 })
    .from(".collage-2 .left .text-ch", { opacity: 0 })
    .from(".collage-2 .right-top .text-ch", { opacity: 0 });
});

onBeforeUnmount(() => {
  scrollAnimation.value.kill();
});

const clickUrlFn = (url) => {
  if (!!url) window.open(url, "_blank");
};
</script>

<template>
  <div
    id="media-gallery"
    v-track-viewport="'gallery-viewed'"
    class="scroll-container"
  >
    <div class="scroll-container-header lt-lg">
      <div class="heading">
        <span class="heading__en font-serif h-[22.4px]">{{ messageData[1]?.message }}</span>
        <h2 class="heading__title font-serif md:h-[60.8px] h-[48px]">{{ messageData[0]?.message }}</h2>
        <h3 class="heading__subtitle font-serif h-[38px]">{{ messageData[2]?.message }}</h3>
      </div>
    </div>
    <div class="scroll-box">
      <div class="scroll-box__header gt-md invisible">
        <div>
          <div class="heading">
            <span class="heading__en">Crystal Curating2</span>
            <div class="heading__title">走近 流域之美2</div>
            <div class="heading__subtitle">流域的共生藝術夢境2</div>
          </div>
        </div>
      </div>
      <div class="scroll-box__inner">
        <img
          id="image1"
          :src="photoData[0]?.imageUrl"
          :alt="photoData[0]?.description"
          :class="[
            'br-l',
            'rectangle-l',
            photoData[0]?.clickUrl ? 'cursor-pointer' : '',
          ]"
          @click="clickUrlFn(photoData[0]?.clickUrl)"
        />
        <div class="collage-1">
          <p class="text-en font-serif md:h-[28.8px] h-[25.6px]">{{ messageData[3]?.message }}</p>
          <div class="grid-container">
            <div class="left">
              <div class="text-ch font-serif md:h-[60.8px] h-[57px]" v-html="formatText(messageData[4]?.message)"></div>
              <img
                :src="photoData[1]?.imageUrl"
                :alt="photoData[1]?.description"
                :class="[
                  'block',
                  'br-m',
                  'square-l',
                  photoData[1]?.clickUrl ? 'cursor-pointer' : '',
                ]"
                @click="clickUrlFn(photoData[1]?.clickUrl)"
              />
            </div>
            <img
              :src="photoData[2]?.imageUrl"
              :alt="photoData[2]?.description"
              :class="[
                'right-top',
                'br-m',
                'rectangle-s',
                photoData[2]?.clickUrl ? 'cursor-pointer' : '',
              ]"
              @click="clickUrlFn(photoData[2]?.clickUrl)"
            />
            <div class="right-bottom flex">
              <img
                :src="photoData[3]?.imageUrl"
                :alt="photoData[3]?.description"
                :class="[
                  'br-s',
                  'square-s',
                  photoData[3]?.clickUrl ? 'cursor-pointer' : '',
                ]"
                @click="clickUrlFn(photoData[3]?.clickUrl)"
              />
              <div class="text-ch font-serif" v-html="formatText(messageData[5]?.message)"></div>
            </div>
          </div>
        </div>
        <img
          :src="photoData[4]?.imageUrl"
          :alt="photoData[4]?.description"
          :class="[
            'br-l',
            'rectangle-l',
            photoData[4]?.clickUrl ? 'cursor-pointer' : '',
          ]"
          @click="clickUrlFn(photoData[4]?.clickUrl)"
        />
        <div class="collage-2">
          <div class="grid-container">
            <div class="left">
              <!-- <p class="text-en font-serif">Chasing Living</p> -->
              <p class="text-en font-serif md:h-[28.8px] h-[25.6px]">{{ messageData[6]?.message }}</p>
              <img
                :src="photoData[5]?.imageUrl"
                :alt="photoData[5]?.description"
                :class="[
                  'block',
                  'br-m',
                  'square-l',
                  photoData[5]?.clickUrl ? 'cursor-pointer' : '',
                ]"
                @click="clickUrlFn(photoData[5]?.clickUrl)"
              />
              <div class="text-ch font-serif" v-html="formatText(messageData[8]?.message)"></div>
            </div>
            <div class="right-top">
              <img
                :src="photoData[6]?.imageUrl"
                :alt="photoData[6]?.description"
                :class="[
                  'br-s',
                  'square-s',
                  photoData[6]?.clickUrl ? 'cursor-pointer' : '',
                ]"
                @click="clickUrlFn(photoData[6]?.clickUrl)"
              />
              <div class="text-ch font-serif" v-html="formatText(messageData[7]?.message)"></div>
            </div>
            <div class="right-bottom flex">
              <img
                :src="photoData[7]?.imageUrl"
                :alt="photoData[7]?.description"
                :class="[
                  'br-s',
                  'rectangle-s',
                  photoData[7]?.clickUrl ? 'cursor-pointer' : '',
                ]"
                @click="clickUrlFn(photoData[7]?.clickUrl)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/mixins/_media" as media;
// utility
.br {
  &-l {
    border-radius: 16px;
    @include media.md {
      border-radius: 18px;
    }
    @include media.lg {
      border-radius: 20px;
    }
  }
  &-m {
    border-radius: 12px;
    @include media.md {
      border-radius: 14px;
    }
    @include media.lg {
      border-radius: 16px;
    }
  }
  &-s {
    border-radius: 8px;
    @include media.md {
      border-radius: 10px;
    }
    @include media.lg {
      border-radius: 12px;
    }
  }
}
img {
  &.rectangle-l {
    width: 576px;
    height: 360px;
    @include media.md {
      width: 736px;
      height: 460px;
    }
    @include media.lg {
      width: 800px;
      height: 500px;
    }
  }
  &.rectangle-s {
    width: 244.8px;
    height: 158.4px;
    @include media.md {
      width: 312.8px;
      height: 202.4px;
    }
    @include media.lg {
      width: 340px;
      height: 220px;
    }
  }
  &.square-l {
    width: 158.4px;
    height: 158.4px;
    @include media.md {
      width: 202.4px;
      height: 202.4px;
    }
    @include media.lg {
      width: 220px;
      height: 220px;
    }
  }
  &.square-s {
    width: 129.6px;
    height: 129.6px;
    @include media.md {
      width: 165.6px;
      height: 165.6px;
    }
    @include media.lg {
      width: 180px;
      height: 180px;
    }
  }
}

// main style
.scroll-container {
  // padding: 30px 0px 20px 40px;
  padding: 40px 0 170px 30px;
  background: #f8f9f9;
  @include media.md {
    // padding: 80px 0px 30px 80px;
    padding: 80px 0 193px 80px;
  }
  @include media.lg {
    // padding: 0 118px 0 0;
    padding: 100px 0 0 90px;
  }
}

// --- 上半標題 ---
.heading {
  @include media.lg {
    width: max-content;
  }
  &__en {
    margin-bottom: 6px;
    color: #68737d;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
    letter-spacing: 1.04px;
    @include media.md {
      display: block;
      color: #68737d;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 160%;
      letter-spacing: 1.12px;
    }
  }
  &__title {
    margin-bottom: 12px;
    color: #2f3941;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
    letter-spacing: 5.4px;
    @include media.md {
      margin-bottom: 0;
    }
    @include media.lg {
      margin-bottom: 20px;
    }
    @include media.md {
      color: #2f3941;
      font-size: 38px;
      font-style: normal;
      font-weight: 600;
      line-height: 160%;
      letter-spacing: 6.84px;
    }
  }
  &__subtitle {
    // @include third-slogan_large($text-title);
    color: #2f3941;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 190%;
    letter-spacing: 1.6px;
  }
}

// --- 主要內容：滾動區域 ---
.scroll-box {
  display: flex;
  flex-wrap: nowrap;
  height: 360px;
  margin-top: 70px;
  @include media.md {
    height: 460px;
    margin-top: 60px;
  }
  @include media.lg {
    height: 760px;
    margin-top: 30px;
  }

  // --- font ---
  // @include title;

  // --- 滾動區域 ---
  &__header {
    display: none;
    @include media.lg {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      margin-right: 145px;
    }
    // img {
    //   width: 240px;
    //   height: 120px;
    //   @include media.md {
    //     width: 253.173px;
    //     height: 121.253px;
    //   }
    //   @include media.lg {
    //     width: 271.257px;
    //     height: 129.914px;
    //   }
    // }
  }
  &__inner {
    display: flex;
    flex-wrap: nowrap;
    margin: 0 0 0 auto;

    // --- image placeholder ---
    img {
      position: relative;
      &::after {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        display: block;
        width: 100%;
        height: 100%;
        content: "";
        background: #e9ebed;
      }
    }
  }
}

// --- 滾動區域小標 font ---
.text-en {
  // @include monitor_small($text-label);
  color: #87929d;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: 1.28px;
  @include media.md {
    color: #87929d;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
    letter-spacing: 1.36px;
  }
  @include media.lg {
    color: #87929d;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
    letter-spacing: 1.44px;
  }
}
.text-ch {
  // color: $text-title;
  // font 設定每段不太一樣
}

// --- 組合照片通用部分 ---
.grid-container {
  display: grid;
  grid-template: "left right-top" max-content "left right-bottom" max-content / max-content max-content;
  gap: 14.5px 14.5px;
  @include media.md {
    gap: 18.4px 18.4px;
  }
  @include media.md {
    gap: 20px 20px;
  }
  .left {
    grid-area: left;
  }
  .right-top {
    grid-area: right-top;
    align-self: end;
  }
  .right-bottom {
    grid-area: right-bottom;
  }
}

// 區塊佈局排版
.collage-1 {
  margin: 0 16.6px 0 40px;
  @include media.md {
    margin: 10px 43.6px 0 92px;
  }
  > .text-en {
    margin-bottom: 31.6px;
    text-align: center;
    @include media.md {
      margin-bottom: 36.6px;
    }
  }
  .grid-container {
    .left {
      @include media.md {
        margin: 38.8px 0 0 auto;
      }
      > img {
        margin: 22.8px 0 0 auto;
      }
      .text-ch {
        // width: 11rem;
        margin-right: 19.5px;
        font-size: 15px;
        font-weight: 600;
        line-height: 190%; /* 28.5px */
        letter-spacing: 1.2px;
        @include media.md {
          font-size: 16px;
          font-weight: 600;
          line-height: 190%; /* 30.4px */
          letter-spacing: 1.28px;
        }
      }
    }
    .right-bottom {
      .text-ch {
        // width: 11rem;
        margin: 52px 0 0 14.6px;
        font-size: 14px;
        font-weight: 500;
        line-height: 190%; /* 26.6px */
        letter-spacing: 1.12px;
        @include media.md {
          font-size: 15px;
          font-weight: 500;
          line-height: 190%; /* 28.5px */
          letter-spacing: 1.2px;
        }
      }
    }
  }
}
.collage-2 {
  margin-left: 40.4px;
  @include media.md {
    margin: 37px auto auto 61.4px;
  }
  .grid-container {
    .left {
      .text-en {
        width: fit-content;
        margin: 14px 53.4px 52.6px auto;
        @include media.md {
          margin: 0 auto 28.6px 0;
        }
      }
      > img {
        margin: 0 0 0 auto;
      }
      .text-ch {
        width: fit-content;
        margin: 23px auto auto 0;
        font-size: 15px;
        font-weight: 500;
        line-height: 190%; /* 28.5px */
        letter-spacing: 1.2px;
        @include media.md {
          margin: 35px 25px auto auto;
        }
      }
    }
    .right-top {
      .text-ch {
        display: inline-block;
        margin: auto auto 36.4px 24px;
        font-size: 15px;
        font-weight: 600;
        line-height: 190%; /* 28.5px */
        letter-spacing: 1.2px;
        @include media.md {
          margin: auto auto 44.4px 22px;
        }
        @include media.md {
          font-size: 16px;
          font-weight: 600;
          line-height: 190%; /* 30.4px */
          letter-spacing: 1.28px;
        }
      }
    }
  }
}
</style>
