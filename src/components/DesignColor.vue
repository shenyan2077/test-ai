<!--
  设计与配色：GSAP 滚动时间轴
  pin + scrub 连续驱动：标题淡出 → 手机缩放旋转 → 背景大字渐入 → 底部UI上移 → 气泡弹跳
  核心焦点：手机图从竖直 100% 缩小到 80% 并旋转倾斜的连续滚动动画
-->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── 模板引用 ── */
const containerRef = ref(null)
const mainTitleRef = ref(null)
const phoneImgRef = ref(null)
const bgTextRef = ref(null)
const uiControlsRef = ref(null)
const tooltipRef = ref(null)

/* TODO: 替换为本地手机产品图（当前使用 public/assets/images/color/ 白巧配色图） */
const phoneImage = '/assets/images/color/images-color-phone-1-1-84e994.png'

/* 占位数据（颜色切换逻辑暂未实现） */
const colors = [
  { name: '治愈白巧', dot: '#F0EDE6' },
  { name: '纯粹可可', dot: '#5D4E3A' },
  { name: '松弛抹茶', dot: '#A3B59A' },
]
const currentColor = ref(0)

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

    // ── 1. 主标题上移 100px + 淡出 ──
    //    同时手机从竖直 100% 缩小到 80% 并旋转 -8° 倾斜
    tl.to(mainTitleRef.value, {
      y: -100,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    }, 0)
    tl.fromTo(phoneImgRef.value, {
      scale: 3,
      rotation: 45,
    }, {
      scale: 0.8,
      rotation: -8,
      duration: 0.4,
      ease: 'power2.out',
    }, 0)

    // ── 2. 背景大字缩放渐入 ──
    tl.fromTo(bgTextRef.value, {
      scale: 0.8,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })

    // ── 3. 底部 UI 上移渐入 ──
    tl.fromTo(uiControlsRef.value, {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out',
    })

    // ── 4. 气泡弹跳渐入 ──
    tl.fromTo(tooltipRef.value, {
      scale: 0,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.2,
      ease: 'back.out(1.7)',
    })
  }, containerRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="containerRef" class="design-color">
    <!-- 背景大字：缩放渐入，z-index 最低 -->
    <div ref="bgTextRef" class="bg-text">
      <span class="bg-text-word">漂亮的一大步</span>
    </div>

    <!-- 前景手机图：竖直 → 缩放80% + 旋转倾斜，覆盖在文字上方 -->
    <div class="phone-stage">
      <img ref="phoneImgRef" class="phone-img" :src="phoneImage" alt="一加 15T" />
    </div>

    <!-- 主标题：滚动后上移淡出 -->
    <div ref="mainTitleRef" class="main-title">
      <p class="title-line">轻巧的一小部</p>
      <p class="title-line">漂亮的一大步</p>
    </div>

    <!-- 底部 UI：配色按钮（占位） -->
    <div ref="uiControlsRef" class="ui-controls">
      <button
        v-for="(c, i) in colors"
        :key="i"
        class="color-btn"
        :class="{ active: currentColor === i }"
      >
        <span class="color-dot" :style="{ background: c.dot }"></span>
        <span class="color-name">{{ c.name }}</span>
      </button>
    </div>

    <!-- 气泡提示：弹跳渐入 -->
    <div ref="tooltipRef" class="tooltip">
      <span class="tooltip-text">{{ colors[currentColor].name }}</span>
      <span class="tooltip-arrow"></span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.design-color {
  width: 100%;
  height: 100vh;
  background: $color-white;
  position: relative;
  overflow: hidden;

  /* ── 背景大字：居中，z-index:1（最底层）── */
  .bg-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    pointer-events: none;
    white-space: nowrap;

    .bg-text-word {
      font-size: 200px;
      font-weight: 800;
      color: rgba(0, 0, 0, 0.04);
      letter-spacing: 10px;

      @include pad { font-size: 120px; }
      @include mo { font-size: 72px; }
    }
  }

  /* ── 手机展示：距顶部有距离，超出屏的由 section overflow:hidden 裁掉 ── */
  .phone-stage {
    position: absolute;
    top: 100vh;
    left: 40%;
    transform: translateX(-40%);
    z-index: 2;

    .phone-img {
      display: block;
      width: 400px;
      height: auto;
      object-fit: contain;
      will-change: transform;

      @include pad { width: 260px; }
      @include mo { width: 200px; }
    }
  }

  /* ── 主标题：上方居中，z-index:3 ── */
  .main-title {
    position: absolute;
    top: 14vh;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 3;

    .title-line {
      font-size: 64px;
      font-weight: 700;
      line-height: 1.25;
      color: $color-black;
      letter-spacing: 2px;

      @include pad { font-size: 36px; }
      @include mo { font-size: 28px; }
    }
  }

  /* ── 底部 UI：配色按钮，z-index:3 ── */
  .ui-controls {
    position: absolute;
    bottom: 10vh;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 36px;
    z-index: 3;

    @include mo { gap: 20px; }

    .color-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
      opacity: 0.5;
      transition: opacity 0.2s ease;

      &.active { opacity: 1; }

      .color-dot {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 2px solid rgba(0, 0, 0, 0.1);

        @include mo { width: 22px; height: 22px; }
      }

      .color-name {
        font-size: 13px;
        color: $color-text-primary;
        white-space: nowrap;

        @include mo { font-size: 11px; }
      }
    }
  }

  /* ── 气泡提示：z-index:4（最顶层）── */
  .tooltip {
    position: absolute;
    bottom: calc(10vh + 70px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 4;
    pointer-events: none;

    .tooltip-text {
      display: inline-block;
      padding: 6px 16px;
      background: $color-black;
      color: $color-white;
      font-size: 13px;
      border-radius: 20px;
      white-space: nowrap;
    }

    .tooltip-arrow {
      display: block;
      width: 0;
      height: 0;
      margin: 0 auto;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid $color-black;
    }
  }
}
</style>
