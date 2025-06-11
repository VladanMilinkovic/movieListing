<!-- src/components/SearchBar/SearchBar.vue -->
<template>
  <div class="search-bar">
    <input
        type="text"
        v-model="searchInput"
        placeholder="Search movies..."
        @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMovieStore } from '@/store/movies'

const searchInput = ref('')
const MovieStore = useMovieStore()

let timeout: ReturnType<typeof setTimeout> | null = null

const handleInput = () => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    MovieStore.setSearchTerm(searchInput.value)
    MovieStore.setCurrentPage(1)
  }, 400) // debounce
}
</script>

