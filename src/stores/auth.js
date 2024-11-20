// stores/counter.js
import { defineStore } from 'pinia'

import Axios from '@/plugins/axios'
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            accessToken: '',
            refreshToken: '',
            user: {}
        }
    },
    getters: {
        isAuthenticated: (state) => {
            //console.log(state.accessToken)
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
            //console.log(data)
            this.accessToken = data.token.accessToken
            //console.log(this.token)
            localStorage.setItem('token', this.accessToken)
            let response = await Axios.get(`/v1/auth/me`, {
                headers: {
                    authorization: `Bearer ${this.accessToken}`
                }
                
            })
            localStorage.setItem('user', JSON.stringify(response.data))
            this.user = response.data
            console.log(this.user)
        },
        async login(email, password) {
            try {
                const response = await Axios.post(`/v1/auth/login`, {
                    email: email,
                    password: password
                });
                //console.log(response.data.token.accessToken)
                    localStorage.setItem('token', response.data.token.accessToken)
            
                // Alter defaults after instance has been created
                    Axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token.accessToken}`;
                    //console.log(response)
                    const { data } = await Axios.get(`/v1/auth/me`);
                    this.accessToken = response.data.token.accessToken
                    this.refreshToken = response.data.token.refreshToken
                    localStorage.setItem('user', JSON.stringify(data))
                    this.user = data
                } catch (error) {
                    console.log(error)
                    alert('Login wrong username and password');
                }

            },
        async logout() {
                this.accessToken = ""
                this.refreshToken = ""
                this.user = {}
                //localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            },
        async getUsers() {
                const users = await Axios.get('/v1/users')
                console.log(users)
            }

        },
    })