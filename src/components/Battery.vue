<!--
  7500mAh 冰川电池
  屏1(pin)：电池视觉(固定) + "7500mAh 超巨量冰川电池" 从下方滑上覆盖
  屏2(正常滚动)：容量对比 + 续航数据 + "超豪华充电组合" tips + 充电卡片
-->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
let ctx

const stats = [
  { value: '40.5', unit: '小时', label: '视频播放' },
  { value: '10.3', unit: '小时', label: '游戏畅玩' },
  { value: '22.8', unit: '小时', label: '刷短视频' },
  { value: '10.4', unit: '小时', label: '地图导航⁹' },
]

const chargingCards = [
  { icon: 'images-battery-logo1-pc-1-241113.png.webp', title: '100W 超级闪充', desc: '30 分钟充至 61%¹⁰' },
  { icon: 'images-battery-logo2-pc-1-943d7f.png.webp', title: '50W 无线闪充', desc: '随手一放，超速回血' },
  { icon: 'images-battery-logo3-pc-1-0d341e.png.webp', title: '全局旁路供电', desc: '插电直玩，不烫手' },
  { icon: 'images-battery-logo4-pc-1-28f31a.png.webp', title: '有线反充 + 无线反充', desc: '应急补电超轻松' },
]

const competitors = [
  { name: '小屏旗舰 A', width: 348, value: '7000mAh' },
  { name: '小屏旗舰 B', width: 307, value: '6300mAh' },
  { name: '小屏旗舰 C', width: 289, value: '6040mAh' },
]

const promax = [
  { name: '大屏 Pro Max 旗舰 A', width: 400, value: '7500mAh' },
  { name: '大屏 Pro Max 旗舰 B', width: 320, value: '6000mAh' },
  { name: '大屏 Pro Max 旗舰 C', width: 215, value: '4823mAh' },
]

onMounted(() => {
  ctx = gsap.context(() => {
    const emojiSqueeze = sectionRef.value.querySelector('.emoji-squeeze')
    const lightImg = sectionRef.value.querySelector('.light-layer')
    const discImg = sectionRef.value.querySelector('.disc-layer')
    const batterIntro = sectionRef.value.querySelector('.batter-intro')
    const tipsOverlay = sectionRef.value.querySelector('.tips-overlay')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
      },
    })

    // 1. split-char 逐字亮起
    tl.fromTo(
      emojiSqueeze.querySelectorAll('.split-char'),
      { opacity: 0.15 },
      { opacity: 1, duration: 0.4, stagger: 0.05, ease: 'none' }
    )
    // 2. 发光层淡入
    tl.fromTo(lightImg, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.25')
    // 3. disc 层淡入
    tl.fromTo(discImg, { opacity: 0 }, { opacity: 1, duration: 0.25 }, '-=0.15')
    // 4. emoji 文案随 batter-intro 上滑逐渐淡出
    tl.to(emojiSqueeze, { opacity: 0, duration: 0.4, ease: 'none' }, '-=0.2')
    // 5. batter-intro 从下方滑上来，覆盖电池图
    tl.fromTo(batterIntro, { y: '100vh' }, { y: 0, duration: 0.8, ease: 'none' }, '-=0.2')
    // 6. batter-intro 继续上滑，完全滑出屏幕（用元素自身高度确保底部也滚出）
    tl.to(batterIntro, { y: -batterIntro.offsetHeight, duration: 1.0, ease: 'none' })
    // 7. tips 文字淡入，出现在电池视觉中央
    tl.fromTo(tipsOverlay, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: 'none' }, '-=0.2')
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <!-- ====== 屏1：电池视觉 + 标题上滑（pin） ====== -->
  <section ref="sectionRef" class="battery-section">
    <!-- 电池视觉：始终固定 -->
    <div class="battery-visual">
      <div class="emoji-squeeze">
        <div class="line"><span class="split-char">小</span><span class="split-char">屏</span><span class="split-char">电</span><span class="split-char">池</span><span class="split-char">超</span><span class="split-char">巨</span><span class="split-char">量</span></div>
        <div class="line"><span class="split-char">电</span><span class="split-char">量</span><span class="split-char">巨</span><span class="split-char">扛</span><span class="split-char">用</span></div>
      </div>
      <div class="all-img">
        <img src="/assets/images/battery/images-battery-grey-battery-pc-1-1b4a8a.png.webp" alt="电池" class="battery-layer" />
        <img src="/assets/images/battery/images-battery-light-battery-pc-1-5a1683.png.webp" alt="发光" class="battery-layer light-layer" />
        <img src="/assets/images/battery/images-battery-three-battery-1-2c8437.png.webp" alt="disc" class="battery-layer disc-layer" />
      </div>
      <!-- tips-overlay：batter-intro 滑出后淡入，出现在电池视觉中央 -->
      <div class="tips-overlay">
        <div class="tips-overlay-inner">
          <p class="tips-overlay-main">超豪华充电组合<br />有线无线都闪充，<br />回血只要分分钟。</p>
          <p class="tips-overlay-sub">要快充有快充，要无线有无线，要反充有反充，<span>不管是在家里、办公室、车上，甚至在玩游戏，充电补电都特方便。</span></p>
        </div>
      </div>
    </div>

    <!-- batter-intro：从下方滑上来覆盖电池，包含 7500mAh → 容量对比 → 超长续航 -->
    <div class="batter-intro">
      <div class="intro-content">
        <h2 class="battery-title">7500mAh 超巨量冰川电池<br />从早用到晚，手机还有电。</h2>
        <img class="banner-img" src="/assets/images/battery/images-battery-banner-1-07bfd7.jpg.webp" alt="7500mAh 冰川电池" />
        <p class="battery-desc">
          <span class="desc-sub">7500mAh 超巨量冰川电池，超越市面其它小屏旗舰，跟大屏 Pro Max 旗舰比也毫不逊色。</span>
          <span class="desc-main">从早用到晚还有电，外出聚会、游玩更放心，更尽兴。</span>
        </p>
        <div class="divider"></div>

        <!-- 容量对比 -->
        <div class="comparison">
          <div class="comp-col">
            <h3 class="comp-title">电量超越其它小屏旗舰</h3>
            <div class="bar-item primary">
              <p class="bar-name">一加 15T</p>
              <div class="bar-row"><div class="bar color-bar"></div><span class="bar-val highlight">7500mAh</span></div>
            </div>
            <div v-for="c in competitors" :key="c.name" class="bar-item">
              <p class="bar-name secondary">{{ c.name }}</p>
              <div class="bar-row"><div class="bar grey-bar" :style="{ width: c.width + 'px' }"></div><span class="bar-val">{{ c.value }}</span></div>
            </div>
            <p class="comp-note">备注：6.32 英寸（含及以下）屏幕尺寸为主流小屏手机范畴。</p>
          </div>
          <div class="comp-col">
            <h3 class="comp-title">电量比肩大屏 Pro Max 旗舰</h3>
            <div class="bar-item primary">
              <p class="bar-name">一加 15T</p>
              <div class="bar-row"><div class="bar color-bar"></div><span class="bar-val highlight">7500mAh</span></div>
            </div>
            <div v-for="c in promax" :key="c.name" class="bar-item">
              <p class="bar-name secondary">{{ c.name }}</p>
              <div class="bar-row"><div class="bar grey-bar" :style="{ width: c.width + 'px' }"></div><span class="bar-val">{{ c.value }}</span></div>
            </div>
          </div>
        </div>

        <h3 class="endurance-title">超长续航，放心大胆用。</h3>
        <div class="stats-row">
          <div v-for="s in stats" :key="s.label" class="stat-item">
            <div class="stat-value-row"><span class="stat-num">{{ s.value }}</span><span class="stat-unit">{{ s.unit }}</span></div>
            <p class="stat-label">{{ s.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ====== 充电卡片 ====== -->
  <section class="charging-section">
    <div class="charging-inner">
      <div v-for="(card, i) in chargingCards" :key="i" class="charge-card">
        <img :src="`/assets/images/battery/${card.icon}`" :alt="card.title" class="charge-icon" />
        <p class="charge-title">{{ card.title }}</p>
        <p class="charge-desc">{{ card.desc }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
/* ============================================================
   屏1：GSAP pin 固定
   ============================================================ */
.battery-section {
  width: 100%;
  height: 100vh;
  background: $color-white;
  position: relative;
}

/* 电池视觉：始终固定不动 */
.battery-visual {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;

  .emoji-squeeze {
    text-align: center;
    font-size: 96px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: 0.5px;
    color: $color-black;
    padding-top: 12vh;
    @include mo { font-size: 48px; padding-top: 20vh; }
    .line { white-space: nowrap; }
    .split-char { opacity: 0.15; display: inline-block; }
  }

  .all-img {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
    padding-bottom: 5vh;

    .battery-layer {
      position: absolute;
      width: 974px;
      height: 522px;
      object-fit: cover;
      @include mo { width: 360px; height: 193px; }
      @include pad { width: 625px; height: 334px; }
    }
    .light-layer, .disc-layer { opacity: 0; }
    .disc-layer { z-index: 2; }
  }
}

/* batter-intro：从下方滑上来覆盖电池 */
.batter-intro {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: $color-white;
  z-index: 2;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.intro-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 64px 155px;
  @include mo { padding: 0 16px; }
  @include pad { padding: 35px 24px; }
}

.battery-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
  color: rgba(0, 0, 0, 0.95);
  @include mo { font-size: 28px; }
  @include pad { font-size: 26px; }
}

.banner-img {
  width: 1130px;
  height: 460px;
  object-fit: cover;
  margin-top: 36px;
  @include mo { width: 100vw; height: 100vw; margin-left: -16px; }
  @include pad { width: 720px; height: 460px; margin-top: 32px; }
}

.battery-desc {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.4;
  max-width: 712px;
  margin: 36px auto 0;
  @include mo { font-size: 16px; }
  @include pad { max-width: 568px; margin-top: 19px; }
  .desc-sub { color: rgba(0, 0, 0, 0.55); }
  .desc-main { color: rgba(0, 0, 0, 0.95); }
}

.divider {
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin-top: 36px;
  @include pad { margin-top: 32px; }
}

.comparison {
  display: flex;
  justify-content: space-between;
  @include mo { flex-direction: column; }
  .comp-col:first-child {
    margin-right: 83px;
    @include pad { margin-right: 45px; }
    @include mo { margin-right: 0; }
  }
  .comp-title {
    font-size: 32px;
    font-weight: 500;
    line-height: 1.4;
    color: $color-black;
    @include mo { font-size: 20px; margin-top: 52px; }
  }
}

.bar-item {
  margin-top: 20px;
  &.primary { margin-top: 24px; }
  .bar-name {
    font-size: 18px;
    line-height: 1.4;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.95);
    @include mo { font-size: 16px; }
    &.secondary {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.55);
      @include mo { font-size: 12px; }
    }
  }
  .bar-row {
    display: flex;
    align-items: center;
    margin-top: 4px;
    @include pad { margin-top: 2px; }
  }
  .bar {
    height: 12px;
    width: 400px;
    @include mo { height: 8px; width: 244px; }
    @include pad { height: 8px; width: 244px; }
    &.color-bar { background: #25b4d5; }
    &.grey-bar { background: rgba(0, 0, 0, 0.15); }
  }
  .bar-val {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.35);
    margin-left: 24.5px;
    @include mo { font-size: 12px; margin-left: 8px; }
    @include pad { margin-left: 16px; }
    &.highlight { font-size: 18px; color: #25b4d5; @include mo { font-size: 14px; } }
  }
}

.comp-note {
  font-size: 12px;
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.3);
  margin-top: 32px;
  @include pad { margin-top: 24px; }
}

.endurance-title {
  font-size: 32px;
  font-weight: 500;
  line-height: 1.4;
  color: $color-black;
  margin-top: 36px;
  padding-bottom: 18px;
 
  @include mo { font-size: 20px; margin-top: 32px; }
  @include pad { margin-top: 36px; }
}

.stats-row {
  display: flex;
   border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 18px;
  @include mo { flex-wrap: wrap; gap: 6px; margin-top: 24px; padding-bottom: 32px; }
  @include pad { margin-top: 24px; }
  .stat-item {
    flex: 1;
    @include mo { width: 151px; flex: none; }
    .stat-value-row {
      display: flex;
      align-items: flex-end;
      .stat-num { font-size: 36px; font-weight: 500; line-height: 1.2; color: rgba(0, 0, 0, 0.95); @include mo { font-size: 24px; } }
      .stat-unit { font-size: 24px; font-weight: 500; color: rgba(0, 0, 0, 0.95); margin-left: 9px; bottom: 6px; position: relative; @include mo { font-size: 16px; bottom: 4px; margin-left: 6px; } @include pad { bottom: 4px; margin-left: 6px; } }
    }
    .stat-label { font-size: 14px; font-weight: 500; line-height: 1.4; color: rgba(0, 0, 0, 0.55); margin-top: 8px; @include mo { font-size: 12px; margin-top: 4px; } @include pad { margin-top: 4px; } }
  }
}

/* tips-overlay：batter-intro 滑出后显示在电池视觉中央 */
.tips-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  opacity: 0;
  pointer-events: none;

  .tips-overlay-inner {
    position: relative;
    max-width: 1440px;
    width: 100%;
    height: 100%;
    padding: 0 64px;
    @include mo { padding: 0 16px; }
    @include pad { padding: 0 24px; }
  }

  .tips-overlay-main {
    position: absolute;
    top: 18%;
    left: 64px;
    font-size: 48px;
    font-weight: 500;
    line-height: 1.2;
    color: rgba(0, 0, 0, 0.95);
    @include mo { font-size: 28px; left: 16px; top: 10%; }
    @include pad { left: 24px; }
  }

  .tips-overlay-sub {
    position: absolute;
    bottom: 18%;
    right: 64px;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.95);
    width: 478px;
    text-align: right;
    @include mo { font-size: 16px; width: auto; right: 16px; bottom: 10%; }
    @include pad { width: 360px; right: 24px; }
    span { color: rgba(0, 0, 0, 0.3); }
  }
}

/* ============================================================
   充电卡片
   ============================================================ */
.charging-section {
  width: 100%;
  background: $color-white;
  .charging-inner {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    padding: 62px 64px 80px;
    @include mo { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; padding: 0 16px 80px; }
    @include pad { padding: 34px 24px 43px; }
  }
  .charge-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    @include mo { align-items: flex-start; }
    .charge-icon { width: 36px; height: 36px; @include mo { width: 28px; height: 28px; } @include pad { width: 28px; height: 28px; } }
    .charge-title { font-size: 24px; font-weight: 500; line-height: 1.2; color: rgba(0, 0, 0, 0.95); margin-top: 12px; @include mo { font-size: 18px; } }
    .charge-desc { font-size: 18px; font-weight: 400; line-height: 1.4; color: rgba(0, 0, 0, 0.55); margin-top: 4px; @include mo { font-size: 12px; } }
  }
}
</style>
