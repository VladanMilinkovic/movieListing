<template>
  <section class="side-nav">
    <h1 class="side-nav-title">Movies List</h1>
    <div class="side-nav-separator"></div>
    <ul class="side-nav-menu">
      <li class="side-nav-item">
        <router-link
            to="/"
            class="nav-link"
            :class="{ active: isActive('/') }"
        >
          Movies
        </router-link>
      </li>
      <li class="side-nav-item">
        <router-link
            to="/favorites"
            class="nav-link"
            :class="{ active: isActive('/favorites') }"
        >
          Favorites
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path: string) => {
  return route.path === path
}
</script>

