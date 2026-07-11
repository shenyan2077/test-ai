<!-- 屏幕分屏2：屏幕参数 — 三行规格网格 + 认证图标 -->
<script setup>
const featureTags = [
  { label: '高刷新率', value: '165Hz 极速高刷', desc: '游戏体验巨流畅' },
  { label: '联合研发', value: '全新旗舰发光材料', desc: '显示巨通透，巨准确' },
  { label: '暗夜显示', value: '真硬件 1nit', desc: '暗夜清晰不刺眼' },
  { label: '舒适护眼', value: '护眼「小金标」', desc: '白天晚上都护眼' },
]

const paramsRow1 = [
  { value: '6.32 英寸', desc: '旗舰小直屏' },
  { value: '165Hz', desc: '电竞级高刷' },
  { value: '3600nits', desc: '25% APL 亮度' },
  { value: '全新旗舰', desc: '发光材料' },
  { value: 'Display P3', desc: '自研屏幕显示芯片' },
]

const paramsRow2 = [
  { value: '自研显示科学产线', desc: '色彩更均匀准确' },
  { value: '太阳显示', desc: '强光下超清晰' },
  { value: '手套触控', desc: '戴手套轻松操控' },
  { value: '雨水触控 2.0', desc: '屏幕沾水，触控也灵¹²' },
]
</script>

<template>
  <section class="screen-params" id="parameter">
    <div class="params-inner">
      <!-- 顶部描述 -->
      <div class="top-desc">
        <p>
          <span class="desc-main">这是一块让人惊艳的流畅好屏，一块通透好屏，一块暗夜显示好屏，一块护眼好屏。</span>
          <span class="desc-sub">不管白天还是黑夜，玩游戏，看直播，刷短剧，都更出色。</span>
        </p>
      </div>

      <!-- 第一行：4个特性标签 -->
      <div class="feature-tags">
        <div v-for="tag in featureTags" :key="tag.label" class="tag-item">
          <div class="tag-badge">
            <p>{{ tag.label }}</p>
          </div>
          <div class="tag-body">
            <p class="tag-value">{{ tag.value }}</p>
            <p class="tag-desc">{{ tag.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 第二行：5个规格参数 -->
      <div class="params-grid">
        <div v-for="(p, i) in paramsRow1" :key="'p1-'+i" class="param-cell">
          <p class="param-value">{{ p.value }}</p>
          <p class="param-desc">{{ p.desc }}</p>
        </div>
      </div>

      <!-- 第三行：4个辅助参数 -->
      <div class="params-grid params-grid-3">
        <div v-for="(p, i) in paramsRow2" :key="'p2-'+i" class="param-cell">
          <p class="param-value">{{ p.value }}</p>
          <p class="param-desc">{{ p.desc }}</p>
        </div>
      </div>

      <!-- 认证图标 -->
      <div class="cert-icons">
        <img src="/assets/images/rotating-screen/images-rotating-screen-icon-1-1-2f1e58.jpg.webp" alt="认证1" />
        <img src="/assets/images/rotating-screen/images-rotating-screen-icon-2-1-09b922.jpg.webp" alt="认证2" />
        <img src="/assets/images/rotating-screen/images-rotating-screen-icon-3-1-7fb4c3.jpg.webp" alt="认证3" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.screen-params {
  width: 100%;
  background: $color-white;
}

.params-inner {
  max-width: 1115px;
  margin: 0 auto;
  padding-bottom: 120px;

  @include mo {
    width: 100%;
    padding: 0 16px 48px;
  }
  @include pad {
    max-width: 720px;
    padding-bottom: 24px;
  }
}

.top-desc {
  text-align: center;
  padding: 24px 0 48px;

  @include pad {
    padding: 13px 0 26px;
  }
  @include mo {
    padding: 32px 0 24px;
  }

  p {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    max-width: 706px;
    margin: 0 auto;

    @include pad {
      max-width: 514px;
    }
    @include mo {
      font-size: 16px;
    }
  }

  .desc-main { color: rgba(0, 0, 0, 0.95); }
  .desc-sub { color: rgba(0, 0, 0, 0.3); }
}

// 第一行：4个标签卡片
.feature-tags {
  display: flex;
  justify-content: space-between;
  margin-bottom: 80px;

  @include pad {
    margin-bottom: 43px;
  }
  @include mo {
    display: none;
  }

  .tag-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tag-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 11px;
    border-radius: 999px;
    border: 1px solid #86c027;

    @include pad {
      padding: 3px 6px;
    }

    p {
      font-size: 14px;
      font-weight: 500;
      line-height: 1.4;
      color: #86c027;

      @include pad {
        font-size: 12px;
      }
    }
  }

  .tag-body {
    margin-top: 8px;
    text-align: center;

    @include pad {
      margin-top: 4px;
    }

    .tag-value {
      font-size: 28px;
      font-weight: 500;
      line-height: 1.2;

      @include pad {
        font-size: 18px;
      }
    }

    .tag-desc {
      font-size: 16px;
      font-weight: 500;
      line-height: 1.2;
      color: rgba(0, 0, 0, 0.55);
      margin-top: 6px;

      @include pad {
        font-size: 12px;
        margin-top: 3px;
      }
    }
  }
}

// 参数网格
.params-grid {
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: none;

  @include mo {
    flex-wrap: wrap;
  }

  .param-cell {
    flex: 1 1 222px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 48px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);

    &:last-child { border-right: none; }

    @include pad {
      flex: 1 1 120px;
      padding: 20px 26px;
    }
    @include mo {
      flex: 1 1 50%;
      padding: 16px 12px;
    }

    .param-value {
      font-size: 28px;
      font-weight: 500;
      line-height: 1.2;
      color: rgba(0, 0, 0, 0.95);
      white-space: nowrap;

      @include pad {
        font-size: 20px;
      }
      @include mo {
        font-size: 18px;
      }
    }

    .param-desc {
      font-size: 14px;
      font-weight: 500;
      line-height: 1.4;
      color: rgba(0, 0, 0, 0.55);
      margin-top: 6px;
      text-align: center;

      @include pad {
        font-size: 12px;
        margin-top: 3px;
      }
      @include mo {
        font-size: 11px;
      }
    }
  }
}

.params-grid-3 {
  margin-top: -5px;
  border-top: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @include pad {
    margin-top: -4px;
  }

  .param-cell {
    flex: 1 1 278px;
    @include pad { flex: 1 1 150px; padding: 17px 26px; }
  }
}

.cert-icons {
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-top: none;
  padding: 0;

  img {
    flex: 1;
    height: 107px;
    object-fit: cover;
    border-right: 1px solid rgba(0, 0, 0, 0.1);

    &:last-child { border-right: none; }

    @include pad {
      height: 70px;
    }
  }
}
</style>
