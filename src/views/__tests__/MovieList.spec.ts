import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MovieList from '@/views/MovieList.vue'
import MovieCard from '@/components/movies/MovieCard.vue'
import Pagination from '@/components/common/Pagination.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import { useMovieStore } from '@/store/movies'

describe('MovieList Component', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    it('renders the component with all subcomponents', () => {
        const wrapper = mount(MovieList)

        expect(wrapper.findComponent(SearchBar).exists()).toBe(true)
        expect(wrapper.find('.movie-list-header-title').text()).toBe('All Movies Available')
        expect(wrapper.findComponent(Pagination).exists()).toBe(true)
    })

    it('displays "No movies" message when movies list is empty', () => {
        const movieStore = useMovieStore()
        movieStore.movies = []

        const wrapper = mount(MovieList)

        expect(wrapper.find('.no-items').exists()).toBe(true)
        expect(wrapper.find('.no-items').text()).toBe('No movies match the selected search criteria.')
        expect(wrapper.findAllComponents(MovieCard)).toHaveLength(0)
    })

    it('displays MovieCard components when movies exist', () => {
        const movieStore = useMovieStore()
        movieStore.movies = [
            { imdbID: '1', Title: 'Movie 1', Year: '2020' },
            { imdbID: '2', Title: 'Movie 2', Year: '2021' },
        ]

        const wrapper = mount(MovieList)

        expect(wrapper.find('.no-items').exists()).toBe(false)
        const movieCards = wrapper.findAllComponents(MovieCard)
        expect(movieCards.length).toBe(2)
        expect(movieCards[0].props('movie')).toEqual(movieStore.movies[0])
        expect(movieCards[1].props('movie')).toEqual(movieStore.movies[1])
    })

    it('calls fetchMovies on mount', async () => {
        const movieStore = useMovieStore()
        movieStore.fetchMovies = vi.fn()

        mount(MovieList)

        expect(movieStore.fetchMovies).toHaveBeenCalledTimes(1)
    })

    it('passes correct props to Pagination component', () => {
        const movieStore = useMovieStore()
        movieStore.currentPage = 2
        movieStore.totalPages = 5
        movieStore.totalResults = 50

        const wrapper = mount(MovieList)
        const pagination = wrapper.findComponent(Pagination)

        expect(pagination.props('currentPage')).toBe(2)
        expect(pagination.props('totalPages')).toBe(5)
        expect(pagination.props('totalResults')).toBe(50)
        expect(pagination.props('perPage')).toBe(10)
    })

    it('handles page change events from Pagination', async () => {
        type MockableStore = {
            [K in keyof ReturnType<typeof useMovieStore>]:
            ReturnType<typeof useMovieStore>[K] extends (...args: any[]) => any
                ? ReturnType<typeof vi.fn>
                : ReturnType<typeof useMovieStore>[K]
        };

        const movieStore = useMovieStore() as MockableStore;

        movieStore.fetchMovies = vi.fn();
        movieStore.setCurrentPage = vi.fn();

        const wrapper = mount(MovieList)

        // Reset mock call count after initial mount
        movieStore.fetchMovies.mockClear();

        const pagination = wrapper.findComponent(Pagination)
        pagination.vm.$emit('page-change', 3)

        expect(movieStore.setCurrentPage).toHaveBeenCalledWith(3)
        expect(movieStore.fetchMovies).toHaveBeenCalledTimes(1) // Now only counts the page change call
    })

    it('reacts to changes in the store', async () => {
        const movieStore = useMovieStore()
        movieStore.movies = []

        const wrapper = mount(MovieList)
        expect(wrapper.find('.no-items').exists()).toBe(true)

        movieStore.movies = [{ imdbID: '1', Title: 'New Movie', Year: '2023' }]
        await wrapper.vm.$nextTick()

        expect(wrapper.find('.no-items').exists()).toBe(false)
        expect(wrapper.findComponent(MovieCard).exists()).toBe(true)
    })
})
