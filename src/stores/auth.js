// stores/counter.js
import { defineStore } from 'pinia'

import Axios from '@/plugins/axios'
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore('auth', {
    state: () => {
        return { 
            accessToken: '',
            refreshToken: '',
             user: {} }
    },
    getters: {
        isAuthenticated: (state) => {
            if (!state.accessToken) {
                return false
            }
            const decoded = jwtDecode(state.accessToken)
            const expire = new Date(decoded.exp * 1000)
            const current = new Date()
            return current > expire ? false : true
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        async googleLogin(code) {
            let { data } = await Axios.get(`/v1/auth/google-callback?code=${code}`)
            this.token = data.token
            // console.log(this.token)
            let response = await Axios.get(`/v1/auth/me`, {
                headers: {
                    authorization: `Bearer ${this.token}`
                }
            })
            this.user = response.data
        },
        async login(email, password) {
            try {
                const response = await Axios.post(`/v1/auth/login`, {
                    email: email,
                    password: password
                });

                // Alter defaults after instance has been created
                Axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;

                const { data } = await Axios.get(`/v1/auth/me`);
                this.accessToken = response.data.accessToken
                this.refreshToken = response.data.refreshToken
                this.user = data
            } catch (error) {
                console.log(error)
                alert('Login failed');
            }
           
        },
        async logout() {
            this.token = ""
            this.user = {}
        },
        async getUsers() {
            const users = await Axios.get('/v1/users')
            console.log(users)
        }
    
    },
})