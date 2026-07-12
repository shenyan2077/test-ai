<!-- 遇到问题？请联系我们 — 客服悬浮弹窗 -->
<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const contactItems = [
  {
    title: '在线客服',
    icon: 'https://opsg-img-cdn-gl.heytapimg.com/epb/202210/12/NujgdjSAIGaFvgnH.svg',
    link: 'https://ccp.oppo.com/client?k=035563bc1ce6030be68ed2209645f010&wp=1&robotShuntSwitch=1&robotId=13&shuntId=0&language=zh-cn&templateId=108&sysnum=9f06d',
  },
  {
    title: '电话',
    icon: 'https://image01-in.oneplus.net/media/202407/01/7e4ff75b93fa0dc52df45f83eebcf3c2.svg',
    link: 'tel:+86 95018',
  },
]

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}
</script>

<template>
  <div class="contact-support" @mouseleave="close">
    <button class="contact-trigger" @click="toggle" @mouseenter="isOpen = true">
      <span>遇到问题？请联系我们</span>
      <svg
        class="chevron"
        :class="{ open: isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <path
          clip-rule="evenodd"
          d="M13 10.4102L7.74996 15.916L6.88886 15.0111L11.6666 9.99936L6.88886 4.98766L7.74996 4.08269L13 9.58854C13.2201 9.81543 13.2201 10.1833 13 10.4102Z"
          fill="currentColor"
        />
      </svg>
    </button>

    <Transition name="fade">
      <div v-show="isOpen" class="contact-popup">
        <a
          v-for="item in contactItems"
          :key="item.title"
          :href="item.link"
          target="_blank"
          class="contact-item"
        >
          <div class="item-left">
            <img :src="item.icon" :alt="item.title" class="item-icon" />
            <span class="item-title">{{ item.title }}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              clip-rule="evenodd"
              d="M13 10.4102L7.74996 15.916L6.88886 15.0111L11.6666 9.99936L6.88886 4.98766L7.74996 4.08269L13 9.58854C13.2201 9.81543 13.2201 10.1833 13 10.4102Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.contact-support {
  position: relative;
  display: inline-flex;
}

.contact-trigger {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.55);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  transition: color 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.95);
  }

  .chevron {
    color: inherit;
    transition: transform 0.2s;
    flex-shrink: 0;

    &.open {
      transform: rotate(90deg);
    }
  }
}

.contact-popup {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  background: #222;
  border-radius: 8px;
  overflow: hidden;
  min-width: 160px;
  z-index: 100;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.95);
  }

  .item-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .item-icon {
    width: 20px;
    height: 20px;
  }

  .item-title {
    font-size: 14px;
  }

  svg {
    color: rgba(255, 255, 255, 0.4);
    flex-shrink: 0;
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
