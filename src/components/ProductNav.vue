<!-- 一加15T产品导航：始终显示的产品名+锚点导航，含总览/设计/续航/影像/屏幕5项 -->
<template>
  <div class="product-nav">
    <div class="nav-inner">
      <span class="product-name">一加 15T</span>
      <div class="nav-links">
        <span
          v-for="(item, index) in navItems"
          :key="item.id"
          class="nav-item"
          :class="{ active: activeIndex === index }"
          @click="scrollTo(index)"
        >
          {{ item.label }}
        </span>
      </div>
      <a href="#" class="btn-buy">立即抢购</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navItems = [
  { id: 'section-kv', label: '总览' },
  { id: 'section-color', label: '设计' },
  { id: 'section-battery', label: '续航' },
  { id: 'section-camera', label: '影像' },
  { id: 'rotating-screen', label: '屏幕' },
]

const activeIndex = ref(0)

const handleScroll = () => {
  const scrollY = window.scrollY + 120
  for (let i = navItems.length - 1; i >= 0; i--) {
    const el = document.getElementById(navItems[i].id)
    if (el && el.offsetTop <= scrollY) {
      activeIndex.value = i
      break
    }
  }
}

const scrollTo = (index) => {
  const el = document.getElementById(navItems[index].id)
  if (el) {
    window.scrollTo({ top: el.offsetTop - 104, behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.product-nav {
  position: fixed;
  top: $nav-height;
  left: 0;
  width: 100%;
  height: 48px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  z-index: 999;

  .nav-inner {
    max-width: $max-width;
    height: 100%;
    margin: 0 auto;
    padding: 0 64px;
    display: flex;
    align-items: center;

    @include mo { padding: 0 16px; }
  }

  .product-name {
    font-size: 18px;
    font-weight: 600;
    color: $color-black;
    margin-right: 48px;
    white-space: nowrap;

    @include mo { margin-right: 16px; font-size: 16px; }
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
    flex: 1;

    @include mo { gap: 16px; }
  }

  .nav-item {
    font-size: 14px;
    color: $color-text-secondary;
    cursor: pointer;
    padding: 4px 0;
    transition: color 0.2s;
    white-space: nowrap;

    @include mo { font-size: 12px; }

    &.active {
      color: $color-black;
      font-weight: 600;
    }

    &:hover { color: $color-text-primary; }
  }

  .btn-buy {
    flex-shrink: 0;
    padding: 6px 20px;
    background: #f50514;
    color: $color-white;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    transition: opacity 0.2s;
    white-space: nowrap;

    &:hover { opacity: 0.85; }

    @include mo { padding: 4px 14px; font-size: 12px; }
  }
}
</style>
