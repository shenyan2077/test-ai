<!-- 产品导航栏：首屏后顶替SiteHeader，左侧"一加15T"，右侧概述/参数/立即抢购 -->
<template>
  <div class="product-nav" :class="{ scrolled: isScrolled }">
    <div class="nav-inner">
      <span class="product-name">一加 15T</span>
      <div class="nav-right">
        <span class="nav-item" @click="scrollTo('section-kv')">概述</span>
        <span class="nav-item" @click="scrollTo('parameter')">参数</span>
        <a href="#" class="btn-buy">立即抢购</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > window.innerHeight * 0.8
}

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    window.scrollTo({ top: el.offsetTop - 56, behavior: 'smooth' })
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped lang="scss">
.product-nav {
  position: fixed;
  top: $nav-height;
  left: 0;
  width: 100%;
  height: 48px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  z-index: 999;
  transition: top 0.3s ease;

  &.scrolled {
    top: 0;
  }

  .nav-inner {
    max-width: $max-width;
    height: 100%;
    margin: 0 auto;
    padding: 0 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include mo { padding: 0 16px; }
  }

  .product-name {
    font-size: 18px;
    font-weight: 600;
    color: $color-black;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .nav-item {
    font-size: 14px;
    color: $color-text-secondary;
    cursor: pointer;
    transition: color 0.2s;

    &:hover { color: $color-text-primary; }
  }

  .btn-buy {
    padding: 6px 20px;
    background: #f50514;
    color: $color-white;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    transition: opacity 0.2s;

    &:hover { opacity: 0.85; }

    @include mo { padding: 4px 12px; font-size: 12px; }
  }
}
</style>
