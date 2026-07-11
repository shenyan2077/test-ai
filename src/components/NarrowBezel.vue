<!--
  1.1mm 超窄四等边：scroll-driven 动画
  - 大标题随滚动缩小至12px → 淡出
  - 副标题淡入
  - 上方手机向右旋转、下方手机向左旋转 → 最终居中不挡字
-->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const mainTitle = sectionRef.value.querySelector('.main-title')
    const textWrapper = sectionRef.value.querySelector('.text-wrapper')
    const phoneLeft = sectionRef.value.querySelector('.phone-left')
    const phoneRight = sectionRef.value.querySelector('.phone-right')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: '+=800',
        scrub: 1,
        pin: true,
      },
    })

    // 1. 大标题：缩小到 12px 等效（128px * 0.094 ≈ 12px）
    tl.fromTo(
      mainTitle,
      { scale: 1, opacity: 1 },
      { scale: 0.094, duration: 1, ease: 'none' }
    )
    // 2. 标题淡出
    tl.to(mainTitle, { opacity: 0, duration: 0.3 }, '+=0.1')
    // 3. 副标题淡入（与标题淡出重叠）
    tl.fromTo(
      textWrapper,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.3'
    )
    // 4. 上方手机（phone-right, origin-top-left）：+48deg → 向右旋转 → 居中
    tl.fromTo(
      phoneRight,
      { rotate: 0, x: 0, y: 0, scale: 1 },
      { rotate: 35, x: -350, y: '2vh', scale: 0.6, duration: 1, ease: 'none' },
      0
    )
    // 5. 下方手机（phone-left, origin-bottom-right）：+48deg → 向左旋转 → 居中
    tl.fromTo(
      phoneLeft,
      { rotate: 0, x: 0, y: 0, scale: 1 },
      { rotate: 35, x: 350, y: '6vh', scale: 0.6, duration: 1, ease: 'none' },
      0
    )
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <!-- GSAP pin 会将此 section 固定在视口，滚动 800px 驱动动画 -->
  <section ref="sectionRef" class="narrow-bezel">
    <!-- 标题：初始大字居中 -->
    <h2 class="main-title">1.1mm 超窄四等边</h2>

    <!-- 副标题：初始隐藏 -->
    <div class="text-wrapper">
      <p class="sub-title">窄出手机新高度，满屏精彩框不住。</p>
      <p class="desc">
        1.1mm 极窄四等边<sup>1</sup>，小屏大视野，观感超惊艳。一眼望去，满眼都沉浸，满屏皆精彩。
      </p>
    </div>

    <!-- 上方手机：从右下角伸出，origin-top-left，向右旋转 -->
    <div class="phone phone-right">
      <img
        src="/assets/images/thin/images-thin-phone-0-1-2366b7.png.webp"
        alt="一加15T 窄边框"
      />
    </div>

    <!-- 下方手机：从左上角伸出，origin-bottom-right，向左旋转 -->
    <div class="phone phone-left">
      <img
        src="/assets/images/thin/images-thin-phone-0-1-2366b7.png.webp"
        alt="一加15T 窄边框"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
/* ── 固定全屏 section，GSAP pin 自动添加 spacer ── */
.narrow-bezel {
  width: 100%;
  height: 100vh;
  background: $color-white;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── 大标题：初始居中，随滚动缩小 ── */
.main-title {
  position: absolute;
  z-index: 2;
  font-size: 128px;
  font-weight: 700;
  line-height: 1;
  color: $color-black;
  text-align: center;

  @include pad {
    font-size: 69px;
  }
  @include mo {
    font-size: 40px;
  }
}

/* ── 副标题：初始透明 ── */
.text-wrapper {
  position: absolute;
  z-index: 2;
  text-align: center;
  opacity: 0;

  .sub-title {
    font-size: 48px;
    font-weight: 300;
    line-height: 1;
    color: $color-black;

    @include pad {
      font-size: 26px;
    }
    @include mo {
      font-size: 32px;
      line-height: 1.3;
    }
  }

  .desc {
    font-size: 18px;
    font-weight: 400;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.55);
    margin-top: 16px;
    max-width: 600px;

    @include pad {
      font-size: 10px;
      margin-top: 8px;
    }
    @include mo {
      font-size: 14px;
      width: 328px;
      margin: 4px auto 0;
    }
  }
}

/* ── 手机图片：对角放置，部分溢出 ── */
.phone {
  position: absolute;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* 下方手机（phone-left）：从左上角延伸，底部可见
     origin-bottom-right + 48deg → 视觉上向左旋转 */
  &.phone-left {
    width: 800px;
    height: 1660px;
    left: -347px;
    top: -1390px;
    transform-origin: bottom right;

    @include pad {
      width: 433px;
      height: 898px;
      left: -188px;
      top: -752px;
    }
    @include mo {
      width: 580px;
      height: 1204px;
      left: -360px;
      top: -1000px;
    }
  }

  /* 上方手机（phone-right）：从右下角延伸，顶部可见
     origin-top-left + 48deg → 视觉上向右旋转 */
  &.phone-right {
    width: 800px;
    height: 1660px;
    right: -288px;
    bottom: -1380px;
    transform-origin: top left;

    @include pad {
      width: 433px;
      height: 898px;
      right: -156px;
      bottom: -746px;
    }
    @include mo {
      width: 580px;
      height: 1204px;
      right: -342px;
      bottom: -1000px;
    }
  }
}
</style>
