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
import {computed, ref} from 'vue'
import { useMovieStore } from '@/store/movies'
import {searchMovies} from "@/api/movies";

const searchInput = ref('')
const MovieStore = useMovieStore()

const currentPage = computed(() => {
  return MovieStore.getCurrentPage;
})

const searchTerm = computed(() => {
  return MovieStore.getSearchTerm;
})

const fetchMovies = async () => {
  const response = await searchMovies(searchTerm.value || '', currentPage.value)
  MovieStore.updateMovies(response)
}

let timeout: ReturnType<typeof setTimeout> | null = null

const handleInput = () => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    MovieStore.setSearchTerm(searchInput.value)
    MovieStore.setCurrentPage(1)
    MovieStore.fetchMovies()
  }, 400) // debounce
}
</script>

