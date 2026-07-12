<!--
  LUMO凝光影像系统 — pin固定一屏内完整播放动画
  动效顺序: 标题消失 → 手机转正+放大(旅拍神器出现) → 手机右移(旅拍神器淡出+双摄参数出现) → frame铺满
-->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const videoRef = ref(null)
let ctx
let videoTrigger

onMounted(() => {
  ctx = gsap.context(() => {
    const wrap = sectionRef.value
    if (!wrap) return

    const emojiSqueeze = wrap.querySelector('.emoji-squeeze')
    const phoneImg = wrap.querySelector('.phone-img')
    const sellText = wrap.querySelector('.sell-text')
    const cameraSpecs = wrap.querySelector('.camera-specs')
    const specTele = wrap.querySelector('.spec-tele')
    const lineTop = wrap.querySelector('.line-top')
    const lineBottom = wrap.querySelector('.line-bottom')
    const frameBox = wrap.querySelector('.frame-box')
    const videoPoster = wrap.querySelector('.video-poster')

    // ──────────────────────────────
    //  📱 手机动画三态 → 改这里！
    // ══════════════════════════════
    // 原始基准放大2倍后
const phoneStart = { x: -960, y: 560, rotate: 42, scale: 1.488 }
const phoneMid   = { x: -750, y: 500, rotate: 0,  scale: 1.8   }
const phoneEnd   = { x: -360,   y: 500,    rotate: 0,  scale: 2.5   }

    // ──────────────────────────────

    gsap.set(phoneImg, phoneStart)
    gsap.set(sellText, { y: 30, opacity: 0 })
    gsap.set([cameraSpecs, lineTop, lineBottom], { opacity: 0 })
    gsap.set(specTele, { filter: 'blur(5px)' })
    gsap.set(frameBox, { x: 0, y: 0, scale: 0.22, opacity: 0 })
    gsap.set(videoPoster, { scale: 0.3, opacity: 0 })
    gsap.set(videoRef.value, { opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: '+=2500',
        scrub: 0.5,
        pin: true,
      },
    })

    // 标题淡出 (0-15%)
    tl.to(emojiSqueeze, { opacity: 0, y: -60, duration: 1.5, ease: 'power2.in' }, 0)

    // 动效一 (8-28%): 转正+放大
    tl.to(phoneImg, { ...phoneMid, duration: 2, ease: 'power2.inOut' }, 0.8)
    // 动效二 (28-48%): 向右+放大
    tl.to(phoneImg, { ...phoneEnd, duration: 2, ease: 'power2.inOut' }, 2.5)

    // 旅拍神器 — phoneMid 时淡入 (15-35%)
    tl.to(sellText, { opacity: 1, y: 0, duration: 2 }, 1.5)
    // 旅拍神器 — phoneEnd 时上滑淡出 (30-50%)
    tl.to(sellText, { opacity: 0, y: -50, duration: 2 }, 3)

    // 双摄参数 — phoneEnd 时出现 (30-55%)
    tl.to(cameraSpecs, { opacity: 1, duration: 2.5 }, 3)
    // 长焦去模糊 (35-60%)
    tl.to(specTele, { filter: 'blur(0px)', duration: 2.5 }, 3.5)

    // 标注线 (45-65%)
    tl.to([lineTop, lineBottom], { opacity: 1, duration: 2 }, 4)

    // frame 极小→铺满 (55-80%)
    tl.to(frameBox, { x: 0, y: 0, scale: 1, opacity: 1, duration: 2.5, ease: 'power2.inOut' }, 4.8)
    // video poster (60-85%)
    tl.to(videoPoster, { scale: 1, opacity: 1, duration: 2.5, ease: 'power2.out' }, 5.5)

    // 视频自动播：frame 铺满后 (~80%进度) 触发一次
    videoTrigger = ScrollTrigger.create({
      trigger: wrap,
      start: 'top -=2000',  // 虚拟 2500px 的 80%，frame 铺满后触发
      onEnter: () => {
        const vid = videoRef.value
        if (vid && vid.paused) {
          vid.play().then(() => {
            // crossfade: poster → video
            gsap.to(videoPoster, { opacity: 0, duration: 0.5 })
            gsap.to(vid, { opacity: 1, duration: 0.5 }, '<')
          }).catch(() => {})
        }
      },
      once: true,
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
  if (videoTrigger) videoTrigger.kill()
})
</script>

<template>
  <section ref="sectionRef" class="lumo-camera" id="section-camera">
    <div class="emoji-squeeze">
      <div class="title-line">
        <span class="split-char">L</span><span class="split-char">U</span><span class="split-char">M</span><span class="split-char">O</span><span class="split-char char-space">&nbsp;</span>
        <span class="split-char">凝</span><span class="split-char">光</span><span class="split-char">影</span><span class="split-char">像</span><span class="split-char">系</span><span class="split-char">统</span>
      </div>
      <div class="title-line">
        <span class="split-char">人</span><span class="split-char">景</span><span class="split-char">放</span><span class="split-char">大</span><span class="split-char">都</span><span class="split-char">清</span><span class="split-char">晰</span>
      </div>
    </div>

    <!-- 旅拍神器（phoneMid 淡入 → phoneEnd 上滑淡出），headline左 desc右 -->
    <div class="sell-text">
      <p class="sell-label">旅拍神器</p>
      <div class="sell-row">
        <h2 class="sell-headline">旅游打卡小神机<br />拍近拍远都出片</h2>
        <p class="sell-desc">
          这款小屏旗舰，搭载 OPPO 旗舰同款的 LUMO 凝光影像算法，
          <span class="desc-sub">拍景好看，拍人更美。有 LUMO 在手，大片就到手。</span>
        </p>
      </div>
    </div>

    <!-- 5000万像素双摄参数（phoneEnd 出现） -->
    <div class="camera-specs">
      <div class="spec-main">
        <p class="spec-name">5000 万像素索尼大底旗舰主摄</p>
        <p class="spec-detail">1/1.56 英寸大底｜24mm 等效焦距<br />f/1.8 超大圈｜OIS 光学防抖</p>
      </div>
      <div class="spec-tele">
        <p class="spec-name">5000 万像素 3.5 倍潜望长焦镜头</p>
        <p class="spec-detail">85mm 等效焦距｜3.5 倍光学潜望长焦<br />7 倍无损变焦｜OIS 光学防抖<sup>11</sup></p>
      </div>
    </div>

    <div class="content-main">
      <div class="phone-area">
        <img class="line line-top" src="/assets/images/phone-camera/images-phone-camera-line-top-1-522931.png.webp" alt="" />
        <img class="line line-bottom" src="/assets/images/phone-camera/images-phone-camera-line-bottom-1-753b99.png.webp" alt="" />
        <img
          class="phone-img"
          src="/assets/images/phone-camera/images-phone-camera-phone-pc-1-394651.png.webp"
          alt="一加 15T LUMO 凝光影像"
        />
      </div>
    </div>

    <div class="frame-box">
      <img class="corner corner-tl" src="/assets/images/phone-camera/images-phone-camera-angle-tl-1-28581d.png.webp" alt="" />
      <img class="corner corner-tr" src="/assets/images/phone-camera/images-phone-camera-angle-tr-1-5a0e81.png.webp" alt="" />
      <img class="corner corner-bl" src="/assets/images/phone-camera/images-phone-camera-angle-bl-1-a966bb.png.webp" alt="" />
      <img class="corner corner-br" src="/assets/images/phone-camera/images-phone-camera-angle-br-1-dcc3d4.png.webp" alt="" />
      <div class="video-area">
        <video
          ref="videoRef"
          class="camera-video"
          src="/assets/video01.mp4"
          muted
          playsinline
          preload="auto"
        ></video>
        <img
          class="video-poster"
          src="/assets/images/videos/videos-camera-camera_1350_poster-1-20b0b2.jpg.webp"
          alt="摄像头光学结构CG剖面渲染"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
// ═══════════════════════════════════════════════
//  🎯 位置参数 → 改这里！
// ═══════════════════════════════════════════════
// 旅拍神器（左上，phoneMid出现 → phoneEnd淡出）
$sell-top: 16%;
$sell-left: 64px;
$sell-right: 64px;
// 5000万像素双摄参数
$specs-top: 400px;
$specs-left: 344px;
// CG剖面渲染图 frame（初始定位在 specs 文字区域）
$frame-top: 400px;
$frame-left: 200px;
// 标注线（相对手机）
$line-left: -690px;
$line-width: 280px;
$line1-top: 250px;
$line2-top: 320px;
// Pad 断点
$pad-sell-top: 20%;
$pad-sell-left: 24px;
$pad-sell-right: 24px;
$pad-specs-top: 380px;
$pad-specs-left: 24px;
$pad-frame-top: 380px;
$pad-frame-left: 24px;
$pad-line-left: -270px;
$pad-line-width: 160px;
$pad-line1-top: 100px;
$pad-line2-top: 180px;
// ═══════════════════════════════════════════════

.lumo-camera {
  width: 100%;
  height: 100vh;
  background: $color-bg-tertiary;
  overflow: hidden;
  position: relative;
}

.emoji-squeeze {
  position: absolute;
  top: 14%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 96px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.5px;
  color: $color-black;
  white-space: nowrap;
  z-index: 5;

  @include pad { font-size: 48px; top: 12%; }
  @include mo { font-size: 32px; top: 8%; }

  .split-char { display: inline-block; opacity: 0.15; }
  .char-space { width: 0.3em; }
}

.content-main {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

// ── 旅拍神器（全宽 flex，headline左 desc右）──
.sell-text {
  position: absolute;
  left: $sell-left;
  right: $sell-right;
  top: $sell-top;
  z-index: 2;
  @include pad { left: $pad-sell-left; right: $pad-sell-right; top: $pad-sell-top; }
  @include mo { left: 16px; right: 16px; top: 10%; }

  .sell-label {
    font-size: 36px; font-weight: 500; line-height: 1.2; color: rgba(0, 0, 0, 0.95); margin-bottom: 11px;
    @include pad { font-size: 24px; margin-bottom: 8px; } @include mo { font-size: 20px; }
  }

  .sell-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    @include mo { flex-direction: column; }
  }

  .sell-headline {
    font-size: 64px; font-weight: 500; line-height: 1.2; color: rgba(0, 0, 0, 0.95);
    @include pad { font-size: 38px; } @include mo { font-size: 24px; }
  }

  .sell-desc {
    font-size: 18px; font-weight: 500; line-height: 1.4; color: rgba(0, 0, 0, 0.95); max-width: 423px;
    @include pad { max-width: 300px; font-size: 16px; } @include mo { font-size: 14px; max-width: none; margin-top: 12px; }
    .desc-sub { color: rgba(0, 0, 0, 0.55); }
  }
}

// ── 5000万像素双摄参数（phoneEnd出现）──
.camera-specs {
  position: absolute;
  left: $specs-left;
  top: $specs-top;
  z-index: 2;
  @include pad { left: $pad-specs-left; top: $pad-specs-top; }
  @include mo { left: 16px; right: 16px; top: auto; bottom: 16px; text-align: center; }

  .spec-main { margin-bottom: 60px; @include pad { margin-bottom: 32px; } @include mo { margin-bottom: 20px; } }

  .spec-name {
    font-size: 24px; font-weight: 500; line-height: 1.2; letter-spacing: -0.5px;
    color: rgba(0, 0, 0, 0.95); white-space: nowrap;
    @include mo { font-size: 15px; } @include pad { font-size: 16px; }
  }

  .spec-detail {
    font-size: 14px; font-weight: 500; line-height: 1.4; color: rgba(0, 0, 0, 0.55); margin-top: 8px;
    @include pad { font-size: 12px; margin-top: 6px; } @include mo { font-size: 12px; }
  }

  .spec-tele { filter: blur(5px); }
}

// 标注线
.line {
  position: absolute;
  left: $line-left; width: $line-width; height: auto; z-index: 5; object-fit: contain;
  @include pad { width: $pad-line-width; left: $pad-line-left; }
  @include mo { display: none; }
  &.line-top { top: $line1-top; @include pad { top: $pad-line1-top; } }
  &.line-bottom { top: $line2-top; @include pad { top: $pad-line2-top; } }
}

.phone-area {
  position: absolute;
  right: 0; top: 50%; transform: translateY(-50%);
  @include pad { right: 0; top: 50%; }
  @include mo { right: 0; top: auto; bottom: 40%; transform: none; }
  .phone-img {
    display: block; width: auto; height: 62vh; max-height: 750px; object-fit: contain;
    @include mo { height: 42vh; max-height: 380px; } @include pad { height: 52vh; max-height: 550px; }
  }
}

// ── CG剖面渲染图（定位在 specs 文字区域，由小变大铺满）──
.frame-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform-origin: left top;
  z-index: 10;
  pointer-events: none;
  @include mo { display: none; }

  .corner {
    position: absolute; width: 18px; height: 18px; object-fit: contain; z-index: 2;
    @include pad { width: 10px; height: 10px; }
  }
  .corner-tl { top: 0; left: 0; }
  .corner-tr { top: 0; right: 0; }
  .corner-bl { bottom: 0; left: 0; }
  .corner-br { bottom: 0; right: 0; }

  .video-area {
    position: absolute;
    top: 18px; left: 18px; right: 18px; bottom: 18px; overflow: hidden;
    @include pad { top: 10px; left: 10px; right: 10px; bottom: 10px; }
    .camera-video {
      position: absolute; top: 0; left: 0;
      width: 100%; height: 100%; object-fit: cover;
    }
    .video-poster {
      position: relative; z-index: 1;
      width: 100%; height: 100%; object-fit: cover;
    }
  }
}
</style>
