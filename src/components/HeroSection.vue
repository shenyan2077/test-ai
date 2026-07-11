<!-- Hero首屏：产品名称 + slogan + 手机产品图，全屏视觉冲击 -->
<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

// Hero 首屏入场动画
onMounted(() => {
  const tl = gsap.timeline()
  tl.from('.product-name', { y: 40, opacity: 0, duration: 0.6, ease: 'power2.out' })
    .from('.product-slogan', { y: 40, opacity: 0, duration: 0.6 }, '-=0.3')
    .from('.video-btn', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
    .from('.phone-img', { y: 60, opacity: 0, duration: 0.8 }, '-=0.5')
})
</script>

<template>
  <section class="hero-section">
    <div class="hero-inner">
      <div class="hero-left">
        <h1 class="product-name">一加 15T</h1>
        <p class="product-slogan">又小又强又美又全面</p>
        <div class="video-btn">
          <img src="/assets/images/kv/images-kv-replay-1-de3808.svg" alt="play" />
        </div>
      </div>
      <div class="hero-right">
        <img
          src="/assets/images/kv/images-kv-phone-0-1-fa31aa.png"
          alt="一加 15T"
          class="phone-img"
        />
        <img
          src="/assets/images/misc/images-kv-coloros-1-34080c.png.webp"
          alt="ColorOS"
          class="coloros-badge"
        />
      </div>
    </div>
    <div class="scroll-hint">向下查看更多</div>
  </section>
</template>

<style scoped lang="scss">
.hero-section {
  width: 100%;
  height: calc(100vh - #{$nav-height});
  margin-top: $nav-height;
  position: relative;
  overflow: hidden;

  .hero-inner {
    max-width: $max-width;
    height: 100%;
    margin: 0 auto;
    padding: 0 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include mo {
      flex-direction: column-reverse;
      justify-content: center;
      padding: 0 16px;
    }
  }

  .hero-left {
    z-index: 2;

    .product-name {
      font-size: 64px;
      font-weight: 700;
      line-height: 1.2;
      color: $color-black;

      @include pad {
        font-size: 35px;
      }
      @include mo {
        font-size: 36px;
      }
    }

    .product-slogan {
      font-size: 48px;
      font-weight: 700;
      line-height: 1.2;
      margin-top: 8px;
      color: $color-black;

      @include pad {
        font-size: 26px;
      }
      @include mo {
        font-size: 24px;
      }
    }

    .video-btn {
      width: 56px;
      height: 56px;
      margin-top: 48px;
      cursor: pointer;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.1);
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .hero-right {
    position: relative;
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .phone-img {
      max-height: 80%;
      object-fit: contain;

      @include mo {
        max-height: 50%;
        max-width: 280px;
      }
    }

    .coloros-badge {
      position: absolute;
      top: 8%;
      right: -2%;
      width: 140px;

      @include mo {
        width: 53px;
      }
    }
  }

  .scroll-hint {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: $color-text-secondary;
    letter-spacing: 1px;
  }
}
</style>
