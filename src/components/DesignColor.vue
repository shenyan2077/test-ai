<!--
  设计与配色：GSAP 滚动时间轴 + 配色点击切换
  对齐官方"款款都是主打色"布局：顶部水印标题 + 副标题 + 左右词对 + 手机 + 横向胶囊按钮 + 底部描述 + 设计美图大赏链接
-->
<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── 模板引用 ── */
const containerRef = ref(null)
const colorBgRef = ref(null)
const watermarkRef = ref(null)
const subtitleRef = ref(null)
const leftWordsRef = ref(null)
const rightWordsRef = ref(null)
const phoneImgRef = ref(null)
const buttonsRef = ref(null)
const bottomRef = ref(null)

/* 三种配色：顺序/图片映射对齐官方
   0 治愈白巧 -> phone-0  1 松弛抹茶 -> phone-2  2 纯粹可可 -> phone-1
   每色带渐变背景 + 深浅标记（dark=true 时文字变白）*/
const colors = [
  {
    name: '治愈白巧',
    leftWord: '治愈',
    rightWord: '白巧',
    desc: '全白小屏机，小屏党的白月光。',
    btnIcon: '/assets/images/color/images-color-btn-0-1-076a57.png.webp',
    image: '/assets/images/color/images-color-phone-0-1-1f753e.png',
    bgGradient: 'linear-gradient(180deg, #FAFAFA 0%, #F0EDE6 50%, #E8E4D9 100%)',
    dark: false,
  },
  {
    name: '松弛抹茶',
    leftWord: '松弛',
    rightWord: '抹茶',
    desc: '超美小直屏，美得清新脱俗。',
    btnIcon: '/assets/images/color/images-color-btn-1-1-cd2823.png.webp',
    image: '/assets/images/color/images-color-phone-1-1-84e994.png',
    bgGradient: 'linear-gradient(180deg, #FFFFFF 0%, #e1fccf 100%)',
    dark: false,
  },
  {
    name: '纯粹可可',
    leftWord: '纯粹',
    rightWord: '可可',
    desc: '超美小直屏，你的时尚搭子。',
    btnIcon: '/assets/images/color/images-color-btn-2-1-d5aa74.png.webp',
    image: '/assets/images/color/images-color-phone-2-1-372a9d.png',
    bgGradient: 'linear-gradient(180deg, #FFFFFF 0%, #D4C4B0 100%)',
    dark: false,
  },
]
const currentColor = ref(0)

/* 点击切换配色：图片+背景渐变切换 */
watch(currentColor, () => {
  if (phoneImgRef.value) {
    gsap.fromTo(phoneImgRef.value, {
      opacity: 0.2,
    }, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    })
  }
  /* 背景：短暂降低透明度再恢复，模拟渐变切换过渡 */
  if (colorBgRef.value) {
    gsap.fromTo(colorBgRef.value, {
      opacity: 0.4,
    }, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    })
  }
})

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.value,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: '+=1500',
      },
    })

    // ── 0. 渐变背景上移渐入 ──
    tl.fromTo(colorBgRef.value, {
      opacity: 0,
      y: 100,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
    }, 0)

    // ── 1. 水印标题：随滚动上移+彻底淡出 ──
    tl.to(watermarkRef.value, {
      y: -100,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    }, 0)

    // ── 2. 手机缩放旋转位移（用户调好的参数，保持不变）──
    tl.fromTo(phoneImgRef.value, {
      scale: 3,
      rotation: 45,
      y: 800,
      xPercent: -70,
      yPercent: -50,
    }, {
      scale: 2,
      rotation: 10,
      y: 300,
      xPercent: -20,
      yPercent: -50,
      duration: 0.4,
      ease: 'power2.out',
    }, 0)

    // ── 3. 副标题"款款都是主打色"上移渐入 ──
    tl.fromTo(subtitleRef.value, {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })

    // ── 4. 左右词对渐入 ──
    tl.fromTo([leftWordsRef.value, rightWordsRef.value], {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })

    // ── 5. 配色胶囊按钮上移渐入 ──
    tl.fromTo(buttonsRef.value, {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out',
    })

    // ── 6. 底部描述+设计美图大赏链接上移渐入 ──
    tl.fromTo(bottomRef.value, {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out',
    })
  }, containerRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="containerRef" class="design-color" :class="{ 'theme-dark': colors[currentColor].dark }">
    <!-- 渐变背景：随配色切换，随滚动渐入 -->
    <div ref="colorBgRef" class="color-bg" :style="{ background: colors[currentColor].bgGradient }"></div>

    <!-- 内容容器：70% 宽度居中 -->
    <div class="content-wrapper">
    <!-- 顶部水印标题：居中 -->
    <div ref="watermarkRef" class="watermark">
      <p class="wm-line">轻巧的一小部</p>
      <p class="wm-line">漂亮的一大步</p>
    </div>

    <!-- 副标题"款款都是主打色"：左上角 -->
    <div ref="subtitleRef" class="subtitle">
      <span class="sub-gray">款款都是</span>
      <span class="sub-black">
        主打色
        <img class="emoji emoji-left" src="/assets/images/color/images-color-0-1-9d200e.png.webp" alt="" />
        <img class="emoji emoji-right" src="/assets/images/color/images-color-1-1-14637e.png.webp" alt="" />
      </span>
    </div>

    <!-- 中间三栏：左词 | 手机 | 右词 -->
    <div ref="leftWordsRef" class="left-words">
      <span
        v-for="(c, i) in colors"
        :key="i"
        class="word"
        :class="{ active: currentColor === i }"
      >{{ c.leftWord }}</span>
    </div>

    <div class="phone-stage">
      <img
        ref="phoneImgRef"
        class="phone-img"
        :src="colors[currentColor].image"
        :alt="colors[currentColor].name"
      />
    </div>

    <div ref="rightWordsRef" class="right-words">
      <span
        v-for="(c, i) in colors"
        :key="i"
        class="word"
        :class="{ active: currentColor === i }"
      >{{ c.rightWord }}</span>
    </div>

    <!-- 横向胶囊按钮 -->
    <div ref="buttonsRef" class="color-buttons">
      <button
        v-for="(c, i) in colors"
        :key="i"
        class="color-pill"
        :class="{ active: currentColor === i }"
        @click="currentColor = i"
      >
        <img class="pill-icon" :src="c.btnIcon" :alt="c.name" />
        <span class="pill-text">{{ c.name }}</span>
      </button>
    </div>

    <!-- 底部：配色描述（左）+ 设计美图大赏链接（右） -->
    <div ref="bottomRef" class="bottom-bar">
      <div class="bottom-desc">
        <div
          v-for="(c, i) in colors"
          :key="i"
          class="desc-item"
          :class="{ active: currentColor === i }"
        >
          <p class="desc-title">{{ c.desc }}</p>
        </div>
      </div>
      <div class="modal-link">
        <img class="link-arrow" src="/assets/images/color/images-color-arrow-1-6af15e.png.webp" alt="" />
        <span>设计美图大赏</span>
      </div>
    </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.design-color {
  width: 100%;
  height: 100vh;
  background: transparent;
  position: relative;
  overflow: hidden;

  /* ── 内容容器：70% 宽度居中 ── */
  .content-wrapper {
    position: relative;
    width: 70%;
    height: 100%;
    margin: 0 auto;

    @include pad { width: 90%; }
    @include mo { width: 100%; }
  }

  /* ── 渐变背景：随配色切换（inline style 绑定）── */
  .color-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    transition: background 0.6s ease;
  }

  /* ── 深色背景时文字变白 ── */
  &.theme-dark {
    .watermark .wm-line { color: $color-white; }
    .subtitle .sub-gray { color: rgba(255, 255, 255, 0.45); }
    .subtitle .sub-black { color: $color-white; }
    .left-words .word,
    .right-words .word { color: $color-white; }
    .pill-text { color: $color-white; }
    .desc-title { color: $color-white; }
    .modal-link { color: $color-white; }
  }

  /* ── 水印标题：顶部居中 ── */
  .watermark {
    position: absolute;
    top: 10vh;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 3;

    .wm-line {
      font-size: 64px;
      font-weight: 700;
      line-height: 1.2;
      color: $color-black;
      opacity: 0.15;
      letter-spacing: 2px;
      transition: color 0.4s ease;

      @include pad { font-size: 36px; }
      @include mo { font-size: 28px; }
    }
  }

  /* ── 副标题"款款都是主打色"：左上角 ── */
  .subtitle {
    position: absolute;
    top: 14vh;
    left: 64px;
    z-index: 3;
    font-size: 48px;
    font-weight: 500;
    line-height: 1.2;
    transition: color 0.4s ease;

    @include pad { font-size: 26px; top: 12vh; left: 24px; }
    @include mo { font-size: 24px; top: 10vh; left: 16px; }

    .sub-gray {
      color: rgba(0, 0, 0, 0.45);
    }

    .sub-black {
      color: $color-black;
      position: relative;

      .emoji {
        position: absolute;
        width: 41px;
        height: 41px;
        object-fit: contain;

        @include pad { width: 24px; height: 24px; }
        @include mo { width: 24px; height: 24px; }

        &.emoji-left {
          bottom: -13px;
          left: -22px;

          @include mo { bottom: -11px; left: -9px; }
        }

        &.emoji-right {
          top: -18px;
          right: -16px;

          @include mo { top: -12px; right: -12px; }
        }
      }
    }
  }

  /* ── 左词：手机左侧，3 词绝对定位切换 ── */
  .left-words {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: 3;
    width: 300px;
    height: 140px;

    @include pad { left: 0; width: 180px; height: 90px; }
    @include mo { left: 0; width: 100px; height: 56px; }

    .word {
      position: absolute;
      top: 0;
      left: 0;
      font-size: calc(var(--rpx, 1px) * 210);
      font-weight: 700;
      color: $color-black;
      opacity: 0;
      transition: opacity 0.4s ease, color 0.4s ease;
      letter-spacing: 5px;
      white-space: nowrap;

      &.active { opacity: 1; }

      @include pad { font-size: calc(var(--rpx, 1px) * 118); }
      @include mo { font-size: calc(var(--rpx, 1px) * 80); }
    }
  }

  /* ── 右词：手机右侧，3 词绝对定位切换 ── */
  .right-words {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    z-index: 3;
    width: 300px;
    height: 140px;

    @include pad { right: 0; width: 180px; height: 90px; }
    @include mo { right: 0; width: 100px; height: 56px; }

    .word {
      position: absolute;
      top: 0;
      right: 0;
      font-size: calc(var(--rpx, 1px) * 210);
      font-weight: 700;
      color: $color-black;
      opacity: 0;
      transition: opacity 0.4s ease, color 0.4s ease;
      letter-spacing: 5px;
      white-space: nowrap;

      &.active { opacity: 1; }

      @include pad { font-size: calc(var(--rpx, 1px) * 118); }
      @include mo { font-size: calc(var(--rpx, 1px) * 80); }
    }
  }

  /* ── 手机展示：GSAP xPercent/yPercent 居中 ── */
  .phone-stage {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;

    .phone-img {
      display: block;
      width: 400px;
      height: auto;
      object-fit: contain;
      will-change: transform, opacity;

      @include pad { width: 260px; }
      @include mo { width: 200px; }
    }
  }

  /* ── 横向胶囊按钮 ── */
  .color-buttons {
    position: absolute;
    bottom: 16vh;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
    z-index: 3;

    @include pad { gap: 3px; }
    @include mo { gap: 4px; bottom: 14vh; }

    .color-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 14px;
      background: rgba(0, 0, 0, 0.06);
      border-radius: 999px;
      border: none;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.2s ease;

      &.active { opacity: 1; }

      @include pad { padding: 8px; gap: 4px; }
      @include mo { padding: 7px; gap: 6px; }

      .pill-icon {
        width: 32px;
        height: 32px;
        object-fit: contain;

        @include pad { width: 17px; height: 17px; }
        @include mo { width: 24px; height: 24px; }
      }

      .pill-text {
        font-size: 16px;
        font-weight: 500;
        color: $color-black;
        white-space: nowrap;
        transition: color 0.4s ease;

        @include pad { font-size: 9px; }
        @include mo { font-size: 12px; }
      }
    }
  }

  /* ── 底部：描述 + 设计美图大赏链接 ── */
  .bottom-bar {
    position: absolute;
    bottom: 12vh;
    left: 64px;
    right: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 3;

    @include pad { left: 24px; right: 24px; }
    @include mo { left: 16px; right: 16px; }

    .bottom-desc {
      position: relative;
      height: 40px;
      width: 300px;

      @include mo { width: 180px; height: 36px; }

      .desc-item {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity 0.4s ease, color 0.4s ease;

        &.active { opacity: 1; }

        .desc-title {
          font-size: 18px;
          font-weight: 500;
          color: $color-black;
          line-height: 1.4;
          transition: color 0.4s ease;

          @include pad { font-size: 12px; }
          @include mo { font-size: 12px; }
        }
      }
    }

    .modal-link {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      font-size: 16px;
      color: $color-black;
      white-space: nowrap;
      transition: color 0.4s ease;

      @include pad { gap: 6px; font-size: 9px; }
      @include mo { gap: 6px; font-size: 12px; }

      .link-arrow {
        width: 30px;
        height: 30px;
        object-fit: contain;

        @include pad { width: 17px; height: 17px; }
        @include mo { width: 18px; height: 18px; }
      }
    }
  }
}
</style>
