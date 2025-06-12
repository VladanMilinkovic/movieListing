import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import SideNav from '../SideNav.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
    { path: '/favorites', name: 'favorites', component: { template: '<div>Favorites</div>' } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

describe('SideNav', () => {
    let wrapper: ReturnType<typeof mount>
    const originalInnerWidth = window.innerWidth

    const resizeWindow = (width: number) => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: width
        })
        window.dispatchEvent(new Event('resize'))
    }

    beforeEach(async () => {
        vi.spyOn(window, 'addEventListener')
        vi.spyOn(window, 'removeEventListener')
        document.body.classList.remove('mobile-nav')
        await router.push('/')
    })

    afterEach(() => {
        wrapper.unmount()
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: originalInnerWidth
        })
    })

    it('renders correctly on large devices', async () => {
        resizeWindow(1200)
        wrapper = mount(SideNav, {
            global: {
                plugins: [router]
            }
        })

        expect(wrapper.find('.side-nav').exists()).toBe(true)
        expect(wrapper.find('.close-btn').exists()).toBe(false)
        expect(wrapper.find('.mask').exists()).toBe(false)
    })

    it('shows close button on small devices', async () => {
        resizeWindow(800) // Mobile size
        wrapper = mount(SideNav, {
            global: {
                plugins: [router]
            }
        })

        await wrapper.vm.$nextTick()
        expect(wrapper.find('.close-btn').exists()).toBe(true)
    })


    it('closes sidebar when mask is clicked', async () => {
        // First open the sidebar by adding the mobile-nav class
        document.body.classList.add('mobile-nav')

        wrapper = mount(SideNav, {
            global: {
                plugins: [router]
            }
        })

        // Wait for the component to react to the initial state
        await wrapper.vm.$nextTick()

        // Verify mask exists before trying to click it
        const mask = wrapper.find('.mask')
        expect(mask.exists()).toBe(true) // Ensure mask is present

        await mask.trigger('click')
        expect(document.body.classList.contains('mobile-nav')).toBe(false)
    })

    it('closes sidebar when close button is clicked', async () => {
        // Set up mobile view
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 800
        })

        // Open the sidebar
        document.body.classList.add('mobile-nav')

        wrapper = mount(SideNav, {
            global: {
                plugins: [router]
            }
        })

        // Wait for component to initialize
        await wrapper.vm.$nextTick()

        // Verify close button exists
        const closeButton = wrapper.find('.close-btn')
        expect(closeButton.exists()).toBe(true)

        await closeButton.trigger('click')
        expect(document.body.classList.contains('mobile-nav')).toBe(false)
    })

    it('sets active class on current route', async () => {
        wrapper = mount(SideNav, {
            global: {
                plugins: [router]
            }
        })

        await router.push('/')
        expect(wrapper.find('.nav-link.active').text()).toBe('Movies')

        await router.push('/favorites')
        expect(wrapper.find('.nav-link.active').text()).toBe('Favorites')
    })

    it('closes sidebar when clicking nav link on mobile', async () => {
        resizeWindow(800)
        document.body.classList.add('mobile-nav')
        wrapper = mount(SideNav, {
            global: {
                plugins: [router]
            }
        })

        await wrapper.findAll('.nav-link')[0].trigger('click')
        expect(document.body.classList.contains('mobile-nav')).toBe(false)
    })

    it('cleans up event listeners on unmount', () => {
        wrapper = mount(SideNav, {
            global: {
                plugins: [router]
            }
        })

        wrapper.unmount()
        expect(window.removeEventListener).toHaveBeenCalled()
    })
})
