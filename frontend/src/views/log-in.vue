<template>
    <section>
        <h1>Login</h1>
        <div class="container">
            <p v-if="error" class="error"> {{ error }}</p>
            <form>
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" />
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" />
                </div>
                <button @click.prevent="handleLogin">Login</button>
            </form>
        </div>
    </section>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref(null)
const password = ref(null)
const error = ref(null)
const user = ref(null)
const token = ref(null)
const emit = defineEmits(['userData'])
const router = useRouter()


const handleLogin = async () => {
    const data = { email: email.value, password: password.value }

    const response = await fetch('api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    const json = await response.json()
    // console.log(json)
    if (json.user) {
        error.value = null
        email.value = null
        password.value = null
        user.value = json.user
        //token to local storage
        token.value = json.token
        localStorage.setItem('token', token.value)
        emit('userData', user.value)
        router.push({ name: 'AddProject', params: { user: user.value } })
    } else {
        error.value = json
    }
    // user.value = json
    // error.value = json
    // console.log(error.value)
}
</script>

<style scoped>
h1 {
    margin: 0 auto 1rem;
    font-size: 2rem;
    text-align: center;
}

section {
    background-color: lightcyan;
}

.container {
    margin: 0 auto;

    padding: 2rem;
    border: 1px solid black;
    border-radius: 5px;
    max-width: 400px;
}

.form-control {
    margin-bottom: 1rem;
}

label,
input {
    display: inline-block;
    width: 100%;
}

input {
    line-height: 1.6;
    border-radius: 3px;
}

button {
    border-radius: 3px;
    padding: .5rem;
    display: inline-block;
    width: 100%;
    cursor: pointer;
}

button:hover {
    background-color: #fafafa;
}

.error {
    /* display: inline-block; */
    color: red;
    margin-bottom: 1rem;
    text-align: center;
}
</style>