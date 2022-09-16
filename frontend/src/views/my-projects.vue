<template>
    <!-- display fetched projects -->
    <div class="projects-list">
        <h2>Projects</h2>
        <div>
            <div v-if="projects[0] === 'No projects'">{{ projects[0] }}</div>
            <div v-else>
                <ul v-for="project in projects">
                    <div class="card">
                        <li>{{ `${project.projectName} @ ${project.location}` }}</li>
                        <div>
                            <div class="btn-container" v-show="!props.user && projects[0] !== 'No projects'">
                                <button class="btn btn-details" @click="handelDetailsClick">Details</button>
                            </div>
                            <div class="btn-container" v-show="props.user && projects[0] !== 'No projects'">
                                <button class="btn btn-edit" @click="handelEditClick">Edit</button>
                            </div>
                            <div class="btn-container btn-delete" v-show="props.user && projects[0] !== 'No projects'">
                                <button class="btn " @click="handelDeleteClick">Delete</button>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>


        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

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
            console.log(projects.value)
        }
    }
})

//onBeforeMounted fetch projects 
onBeforeMount(async () => {
    if (!props.user) {
        router.push({ name: 'Login' })
        console.log('Re-loggin required after page refresh')
    }

    // const queryEmail = `/api/project/?${props.user ? props.user.email : ''}`
    const response = await fetch('/api/project/')
    const projectsData = await response.json()
    if (projectsData.length < 0) {
        console.log('No data')
    } else {
        projects.value = projectsData
        console.log('vue', projects.value[0].projectDesc)
    }
})

</script>

<style scoped>
h2 {
    margin-bottom: 1rem;
}

ul {
    list-style: none;
    margin-bottom: .5rem;
}


.btn-container {
    display: inline-block;
    margin-top: 0.5rem;

}

.btn {
    padding: 5px 10px;
    border-style: none;
    border-radius: 5px;
    /* box-shadow: 5px 5px hsl(0, 0%, 78%); */
}

.btn-delete {
    margin-left: 1rem;
}

.card {
    /* border: 1px solid hsl(0, 1%, 78%); */
    box-shadow: 0px 2px 20px 1px rgb(0 0 0 / .1);
    border-bottom: 1px solid rgb(132, 132, 132);
    padding: 1rem;
    /* background-color: rgba(224, 224, 224, 0.11); */
}

.projects-list {
    box-shadow: 0px 2px 20px 1px rgb(0 0 0 / .1);
    border-bottom: 1px solid rgb(132, 132, 132);
    padding: 1rem;
    margin-left: 1rem;
}
</style>