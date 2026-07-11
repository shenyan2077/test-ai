<!-- 影像分屏2：样张展示横滑 — 两组样张对比（人像+风景），横滑切换 -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const activeIndex = ref(0)
let ctx

const samples = [
  {
    title: 'LUMO X 3.5 倍潜望长焦',
    subtitle: '随时随地，拍人更美。',
    desc: 'LUMO 凝光影像引擎加持的 3.5 倍潜望长焦拍人像，虚化更自然，肤色更真实，轻松拍出影棚感。',
    img1: '/assets/images/picture/images-picture-1-1-pc-1-90ef37.jpg.webp',
    img2: '/assets/images/picture/images-picture-1-2-pc-1-628ef1.jpg.webp',
  },
  {
    title: '不分远近，拍景更清晰。',
    subtitle: '',
    desc: 'LUMO 凝光影像引擎加持的 3.5 倍潜望长焦拍风景，轻松将远处的美景清晰收进手机，放大也清晰。',
    img1: '/assets/images/picture/images-picture-2-1-pc-1-017db9.jpg.webp',
    img2: '/assets/images/picture/images-picture-2-2-pc-1-a9aadd.jpg.webp',
  },
]

onMounted(() => {
  ctx = gsap.context(() => {
    const rowWrapper = sectionRef.value.querySelector('.row-wrapper')
    if (!rowWrapper) return

    gsap.to(rowWrapper, {
      x: () => -(rowWrapper.scrollWidth - rowWrapper.parentElement.offsetWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="sectionRef" class="camera-samples" id="section-picture">
    <div class="samples-inner">
      <div class="content-wrapper">
        <div class="row-wrapper">
          <div
            v-for="(sample, i) in samples"
            :key="i"
            class="sample-item"
          >
            <!-- 左侧文案 -->
            <div class="text-wrapper">
              <p class="sample-title">{{ sample.title }}</p>
              <p v-if="sample.subtitle" class="sample-subtitle">{{ sample.subtitle }}</p>
              <div class="sample-desc">
                <p>
                  <span class="desc-main">{{ sample.desc.split('，')[0] }}，</span>
                  <span class="desc-sub">{{ sample.desc.split('，').slice(1).join('，') }}</span>
                </p>
              </div>
            </div>

            <!-- 右侧样张图组 -->
            <div class="image-group">
              <div class="image-wrapper">
                <img :src="sample.img1" alt="样张1" class="sample-img" />
              </div>
              <div class="image-wrapper">
                <img :src="sample.img2" alt="样张2" class="sample-img sample-img-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.camera-samples {
  width: 100%;
  background: $color-white;
  overflow: hidden;

  .samples-inner {
    width: 100%;
  }

  .content-wrapper {
    width: 100%;
    overflow: hidden;
  }

  .row-wrapper {
    display: flex;
    flex-shrink: 0;
  }

  .sample-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    width: 846px;
    padding: min(5.555vw, 80px) 64px;
    background: $color-white;

    @include pad {
      width: 720px;
      padding: 40px 24px;
    }
    @include mo {
      width: 100vw;
      flex-direction: column;
      padding: 36px 16px;
    }
  }

  .text-wrapper {
    width: 592px;
    flex-shrink: 0;

    @include pad {
      width: 320px;
    }
    @include mo {
      width: 100%;
      margin-bottom: 24px;
    }

    .sample-title {
      font-size: 32px;
      font-weight: 500;
      line-height: 1.3;
      color: rgba(0, 0, 0, 0.95);

      @include mo {
        font-size: 20px;
      }
    }

    .sample-subtitle {
      font-size: 32px;
      font-weight: 500;
      line-height: 1.3;
      color: rgba(0, 0, 0, 0.95);
    }

    .sample-desc {
      margin-top: 8px;

      p {
        font-size: 18px;
        font-weight: 500;
        line-height: 1.4;

        @include mo {
          font-size: 14px;
        }
      }

      .desc-main {
        color: rgba(0, 0, 0, 0.95);
      }

      .desc-sub {
        color: rgba(0, 0, 0, 0.55);
      }
    }
  }

  .image-group {
    display: flex;
    gap: 8px;

    @include mo {
      width: 100%;
      justify-content: center;
    }

    .image-wrapper {
      width: 294px;
      height: 388px;
      overflow: hidden;
      border-radius: 4px;
      position: relative;

      @include pad {
        width: 180px;
        height: 240px;
      }
      @include mo {
        width: 158px;
        height: 210px;
      }

      .sample-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
