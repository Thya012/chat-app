<template>
    <div>Loading</div>
</template>
<script>
import { mapActions } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
export default {
    async mounted() {
        const code = this.$route.query.code
        // Exchange code for JWT token
        try {
            await this.googleLogin(code)
            
            this.$router.push('/chat')
        } catch (err) {
            console.log(err)
        }
    },
    methods: {
        ...mapActions(useAuthStore, ['googleLogin'])
    }
}
</script>