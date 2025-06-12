import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '../Footer.vue'

describe('Footer Component', () => {
    it('displays the current year', () => {
        const currentYear = new Date().getFullYear().toString()
        const wrapper = mount(Footer)

        expect(wrapper.text()).toContain(currentYear)

        expect(wrapper.text()).toContain('Vladan Milinkovic')

        expect(wrapper.find('p').classes()).toContain('footer-text')
    })
})
