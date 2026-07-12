<!-- 根组件：组装所有页面模块，按总览/设计/续航/影像/屏幕从上到下顺序渲染 -->
<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import ProductNav from '@/components/ProductNav.vue'
import HeroSection from '@/components/HeroSection.vue'
import OverviewSection from '@/components/OverviewSection.vue'
import DesignColor from '@/components/DesignColor.vue'
import NarrowBezel from '@/components/NarrowBezel.vue'
import SmallScreen from '@/components/SmallScreen.vue'
import Appearance from '@/components/Appearance.vue'
import Battery from '@/components/Battery.vue'
import LUMOCamera from '@/components/LUMOCamera.vue'
import CameraSamples from '@/components/CameraSamples.vue'
import MasterPortrait from '@/components/MasterPortrait.vue'
import LivePhoto from '@/components/LivePhoto.vue'
import AIFeatures from '@/components/AIFeatures.vue'
import RotatingScreen from '@/components/RotatingScreen.vue'
import ScreenParams from '@/components/ScreenParams.vue'
import DarkNightDisplay from '@/components/DarkNightDisplay.vue'
import EyeProtection from '@/components/EyeProtection.vue'
import DimLightEye from '@/components/DimLightEye.vue'
import MoreFeatures from '@/components/MoreFeatures.vue'
import ContactSupport from '@/components/ContactSupport.vue'
import ProductFooter from '@/components/ProductFooter.vue'
import BottomNav from '@/components/BottomNav.vue'
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
      <!-- 总览 -->
      <div id="section-kv"><HeroSection /></div>
      <OverviewSection />

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
    <ContactSupport />
    <NotesFooter />
    <ProductFooter />
    
  </div>
</template>

<style scoped></style>
