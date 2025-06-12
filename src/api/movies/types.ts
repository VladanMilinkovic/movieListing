export interface Movie {
    Title: string
    Year: number | string
    imdbID: string
}

export interface MovieApiResponse {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: Movie[]
}
