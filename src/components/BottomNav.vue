<!-- 底部锚点导航栏：总览6卡片屏向下滑动后出现，5个均分模块，白色毛玻璃+黑灰图标文字 -->
<template>
  <div class="bottom-nav" :class="{ visible: isVisible }">
    <div
      v-for="(item, index) in navItems"
      :key="item.id"
      class="nav-item"
      :class="{ active: activeIndex === index }"
      @click="scrollTo(index)"
    >
      <img :src="item.icon" alt="" class="nav-icon" />
      <span class="nav-label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navItems = [
  { id: 'section-kv', label: '总览', icon: '/assets/images/nav/images-nav-0-1-886a42.svg' },
  { id: 'section-color', label: '设计', icon: '/assets/images/nav/images-nav-1-1-7ecce2.svg' },
  { id: 'section-battery', label: '续航', icon: '/assets/images/nav/images-nav-2-1-e78adf.svg' },
  { id: 'section-camera', label: '影像', icon: '/assets/images/nav/images-nav-8-1-100fc8.svg' },
  { id: 'rotating-screen', label: '屏幕', icon: '/assets/images/nav/images-nav-5-1-ec1455.svg' },
]

const activeIndex = ref(0)
const isVisible = ref(false)

const handleScroll = () => {
  // 滚动过 OverviewSection（总览6卡片）后显示
  const overview = document.querySelector('.overview-section')
  if (overview) {
    const bottom = overview.getBoundingClientRect().bottom
    isVisible.value = bottom < 0
  }

  // 高亮当前 section
  const scrollY = window.scrollY + window.innerHeight / 2
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
    window.scrollTo({ top: el.offsetTop - 56, behavior: 'smooth' })
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped lang="scss">
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @include mo {
    display: none;
  }
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 0;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }

  .nav-icon {
    width: 32px;
    height: 32px;
    object-fit: contain;
    opacity: 0.45;
    transition: opacity 0.2s;
  }

  &.active .nav-icon {
    opacity: 1;
  }

  .nav-label {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.55);
    transition: color 0.2s;
  }

  &.active .nav-label {
    color: rgba(0, 0, 0, 0.95);
  }
}
</style>
