<template>
    <h1>HOME</h1>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const token = localStorage.getItem('token')
if (token) {
    router.push({ name: 'AddProject' })
}
console.log(token)

</script>

<style scoped>
</style>