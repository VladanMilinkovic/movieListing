<template>
  <div class="search-bar">
    <div class="search-bar-items">
      <input
          type="text"
          v-model="searchInput"
          placeholder="Search movies..."
          @input="handleInput"
      />
      <button
          class="clear-button"
          :disabled="!searchInput.trim()"
          @click="clearSearchHandler"
      >
        Clear
      </button>
    </div>
    <button class="hamburger" @click="toggleSideBar">☰</button>
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue'
import { useMovieStore } from '@/store/movies'

const searchInput = ref('')
const MovieStore = useMovieStore()

let timeout: ReturnType<typeof setTimeout> | null = null

const handleInput = () => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    MovieStore.setSearchTerm(searchInput.value)
    MovieStore.setCurrentPage(1)
    MovieStore.fetchMovies()
  }, 400)
}

const clearSearchHandler = () => {
  searchInput.value = ''
  MovieStore.setSearchTerm('')
  MovieStore.setCurrentPage(1)
  MovieStore.fetchMovies()
}

const toggleSideBar = () => {
  const body = document.body;
  body.classList.toggle("mobile-nav");
};
</script>

