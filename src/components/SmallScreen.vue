<!-- 小屏手感：大字标题展示小屏手感优势，强调轻薄便携 -->
<script setup>
// 小屏手感模块：静态展示
</script>

<template>
  <section class="small-screen">
    <div class="screen-inner">
      <h2 class="main-title animate-in">小屏手感<br />大有可为</h2>
      <p class="desc animate-in">
        轻巧随身带，单手握持无压力。小巧身材里装着大能量，每一天都从容。
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.small-screen {
  width: 100%;
  min-height: calc(100vh - #{$nav-height});
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-white;
  position: relative;
  overflow: hidden;

  .screen-inner {
    max-width: $max-width;
    width: 100%;
    padding: 0 64px;
    text-align: center;

    @include mo {
      padding: 0 16px;
    }
  }

  .main-title {
    font-size: 96px;
    font-weight: 700;
    line-height: 1.1;
    color: $color-black;

    @include pad {
      font-size: 48px;
    }
    @include mo {
      font-size: 40px;
    }
  }

  .desc {
    font-size: 20px;
    color: $color-text-secondary;
    margin-top: 24px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    @include mo {
      font-size: 14px;
      max-width: 328px;
    }
  }
}
</style>
