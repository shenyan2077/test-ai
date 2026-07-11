<!-- 底部锚点导航栏：固定底部，白色透明毛玻璃，5个图标+文字（总览/设计/续航/影像/屏幕） -->
<template>
  <div class="bottom-nav">
    <div class="nav-scroll">
      <div
        v-for="(item, index) in navItems"
        :key="item.id"
        class="nav-btn"
        :class="{ active: activeIndex === index }"
        @click="scrollTo(index)"
      >
        <div class="img-group">
          <img :src="item.icon" alt="" class="icon-normal" />
          <img :src="item.iconHighlight" alt="" class="icon-white" />
        </div>
        <p>{{ item.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navItems = [
  {
    id: 'section-kv',
    label: '总览',
    icon: '/assets/images/nav/images-nav-0-1-886a42.svg',
    iconHighlight: '/assets/images/nav/images-nav-0-highlight-1-a2d7d4.svg',
  },
  {
    id: 'section-color',
    label: '设计',
    icon: '/assets/images/nav/images-nav-1-1-7ecce2.svg',
    iconHighlight: '/assets/images/nav/images-nav-1-highlight-1-58023b.svg',
  },
  {
    id: 'section-battery',
    label: '续航',
    icon: '/assets/images/nav/images-nav-2-1-e78adf.svg',
    iconHighlight: '/assets/images/nav/images-nav-2-highlight-1-d83284.svg',
  },
  {
    id: 'section-camera',
    label: '影像',
    icon: '/assets/images/nav/images-nav-8-1-100fc8.svg',
    iconHighlight: '/assets/images/nav/images-nav-8-highlight-1-0c6616.svg',
  },
  {
    id: 'rotating-screen',
    label: '屏幕',
    icon: '/assets/images/nav/images-nav-5-1-ec1455.svg',
    iconHighlight: '/assets/images/nav/images-nav-5-highlight-1-c56383.svg',
  },
]

const activeIndex = ref(0)

const handleScroll = () => {
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
    window.scrollTo({ top: el.offsetTop - 104, behavior: 'smooth' })
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

  @include mo {
    display: none;
  }
}

.nav-scroll {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: $max-width;
  margin: 0 auto;
  padding: 12px 0;
  gap: 0;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 28px;
  cursor: pointer;
  transition: opacity 0.2s;
  opacity: 0.45;

  &:hover { opacity: 0.7; }
  &.active { opacity: 1; }

  .img-group {
    position: relative;
    height: 32px;
    width: 32px;
  }

  .icon-normal {
    width: 32px;
    height: 32px;
  }

  .icon-white {
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &.active .icon-white {
    opacity: 1;
  }

  &.active .icon-normal {
    opacity: 0;
  }

  p {
    font-size: 16px;
    font-weight: 500;
    color: $color-black;
    white-space: nowrap;
  }
}
</style>
