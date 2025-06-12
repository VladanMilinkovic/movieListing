import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import SearchBar from '../SearchBar.vue'
import type { ComponentPublicInstance } from "vue";

interface SearchBarInstance extends ComponentPublicInstance {
    searchInput: string
    MovieStore: {
        setSearchTerm: (term: string) => void
        setCurrentPage: (page: number) => void
        fetchMovies: () => void
    }
    handleInput: () => void
    clearSearchHandler: () => void
    toggleSideBar: () => void
}


vi.mock('@/store/movies', () => ({
    useMovieStore: vi.fn(() => ({
        setSearchTerm: vi.fn(),
        setCurrentPage: vi.fn(),
        fetchMovies: vi.fn()
    }))
}))

describe('SearchBar', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.useFakeTimers()
    })

    it('renders input and buttons', () => {
        const wrapper = mount(SearchBar)
        expect(wrapper.find('input').exists()).toBe(true)
        expect(wrapper.find('.clear-button').exists()).toBe(true)
        expect(wrapper.find('.hamburger').exists()).toBe(true)
    })

    it('updates searchInput on typing', async () => {
        const wrapper = mount(SearchBar)
        const input = wrapper.find('input')
        await input.setValue('Lord of the rings')
        expect((wrapper.vm as SearchBarInstance).searchInput).toBe('Lord of the rings')
    })

    it('calls store methods after debounce', async () => {
        const wrapper = mount(SearchBar)
        const input = wrapper.find('input')
        await input.setValue('Switch')
        vi.advanceTimersByTime(400)
        const store = (wrapper.vm as SearchBarInstance).MovieStore
        expect(store.setSearchTerm).toHaveBeenCalledWith('Switch')
        expect(store.setCurrentPage).toHaveBeenCalledWith(1)
        expect(store.fetchMovies).toHaveBeenCalled()
    })

    it('clears search on button click', async () => {
        const wrapper = mount(SearchBar)
        await wrapper.find('input').setValue('Mister Bin')
        await wrapper.find('.clear-button').trigger('click')
        expect((wrapper.vm as SearchBarInstance).searchInput).toBe('')
        const store = (wrapper.vm as SearchBarInstance).MovieStore
        expect(store.setSearchTerm).toHaveBeenCalledWith('')
        expect(store.setCurrentPage).toHaveBeenCalledWith(1)
        expect(store.fetchMovies).toHaveBeenCalled()
    })

    it('disables clear button when input is empty', async () => {
        const wrapper = mount(SearchBar)
        expect(wrapper.find('.clear-button').attributes('disabled')).toBe('')
        await wrapper.find('input').setValue('Friends')
        expect(wrapper.find('.clear-button').attributes('disabled')).toBeUndefined()
    })

    it('toggles mobile-nav class on hamburger click', async () => {
        const wrapper = mount(SearchBar)
        document.body.classList.remove('mobile-nav')
        await wrapper.find('.hamburger').trigger('click')
        expect(document.body.classList.contains('mobile-nav')).toBe(true)
    })
})
