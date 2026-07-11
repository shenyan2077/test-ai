<!-- 1.1mm超窄四等边：大字标题 + 手机产品图展示窄边框设计 -->
<script setup>
// 1.1mm 超窄四等边：静态展示模块
</script>

<template>
  <section class="narrow-bezel">
    <div class="bezel-inner">
      <h2 class="main-title animate-in">1.1mm 超窄四等边</h2>
      <div class="sub-text animate-in">
        <p class="sub-title">窄出手机新高度，满屏精彩框不住。</p>
        <p class="desc">
          1.1mm 极窄四等边¹，小屏大视野，观感超惊艳。一眼望去，满眼都沉浸，满屏皆精彩。
        </p>
      </div>
      <div class="phone-images">
        <img
          src="/assets/images/thin/images-thin-phone-0-1-2366b7.png.webp"
          alt="一加15T 窄边框"
          class="phone-img"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.narrow-bezel {
  width: 100%;
  min-height: calc(100vh - #{$nav-height});
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-white;
  position: relative;
  overflow: hidden;

  .bezel-inner {
    position: relative;
    width: 100%;
    max-width: $max-width;
    height: 600px;
    @include flex-center;
  }

  .main-title {
    font-size: 128px;
    font-weight: 700;
    line-height: 1;
    color: $color-black;
    text-align: center;
    z-index: 2;

    @include pad {
      font-size: 69px;
    }
    @include mo {
      font-size: 40px;
    }
  }

  .sub-text {
    position: absolute;
    bottom: 10%;
    text-align: center;
    z-index: 2;

    .sub-title {
      font-size: 48px;
      font-weight: 300;
      line-height: 1;
      color: $color-black;

      @include pad {
        font-size: 26px;
      }
      @include mo {
        font-size: 32px;
      }
    }

    .desc {
      font-size: 18px;
      color: $color-text-secondary;
      margin-top: 16px;
      max-width: 600px;

      @include mo {
        font-size: 14px;
        width: 328px;
        margin: 4px auto 0;
      }
    }
  }

  .phone-images {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

    .phone-img {
      max-height: 500px;
      object-fit: contain;
      opacity: 0.3;
    }
  }
}
</style>
