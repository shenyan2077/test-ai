<!-- 屏幕分屏5：熄灯也护眼 — 左右50/50分栏，左侧灰色背景+三参数，右侧暗光场景图 -->
<script setup>
// 熄灯也护眼：左右分栏静态展示
</script>

<template>
  <section class="dim-light-eye" id="section-light">
    <!-- 左侧：灰色背景 + 文案 -->
    <div class="light-left">
      <div class="left-inner">
        <div class="light-top">
          <h2 class="light-title">熄灯也护眼，<br />暗光操作也超神。</h2>
          <p class="light-desc">低蓝光、低频闪、低亮度，熄灯游戏也护眼。人因研究全面加持，护眼方案更科学，各个场景都舒适护眼。</p>
        </div>

        <!-- 分割线 -->
        <div class="light-divider"></div>

        <!-- 三列护眼参数 -->
        <div class="light-features">
          <div class="lf-item">
            <p class="lf-label">降低眼干涩</p>
            <p class="lf-value">超低蓝光</p>
            <p class="lf-tip">超低有害蓝光占比<br />行业超低蓝光</p>
          </div>
          <div class="lf-item">
            <p class="lf-label">降低视疲劳</p>
            <p class="lf-value">3840Hz</p>
            <p class="lf-tip">超高频 PWM 调光<br />行业超低频闪</p>
          </div>
          <div class="lf-item">
            <p class="lf-label">暗光不刺眼</p>
            <p class="lf-value">1nit</p>
            <p class="lf-tip">真硬件暗夜护眼<br />行业超低亮度<sup>13</sup></p>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧：暗光场景图 -->
    <div class="light-right">
      <img
        src="/assets/images/screen/images-dim-light-dim-light-1-9b5614.jpg.webp"
        alt="暗光护眼"
        class="light-img"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.dim-light-eye {
  width: 100%;
  display: flex;
  max-height: 750px;
  overflow: hidden;

  @include mo {
    flex-direction: column-reverse;
  }
}

.light-left {
  width: 50%;
  background: $color-bg-tertiary;
  display: flex;
  align-items: center;

  @include mo {
    width: 100%;
  }

  .left-inner {
    max-width: 720px;
    margin-left: auto;
    padding: 64px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include pad {
      padding: 64px 24px;
    }
    @include mo {
      padding: 36px 16px;
    }
  }
}

.light-top {
  .light-title {
    font-size: 48px;
    font-weight: 500;
    line-height: 1.2;
    color: #2a2a2a;

    @include mo {
      font-size: 32px;
    }
  }

  .light-desc {
    font-size: 18px;
    line-height: 1.44;
    color: rgba(42, 42, 42, 0.75);
    margin-top: 24px;

    @include pad {
      margin-top: 16px;
    }
    @include mo {
      font-size: 16px;
    }
  }
}

.light-divider {
  width: 100%;
  height: 1px;
  background: rgba(42, 42, 42, 0.15);
  margin: 24px 0;

  @include mo {
    margin: 24px 0;
  }
}

.light-features {
  display: flex;
  justify-content: space-between;

  .lf-item {
    width: 198px;

    @include pad {
      width: auto;
    }
    @include mo {
      width: auto;
      min-width: 100px;
    }

    .lf-label {
      font-size: 14px;
      line-height: 1.2;
      color: #2a2a2a;
      margin-bottom: 12px;
    }

    .lf-value {
      font-size: 36px;
      font-weight: 500;
      line-height: 1.2;
      color: rgba(42, 42, 42, 0.95);

      @include mo {
        font-size: 24px;
      }
    }

    .lf-tip {
      font-size: 14px;
      font-weight: 500;
      line-height: 1.2;
      color: rgba(0, 0, 0, 0.55);
      margin-top: 12px;

      @include mo {
        font-size: 12px;
        margin-top: 6px;
      }
    }
  }
}

.light-right {
  width: 50%;

  @include mo {
    width: 100%;
  }

  .light-img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    @include mo {
      height: 340px;
    }
  }
}
</style>
