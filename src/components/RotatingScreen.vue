<!-- 小屏显示出色 — 滚动驱动：手机旋转归正 + "165Hz"大字横移 + 底部文案淡入 -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const phoneImg = sectionRef.value.querySelector('.phone')
    const bigText = sectionRef.value.querySelector('.bigtext')
    const bottomText = sectionRef.value.querySelector('.text-wrapper')
    const viewport = sectionRef.value.querySelector('.sticky-viewport')

    // 标题逐字亮起
    const splitChars = sectionRef.value.querySelectorAll('.split-char')
    gsap.fromTo(splitChars,
      { opacity: 0.15 },
      {
        opacity: 1, duration: 0.3, stagger: 0.02, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.value.querySelector('.emoji-squeeze'),
          start: 'top 80%',
          end: 'top 40%',
          scrub: 0.5,
        },
      }
    )

    // 主时间线：手机旋转 + 大字横移 + 底部文案（整屏 pin 住）
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value.querySelector('.sticky-container'),
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        pin: viewport,
      },
    })
    // 手机旋转归正（初始 -5deg + 下移 34px）
    .fromTo(phoneImg,
      { rotate: -10, y: 120 },
      { rotate: -90, y: 90, ease: 'none' },
      0
    )
    // 大字从右向左横滚过屏幕
    .fromTo(bigText,
      { x: 1707, opacity: 1 },
      { x: -1800, opacity: 1, ease: 'none' },
      0
    )
    // 底部文案淡入
    .fromTo(bottomText,
      { opacity: 0 },
      { opacity: 1, ease: 'none' },
      1
    )
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="sectionRef" class="rotating-screen" id="rotating-screen">
    <!-- 96px 大字标题 — 移动端隐藏 -->
    <div class="content mo-hidden">
      <div class="emoji-squeeze">
        <div class="line">
          <span class="split-char">小</span><span class="split-char">屏</span><span class="split-char">显</span><span class="split-char">示</span><span class="split-char">超</span><span class="split-char">出</span><span class="split-char">色</span>
        </div>
        <div class="line">
          <span class="split-char">流</span><span class="split-char">畅</span><span class="split-char">通</span><span class="split-char">透</span><span class="split-char">更</span><span class="split-char">护</span><span class="split-char">眼</span>
        </div>
      </div>
    </div>

    <!-- Sticky 滚动动画容器 -->
    <div id="section-demo" class="demo-area">
      <div class="sticky-container">
        <div class="sticky-viewport">
          <!-- 手机 + 大字（主要内容区） -->
          <div class="phone-container">
            <!-- 手机正面图 -->
            <div class="phone-img-wrap">
              <img
                src="/assets/images/rotating-screen/images-rotating-screen-phone-1-4fcffe.png.webp"
                alt="一加15T"
                class="phone"
              />
            </div>

            <!-- 大字横移区 -->
            <div class="textdiv">
              <div class="bigtext">
                <p>165Hz 旗舰小直屏</p>
              </div>
            </div>
          </div>

          <!-- 底部文案 — 独立于 phone-container，absolute 叠在底部 -->
          <div class="text-wrapper">
            <p>巨流畅，巨通透，巨护眼。</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.rotating-screen {
  width: 100%;
  background: $color-white;
}

// 移动端隐藏标题块
.content {
  @include mo {
    display: none;
  }
}

.emoji-squeeze {
  text-align: center;
  font-size: 96px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.5px;
  color: $color-black;
  padding-top: 140px;

  @include mo {
    font-size: 48px;
    padding-top: 80px;
  }
  @include pad {
    font-size: 48px;
  }

  .line { white-space: nowrap; }
  .split-char { opacity: 0.15; display: inline-block; }
}

.demo-area {
  width: 100%;
  margin-top: 1.388vw;

  @include mo {
    margin-top: 40px;
  }
}

.sticky-container {
  width: 100%;
  height: calc(100vh + 2000px);

  @include mo {
    height: calc(100vh + 2000px);
  }
}

.sticky-viewport {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  @include mo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @include pad {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.phone-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $color-white;
  position: relative;

  @include mo {
    margin-top: 40px;
    height: 100%;
    overflow: hidden;
  }
  @include pad {
    height: 100%;
  }
}

.phone-img-wrap {
  position: relative;
  z-index: 2;
  width: 20.555vw;
  height: 72.083vw;

  @include mo {
    width: 162.5px;
    height: 440px;
    margin-left: 40px;
  }
  @include pad {
    width: 170px;
    height: 596px;
  }

  .phone {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.textdiv {
  position: absolute;
  top: 56.764%;
  width: 100%;
  height: 252px;
  text-align: center;
  z-index: 1;
  overflow: hidden;

  @include mo {
    top: 10%;
    height: 77px;
  }
  @include pad {
    top: 40.764%;
    height: 136px;
  }
}

.bigtext {
  text-align: center;
  opacity: 0;

  p {
    font-size: 210px;
    font-weight: 500;
    line-height: 1.2;
    color: rgba(0, 0, 0, 0.95);
    white-space: nowrap;

    @include mo {
      font-size: 64px;
    }
    @include pad {
      font-size: 108px;
    }
  }
}

// 底部文案 — 独立于 phone-container，absolute 叠在底部
.text-wrapper {
  position: absolute;
  bottom: 12.27%;
  width: 100%;
  display: flex;
  opacity: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;

  @include mo {
    bottom: 15%;
    padding-left: 16px;
    align-items: flex-start;
  }
  @include pad {
    align-items: center;
  }

  p {
    font-size: 64px;
    font-weight: 500;
    line-height: 1.2;
    text-align: center;
    color: rgba(0, 0, 0, 0.95);

    @include mo {
      font-size: 36px;
      text-align: left;
    }
  }
}
</style>
