# 一加 15T 产品页复刻 V2 — 影像+屏幕章节细化

> **日期：** 2026-07-12
> **基于：** `docs/superpowers/plans/2026-07-11-oneplus-15t-replication.md`
> **变更：** 影像和屏幕章节从各1个组件拆分为真实分屏粒度（影像5屏 + 屏幕6屏），前面总览/设计/续航保持不变

---

## 变更说明

原计划中影像章节只拆了 1 个组件（LUMOCamera），屏幕章节只拆了 1 个组件（DisplayScreen），但原页面实际是：

- **影像章节 5 个分屏**：LUMO凝光影像系统 → 样张展示横滑 → 大师影像/经典宽幅 → 实况照片 → AI实用好功能
- **屏幕章节 6 个分屏**：小屏显示出色 → 屏幕参数 → 真硬件1nit → 明眸护眼 → 熄灯也护眼 → 全面大升级

每个分屏有独立的 sticky/scroll 容器和 GSAP 动画逻辑，必须拆为独立组件。

---

## 全局约束（继承自原计划）

- Node.js 版本：22.12.10
- 构建工具：Vite + Vue3
- 样式：SCSS scoped，不使用 Tailwind
- 动画：GSAP + ScrollTrigger
- 响应式断点：1920px / 1024px / 390px
- 素材来源：D:\test\_files\ 中的官方图片，不允许占位图
- 禁止：v-html / innerHTML / iframe 嵌入原站 HTML
- 每个组件开头需 1-2 行注释说明该组件用途
- 每个组件完成后 git commit

---

## 更新后的 File Structure

```
源码/
├── src/
│   ├── components/
│   │   ├── SiteHeader.vue           # Task 1  [不变]
│   │   ├── ProductNav.vue           # Task 2  [不变]
│   │   ├── HeroSection.vue          # Task 3  [不变]
│   │   ├── DesignColor.vue          # Task 4  [不变]
│   │   ├── NarrowBezel.vue          # Task 5  [不变]
│   │   ├── SmallScreen.vue          # Task 6  [不变]
│   │   ├── Appearance.vue           # Task 7  [不变]
│   │   ├── Battery.vue              # Task 8  [不变]
│   │   │
│   │   ├── LUMOCamera.vue           # Task 9  [重写] 影像分屏1
│   │   ├── CameraSamples.vue        # Task 10 [新增] 影像分屏2
│   │   ├── MasterPortrait.vue       # Task 11 [新增] 影像分屏3
│   │   ├── LivePhoto.vue            # Task 12 [新增] 影像分屏4
│   │   ├── AIFeatures.vue           # Task 13 [新增] 影像分屏5
│   │   │
│   │   ├── RotatingScreen.vue       # Task 14 [新增] 屏幕分屏1
│   │   ├── ScreenParams.vue         # Task 15 [新增] 屏幕分屏2
│   │   ├── DarkNightDisplay.vue     # Task 16 [新增] 屏幕分屏3
│   │   ├── EyeProtection.vue        # Task 17 [新增] 屏幕分屏4
│   │   ├── DimLightEye.vue          # Task 18 [新增] 屏幕分屏5
│   │   ├── MoreFeatures.vue         # Task 19 [新增] 屏幕分屏6
│   │   │
│   │   ├── NotesFooter.vue          # Task 20 [不变]
│   │   └── SiteFooter.vue           # Task 21 [不变]
│   │
│   ├── composables/
│   │   ├── useScrollAnimation.js
│   │   └── useStickyNav.js
│   └── ...
```

---

## App.vue 更新后的组装顺序

```vue
<template>
  <div id="app">
    <SiteHeader />
    <ProductNav />
    <main>
      <!-- 总览 -->
      <div id="section-kv"><HeroSection /></div>

      <!-- 设计 -->
      <div id="section-color"><DesignColor /></div>
      <NarrowBezel />
      <SmallScreen />
      <Appearance />

      <!-- 续航 -->
      <div id="section-battery"><Battery /></div>

      <!-- 影像 (5屏) -->
      <div id="section-camera"><LUMOCamera /></div>
      <div id="section-picture"><CameraSamples /></div>
      <div id="section-telephoto"><MasterPortrait /></div>
      <div id="section-livephoto"><LivePhoto /></div>
      <div id="section-feature"><AIFeatures /></div>

      <!-- 屏幕 (6屏) -->
      <div id="rotating-screen"><RotatingScreen /></div>
      <div id="parameter"><ScreenParams /></div>
      <div id="section-hu"><DarkNightDisplay /></div>
      <div id="section-eyes"><EyeProtection /></div>
      <div id="section-light"><DimLightEye /></div>
      <div id="section-points"><MoreFeatures /></div>
    </main>
    <NotesFooter />
    <SiteFooter />
  </div>
</template>
```

---

## ProductNav 锚点更新

```javascript
const navItems = [
  { id: 'section-kv', label: '总览' },
  { id: 'section-color', label: '设计' },
  { id: 'section-battery', label: '续航' },
  { id: 'section-camera', label: '影像' },
  { id: 'rotating-screen', label: '屏幕' },
]
```

---

# ============ 以下为新增/重写的任务 ============

---

## Task 9: LUMOCamera — 影像分屏1：LUMO凝光影像系统

**Files:**
- Rewrite: `src/components/LUMOCamera.vue`

**说明：** 影像章节第一屏。96px 大字标题 "LUMO 凝光影像系统 人景放大都清晰"，sticky 滚动驱动手机图从右侧飞入 + 旋转 + 缩放动画，双摄参数逐行显示，底部"旅拍神器"文案淡入。sticky 容器高度 500vh。

**原页面结构：**
- `#section-camera` 灰色背景 #F5F5F5
- 96px 大字标题逐字 opacity 动画
- sticky-container 高度 500vh
- 手机图从右上角 translate(-520px, -200px) rotate(42deg) scale(0.744) → 归位
- 相机标注线 + 参数文字 opacity 0→1
- 四角边框 + 视频区域 scale 放大
- 底部 "旅拍神器" + "旅游打卡小神机" 文案

**素材需求：**
- `images-phone-camera-phone-pc-1-394651.png.webp` (手机产品图 PC)
- `images-phone-camera-phone-pad-1-7bfe54.png.webp` (Pad)
- `images-phone-camera-phone-mo-1-e00cd7.png.webp` (Mo)
- `images-phone-camera-line-top-1-522931.png.webp` (标注线)
- `images-phone-camera-line-bottom-1-753b99.png.webp`
- `images-phone-camera-angle-*.png.webp` (四角边框)
- `videos-camera-camera_1350_poster-1-20b0b2.jpg.webp` (视频 poster)

**实现要点：**

```vue
<!-- LUMO凝光影像系统：sticky滚动驱动手机动画 + 双摄参数 + 旅拍神器文案 -->
<template>
  <section class="lumo-camera" id="section-camera">
    <div class="camera-inner">
      <!-- 大字标题 -->
      <div class="emoji-squeeze" ref="titleRef">
        <div class="title-line">LUMO 凝光影像系统</div>
        <div class="title-line">人景放大都清晰</div>
      </div>

      <!-- Sticky 滚动动画容器 -->
      <div class="sticky-container" ref="stickyContainer">
        <div class="sticky-viewport">
          <div class="sticky-content">
            <!-- 手机产品图 + 标注 -->
            <div class="phone-display" ref="phoneDisplay">
              <div class="phone-img-wrapper">
                <img :src="phoneImg" class="phone-img" ref="phoneImg" />
                <!-- 相机标注参数 -->
                <div class="camera-specs" ref="cameraSpecs">
                  <div class="spec-main">
                    <p class="spec-name">5000 万像素索尼大底旗舰主摄</p>
                    <p class="spec-detail">1/1.56 英寸大底｜24mm 等效焦距<br />f/1.8 超大圈｜OIS 光学防抖</p>
                  </div>
                  <div class="spec-tele">
                    <p class="spec-name">5000 万像素 3.5 倍潜望长焦镜头</p>
                    <p class="spec-detail">85mm 等效焦距｜3.5 倍光学潜望长焦<br />7 倍无损变焦｜OIS 光学防抖<sup>11</sup></p>
                  </div>
                </div>
                <!-- 四角边框 + 视频区域 -->
                <div class="frame-corners" ref="frameCorners">
                  <!-- 4个角标 + 视频poster -->
                </div>
              </div>
            </div>

            <!-- 旅拍神器 文案 -->
            <div class="sell-text" ref="sellText">
              <p class="sell-label">旅拍神器</p>
              <h2 class="sell-headline">旅游打卡小神机<br />拍近拍远都出片</h2>
              <p class="sell-desc">
                这款小屏旗舰，搭载 OPPO 旗舰同款的 LUMO 凝光影像算法，
                <span class="desc-sub">拍景好看，拍人更美。有 LUMO 在手，大片就到手。</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

**GSAP 动画逻辑：**
1. ScrollTrigger: sticky-container 500vh 滚动区间
2. 手机图：translate(-520px, -200px) rotate(42deg) scale(0.744) → (0, 0, 0, 1)
3. 相机标注参数：opacity 0→1，长焦参数先模糊后清晰
4. 四角边框 + 视频区域：scale(0.22, 0.14) → scale(1, 1)
5. 标注线 opacity 0→1
6. 旅拍神器文案 opacity 0→1

- [ ] **Step 1:** 从 D:\test\_files 复制素材到 public/assets/images/camera/
- [ ] **Step 2:** 创建组件 HTML/CSS 静态结构
- [ ] **Step 3:** 实现 GSAP ScrollTrigger 滚动动画
- [ ] **Step 4:** 三档响应式适配
- [ ] **Step 5:** Commit

---

## Task 10: CameraSamples — 影像分屏2：样张展示横滑

**Files:**
- Create: `src/components/CameraSamples.vue`

**说明：** 白色背景，水平滑动两组样张对比。组1：LUMO X 3.5倍潜望长焦人像样张（2张），组2：拍风景样张（2张）。有横滑切换交互。

**原页面结构：**
- `#section-picture` 白色背景
- `.row-wrapper` flex 横排两组 `.item`
- 每组包含左侧文案 + 右侧2张样张图
- 横滑切换（CSS transform translateX）

**素材需求：**
- `images-picture-1-1-pc-1-90ef37.jpg.webp` (人像样张1)
- `images-picture-1-2-pc-1-628ef1.jpg.webp` (人像样张2)
- `images-picture-2-1-pc-1-017db9.jpg.webp` (风景样张1)
- `images-picture-2-2-pc-1-a9aadd.jpg.webp` (风景样张2)

**实现要点：**
- 2组对比，每组宽度 846rpx
- 左侧文案（32px标题 + 18px描述）
- 右侧2张竖图（294x388px）
- GSAP ScrollTrigger 驱动横滑或手动拖拽切换

- [ ] **Step 1:** 复制素材
- [ ] **Step 2:** 创建组件静态结构（两组横排）
- [ ] **Step 3:** 实现横滑切换交互
- [ ] **Step 4:** 响应式适配
- [ ] **Step 5:** Commit

---

## Task 11: MasterPortrait — 影像分屏3：大师影像/经典宽幅模式

**Files:**
- Create: `src/components/MasterPortrait.vue`

**说明：** 灰色背景 #FAFAFA，sticky 容器高度 250vh。两层叠加：portrait1 "大师影像" + portrait2 "经典宽幅模式"。滚动时通过 clip-path inset 控制第二屏从下往上揭开。

**原页面结构：**
- `#section-telephoto` 灰色背景
- sticky-container 高度 250vh
- 两层 absolute 叠加
- portrait1 (z-2): 左侧 "大师影像" 标题 + 右侧样张1
- portrait2 (z-1): 左侧 "经典宽幅模式" 标题 + 右侧宽幅样张2
- portrait2 初始 `clip-path: inset(93.1% 0px 0px)` → inset(0% 0px 0px)
- portrait1 初始 opacity: 0.5

**素材需求：**
- `images-telephoto-sample-photo1-1-c3e26a.jpg.webp` (大师影像样张)
- `images-telephoto-sample-photo2-1-036647.jpg.webp` (宽幅样张)

**GSAP 动画逻辑：**
1. ScrollTrigger: sticky-container 250vh
2. portrait2 clip-path: inset(93.1% 0 0) → inset(0% 0 0)
3. portrait1 opacity: 0.5 → 1

- [ ] **Step 1:** 复制素材
- [ ] **Step 2:** 创建两层叠加静态结构
- [ ] **Step 3:** 实现 clip-path ScrollTrigger 动画
- [ ] **Step 4:** 响应式
- [ ] **Step 5:** Commit

---

## Task 12: LivePhoto — 影像分屏4：实况照片

**Files:**
- Create: `src/components/LivePhoto.vue`

**说明：** 白色背景，左右分栏布局（各50%）。左侧固定包含两组内容：上"胶片风格" + 下"旗舰无影抓拍"。右侧随滚动上移，包含 "4K超清实况" + 视频播放器。

**原页面结构：**
- `#section-livephoto` 白色背景
- 左右各50% + 中间1px分割线
- 左侧上半：胶片风格(32px标题 + 样张)
- 左侧下半：旗舰无影抓拍(32px标题 + 样张)
- 右侧：4K超清实况(32px标题 + video播放器)，滚动上移 translateY

**素材需求：**
- `images-livephoto-live3-1-e78cc4.jpg.webp` (胶片风格样张)
- `images-livephoto-live4-1-2a8ad3.jpg.webp` (无影抓拍样张)
- `images-livephoto-4k_1440_poster-1-e56705.jpg.webp` (4K video poster)
- `images-livephoto-liveLogo-1-4d69e6.png.webp` (实况logo)

**GSAP 动画逻辑：**
1. ScrollTrigger: section-livephoto 进入
2. 右侧容器 translateY(393px → 0px)

- [ ] **Step 1:** 复制素材
- [ ] **Step 2:** 创建左右分栏静态结构
- [ ] **Step 3:** 实现右侧滚动上移动画
- [ ] **Step 4:** 响应式
- [ ] **Step 5:** Commit

---

## Task 13: AIFeatures — 影像分屏5：AI 实用好功能

**Files:**
- Create: `src/components/AIFeatures.vue`

**说明：** 白色背景，48px 标题 "AI 实用好功能"。左侧4组样张对比图（before/after）叠层切换，右侧4个AI功能详情卡片列表。点击卡片切换左侧对应对比图。

**原页面结构：**
- `#section-feature` 白色背景
- 标题 "AI 实用好功能"
- 左右分栏：左侧样张对比图区，右侧详情卡片列表
- 4组叠层图片，通过 .show class 控制显示/隐藏
- 4个详情卡片（文本+分割线），首项默认展开 .active

**AI 功能列表：**
| 序号 | 功能 | 描述 |
|------|------|------|
| 1 | AI 人像补光 | 出门自带反光板，美丽随时在线。 |
| 2 | AI 去反光 | 隔窗拍照不怕光，轻松留住"美"一面。 |
| 3 | AI 消除 | 自动识别路人，不用圈选超方便。 |
| 4 | AI 超清合影 | 人人都清晰，留影不留遗憾。 |

**素材需求：**
- `images-aifeature-fill-light1-1-80a37b.jpg.webp` + `fill-light2` (人像补光对比)
- `images-aifeature-remove-reflec1-1-ec819e.jpg.webp` + `remove-reflec2` (去反光对比)
- `images-aifeature-remove-back1-1-e0e1d7.jpg.webp` + `remove-back2` (消除对比)
- `images-aifeature-high-resolution1-1-0fc6d2.jpg` + `high-resolution2` (超清合影对比)

**交互逻辑：**
- 点击右侧卡片 → 对应左侧样张组 .show 显示
- 卡片有 .active 态，展开详情
- 带分隔线

- [ ] **Step 1:** 复制素材
- [ ] **Step 2:** 创建左右分栏静态结构 + 卡片列表
- [ ] **Step 3:** 实现卡片点击切换 + 左侧图切换
- [ ] **Step 4:** 响应式
- [ ] **Step 5:** Commit

---

## Task 14: RotatingScreen — 屏幕分屏1：小屏显示出色

**Files:**
- Create: `src/components/RotatingScreen.vue`

**说明：** 屏幕章节第一屏。96px 大字 "小屏显示出色 流畅通透更护眼"，sticky 滚动驱动手机从倾斜旋转到正面，大字"165Hz 旗舰小直屏"横移入场，底部文案淡入。sticky 容器高度 calc(100vh+2000px)。

**原页面结构：**
- `#rotating-screen` + `#section-demo` 白色背景
- 96px 大字标题逐字动画
- sticky-container 高度 calc(100vh+2000px)
- 手机图初始 rotate(-5deg) translate(0, 34px) → rotate(0deg) translate(0, 0)
- 阴影手机图 opacity 0→1
- 大字 "165Hz 旗舰小直屏" translateX(1707px→0)
- 底部 "巨流畅，巨通透，巨护眼" 淡入

**素材需求：**
- `images-rotating-screen-phone-1-4fcffe.png.webp` (手机正面)
- `images-rotating-screen-phone-yin-1-c9f7f4.png.webp` (手机阴影)

**GSAP 动画逻辑：**
1. ScrollTrigger: sticky-container
2. 手机 rotate: -5deg → 0deg, translateY: 34px → 0px
3. 阴影手机 opacity: 0 → 1
4. 大字 translateX: 1707px → 0px
5. 底部文案 opacity: 0 → 1

- [ ] **Step 1:** 复制素材
- [ ] **Step 2:** 创建静态结构（标题+手机+大字+底部文案）
- [ ] **Step 3:** 实现 GSAP ScrollTrigger 动画
- [ ] **Step 4:** 响应式
- [ ] **Step 5:** Commit

---

## Task 15: ScreenParams — 屏幕分屏2：屏幕参数

**Files:**
- Create: `src/components/ScreenParams.vue`

**说明：** 白色背景，顶部描述文案，三行参数网格展示屏幕规格。

**原页面结构：**
- `#parameter` 白色背景
- 顶部居中描述文案
- 第一行4列标签卡片：高刷新率/联合研发/暗夜显示/舒适护眼（带绿色边框标签）
- 第二行5列数值：6.32"/165Hz/3600nits/全新旗舰发光材料/Display P3
- 第三行4列：自研显示科学产线/太阳显示/手套触控/雨水触控2.0
- 底部认证图标条

**参数数据：**

| 标签 | 值 | 描述 |
|------|-----|------|
| 高刷新率 | 165Hz 极速高刷 | 游戏体验巨流畅 |
| 联合研发 | 全新旗舰发光材料 | 显示巨通透，巨准确 |
| 暗夜显示 | 真硬件 1nit | 暗夜清晰不刺眼 |
| 舒适护眼 | 护眼「小金标」 | 白天晚上都护眼 |

| 参数 | 说明 |
|------|------|
| 6.32 英寸 | 旗舰小直屏 |
| 165Hz | 电竞级高刷 |
| 3600nits | 25% APL 亮度 |
| 全新旗舰 | 发光材料 |
| Display P3 | 自研屏幕显示芯片 |
| 自研显示科学产线 | 色彩更均匀准确 |
| 太阳显示 | 强光下超清晰 |
| 手套触控 | 戴手套轻松操控 |
| 雨水触控 2.0 | 屏幕沾水，触控也灵 |

- [ ] **Step 1:** 创建参数网格静态结构
- [ ] **Step 2:** 样式实现（绿色标签 + 数值网格 + 分割线）
- [ ] **Step 3:** 响应式
- [ ] **Step 4:** Commit

---

## Task 16: DarkNightDisplay — 屏幕分屏3：真硬件1nit暗夜显示

**Files:**
- Create: `src/components/DarkNightDisplay.vue`

**说明：** 暗色背景图上的白色文案展示。标题 "真硬件 1nit 暗夜显示 夜里看手机，清晰不刺眼。"，静态展示，无复杂动画。

**原页面结构：**
- `#section-hu` 暗色背景图叠加
- 文字居中叠加在背景上
- 48px 标题 + 18px 描述（白色半透明）

**素材需求：**
- `images-eyes-pc-bg-1-14ab62.png` (暗光背景 PC)
- `images-eyes-pad-bg-1-98a7b7.png` (Pad)

- [ ] **Step 1:** 复制素材
- [ ] **Step 2:** 创建背景图+文案叠加结构
- [ ] **Step 3:** 响应式
- [ ] **Step 4:** Commit

---

## Task 17: EyeProtection — 屏幕分屏4：明眸护眼

**Files:**
- Create: `src/components/EyeProtection.vue`

**说明：** 黑色背景 + 人眼视觉大图（视差滚动 parallax），标题 "全新一代「明眸护眼」 小屏护眼，认准「小金标」"，底部毛玻璃白色面板展示7个护眼技术标签。

**原页面结构：**
- `#section-eyes` 黑色背景
- 大图做 parallax 滚动
- 顶部标题 + 小金标 icon
- 底部白色毛玻璃面板 `backdrop-filter: blur`
- 4+3 标签网格

**护眼技术标签：**
- 第一行4个：AI 色彩增强 / AI 眨眼提示 / AI 距离提示 / 晕车舒缓
- 第二行3个：降低白点值 / 舒适色温 3.0 / 节律健康 3.0
- 面板上方 "医显共研，自然光护眼" 标题

**素材需求：**
- `images-eyes-3071_1021-1-8f2e7b.png.webp` (人眼大图)
- `images-eyes-3071_1031-1-f7e788.png.webp` (小金标)
- `images-eyes-3071_1034-1-b1451f.png.webp` (图标条)

**GSAP 动画逻辑：**
1. 背景大图 parallax（轻微translateY）
2. 底部毛玻璃面板 fade-in

- [ ] **Step 1:** 复制素材
- [ ] **Step 2:** 创建静态结构（背景+标题+面板+标签）
- [ ] **Step 3:** 实现 parallax + fade-in 动画
- [ ] **Step 4:** 响应式
- [ ] **Step 5:** Commit

---

## Task 18: DimLightEye — 屏幕分屏5：熄灯也护眼

**Files:**
- Rewrite: `src/components/DimLightEye.vue`

**说明：** 这就是原计划 Task 8 DisplayScreen 的内容，现在作为屏幕章节第5屏。左右50/50分栏：左侧灰色背景标题+三参数，右侧暗光场景图。**这个组件目前已有 DisplayScreen.vue，需要重命名/重构。**

**注意：** 由于原 DisplayScreen.vue 已经存在，此 Task 实际上是将 DisplayScreen.vue 的内容迁移到 DimLightEye.vue，然后删除 DisplayScreen.vue。

- [ ] **Step 1:** 从 DisplayScreen.vue 复制内容到 DimLightEye.vue
- [ ] **Step 2:** 修改 section id 为 #section-light
- [ ] **Step 3:** 更新 App.vue 中的引用
- [ ] **Step 4:** 删除 DisplayScreen.vue
- [ ] **Step 5:** Commit

---

## Task 19: MoreFeatures — 屏幕分屏6：全面大升级

**Files:**
- Create: `src/components/MoreFeatures.vue`

**说明：** 白色背景，96px 大字 "全面大升级 全部超好用"，sticky 滚动驱动6张功能卡片水平滑动，底部进度条指示位置。

**原页面结构：**
- `#section-points` 白色背景
- 大字标题逐字显示
- sticky-container 高度 600vh
- 卡片横滑：transform translateX
- 底部进度条 + slider

**6张功能卡片：**
| 序号 | 标题 | 描述 |
|------|------|------|
| 1 | 3D 超声波指纹 | 指纹解锁超迅速，湿手油手也秒开。 |
| 2 | IP66/68/69/69K 满级防尘防水 | 满级防水更安心，玩水嬉戏超自在。 |
| 3 | 超耐用「晶盾玻璃」 | 不贴膜也耐刮，无惧生活小磨擦。 |
| 4 | 立体声双扬声器 | 听歌、追剧、游戏，好音质，更沉浸。 |
| 5 | 多功能 NFC | 坐地铁搭公交，手机一刷就过特方便。 |
| 6 | 红外遥控 | 手机就是遥控器，再也不用到处找。 |

**素材需求：**
- `images-more-points-shoumo-1-65ce27.png.webp` (3D超声波指纹图)
- `images-more-points-pic2-1-4b33d9.jpg.webp` (防水)
- `images-more-points-pic3-1-9dc118.jpg` (晶盾玻璃)
- `images-more-points-pic4-1-50c298.jpg.webp` (双扬声器)
- `images-more-points-pic5-1-1140be.jpg.webp` (NFC)
- `images-more-points-pic6-1-05f232.jpg` (红外遥控)

**GSAP 动画逻辑：**
1. ScrollTrigger: sticky-container 600vh
2. 卡片容器 translateX: 0 → (5 * 卡片宽度)
3. 进度条 slider translateX: 0 → 275px
4. 每张卡片的 all-card opacity 0→1 依次

- [ ] **Step 1:** 复制素材
- [ ] **Step 2:** 创建静态结构（标题 + 卡片横排 + 进度条）
- [ ] **Step 3:** 实现 GSAP ScrollTrigger 横滑动画
- [ ] **Step 4:** 响应式
- [ ] **Step 5:** Commit

---

# ============ 以下为不变任务（重新编号） ============

## Task 20: NotesFooter — 备注条款

> **不变，同原计划 Task 12**

## Task 21: SiteFooter — 页脚

> **不变，同原计划 Task 13**

---

## Task 22: 响应式验证与构建

> **不变，同原计划 Task 14**，但验证范围扩大到所有新旧组件

---

## Task 23: GSAP 动画与交互

**说明：** 原计划 Task 15 的 GSAP 动画逻辑需要更新，因为现在动画已经在各组件内部单独实现了。此 Task 改为：
1. 使用 `useScrollAnimation.js` 为简单模块（无 sticky 的）添加通用淡入动画
2. 检查所有动画的协调性
3. 性能优化

---

## Task 24: README 与最终交付

> **不变，同原计划 Task 16**

---

# ============ 汇总 ============

## 组件变更对照表

| 原计划组件 | 新计划 | 变更 |
|-----------|--------|------|
| SiteHeader | SiteHeader | 不变 |
| ProductNav | ProductNav | 更新锚点为5项 |
| HeroSection | HeroSection | 不变 |
| DesignColor | DesignColor | 不变 |
| NarrowBezel | NarrowBezel | 不变 |
| SmallScreen | SmallScreen | 不变 |
| Appearance | Appearance | 不变 |
| Battery | Battery | 不变 |
| LUMOCamera | LUMOCamera | **重写** — 增加 sticky 手机动画 |
| — | CameraSamples | **新增** — 样张横滑 |
| — | MasterPortrait | **新增** — 大师影像/宽幅 |
| — | LivePhoto | **新增** — 实况照片 |
| Durability | AIFeatures | **重写** — AI功能（从"耐用"改为"影像"章节） |
| DisplayScreen | RotatingScreen | **新增** — 手机旋转屏 |
| — | ScreenParams | **新增** — 屏幕参数 |
| — | DarkNightDisplay | **新增** — 1nit暗夜 |
| — | EyeProtection | **新增** — 明眸护眼 |
| — | DimLightEye | **新增** — 取代原 DisplayScreen |
| — | MoreFeatures | **新增** — 全面大升级 |
| NotesFooter | NotesFooter | 不变 |
| SiteFooter | SiteFooter | 不变 |

**原计划 13 个组件 → 新计划 21 个组件（+8 新增）**

## 素材整理

需要从 `D:\test\一加 15T 又小又强又美又全面_files\` 复制到 `public/assets/images/` 的新素材：

```
camera/     — 影像相关 (phone-camera-*, picture-*, telephoto-*, livephoto-*, aifeature-*)
screen/     — 屏幕相关 (rotating-screen-*, eyes-*, dim-light-*, more-points-*)
```
