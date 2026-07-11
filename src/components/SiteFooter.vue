<!-- 页脚：品牌信息、备案号、认证标识等 -->
<script setup>
// 页脚模块：底部品牌信息和备案
const footerLinks = [
  { label: '手机', items: ['一加 15T', '一加 15', '一加 Ace 5'] },
  { label: '配件', items: ['耳机', '充电器', '保护壳'] },
  { label: '服务', items: ['购买须知', '配送说明', '售后服务'] },
  { label: '关于', items: ['品牌故事', '新闻动态', '加入我们'] },
]
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-main">
        <div class="footer-brand">
          <div class="brand-name">OnePlus</div>
          <p class="brand-slogan">Never Settle</p>
        </div>
        <div class="footer-links">
          <div v-for="group in footerLinks" :key="group.label" class="link-group">
            <h4 class="link-title">{{ group.label }}</h4>
            <ul class="link-list">
              <li v-for="item in group.items" :key="item" class="link-item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="certifications">
          <img src="/assets/images/misc/badge.png" alt="认证标识" class="cert-img" />
          <img src="/assets/images/misc/cnnic.png" alt="CNNIC" class="cert-img" />
        </div>
        <div class="legal-info">
          <p class="legal-line">© 2026 OnePlus. All Rights Reserved.</p>
          <p class="legal-line">粤ICP备XXXXXXXX号</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  width: 100%;
  background: $color-black;
  padding: 64px 0 32px;

  .footer-inner {
    max-width: $max-width;
    width: 100%;
    padding: 0 64px;
    margin: 0 auto;

    @include mo {
      padding: 0 16px;
    }
  }

  .footer-main {
    display: flex;
    justify-content: space-between;
    gap: 64px;
    padding-bottom: 48px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    @include mo {
      flex-direction: column;
      gap: 32px;
    }
  }

  .footer-brand {
    .brand-name {
      font-size: 32px;
      font-weight: 700;
      color: $color-white;
    }

    .brand-slogan {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 8px;
    }
  }

  .footer-links {
    display: flex;
    gap: 64px;

    @include mo {
      flex-wrap: wrap;
      gap: 32px;
    }

    .link-group {
      .link-title {
        font-size: 14px;
        font-weight: 600;
        color: $color-white;
        margin-bottom: 16px;
      }

      .link-list {
        list-style: none;
        padding: 0;
        margin: 0;

        .link-item {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 2;
          cursor: pointer;
          transition: color 0.2s;

          &:hover {
            color: $color-white;
          }
        }
      }
    }
  }

  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 32px;

    @include mo {
      flex-direction: column;
      gap: 16px;
    }

    .certifications {
      display: flex;
      gap: 12px;

      .cert-img {
        height: 32px;
        opacity: 0.6;
      }
    }

    .legal-info {
      text-align: right;

      @include mo {
        text-align: center;
      }

      .legal-line {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.4);
        line-height: 1.8;
      }
    }
  }
}
</style>
