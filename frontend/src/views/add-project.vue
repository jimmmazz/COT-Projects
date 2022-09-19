<template>
    <div class="form-container">
        <h2>New Project</h2>
        <p v-if="error" class="error">{{ error }}</p>
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
                    <input id="project-contact-phone" v-model.trim="contactPhoneNoReq" />
                </div>
            </div>
            <div class="project-comments">
                <div class="form-control">
                    <label for="project-description">Description</label>
                    <textarea id="project-description" v-model.trim="projectDesc" required rows="4"
                        cols="100"></textarea>
                </div>
                <div class="form-control">
                    <label for="project-work-complete">Work Complete</label>
                    <textarea id="project-work-complete" v-model.trim="projectWorkCompleteNoReq" rows="4"
                        cols="100"></textarea>
                </div>
            </div>
            <button>Add Project</button>
        </form>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const title = ref('')
const date = ref('')
const location = ref('')
const contactName = ref('')
const contactPhoneNoReq = ref('')
const projectDesc = ref('')
const projectWorkCompleteNoReq = ref('')

const error = ref(null)

const props = defineProps(['user'])
const emit = defineEmits(['new-project'])

const handelSubmit = async () => {
    const data = {
        projectName: title.value,
        date: date.value,
        location: location.value,
        contactName: contactName.value,
        contactPhoneNoReq: contactPhoneNoReq.value,
        projectDesc: projectDesc.value,
        projectWorkCompleteNoReq: projectWorkCompleteNoReq.value
    }
    const token = localStorage.getItem('token')

    const response = await fetch(`api/project/addProject?email=${props.user.email}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Bearer': token,
        },
        body: JSON.stringify(data)
    })
    const json = await response.json()

    if (json._id) {
        error.value = null
        title.value = ''
        date.value = ''
        location.value = ''
        contactName.value = ''
        contactPhoneNoReq.value = ''
        projectDesc.value = ''
        projectWorkCompleteNoReq.value = ''
        emit('new-project', json)
    } else {
        error.value = json
    }

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

button {
    padding: 5px 10px;
    border-style: none;
    border-radius: 5px;
}

.form-container {
    box-shadow: 0px 2px 20px 1px rgb(0 0 0 / .1);
    border-bottom: 1px solid rgb(132, 132, 132);
    padding: 1rem;
}

.project-header,
.contact-info {
    display: flex;
    width: 100%;
}

.error {
    color: red;
}

.form-control {
    padding: 0 1rem 1rem 0;
    width: 100%;
}
</style>