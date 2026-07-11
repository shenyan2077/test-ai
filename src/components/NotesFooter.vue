<!-- 备注条款：页面底部的数据备注和免责声明 -->
<script setup>
// 备注条款模块：页面底部数据说明
const notes = [
  '¹ 数据来源于一加实验室，实际使用中可能因环境、使用方式等因素有所不同。',
  '² 屏幕参数为产品硬件配置，实际显示效果可能因使用环境有所不同。',
  '³ 电池容量典型值为 7500mAh，额定容量可能略有差异。',
  '⁴ IP68/IP69 防护等级基于特定测试条件，不代表永久防护，请勿故意浸泡。',
]
</script>

<template>
  <section class="notes-footer">
    <div class="notes-inner">
      <p v-for="(note, i) in notes" :key="i" class="note-line">{{ note }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.notes-footer {
  width: 100%;
  background: $color-white;
  padding: 40px 0;

  .notes-inner {
    max-width: $max-width;
    width: 100%;
    padding: 0 64px;

    @include mo {
      padding: 0 16px;
    }
  }

  .note-line {
    font-size: 12px;
    line-height: 1.8;
    color: $color-text-secondary;

    @include mo {
      font-size: 11px;
    }
  }
}
</style>
