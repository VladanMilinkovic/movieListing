<template>
  <div class="movies">
    <SideNav />
    <main class="main-content">
      <div class="page">
        <router-view />
      </div>
      <AppFooter />
    </main>
  </div>
</template>

<script lang="ts" setup>
import SideNav from "@/components/layout/SideNav.vue";
import AppFooter from '@/components/layout/Footer.vue';
</script>
