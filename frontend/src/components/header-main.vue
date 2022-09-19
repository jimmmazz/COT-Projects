<template>
    <nav class="nav">
        <div class="logged-in" v-if="isUser">
            <h2>Add</h2>
            <p>Welcome: {{ user.name }}</p>
            <!-- <router-link to="/add-project">Add Project</router-link> -->
            <button @click="handelLogout">Logout</button>
        </div>
        <div class="login" v-else>
            <router-link to="/">Home</router-link>
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
const token = ref(localStorage.getItem('token'))
if (props.user !== null) {
    isUser.value = true
}



const handelLogout = () => {
    localStorage.removeItem('token')
    isUser.value = false
    emit('userData', null)
    router.push({ name: 'Home' })
}

watchEffect(() => {
    // if (props.user) {
    //     isUser.value = 'dog'
    //     console.log(isUser)
    // }
    // console.log(props.user)

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
    margin-bottom: 2rem;
    grid-column: 1/3;
    grid-row: 1/2;
    box-shadow: 0px 2px 20px 1px rgb(0 0 0 / .1);
    border-bottom: 1px solid rgb(132, 132, 132);
    /* background-color: salmon; */
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
    margin-left: auto;
    align-self: flex-end;
    font-size: 1.5rem;
}

button {
    padding: 5px 15px;
    background-color: transparent;
    border-radius: 5px;
}

nav {
    display: flex;
    justify-content: center;
    align-items: end;
    padding: 1em;
    margin-top: 1rem;
}

.logged-in {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.login {
    margin-left: auto;
}
</style>