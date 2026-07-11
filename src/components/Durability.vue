<!-- 耐用功能：展示手机耐用特性，包括防水防摔等 -->
<script setup>
// 耐用功能模块：展示耐用特性
const durabilityFeatures = [
  { label: 'IP68', desc: '防尘防水' },
  { label: 'IP69', desc: '高温高压喷水' },
  { label: '抗摔', desc: '超瓷晶玻璃' },
]
</script>

<template>
  <section class="durability">
    <div class="durability-inner">
      <h2 class="main-title animate-in">硬核耐用<br />从容应对 everyday</h2>
      <div class="feature-row animate-in">
        <div
          v-for="(f, i) in durabilityFeatures"
          :key="i"
          class="feature-card"
        >
          <span class="feature-label">{{ f.label }}</span>
          <span class="feature-desc">{{ f.desc }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.durability {
  width: 100%;
  min-height: calc(100vh - #{$nav-height});
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-white;
  padding: 80px 0;

  .durability-inner {
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
    margin-bottom: 64px;

    @include pad {
      font-size: 42px;
    }
    @include mo {
      font-size: 36px;
    }
  }

  .feature-row {
    display: flex;
    justify-content: center;
    gap: 48px;

    @include mo {
      flex-direction: column;
      gap: 24px;
    }

    .feature-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 40px 56px;
      border-radius: 16px;
      background: $color-bg;

      @include mo {
        padding: 24px 32px;
      }

      .feature-label {
        font-size: 48px;
        font-weight: 700;
        color: $color-black;

        @include mo {
          font-size: 32px;
        }
      }

      .feature-desc {
        font-size: 18px;
        color: $color-text-secondary;

        @include mo {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
