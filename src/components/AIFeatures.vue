<!-- 影像分屏5：AI实用好功能 — 左侧样张对比图 + 右侧4个AI功能卡片点击切换 -->
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
    <!-- 标题 -->
    <div class="section-header">
      <h2 class="section-title">AI 实用好功能</h2>
    </div>

    <!-- 分割线 -->
    <div class="section-divider"></div>

    <div class="content-area">
      <!-- 左侧：样张对比图（只显示当前激活的） -->
      <div class="image-area">
        <div class="image-grid" v-for="(f, i) in features" :key="i" v-show="i === activeIndex">
          <img :src="f.img1" :alt="f.title + ' before'" class="cmp-img" />
          <img :src="f.img2" :alt="f.title + ' after'" class="cmp-img cmp-img-right" />
        </div>
      </div>

      <!-- 右侧：详情卡片列表 -->
      <div class="detail-area">
        <div
          v-for="(f, i) in features"
          :key="i"
          class="detail-card"
          :class="{ active: activeIndex === i }"
          @click="activeIndex = i"
        >
          <div class="card-inner">
            <p class="card-title" :class="{ dim: activeIndex !== i }">{{ f.title }}</p>
            <div class="card-desc" v-show="activeIndex === i">
              <p>{{ f.desc }}</p>
            </div>
          </div>
          <div v-if="i < features.length - 1" class="card-divider"></div>
        </div>
      </div>
    </div>

    <!-- 底部备注 -->
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

.section-header {
  padding: 87px 64px 0;
  max-width: 1440px;
  margin: 0 auto;

  @include pad {
    padding: 64px 24px 0;
  }
  @include mo {
    padding: 48px 16px 0;
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

.section-divider {
  width: 100vw;
  height: 1px;
  background: rgba(0, 0, 0, 0.15);
  margin-top: 65px;

  @include pad {
    margin-top: 24px;
  }
  @include mo {
    margin-top: 24px;
  }
}

.content-area {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;

  @include mo {
    flex-direction: column;
  }
}

// 左侧图片区
.image-area {
  padding: 64px;

  @include pad {
    padding: 24px;
  }
  @include mo {
    padding: 24px 16px;
  }

  .image-grid {
    display: flex;
    gap: 7px;

    @include mo {
      justify-content: center;
    }
  }

  .cmp-img {
    width: 402px;
    height: 539px;
    object-fit: cover;

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
}

// 右侧详情区
.detail-area {
  flex: 1;
  font-weight: 500;

  .detail-card {
    cursor: pointer;
    position: relative;

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
      line-height: 1.2;
      color: rgba(0, 0, 0, 0.15);
      transition: color 0.3s;

      @include pad {
        font-size: 18px;
      }
      @include mo {
        font-size: 18px;
      }

      &.dim {
        color: rgba(0, 0, 0, 0.15);
      }
    }

    &.active .card-title {
      color: rgba(0, 0, 0, 0.95);
    }

    .card-desc {
      padding-top: 54px;

      @include pad {
        padding-top: 4px;
      }
      @include mo {
        padding-top: 8px;
      }

      p {
        font-size: 14px;
        line-height: 1.4;
        color: rgba(0, 0, 0, 0.55);

        @include mo {
          font-size: 14px;
        }
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
