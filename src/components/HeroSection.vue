<!-- Hero首屏：左侧文案+视频按钮，右侧四手机产品图堆叠，GSAP ScrollTrigger 错开渐入上移 -->
<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function playVideo() {
  window.open('/assets/video02.mp4', '_blank')
}

// 四个手机产品图：phone-0 最右最小，phone-3 最左最大，对应官网 img-wrapper 内顺序
const phones = [
  { src: '/assets/images/kv/images-kv-phone-0-1-fa31aa.png', cls: 'phone-0' },
  { src: '/assets/images/kv/images-kv-phone-1-1-64a058.png', cls: 'phone-1' },
  { src: '/assets/images/kv/images-kv-phone-2-1-5c4661.png', cls: 'phone-2' },
  { src: '/assets/images/kv/images-kv-phone-3-1-2e77d2.png.webp', cls: 'phone-3' },
]

onMounted(() => {
  // ScrollTrigger 区块入场：元素错开渐入+上移，统一 power2.out（非弹性）
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })

  // 1. 先：右侧四部手机 staggered 入场
  tl.from('.hero-section .phone-img', { rotation: -15, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' })
    .from('.hero-section .shadow-img', { opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.25')
    .from('.hero-section .coloros-badge', { y: 20, opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.15')
    // 2. "一加 15T"
    .from('.hero-section .product-name', { y: 40, opacity: 0, duration: 0.6, ease: 'power2.out' })
    // 3. "又小又强又美又全面"
    .from('.hero-section .product-slogan', { y: 40, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
    // 4. 视频模块
    .from('.hero-section .video-btn-wrapper', { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
})
</script>

<template>
  <section id="section-kv" class="hero-section">
    <div class="hero-container">
      <!-- 左侧：文案（移动端隐藏）+ 视频按钮 -->
      <div class="hero-left">
        <div class="text-group">
          <div class="product-name">一加 15T</div>
          <div class="product-slogan">又小又强又美又全面</div>
        </div>
        <div class="video-btn-wrapper" @click="playVideo">
          <div class="video-inner">
            <img src="/assets/images/kv/videos-kv-pre-pc_poster-1-310a25.jpg.webp" alt="一加 15T 视频" />
          </div>
          <div class="kv-btn">
            <img src="/assets/images/kv/images-kv-replay-1-de3808.svg" alt="播放" />
          </div>
        </div>
      </div>
      <!-- 右侧：阴影 + 四手机产品图堆叠（PC absolute，移动 relative） -->
      <div class="img-wrapper">
        <img class="shadow-img" src="/assets/images/kv/images-kv-shadow-pc-1-0773ab.png.webp" alt="" />
        <img
          v-for="p in phones"
          :key="p.cls"
          :class="['phone-img', p.cls]"
          :src="p.src"
          alt="一加 15T"
        />
      </div>
      <!-- ColorOS 标识（与 img-wrapper 同级，absolute） -->
      <img
        class="coloros-badge"
        src="/assets/images/misc/images-kv-coloros-1-34080c.png.webp"
        alt="ColorOS"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-section {
  width: 100%;
  height: calc(100vh - #{$nav-height} - #{$nav-height});
  margin-top: calc(#{$nav-height} + #{$nav-height});
  position: relative;
  overflow: hidden;

  .hero-container {
    position: relative;
    width: 91.1vw;
    max-width: 1920px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;

    @include mo {
      width: 100%;
      flex-direction: column-reverse;
      justify-content: center;
    }
  }

  /* 左侧 */
  .hero-left {
    position: relative;
    z-index: 2;

    @include mo {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .text-group {
      @include mo {
        display: none; /* 对应官网 mo-hidden */
      }
    }

    .product-name {
      font-family: $font-family;
      font-size: 64px;
      line-height: 1.2;
      color: $color-black;

      @include pad { font-size: 35px; }
    }

    .product-slogan {
      font-family: $font-family;
      font-size: 48px;
      line-height: 1.2;
      margin-top: 8px;
      margin-bottom: 48px;
      color: $color-black;

      @include pad { font-size: 26px; margin-top: 4px; margin-bottom: 26px; }
    }

    .video-btn-wrapper {
      position: relative;
      overflow: hidden;
      width: 230px;
      height: 124px;
      border-radius: 12px;
      cursor: pointer;

      @include pad { width: 122px; height: 67px; border-radius: 4px; }
      @include mo { width: 138px; height: 76px; border-radius: 4px; }

      .video-inner {
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .kv-btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 56px;
        height: 56px;

        @include pad { width: 30px; height: 30px; }
        @include mo { width: 30px; height: 30px; }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    }
  }

  /* 右侧：手机图堆叠（PC absolute 定位，尺寸沿用官网 vw 值） */
  .img-wrapper {
    position: absolute;
    width: 62.15vw;
    height: 38.125vw;
    right: 48px;

    @include pad { width: 477px; height: 292px; right: 26px; }
    @include mo { position: relative; width: 325px; height: 310px; right: auto; z-index: 1; }

    .shadow-img {
      position: absolute;
      width: 57.01vw;
      height: 15.9vw;
      left: 3.4vw;
      top: 35.2vw;
      object-fit: cover;

      @include pad { width: 437px; height: 121px; top: 270px; left: auto; right: 12px; }
      @include mo { width: 325px; height: 90px; top: 295px; left: auto; right: 33px; }
    }

    .phone-img {
      position: absolute;
      object-fit: cover;
      transform-origin: center bottom;

      &.phone-0 {
        width: 15.27vw; height: 34.09vw; left: 46.875vw; top: 4.027vw;
        @include pad { width: 117px; height: 261px; left: 360px; top: 30px; }
        @include mo { width: 94px; height: 216px; left: 231px; top: 94px; }
      }
      &.phone-1 {
        width: 21.1vw; height: 32vw; left: 32.291vw; top: 1.5vw;
        @include pad { width: 161px; height: 244px; left: 248px; top: 12px; }
        @include mo { width: 78px; height: 211px; left: 180px; top: 58px; }
      }
      &.phone-2 {
        width: 26.6vw; height: 26.88vw; left: 16.81vw; top: 0;
        @include pad { width: 204px; height: 206px; left: 129px; top: 0; }
        @include mo { width: 117px; height: 192px; left: 95px; top: 26px; }
      }
      &.phone-3 {
        width: 30.97vw; height: 19.65vw; left: 0; top: 0;
        @include pad { width: 237px; height: 150px; left: 0; top: 0; }
        @include mo { width: 151px; height: 157px; left: 0; top: 0; }
      }
    }
  }

  /* ColorOS 标识（absolute，与 img-wrapper 同级） */
  .coloros-badge {
    position: absolute;
    width: 9.86vw;
    height: 5.49vw;
    top: 2.08vw;
    right: -2.36vw;
    object-fit: cover;

    @include pad { width: 75px; height: 42px; top: 15px; right: -18px; }
    @include mo { width: 53px; height: 18px; top: auto; bottom: 12px; right: 12px; }
  }
}
</style>
