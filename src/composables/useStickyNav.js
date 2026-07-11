// 吸顶导航逻辑：监听滚动，高亮当前可见 section 对应的导航项
import { ref, onMounted, onUnmounted } from 'vue'

export function useStickyNav(sectionIds) {
  const activeIndex = ref(0)

  const handleScroll = () => {
    const scrollY = window.scrollY + 120
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i])
      if (el && el.offsetTop <= scrollY) {
        activeIndex.value = i
        break
      }
    }
  }

  const scrollTo = (index) => {
    const el = document.getElementById(sectionIds[index])
    if (el) {
      window.scrollTo({ top: el.offsetTop - 56, behavior: 'smooth' })
    }
  }

  onMounted(() => window.addEventListener('scroll', handleScroll))
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))

  return { activeIndex, scrollTo }
}
