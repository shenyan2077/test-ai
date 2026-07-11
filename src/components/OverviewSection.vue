<!-- 总览/KSP：6个卖点卡片网格展示，包含骁龙8/165Hz/LUMO/7500mAh/ColorOS/1.1mm四等边 -->
<script setup>
// 总览模块：6个核心卖点卡片
const features = [
  {
    title: '第五代骁龙 8 至尊版旗舰芯<br>全新一代「风驰游戏内核」',
    desc: '流畅到飞起，轻松驾驭 165 超高帧游戏。',
  },
  {
    title: '165Hz 旗舰小直屏',
    desc: '超高刷新率，丝滑触控体验。',
  },
  {
    title: 'OPPO 自研 LUMO 凝光影像系统',
    desc: '人景放大都清晰，旅拍小神机。',
  },
  {
    title: '超巨量 7500mAh 冰川电池',
    desc: '从早用到晚，手机还有电。',
  },
  {
    title: '超流畅 ColorOS 16',
    desc: '流畅双引擎，持久丝滑。',
  },
  {
    title: '1.1mm 极窄四等边',
    desc: '窄出手机新高度，满屏精彩框不住。',
  },
]
</script>

<template>
  <section class="overview-section">
    <div class="overview-inner">
      <div class="card-grid">
        <div
          v-for="(f, i) in features"
          :key="i"
          class="feature-card animate-in"
        >
          <div class="card-bg"></div>
          <div class="card-content">
            <p class="card-title" v-html="f.title"></p>
            <p class="card-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.overview-section {
  width: 100%;
  padding: 24px 64px;

  @include mo {
    padding: 48px 16px;
  }
  @include pad {
    padding: 12px 24px;
  }

  .overview-inner {
    max-width: $max-width;
    margin: 0 auto;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 8px;
    height: calc(100vh - #{$nav-height} - 48px);

    @include mo {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(6, 160px);
      height: auto;
      gap: 4px;
    }
    @include pad {
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
    }
  }

  .feature-card {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
      transform: scale(0.98);
    }

    &:first-child {
      grid-column: span 2;
      grid-row: span 2;
    }

    @include mo {
      grid-column: span 1 !important;
      grid-row: span 1 !important;
    }

    .card-bg {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #2a2a4e 0%, #1a1a2e 100%);
    }

    .card-content {
      position: relative;
      z-index: 2;
      padding: 16px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      .card-title {
        font-size: 24px;
        font-weight: 700;
        line-height: 1.2;
        color: $color-white;
        opacity: 0.95;

        @include pad {
          font-size: 13px;
        }
        @include mo {
          font-size: 14px;
        }
      }

      .card-desc {
        font-size: 18px;
        line-height: 1.4;
        color: $color-white;
        opacity: 0.55;
        margin-top: 8px;

        @include pad {
          font-size: 10px;
        }
        @include mo {
          font-size: 12px;
        }
      }
    }

    &:first-child .card-content {
      .card-title {
        font-size: 32px;

        @include pad {
          font-size: 18px;
        }
      }

      .card-desc {
        font-size: 24px;
        max-width: 156px;

        @include pad {
          font-size: 13px;
          max-width: 137px;
        }
      }
    }
  }
}
</style>
