import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import MovieList from "../views/MovieList.vue";
import FavoritesList from "../views/FavoritesList.vue";

const routes: RouteRecordRaw[]  = [
    {
        path: '/',
        name: 'Home',
        component: MovieList,
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: FavoritesList,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
