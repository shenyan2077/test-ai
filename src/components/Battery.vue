<!-- 7500mAh电池：大字标题展示超长续航能力，强调冰川电池技术 -->
<script setup>
// 7500mAh 电池模块：展示续航能力
</script>

<template>
  <section class="battery-section">
    <div class="battery-inner">
      <h2 class="main-title animate-in">
        <span class="number">7500</span>
        <span class="unit">mAh</span>
      </h2>
      <p class="sub-title animate-in">超巨量冰川电池</p>
      <p class="desc animate-in">
        超大容量电池，从早用到晚还有电。冰川散热技术，持久续航不发烫。
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.battery-section {
  width: 100%;
  min-height: calc(100vh - #{$nav-height});
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #0a0a1a 0%, #1a1a3e 100%);
  position: relative;
  overflow: hidden;

  .battery-inner {
    max-width: $max-width;
    width: 100%;
    padding: 0 64px;
    text-align: center;

    @include mo {
      padding: 0 16px;
    }
  }

  .main-title {
    font-size: 200px;
    font-weight: 700;
    line-height: 1;
    color: $color-white;
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 12px;

    .number {
      background: linear-gradient(180deg, #4fc3f7 0%, #2196f3 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .unit {
      font-size: 64px;
      color: rgba(255, 255, 255, 0.8);

      @include pad {
        font-size: 32px;
      }
      @include mo {
        font-size: 28px;
      }
    }

    @include pad {
      font-size: 120px;
    }
    @include mo {
      font-size: 80px;
    }
  }

  .sub-title {
    font-size: 48px;
    font-weight: 300;
    color: $color-white;
    margin-top: 16px;

    @include pad {
      font-size: 26px;
    }
    @include mo {
      font-size: 24px;
    }
  }

  .desc {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.6);
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
