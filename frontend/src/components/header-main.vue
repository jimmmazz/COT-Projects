<template>
    <nav class="nav">
        <div class="logged-in" v-if="isUser">
            <p>Email: {{ user.email }}</p>
            <router-link to="/add-project">Add Project</router-link>
            <button @click="handelLogout">Logout</button>
        </div>
        <div class="login" v-else>
            <router-link to="/signup">Sign Up</router-link>
            <router-link to="/login">Login</router-link>
        </div>
    </nav>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const emit = defineEmits(['userData'])

const props = defineProps(['user'])
const isUser = ref(false)

if (props.user !== null) {
    isUser.value = true
}


const handelLogout = () => {
    localStorage.removeItem('token')
    isUser.value = false
    emit('userData', null)
    router.push({ name: 'Login' })
}

watchEffect(() => {
    console.log(props.user)

    if (props.user !== null) {
        if (props.user.hasOwnProperty('email')) {
            isUser.value = true
        }
    } else {
        // handelLogout()
    }
})

</script>

<style scoped>
.nav {
    grid-column: 1/3;
    grid-row: 1/2;
    box-shadow: 0px 2px 20px 1px rgb(0 0 0 / .1);
}

a {
    display: inline-block;
    text-decoration: none;
    padding: 5px 15px;
    margin-left: auto;
}

p {
    display: inline-block;
    margin-right: 2rem;
}

nav {
    display: flex;
    justify-content: center;
    align-items: end;
    padding: 1em;
}

.logged-in,
.login {
    margin-left: auto;
}
</style>