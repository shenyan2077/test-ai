<!-- 真硬件1nit暗夜显示 — 暗光背景(暗化+视差) + 白色半透明叠加 + 文字淡入 -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const bgImg = sectionRef.value.querySelector('.bg-img')

    // 背景图视差：随滚动缓慢上移
    gsap.to(bgImg, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    })

    // 文字淡入
    const fadeEls = sectionRef.value.querySelectorAll('.fade-in')
    fadeEls.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      )
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="sectionRef" class="dark-night mo-hidden" id="section-hu">
    <div class="night-bg">
      <img
        src="/assets/images/eyes/images-eyes-pc-bg-1-14ab62.png"
        alt="暗夜显示背景"
        class="bg-img"
      />
      <!-- 暗化层 -->
      <div class="bg-dim" />
      <!-- 白色半透明文字叠加 -->
      <div class="night-overlay">
        <div class="night-text">
          <h2 class="night-title fade-in">真硬件 1nit 暗夜显示<br />夜里看手机，清晰不刺眼。</h2>
          <p class="night-desc fade-in">
            <span class="desc-sub">真硬件 1nit 暗夜显示，</span>
            <span class="desc-main">让你在暗夜里看手机时，屏幕更加清晰准确，同时又不刺眼，就像月光一样温柔呵护眼睛。</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.dark-night {
  width: 100%;
  min-height: 600px;
  height: 41.67vw;
  position: relative;
  overflow: hidden;

  @include pad {
    height: 370px;
    min-height: 324px;
  }
}

.night-bg {
  width: 100%;
  height: 120%; // 比容器高，给视差留空间
  position: relative;
  top: -10%;

  @include pad {
    height: 115%;
    top: -7.5%;
  }

  .bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    inset: 0;
  }
}

// 暗化层 — 压暗背景图，让白色文字更突出
.bg-dim {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1;
}

.night-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.night-text {
  max-width: 800px;
  text-align: center;

  @include pad {
    max-width: 433px;
  }
  @include mo {
    padding: 0 16px;
  }

  .night-title {
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

  .night-desc {
    margin-top: 24px;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.44;

    @include pad {
      font-size: 16px;
    }

    .desc-sub {
      color: rgba(255, 255, 255, 0.55);
    }

    .desc-main {
      color: rgba(255, 255, 255, 0.95);
    }
  }
}
</style>
