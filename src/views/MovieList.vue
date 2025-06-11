<template>
  <div class="movie-list-wrapper">
    <SearchBar />
    <div class="movie-list">
      <div class="movie-list-header">
        <div class="movie-list-header-title">All Movies Available</div>
      </div>
      <div class="movie-list-items">
        <MovieCard
            v-for="movie in movies"
            :key="movie.imdbID"
            :movie="movie"
        />
      </div>
      <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          :total-results="totalResults"
          :per-page="10"
          @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useMovieStore } from '@/store/movies';
import MovieCard from "@/components/movies/MovieCard.vue";
import Pagination from "@/components/common/Pagination.vue";
import SearchBar from "@/components/common/SearchBar.vue";

const MovieStore = useMovieStore()

const movies = computed(() => {
  return MovieStore.getMovies;
});

const currentPage = computed(() => {
  return MovieStore.getCurrentPage;
})

const totalPages = computed(() => {
  return MovieStore.getTotalPages;
})

const totalResults = computed(() => {
  return MovieStore.getTotalResults;
})

const handlePageChange = (page: number) => {
  MovieStore.setCurrentPage(page)
  MovieStore.fetchMovies()
}
onMounted(() => {
  MovieStore.fetchMovies()
})
</script>

