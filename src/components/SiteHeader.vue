<!-- 导航第一行：一加红色Logo + 主导航菜单，滚动后向上隐藏 -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 主导航项对齐官网 cmp-header
const navItems = ['手机', '平板', '耳机', '配件', '官方商城', '品牌', '服务', '论坛']

const scrolled = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 10
}
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header class="site-header" :class="{ scrolled }">
    <div class="header-inner">
      <!-- 左侧：一加方形 + ONEPLUS 红色 Logo -->
      <div class="header-left">
        <div class="logo">
          <span class="logo-icon">1+</span>
          <span class="logo-text">ONEPLUS</span>
        </div>
      </div>

      <!-- 中间：横向导航菜单 -->
      <nav class="header-center nav-menu">
        <a v-for="item in navItems" :key="item" href="#" class="nav-item">{{ item }}</a>
      </nav>

      <!-- 占位：保持中间菜单居中 -->
      <div class="header-placeholder"></div>

      <!-- 移动端汉堡按钮 -->
      <button
        class="hamburger"
        :class="{ open: mobileMenuOpen }"
        @click="mobileMenuOpen = !mobileMenuOpen"
        aria-label="菜单"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- 移动端下拉菜单 -->
    <transition name="dropdown">
      <div v-show="mobileMenuOpen" class="mobile-menu">
        <a
          v-for="item in navItems"
          :key="item"
          href="#"
          class="mobile-nav-item"
          @click="mobileMenuOpen = false"
        >{{ item }}</a>
      </div>
    </transition>
  </header>
</template>

<style scoped lang="scss">
$brand-red: #f50514;

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $nav-height;
  background: transparent;
  z-index: 1000;
  transition: transform 0.3s ease, background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  /* 滚动后第一行向上消失 */
  &.scrolled {
    transform: translateY(-100%);
  }

  .header-inner {
    max-width: $max-width;
    height: 100%;
    margin: 0 auto;
    padding: 0 64px;
    display: flex;
    align-items: center;
    gap: 32px;

    @include mo { padding: 0 16px; gap: 0; }
  }

  /* 左侧 Logo */
  .header-left {
    flex-shrink: 0;

    .logo {
      display: flex;
      align-items: center;
      gap: 6px;
      transition: transform 0.2s ease;

      &:hover { transform: scale(1.05); }
    }

    .logo-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border: 2px solid $brand-red;
      border-radius: 3px;
      font-size: 11px;
      font-weight: 700;
      color: $brand-red;
      line-height: 1;
    }

    .logo-text {
      font-size: 18px;
      font-weight: 700;
      color: $brand-red;
      letter-spacing: 0.5px;
    }
  }

  /* 中间导航菜单 */
  .header-center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;

    @include mo { display: none; }

    .nav-item {
      font-size: 14px;
      color: $color-text-primary;
      white-space: nowrap;
      display: inline-block;
      transition: transform 0.2s ease, opacity 0.2s ease;

      &:hover {
        transform: scale(1.05);
        opacity: 0.7;
      }
    }
  }

  /* 右侧占位（保持菜单居中），桌面端可见 */
  .header-placeholder {
    flex-shrink: 0;
    width: 280px; /* 与右侧 ProductNav 内容大致等宽，保持中间对称 */

    @include mo { display: none; }
  }

  /* 汉堡按钮：仅移动端可见 */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 28px;
    height: 28px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;

    @include mo { display: flex; }

    span {
      display: block;
      width: 100%;
      height: 2px;
      background: $color-black;
      border-radius: 1px;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    &.open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    &.open span:nth-child(2) {
      opacity: 0;
    }
    &.open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }

  /* 移动端下拉菜单 */
  .mobile-menu {
    position: absolute;
    top: $nav-height;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    padding: 8px 0;

    .mobile-nav-item {
      display: block;
      padding: 14px 24px;
      font-size: 15px;
      color: $color-text-primary;
      transition: background 0.2s ease, transform 0.2s ease;

      &:hover {
        background: $color-bg-tertiary;
        transform: scale(1.02);
      }
    }
  }
}

/* 下拉过渡动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
