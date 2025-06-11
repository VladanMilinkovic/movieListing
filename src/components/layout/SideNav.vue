<template>
  <div v-if="showMobileNav" class="mask" @click="closeSidebar"></div>
  <section class="side-nav" :class="{ open: showMobileNav }">
    <div class="side-nav-header">
      <h1 class="side-nav-title">Movies List</h1>
      <button class="close-btn" v-if="isSmallDevice" @click="closeSidebar">✕</button>
    </div>
    <div class="side-nav-separator"></div>
    <ul class="side-nav-menu">
      <li class="side-nav-item">
        <router-link
            to="/"
            class="nav-link"
            :class="{ active: isActive('/') }"
            @click="handleLinkClick"
        >
          Movies
        </router-link>
      </li>
      <li class="side-nav-item">
        <router-link
            to="/favorites"
            class="nav-link"
            :class="{ active: isActive('/favorites') }"
            @click="handleLinkClick"
        >
          Favorites
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useRoute } from 'vue-router'

const route = useRoute()
const showMobileNav = ref(false)
const isSmallDevice = ref(false)

const isActive = (path: string) => {
  return route.path === path
}

const updateSidebarState = () => {
  showMobileNav.value = document.body.classList.contains('mobile-nav')
}

const closeSidebar = () => {
  document.body.classList.remove('mobile-nav')
  showMobileNav.value = false
}

const handleLinkClick = () => {
  if (isSmallDevice.value) {
    closeSidebar()
  }
}


onMounted(() => {
  updateSidebarState()

  const checkDeviceSize = () => {
    isSmallDevice.value = window.innerWidth <= 980
  }

  checkDeviceSize()
  window.addEventListener('resize', checkDeviceSize)

  const observer = new MutationObserver(updateSidebarState)
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener('resize', checkDeviceSize)
  })
})
</script>

