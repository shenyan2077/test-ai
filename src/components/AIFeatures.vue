<!-- AI实用好功能 — 左侧样张对比图（hover 切换横渐隐）+ 右侧4卡片 hover 展开 -->
<script setup>
import { ref } from 'vue'

const activeIndex = ref(0)

const features = [
  {
    title: 'AI 人像补光',
    desc: '出门自带反光板，美丽随时在线。',
    img1: '/assets/images/aifeature/images-aifeature-fill-light1-1-80a37b.jpg.webp',
    img2: '/assets/images/aifeature/images-aifeature-fill-light2-1-ee31d2.jpg.webp',
  },
  {
    title: 'AI 去反光',
    desc: '隔窗拍照不怕光，轻松留住"美"一面。',
    img1: '/assets/images/aifeature/images-aifeature-remove-reflec1-1-ec819e.jpg.webp',
    img2: '/assets/images/aifeature/images-aifeature-remove-reflec2-1-91adbe.jpg.webp',
  },
  {
    title: 'AI 消除',
    desc: '自动识别路人，不用圈选超方便。',
    img1: '/assets/images/aifeature/images-aifeature-remove-back1-1-e0e1d7.jpg.webp',
    img2: '/assets/images/aifeature/images-aifeature-remove-back2-1-405b92.jpg.webp',
  },
  {
    title: 'AI 超清合影',
    desc: '人人都清晰，留影不留遗憾。',
    img1: '/assets/images/aifeature/images-aifeature-high-resolution1-1-0fc6d2.jpg',
    img2: '/assets/images/aifeature/images-aifeature-high-resolution2-1-918949.jpg',
  },
]
</script>

<template>
  <section class="ai-features" id="section-feature">
    <!-- 顶部横线 -->
    <div class="top-divider" />

    <!-- 标题 -->
    <div class="section-header">
      <h2 class="section-title">AI 实用好功能</h2>
    </div>

    <!-- 标题下横线 -->
    <div class="header-divider" />

    <div class="content-area">
      <!-- 左侧：样张对比图 — 所有4组绝对叠放，hover 切换到对应组 -->
      <div class="image-area">
        <div class="image-stack">
          <div
            v-for="(f, i) in features"
            :key="i"
            class="image-pair"
            :class="{ show: activeIndex === i }"
          >
            <img :src="f.img1" :alt="f.title + ' before'" class="cmp-img" />
            <img :src="f.img2" :alt="f.title + ' after'" class="cmp-img cmp-img-right" />
          </div>
        </div>
      </div>

      <!-- 右侧：详情卡片列表（hover 触发） -->
      <div class="detail-area">
        <div
          v-for="(f, i) in features"
          :key="i"
          class="detail-card"
          :class="{ active: activeIndex === i }"
          @mouseenter="activeIndex = i"
        >
          <div class="card-inner">
            <p class="card-title">{{ f.title }}</p>
            <div class="card-desc">
              <p>{{ f.desc }}</p>
            </div>
          </div>
          <div v-if="i < features.length - 1" class="card-divider" />
        </div>
      </div>
    </div>

    <!-- 底部分割线 + 备注 -->
    <div class="bottom-divider" />
    <div class="section-note">
      *此样张非本机拍摄，仅用于 AI 功能展示，一切以实际体验为准。
    </div>
  </section>
</template>

<style scoped lang="scss">
.ai-features {
  width: 100%;
  background: $color-white;
  overflow: hidden;
}

.top-divider {
  width: 100vw;
  height: 1px;
  background: rgba(0, 0, 0, 0.15);
}

.section-header {
  padding: 87px 64px 65px;
  max-width: 1440px;
  margin: 0 auto;

  @include pad {
    padding: 64px 24px 24px;
  }
  @include mo {
    padding: 48px 16px 24px;
  }

  .section-title {
    font-size: 48px;
    font-weight: 500;
    line-height: 1.2;
    color: rgba(0, 0, 0, 0.95);

    @include mo {
      font-size: 28px;
    }
  }
}

.header-divider {
  width: 100vw;
  height: 1px;
  background: rgba(0, 0, 0, 0.15);
}

.content-area {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;

  @include mo {
    flex-direction: column;
  }
}

// ===== 左侧图片区 =====
.image-area {
  padding: 64px;

  @include pad {
    padding: 24px;
  }
  @include mo {
    padding: 24px 16px;
  }
}

// 使用 CSS Grid 叠放所有图片组，共享同一 cell，避免绝对定位导致宽度塌陷
.image-stack {
  display: grid;
  grid-template: 1fr / 1fr;

  > * {
    grid-area: 1 / 1;
  }
}

// 所有图片组叠放在同一 grid cell，hover 时通过 opacity 渐隐切换
.image-pair {
  display: flex;
  gap: 7px;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.4s ease;

  @include mo {
    justify-content: center;
  }

  &.show {
    opacity: 1;
    z-index: 2;
  }
}

.cmp-img {
  width: 402px;
  height: 539px;
  object-fit: cover;
  flex-shrink: 0;

  @include pad {
    width: 214px;
    height: 300px;
  }
  @include mo {
    width: 158px;
    height: 212px;
  }
}

.cmp-img-right {
  margin-left: 0;
}

// ===== 右侧详情区 =====
.detail-area {
  flex: 1;
  font-weight: 500;

  .detail-card {
    cursor: pointer;
    position: relative;
    overflow: hidden;

    .card-inner {
      padding: 32px;
      min-height: 167px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      @include pad {
        padding: 24px;
        min-height: 87px;
      }
      @include mo {
        padding: 16px;
        min-height: 72px;
      }
    }

    .card-title {
      font-size: 24px;
      font-weight: 500;
      line-height: 1.2;
      color: rgba(0, 0, 0, 0.15);
      transition: color 0.3s;

      @include mo {
        font-size: 18px;
      }
    }

    // 描述文字 — 默认隐藏在卡片下方，hover 时滑入
    .card-desc {
      padding-top: 54px;
      transform: translateY(8px);
      opacity: 0;
      transition: transform 0.35s ease, opacity 0.35s ease;

      @include pad {
        padding-top: 4px;
      }
      @include mo {
        padding-top: 8px;
      }

      p {
        font-size: 14px;
        font-weight: 500;
        line-height: 1.4;
        color: rgba(0, 0, 0, 0.55);
      }
    }

    // active 态：标题变亮 + 描述滑入
    &.active {
      .card-title {
        color: rgba(0, 0, 0, 0.95);
      }
      .card-desc {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .card-divider {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50vw;
      height: 1px;
      background: rgba(0, 0, 0, 0.15);
    }
  }
}

.bottom-divider {
  width: 100vw;
  height: 1px;
  background: rgba(0, 0, 0, 0.15);
}

.section-note {
  padding: 24px 64px;
  max-width: 1440px;
  margin: 0 auto;
  font-size: 12px;
  line-height: 1.2;
  color: rgba(0, 0, 0, 0.2);

  @include pad {
    padding: 16px 24px;
  }
  @include mo {
    padding: 16px;
  }
}
</style>
