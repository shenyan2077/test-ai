# 一加 15T 官方产品页 Vue3 复刻 - 实施计划

> 考试项目：使用 Vue3 + Vite 复刻 https://www.oneplus.com/cn/15t
> 日期：2026-07-11
> 预计工时：10 小时

---

## 一、项目概述

### 1.1 考试目标
使用 Vue3 + Vite 完整复刻一加 15T 官方产品页（精简版），不要求复刻性能栏目和系统栏目。

### 1.2 核心约束
| 约束项 | 说明 |
|--------|------|
| 技术栈 | Vue3 (Composition API) + Vite |
| Node 版本 | 22.12.10 |
| 样式方案 | SCSS (scoped) |
| 动画方案 | GSAP + ScrollTrigger |
| 响应式断点 | 1920px / 1024px / 390px |
| 素材来源 | 一加/OPPO 官方公开资源（已通过 Ctrl+S 保存到 D:\test） |
| 禁止事项 | 不得通过 v-html / innerHTML / iframe 直接嵌入原站 HTML |
| 全程 AI | 聊天记录是评分依据，需完整保留 |

### 1.3 参考文档
- 考试说明：`C:\Users\LEGION\Downloads\前端考试说明文档.md`
- 经验分享（方法论）：`D:\Documents\xwechat_files\...\前端经验分享.html`
- 原页面素材：`D:\test\一加 15T 又小又强又美又全面.html` + `_files/`

---

## 二、技术架构

### 2.1 技术选型理由

| 技术 | 选择 | 理由 |
|------|------|------|
| 框架 | Vue3 Composition API | 考试指定 |
| 构建 | Vite | 考试指定 |
| 样式 | SCSS scoped | 支持变量/mixin 管理设计 token，接近官网写法 |
| 动画 | GSAP + ScrollTrigger | 官网有大量滚动驱动动画，GSAP 是最佳选择 |
| 响应式 | SCSS 媒体查询 + mixin | 三档断点清晰可控 |

### 2.2 项目目录结构

```
源码/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
│   └── assets/                    # 从 D:\test 复制的图片/视频素材
│       ├── images/                # PNG/WebP/SVG
│       │   ├── kv/                # 首屏手机图
│       │   ├── color/             # 配色切换图
│       │   ├── nav/               # 产品导航图标
│       │   ├── battery/           # 电池相关图
│       │   ├── camera/            # 影像相关图
│       │   └── misc/              # 其他
│       └── videos/                # 视频（如有）
├── src/
│   ├── main.js                    # 应用入口
│   ├── App.vue                    # 根组件，组装所有 section
│   ├── styles/
│   │   ├── variables.scss         # 设计变量（颜色、间距、字号、断点）
│   │   ├── mixins.scss            # 响应式 mixin、flex 居中等
│   │   └── global.scss            # 全局重置、基础样式
│   ├── composables/
│   │   ├── useScrollAnimation.js  # GSAP ScrollTrigger 通用动画
│   │   └── useStickyNav.js        # 吸顶导航逻辑
│   ├── components/
│   │   ├── SiteHeader.vue         # 顶部一加/OPPO 导航
│   │   ├── ProductNav.vue         # 一加15T 产品导航（吸顶锚点）
│   │   ├── HeroSection.vue        # Hero 首屏
│   │   ├── DesignColor.vue        # 设计与配色
│   │   ├── NarrowBezel.vue        # 1.1mm 极窄四等边
│   │   ├── SmallScreen.vue        # 小屏手感
│   │   ├── Appearance.vue         # 设计美图
│   │   ├── DisplayScreen.vue      # 屏幕
│   │   ├── LUMOCamera.vue         # LUMO 凝光影像系统
│   │   ├── Battery.vue            # 7500mAh 冰川电池
│   │   ├── Durability.vue         # 耐用功能
│   │   ├── NotesFooter.vue        # 备注条款
│   │   └── SiteFooter.vue         # 页脚
│   └── data/
│       └── content.js             # 文案、图片路径等数据集中管理
```

---

## 三、组件拆分与模块对应

### 3.1 模块映射表

| 组件 | 对应原页面 | 核心内容 | 复杂度 |
|------|-----------|----------|--------|
| **SiteHeader** | `cmp-header` | 一加 logo + 导航项 + 购买入口（无下拉菜单） | 低 |
| **ProductNav** | `anchor-bar` | 吸顶导航：总览/设计/续航/影像/屏幕（去掉性能和系统） | 中 |
| **HeroSection** | `#section-kv` | 首屏大图 + 手机产品图 + 标语 + 购买按钮 | 中 |
| **DesignColor** | `#section-color` | 配色切换交互（点击切换手机颜色图片） | 中 |
| **NarrowBezel** | `#section-thin` | "1.1mm 超窄四等边" 大字 + 手机图 | 低 |
| **SmallScreen** | `#section-where` | 小屏手感卖点 + 图文 | 低 |
| **Appearance** | `#section-appearance` | 设计美图展示 | 低 |
| **DisplayScreen** | `#section-light` + `#section-eyes` | 屏幕参数 + 护眼 | 中 |
| **LUMOCamera** | `#section-camera` + `#section-picture` + `#section-telephoto` | 影像系统 + 样张 | 中 |
| **Battery** | `#section-battery` + `#section-battery-intro` | 7500mAh 电池卖点 | 低 |
| **Durability** | `#section-feature` | IP66/68/69/69K 防水等耐用功能 | 低 |
| **NotesFooter** | `#section-notes` | 备注条款（18条 + 免责声明） | 低 |
| **SiteFooter** | `cmp-footer` | 页脚链接 + 备案信息 | 低 |

### 3.2 跳过的模块（考试不要求）

| 原页面 section | 跳过原因 |
|----------------|----------|
| `#section-snapdragon` | 性能栏目 |
| `#section-fps-vs` | 性能栏目 |
| `#section-fps` | 性能栏目 |
| `#section-cooling` | 性能栏目 |
| `#section-dove` | 系统栏目（ColorOS 16） |
| ProductNav 中的"性能"和"系统"按钮 | 对应栏目跳过 |

### 3.3 关键交互设计

#### ProductNav 吸顶导航
- 滚动时固定在顶部（`position: sticky; top: 0`）
- 点击锚点平滑滚动到对应 section
- 当前可见 section 对应的导航项高亮
- 导航项：总览 / 设计 / 续航 / 影像 / 屏幕（5项，去掉性能和系统）

#### DesignColor 配色切换
- 底部颜色按钮组（白/黑/蓝等配色）
- 点击切换手机产品图（图片素材已在 `D:\test\...images-pack-*` 中）
- 切换时淡入淡出过渡

#### HeroSection 首屏
- 手机产品图从下方淡入
- 标语文字逐行渐入
- 购买按钮 hover 效果

---

## 四、实施阶段与时间分配

> 总计 10 小时，采用「结构优先，动画后加」策略

### 阶段 0：项目初始化（约 0.5h）

| 步骤 | 说明 |
|------|------|
| 0.1 创建 Vite + Vue3 项目 | `npm create vite@latest` |
| 0.2 安装依赖 | gsap、sass |
| 0.3 配置 vite.config.js | 路径别名、SCSS 全局变量注入 |
| 0.4 整理素材 | 从 `D:\test\_files` 复制图片到 `public/assets/images/` 并分类 |
| 0.5 搭建基础框架 | variables.scss、mixins.scss、global.scss、App.vue 骨架 |
| 0.6 验证项目启动 | `npm run dev` 能正常打开空白页 |

**交付物**：可运行的空项目 + 素材就位 + 设计变量定义完成

### 阶段 1：静态页面搭建（约 5.5h）

> 目标：所有模块建成静态组件，整页完整可渲染，基础响应式到位，不加动画

| 序号 | 组件 | 预估时间 | 优先级 |
|------|------|----------|--------|
| 1.1 | SiteHeader | 0.3h | P0 |
| 1.2 | ProductNav（结构+吸顶，不做交互） | 0.3h | P0 |
| 1.3 | HeroSection | 0.5h | P0 |
| 1.4 | DesignColor（结构+配色切换交互） | 0.6h | P0 |
| 1.5 | NarrowBezel | 0.3h | P0 |
| 1.6 | SmallScreen | 0.3h | P0 |
| 1.7 | Appearance | 0.3h | P1 |
| 1.8 | DisplayScreen | 0.5h | P0 |
| 1.9 | LUMOCamera | 0.7h | P0 |
| 1.10 | Battery | 0.4h | P0 |
| 1.11 | Durability | 0.4h | P0 |
| 1.12 | NotesFooter | 0.3h | P0 |
| 1.13 | SiteFooter | 0.3h | P1 |
| 1.14 | 响应式基础适配 | 0.3h | P0 |

**每个组件的开发流程（标准化）：**
1. 从原 HTML 提取该 section 的结构、文案、图片路径
2. 写 Vue template（语义化标签，不用 v-html）
3. 写 SCSS scoped 样式（参照原 CSS 的颜色、字号、间距值）
4. 图片用 `import` 或 `public` 路径引用
5. 在 App.vue 中组装
6. git commit（每个组件一个 commit）

**交付物**：完整可渲染的静态页面，三档断点不严重错位

**阶段 1 验收标准（80% 完成度）：**
- [ ] DOM 结构正确
- [ ] 关键 CSS 值正确（颜色、字号、间距）
- [ ] 文案正确
- [ ] 图片加载正确
- [ ] 基础响应式不崩
- [ ] `npm run build` 通过

### 阶段 2：动画与交互（约 3h）

> 目标：给关键模块加 GSAP 滚动动画和交互

| 序号 | 动画内容 | 预估时间 |
|------|----------|----------|
| 2.1 | `useScrollAnimation.js` composable 封装 | 0.3h |
| 2.2 | HeroSection 首屏入场动画 | 0.3h |
| 2.3 | 各 section 滚动触发淡入/上移动画 | 0.5h |
| 2.4 | ProductNav 吸顶 + 锚点跳转 + 高亮 | 0.5h |
| 2.5 | DesignColor 配色切换过渡动画 | 0.3h |
| 2.6 | NarrowBezel 大字标题动画 | 0.2h |
| 2.7 | LUMOCamera 样张切换/滚动动画 | 0.4h |
| 2.8 | hover 交互（按钮、卡片） | 0.3h |
| 2.9 | 动画降级处理（加载失败/不支持时） | 0.2h |

**交付物**：页面有流畅的滚动触发动画、吸顶导航、配色切换、hover 交互

### 阶段 3：收尾与交付（约 1h）

| 序号 | 任务 | 预估时间 |
|------|------|----------|
| 3.1 | 三档断点精调（1920/1024/390） | 0.2h |
| 3.2 | `npm run build` 生成 dist | 0.1h |
| 3.3 | dist 本地部署验证（`npx serve -s dist`） | 0.1h |
| 3.4 | 写 README.md | 0.2h |
| 3.5 | 导出 AI 聊天记录 | 0.1h |
| 3.6 | 打包提交（源码 + dist + AI记录） | 0.1h |
| 3.7 | 最终检查 | 0.2h |

**交付物**：完整的提交压缩包

---

## 五、动画策略

### 5.1 动画方案

| 动画类型 | 实现方式 | 应用场景 |
|----------|----------|----------|
| 滚动触发淡入 | GSAP ScrollTrigger | 所有 section 进入视口时 |
| 滚动触发上移 | GSAP ScrollTrigger + translateY | 标题、描述文字 |
| 吸顶导航 | CSS sticky + scroll 监听 | ProductNav |
| 配色切换 | CSS transition + GSAP | DesignColor |
| hover 交互 | CSS transition | 按钮、卡片 |
| 首屏入场 | GSAP timeline | HeroSection |

### 5.2 `useScrollAnimation.js` 设计

```javascript
// 通用滚动动画 composable
// 使用方式：在组件中调用
// useScrollAnimation('.animate-in', { y: 40, opacity: 0, duration: 0.8 })
```

封装 GSAP ScrollTrigger 的批量注册逻辑，避免每个组件重复写。

### 5.3 动画降级
- 图片加载失败时显示占位背景色，不出现破图
- GSAP 加载失败时页面仍可正常浏览（动画降级为无动画）
- 视频无法播放时显示 poster 图

---

## 六、响应式方案

### 6.1 断点定义

```scss
// variables.scss
$breakpoint-pc: 1920px;    // 桌面
$breakpoint-pad: 1024px;   // 平板
$breakpoint-mo: 390px;     // 手机

// mixins.scss
@mixin pc { @media (min-width: 1200px) { ... } }
@mixin pad { @media (min-width: 768px) and (max-width: 1199px) { ... } }
@mixin mo { @media (max-width: 767px) { ... } }
```

### 6.2 响应式策略

| 断点 | 布局变化 |
|------|----------|
| 1920px | 完整桌面布局，最大宽度 1440px 居中 |
| 1024px | 平板布局，部分多列改双列或单列 |
| 390px | 手机布局，全部单列，字号缩小，间距压缩 |

### 6.3 原页面响应式参考
原 HTML 使用了 `pc:` / `pad:` / `mo:` 前缀的 Tailwind 类来区分三档断点，我们可以从原 CSS 中提取具体的断点样式值。

---

## 七、素材管理

### 7.1 已有素材（D:\test）

| 素材类型 | 文件 | 用途 |
|----------|------|------|
| 首屏手机图 | `images-kv-phone-*.png` | HeroSection |
| 配色图 | `images-pack-3586_*` / `images-pack-3592_*` / `images-pack-3593_*` | DesignColor |
| 导航图标 | `images-nav-*-1-*.svg` + `images-nav-*-highlight-*.svg` | ProductNav |
| 阴影图 | `images-kv-shadow-pc-*.webp` | HeroSection |
| ColorOS 图 | `images-kv-coloros-*.webp` | （系统栏目跳过，不用） |
| 海报图 | `videos-kv-pre-pc_poster-*.webp` | 视频海报 |
| 暗光图 | `images-dim-light-*.webp` | 影像/屏幕 |
| 薄手机图 | `images-thin-phone-*.webp` | NarrowBezel |
| 备案图标 | `badge.png` / `cnnic.png` / `51638e8f*.png` | Footer |

### 7.2 素材处理流程
1. 从 `D:\test\一加 15T 又小又强又美又全面_files\` 复制需要的图片到 `public/assets/images/`
2. 按用途分类到子目录（kv/、color/、nav/、battery/、camera/、misc/）
3. 在 `data/content.js` 中集中管理图片路径
4. 如发现缺少素材，从原页面 URL 下载补充

### 7.3 可能缺失的素材
- 电池 section 的图片
- 影像样张图片
- 耐用功能（防水）图片
- 屏幕相关图片

> 遇到缺失素材时，我会告诉你具体需要哪张图、从哪个 URL 下载。

---

## 八、提交结构

最终压缩包解压后根目录：

```
提交包/
├── 源码/                    # 完整项目源码
│   ├── package.json
│   ├── vite.config.js
│   ├── README.md
│   ├── public/
│   ├── src/
│   └── ...
├── dist/                    # npm run build 产物
│   ├── index.html
│   ├── assets/
│   └── ...
└── AI记录/                  # AI 聊天记录
    ├── 聊天记录.md (或 .html)
    └── 相关文档/
```

### 8.1 README.md 需包含
- 项目结构说明
- 组件拆分说明
- 主要动画与交互方案
- 响应式方案
- 资源来源与处理方式
- AI 辅助生成页面的实现思路
- 运行方式（npm install / npm run dev / npm run build）

---

## 九、风险管理

| 风险 | 应对 |
|------|------|
| 时间不够 | 优先完成 P0 模块，P1 模块（Appearance、SiteFooter）可简化 |
| 动画调试耗时 | 阶段1不做任何动画，阶段2统一加，单个动画超时30分钟先跳过 |
| 素材缺失 | 用原页面同源 URL 补充下载，不用占位图 |
| GSAP 不熟悉 | AI 编写全部 GSAP 代码，用户负责验收反馈 |
| 响应式问题 | 阶段1做基础适配，阶段3集中精调 |

---

## 十、AI 协作规范

### 10.1 每个阶段的 AI 协作方式

| 阶段 | AI 职责 | 用户职责 |
|------|---------|----------|
| 初始化 | 生成项目骨架、配置文件 | 验证项目能运行 |
| 静态页面 | 从 HTML 提取结构、写 Vue 组件和 SCSS | 对照官网检查还原度 |
| 动画 | 编写 GSAP 动画代码 | 验收动画效果，提供精确反馈 |
| 收尾 | 写 README、排查问题 | 最终验收、打包提交 |

### 10.2 反馈规范（参考经验分享文档）
反馈时应包含：
- **位置**：哪个 section / 哪个元素
- **当前表现**：现在是什么样
- **期望表现**：应该是什么样
- **差异值**：字号、颜色、间距、位置等具体数值
- **证据**：截图路径 / 参考 CSS 值

### 10.3 Git 规范
- 每完成一个组件就 commit
- commit message 格式：`feat: 完成 XxxSection 组件` / `fix: 修复 XxxSection 响应式问题`
- 复杂动画前拉新分支，改好了再合并

### 10.4 聊天记录导出
- 每完成一个关键阶段用 `/export` 导出聊天记录
- 最终汇总到 `AI记录/` 目录

---

## 十一、验收检查清单

### 11.1 功能验收
- [ ] 顶部导航栏正常显示
- [ ] 产品导航吸顶 + 锚点跳转
- [ ] Hero 首屏完整渲染
- [ ] 设计配色切换交互正常
- [ ] 1.1mm 四等边模块显示
- [ ] 小屏手感模块显示
- [ ] 屏幕模块显示
- [ ] 影像模块显示
- [ ] 电池模块显示
- [ ] 耐用功能模块显示
- [ ] 备注与底部信息显示

### 11.2 响应式验收
- [ ] 1920px 布局正常
- [ ] 1024px 布局正常
- [ ] 390px 布局正常
- [ ] 无严重错位、内容遮挡或关键信息丢失

### 11.3 动画验收
- [ ] 滚动触发动画流畅
- [ ] 吸顶导航正常
- [ ] 配色切换过渡平滑
- [ ] hover 交互生效
- [ ] 无明显卡顿、闪烁、黑屏、空白

### 11.4 工程验收
- [ ] `npm install` 正常
- [ ] `npm run build` 生成 dist
- [ ] dist 可部署到静态服务
- [ ] README.md 完整
- [ ] AI 聊天记录完整
- [ ] 未使用 v-html / innerHTML / iframe 嵌入原站

---

## 十二、执行顺序总览

```
阶段0 (0.5h)                阶段1 (5.5h)                 阶段2 (3h)              阶段3 (1h)
┌─────────────┐    ┌─────────────────────────┐    ┌──────────────────┐    ┌───────────────┐
│ 项目初始化   │ -> │ 13个组件静态搭建         │ -> │ GSAP动画+交互    │ -> │ 收尾交付       │
│ 素材整理     │    │ 响应式基础适配           │    │ 吸顶导航         │    │ 精调+build     │
│ 基础框架     │    │ build 通过              │    │ 配色切换         │    │ README         │
└─────────────┘    └─────────────────────────┘    └──────────────────┘    └───────────────┘
                          │
                          └──> 每个组件完成都 git commit
```
