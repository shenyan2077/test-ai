<!-- 全面大升级 — 首图全屏 → 缩至卡片位 → 6图横滑 + 进度条 -->
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
    const heroCard = sectionRef.value.querySelector('.hero-card')
    const heroImg = sectionRef.value.querySelector('.hero-img')

    // 标题逐字变黑
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

    const vw = window.innerWidth
    const vh = window.innerHeight
    const startLeft = vw * 0.025      // 2.5vw，几乎贴边
    const startWidth = vw * 0.95      // 95vw，几乎撑满
    const startImgH = vh * 0.75       // 75vh，初始很高
    const endWidth = vh * 0.830572    // 83.0572vh → px
    const endImgH = vh * 0.496815     // 49.6815vh → px
    const endLeft = 64                // sticky-content 左内边距

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value.querySelector('.sticky-container'),
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        pin: viewport,
      },
    })

    // 阶段1：首图从全屏缩到卡片位（占 35%），期间 row-wrapper 从不可见到淡入
    tl.fromTo(heroCard,
      { left: startLeft, width: startWidth },
      { left: endLeft, width: endWidth, duration: 0.35, ease: 'none' },
      0
    )
    tl.fromTo(heroImg,
      { height: startImgH },
      { height: endImgH, duration: 0.35, ease: 'none' },
      0
    )
    // row-wrapper 淡入（0.15 → 0.35）
    tl.fromTo(rowWrapper,
      { opacity: 0 },
      { opacity: 1, duration: 0.20, ease: 'none' },
      0.15
    )
    // hero 淡出，交接给第一张卡片（0.25 → 0.35）
    tl.to(heroCard,
      { opacity: 0, duration: 0.10, ease: 'none' },
      0.25
    )
    // 阶段2：6 图横滑（占 65% 滚动距离）
    tl.to(rowWrapper, { x: () => -(rowWrapper.scrollWidth - vw), ease: 'none' }, 0.35)
    tl.to(slider, { x: 275, ease: 'none' }, 0.35)
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
        <!-- Hero 首图：初始全屏居中仅图片，随滚动缩到第一张卡片位置 -->
        <div class="hero-card">
          <img
            :src="features[0].img"
            :alt="features[0].title"
            class="hero-img"
            :class="{ 'card-img-shoumo': features[0].isShoumo }"
          />
        </div>

        <!-- 6 卡片横滑（hero 到位后自然衔接，首个卡片同内容不可见） -->
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
  position: relative;
}

/* ====== Hero 首图：全屏居中 → 缩到卡片位 ====== */
.hero-card {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  // left / width 由 GSAP 驱动

  .hero-img {
    width: 100%;
    // height 由 GSAP 驱动
    object-fit: contain;
    object-position: bottom;
  }
}

/* ====== 横滑卡片 ====== */
.sticky-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0 64px;
  position: relative;
  z-index: 1;
  // row-wrapper 初始透明，阶段1 淡入
  .row-wrapper {
    opacity: 0;
  }

  @include pad {
    padding: 0 24px;
  }
}

.line {
  width: 100%;
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
