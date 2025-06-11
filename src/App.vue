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
import { onMounted } from "vue";
import SideNav from "@/components/layout/SideNav.vue";
import AppFooter from '@/components/layout/Footer.vue';

import { useMovieStore } from '@/store/movies'

onMounted(() => {
  const MovieStore = useMovieStore()
  MovieStore.loadFavoritesFromStorage()
})
</script>
