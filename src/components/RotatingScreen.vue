<!-- 屏幕分屏1：小屏显示出色 — 滚动驱动手机旋转 + "165Hz"大字横移 + 底部文案淡入 -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const phoneImg = sectionRef.value.querySelector('.phone')
    const phoneYin = sectionRef.value.querySelector('.phone-yin')
    const bigText = sectionRef.value.querySelector('.bigtext')
    const bottomText = sectionRef.value.querySelector('.text-wrapper')

    // 标题逐字
    const splitChars = sectionRef.value.querySelectorAll('.split-char')
    gsap.fromTo(splitChars,
      { opacity: 0.15 },
      {
        opacity: 1, duration: 0.3, stagger: 0.02, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.value.querySelector('.emoji-squeeze'),
          start: 'top 80%',
          end: 'top 40%',
          scrub: 0.5,
        },
      }
    )

    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value.querySelector('.sticky-container'),
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    })
    // 手机旋转归正
    .fromTo(phoneImg,
      { rotate: -5, y: 34 },
      { rotate: 0, y: 0, duration: 2, ease: 'none' },
      0
    )
    // 阴影淡入
    .fromTo(phoneYin,
      { rotate: -5, y: 34, opacity: 0 },
      { rotate: 0, y: 0, opacity: 1, duration: 2, ease: 'none' },
      0
    )
    // 大字横移入场
    .fromTo(bigText,
      { x: 1707, opacity: 1 },
      { x: 0, opacity: 1, duration: 1.5, ease: 'none' },
      0.3
    )
    // 底部文案
    .fromTo(bottomText,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      1
    )
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="sectionRef" class="rotating-screen" id="rotating-screen">
    <!-- 96px 大字标题 -->
    <div class="emoji-squeeze">
      <div class="line">
        <span class="split-char">小</span><span class="split-char">屏</span><span class="split-char">显</span><span class="split-char">示</span><span class="split-char">超</span><span class="split-char">出</span><span class="split-char">色</span>
      </div>
      <div class="line">
        <span class="split-char">流</span><span class="split-char">畅</span><span class="split-char">通</span><span class="split-char">透</span><span class="split-char">更</span><span class="split-char">护</span><span class="split-char">眼</span>
      </div>
    </div>

    <!-- Sticky 滚动动画容器 -->
    <div class="sticky-container">
      <div class="sticky-viewport">
        <div class="phone-container">
          <!-- 手机正面图 -->
          <div class="phone-img-wrap">
            <img
              src="/assets/images/rotating-screen/images-rotating-screen-phone-1-4fcffe.png.webp"
              alt="一加15T"
              class="phone"
            />
            <!-- 手机阴影 -->
            <img
              src="/assets/images/rotating-screen/images-rotating-screen-phone-yin-1-c9f7f4.png.webp"
              alt=""
              class="phone-yin"
            />
          </div>

          <!-- 大字横移区 -->
          <div class="textdiv">
            <div class="bigtext">
              <p>165Hz 旗舰小直屏</p>
            </div>
          </div>

          <!-- 底部文案 -->
          <div class="text-wrapper">
            <p>巨流畅，巨通透，巨护眼。</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.rotating-screen {
  width: 100%;
  background: $color-white;

  .emoji-squeeze {
    text-align: center;
    font-size: 96px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: 0.5px;
    color: $color-black;
    padding-top: 140px;

    @include mo {
      font-size: 48px;
      padding-top: 80px;
    }
    @include pad {
      font-size: 48px;
    }

    .line { white-space: nowrap; }
    .split-char { opacity: 0.15; display: inline-block; }
  }

  .sticky-container {
    width: 100%;
    height: calc(100vh + 2000px);
    margin-top: 1.388vw;

    @include mo {
      margin-top: 40px;
      height: calc(100vh + 2000px);
    }
  }

  .sticky-viewport {
    position: sticky;
    top: $nav-height;
    width: 100%;
    height: calc(100vh - #{$nav-height});
    overflow: hidden;

    @include mo {
      top: $nav-height;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .phone-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $color-white;
    position: relative;

    @include mo {
      margin-top: 40px;
    }
  }

  .phone-img-wrap {
    position: relative;
    z-index: 2;
    width: 20.555vw;
    height: 72.083vw;

    @include mo {
      width: 162.5px;
      height: 440px;
      margin-left: 40px;
    }
    @include pad {
      width: 170px;
      height: 596px;
    }

    .phone {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .phone-yin {
      position: absolute;
      top: 3%;
      left: 0;
      width: 19.44vw;
      height: 76.74vw;
      object-fit: fill;
      z-index: 1;

      @include mo {
        width: 158px;
        height: 621px;
        left: 70%;
      }
      @include pad {
        width: 160px;
        height: 633px;
        top: 4%;
      }
    }
  }

  .textdiv {
    position: absolute;
    top: 56.764%;
    width: 100%;
    height: 252px;
    text-align: center;
    z-index: 1;
    overflow: hidden;

    @include mo {
      top: 10%;
      height: 77px;
    }
    @include pad {
      top: 40.764%;
      height: 136px;
    }
  }

  .bigtext {
    text-align: center;
    opacity: 0;

    p {
      font-size: 210px;
      font-weight: 500;
      line-height: 1.2;
      color: rgba(0, 0, 0, 0.95);
      white-space: nowrap;

      @include mo {
        font-size: 64px;
      }
      @include pad {
        font-size: 108px;
      }
    }
  }

  .text-wrapper {
    position: absolute;
    bottom: 12.27%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 3;
    opacity: 0;

    @include mo {
      bottom: 15%;
      padding-left: 16px;
      align-items: flex-start;
    }

    p {
      font-size: 64px;
      font-weight: 500;
      line-height: 1.2;
      text-align: center;
      color: rgba(0, 0, 0, 0.95);

      @include mo {
        font-size: 36px;
        text-align: left;
      }
    }
  }
}
</style>
