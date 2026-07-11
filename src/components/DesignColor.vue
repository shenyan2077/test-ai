<!-- 设计与配色：大字标题 + 三种配色切换交互（白巧/抹茶/可可） -->
<script setup>
import { ref } from 'vue'

// 三种配色：可可、白巧、抹茶
const currentColor = ref(0)
const colors = [
  {
    name: '纯粹可可',
    leftWord: '纯粹',
    rightWord: '可可',
    dotColor: '#5D4E3A',
    image: '/assets/images/color/images-pack-3586_1506-1-fddc5c.png.webp',
  },
  {
    name: '治愈白巧',
    leftWord: '治愈',
    rightWord: '白巧',
    dotColor: '#F0EDE6',
    image: '/assets/images/color/images-pack-3586_1508-1-409986.png.webp',
  },
  {
    name: '松弛抹茶',
    leftWord: '松弛',
    rightWord: '抹茶',
    dotColor: '#A3B59A',
    image: '/assets/images/color/images-pack-3586_1510-1-a0d90a.png.webp',
  },
]
</script>

<template>
  <section class="design-color">
    <div class="color-inner">
      <div class="title-area animate-in">
        <div class="title-line">轻巧的一小部</div>
        <div class="title-line">漂亮的一大步</div>
      </div>
      <div class="subtitle animate-in">款款都是<span class="highlight">主打色</span></div>
      <div class="phone-display">
        <div class="color-words left">
          <span
            v-for="(c, i) in colors"
            :key="'l' + i"
            class="word"
            :class="{ active: currentColor === i }"
            >{{ c.leftWord }}</span
          >
        </div>
        <div class="phone-wrapper">
          <img
            v-for="(c, i) in colors"
            :key="'p' + i"
            :src="c.image"
            :alt="c.name"
            class="phone-img"
            :class="{ active: currentColor === i }"
          />
        </div>
        <div class="color-words right">
          <span
            v-for="(c, i) in colors"
            :key="'r' + i"
            class="word"
            :class="{ active: currentColor === i }"
            >{{ c.rightWord }}</span
          >
        </div>
      </div>
      <div class="color-buttons">
        <div
          v-for="(c, i) in colors"
          :key="'b' + i"
          class="color-btn"
          :class="{ active: currentColor === i }"
          @click="currentColor = i"
        >
          <span class="btn-dot" :style="{ background: c.dotColor }"></span>
          <span class="btn-label">{{ c.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.design-color {
  width: 100%;
  min-height: calc(100vh - #{$nav-height});
  background: $color-white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 0;

  .color-inner {
    max-width: $max-width;
    width: 100%;
    padding: 0 64px;
    text-align: center;

    @include mo {
      padding: 0 16px;
    }
  }

  .title-area {
    .title-line {
      font-size: 96px;
      font-weight: 700;
      line-height: 1.2;
      color: $color-black;

      @include pad {
        font-size: 48px;
      }
      @include mo {
        font-size: 40px;
      }
    }
  }

  .subtitle {
    font-size: 48px;
    margin-top: 45px;
    color: $color-text-secondary;

    .highlight {
      color: $color-black;
      position: relative;
    }

    @include pad {
      font-size: 26px;
    }
    @include mo {
      font-size: 24px;
    }
  }

  .phone-display {
    position: relative;
    margin: 40px auto;
    max-width: 928px;
    display: flex;
    align-items: center;
    justify-content: center;

    .color-words {
      width: 200px;
      position: relative;
      height: 100px;

      .word {
        font-size: 80px;
        font-weight: 700;
        opacity: 0;
        transition: opacity 0.5s;
        position: absolute;
        top: 0;

        &.active {
          opacity: 1;
        }
      }

      &.left {
        text-align: right;

        .word {
          right: 0;
        }
      }
      &.right {
        text-align: left;

        .word {
          left: 0;
        }
      }
    }

    .phone-wrapper {
      position: relative;
      width: 400px;
      height: 500px;

      .phone-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        opacity: 0;
        transition: opacity 0.5s;

        &.active {
          opacity: 1;
        }
      }
    }
  }

  .color-buttons {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-top: 40px;

    .color-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.2s;

      &.active {
        opacity: 1;
      }

      .btn-dot {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid rgba(0, 0, 0, 0.1);
      }

      .btn-label {
        font-size: 14px;
        color: $color-text-primary;
      }
    }
  }
}
</style>
