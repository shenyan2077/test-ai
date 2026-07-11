<!--
  行走的时尚单品：标题 + 描述 + 3 张生活场景图（大图 + 两小图纵向排列）
-->
<script setup>
// 行走的时尚单品：静态图文展示，无滚动动画
</script>

<template>
  <section class="small-screen">
    <div class="section-inner">
      <!-- 文案区 -->
      <div class="text-wrapper">
        <h2 class="title">行走的时尚单品<br />放在哪里都搭</h2>
        <p class="desc">简约小巧高颜值，拿在手里，就是随身携带的漂亮搭子。放在桌上，就是自带格调的桌搭神器。</p>
      </div>

      <!-- 图片区：大图 + 两小图纵向排列 -->
      <div class="image-row">
        <img
          class="img-large"
          src="/assets/images/where/images-where-0-pc-1-0dc66b.jpg.webp"
          alt="一加15T 时尚单品"
        />
        <div class="img-stack">
          <img
            class="img-small"
            src="/assets/images/where/images-where-1-pc-1-de6870.jpg.webp"
            alt="一加15T 场景"
          />
          <img
            class="img-small"
            src="/assets/images/where/images-where-2-pc-1-973fa6.jpg.webp"
            alt="一加15T 场景"
          />
        </div>
      </div>
    </div>

    <!-- 向下查看更多 -->
    <div class="scroll-tip">
      <svg class="scroll-arrows" width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="arrow arrow-1" d="M11.3662 20.7453L3 12.6297L4.26767 11.4L12 18.9008L19.7323 11.4L21 12.6297L12.6338 20.7453C12.2838 21.0849 11.7162 21.0849 11.3662 20.7453Z" />
        <path class="arrow arrow-2" d="M11.3662 20.7453L3 12.6297L4.26767 11.4L12 18.9008L19.7323 11.4L21 12.6297L12.6338 20.7453C12.2838 21.0849 11.7162 21.0849 11.3662 20.7453Z" />
        <path class="arrow arrow-3" d="M11.3662 20.7453L3 12.6297L4.26767 11.4L12 18.9008L19.7323 11.4L21 12.6297L12.6338 20.7453C12.2838 21.0849 11.7162 21.0849 11.3662 20.7453Z" />
      </svg>
      <p class="scroll-text">向下查看更多</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.small-screen {
  width: 100%;
  background: $color-white;
  padding: 80px 64px;

  @include mo {
    padding: 48px 16px;
  }
  @include pad {
    padding: 64px 24px;
  }
}

.section-inner {
  max-width: 1312px;
  margin: 0 auto;
}

/* ── 文案 ── */
.text-wrapper {
  .title {
    font-size: 48px;
    font-weight: 500;
    line-height: 1.2;
    color: rgba(0, 0, 0, 0.95);

    @include mo {
      font-size: 28px;
    }
  }

  .desc {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.55);
    margin-top: 16px;
    max-width: 519px;

    @include mo {
      font-size: 14px;
      margin-top: 12px;
    }
  }
}

/* ── 图片行：大图 + 两小图 ── */
.image-row {
  display: flex;
  align-items: stretch;
  height: 580px;
  margin-top: 36px;

  @include mo {
    flex-direction: column;
    height: auto;
    margin-top: 24px;
  }
  @include pad {
    height: 316px;
    margin-top: 32px;
  }

  .img-large {
    flex-shrink: 0;
    width: 846px;
    object-fit: cover;

    @include mo {
      width: 100%;
      height: 206px;
    }
    @include pad {
      width: 464px;
    }
  }

  .img-stack {
    width: 450px;
    margin-left: 16px;
    display: flex;
    flex-direction: column;

    @include mo {
      width: 100%;
      margin-left: 0;
    }
    @include pad {
      width: 248px;
      margin-left: 8px;
    }

    .img-small {
      flex-shrink: 0;
      height: 282px;
      object-fit: cover;

      &:first-child {
        margin-bottom: 16px;

        @include mo {
          margin-bottom: 0;
          margin: 4px 0;
        }
        @include pad {
          margin-bottom: 8px;
        }
      }

      @include mo {
        height: 206px;
      }
      @include pad {
        height: 154px;
      }
    }
  }
}

/* ── 向下查看更多 ── */
.scroll-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 8px;

  .scroll-arrows {
    .arrow {
      fill: $color-text-secondary;
      animation: arrow-bounce 1.5s ease-in-out infinite;

      &.arrow-1 { animation-delay: 0s; }
      &.arrow-2 { animation-delay: 0.2s; }
      &.arrow-3 { animation-delay: 0.4s; }
    }
  }

  .scroll-text {
    font-size: 12px;
    color: $color-text-secondary;
    margin-top: 6px;
    letter-spacing: 1px;
  }
}

@keyframes arrow-bounce {
  0%, 100% { opacity: 0.2; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(3px); }
}
</style>
