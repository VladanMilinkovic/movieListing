<template>
  <section class="favorites">
    <div class="favorites-header">
      <h2 class="favorites-header--title">My Favorite Movies</h2>
      <button class="hamburger" @click="toggleSideBar">☰</button>
    </div>
    <div v-if="favoritesMovies.length" class="favorites-items">
      <MovieCard
          v-for="movie in favoritesMovies"
          :key="movie.imdbID"
          :movie="movie"
          :favorites="true"
      />
    </div>
    <p v-else class="no-items">No favorite movies have been added.</p>
  </section>
</template>

<script setup lang="ts">
import MovieCard from "@/components/movies/MovieCard.vue";
import {useMovieStore} from "@/store/movies";
import {computed} from "vue";

const MovieStore = useMovieStore()

const favoritesMovies = computed(() => {
  return MovieStore.getFavoriteMovies;
});

const toggleSideBar = () => {
  const body = document.body;
  body.classList.toggle("mobile-nav");
};
</script>
