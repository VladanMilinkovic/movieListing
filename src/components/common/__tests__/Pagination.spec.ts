import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '../Pagination.vue'

describe('Pagination', () => {
    const createWrapper = (props = {}) => mount(Pagination, {
        props: {
            currentPage: 1,
            totalPages: 10,
            totalResults: 100,
            perPage: 10,
            ...props
        }
    })

    it('does not render when totalPages is 1', () => {
        const wrapper = createWrapper({ totalPages: 1 })
        expect(wrapper.find('.pagination').exists()).toBe(false)
    })

    it('renders pagination controls when totalPages > 1', () => {
        const wrapper = createWrapper()
        expect(wrapper.find('.pagination').exists()).toBe(true)
        expect(wrapper.find('.info').text()).toContain('Showing 1 to 10 of 100 movies')
        expect(wrapper.find('.page-info').text()).toBe('1 of 10')
    })

    it('disables previous buttons on first page', () => {
        const wrapper = createWrapper({ currentPage: 1 })
        const buttons = wrapper.findAll('button')
        expect(buttons[0].attributes('disabled')).toBe('')
        expect(buttons[1].attributes('disabled')).toBe('')
        expect(buttons[2].attributes('disabled')).toBeUndefined()
        expect(buttons[3].attributes('disabled')).toBeUndefined()
    })

    it('disables next buttons on last page', () => {
        const wrapper = createWrapper({ currentPage: 10 })
        const buttons = wrapper.findAll('button')
        expect(buttons[0].attributes('disabled')).toBeUndefined()
        expect(buttons[1].attributes('disabled')).toBeUndefined()
        expect(buttons[2].attributes('disabled')).toBe('')
        expect(buttons[3].attributes('disabled')).toBe('')
    })

    it('emits page-change event when clicking buttons', async () => {
        const wrapper = createWrapper({ currentPage: 5 })
        const buttons = wrapper.findAll('button')

        await buttons[0].trigger('click') // First page
        expect(wrapper.emitted('page-change')).toEqual([[1]])

        await buttons[1].trigger('click') // Previous page
        expect(wrapper.emitted('page-change')).toEqual([[1], [4]])

        await buttons[2].trigger('click') // Next page
        expect(wrapper.emitted('page-change')).toEqual([[1], [4], [6]])

        await buttons[3].trigger('click') // Last page
        expect(wrapper.emitted('page-change')).toEqual([[1], [4], [6], [10]])
    })

    it('does not emit when clicking disabled buttons', async () => {
        const wrapper = createWrapper({ currentPage: 1 })
        const buttons = wrapper.findAll('button')

        await buttons[0].trigger('click')
        await buttons[1].trigger('click')

        expect(wrapper.emitted('page-change')).toBeUndefined()
    })

    it('calculates from/to values correctly', () => {
        const wrapper = createWrapper({
            currentPage: 3,
            perPage: 5,
            totalResults: 22
        })

        expect(wrapper.find('.info').text()).toContain('Showing 11 to 15 of 22 movies')
    })
})
