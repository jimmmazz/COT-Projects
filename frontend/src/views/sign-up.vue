<template>
    <section>
        <h1>Sign Up</h1>
        <div class="container">
            <p v-if="error" class="error">{{ error }}</p>
            <form>
                <div class="form-control">
                    <label for="name">Name</label>
                    <input type="text" id="name" v-model="name" />
                </div>
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" />
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" />
                </div>
                <div class="form-control">
                    <label for="verify-password">Verify password</label>
                    <input type="password" id="verify-password" v-model="verifyPassword" />
                </div>
                <button @click.prevent="handleSignup">Sign Up</button>
            </form>
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const user = ref(null)
const name = ref(null)
const email = ref(null)
const password = ref(null)
const verifyPassword = ref(null)
const error = ref(null)
const emit = defineEmits(['userData'])

const handleSignup = async () => {
    error.value = null

    const data = { name: name.value, email: email.value, password: password.value, verifyPassword: verifyPassword.value }
    // console.log(data)
    const response = await fetch('api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    const json = await response.json()
    if (json._id) {
        error.value = null
        email.value = null
        password.value = null
        user.value = json
        console.log(user.value)
        //token to local storage
        // token.value = json.token
        // localStorage.setItem('token', token.value)
        emit('userData', user.value)
        router.push({
            name: 'Projects'
        })
    } else {
        error.value = json
    }
}


</script>

<style scoped>
section {
    background-color: lightcoral;
}

h1 {
    margin: 0 auto 1rem;
    font-size: 2rem;
    text-align: center;
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
    display: inline-block;
    color: red;
    margin-bottom: 1rem;
    text-align: center;
}
</style>