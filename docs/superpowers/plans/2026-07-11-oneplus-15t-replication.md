# 一加 15T 产品页复刻 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 使用 Vue3 + Vite 复刻一加 15T 官方产品页（精简版，不含性能和系统栏目）

**Architecture:** Vue3 Composition API 组件化架构，SCSS scoped 样式，GSAP ScrollTrigger 驱动滚动动画。每个页面模块拆为独立组件，按屏依次渲染。

**Tech Stack:** Vue3, Vite, SCSS, GSAP + ScrollTrigger, Node.js 22.12.10

## Global Constraints

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

## File Structure

```
源码/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
│   └── assets/images/          # 从 D:\test\_files 复制的图片
├── src/
│   ├── main.js
│   ├── App.vue                 # 根组件，组装所有 section
│   ├── styles/
│   │   ├── variables.scss      # 颜色、字号、间距、断点变量
│   │   ├── mixins.scss         # 响应式 mixin
│   │   └── global.scss         # 全局重置
│   ├── composables/
│   │   └── useScrollAnimation.js
│   ├── components/
│   │   ├── SiteHeader.vue
│   │   ├── ProductNav.vue
│   │   ├── HeroSection.vue
│   │   ├── DesignColor.vue
│   │   ├── NarrowBezel.vue
│   │   ├── SmallScreen.vue
│   │   ├── Appearance.vue
│   │   ├── DisplayScreen.vue
│   │   ├── LUMOCamera.vue
│   │   ├── Battery.vue
│   │   ├── Durability.vue
│   │   ├── NotesFooter.vue
│   │   └── SiteFooter.vue
│   └── data/
│       └── content.js
```

---

## Task 0: 项目初始化与素材整理

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`
- Create: `src/main.js`, `src/App.vue`
- Create: `src/styles/variables.scss`, `src/styles/mixins.scss`, `src/styles/global.scss`
- Create: `public/assets/images/` (复制素材)

- [ ] **Step 1: 创建 Vite + Vue3 项目**

```bash
cd D:/Code/test-ai/test-ai
npm create vite@latest . -- --template vue
```

- [ ] **Step 2: 安装依赖**

```bash
npm install
npm install gsap sass
```

- [ ] **Step 3: 配置 vite.config.js**

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables" as *; @use "@/styles/mixins" as *;`
      }
    }
  }
})
```

- [ ] **Step 4: 创建 SCSS 基础文件**

`src/styles/variables.scss`:
```scss
// 断点
$bp-pc: 1920px;
$bp-pad: 1024px;
$bp-mo: 390px;

// 颜色
$color-black: #000000;
$color-white: #ffffff;
$color-text-primary: rgba(0, 0, 0, 0.95);
$color-text-secondary: rgba(0, 0, 0, 0.55);
$color-text-description: rgba(0, 0, 0, 0.45);
$color-bg-primary: #ffffff;
$color-bg-secondary: #fafafa;
$color-bg-tertiary: #f5f5f5;

// 字体
$font-family: 'OnePlus Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif;

// 间距
$nav-height: 56px;
$max-width: 1440px;
```

`src/styles/mixins.scss`:
```scss
@mixin pc {
  @media (min-width: 1200px) { @content; }
}
@mixin pad {
  @media (min-width: 768px) and (max-width: 1199px) { @content; }
}
@mixin mo {
  @media (max-width: 767px) { @content; }
}
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

`src/styles/global.scss`:
```scss
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; overflow-x: hidden; font-family: $font-family; }
a { text-decoration: none; color: inherit; }
img { display: block; max-width: 100%; }
```

- [ ] **Step 5: 复制素材到 public/assets/images/**

```bash
mkdir -p public/assets/images/kv
mkdir -p public/assets/images/color
mkdir -p public/assets/images/nav
mkdir -p public/assets/images/thin
mkdir -p public/assets/images/appearance
mkdir -p public/assets/images/where
mkdir -p public/assets/images/battery
mkdir -p public/assets/images/camera
mkdir -p public/assets/images/screen
mkdir -p public/assets/images/feature
mkdir -p public/assets/images/misc

# 从 D:\test\_files 复制并分类图片
cp "D:/test/一加 15T 又小又强又美又全面_files/images-kv-phone-"*.png public/assets/images/kv/
cp "D:/test/一加 15T 又小又强又美又全面_files/images-kv-phone-"*.webp public/assets/images/kv/
cp "D:/test/一加 15T 又小又强又美又全面_files/images-kv-shadow-"*.webp public/assets/images/kv/
cp "D:/test/一加 15T 又小又强又美又全面_files/images-kv-replay-"*.svg public/assets/images/kv/
cp "D:/test/一加 15T 又小又强又美又全面_files/videos-kv-pre-pc_poster"*.webp public/assets/images/kv/
cp "D:/test/一加 15T 又小又强又美又全面_files/images-pack-"*.webp public/assets/images/color/
cp "D:/test/一加 15T 又小又强又美又全面_files/images-nav-"*.svg public/assets/images/nav/
cp "D:/test/一加 15T 又小又强又美又全面_files/images-thin-phone-"*.webp public/assets/images/thin/
cp "D:/test/一加 15T 又小又强又美又全面_files/images-dim-light-"*.webp public/assets/images/screen/
cp "D:/test/一加 15T 又小又强又美又全面_files/images-kv-coloros-"*.webp public/assets/images/misc/
cp "D:/test/一加 15T 又小又强又美又全面_files/badge.png public/assets/images/misc/
cp "D:/test/一加 15T 又小又强又美又全面_files/cnnic.png public/assets/images/misc/
cp "D:/test/一加 15T 又小又强又美又全面_files/51638e8fd2593c56856278feb794b506.png" public/assets/images/misc/
```

- [ ] **Step 6: 创建 App.vue 骨架**

```vue
<!-- 根组件：组装所有页面模块，按从上到下顺序渲染 -->
<template>
  <div id="app">
    <SiteHeader />
    <ProductNav />
    <main>
      <HeroSection />
      <DesignColor />
      <NarrowBezel />
      <SmallScreen />
      <Appearance />
      <DisplayScreen />
      <LUMOCamera />
      <Battery />
      <Durability />
    </main>
    <NotesFooter />
    <SiteFooter />
  </div>
</template>

<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import ProductNav from '@/components/ProductNav.vue'
import HeroSection from '@/components/HeroSection.vue'
import DesignColor from '@/components/DesignColor.vue'
import NarrowBezel from '@/components/NarrowBezel.vue'
import SmallScreen from '@/components/SmallScreen.vue'
import Appearance from '@/components/Appearance.vue'
import DisplayScreen from '@/components/DisplayScreen.vue'
import LUMOCamera from '@/components/LUMOCamera.vue'
import Battery from '@/components/Battery.vue'
import Durability from '@/components/Durability.vue'
import NotesFooter from '@/components/NotesFooter.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<style lang="scss">
@use "@/styles/global";
</style>
```

- [ ] **Step 7: 验证项目启动**

```bash
npm run dev
```
Expected: 浏览器打开 localhost，显示空白页（组件还没写）

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: 项目初始化，配置 Vite + Vue3 + SCSS + GSAP"
```

---

## Task 1: SiteHeader - 顶部导航栏

**Files:**
- Create: `src/components/SiteHeader.vue`

**说明：** 一加/OPPO 风格顶部全局导航栏，包含一加 logo、导航菜单项和购买入口按钮。不含下拉菜单和二级页面。

- [ ] **Step 1: 创建组件**

```vue
<!-- 顶部一加/OPPO 风格导航栏：logo + 导航项 + 购买入口，无下拉菜单 -->
<template>
  <header class="site-header">
    <div class="header-inner">
      <div class="logo">
        <span class="logo-text">OnePlus</span>
      </div>
      <nav class="nav-menu">
        <a href="#" class="nav-item">手机</a>
        <a href="#" class="nav-item">配件</a>
        <a href="#" class="nav-item">服务</a>
        <a href="#" class="nav-item">品牌</a>
        <a href="#" class="nav-item">社区</a>
      </nav>
      <div class="header-actions">
        <span class="icon-search">🔍</span>
        <a href="#" class="btn-buy">立即购买</a>
      </div>
    </div>
  </header>
</template>

<script setup>
// 顶部导航栏：纯静态展示，无下拉交互
</script>

<style scoped lang="scss">
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $nav-height;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  .header-inner {
    max-width: $max-width;
    height: 100%;
    margin: 0 auto;
    padding: 0 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include mo {
      padding: 0 16px;
    }
  }

  .logo-text {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  .nav-menu {
    display: flex;
    gap: 32px;

    @include mo {
      display: none;
    }

    .nav-item {
      font-size: 14px;
      color: $color-text-primary;
      transition: opacity 0.2s;

      &:hover { opacity: 0.6; }
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 16px;

    .btn-buy {
      padding: 8px 20px;
      background: $color-black;
      color: $color-white;
      border-radius: 999px;
      font-size: 14px;
      transition: opacity 0.2s;

      &:hover { opacity: 0.8; }
    }
  }
}
</style>
```

- [ ] **Step 2: 验证渲染**

Run: `npm run dev`
Expected: 顶部显示黑色导航栏，含 logo、导航项、购买按钮

- [ ] **Step 3: Commit**

```bash
git add src/components/SiteHeader.vue
git commit -m "feat: 完成 SiteHeader 顶部导航组件"
```

---

## Task 2: ProductNav - 产品锚点导航

**Files:**
- Create: `src/components/ProductNav.vue`
- Create: `src/composables/useStickyNav.js`

**说明：** 一加 15T 产品子导航，吸顶显示，包含总览/设计/续航/影像/屏幕5个锚点（去掉性能和系统），点击平滑滚动到对应 section。

- [ ] **Step 1: 创建 useStickyNav composable**

`src/composables/useStickyNav.js`:
```javascript
// 吸顶导航逻辑：监听滚动，高亮当前可见 section 对应的导航项
import { ref, onMounted, onUnmounted } from 'vue'

export function useStickyNav(sectionIds) {
  const activeIndex = ref(0)

  const handleScroll = () => {
    const scrollY = window.scrollY + 120
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i])
      if (el && el.offsetTop <= scrollY) {
        activeIndex.value = i
        break
      }
    }
  }

  const scrollTo = (index) => {
    const el = document.getElementById(sectionIds[index])
    if (el) {
      window.scrollTo({ top: el.offsetTop - 56, behavior: 'smooth' })
    }
  }

  onMounted(() => window.addEventListener('scroll', handleScroll))
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))

  return { activeIndex, scrollTo }
}
```

- [ ] **Step 2: 创建 ProductNav 组件**

```vue
<!-- 一加15T产品导航：吸顶锚点导航，含总览/设计/续航/影像/屏幕5项 -->
<template>
  <div class="product-nav" :class="{ visible: showNav }">
    <div class="nav-inner">
      <div
        v-for="(item, index) in navItems"
        :key="item.id"
        class="nav-item"
        :class="{ active: activeIndex === index }"
        @click="scrollTo(index)"
      >
        <span class="nav-label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 导航项：去掉性能和系统
const navItems = [
  { id: 'section-kv', label: '总览' },
  { id: 'section-color', label: '设计' },
  { id: 'section-battery', label: '续航' },
  { id: 'section-camera', label: '影像' },
  { id: 'section-light', label: '屏幕' },
]

const sectionIds = navItems.map(i => i.id)
const { activeIndex, scrollTo } = useStickyNav(sectionIds)

// 滚动超过 Hero 后显示
const showNav = ref(false)
const handleScroll = () => {
  showNav.value = window.scrollY > window.innerHeight * 0.8
}
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped lang="scss">
.product-nav {
  position: fixed;
  top: $nav-height;
  left: 0;
  width: 100%;
  height: 48px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  z-index: 999;
  transform: translateY(-100%);
  transition: transform 0.3s ease;

  &.visible { transform: translateY(0); }

  .nav-inner {
    max-width: $max-width;
    height: 100%;
    margin: 0 auto;
    padding: 0 64px;
    display: flex;
    align-items: center;
    gap: 40px;

    @include mo { padding: 0 16px; gap: 20px; }
  }

  .nav-item {
    font-size: 14px;
    color: $color-text-secondary;
    cursor: pointer;
    padding: 4px 0;
    transition: color 0.2s;
    position: relative;

    &.active {
      color: $color-black;
      font-weight: 600;
    }

    &:hover { color: $color-text-primary; }
  }
}
</style>
```

- [ ] **Step 3: 在 App.vue 中给各 section 添加 id**

确保 App.vue 的各组件外层包一个带 id 的 div：
```vue
<div id="section-kv"><HeroSection /></div>
<div id="section-color"><DesignColor /></div>
<div id="section-battery"><Battery /></div>
<div id="section-camera"><LUMOCamera /></div>
<div id="section-light"><DisplayScreen /></div>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ProductNav.vue src/composables/useStickyNav.js src/App.vue
git commit -m "feat: 完成 ProductNav 吸顶锚点导航"
```

---

## Task 3: HeroSection - 首屏

**Files:**
- Create: `src/components/HeroSection.vue`

**说明：** Hero 首屏：左侧"一加 15T 又小又强又美又全面"标题 + 视频播放按钮，右侧手机产品大图。全屏高度，居中布局。

- [ ] **Step 1: 创建组件**

```vue
<!-- Hero首屏：产品名称 + slogan + 手机产品图，全屏视觉冲击 -->
<template>
  <section class="hero-section">
    <div class="hero-inner">
      <div class="hero-left">
        <h1 class="product-name">一加 15T</h1>
        <p class="product-slogan">又小又强又美又全面</p>
        <div class="video-btn">
          <img src="/assets/images/kv/images-kv-replay-1-de3808.svg" alt="play" />
        </div>
      </div>
      <div class="hero-right">
        <img
          src="/assets/images/kv/images-kv-phone-0-1-fa31aa.png"
          alt="一加 15T"
          class="phone-img"
        />
        <img
          src="/assets/images/misc/images-kv-coloros-1-34080c.png.webp"
          alt="ColorOS"
          class="coloros-badge"
        />
      </div>
    </div>
    <div class="scroll-hint">向下查看更多</div>
  </section>
</template>

<script setup>
// Hero 首屏：纯展示，动画在阶段2用 GSAP 添加
</script>

<style scoped lang="scss">
.hero-section {
  width: 100%;
  height: calc(100vh - #{$nav-height});
  margin-top: $nav-height;
  position: relative;
  overflow: hidden;

  .hero-inner {
    max-width: $max-width;
    height: 100%;
    margin: 0 auto;
    padding: 0 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include mo {
      flex-direction: column-reverse;
      justify-content: center;
      padding: 0 16px;
    }
  }

  .hero-left {
    z-index: 2;

    .product-name {
      font-size: 64px;
      font-weight: 700;
      line-height: 1.2;
      color: $color-black;

      @include pad { font-size: 35px; }
      @include mo { font-size: 36px; }
    }

    .product-slogan {
      font-size: 48px;
      font-weight: 700;
      line-height: 1.2;
      margin-top: 8px;
      color: $color-black;

      @include pad { font-size: 26px; }
      @include mo { font-size: 24px; }
    }

    .video-btn {
      width: 56px;
      height: 56px;
      margin-top: 48px;
      cursor: pointer;
      transition: transform 0.2s;

      &:hover { transform: scale(1.1); }

      img { width: 100%; height: 100%; }
    }
  }

  .hero-right {
    position: relative;
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .phone-img {
      max-height: 80%;
      object-fit: contain;

      @include mo {
        max-height: 50%;
        max-width: 280px;
      }
    }

    .coloros-badge {
      position: absolute;
      top: 8%;
      right: -2%;
      width: 140px;

      @include mo { width: 53px; }
    }
  }

  .scroll-hint {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: $color-text-secondary;
    letter-spacing: 1px;
  }
}
</style>
```

- [ ] **Step 2: 验证渲染**

Run: `npm run dev`
Expected: 首屏显示产品名称、slogan、手机产品图

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroSection.vue
git commit -m "feat: 完成 HeroSection 首屏组件"
```

---

## Task 4: DesignColor - 设计与配色

**Files:**
- Create: `src/components/DesignColor.vue`

**说明：** 设计与配色模块：大字标题"轻巧的一小部 漂亮的一大步"，配色切换交互（治愈白巧/松弛抹茶/纯粹可可），点击切换手机产品图。

- [ ] **Step 1: 创建组件**

```vue
<!-- 设计与配色：大字标题 + 三种配色切换交互（白巧/抹茶/可可） -->
<template>
  <section class="design-color" id="section-color">
    <div class="color-inner">
      <div class="title-area">
        <div class="title-line">轻巧的一小部</div>
        <div class="title-line">漂亮的一大步</div>
      </div>
      <div class="subtitle">款款都是<span class="highlight">主打色</span></div>
      <div class="phone-display">
        <div class="color-words left">
          <span v-for="(c, i) in colors" :key="'l'+i" class="word" :class="{ active: currentColor === i }">{{ c.leftWord }}</span>
        </div>
        <div class="phone-wrapper">
          <img
            v-for="(c, i) in colors"
            :key="'p'+i"
            :src="c.image"
            :alt="c.name"
            class="phone-img"
            :class="{ active: currentColor === i }"
          />
        </div>
        <div class="color-words right">
          <span v-for="(c, i) in colors" :key="'r'+i" class="word" :class="{ active: currentColor === i }">{{ c.rightWord }}</span>
        </div>
      </div>
      <div class="color-buttons">
        <div
          v-for="(c, i) in colors"
          :key="'b'+i"
          class="color-btn"
          :class="{ active: currentColor === i }"
          @click="currentColor = i"
        >
          <span class="btn-dot" :style="{ background: c.dotColor }"></span>
          <span class="btn-label">{{ c.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// 三种配色：白巧、抹茶、可可
const currentColor = ref(0)
const colors = [
  {
    name: '纯粹可可',
    leftWord: '纯粹',
    rightWord: '可可',
    dotColor: '#5D4E3A',
    image: '/assets/images/color/images-pack-3586_1506-1-fddc5c.png.webp'
  },
  {
    name: '治愈白巧',
    leftWord: '治愈',
    rightWord: '白巧',
    dotColor: '#F0EDE6',
    image: '/assets/images/color/images-pack-3586_1508-1-409986.png.webp'
  },
  {
    name: '松弛抹茶',
    leftWord: '松弛',
    rightWord: '抹茶',
    dotColor: '#A3B59A',
    image: '/assets/images/color/images-pack-3586_1510-1-a0d90a.png.webp'
  }
]
</script>

<style scoped lang="scss">
.design-color {
  width: 100%;
  min-height: calc(100vh - #{$nav-height});
  background: $color-white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 0;

  .color-inner {
    max-width: $max-width;
    width: 100%;
    padding: 0 64px;
    text-align: center;

    @include mo { padding: 0 16px; }
  }

  .title-area {
    .title-line {
      font-size: 96px;
      font-weight: 700;
      line-height: 1.2;
      color: $color-black;

      @include pad { font-size: 48px; }
      @include mo { font-size: 40px; }
    }
  }

  .subtitle {
    font-size: 48px;
    margin-top: 45px;
    color: $color-text-secondary;

    .highlight {
      color: $color-black;
      position: relative;
    }

    @include pad { font-size: 26px; }
    @include mo { font-size: 24px; }
  }

  .phone-display {
    position: relative;
    margin: 40px auto;
    max-width: 928px;
    display: flex;
    align-items: center;
    justify-content: center;

    .color-words {
      width: 200px;

      .word {
        font-size: 80px;
        font-weight: 700;
        opacity: 0;
        transition: opacity 0.5s;
        position: absolute;

        &.active { opacity: 1; }
      }

      &.left { text-align: right; }
      &.right { text-align: left; }
    }

    .phone-wrapper {
      position: relative;
      width: 400px;
      height: 500px;

      .phone-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        opacity: 0;
        transition: opacity 0.5s;

        &.active { opacity: 1; }
      }
    }
  }

  .color-buttons {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-top: 40px;

    .color-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.2s;

      &.active { opacity: 1; }

      .btn-dot {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid rgba(0, 0, 0, 0.1);
      }

      .btn-label {
        font-size: 14px;
        color: $color-text-primary;
      }
    }
  }
}
</style>
```

- [ ] **Step 2: 验证渲染和切换交互**

Run: `npm run dev`
Expected: 显示三种配色按钮，点击可切换手机图片

- [ ] **Step 3: Commit**

```bash
git add src/components/DesignColor.vue
git commit -m "feat: 完成 DesignColor 设计配色切换组件"
```

---

## Task 5: NarrowBezel - 1.1mm 超窄四等边

**Files:**
- Create: `src/components/NarrowBezel.vue`

**说明：** 1.1mm 超窄四等边模块：大字金属质感标题"1.1mm 超窄四等边"，副标题"窄出手机新高度，满屏精彩框不住"，配手机产品图。

- [ ] **Step 1: 创建组件**

```vue
<!-- 1.1mm超窄四等边：大字标题 + 手机产品图展示窄边框设计 -->
<template>
  <section class="narrow-bezel">
    <div class="bezel-inner">
      <h2 class="main-title">1.1mm 超窄四等边</h2>
      <div class="sub-text">
        <p class="sub-title">窄出手机新高度，满屏精彩框不住。</p>
        <p class="desc">1.1mm 极窄四等边¹，小屏大视野，观感超惊艳。一眼望去，满眼都沉浸，满屏皆精彩。</p>
      </div>
      <div class="phone-images">
        <img src="/assets/images/thin/images-thin-phone-0-1-2366b7.png.webp" alt="一加15T 窄边框" class="phone-img" />
      </div>
    </div>
  </section>
</template>

<script setup>
// 1.1mm 超窄四等边：静态展示模块
</script>

<style scoped lang="scss">
.narrow-bezel {
  width: 100%;
  min-height: calc(100vh - #{$nav-height});
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-white;
  position: relative;
  overflow: hidden;

  .bezel-inner {
    position: relative;
    width: 100%;
    max-width: $max-width;
    height: 600px;
    @include flex-center;
  }

  .main-title {
    font-size: 128px;
    font-weight: 700;
    line-height: 1;
    color: $color-black;
    text-align: center;
    z-index: 2;

    @include pad { font-size: 69px; }
    @include mo { font-size: 40px; }
  }

  .sub-text {
    position: absolute;
    bottom: 10%;
    text-align: center;
    z-index: 2;

    .sub-title {
      font-size: 48px;
      font-weight: 300;
      line-height: 1;
      color: $color-black;

      @include pad { font-size: 26px; }
      @include mo { font-size: 32px; }
    }

    .desc {
      font-size: 18px;
      color: $color-text-secondary;
      margin-top: 16px;
      max-width: 600px;

      @include mo { font-size: 14px; width: 328px; }
    }
  }

  .phone-images {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

    .phone-img {
      max-height: 500px;
      object-fit: contain;
      opacity: 0.3;
    }
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NarrowBezel.vue
git commit -m "feat: 完成 NarrowBezel 超窄四等边组件"
```

---

## Task 6: SmallScreen - 小屏手感

**Files:**
- Create: `src/components/SmallScreen.vue`

**说明：** 小屏手感模块：标题"行走的时尚单品 放在哪里都搭"，描述文案，配3张生活场景图（大图+两小图布局）。

- [ ] **Step 1: 创建组件**

```vue
<!-- 小屏手感：标题 + 描述 + 3张生活场景图（大图+两小图布局） -->
<template>
  <section class="small-screen">
    <div class="screen-inner">
      <div class="text-area">
        <h2 class="title">行走的时尚单品<br />放在哪里都搭</h2>
        <p class="desc">简约小巧高颜值，拿在手里，就是随身携带的漂亮搭子。放在桌上，就是自带格调的桌搭神器。</p>
      </div>
      <div class="image-group">
        <div class="img-large">
          <img src="/assets/images/where/images-where-0-pc-1-0dc66b.jpg.webp" alt="小屏手感" />
        </div>
        <div class="img-small-group">
          <img src="/assets/images/where/images-where-1-pc-1-de6870.jpg.webp" alt="小屏手感" class="img-small" />
          <img src="/assets/images/where/images-where-2-pc-1-973fa6.jpg.webp" alt="小屏手感" class="img-small" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 小屏手感：静态图文展示
</script>

<style scoped lang="scss">
.small-screen {
  width: 100%;
  padding: 80px 64px;
  background: $color-white;

  @include mo { padding: 48px 16px; }
  @include pad { padding: 64px 24px; }

  .screen-inner {
    max-width: $max-width;
    margin: 0 auto;
  }

  .text-area {
    .title {
      font-size: 48px;
      font-weight: 500;
      line-height: 1.2;
      color: $color-text-primary;

      @include mo { font-size: 28px; }
    }

    .desc {
      font-size: 18px;
      line-height: 1.4;
      color: $color-text-secondary;
      margin-top: 16px;
      max-width: 519px;

      @include mo { font-size: 14px; }
    }
  }

  .image-group {
    display: flex;
    gap: 16px;
    margin-top: 36px;
    height: 580px;

    @include mo {
      flex-direction: column;
      height: auto;
      gap: 4px;
    }

    .img-large {
      flex: 1.88;
      overflow: hidden;
      border-radius: 8px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .img-small-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .img-small {
        flex: 1;
        width: 100%;
        object-fit: cover;
        border-radius: 8px;
        overflow: hidden;
      }
    }
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SmallScreen.vue
git commit -m "feat: 完成 SmallScreen 小屏手感组件"
```

---

## Task 7: Appearance - 设计美图

**Files:**
- Create: `src/components/Appearance.vue`

**说明：** 设计美图模块：标题"单手的神 小屏超便携，一手掌控超自在"，展示产品设计细节卖点（6.32英寸/71.82mm/50:50配重等），配产品图。

- [ ] **Step 1: 创建组件**

```vue
<!-- 设计美图：产品外观细节展示，含6.32英寸/71.82mm/50:50配重等卖点 -->
<template>
  <section class="appearance">
    <div class="appearance-inner">
      <div class="text-area">
        <h2 class="title">单手的神<br />小屏超便携，一手掌控超自在。</h2>
      </div>
      <div class="feature-grid">
        <div class="feature-item" v-for="f in features" :key="f.label">
          <p class="feature-label">{{ f.label }}</p>
          <p class="feature-value">{{ f.value }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 设计美图：产品外观细节卖点展示
const features = [
  { label: '单手轻松拿捏', value: '6.32 英寸' },
  { label: '握持无负担', value: '71.82mm' },
  { label: '手感平衡', value: '50:50' },
  { label: '自定义按键', value: '实体快捷键' },
  { label: '圆润握持', value: '黄金大 R 角' },
  { label: '精致质感', value: '金属魔方 Deco' },
]
</script>

<style scoped lang="scss">
.appearance {
  width: 100%;
  padding: 80px 64px;
  background: $color-bg-secondary;

  @include mo { padding: 48px 16px; }
  @include pad { padding: 64px 24px; }

  .appearance-inner {
    max-width: $max-width;
    margin: 0 auto;
  }

  .text-area {
    text-align: center;
    margin-bottom: 48px;

    .title {
      font-size: 48px;
      font-weight: 500;
      line-height: 1.2;
      color: $color-text-primary;

      @include mo { font-size: 28px; }
    }
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @include mo { grid-template-columns: repeat(2, 1fr); gap: 16px; }

    .feature-item {
      background: $color-white;
      border-radius: 12px;
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 167px;

      .feature-label {
        font-size: 14px;
        color: $color-text-description;
      }

      .feature-value {
        font-size: 36px;
        font-weight: 500;
        color: $color-text-primary;
        margin-top: 12px;

        @include mo { font-size: 24px; }
      }
    }
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Appearance.vue
git commit -m "feat: 完成 Appearance 设计美图组件"
```

---

## Task 8: DisplayScreen - 屏幕

**Files:**
- Create: `src/components/DisplayScreen.vue`

**说明：** 屏幕护眼模块：左侧标题"熄灯也护眼，暗光操作也超神" + 三个护眼参数（超低蓝光/3840Hz/1nit），右侧暗光场景图。左右分栏布局。

- [ ] **Step 1: 创建组件**

```vue
<!-- 屏幕护眼：左侧文案+三个护眼参数，右侧暗光场景图，左右分栏 -->
<template>
  <section class="display-screen" id="section-light">
    <div class="screen-left">
      <div class="left-content">
        <div class="top-area">
          <h2 class="title">熄灯也护眼，<br />暗光操作也超神。</h2>
          <p class="desc">低蓝光、低频闪、低亮度，熄灯游戏也护眼。人因研究全面加持，护眼方案更科学，各个场景都舒适护眼。</p>
        </div>
        <div class="divider"></div>
        <div class="feature-row">
          <div class="feature" v-for="f in features" :key="f.value">
            <p class="f-label">{{ f.label }}</p>
            <p class="f-value">{{ f.value }}</p>
            <p class="f-tip">{{ f.tip }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="screen-right">
      <img src="/assets/images/screen/images-dim-light-dim-light-1-9b5614.jpg.webp" alt="暗光护眼" />
    </div>
  </section>
</template>

<script setup>
// 屏幕护眼模块：三个护眼参数展示
const features = [
  { label: '降低眼干涩', value: '超低蓝光', tip: '超低有害蓝光占比\n行业超低蓝光' },
  { label: '降低视疲劳', value: '3840Hz', tip: '超高频 PWM 调光\n行业超低频闪' },
  { label: '暗光不刺眼', value: '1nit', tip: '真硬件暗夜护眼\n行业超低亮度¹³' },
]
</script>

<style scoped lang="scss">
.display-screen {
  width: 100%;
  display: flex;
  max-height: 750px;
  overflow: hidden;

  @include mo { flex-direction: column-reverse; }

  .screen-left {
    width: 50%;
    background: $color-bg-tertiary;
    display: flex;
    align-items: center;

    @include mo { width: 100%; padding: 36px 16px; }

    .left-content {
      max-width: 720px;
      margin-left: auto;
      padding: 64px;
      width: 100%;

      @include pad { padding: 64px 24px; }
      @include mo { padding: 0; }
    }

    .top-area {
      .title {
        font-size: 48px;
        font-weight: 500;
        line-height: 1.2;
        color: #2a2a2a;

        @include mo { font-size: 32px; }
      }

      .desc {
        font-size: 18px;
        line-height: 1.44;
        color: rgba(42, 42, 42, 0.75);
        margin-top: 24px;

        @include mo { font-size: 16px; }
      }
    }

    .divider {
      width: 100%;
      height: 1px;
      background: rgba(42, 42, 42, 0.15);
      margin: 24px 0;
    }

    .feature-row {
      display: flex;
      justify-content: space-between;
      gap: 24px;

      @include mo {
        .feature { min-width: 100px; }
      }

      .feature {
        .f-label {
          font-size: 14px;
          color: rgba(42, 42, 42, 0.95);
          margin-bottom: 12px;
        }

        .f-value {
          font-size: 36px;
          font-weight: 500;
          color: rgba(42, 42, 42, 0.95);

          @include mo { font-size: 24px; }
        }

        .f-tip {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.55);
          margin-top: 12px;
          line-height: 1.2;
          white-space: pre-line;
        }
      }
    }
  }

  .screen-right {
    width: 50%;

    @include mo { width: 100%; }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      @include mo { height: 340px; }
    }
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/DisplayScreen.vue
git commit -m "feat: 完成 DisplayScreen 屏幕护眼组件"
```

---

## Task 9: LUMOCamera - LUMO 凝光影像系统

**Files:**
- Create: `src/components/LUMOCamera.vue`

**说明：** OPPO 自研 LUMO 凝光影像系统：大字标题"LUMO 凝光影像系统 人景放大都清晰"，展示双摄参数（5000万主摄+5000万长焦），"旅拍神器 旅游打卡小神机 拍近拍远都出片"卖点文案。

- [ ] **Step 1: 创建组件**

```vue
<!-- LUMO凝光影像系统：大字标题 + 双摄参数 + 旅拍神器卖点文案 -->
<template>
  <section class="lumo-camera" id="section-camera">
    <div class="camera-inner">
      <div class="title-area">
        <div class="title-line">LUMO 凝光影像系统</div>
        <div class="title-line">人景放大都清晰</div>
      </div>
      <div class="content-area">
        <div class="camera-specs">
          <div class="spec-item">
            <h3 class="spec-title">5000 万像素索尼大底旗舰主摄</h3>
            <p class="spec-desc">1/1.56 英寸大底｜24mm 等效焦距<br />f/1.8 超大圈｜OIS 光学防抖</p>
          </div>
          <div class="spec-item">
            <h3 class="spec-title">5000 万像素 3.5 倍潜望长焦镜头</h3>
            <p class="spec-desc">85mm 等效焦距｜3.5 倍光学潜望长焦<br />7 倍无损变焦｜OIS 光学防抖¹¹</p>
          </div>
        </div>
        <div class="sell-text">
          <h3 class="sell-title">旅拍神器</h3>
          <h2 class="sell-headline">旅游打卡小神机<br />拍近拍远都出片</h2>
          <p class="sell-desc">
            这款小屏旗舰，搭载 OPPO 旗舰同款的 LUMO 凝光影像算法，
            <span class="desc-sub">拍景好看，拍人更美。有 LUMO 在手，大片就到手。</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// LUMO 影像系统：双摄参数 + 旅拍卖点
</script>

<style scoped lang="scss">
.lumo-camera {
  width: 100%;
  padding: 120px 64px 80px;
  background: $color-bg-tertiary;

  @include mo { padding: 80px 16px; }
  @include pad { padding: 100px 24px; }

  .camera-inner {
    max-width: $max-width;
    margin: 0 auto;
  }

  .title-area {
    text-align: center;
    margin-bottom: 80px;

    .title-line {
      font-size: 96px;
      font-weight: 700;
      line-height: 1.2;
      color: $color-black;

      @include pad { font-size: 48px; }
      @include mo { font-size: 36px; }
    }
  }

  .content-area {
    max-width: 1440px;
    margin: 0 auto;
  }

  .camera-specs {
    display: flex;
    gap: 80px;
    margin-bottom: 80px;

    @include mo { flex-direction: column; gap: 36px; }

    .spec-item {
      .spec-title {
        font-size: 24px;
        font-weight: 500;
        color: $color-text-primary;

        @include mo { font-size: 16px; }
      }

      .spec-desc {
        font-size: 14px;
        line-height: 1.4;
        color: $color-text-secondary;
        margin-top: 8px;
      }
    }
  }

  .sell-text {
    .sell-title {
      font-size: 36px;
      font-weight: 500;
      color: $color-text-primary;
      margin-bottom: 11px;

      @include mo { font-size: 20px; }
    }

    .sell-headline {
      font-size: 64px;
      font-weight: 500;
      line-height: 1.2;
      color: $color-text-primary;

      @include mo { font-size: 28px; }
    }

    .sell-desc {
      font-size: 18px;
      line-height: 1.4;
      color: $color-text-primary;
      margin-top: 12px;
      max-width: 423px;

      .desc-sub { color: $color-text-secondary; }

      @include mo { font-size: 16px; }
    }
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LUMOCamera.vue
git commit -m "feat: 完成 LUMOCamera 影像系统组件"
```

---

## Task 10: Battery - 7500mAh 冰川电池

**Files:**
- Create: `src/components/Battery.vue`

**说明：** 7500mAh 冰川电池模块：大字标题"小屏电池超巨量 电量巨扛用"，充电组合卖点（100W有线+50W无线+反充），续航数据展示。

- [ ] **Step 1: 创建组件**

```vue
<!-- 7500mAh冰川电池：大字标题 + 充电组合 + 续航数据展示 -->
<template>
  <section class="battery-section" id="section-battery">
    <div class="battery-inner">
      <div class="title-area">
        <div class="title-line">小屏电池超巨量</div>
        <div class="title-line">电量巨扛用</div>
      </div>
      <div class="sell-text">
        <h2 class="sell-title">超豪华充电组合<br />有线无线都闪充，<br />回血只要分分钟。</h2>
      </div>
      <div class="battery-stats">
        <div class="stat-item" v-for="s in stats" :key="s.label">
          <p class="stat-value">{{ s.value }}</p>
          <p class="stat-label">{{ s.label }}</p>
        </div>
      </div>
      <div class="charging-grid">
        <div class="charge-item" v-for="c in charging" :key="c.title">
          <h3 class="charge-title">{{ c.title }}</h3>
          <p class="charge-desc">{{ c.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 7500mAh 电池模块：续航数据 + 充电组合
const stats = [
  { value: '40.5h', label: '视频播放' },
  { value: '10.3h', label: '游戏畅玩' },
  { value: '22.8h', label: '刷短视频' },
  { value: '10.4h', label: '地图导航⁹' },
]

const charging = [
  { title: '100W 超级闪充', desc: '30 分钟充至 61%¹⁰' },
  { title: '50W 无线闪充', desc: '随手一放，超速回血' },
  { title: '全局旁路供电', desc: '插电直玩，不烫手' },
  { title: '有线反充 + 无线反充', desc: '应急补电超轻松' },
]
</script>

<style scoped lang="scss">
.battery-section {
  width: 100%;
  padding: 120px 64px 80px;
  background: $color-white;

  @include mo { padding: 80px 16px; }
  @include pad { padding: 80px 24px; }

  .battery-inner {
    max-width: $max-width;
    margin: 0 auto;
    text-align: center;
  }

  .title-area {
    margin-bottom: 48px;

    .title-line {
      font-size: 96px;
      font-weight: 700;
      line-height: 1.2;
      color: $color-black;

      @include pad { font-size: 48px; }
      @include mo { font-size: 36px; }
    }
  }

  .sell-text {
    margin-bottom: 64px;

    .sell-title {
      font-size: 48px;
      font-weight: 500;
      line-height: 1.2;
      color: $color-text-primary;

      @include mo { font-size: 28px; }
    }
  }

  .battery-stats {
    display: flex;
    justify-content: center;
    gap: 64px;
    margin-bottom: 64px;

    @include mo { flex-wrap: wrap; gap: 32px; }

    .stat-item {
      .stat-value {
        font-size: 56px;
        font-weight: 700;
        color: $color-black;

        @include mo { font-size: 36px; }
      }

      .stat-label {
        font-size: 16px;
        color: $color-text-secondary;
        margin-top: 8px;
      }
    }
  }

  .charging-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    @include mo { grid-template-columns: repeat(2, 1fr); }

    .charge-item {
      background: $color-bg-secondary;
      border-radius: 12px;
      padding: 32px 24px;
      text-align: left;

      .charge-title {
        font-size: 20px;
        font-weight: 600;
        color: $color-text-primary;

        @include mo { font-size: 16px; }
      }

      .charge-desc {
        font-size: 14px;
        color: $color-text-secondary;
        margin-top: 8px;
        line-height: 1.4;
      }
    }
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Battery.vue
git commit -m "feat: 完成 Battery 电池组件"
```

---

## Task 11: Durability - 耐用功能

**Files:**
- Create: `src/components/Durability.vue`

**说明：** 耐用功能模块：标题"AI 实用好功能"，展示4个AI功能（AI人像补光/AI去反光/AI消除/AI超清合影），左右切换交互。

- [ ] **Step 1: 创建组件**

```vue
<!-- 耐用功能：AI实用好功能，4个AI功能卡片切换展示 -->
<template>
  <section class="durability">
    <div class="durability-inner">
      <h2 class="section-title">AI 实用好功能</h2>
      <div class="feature-list">
        <div
          v-for="(f, i) in features"
          :key="f.title"
          class="feature-card"
          :class="{ active: currentIndex === i }"
          @click="currentIndex = i"
        >
          <h3 class="card-title">{{ f.title }}</h3>
          <p class="card-desc">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// 耐用功能：4个AI功能展示
const currentIndex = ref(0)
const features = [
  { title: 'AI 人像补光', desc: '出门自带反光板，美丽随时在线。' },
  { title: 'AI 去反光', desc: '隔窗拍照不怕光，轻松留住"美"一面。' },
  { title: 'AI 消除', desc: '自动识别路人，不用圈选超方便。' },
  { title: 'AI 超清合影', desc: '人人都清晰，留影不留遗憾。' },
]
</script>

<style scoped lang="scss">
.durability {
  width: 100%;
  padding: 87px 64px 65px;
  background: $color-white;
  border-top: 1px solid rgba(0, 0, 0, 0.15);

  @include mo { padding: 48px 16px; }
  @include pad { padding: 64px 24px; }

  .durability-inner {
    max-width: $max-width;
    margin: 0 auto;
  }

  .section-title {
    font-size: 48px;
    font-weight: 500;
    line-height: 1.2;
    color: $color-text-primary;
    margin-bottom: 48px;

    @include mo { font-size: 28px; }
  }

  .feature-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;

    @include mo { grid-template-columns: 1fr; }

    .feature-card {
      background: $color-bg-secondary;
      border-radius: 12px;
      padding: 32px;
      cursor: pointer;
      transition: all 0.3s;
      border: 2px solid transparent;

      &.active {
        border-color: $color-black;
        background: $color-white;
      }

      .card-title {
        font-size: 24px;
        font-weight: 500;
        color: $color-text-primary;

        @include mo { font-size: 18px; }
      }

      .card-desc {
        font-size: 14px;
        line-height: 1.4;
        color: $color-text-secondary;
        margin-top: 16px;
      }
    }
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Durability.vue
git commit -m "feat: 完成 Durability 耐用功能组件"
```

---

## Task 12: NotesFooter - 备注条款

**Files:**
- Create: `src/components/NotesFooter.vue`

**说明：** 备注条款模块：18条产品备注 + 5条免责声明，小字号灰色文本，RoHS认证标识。

- [ ] **Step 1: 创建组件**

```vue
<!-- 备注条款：18条产品备注 + 5条免责声明 + RoHS认证标识 -->
<template>
  <section class="notes-footer">
    <div class="notes-inner">
      <p class="notes-title">备注：</p>
      <p v-for="(note, i) in notes" :key="'note'+i" class="note-item">
        {{ i + 1 }}、{{ note }}
      </p>
      <p class="notes-title" style="margin-top: 24px;">免责声明：</p>
      <p v-for="(disclaimer, i) in disclaimers" :key="'dis'+i" class="note-item">
        {{ i + 1 }}、{{ disclaimer }}
      </p>
      <div class="rohs-badge">
        <img src="/assets/images/misc/badge.png" alt="RoHS" />
        <span>本产品通过中国 RoHS 合格评定</span>
      </div>
    </div>
  </section>
</template>

<script setup>
// 备注条款：产品备注和免责声明
const notes = [
  '一加 15T 全白机是指白色金属中框和白色后盖。屏幕窄边尺寸数据来自官方实验室，因配色、测试环境、方法、产品工艺等不同，数据可能存在差异，请一切以实际为准；',
  '一加 15T 的屏幕尺寸、机身宽度、重量、厚度等数据来自官方实验室，因配色、测试环境、方法、产品工艺等不同，数据可能存在差异，请一切以实际为准。6.32 英寸（含及以下）屏幕尺寸为主流小屏手机范畴；',
  '一加 15T 搭载第五代骁龙 8 至尊版移动平台，数据源于高通骁龙官方信息。性能表现可能会受使用时限、电量和亮度等环境因素的影响，一切以实际体验为准；',
  '一加 15T 的"满帧"指接近 165 帧或 120 帧的游戏帧率表现。因测试环境、测试方法、软件版本等条件不同，数据可能存在差异，画面仅供示意，一切请以实际体验为准；',
  '一加 15T 的 165Hz 显示/操控数据为对比 120Hz 效果数据和表现来源于官方实验室测算，因机器老化、网络环境、个人使用习惯等因素不同，体验可能有所差异，一切请以实际体验为准；',
  '一加 15T 的电竞网络芯片 G2 网络表现数据基于官方实验室测算得出，因机器老化、网络环境、个人使用习惯等因素不同，游戏体验可能有所差异，一切请以实际体验为准。购买一加 15T 的用户，可享受 2 年游戏云计算专网免费体验。2 年时间指：从每台手机领取 OPPO 智慧云加速权益起开始计算。2 年到期后，在游戏助手内购买 OPPO 智慧云加速，以继续使用；',
  '一加 15T 的灵犀触控芯的触控表现数据基于官方实验室测算得出，因机器老化、网络环境、个人使用习惯等因素不同，游戏体验可能有所差异，一切请以实际体验为准；',
  '一加 15T 及相关机型的散热数据源于官网或官方实验室测算，因机器老化、网络环境、个人使用习惯等因素不同，体验可能有所差异，一切请以实际体验为准；',
  '一加 15T 的电池为单电芯设计，7500mAh/27.90Wh（典型值），7270mAh/27.05 Wh（额定值），电池数据来自官方实验室。续航数据源于官方实验室，经测算，满电情况下，B 站追剧时长 40.5 小时，王者荣耀 120 帧 + 高清画质模式时长 10.3 小时，抖音刷视频时长 22.8 小时，高德导航时长 10.4 小时，因实际使用环境、游戏设置和游玩习惯不同，请以实际体验为准；',
  '一加 15T 支持有线 100W 超级闪充，50W 无线闪充。无线充电时长数据源于官方实验室报告。测试环境：电池初始温度 25±1°C，环境温度 25±1°C。测试条件：关闭所有后台运行程序，开启飞行模式，在手机电量为 1% 的情况下，使用标配电源适配器灭屏充电。实际充电速度可能因设备使用情况、充电条件及其他因素的不同而有所不同；测试数据仅供参考，一切以实际体验为准；',
  '一加 15T 的后置两颗摄像头为 5000 万 + 5000 万像素，数据源于官方实验室报告或供应商提供，拍摄效果受拍摄技术、环境亮度等情况影响，请一切以实际体验为准；',
  '一加 15T 的屏幕数据及表现源于官方实验室或供应商提供。屏幕流畅度、续航体验可能会因为网络、使用时限、电量和亮度等因素受影响，请一切以实际体验为准；',
  '一加 15T 的屏幕护眼数据及表现源于官方实验室或供应商提供。一加 15T 通过德国莱茵 TÜV 智能护眼 5.0 认证，从屏幕显示质量、无频闪、硬件低蓝光过滤、暗光护眼技术、主动式智能护眼等维度，呵护双眼。本产品非医疗器械，不具有治疗功能，请一切以实际体验为准；',
  '一加 15T 在正常使用状态下可防水、防尘。在受控实验室条件下，经测试，其效果在 GB/T 4208-2017 （国内）标准下达到 IP66、IP68、IP69 级别，在 ISO 20653:2023 标准下达到 IP69K 级别，其中 IP66、IP69、IP69K 测试中，手机放置方式：竖直放置，USB 口朝上。防水、防尘功能并非永久有效，防护性能可能会因日常磨损而下降。由于主动或意外等原因，带来的手机内部部件浸入液体而损坏的情况，不在保修范围之内，请以实际体验为准；',
  '一加 15T 系统使用流畅度体验可能会因为使用时限、电量和亮度等环境因素受影响，仅供参考，请一切以实际体验为准；',
  'ColorOS 16 流畅双引擎数据源于实验室测试得出，流畅度体验可能会因为使用时限、电量和亮度等环境因素受影响，仅供参考，请一切以实际体验为准；',
  '使用跨端复制粘贴时，需要更新 OPPO 互联至 16.0.35 及以上版本，连接上 PC 端 OPPO 互联并开启剪贴板同步后使用。支持的应用和场景请以实际体验为准；',
  '不含游戏内部语音组队开黑进行中的场景、不含游戏助手-游戏相机-录屏-录制麦克风声音开启时的录屏场景等复合录音场景时发送语音消息。支持的应用请以实际体验为准。',
]

const disclaimers = [
  '以上图片、数据均由官方实验室或供应商提供，一切实际体验及详情备注请以官网公布为准。实物产品效果（包括但不限于外观、颜色、尺寸）和界面内容（包括但不限于 UI、背景、数据），仅做功能展示，敬请您以实际版本功能及界面为准；',
  '以上图片、功能涉及软件内容部分，以 ColorOS 16 为准；',
  '由于产品批次和生产供应因素实时变化，为尽可能提供准确的产品信息、规格参数、产品特性，一加可能实时调整和修订以上页面中的文字表述、图片效果等内容，以求与实际产品性能、规格、指数、零部件等信息相匹配；如遇确有进行页面修改和调整必要的情形，恕不专门通知；',
  '手机尺寸和重量因配置、制造工艺和测量方法的不同可能有所差异，请以实物为准；',
  '部分游戏画面授权自《王者荣耀》、《和平精英》等手游。',
]
</script>

<style scoped lang="scss">
.notes-footer {
  width: 100%;
  padding: 80px 64px;
  background: $color-bg-secondary;

  @include mo { padding: 48px 16px; background: $color-bg-tertiary; }
  @include pad { padding: 48px 24px; }

  .notes-inner {
    max-width: $max-width;
    margin: 0 auto;
    padding: 0 64px;

    @include mo { padding: 0; }
    @include pad { padding: 0; }
  }

  .notes-title {
    font-size: 12px;
    line-height: 18px;
    color: $color-text-secondary;
  }

  .note-item {
    font-size: 12px;
    line-height: 18px;
    color: $color-text-secondary;
    margin-top: 4px;
  }

  .rohs-badge {
    display: flex;
    align-items: center;
    margin-top: 12px;
    gap: 10px;

    img {
      width: 68px;
      height: 42px;

      @include mo { width: 60px; height: 38px; }
    }

    span {
      font-size: 12px;
      line-height: 18px;
      color: $color-text-secondary;
    }
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NotesFooter.vue
git commit -m "feat: 完成 NotesFooter 备注条款组件"
```

---

## Task 13: SiteFooter - 页脚

**Files:**
- Create: `src/components/SiteFooter.vue`

**说明：** 页脚：一加产品/配件/关于一加/服务支持四列链接 + 社交媒体 + 备案信息 + 法律链接。

- [ ] **Step 1: 创建组件**

```vue
<!-- 页脚：四列产品/服务链接 + 社交媒体 + 备案信息 + 法律链接 -->
<template>
  <footer class="site-footer">
    <div class="footer-nav">
      <div class="nav-column" v-for="col in navColumns" :key="col.title">
        <h4 class="col-title">{{ col.title }}</h4>
        <ul class="col-list">
          <li v-for="item in col.items" :key="item">
            <a href="#">{{ item }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="legal-links">
        <a href="#" v-for="link in legalLinks" :key="link">{{ link }}</a>
      </div>
      <div class="icp-info">
        <span>粤ICP备<a href="https://beian.miit.gov.cn" target="_blank">13080605</a>号</span>
        <span>备案主体编号: 44201910955995</span>
        <span class="beian">
          <img src="/assets/images/misc/badge.png" alt="粤公网安备" />
          粤公网安备 44030402001407号
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 页脚：链接和备案信息
const navColumns = [
  {
    title: '一加产品',
    items: ['一加 Turbo 6X Pro', '一加 Ace 6 至尊版', '一加 15T', '一加 Turbo 6', '一加 Ace 6T', '一加 15', '一加 Ace 6', '一加 13T', '查看全部手机']
  },
  {
    title: '配件',
    items: ['一加平板 3 Pro', '一加平板 2 Pro', '一加智能手写笔 2 Pro', '一加 Buds Ace 3', '一加 Buds 4', '一加 Buds 3', '查看全部配件']
  },
  {
    title: '关于一加',
    items: ['了解一加', 'ColorOS', 'HydrogenOS', '云服务', '预置应用公示', '欢太']
  },
  {
    title: '服务支持',
    items: ['购买保障', '真伪及保修期查询', '维修价格', '寄修服务', '服务中心', '维修进度', '联系我们']
  },
]

const legalLinks = ['隐私政策', '儿童个人信息保护政策', '用户协议', '竞赛规则', '知识产权政策', '安全问题反馈']
</script>

<style scoped lang="scss">
.site-footer {
  background: $color-black;
  color: rgba(255, 255, 255, 0.55);
  padding: 64px 64px 32px;

  @include mo { padding: 48px 16px; }
  @include pad { padding: 48px 24px; }

  .footer-nav {
    max-width: $max-width;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;

    @include mo { grid-template-columns: repeat(2, 1fr); gap: 24px; }

    .nav-column {
      .col-title {
        font-size: 16px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.95);
        margin-bottom: 16px;
      }

      .col-list {
        list-style: none;

        li {
          margin-bottom: 8px;

          a {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.55);
            transition: color 0.2s;

            &:hover { color: rgba(255, 255, 255, 0.95); }
          }
        }
      }
    }
  }

  .footer-bottom {
    max-width: $max-width;
    margin: 48px auto 0;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    .legal-links {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 16px;

      a {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.55);

        &:hover { color: rgba(255, 255, 255, 0.95); }
      }
    }

    .icp-info {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 16px;
      font-size: 12px;

      a { color: rgba(255, 255, 255, 0.55); }

      .beian {
        display: flex;
        align-items: center;
        gap: 6px;

        img { width: 20px; height: 20px; }
      }
    }
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SiteFooter.vue
git commit -m "feat: 完成 SiteFooter 页脚组件"
```

---

## Task 14: 响应式验证与构建

**Files:**
- Modify: 各组件 SCSS（微调断点）

- [ ] **Step 1: 验证三档断点**

在 Chrome DevTools 中分别以 1920px / 1024px / 390px 检查：
- 导航栏是否正常
- Hero 首屏布局是否正确
- 各 section 是否有严重错位
- 文字是否可读

- [ ] **Step 2: 运行 build**

```bash
npm run build
```
Expected: 生成 dist/ 目录，无报错

- [ ] **Step 3: 部署验证**

```bash
npx serve -s dist
```
Expected: 本地可访问，页面完整渲染

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix: 响应式适配微调，build 验证通过"
```

---

## Task 15: GSAP 动画与交互

**Files:**
- Create: `src/composables/useScrollAnimation.js`
- Modify: 各组件（添加动画 class 和 GSAP 调用）

- [ ] **Step 1: 创建 useScrollAnimation composable**

```javascript
// GSAP ScrollTrigger 通用滚动动画：元素进入视口时淡入上移
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
  onMounted(() => {
    // 所有带 .animate-in 的元素：进入视口时淡入上移
    gsap.utils.toArray('.animate-in').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    })
  })
}
```

- [ ]  **Step 2: 在各组件中添加 .animate-in class**

在 HeroSection、DesignColor、NarrowBezel、SmallScreen、Appearance、DisplayScreen、LUMOCamera、Battery、Durability 的关键内容元素上添加 `class="animate-in"`。

- [ ] **Step 3: 在 App.vue 中调用 useScrollAnimation**

```javascript
import { useScrollAnimation } from '@/composables/useScrollAnimation'
useScrollAnimation()
```

- [ ] **Step 4: 添加 Hero 首屏入场动画**

在 HeroSection.vue 的 script 中添加：
```javascript
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  const tl = gsap.timeline()
  tl.from('.product-name', { y: 40, opacity: 0, duration: 0.6, ease: 'power2.out' })
    .from('.product-slogan', { y: 40, opacity: 0, duration: 0.6 }, '-=0.3')
    .from('.video-btn', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
    .from('.phone-img', { y: 60, opacity: 0, duration: 0.8 }, '-=0.5')
})
```

- [ ] **Step 5: 验证动画**

Run: `npm run dev`
Expected: 滚动时各 section 内容淡入上移，Hero 首屏有入场动画

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: 添加 GSAP 滚动动画和首屏入场动画"
```

---

## Task 16: README 与最终交付

**Files:**
- Create: `README.md`

- [ ] **Step 1: 编写 README.md**

```markdown
# 一加 15T 产品页复刻

使用 Vue3 + Vite 复刻一加 15T 官方产品页（精简版）。

## 技术栈
- Vue3 (Composition API)
- Vite
- SCSS (scoped)
- GSAP + ScrollTrigger

## 项目结构
[结构说明...]

## 组件拆分
[13个组件列表及说明]

## 动画方案
- GSAP ScrollTrigger 驱动滚动触发淡入
- Hero 首屏 timeline 入场动画
- 配色切换 CSS transition

## 响应式方案
- 1920px: 桌面完整布局
- 1024px: 平板适配
- 390px: 手机单列布局

## 资源来源
所有图片素材来自一加 15T 官方页面（https://www.oneplus.com/cn/15t），
通过浏览器 Ctrl+S 保存获取。

## 运行方式
npm install
npm run dev    # 开发
npm run build  # 构建

## AI 辅助说明
本项目全程使用 AI 辅助开发，聊天记录见 AI记录/ 目录。
```

- [ ] **Step 2: 最终 build**

```bash
npm run build
```

- [ ] **Step 3: 打包提交结构**

```
提交包/
├── 源码/
├── dist/
└── AI记录/
```

- [ ] **Step 4: Final Commit**

```bash
git add -A
git commit -m "docs: 添加 README，完成最终交付"
```
