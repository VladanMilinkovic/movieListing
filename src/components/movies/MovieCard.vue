<template>
  <div class="card">
    <div class="card-content">
      <h3 class="title">{{ movie.Title }}</h3>
      <div class="description">
        <p><strong>Year:</strong> {{ movie.Year }}</p>
        <p><strong>IMDb ID:</strong> {{ movie.imdbID }}</p>
      </div>
    </div>
    <div class="card-actions">
      <button @click="toggleFavorite" class="star-button">
        <span v-if="isFavorite">★</span>
        <span v-else>☆</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Movie } from "@/api/movies/types.ts";
import { useMovieStore } from "@/store/movies";

const props = defineProps<{
  movie: Movie
}>()

const MovieStore = useMovieStore()

const isFavorite = computed(() => MovieStore.isFavorite(props.movie.imdbID))

const toggleFavorite = () => {
  MovieStore.toggleFavorite(props.movie)
}
</script>
