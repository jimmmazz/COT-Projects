<template>
    <div>
        <h2>New Project</h2>
        <form @submit.prevent="handelSubmit">
            <header class="project-header">
                <div class="form-control">
                    <label for="project-title">Title</label>
                    <input id="project-title" v-model.trim="title" required />
                </div>
                <div class="form-control">
                    <label for="project-date">Date</label>
                    <input id="project-date" v-model.trim="date" type="date" required />
                </div>
                <div class="form-control">
                    <label for="location">Location</label>
                    <input id="location" v-model.trim="location" required />
                </div>
            </header>
            <div class="contact-info">
                <div class="form-control">
                    <label for="project-contact">Contact Name</label>
                    <input id="project-contact" v-model.trim="contactName" required />
                </div>
                <div class="form-control">
                    <label for="project-contact-phone">Contact Phone</label>
                    <input id="project-contact-phone" v-model.trim="contactPhone" />
                </div>
            </div>
            <div class="project-comments">
                <div class="form-control">
                    <label for="project-description">Description</label>
                    <textarea id="project-description" v-model.trim="projectDesc" required></textarea>
                </div>
                <div class="form-control">
                    <label for="project-work-complete">Work Complete</label>
                    <textarea id="project-work-complete" v-model.trim="projectWorkComplete"></textarea>
                </div>
            </div>
            <button>Add Project</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const title = ref('')
const date = ref('')
const location = ref('')
const contactName = ref('')
const contactPhone = ref('')
const projectDesc = ref('')
const projectWorkComplete = ref('')

const props = defineProps(['user'])
const emit = defineEmits(['new-project'])

const handelSubmit = async () => {

    const data = {
        projectName: title.value,
        date: date.value,
        location: location.value,
        contactName: contactName.value,
        contactPhone: contactPhone.value,
        projectDesc: projectDesc.value,
        projectWorkComplete: projectWorkComplete.value
    }
    const token = localStorage.getItem('token')
    // console.log(typeof token)
    // console.log(props.user)
    const response = await fetch(`api/project/addProject?email=${props.user.email}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Bearer': token,
        },
        body: JSON.stringify(data)
    })
    const json = await response.json()
    emit('new-project', json)
    title.value = ''
    date.value = ''
    location.value = ''
    contactName.value = ''
    contactPhone.value = ''
    projectDesc.value = ''
    projectWorkComplete.value = ''

    // console.log(json)
    // router.push('/projects')
}

</script>

<style scoped>
h2 {
    margin-bottom: 1rem;
}

label,
input {
    display: block;
    width: 100%;
}

label {
    margin-bottom: .5rem;
}

input {
    padding: 0.5rem;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: none;
}

.project-header,
.contact-info {
    display: flex;
    width: 100%;
}


.form-control {
    padding: 0 1rem 1rem 0;
    width: 100%;
}
</style>