<!-- 根组件：组装所有页面模块，按从上到下顺序渲染 -->
<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import ProductNav from '@/components/ProductNav.vue'
import HeroSection from '@/components/HeroSection.vue'
import OverviewSection from '@/components/OverviewSection.vue'
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
import { useScrollAnimation } from '@/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <div id="app">
    <SiteHeader />
    <ProductNav />
    <main>
      <div id="section-kv">
        <HeroSection />
      </div>
      <div id="section-overview">
        <OverviewSection />
      </div>
      <div id="section-color">
        <DesignColor />
      </div>
      <div id="section-thin">
        <NarrowBezel />
      </div>
      <div id="section-where">
        <SmallScreen />
      </div>
      <div id="section-appearance">
        <Appearance />
      </div>
      <div id="section-light">
        <DisplayScreen />
      </div>
      <div id="section-camera">
        <LUMOCamera />
      </div>
      <div id="section-battery">
        <Battery />
      </div>
      <div id="section-feature">
        <Durability />
      </div>
    </main>
    <NotesFooter />
    <SiteFooter />
  </div>
</template>

<style scoped></style>
