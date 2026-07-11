<!--
  设计美图 (Appearance)：两屏横向滚动
  屏1：6个功能卖点卡片 + 对应手机图（hover 切换）
  屏2："单手的神" 标题 + 手机前后对比（clip-line 扫过）
-->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const statusIndex = ref(0)
let ctx

const features = [
  { label: '单手轻松拿捏', value: '6.32 英寸', img: 'images-appearance-0-pc-1-e7a079.png' },
  { label: '一按就记超好用', value: '实体快捷键', img: 'images-appearance-1-pc-1-9dc41c.png.webp' },
  { label: '上手就叫好', value: '黄金大 R 角', img: 'images-appearance-2-pc-1-2a977f.png.webp' },
  { label: '横竖不挡手', value: '金属魔方 Deco', img: 'images-appearance-3-pc-1-bea204.png.webp' },
  { label: '超窄机身，握持舒心', value: '71.82mm', img: 'images-appearance-4-pc-1-657d42.png.webp' },
  { label: '天平配重，轻松掌控²', value: '50:50', img: 'images-appearance-5-pc-1-be06a4.png.webp' },
]

function onHover(index) {
  statusIndex.value = index
}

onMounted(() => {
  ctx = gsap.context(() => {
    const scrollWrap = sectionRef.value.querySelector('.scroll-wrap')
    const oneBox = sectionRef.value.querySelector('.one-box')
    const phoneWrapper = sectionRef.value.querySelector('.phone-wrapper')
    const phoneImg0 = phoneWrapper?.querySelectorAll('img')[0]
    const phoneImg1 = phoneWrapper?.querySelectorAll('img')[1]
    const bgText = sectionRef.value.querySelector('.bg-text')
    const smallText = sectionRef.value.querySelector('.small-text')
    const clipLine = sectionRef.value.querySelector('.clip-line')
    const clipLineWrapper = sectionRef.value.querySelector('.clip-line-wrapper')
    const bottomText = sectionRef.value.querySelector('.bottom-text')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: '+=1500',
        scrub: 1,
        pin: true,
      },
    })

    // 1. scroll-wrap 左移 100vw（横向滚动切换到第二屏）
    tl.fromTo(scrollWrap, { x: 0 }, { x: '-100vw', duration: 1.5, ease: 'none' })
    // 2. phone-wrapper 从右侧滑入居中
    tl.fromTo(
      phoneWrapper,
      { x: '-35%' },
      { x: '-5%', duration: 0.5, ease: 'none' },
      '-=0.5'
    )
    // 3. one-box 淡出
    tl.fromTo(
      oneBox,
      { opacity: 1 },
      { opacity: 0, duration: 0.5, ease: 'none' },
      '-=0.5'
    )
    // 4. bg-text 从右侧滑入
    tl.fromTo(bgText, { x: '80%' }, { x: '0%', duration: 2 })
    // 5. small-text 视差左移
    tl.fromTo(smallText, { x: '-5%' }, { x: '-20%', duration: 1, ease: 'none' }, '-=2')
    // 6. clip-line-wrapper 淡入
    tl.fromTo(clipLineWrapper, { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=1.8')
    // 7. phone img[0] 从右向左被裁剪（露出下方 img[1]）
    tl.fromTo(
      phoneImg0,
      { clipPath: 'inset(0% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 100%)', duration: 1 },
      '-=1.5'
    )
    // 8. phone img[1] 从左向右被揭示
    tl.fromTo(
      phoneImg1,
      { clipPath: 'inset(0% 100% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 },
      '-=1.5'
    )
    // 9. clip-line 从左扫到右
    tl.fromTo(clipLine, { x: 0 }, { x: phoneImg0?.offsetWidth || 612, duration: 1 }, '-=1.5')
    // 10. clip-line 淡出
    tl.fromTo(clipLine, { opacity: 1 }, { opacity: 0, duration: 0.3 }, '-=0.5')
    // 11. bottom-text 淡入
    if (bottomText) {
      tl.fromTo(bottomText, { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.3')
    }
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="sectionRef" class="appearance">
    <div class="scroll-wrap">
      <!-- ====== 第一屏：功能卖点 + 手机图 ====== -->
      <div class="box one-box" :data-status="statusIndex">
        <!-- 左侧：手机图（随 hover 切换 6 张） -->
        <div class="left-phone">
          <img
            v-for="(f, i) in features"
            :key="'img' + i"
            :src="`/assets/images/appearance/${f.img}`"
            :alt="f.value"
            class="feature-phone-img"
            :class="{ active: statusIndex === i }"
          />
        </div>

        <!-- 右侧：6 宫格功能卡片 -->
        <div class="right-grid">
          <div
            v-for="(f, i) in features"
            :key="'f' + i"
            class="text-box"
            @mouseenter="onHover(i)"
          >
            <p class="box-label">{{ f.label }}</p>
            <p class="box-value">{{ f.value }}</p>
          </div>
        </div>
      </div>

      <!-- ====== 第二屏："单手的神" 标题 + 手机对比 ====== -->
      <div class="box second-box">
        <!-- 大字标题 -->
        <div class="bg-text">
          <div class="small-text">
            单手的神
            <img
              src="/assets/images/appearance/images-appearance-emoji-0-1-a2a222.png.webp"
              alt="emoji"
              class="emoji-icon"
            />
          </div>
          <div class="big-title">小屏超便携，一手掌控超自在。</div>
        </div>

        <!-- 手机前后对比 -->
        <div class="phone-wrapper">
          <div class="phone-compare">
            <img
              src="/assets/images/appearance/images-appearance-phone-0-1-d1149c.png.webp"
              alt="一加15T 外观"
              class="compare-img"
            />
            <img
              src="/assets/images/appearance/images-appearance-phone-1-1-452acc.png.webp"
              alt="一加15T 外观"
              class="compare-img compare-img-under"
            />
          </div>
          <!-- 裁切线 -->
          <div class="clip-line-wrapper">
            <div class="clip-line">
              <img
                src="/assets/images/appearance/images-appearance-emoji-1-1-2e47ed.png.webp"
                alt="drag"
                class="clip-emoji"
              />
            </div>
          </div>
        </div>

        <!-- 底部说明文字 -->
        <div class="bottom-text">
          <span class="bt-strong">机身小巧轻盈，单手轻松握持。</span>
          <span class="bt-sub">即便一手奶茶球拍，一手回消息，单手操作也自如。</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
/* ── 外层：全屏 pin ── */
.appearance {
  width: 100%;
  height: 100vh;
  background: #fafafa;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}

/* ── 横向滚动容器：200vw 宽，容纳两屏 ── */
.scroll-wrap {
  display: flex;
  width: 200vw;
  height: 77vh;

  @include mo {
    height: 100%;
    align-items: flex-end;
  }
  @include pad {
    height: 70vh;
  }
}

/* ========================================
   第一屏：功能卡片 + 手机
   ======================================== */
.one-box {
  width: calc(100vw - 128px);
  margin: 0 64px;
  display: flex;
  height: 100%;
  flex-shrink: 0;

  @include mo {
    flex-direction: column;
    width: 100vw;
    margin: 0;
    padding-bottom: 60px;
  }
  @include pad {
    width: calc(100vw - 69px);
    margin: 0 35px;
  }
}

/* 左侧手机图 */
.left-phone {
  width: 55.8%;
  height: 100%;
  position: relative;
  pointer-events: none;
  z-index: 2;

  @include mo {
    width: 100%;
    height: 46.38%;
  }
  @include pad {
    width: 51.66%;
  }

  .feature-phone-img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s;

    &.active {
      opacity: 1;
    }

    @include mo {
      height: 294px;
      bottom: 0;
      top: auto;
    }
  }
}

/* 右侧 3×2 功能网格 */
.right-grid {
  width: 44.2%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @include mo {
    width: 100%;
    height: 53.62%;
  }
  @include pad {
    width: 48.34%;
  }

  .text-box {
    width: 50%;
    height: 33.4%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 24px;
    cursor: pointer;
    position: relative;
    // 分割线：右边 + 下边（最后一行除外）
    border-right: 1px solid rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    transition: background 0.2s;

    // 偶数列（右边）无右边线
    &:nth-child(2n) {
      border-right: none;
    }
    // 最后一行（第5、6个）无下边线
    &:nth-child(5),
    &:nth-child(6) {
      border-bottom: none;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }

    @include mo {
      padding: 12px;
    }
    @include pad {
      padding: 13px;
    }

    .box-label {
      font-size: 14px;
      line-height: 1.4;
      color: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 24px;
      left: 24px;

      @include mo {
        font-size: 12px;
        top: 12px;
        left: 12px;
      }
      @include pad {
        font-size: 8px;
        top: 13px;
        left: 13px;
      }
    }

    .box-value {
      font-size: 36px;
      line-height: 1.2;
      color: rgba(0, 0, 0, 0.95);
      font-weight: 500;
      margin-top: 12px;

      @include mo {
        font-size: 24px;
      }
      @include pad {
        font-size: 19px;
      }
    }
  }
}

/* ========================================
   第二屏："单手的神"
   ======================================== */
.second-box {
  width: 100vw;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  flex-shrink: 0;

  @include mo {
    height: 82vh;
    align-items: flex-end;
  }

  /* 大字标题区 */
  .bg-text {
    position: absolute;
    right: 0;
    top: 3.75vh;

    @include mo {
      top: 4vh;
    }

    .small-text {
      font-size: 100px;
      letter-spacing: 5px;
      display: flex;
      align-items: center;
      font-weight: 500;

      @include mo {
        font-size: 30px;
        line-height: 5px;
      }
      @include pad {
        font-size: 48px;
        letter-spacing: 5px;
      }

      .emoji-icon {
        width: 100px;
        height: 100px;
        object-fit: cover;
        margin-left: 3px;

        @include mo {
          width: 32px;
          height: 32px;
        }
        @include pad {
          width: 48px;
          height: 48px;
        }
      }
    }

    .big-title {
      font-size: 180px;
      font-weight: 500;
      letter-spacing: 5px;
      margin-top: 42px;
      line-height: 1.3;
      white-space: nowrap;

      @include mo {
        font-size: 56px;
        letter-spacing: 5px;
        margin-top: 12px;
      }
      @include pad {
        font-size: 108px;
        letter-spacing: 5px;
        margin-top: 32px;
      }
    }
  }

  /* 手机对比区 */
  .phone-wrapper {
    height: 100%;
    position: relative;
    width: 36.875vw;

    @include mo {
      width: 100%;
    }
    @include pad {
      width: 431px;
    }

    .phone-compare {
      position: absolute;
      width: 100%;
      height: 100%;
      min-width: 612px;

      @include mo {
        height: 62vh;
        bottom: 0;
      }
      @include pad {
        min-width: 331px;
      }

      .compare-img {
        object-fit: cover;
        position: absolute;
        left: 0;
        top: 2vh;
        width: 36.875vw;
        height: 57.22vw;

        @include mo {
          width: 100%;
          height: 571px;
        }
        @include pad {
          width: 431px;
          height: 678px;
        }
      }

      .compare-img-under {
        clip-path: inset(0% 100% 0% 0%);
      }
    }

    .clip-line-wrapper {
      height: 100%;
      // width: 1px;
      opacity: 0;

      .clip-line {
        position: relative;
        height: calc(100vh - 83px);
       // width: 1px;
        // background: #dbdbdb;

        @include pad {
          height: calc(100vh - 60px);
        }

        .clip-emoji {
          width: 58px;
          height: 58px;
          object-fit: cover;
          transform: rotate(295deg);
          position: absolute;
          top: -30px;
          left: -28px;

          @include mo {
            width: 36px;
            height: 36px;
            left: -17px;
            top: -30px;
          }
          @include pad {
            width: 50px;
            height: 50px;
          }
        }
      }
    }
  }

  /* 底部文字 */
  .bottom-text {
    position: fixed;
    bottom: 50px;
    right: 64px;
    width: 410px;
    font-size: 18px;
    line-height: 1.4;
    opacity: 0;

    @include mo {
      display: none;
    }
    @include pad {
      width: 170px;
      font-size: 12px;
      line-height: 17px;
      bottom: 27px;
      right: 35px;
    }

    .bt-strong {
      color: rgba(0, 0, 0, 0.95);
    }

    .bt-sub {
      color: rgba(0, 0, 0, 0.55);
    }
  }
}
</style>
