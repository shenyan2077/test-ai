<!-- 屏幕分屏4：明眸护眼 — 黑色背景视差人眼图 + 底部毛玻璃护眼技术标签面板 -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const bgImg = sectionRef.value.querySelector('.eye-bg-img')

    // 背景图视差：滚动速度比前景慢，营造深度感
    gsap.to(bgImg, {
      y: -800,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})

// 明眸护眼模块：parallax背景 + 毛玻璃面板展示7个护眼技术
const techRow1 = ['AI 色彩增强', 'AI 眨眼提示', 'AI 距离提示', '晕车舒缓']
const techRow2 = ['降低白点值', '舒适色温 3.0', '节律健康 3.0']
</script>

<template>
  <section ref="sectionRef" class="eye-protection" id="section-eyes">
    <div class="eye-bg">
      <img
        src="/assets/images/eyes/images-eyes-3071_1021-1-8f2e7b.png.webp"
        alt="明眸护眼"
        class="eye-bg-img"
      />

      <!-- 顶部标题 + 小金标 -->
      <div class="eye-top">
        <div class="eye-title-wrap">
          <h2 class="eye-title">全新一代「明眸护眼」<br />小屏护眼，认准「小金标」。</h2>
        </div>
        <div class="eye-badge">
          <img
            src="/assets/images/eyes/images-eyes-3071_1031-1-f7e788.png.webp"
            alt="小金标"
            class="badge-img"
          />
        </div>
      </div>

      <!-- 底部毛玻璃面板 -->
      <div class="eye-panel">
        <div class="panel-inner">
          <div class="panel-header">
            <p class="panel-title">医显共研，自然光护眼。</p>
          </div>

          <!-- 图示条 -->
          <div class="panel-icon-row">
            <img
              src="/assets/images/eyes/images-eyes-3071_1034-1-b1451f.png.webp"
              alt="护眼图示"
              class="icon-img"
            />
          </div>

          <!-- 7个技术标签 -->
          <div class="tech-tags">
            <!-- 第一行4个 -->
            <div class="tech-row">
              <div v-for="t in techRow1" :key="t" class="tech-tag">
                <p>{{ t }}</p>
              </div>
            </div>
            <!-- 第二行3个 -->
            <div class="tech-row tech-row-3">
              <div v-for="t in techRow2" :key="t" class="tech-tag">
                <p>{{ t }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.eye-protection {
  width: 100%;
  height: 1200px;
  position: relative;
  background: $color-black;
  overflow: hidden;

  @include pad {
    height: 741px;
  }
  @include mo {
    height: auto;
    min-height: 700px;
  }
}

.eye-bg {
  width: 100%;
  height: 100%;
  position: relative;

  .eye-bg-img {
    width: 100%;
    height: 1372px;
    position: absolute;
    top: -6px;
    left: 0;
    object-fit: cover;

    @include pad {
      height: 742px;
    }
  }
}

.eye-top {
  position: absolute;
  top: 125px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @include pad {
    top: 64px;
  }
  @include mo {
    top: 48px;
    padding: 0 16px;
  }

  .eye-title-wrap {
    width: 100%;
    text-align: center;

    .eye-title {
      font-size: 48px;
      font-weight: 500;
      line-height: 1.2;
      color: rgba(255, 255, 255, 0.95);

      @include pad {
        font-size: 28px;
      }
      @include mo {
        font-size: 28px;
      }
    }
  }

  .eye-badge {
    margin-top: 16px;

    @include pad {
      margin-top: 50px;
    }

    .badge-img {
      width: 242px;
      height: 185px;

      @include pad {
        width: 126px;
        height: 95px;
      }
      @include mo {
        width: 100px;
        height: 76px;
      }
    }
  }
}

// 底部毛玻璃面板
.eye-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.84);
 // backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  padding: 105px 64px;

  @include pad {
    padding: 64px 24px;
  }
  @include mo {
    padding: 48px 16px;
    position: relative;
  }

  .panel-inner {
    max-width: 1094px;
    width: 100%;

    @include pad {
      max-width: 503px;
    }
  }

  .panel-header {
    text-align: center;

    .panel-title {
      font-size: 48px;
      font-weight: 500;
      line-height: 1.2;
      color: rgba(42, 42, 42, 0.95);

      @include pad {
        font-size: 28px;
      }
      @include mo {
        font-size: 24px;
      }
    }
  }

  .panel-icon-row {
    display: flex;
    justify-content: center;
    margin-top: 32px;

    @include pad {
      margin-top: 17px;
    }

    .icon-img {
      width: 1094px;
      height: 100px;
      object-fit: contain;

      @include pad {
        width: 100%;
        height: 40px;
      }
    }
  }

  .tech-tags {
    margin-top: 64px;

    @include pad {
      margin-top: 24px;
    }
    @include mo {
      margin-top: 32px;
    }
  }

  .tech-row {
    display: flex;
    gap: 8px;

    @include pad {
      gap: 4px;
    }
    @include mo {
      flex-wrap: wrap;
    }

    .tech-tag {
      flex: 1 1 267px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 23px 10px;
      background: rgba(42, 42, 42, 0.1);
      backdrop-filter: blur(2.67px);

      @include pad {
        flex: 1 1 145px;
        padding: 16px;
      }
      @include mo {
        flex: 1 1 45%;
        padding: 12px 8px;
      }

      p {
        font-size: 24px;
        font-weight: 500;
        line-height: 1.67;
        color: #2a2a2a;

        @include pad {
          font-size: 16px;
        }
        @include mo {
          font-size: 14px;
        }
      }
    }
  }

  .tech-row-3 {
    margin-top: 8px;

    @include pad {
      margin-top: 4px;
    }

    .tech-tag {
      flex: 1 1 359px;
      @include pad { flex: 1 1 194px; }
    }
  }
}
</style>
