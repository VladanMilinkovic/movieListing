import { apiClient } from '../index'
import { type MovieApiResponse } from "./types.ts";

export const searchMovies = async (title: string, page = 1): Promise<MovieApiResponse> => {
    const response = await apiClient.get('/api/movies/search/', {
        params: {
            Title: title,
            page: page,
        },
    })
    return response.data
}
