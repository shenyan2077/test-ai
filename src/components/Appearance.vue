<!-- 设计美图：展示手机外观细节，多角度产品图排列 -->
<script setup>
// 设计美图模块：展示产品多角度外观
</script>

<template>
  <section class="appearance">
    <div class="appearance-inner">
      <h2 class="main-title animate-in">精致设计<br />细节见真章</h2>
      <div class="image-grid animate-in">
        <div class="image-item large">
          <img
            src="/assets/images/color/images-pack-3592_2379-1-a0d1d7.png.webp"
            alt="一加15T 外观"
            class="appearance-img"
          />
        </div>
        <div class="image-item">
          <img
            src="/assets/images/color/images-pack-3592_2403-1-e6f030.png.webp"
            alt="一加15T 细节"
            class="appearance-img"
          />
        </div>
        <div class="image-item">
          <img
            src="/assets/images/color/images-pack-3593_2562-1-0845b8.png.webp"
            alt="一加15T 背面"
            class="appearance-img"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.appearance {
  width: 100%;
  min-height: calc(100vh - #{$nav-height});
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-white;
  padding: 80px 0;

  .appearance-inner {
    max-width: $max-width;
    width: 100%;
    padding: 0 64px;
    text-align: center;

    @include mo {
      padding: 0 16px;
    }
  }

  .main-title {
    font-size: 80px;
    font-weight: 700;
    line-height: 1.1;
    color: $color-black;
    margin-bottom: 48px;

    @include pad {
      font-size: 42px;
    }
    @include mo {
      font-size: 36px;
    }
  }

  .image-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 12px;
    max-width: 1200px;
    margin: 0 auto;

    @include mo {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
    }

    .image-item {
      border-radius: 12px;
      overflow: hidden;
      background: $color-bg;

      &.large {
        grid-row: span 2;

        @include mo {
          grid-row: span 1;
        }
      }

      .appearance-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
