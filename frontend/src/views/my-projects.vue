<template>
    <div>
        <h1>Projects</h1>
        <ul v-for="project in projects">
            <li>{{ project.projectName }}</li>
        </ul>
        <!-- display fetched projects -->
    </div>
</template>

<script setup>
import { onBeforeMount, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const projects = ref([])
const token = localStorage.getItem('token')
const props = defineProps(['user', 'project'])
const router = useRouter()
// console.log('project props', props.project)

watchEffect(async () => {
    if (props.project) {
        const response = await fetch(`/api/project`)
        const projectsData = await response.json()
        if (projectsData.length < 0) {
            console.log('No data')
        } else {
            projects.value = projectsData
            // console.log(projectsData)
        }
    }
})

//onBeforeMounted fetch projects 
onBeforeMount(async () => {
    // console.log(props.user)
    if (!props.user) {
        router.push({ name: 'Login' })
        console.log('Re-loggin required after page refresh')
        // return
    }

    // const queryEmail = 
    const response = await fetch(`/api/project/?${props.user ? props.user.email : ''}`)
    const projectsData = await response.json()
    if (projectsData.length < 0) {
        console.log('No data')
    } else {
        projects.value = projectsData
    }
})

</script>

<style scoped>
div {
    margin-left: 2rem;
    padding: 1rem;
}

ul {
    list-style: none;
    margin-bottom: .5rem;
}
</style>