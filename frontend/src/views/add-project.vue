<template>
    <div>
        {{ name }}
        <h1>Add Project</h1>
        <form @submit.prevent="handelSubmit">
            <header>
                <div class="form-control">
                    <label for="project-name">Title</label>
                    <input id="project-name" v-model="name" />
                </div>
                <div class="form-control">
                    <label for="project-date">Date</label>
                    <input id="project-date" v-model="name" />
                </div>
                <div class="form-control">
                    <label for="project-contact">Contact Name</label>
                    <input id="project-contact" v-model="name" />
                </div>
            </header>
            <button>Add Project</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const name = ref('')
const emit = defineEmits(['new-project'])

const handelSubmit = async () => {


    const data = { projectName: name.value }
    const token = localStorage.getItem('token')
    // console.log(typeof token)
    // console.log(data)
    const response = await fetch('api/project/addProject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Bearer': token,
        },
        body: JSON.stringify(data)
    })
    const json = await response.json()
    emit('new-project', json)
    name.value = ''
    // console.log(json)
    // router.push('/projects')
}

</script>

<style scoped>
div {
    padding: 1rem;
}
</style>