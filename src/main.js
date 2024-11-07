import { createApp } from 'vue'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/pages/Home.vue'
import Chat from '@/pages/Chat.vue'
import './assets/tailwind.css'
import OAuthGoogle from '@/pages/OAuthGoogle.vue'
import { createPinia } from 'pinia'
import User from '@/pages/User.vue'

const pinia = createPinia()
const routes = [
    { path: '/', component: Home },
    { path: '/chat', component: Chat },
    { path: '/users', component: User },
    { path: '/google-callback', component: OAuthGoogle },


]

const router = createRouter({
    routes,
    history: createWebHistory()
})
// router.beforeEach(async (to, from) => {
//     // Homework
//     if (!isAuthenticated) {
//         // redirect the user to the login page
//         return { name: 'Home' }
//     }
// })

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
