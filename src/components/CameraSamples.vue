<!-- 影像分屏2：样张展示 — 左右分栏 hover 交互，hover 侧宽度变大 + 图片浮现 -->
<script setup>
import { ref } from 'vue'

const activeIndex = ref(0)

const samples = [
  {
    title: 'LUMO X 3.5 倍潜望长焦<br />随时随地，拍人更美。',
    desc1: 'LUMO 凝光影像引擎加持的 3.5 倍潜望长焦拍人像，',
    desc2: '虚化更自然，肤色更真实，轻松拍出影棚感。',
    img1: '/assets/images/picture/images-picture-1-1-pc-1-90ef37.jpg.webp',
    img2: '/assets/images/picture/images-picture-1-2-pc-1-628ef1.jpg.webp',
  },
  {
    title: '不分远近，拍景更清晰。',
    desc1: 'LUMO 凝光影像引擎加持的 3.5 倍潜望长焦拍风景，',
    desc2: '轻松将远处的美景清晰收进手机，放大也清晰。',
    img1: '/assets/images/picture/images-picture-2-1-pc-1-017db9.jpg.webp',
    img2: '/assets/images/picture/images-picture-2-2-pc-1-a9aadd.jpg.webp',
  },
]
</script>

<template>
  <section class="camera-samples" id="section-picture">
    <div class="samples-inner">
      <div
        v-for="(s, i) in samples"
        :key="i"
        class="sample-item"
        :class="{ active: activeIndex === i }"
        @mouseenter="activeIndex = i"
      >
        <!-- 上方文案 -->
        <div class="text-col">
          <p class="sample-title" v-html="s.title" />
          <p class="sample-desc">
            <span class="desc-main">{{ s.desc1 }}</span>
            <span class="desc-sub">{{ s.desc2 }}</span>
          </p>
        </div>

        <!-- 下方两张样张图并排 -->
        <div class="image-col">
          <div class="image-box">
            <img :src="s.img1" alt="样张" class="sample-img" />
            <div class="glass-label" />
          </div>
          <div class="image-box">
            <img :src="s.img2" alt="样张" class="sample-img" />
            <div class="glass-label" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.camera-samples {
  width: 100%;
  min-height: 100vh;
  background: $color-white;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.samples-inner {
  width: 100%;
  max-width: $max-width;
  margin: 0 auto;
  display: flex;

  @include mo {
    flex-direction: column;
  }
}

// ===== 每个 item（文字在上，图片在下） =====
.sample-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: min(5.555vw, 80px) 64px;
  overflow: hidden;
  transition: flex 0.6s ease;
  cursor: pointer;
  background: $color-white;
  position: relative;

  &.active {
    flex: 1.35;
  }

  @include pad {
    padding: 40px 24px;
    &.active { flex: 1.25; }
  }
  @include mo {
    padding: 36px 16px;
    flex: none;
    &.active { flex: none; }
  }

  // 右侧分割线
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 60%;
    background: rgba(0, 0, 0, 0.06);
  }
}

// ===== 文字列 =====
.text-col {
  width: 592px;
  flex-shrink: 0;

  @include pad { width: 320px; }
  @include mo { width: 100%; }

  .sample-title {
    font-size: 32px;
    font-weight: 500;
    line-height: 1.3;
    color: rgba(0, 0, 0, 0.95);
    @include mo { font-size: 20px; }
  }

  .sample-desc {
    margin-top: 8px;
    margin-bottom: 32px;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    opacity: 0;
    transition: opacity 0.6s ease;
    @include mo { font-size: 14px; }

    .desc-main {
      color: rgba(0, 0, 0, 0.95);
    }
    .desc-sub {
      color: rgba(0, 0, 0, 0.55);
    }
  }
}

// ===== 图片列（文字下方，两张并排） =====
.image-col {
  display: flex;
  gap: 8px;
  flex-shrink: 0;

  @include mo {
    width: 100%;
    justify-content: center;
  }
}

.image-box {
  position: relative;
  width: 20.417vw;
  height: 26.944vw;
  max-width: 294px;
  max-height: 388px;
  overflow: hidden;
  flex-shrink: 0;

  @include pad {
    width: 180px; height: 240px;
    max-width: none; max-height: none;
  }
  @include mo {
    width: 158px; height: 210px;
    max-width: none; max-height: none;
  }

  .sample-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.6s ease;
  }

  .glass-label {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    padding: 2px 6px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    opacity: 0;
    transition: opacity 0.6s ease;
  }
}

// ===== hover active 态：图片 + 描述同步浮现 =====
.sample-item.active {
  .sample-img {
    opacity: 1;
  }
  .sample-desc {
    opacity: 1;
  }
  .glass-label {
    opacity: 1;
  }
}
</style>
