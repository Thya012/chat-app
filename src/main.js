import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './route'
import './assets/tailwind.css'





const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
