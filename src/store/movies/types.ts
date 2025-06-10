import type {Movie} from "../../api/movies/types.ts";

export interface IMoviesStore {
    movies: Movie[];
    favorites: Movie[];
    searchTerm: string;
    currentPage: number;
    totalPages: number;
    totalResults: number;
}
