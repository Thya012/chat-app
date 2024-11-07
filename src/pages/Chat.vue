<template>
    <div class="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6">Chat Room</h2>
        <div v-if="!connected" class="text-center text-gray-500">Connecting...</div>
        <div v-else>
            <div class="space-y-4 mb-6">
                <div v-for="message in messages" :key="message.id" class="border-b border-gray-200 pb-2">
                    <strong class="text-indigo-600">{{ message.byUser.username }}</strong>: {{ message.text }}
                </div>
            </div>
            <form @submit.prevent="sendMessage" class="flex space-x-4">
                <input v-model="newMessage"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Type a message" required>
                <button type="submit"
                    class="py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Send</button>
                    <button  v-if="isAuthenticated" type="button" @click="handleLogout"
                    class="py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Logout</button>
                </form>
        </div>
    </div>
</template>
<script>
// ES modules
import { io } from "socket.io-client";
import axios from 'axios'
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '@/stores/auth.js'
export default {
    data() {
        return {
            messages: [],
            newMessage: '',
            connected: false,
            socket: null
        };
    },
    async created() {
        this.connectWebSocket();
        // Get chat history
        try {
            const { data } = await axios.get(`${process.env.VUE_APP_SERVER}/v1/chats`)
            this.messages.push(...data)
            console.log(data)
        } catch (err) {
            console.log(err.message)
        }

    },
    methods: {
        connectWebSocket() {
            console.log("Trying to connect!")
            // const token = localStorage.getItem('token');
            // if (!token) {
            //   this.$router.push('/');
            //   return;
            // }
            // Get all chat histories from Backend

            this.socket = io(`${process.env.VUE_APP_SERVER}`, {
                // auth: {
                //   token: `Bearer ${token}`
                // },
                transports: ['websocket']
            })

            // this.socket.join('chat')

            this.socket.on('connect', () => {
                this.connected = true;
                console.log("Websocket Initialized!")
            });

            this.socket.on('re-message', (paylaod) => {
                // console.log(paylaod)
                this.messages.push(paylaod);
            });

            this.socket.on('disconnect', () => {
                this.connected = false;
            });
        },
        // Extract user info from Token
        sendMessage() {
            const message = {
                text: this.newMessage,
                username: this.user.username,
                id: this.user._id
            };
            this.socket.emit('send-message', message);
            this.newMessage = '';
        },
        ...mapActions(useAuthStore, ['logout']),
        async handleLogout() {
            // Clear JWT, Username, Discount Socket
            await this.logout()
            this.socket.disconnect()
            this.$router.push('/')
        }
    },
    computed: {
        ...mapState(useAuthStore, ['user','isAuthenticated'])
    }
}
</script>