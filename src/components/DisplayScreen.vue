<!-- 屏幕护眼：展示屏幕亮度和护眼技术，全屏背景图+文字叠加 -->
<script setup>
// 屏幕护眼模块：展示屏幕亮度和护眼特性
</script>

<template>
  <section class="display-screen">
    <div class="screen-bg">
      <img
        src="/assets/images/screen/images-dim-light-dim-light-1-9b5614.jpg.webp"
        alt="屏幕护眼"
        class="bg-img"
      />
    </div>
    <div class="screen-content">
      <h2 class="main-title animate-in">明亮出众<br />暗光也护眼</h2>
      <p class="desc animate-in">
        高亮度显示，阳光下清晰可见。智能护眼技术，暗光环境下温柔呵护双眼。
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.display-screen {
  width: 100%;
  min-height: calc(100vh - #{$nav-height});
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  .screen-bg {
    position: absolute;
    inset: 0;
    z-index: 1;

    .bg-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .screen-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: $max-width;
    width: 100%;
    padding: 0 64px;

    @include mo {
      padding: 0 16px;
    }

    .main-title {
      font-size: 96px;
      font-weight: 700;
      line-height: 1.1;
      color: $color-white;
      text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);

      @include pad {
        font-size: 48px;
      }
      @include mo {
        font-size: 40px;
      }
    }

    .desc {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.85);
      margin-top: 24px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      text-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);

      @include mo {
        font-size: 14px;
        max-width: 328px;
      }
    }
  }
}
</style>
