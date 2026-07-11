<!-- 屏幕分屏3：真硬件1nit暗夜显示 — 暗光背景图 + 居中白色文案 -->
<script setup>
// 真硬件1nit暗夜显示：静态展示模块
</script>

<template>
  <section class="dark-night" id="section-hu">
    <div class="night-bg">
      <img
        src="/assets/images/eyes/images-eyes-pc-bg-1-14ab62.png"
        alt="暗夜显示背景"
        class="bg-img"
      />
      <div class="night-overlay">
        <div class="night-text">
          <h2 class="night-title">真硬件 1nit 暗夜显示<br />夜里看手机，清晰不刺眼。</h2>
          <p class="night-desc">
            <span class="desc-sub">真硬件 1nit 暗夜显示，</span>
            <span class="desc-main">让你在暗夜里看手机时，屏幕更加清晰准确，同时又不刺眼，就像月光一样温柔呵护眼睛。</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.dark-night {
  width: 100%;
  min-height: 600px;
  height: 41.67vw;
  position: relative;

  @include pad {
    height: 370px;
    min-height: 324px;
  }
  @include mo {
    height: auto;
    min-height: 300px;
  }

  .night-bg {
    width: 100%;
    height: 100%;
    position: relative;

    .bg-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      inset: 0;
    }
  }

  .night-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.3);
  }

  .night-text {
    max-width: 800px;
    text-align: center;

    @include pad {
      max-width: 433px;
    }
    @include mo {
      padding: 0 16px;
    }

    .night-title {
      font-size: 48px;
      font-weight: 500;
      line-height: 1.2;
      color: rgba(255, 255, 255, 0.95);

      @include pad {
        font-size: 28px;
      }
      @include mo {
        font-size: 28px;
      }
    }

    .night-desc {
      margin-top: 24px;
      font-size: 18px;
      font-weight: 500;
      line-height: 1.44;

      @include mo {
        font-size: 16px;
      }

      .desc-sub {
        color: rgba(255, 255, 255, 0.55);
      }

      .desc-main {
        color: rgba(255, 255, 255, 0.95);
      }
    }
  }
}
</style>
