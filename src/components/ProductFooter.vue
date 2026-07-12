<!-- 页脚：4列产品导航 + 客服/社交 + 版权备案 -->
<script setup>
import { ref } from 'vue'

const serviceOpen = ref(false)

const footerCols = [
  {
    title: '一加产品',
    items: [
      '一加 Turbo 6X Pro',
      '一加 Turbo 6X',
      '一加 Ace 6 至尊版',
      '一加 15T',
      '一加 Turbo 6',
      '一加 Turbo 6V',
      '一加 Ace 6T',
      '一加 15',
      '一加 Ace 6',
      '一加 13T',
      '一加 13',
      '一加 Ace 5 至尊版',
      '一加 Ace 5 竞速版',
      '一加 Ace 5 Pro',
      '一加 Ace 5',
      '查看全部手机',
    ],
  },
  {
    title: '配件',
    items: [
      '一加平板 3 Pro',
      '一加平板 2 Pro',
      '一加平板 2 Pro 智能触控键盘',
      '一加智能手写笔 2 Pro',
      '一加平板 2 智能触控键盘',
      '一加智能手写笔 2',
      '一加平板',
      '一加 Buds Ace 3',
      '一加 Buds Ace 2',
      '一加 Buds 4',
      '一加 Buds 3',
      '一加 40W 超级冰点磁吸散热器',
      '一加 磁吸冰冰卡',
      '一加散热背夹',
      '一加 100W 超级闪充移动电源',
      '查看全部配件',
    ],
  },
  {
    title: '关于一加',
    items: ['了解一加', 'ColorOS', 'HydrogenOS', '云服务', '预置应用公示', '欢太'],
  },
  {
    title: '服务支持',
    items: ['购买保障', '真伪及保修期查询', '进网许可标志呈现', '维修价格', '寄修服务', '服务中心', '维修进度', '联系我们', '电器电子产品中有害物质含有信息表', 'Plus Lock'],
  },
]

const legalLinks = ['隐私政策', '儿童个人信息保护政策', '用户协议', '竞赛规则', '知识产权政策', '安全问题反馈']
</script>

<template>
  <footer class="product-footer" id="footer">
    <!-- ====== 第一部分：4 列产品导航 ====== -->
    <div class="footer-nav">
      <div v-for="col in footerCols" :key="col.title" class="footer-col">
        <h3 class="col-title">{{ col.title }}</h3>
        <ul class="col-list">
          <li v-for="item in col.items" :key="item" class="col-item">
            <a href="#">{{ item }}</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- ====== 第二部分：客服 / 社交 / 语言 ====== -->
    <div class="footer-service">
      <div class="service-left">
        <!-- 查找零售店 -->
        <a href="#" class="store-link">更多选购方式，请<span class="store-highlight">查找零售店</span></a>

        <!-- 客服下拉按钮 -->
        <div class="service-dropdown" @click="serviceOpen = !serviceOpen">
          <span class="service-trigger">遇到问题？请联系我们 <span class="arrow" :class="{ open: serviceOpen }">▾</span></span>
          <div v-show="serviceOpen" class="service-menu">
            <a href="#" class="service-menu-item">在线客服</a>
            <a href="#" class="service-menu-item">电话</a>
          </div>
        </div>
      </div>

      <!-- 社交 + 语言 -->
      <div class="service-right">
        <div class="social-icons">
          <a href="#" class="social-icon wechat" title="微信">微信</a>
          <a href="#" class="social-icon weibo" title="微博">微博</a>
        </div>
        <a href="#" class="lang-switch">
          中国大陆 (简体中文) <span class="globe-icon">🌐</span>
        </a>
      </div>
    </div>

    <!-- 分割线 -->
    <div class="footer-divider" />

    <!-- ====== 第三部分：版权备案（左右布局） ====== -->
    <div class="footer-bottom">
      <!-- 左下角：政策链接 + 备案 + 认证图标 -->
      <div class="bottom-left">
        <div class="legal-row">
          <span v-for="(link, i) in legalLinks" :key="link" class="legal-item">
            <a href="#">{{ link }}</a>
            <span v-if="i < legalLinks.length - 1" class="legal-sep">|</span>
          </span>
        </div>
        <div class="beian-row">
          <span>粤ICP备13080605号</span>
          <span class="beian-sep">|</span>
          <span>备案主体编号: 44201910955995</span>
          <span class="beian-sep">|</span>
          <span>粤公网安备 44030402001407号</span>
        </div>
        <div class="badge-row">
          <span class="badge">公安备案</span>
          <span class="badge">营业执照</span>
          <span class="badge">可信网站</span>
        </div>
      </div>

      <!-- 右下角：语言切换 -->
      <div class="bottom-right">
        <a href="#" class="lang-bottom">
          中国大陆 (简体中文) <span class="globe-icon">🌐</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.product-footer {
  width: 100%;
  background: $color-black;
  padding: 64px 64px 0;

  @include pad { padding: 48px 24px 0; }
  @include mo { padding: 32px 16px 0; }
}

// ====== 第一部分：4 列导航 ======
.footer-nav {
  display: flex;
  max-width: 1440px;
  margin: 0 auto 48px;

  @include pad { flex-wrap: wrap; margin-bottom: 32px; }
  @include mo { flex-direction: column; margin-bottom: 24px; }
}

.footer-col {
  flex: 1;

  .col-title {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 12px;
  }

  .col-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .col-item a {
    font-size: 13px;
    line-height: 2.2;
    color: rgba(255, 255, 255, 0.55);
    text-decoration: none;
    transition: color 0.2s;

    &:hover { color: rgba(255, 255, 255, 0.95); }
  }
}

// ====== 第二部分：客服 / 社交 / 语言 ======
.footer-service {
  max-width: 1440px;
  margin: 0 auto 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @include mo {
    flex-direction: column;
    gap: 16px;
  }
}

.service-left {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .store-link {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.55);
    text-decoration: none;

    .store-highlight {
      color: rgb(0, 153, 204);
    }
  }

  .service-dropdown {
    position: relative;
    cursor: pointer;
  }

  .service-trigger {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.55);

    .arrow {
      display: inline-block;
      transition: transform 0.2s;
      font-size: 12px;

      &.open { transform: rotate(180deg); }
    }
  }

  .service-menu {
    position: absolute;
    bottom: 100%;
    left: 0;
    margin-bottom: 8px;
    background: #222;
    border-radius: 6px;
    overflow: hidden;
    min-width: 120px;
    z-index: 10;

    .service-menu-item {
      display: block;
      padding: 10px 16px;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.75);
      text-decoration: none;
      transition: background 0.2s;

      &:hover { background: rgba(255, 255, 255, 0.1); }
    }
  }
}

.service-right {
  display: flex;
  align-items: center;
  gap: 24px;

  .social-icons {
    display: flex;
    gap: 16px;
  }

  .social-icon {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.55);
    text-decoration: none;
    transition: color 0.2s;

    &:hover { color: rgba(255, 255, 255, 0.95); }
  }

  .lang-switch {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.55);
    text-decoration: none;
    transition: color 0.2s;

    &:hover { color: rgba(255, 255, 255, 0.95); }

    .globe-icon { font-size: 14px; margin-left: 4px; }
  }
}

// 分割线
.footer-divider {
  max-width: 1440px;
  margin: 0 auto;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

// ====== 第三部分：版权备案（左右） ======
.footer-bottom {
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @include mo {
    flex-direction: column;
    gap: 16px;
  }
}

.bottom-left {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .legal-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .legal-item {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.55);

      a {
        color: inherit;
        text-decoration: none;
        &:hover { color: rgba(255, 255, 255, 0.95); }
      }
    }

    .legal-sep {
      margin: 0 8px;
      opacity: 0.2;
    }
  }

  .beian-row {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.45);
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .beian-sep {
      margin: 0 8px;
      opacity: 0.3;
    }
  }

  .badge-row {
    display: flex;
    gap: 12px;
    margin-top: 4px;

    .badge {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 4px;
      padding: 2px 8px;
    }
  }
}

.bottom-right {
  .lang-bottom {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.55);
    text-decoration: none;
    transition: color 0.2s;

    &:hover { color: rgba(255, 255, 255, 0.95); }

    .globe-icon { font-size: 14px; margin-left: 4px; }
  }
}
</style>
