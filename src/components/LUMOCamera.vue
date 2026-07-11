<!-- LUMO凝光影像系统：sticky滚动驱动手机飞入动画 + 双摄参数 + 旅拍神器文案 -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const phoneImg = sectionRef.value.querySelector('.phone-img')
    const cameraSpecs = sectionRef.value.querySelector('.camera-specs')
    const sellText = sectionRef.value.querySelector('.sell-text')
    const splitChars = sectionRef.value.querySelectorAll('.split-char')

    // 标题逐字亮起
    gsap.fromTo(splitChars,
      { opacity: 0.15 },
      {
        opacity: 1,
        duration: 0.3,
        stagger: 0.02,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.value.querySelector('.emoji-squeeze'),
          start: 'top 80%',
          end: 'top 40%',
          scrub: 0.5,
        },
      }
    )

    // Sticky 手机动画
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value.querySelector('.sticky-container'),
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    })
    .fromTo(phoneImg,
      { x: -520, y: -200, rotate: 42, scale: 0.744 },
      { x: 0, y: 0, rotate: 0, scale: 1, duration: 2, ease: 'none' }
    )
    .fromTo(cameraSpecs, { opacity: 0 }, { opacity: 1, duration: 1 }, '-=1')
    .fromTo(sellText, { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.5')
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="sectionRef" class="lumo-camera" id="section-camera">
    <!-- 96px 大字标题 -->
    <div class="emoji-squeeze">
      <div class="line">
        <span class="split-char">L</span><span class="split-char">U</span><span class="split-char">M</span><span class="split-char">O</span><span class="split-char">&nbsp;</span>
        <span class="split-char">凝</span><span class="split-char">光</span><span class="split-char">影</span><span class="split-char">像</span><span class="split-char">系</span><span class="split-char">统</span>
      </div>
      <div class="line">
        <span class="split-char">人</span><span class="split-char">景</span><span class="split-char">放</span><span class="split-char">大</span><span class="split-char">都</span><span class="split-char">清</span><span class="split-char">晰</span>
      </div>
    </div>

    <!-- Sticky 滚动动画容器 -->
    <div class="sticky-container">
      <div class="sticky-viewport">
        <div class="sticky-content">
          <div class="content-layout">
            <!-- 手机产品图区域 -->
            <div class="phone-area">
              <div class="phone-wrapper">
                <img
                  src="/assets/images/phone-camera/images-phone-camera-phone-pc-1-394651.png.webp"
                  alt="一加15T 相机"
                  class="phone-img"
                />
                <!-- 相机标注参数（PC/Pad绝对定位在手机左侧） -->
                <div class="camera-specs">
                  <div class="spec-item">
                    <p class="spec-name">5000 万像素索尼大底旗舰主摄</p>
                    <p class="spec-detail">1/1.56 英寸大底｜24mm 等效焦距<br />f/1.8 超大圈｜OIS 光学防抖</p>
                  </div>
                  <div class="spec-item spec-tele">
                    <p class="spec-name">5000 万像素 3.5 倍潜望长焦镜头</p>
                    <p class="spec-detail">85mm 等效焦距｜3.5 倍光学潜望长焦<br />7 倍无损变焦｜OIS 光学防抖<sup>11</sup></p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 旅拍神器文案 -->
            <div class="sell-text">
              <p class="sell-label">旅拍神器</p>
              <h2 class="sell-headline">旅游打卡小神机<br />拍近拍远都出片</h2>
              <p class="sell-desc">
                这款小屏旗舰，搭载 OPPO 旗舰同款的 LUMO 凝光影像算法，
                <span class="desc-sub">拍景好看，拍人更美。有 LUMO 在手，大片就到手。</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.lumo-camera {
  width: 100%;
  background: $color-bg-tertiary;

  .emoji-squeeze {
    text-align: center;
    font-size: 96px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: 0.5px;
    color: $color-black;
    padding-top: 400px;

    @include pad {
      font-size: 48px;
      padding-top: 216px;
    }
    @include mo {
      font-size: 48px;
      padding-top: 103px;
    }

    .line { white-space: nowrap; }
    .split-char { opacity: 0.15; display: inline-block; }
  }

  .sticky-container {
    width: 100%;
    height: 500vh;
    position: relative;
    z-index: 1;
  }

  .sticky-viewport {
    position: sticky;
    top: $nav-height;
    width: 100%;
    height: calc(100vh - #{$nav-height});
    overflow: hidden;

    @include mo {
      height: 100vh;
      margin-top: 48px;
      top: 0;
    }
  }

  .sticky-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content-layout {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 64px;

    @include mo {
      flex-direction: column;
      padding: 0 16px;
      justify-content: center;
    }
    @include pad {
      padding: 0 24px;
    }
  }

  .phone-area {
    position: relative;
    flex-shrink: 0;

    .phone-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .phone-img {
      width: auto;
      height: 70vh;
      max-height: 800px;
      object-fit: contain;

      @include mo {
        height: 50vh;
        max-height: 440px;
      }
      @include pad {
        height: 60vh;
        max-height: 600px;
      }
    }

    .camera-specs {
      position: absolute;
      left: -320px;
      top: 180px;
      opacity: 0;

      @include pad {
        left: -200px;
        top: 100px;
      }
      @include mo {
        position: relative;
        left: auto;
        top: auto;
        padding: 0 16px;
        margin-top: 24px;
      }

      .spec-item {
        margin-bottom: 60px;

        @include pad { margin-bottom: 36px; }

        .spec-name {
          font-size: 24px;
          font-weight: 500;
          line-height: 1.2;
          color: rgba(0, 0, 0, 0.95);
          white-space: nowrap;

          @include mo { font-size: 16px; }
        }

        .spec-detail {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
          color: rgba(0, 0, 0, 0.55);
          margin-top: 8px;

          @include mo { font-size: 12px; }
        }
      }
    }
  }

  .sell-text {
    flex-shrink: 0;
    opacity: 0;

    @include mo {
      padding: 0 16px;
      margin-top: 48px;
    }

    .sell-label {
      font-size: 36px;
      font-weight: 500;
      line-height: 1.2;
      color: rgba(0, 0, 0, 0.95);
      margin-bottom: 11px;

      @include pad { margin-bottom: 8px; }
      @include mo { font-size: 20px; }
    }

    .sell-headline {
      font-size: 64px;
      font-weight: 500;
      line-height: 1.2;
      color: rgba(0, 0, 0, 0.95);

      @include pad { font-size: 40px; }
      @include mo { font-size: 28px; }
    }

    .sell-desc {
      font-size: 18px;
      font-weight: 500;
      line-height: 1.4;
      color: rgba(0, 0, 0, 0.95);
      max-width: 423px;
      margin-top: 12px;

      @include pad { max-width: 302px; }
      @include mo { font-size: 16px; }

      .desc-sub { color: rgba(0, 0, 0, 0.55); }
    }
  }
}
</style>
