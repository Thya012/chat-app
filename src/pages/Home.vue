<template>
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6">Login</h2>
        <form @submit.prevent="passwordLogin" class="space-y-4">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Username:</label>
                <input v-model="email" id="username"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required>
            </div>
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
                <input type="password" v-model="password" id="password"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required>
            </div>
            <button type="submit"
                class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
            <button type="button" @click="googleLogin"
                class="text-white w-full  bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-700/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg
                    class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google"
                    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
                    </path>
                </svg>Sign up with Google<div></div></button>
        </form>
    </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '@/stores/auth.js'
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        // async login() {

        // },
        googleLogin() {
            // console.log("ddd")
            // console.log(process.env.VUE_APP_GOOGLE_CLIENT_ID)
            const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.VUE_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.VUE_APP_GOOGLE_REDIRECT_URL}&response_type=code&scope=profile%20email&access_type=offline`;
            window.open(googleAuthUrl, "_self")
        },
        ...mapActions(useAuthStore, ['login']),
        async passwordLogin() {
            await this.login(this.email, this.password)
            if (this.accessToken) {
                this.$router.push('/chat')
            }
           // this.$router.push('/chat')
        }
    },
    computed: {
        ...mapState(useAuthStore, ["accessToken"])
    }

}
</script>