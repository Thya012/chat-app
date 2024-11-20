import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Chat from '@/pages/Chat.vue'
import OAuthGoogle from '@/pages/OAuthGoogle.vue'
import User from '@/pages/User.vue'
import NotFound from '@/pages/NotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: '/',name:"home", component: Home, meta:{isAuth:false,} },
        { path: '/chat', name:"chat",component: Chat, meta:{isAuth:true,}},
        { path: '/users',name:"user", component: User,meta:{isAuth:true,} },
        { path: '/google-callback', name:"google-callback", component: OAuthGoogle },
        { path: '/:pathMatch(.*)*', component: NotFound},
       
    ]
    
})
router.beforeEach((to, from, next) => {
    if (to.meta.isAuth){
        let user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        if(!user){
            next({ name: 'home' })
        }
    } 
    next()
  })
export default router