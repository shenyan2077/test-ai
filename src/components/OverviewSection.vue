<!-- 总览/KSP：6个卖点卡片网格 + 底部向下滚动指示箭头 + 底部固定导航栏 -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 6个核心卖点卡片，文案对齐官网 section-ksp
const features = [
  {
    img: '/assets/images/ksp/images-ksp-0-pc-1-80-21e0fd.jpg.webp',
    titleLines: ['第五代骁龙 8 至尊版旗舰芯', '全新一代「风驰游戏内核」'],
    desc: '流畅到飞起，轻松驾驭 165 超高帧游戏。',
    dark: true,
  },
  {
    img: '/assets/images/ksp/images-ksp-1-pc-1-80-b9ae96.jpg.webp',
    titleLines: ['165Hz 旗舰小直屏'],
    desc: '巨流畅，巨通透，巨护眼。',
    dark: false,
  },
  {
    img: '/assets/images/ksp/images-ksp-2-pc-1-80-0bd924.jpg.webp',
    titleLines: ['OPPO 自研 LUMO 凝光影像系统'],
    desc: '全新升级 3.5 倍潜望长焦，5000 万像素旗舰大底主摄。',
    dark: false,
  },
  {
    img: '/assets/images/ksp/images-ksp-3-pc-1-80-820ad5.jpg.webp',
    titleLines: ['超巨量 7500mAh 冰川电池'],
    desc: '早出晚归还有电，小屏告别充电宝。',
    dark: false,
  },
  {
    img: '/assets/images/ksp/images-ksp-4-pc-1-80-d4be81.jpg.webp',
    titleLines: ['超流畅 ColorOS 16'],
    desc: '流畅本色，AI 出色。',
    dark: true,
  },
  {
    img: '/assets/images/ksp/images-ksp-5-pc-1-80-43bbbf.jpg.webp',
    titleLines: ['1.1mm 极窄四等边'],
    desc: '小屏大视野，观感超惊艳。',
    dark: false,
  },
]

// 底部导航5项（去掉性能、系统）
const navItems = [
  { label: '续航', icon: '/assets/images/nav/images-nav-2-1-e78adf.svg', iconActive: '/assets/images/nav/images-nav-2-highlight-1-d83284.svg' },
  { label: '总览', icon: '/assets/images/nav/images-nav-0-1-886a42.svg', iconActive: '/assets/images/nav/images-nav-0-highlight-1-a2d7d4.svg' },
  { label: '设计', icon: '/assets/images/nav/images-nav-1-1-7ecce2.svg', iconActive: '/assets/images/nav/images-nav-1-highlight-1-58023b.svg' },
  { label: '影像', icon: '/assets/images/nav/images-nav-8-1-100fc8.svg', iconActive: '/assets/images/nav/images-nav-8-highlight-1-0c6616.svg' },
  { label: '屏幕', icon: '/assets/images/nav/images-nav-5-1-ec1455.svg', iconActive: '/assets/images/nav/images-nav-5-highlight-1-c56383.svg' },
]

// 滚动检测："向下查看更多"进入视口后底部导航常驻显示
const showBottomNav = ref(false)
const handleScroll = () => {
  if (showBottomNav.value) return
  const el = document.querySelector('.overview-section .scroll-tip')
  if (!el) return
  const rect = el.getBoundingClientRect()
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    showBottomNav.value = true
  }
}
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <section class="overview-section">
    <div class="overview-inner">
      <div class="card-grid">
        <div
          v-for="(f, i) in features"
          :key="i"
          class="feature-card"
          :class="{ 'text-dark': !f.dark, 'text-light': f.dark }"
        >
          <img class="card-bg" :src="f.img" :alt="f.titleLines[0]" />
          <div class="card-content">
            <p class="card-title">
              <template v-for="(line, j) in f.titleLines" :key="j">{{ line }}<br v-if="j < f.titleLines.length - 1" /></template>
            </p>
            <p class="card-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 底部滚动指示箭头 -->
      <div class="scroll-tip">
        <svg class="scroll-arrows" width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="arrow arrow-1" d="M11.3662 20.7453L3 12.6297L4.26767 11.4L12 18.9008L19.7323 11.4L21 12.6297L12.6338 20.7453C12.2838 21.0849 11.7162 21.0849 11.3662 20.7453Z" />
          <path class="arrow arrow-2" d="M11.3662 20.7453L3 12.6297L4.26767 11.4L12 18.9008L19.7323 11.4L21 12.6297L12.6338 20.7453C12.2838 21.0849 11.7162 21.0849 11.3662 20.7453Z" />
          <path class="arrow arrow-3" d="M11.3662 20.7453L3 12.6297L4.26767 11.4L12 18.9008L19.7323 11.4L21 12.6297L12.6338 20.7453C12.2838 21.0849 11.7162 21.0849 11.3662 20.7453Z" />
        </svg>
        <p class="scroll-text">向下查看更多</p>
      </div>
    </div>

    <!-- 底部固定导航栏：overview 区块可见时显示 -->
    <transition name="slide-up">
      <nav v-show="showBottomNav" class="bottom-nav">
        <div
          v-for="item in navItems"
          :key="item.label"
          class="bottom-nav-item"
        >
          <img class="nav-icon nav-icon-default" :src="item.icon" :alt="item.label" />
          <img class="nav-icon nav-icon-active" :src="item.iconActive" :alt="item.label" />
          <span class="nav-label">{{ item.label }}</span>
        </div>
      </nav>
    </transition>
  </section>
</template>

<style scoped lang="scss">
.overview-section {
  width: 100%;
  background: $color-white;
  padding: 24px 0;

  @include mo { padding: 16px 0; }
  @include pad { padding: 12px 0; }

  .overview-inner {
    width: 97%;
    margin: 0 auto;
    padding: 0;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 8px;
    height: calc(100vh - #{$nav-height} - 48px - 48px);

    @include mo {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 4px;
      height: auto;
    }
    @include pad {
      gap: 4px;
    }
  }

  .feature-card {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(0.98);
    }

    @include mo {
      grid-column: span 1;
      min-height: 160px;
    }

    .card-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-content {
      position: relative;
      z-index: 2;
      padding: 16px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      @include pad { padding: 9px; }
      @include mo { padding: 12px; }
    }

    /* 文字颜色根据背景图明暗区分 */
    &.text-light .card-content {
      .card-title { color: $color-white; opacity: 0.95; }
      .card-desc { color: $color-white; opacity: 0.55; }
    }

    &.text-dark .card-content {
      .card-title { color: $color-black; opacity: 0.95; }
      .card-desc { color: $color-black; opacity: 0.55; }
    }

    .card-title {
      font-size: 24px;
      font-weight: 700;
      line-height: 1.2;

      @include pad { font-size: 13px; }
      @include mo { font-size: 14px; }
    }

    .card-desc {
      font-size: 18px;
      line-height: 1.4;
      margin-top: 8px;

      @include pad { font-size: 10px; margin-top: 4px; }
      @include mo { font-size: 12px; margin-top: 4px; }
    }
  }

  /* 底部滚动指示箭头 */
  .scroll-tip {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0 8px;

    .scroll-arrows {
      .arrow {
        fill: $color-text-secondary;

        /* 三条箭头依次闪烁下移 */
        animation: arrow-bounce 1.5s ease-in-out infinite;

        &.arrow-1 { animation-delay: 0s; }
        &.arrow-2 { animation-delay: 0.2s; }
        &.arrow-3 { animation-delay: 0.4s; }
      }
    }

    .scroll-text {
      font-size: 12px;
      color: $color-text-secondary;
      margin-top: 6px;
      letter-spacing: 1px;
    }
  }
}

@keyframes arrow-bounce {
  0%, 100% {
    opacity: 0.2;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(3px);
  }
}

/* 底部固定导航栏 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $color-white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  z-index: 998;

  @include mo {
    padding: 8px 0 6px;
  }

  .bottom-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.08);
    }

    .nav-icon {
      width: 32px;
      height: 32px;
      object-fit: contain;

      @include mo { width: 24px; height: 24px; }
    }

    /* 常驻显示高亮（黑色）图标 */
    .nav-icon-default {
      display: none;
    }

    .nav-label {
      font-size: 12px;
      color: $color-black;
      font-weight: 600;
      white-space: nowrap;

      @include mo { font-size: 11px; }
    }
  }
}

/* 底部导航滑入滑出过渡 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
