<!-- 影像分屏3：大师影像/经典宽幅模式 — sticky clip-path 滚动揭开第二屏 -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const portrait2 = sectionRef.value.querySelector('.portrait2')

    gsap.fromTo(portrait2,
      { clipPath: 'inset(93% 0px 0px)' },
      {
        clipPath: 'inset(0% 0px 0px)',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.value.querySelector('.sticky-container'),
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      }
    )
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="sectionRef" class="master-portrait" id="section-telephoto">
    <div class="sticky-container">
      <div class="sticky-viewport">
        <div class="sticky-content">
          <!-- 第一层：大师影像 -->
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

          <!-- 第二层：经典宽幅模式（clip-path 从上揭开） -->
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
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.master-portrait {
  width: 100%;
  background: $color-bg-secondary;

  .sticky-container {
    width: 100%;
    height: 250vh;
  }

  .sticky-viewport {
    position: sticky;
    top: $nav-height;
    width: 100%;
    height: calc(100vh - #{$nav-height});
    overflow: hidden;
  }

  .sticky-content {
    position: relative;
    width: 100%;
    max-width: 1440px;
    height: 100%;
    margin: 0 auto;
    padding: 0 64px 0 64px;

    @include pad {
      padding: 0 24px;
    }
    @include mo {
      padding: 0 16px;
    }
  }

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
    }
    @include mo {
      flex-direction: column;
      padding: 0 16px;
      justify-content: center;
    }
  }

  .portrait1 {
    z-index: 2;
  }

  .portrait2 {
    z-index: 1;
  }

  .portrait-title {
    .pt-title {
      font-size: 48px;
      font-weight: 500;
      line-height: 1.2;
      color: rgba(0, 0, 0, 0.95);

      @include pad {
        font-size: 28px;
      }
      @include mo {
        font-size: 28px;
      }
    }

    .pt-desc {
      font-size: 18px;
      font-weight: 500;
      line-height: 1.4;
      color: rgba(0, 0, 0, 0.55);
      margin-top: 16px;

      @include pad {
        margin-top: 9px;
      }
      @include mo {
        font-size: 16px;
        margin-top: 8px;
      }
    }
  }

  .portrait-img-wrap {
    display: flex;
    justify-content: center;
    width: 924px;

    @include pad {
      width: 543px;
    }
    @include mo {
      width: 100%;
      margin-top: 24px;
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
}
</style>
