<!-- 一加15T产品导航：吸顶锚点导航，含总览/设计/续航/影像/屏幕5项，点击平滑滚动 -->
<template>
  <div class="product-nav" :class="{ visible: showNav }">
    <div class="nav-inner">
      <div
        v-for="(item, index) in navItems"
        :key="item.id"
        class="nav-item"
        :class="{ active: activeIndex === index }"
        @click="scrollTo(index)"
      >
        <span class="nav-label">{{ item.label }}</span>
      </div>
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

// 滚动超过 Hero 后显示
const showNav = ref(false)
const checkShow = () => {
  showNav.value = window.scrollY > window.innerHeight * 0.8
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('scroll', checkShow)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('scroll', checkShow)
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
  transform: translateY(-100%);
  transition: transform 0.3s ease;

  &.visible { transform: translateY(0); }

  .nav-inner {
    max-width: $max-width;
    height: 100%;
    margin: 0 auto;
    padding: 0 64px;
    display: flex;
    align-items: center;
    gap: 40px;

    @include mo { padding: 0 16px; gap: 20px; }
  }

  .nav-item {
    font-size: 14px;
    color: $color-text-secondary;
    cursor: pointer;
    padding: 4px 0;
    transition: color 0.2s;
    position: relative;

    &.active {
      color: $color-black;
      font-weight: 600;
    }

    &:hover { color: $color-text-primary; }
  }
}
</style>
