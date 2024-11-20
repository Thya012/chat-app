import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { jwtDecode } from "jwt-decode";
// Set config defaults when creating the instance
const Axios = axios.create({
    baseURL: process.env.VUE_APP_SERVER
})
Axios.interceptors.request.use(
    // Refresh Token
    async (config) => {
        const authStore = useAuthStore()
        console.log(config.headers.Authorization)
        if (config.headers.Authorization) {
            console.log("Trigger")
            console.log(authStore.refreshToken)
            // console.log(config.headers.Authorization)
            const extract = config.headers.Authorization.split(' ')[1]
            const decoded = jwtDecode(extract)
            const currentDate = new Date()
            const expiry = new Date(decoded.exp * 1000)
            if (currentDate > expiry) {
                console.log("True")
                const { data } = await Axios.get('/v1/auth/refresh', {
                    headers: {
                        Authorization: `Bearer ${authStore.refreshToken}`
                    }
                })
                //console.log(data)
                authStore.accessToken = data.accessToken
                authStore.refreshToken = data.refreshToken
                //console.log(config)
                config.headers.Authorization = `Bearer ${data.accessToken}`;
            }
        }
        return config
    },
    async (error) => {
        return Promise.reject(error);
    }
)
export default Axios