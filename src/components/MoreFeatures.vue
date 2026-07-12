<!-- 全面大升级 — GSAP pin 整屏 + 滚动驱动6张卡片横滑 + 进度条 -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
let ctx

const features = [
  { title: '3D 超声波指纹', desc: '指纹解锁超迅速，湿手油手也秒开。', img: '/assets/images/more-points/images-more-points-shoumo-1-65ce27.png.webp', isShoumo: true },
  { title: 'IP66/68/69/69K 满级防尘防水¹⁴', desc: '满级防水更安心，玩水嬉戏超自在。', img: '/assets/images/more-points/images-more-points-pic2-1-4b33d9.jpg.webp' },
  { title: '超耐用「晶盾玻璃」', desc: '不贴膜也耐刮，无惧生活小磨擦。', img: '/assets/images/more-points/images-more-points-pic3-1-9dc118.jpg' },
  { title: '立体声双扬声器', desc: '听歌、追剧、游戏，好音质，更沉浸。', img: '/assets/images/more-points/images-more-points-pic4-1-50c298.jpg.webp' },
  { title: '多功能 NFC', desc: '坐地铁搭公交，手机一刷就过特方便。', img: '/assets/images/more-points/images-more-points-pic5-1-1140be.jpg.webp' },
  { title: '红外遥控', desc: '手机就是遥控器，再也不用到处找。', img: '/assets/images/more-points/images-more-points-pic6-1-05f232.jpg' },
]

onMounted(() => {
  ctx = gsap.context(() => {
    const rowWrapper = sectionRef.value.querySelector('.row-wrapper')
    const slider = sectionRef.value.querySelector('.slider')
    const viewport = sectionRef.value.querySelector('.sticky-viewport')

    // 标题逐字变黑：从左到右、从上到下依次亮起
    const splitChars = sectionRef.value.querySelectorAll('.split-char')
    gsap.fromTo(splitChars,
      { opacity: 0.15 },
      {
        opacity: 1, stagger: 0.04, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.value.querySelector('.emoji-squeeze'),
          start: 'top 75%',
          end: 'top 30%',
          scrub: 0.5,
        },
      }
    )

    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value.querySelector('.sticky-container'),
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        pin: viewport,
      },
    })
    .to(rowWrapper, { x: () => -(rowWrapper.scrollWidth - window.innerWidth), ease: 'none' }, 0)
    .to(slider, { x: 275, ease: 'none' }, 0)
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="sectionRef" class="more-features mo-hidden" id="section-points">
    <!-- 大字标题 -->
    <div class="content">
      <div class="emoji-squeeze">
        <div class="line">
          <span class="split-char">全</span><span class="split-char">面</span><span class="split-char">大</span><span class="split-char">升</span><span class="split-char">级</span>
        </div>
        <div class="line">
          <span class="split-char">全</span><span class="split-char">部</span><span class="split-char">超</span><span class="split-char">好</span><span class="split-char">用</span>
        </div>
      </div>
    </div>

    <!-- Sticky 横滑容器 -->
    <div class="sticky-container">
      <div class="sticky-viewport">
        <div class="sticky-content">
          <div class="line" />
          <div class="row-wrapper">
            <div
              v-for="(f, i) in features"
              :key="i"
              class="feature-card"
              :class="{ endcard: i === features.length - 1 }"
            >
              <img
                :src="f.img"
                :alt="f.title"
                class="card-img"
                :class="{ 'card-img-shoumo': f.isShoumo }"
              />
              <div class="card-intro">
                <p class="card-title">{{ f.title }}</p>
                <p class="card-desc">{{ f.desc }}</p>
              </div>
            </div>
          </div>
          <div class="line" />
        </div>
      </div>
    </div>

    <!-- 进度条 -->
    <div class="progress-bar-wrap">
      <div class="progress-bar">
        <div class="slider" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.more-features {
  width: 100%;
  background: $color-white;
  margin-top: 15.0955vh;
}

.content {
  opacity: 1;
}

.emoji-squeeze {
  text-align: center;
  font-size: 96px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.5px;
  color: $color-black;

  @include mo {
    font-size: 48px;
  }
  @include pad {
    font-size: 48px;
  }

  .line { white-space: nowrap; }
  .split-char { opacity: 0.15; display: inline-block; }
}

.sticky-container {
  width: 100%;
  height: 600vh;
}

.sticky-viewport {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.sticky-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0 64px;

  @include pad {
    padding: 0 24px;
  }
}

.line {
  width: 100%;
   //height: 1px;
  // background: rgba(42, 42, 42, 0.15);
}

.row-wrapper {
  display: flex;
  flex-shrink: 0;
}

.feature-card {
  width: 83.0572vh;
  flex-shrink: 0;

  @include pad {
    width: 388px;
  }

  .card-img {
    width: 100%;
    height: 49.6815vh;
    object-fit: cover;

    @include pad {
      height: 262px;
    }
  }

  .card-img-shoumo {
    object-fit: contain;
    object-position: bottom;
  }

  .card-intro {
    padding: 5.15vh 0;

    @include pad {
      padding: 24px 0;
    }

    .card-title {
      font-size: 32px;
      font-weight: 500;
      line-height: 1.1;
      color: $color-black;

      @include pad {
        font-size: 18px;
      }
    }

    .card-desc {
      font-size: 18px;
      font-weight: 500;
      line-height: 1.2;
      color: rgba(0, 0, 0, 0.55);
      margin-top: 12px;

      @include pad {
        font-size: 14px;
        margin-top: 8px;
      }
    }
  }
}

.progress-bar-wrap {
  width: 100%;
  padding: 5.0955vh 0 5.0955vh 64px;

  @include pad {
    padding: 32px 0 32px 35px;
  }
}

.progress-bar {
  width: 330px;
  height: 1px;
  background: #999;
  position: relative;

  @include pad {
    width: 240px;
  }

  .slider {
    width: 55px;
    height: 3px;
    background: #91AC7F;
    position: absolute;
    left: 0;
    top: -1px;

    @include pad {
      width: 40px;
    }
  }
}
</style>
