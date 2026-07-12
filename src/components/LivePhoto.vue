<!-- 影像分屏4：实况照片 — 胶卷风格 + 4K超清实况 + 旗舰无影抓拍，右侧滚动上移 -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const videoRef = ref(null)
let ctx
let observer

onMounted(() => {
  ctx = gsap.context(() => {
    const rightCol = sectionRef.value.querySelector('.live-right')
    if (!rightCol) return

    gsap.fromTo(rightCol,
      { y: 393 },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      }
    )
  }, sectionRef.value)

  // 滚动到视频区域时自动播放，离开时暂停
  if (videoRef.value) {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.value.play()
        } else {
          videoRef.value.pause()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(videoRef.value)
  }
})

onUnmounted(() => {
  if (ctx) ctx.revert()
  if (observer) observer.disconnect()
})
</script>

<template>
  <section ref="sectionRef" class="live-photo" id="section-livephoto">
    <div class="live-content">
      <!-- 左侧：固定内容 -->
      <div class="live-left">
        <!-- 上：胶卷风格 -->
        <div class="live-block">
          <p class="live-title">胶卷风格</p>
          <p class="live-desc">每一拍，都有故事感</p>
          <img
            src="/assets/images/livephoto/images-livephoto-live3-1-e78cc4.jpg.webp"
            alt="胶卷风格样张"
            class="live-img"
          />
        </div>

        <!-- 分割线 -->
        <div class="live-divider"></div>

        <!-- 下：旗舰无影抓拍 -->
        <div class="live-block">
          <p class="live-title">旗舰「无影抓拍」</p>
          <p class="live-desc">抓得稳，拍得清</p>
          <img
            src="/assets/images/livephoto/images-livephoto-live4-1-2a8ad3.jpg.webp"
            alt="无影抓拍样张"
            class="live-img live-img-sm"
          />
        </div>
      </div>

      <!-- 中间分割线 -->
      <div class="live-divider-center"></div>

      <!-- 右侧：随滚动上移 -->
      <div class="live-right">
        <div class="live-block">
          <p class="live-title">4K 超清实况</p>
          <p class="live-desc">拍视频时也能拍实况，更高清</p>
          <div class="live-video-wrap">
            <video
              ref="videoRef"
              src="/assets/video03.mp4"
              loop
              muted
              playsinline
              class="live-video-poster"
            />
            <div class="live-logo-badge">
              <img
                src="/assets/images/livephoto/images-livephoto-liveLogo-1-4d69e6.png.webp"
                alt="Live"
                class="live-logo-icon"
              />
              <span>4K 实况</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.live-photo {
  width: 100%;
  background: $color-white;

  @include mo {
    display: none;
  }
}

.live-content {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
}

.live-left {
  width: calc(50% - 0.5px);
}

.live-block {
  padding: 64px;

  @include pad {
    padding: 24px;
  }

  .live-title {
    font-size: 32px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.5px;
    color: rgba(0, 0, 0, 0.95);

    @include pad {
      font-size: 20px;
    }
  }

  .live-desc {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.55);
    margin-top: 16px;

    @include pad {
      font-size: 14px;
      margin-top: 4px;
    }
  }

  .live-img {
    width: 592px;
    height: 444px;
    object-fit: cover;
    margin-top: 32px;

    @include pad {
      width: 336px;
      height: 312px;
      margin-top: 12px;
    }
  }

  .live-img-sm {
    height: 444px;

    @include pad {
      height: 252px;
    }
  }
}

.live-divider {
  width: 50vw;
  height: 1px;
  background: rgba(0, 0, 0, 0.15);
  margin-left: auto;
}

.live-divider-center {
  width: 1px;
  background: rgba(0, 0, 0, 0.15);
}

.live-right {
  width: calc(50% - 0.5px);

  .live-video-wrap {
    position: relative;
    width: 592px;
    height: 790px;
    margin-top: 32px;
    overflow: hidden;

    @include pad {
      width: 336px;
      height: 448px;
      margin-top: 12px;
    }

    .live-video-poster {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .live-logo-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.25);
      padding: 2.6px 7.8px;
      border-radius: 6.5px;

      .live-logo-icon {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }

      span {
        font-size: 14px;
        line-height: 2.06;
        color: $color-white;
      }
    }
  }
}
</style>
