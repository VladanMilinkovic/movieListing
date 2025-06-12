import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MovieCard from '../MovieCard.vue'
import type { Movie } from '@/api/movies/types'

describe('MovieCard', () => {
    const mockMovie: Movie = {
        Title: 'Scarface',
        Year: '1983',
        imdbID: 'tt1234567',
    }

    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    it('renders movie information correctly', () => {
        const wrapper = mount(MovieCard, {
            props: {
                movie: mockMovie
            }
        })

        expect(wrapper.find('.title').text()).toBe('Scarface')
        expect(wrapper.find('.description').text()).toContain('Year: 1983')
        expect(wrapper.find('.description').text()).toContain('IMDb ID: tt1234567')
    })


    it('shows empty star when movie is not favorite', () => {
        const wrapper = mount(MovieCard, {
            props: {
                movie: mockMovie
            },
            global: {
                mocks: {
                    $store: {
                        isFavorite: () => false
                    }
                }
            }
        })

        expect(wrapper.find('.star-button').text()).toBe('☆')
    })

    it('updates star display after toggling favorite', async () => {
        let favoriteState = false
        const wrapper = mount(MovieCard, {
            props: {
                movie: mockMovie
            },
            global: {
                mocks: {
                    $store: {
                        isFavorite: () => favoriteState,
                        toggleFavorite: () => { favoriteState = !favoriteState }
                    }
                }
            }
        })

        // Initial state
        expect(wrapper.find('.star-button').text()).toBe('☆')

        // Toggle to favorite
        await wrapper.find('.star-button').trigger('click')
        expect(wrapper.find('.star-button').text()).toBe('★')

        // Toggle back to not favorite
        await wrapper.find('.star-button').trigger('click')
        expect(wrapper.find('.star-button').text()).toBe('☆')
    })
})
