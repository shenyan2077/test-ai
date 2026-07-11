<!-- 顶部一加/OPPO 风格导航栏：logo + 导航项 + 购买入口，无下拉菜单 -->
<script setup>
// 顶部导航栏：纯静态展示，无下拉交互
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <div class="logo">
        <span class="logo-text">OnePlus</span>
      </div>
      <nav class="nav-menu">
        <a href="#" class="nav-item">手机</a>
        <a href="#" class="nav-item">配件</a>
        <a href="#" class="nav-item">服务</a>
        <a href="#" class="nav-item">品牌</a>
        <a href="#" class="nav-item">社区</a>
      </nav>
      <div class="header-actions">
        <span class="icon-search">🔍</span>
        <a href="#" class="btn-buy">立即购买</a>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $nav-height;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  .header-inner {
    max-width: $max-width;
    height: 100%;
    margin: 0 auto;
    padding: 0 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include mo {
      padding: 0 16px;
    }
  }

  .logo-text {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  .nav-menu {
    display: flex;
    gap: 32px;

    @include mo {
      display: none;
    }

    .nav-item {
      font-size: 14px;
      color: $color-text-primary;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.6;
      }
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 16px;

    .icon-search {
      cursor: pointer;
      font-size: 16px;
    }

    .btn-buy {
      padding: 8px 20px;
      background: $color-black;
      color: $color-white;
      border-radius: 999px;
      font-size: 14px;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
