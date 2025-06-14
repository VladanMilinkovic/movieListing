import { defineStore } from 'pinia'
import type {IMoviesStore} from "./types.ts";
import type { Movie, MovieApiResponse } from "@/api/movies/types.ts";
import {searchMovies} from "@/api/movies";

export const useMovieStore = defineStore("movieStore", {
    state: (): IMoviesStore => ({
        movies: [],
        favorites: [],
        searchTerm: '',
        currentPage: 1,
        totalPages: 0,
        totalResults: 0
    }),
    getters: {
        getMovies: (state) => state.movies,
        getFavoriteMovies: (state) => state.favorites,
        getCurrentPage: (state) => state.currentPage,
        getTotalPages: (state) => state.totalPages,
        getTotalResults: (state) => state.totalResults,
        getSearchTerm: (state) => state.searchTerm
    },
    actions: {
        async fetchMovies() {
            const response = await searchMovies(this.searchTerm, this.currentPage)
            this.updateMovies(response)
        },
        updateMovies(response: MovieApiResponse) {
            this.movies = response.data;
            this.currentPage = response.page
            this.totalPages = response.total_pages
            this.totalResults = response.total
        },
        setSearchTerm(term: string) {
            this.searchTerm = term
        },

        setCurrentPage(page: number) {
            this.currentPage = page
        },
        toggleFavorite(movie: Movie) {
            const exists = this.favorites.find((m) => m.imdbID === movie.imdbID)
            if (exists) {
                this.favorites = this.favorites.filter((m) => m.imdbID !== movie.imdbID)
            } else {
                this.favorites.push(movie)
            }

            localStorage.setItem('favorites', JSON.stringify(this.favorites))
        },
        isFavorite(movieId: string): boolean {
            return this.favorites.some((m) => m.imdbID === movieId)
        },
        loadFavoritesFromStorage() {
            const data = localStorage.getItem('favorites')
            if (data) {
                this.favorites = JSON.parse(data)
            }
        }
    },
});
