import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import FavoritesList from "@/views/FavoritesList.vue"
import MovieCard from "@/components/movies/MovieCard.vue"
import { useMovieStore } from '@/store/movies'

describe('Favorites Component', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    it('renders the component with title and hamburger button', () => {
        const wrapper = mount(FavoritesList)

        expect(wrapper.find('.favorites-header--title').text()).toBe('My Favorite Movies')
        expect(wrapper.find('.hamburger').exists()).toBe(true)
        expect(wrapper.find('.hamburger').text()).toBe('☰')
    })

    it('displays "No favorite movies" message when favorites list is empty', () => {
        const movieStore = useMovieStore()
        movieStore.favorites = []

        const wrapper = mount(FavoritesList)

        expect(wrapper.find('.no-items').exists()).toBe(true)
        expect(wrapper.find('.no-items').text()).toBe('No favorite movies have been added.')
        expect(wrapper.find('.favorites-items').exists()).toBe(false)
        expect(wrapper.findComponent(MovieCard).exists()).toBe(false)
    })

    it('displays MovieCard components when favorites exist', () => {
        const movieStore = useMovieStore()
        movieStore.favorites = [
            { imdbID: '1', Title: 'Movie 1', Year: '2020' },
            { imdbID: '2', Title: 'Movie 2', Year: '2021' }
        ]

        const wrapper = mount(FavoritesList)

        expect(wrapper.find('.no-items').exists()).toBe(false)
        expect(wrapper.find('.favorites-items').exists()).toBe(true)

        const movieCards = wrapper.findAllComponents(MovieCard)
        expect(movieCards.length).toBe(2)
        expect(movieCards[0].props('movie')).toEqual(movieStore.favorites[0])
        expect(movieCards[1].props('movie')).toEqual(movieStore.favorites[1])
    })

    it('calls toggleSideBar when hamburger button is clicked', async () => {
        const classListMock = { toggle: vi.fn() }
        Object.defineProperty(document, 'body', {
            value: { classList: classListMock },
            writable: true
        })

        const wrapper = mount(FavoritesList)
        await wrapper.find('.hamburger').trigger('click')

        expect(classListMock.toggle).toHaveBeenCalledWith('mobile-nav')
    })

    it('reacts to changes in the store', async () => {
        const movieStore = useMovieStore()
        movieStore.favorites = []

        const wrapper = mount(FavoritesList)
        expect(wrapper.find('.no-items').exists()).toBe(true)

        movieStore.favorites = [{ imdbID: '1', Title: 'New Movie', Year: '2023' }]
        await wrapper.vm.$nextTick()

        expect(wrapper.find('.no-items').exists()).toBe(false)
        expect(wrapper.findComponent(MovieCard).exists()).toBe(true)
    })
})
