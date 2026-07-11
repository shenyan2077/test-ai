<!-- LUMO影像系统：展示LUMO凝光影像，大字标题+产品图+卖点说明 -->
<script setup>
// LUMO影像系统模块：展示影像能力
</script>

<template>
  <section class="lumo-camera">
    <div class="camera-inner">
      <div class="text-area">
        <h2 class="main-title animate-in">OPPO 自研<br />LUMO 凝光影像</h2>
        <p class="sub-title animate-in">人景放大都清晰，旅拍小神机</p>
        <div class="features animate-in">
          <div class="feature-item">
            <span class="feature-label">人像</span>
            <span class="feature-desc">自然光影，质感人像</span>
          </div>
          <div class="feature-item">
            <span class="feature-label">远景</span>
            <span class="feature-desc">超远变焦，细节清晰</span>
          </div>
          <div class="feature-item">
            <span class="feature-label">微距</span>
            <span class="feature-desc">近距对焦，微观世界</span>
          </div>
        </div>
      </div>
      <div class="phone-area animate-in">
        <img
          src="/assets/images/kv/images-kv-phone-2-1-5c4661.png"
          alt="LUMO 影像"
          class="phone-img"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.lumo-camera {
  width: 100%;
  min-height: calc(100vh - #{$nav-height});
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-black;
  padding: 80px 0;

  .camera-inner {
    max-width: $max-width;
    width: 100%;
    padding: 0 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 64px;

    @include mo {
      flex-direction: column;
      padding: 0 16px;
      gap: 32px;
    }
  }

  .text-area {
    flex: 1;

    .main-title {
      font-size: 80px;
      font-weight: 700;
      line-height: 1.1;
      color: $color-white;

      @include pad {
        font-size: 42px;
      }
      @include mo {
        font-size: 36px;
      }
    }

    .sub-title {
      font-size: 32px;
      font-weight: 300;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 16px;

      @include pad {
        font-size: 18px;
      }
      @include mo {
        font-size: 16px;
      }
    }

    .features {
      margin-top: 48px;
      display: flex;
      flex-direction: column;
      gap: 24px;

      .feature-item {
        display: flex;
        align-items: baseline;
        gap: 16px;

        .feature-label {
          font-size: 24px;
          font-weight: 700;
          color: $color-white;
          min-width: 60px;

          @include mo {
            font-size: 18px;
          }
        }

        .feature-desc {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);

          @include mo {
            font-size: 14px;
          }
        }
      }
    }
  }

  .phone-area {
    flex: 1;
    display: flex;
    justify-content: center;

    .phone-img {
      max-height: 500px;
      object-fit: contain;

      @include mo {
        max-height: 300px;
      }
    }
  }
}
</style>
