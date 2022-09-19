<template>
    <!-- display fetched projects -->
    <div class="projects-list">
        <div class="search">
            <h3 class="search-heading">Search projects</h3>
            <input class="search-input" type="text" v-model="projectDisplayInput">
        </div>
        <h3 class="projects-open-header">Open Projects</h3>

        <div>
            <div v-if="projects[0] === 'No projects'">{{ projects[0] }}</div>
            <div v-else>
                <ul v-for="project in projectDisplayInput ? projectsList : projects ">
                    <div class="card">
                        <li>{{ `${project.projectName} @ ${project.location}` }}</li>
                        <div>
                            <div class="btn-container" v-show="!props.user && projects[0] !== 'No projects'">
                                <button class="btn btn-details"
                                    @click="handelDetailsClick(project._id)">Details</button>
                            </div>
                            <div class="btn-container" v-show="props.user && projects[0] !== 'No projects'">
                                <button class="btn btn-edit" @click="handelEditClick">Edit</button>
                            </div>
                            <div class="btn-container btn-delete" v-show="props.user && projects[0] !== 'No projects'">
                                <button class="btn " @click="handelDeleteClick(project._id)">Delete</button>
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
import { useRouter } from 'vue-router';

const router = useRouter()

const projects = ref([])
const projectsList = ref(projects.value)
const props = defineProps(['user', 'project'])
const emit = defineEmits(['projectId'])
const projectDisplayInput = ref(null)
const isDeleted = ref(null)


const handelDetailsClick = (id) => {
    emit('projectId', id)
}

const handelDeleteClick = async (id) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`api/project/delete/${id}/?email=${props.user.email}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Bearer': token,
        },
    })
    isDeleted.value = await response.json()
    // console.log('after delete', isDeleted.value.acknowledged)

    projects.value = projects.value.filter((product) => {
        return product._id !== id
    })
    if (projects.value.length === 0) {
        projects.value.push('No projects')
    }
}

//when new project added
watchEffect(async () => {
    if (props.project) {
        const response = await fetch(`/api/project`)
        const projectsData = await response.json()
        if (projectsData.length < 0) {
            console.log('No data')
        } else {
            projects.value = projectsData
        }
    }
})

//search
watchEffect(() => {
    if (projectDisplayInput.value !== null) {
        console.log(projectsList.value)
        projectsList.value = projects.value.filter((project) => {
            return project.projectName.toLowerCase().includes(projectDisplayInput.value)
        })
    }

})

//onBeforeMounted fetch projects 
onBeforeMount(async () => {
    const response = await fetch('/api/project/')
    const projectsData = await response.json()
    projects.value = projectsData

    if (projectsData.length < 0) {
        console.log('No data')
    } else {
        if (!props.user) {
            console.log('Re-loggin required after page refresh')
            router.push({ name: 'Home' })

        }
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

.search {
    margin-bottom: 1rem;
}

.search-heading {
    margin-bottom: 0.5rem;
}

.search-input {
    width: 100%;
    border: none;
    box-shadow: 0px 2px 20px 1px rgb(0 0 0 / .1);
    font-size: 1.25rem;
    line-height: 1.5;
}

.projects-open-header {
    margin-bottom: .5rem;
}

.card {
    box-shadow: 0px 2px 20px 1px rgb(0 0 0 / .1);
    padding: 1rem;
}

.projects-list {
    box-shadow: 0px 2px 20px 1px rgb(0 0 0 / .1);
    border-bottom: 1px solid rgb(132, 132, 132);
    padding: 1rem;
    margin-left: 1rem;
}
</style>