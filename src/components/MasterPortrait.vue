<!-- 大师影像 → 经典宽幅模式 — 整屏 pin 住，分界线从下往上擦除揭开第二层 -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const portrait1 = sectionRef.value.querySelector('.portrait1')
    const portrait1Img = sectionRef.value.querySelector('.portrait1 .portrait-img')
    const portrait2 = sectionRef.value.querySelector('.portrait2')
    const lines = sectionRef.value.querySelector('.lines')
    const viewport = sectionRef.value.querySelector('.viewport')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        pin: viewport,
      },
    })

    // 图1 大师影像：从暗淡到明亮，图片从小变大
    tl.to(portrait1, { opacity: 1, ease: 'none' }, 0)
    tl.to(portrait1Img, { scale: 1, ease: 'none' }, 0)
    // 图2 经典宽幅模式：clip-path 从底部向上擦除，覆盖图1
    tl.to(portrait2, { clipPath: 'inset(0% 0px 0px)', ease: 'none' }, 0)
    // 分割线：跟随 clip-path 边缘从下往上移动，标记擦除边界
    tl.to(lines, { top: '0%', ease: 'none' }, 0)
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="sectionRef" class="master-portrait" id="section-telephoto">
    <div class="viewport">
      <div class="viewport-inner">
        <div class="sticky-content">
          <!-- 下层：大师影像 — 始终可见，作为底图 -->
          <div class="portrait1">
            <div class="portrait-title">
              <p class="pt-title">大师影像</p>
              <p class="pt-desc">轻松拍出大师范儿</p>
            </div>
            <div class="portrait-img-wrap">
              <img
                src="/assets/images/telephoto/images-telephoto-sample-photo1-1-c3e26a.jpg.webp"
                alt="大师影像样张"
                class="portrait-img"
              />
            </div>
          </div>

          <!-- 上层：经典宽幅模式 — clip-path 从底部擦除，覆盖大师影像 -->
          <div class="portrait2">
            <div class="portrait-title">
              <p class="pt-title">经典宽幅模式</p>
              <p class="pt-desc">出片就有故事感</p>
            </div>
            <div class="portrait-img-wrap">
              <img
                src="/assets/images/telephoto/images-telephoto-sample-photo2-1-036647.jpg.webp"
                alt="经典宽幅样张"
                class="portrait-img portrait-img-wide"
              />
            </div>
          </div>
        </div>

        <!-- 分割线：标记擦除边界，从下往上移动 -->
        <div class="lines">
          <div class="line" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.master-portrait {
  width: 100%;
  height: 300vh;
  position: relative;
  background: $color-white;

  @include mo {
    height: auto;
  }
}

.viewport {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: $color-bg-secondary;

  @include mo {
    height: auto;
    overflow: visible;
  }
}

.viewport-inner {
  width: 100%;
  height: 100%;
  position: relative;

  @include mo {
    height: auto;
  }
}

.sticky-content {
  position: relative;
  width: 100%;
  max-width: $max-width;
  height: 100%;
  margin: 0 auto;

  @include pad {
    padding: 0 24px;
  }
  @include mo {
    height: auto;
    padding: 0 16px;
  }
}

// ===== 两层叠加 =====
.portrait1,
.portrait2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $color-bg-secondary;
  padding: 0 64px;

  @include pad {
    padding: 0 24px;
    flex-direction: column;
    justify-content: center;
  }
  @include mo {
    position: relative;
    height: auto;
    flex-direction: column;
    padding: 48px 0;
    gap: 24px;
  }
}

// 下层：大师影像（底图，始终可见）
.portrait1 {
  z-index: 1;
  opacity: 1; // 初始暗淡

  .portrait-img {
    transform: scale(0.5); // 初始极小
  }

  @include mo {
    opacity: 1;
    .portrait-img { transform: scale(5); }
  }
}

// 上层：经典宽幅模式（擦除层，从底部向上覆盖）
.portrait2 {
  z-index: 2;
  clip-path: inset(93% 0px 0px); // 初始：上方 93% 被裁掉，只露底部 7%

  @include mo {
    clip-path: none;
  }
}

// ===== 标题 =====
.portrait-title {
  flex-shrink: 0;

  @include mo {
    padding: 0 16px;
  }

  .pt-title {
    font-size: 48px;
    font-weight: 500;
    line-height: 1.2;
    color: rgba(0, 0, 0, 0.95);

    @include pad { font-size: 28px; }
    @include mo { font-size: 28px; }
  }

  .pt-desc {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.55);
    margin-top: 16px;

    @include pad { margin-top: 9px; }
    @include mo { font-size: 16px; margin-top: 8px; }
  }
}

// ===== 图片 =====
.portrait-img-wrap {
  display: flex;
  justify-content: center;
  width: 924px;
  flex-shrink: 0;

  @include pad {
    width: 543px;
    margin-top: 24px;
  }
  @include mo {
    width: 100%;
    padding: 0 16px;
  }

  .portrait-img {
    width: 655px;
    height: 490px;
    object-fit: cover;

    @include pad {
      width: 352px;
      height: 290px;
    }
    @include mo {
      width: 100%;
      height: 250px;
    }
  }

  .portrait-img-wide {
    width: 924px;
    height: 362px;

    @include pad {
      width: 543px;
      height: 200px;
    }
    @include mo {
      width: 100%;
      height: 180px;
    }
  }
}

// ===== 分割线 =====
// 初始位于 93% 位置（与 clip-path 边缘对齐），滚动时上移至 0%
.lines {
  position: absolute;
  top: 93%;
  left: 0;
  width: 100vw;
  z-index: 3;
  transform: translateY(-50%);

  @include mo {
    display: none;
  }

  .line {
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.15);
  }
}
</style>
