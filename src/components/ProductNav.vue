<!-- 导航第二行：一加15T + 概述/参数 + 立即抢购红色按钮，滚动后吸顶 -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 10
}
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <div class="product-nav" :class="{ scrolled }">
    <div class="nav-inner">
      <!-- 左侧：产品名称 -->
      <div class="nav-left">
        <span class="product-name">一加 15T</span>
      </div>
      <!-- 右侧：概述 -> 参数 -> 立即抢购 -->
      <div class="nav-right">
        <a href="#" class="nav-item">概述</a>
        <a href="#" class="nav-item">参数</a>
        <a href="#" class="btn-buy">立即抢购</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$brand-red: #f50514;
$product-nav-height: 48px;

.product-nav {
  position: fixed;
  top: $nav-height;
  left: 0;
  width: 100%;
  height: $product-nav-height;
  background: transparent;
  z-index: 999;
  transition: top 0.3s ease, background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease;
  border-bottom: 1px solid transparent;

  /* 滚动后：吸顶到 top:0 + 白底毛玻璃 + 分割线 */
  &.scrolled {
    top: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-bottom-color: rgba(0, 0, 0, 0.06);
  }

  /* 移动端隐藏 */
  @include mo {
    display: none;
  }

  .nav-inner {
    max-width: $max-width;
    height: 100%;
    margin: 0 auto;
    padding: 0 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include pad { padding: 0 24px; }
  }

  /* 左侧产品名 */
  .nav-left {
    .product-name {
      font-size: 15px;
      color: $color-text-primary;
      font-weight: 500;
      white-space: nowrap;
      display: inline-block;
      transition: transform 0.2s ease;

      &:hover { transform: scale(1.05); }
    }
  }

  /* 右侧链接 + 按钮 */
  .nav-right {
    display: flex;
    align-items: center;
    gap: 32px;

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

    .btn-buy {
      padding: 7px 24px;
      background: $brand-red;
      color: $color-white;
      border-radius: 999px;
      font-size: 14px;
      white-space: nowrap;
      display: inline-block;
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 8px rgba(245, 5, 20, 0.3);
      }
    }
  }
}
</style>
