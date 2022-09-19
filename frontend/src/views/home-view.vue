<template>
    <div class="project-container">
        <div>
            <h2 class="project-details-heading">Project Details</h2>
        </div>
        <table class="tg" v-if="projectDisplay">
            <tbody>
                <tr>
                    <td class="tg-0lax" colspan="4">Name: {{projectDisplay.projectName}}</td>
                    <td class="tg-0lax" colspan="2">Date: {{projectDisplay.date}}</td>
                </tr>
                <tr>
                    <td class="tg-0lax" colspan="6">Description: {{projectDisplay.projectDesc}}</td>
                </tr>
                <tr>
                    <td class="tg-0lax" colspan="3">Contact: {{projectDisplay.contactName}}</td>
                    <td class="tg-0lax" colspan="3">Contact Number: {{projectDisplay.contactPhoneNoReq}}</td>
                </tr>
                <tr>
                    <td class="tg-0lax" colspan="6">Results: {{projectDisplay.projectWorkCompleteNoReq}}</td>
                </tr>
            </tbody>
        </table>
    </div>


</template>

<script setup>
import { onBeforeMount, ref, watchEffect } from 'vue';
const props = defineProps(['projectDetailId'])
const projects = ref([])
const projectDisplay = ref()

const getProjectById = async (id) => {
    const response = await fetch(`/api/project/${id}`)
    projectDisplay.value = await response.json()
}

watchEffect(() => {
    // console.log('from where it needs to be', props.projectDetailId)
    if (props.projectDetailId !== null) {
        getProjectById(props.projectDetailId)
    }
})

onBeforeMount(async () => {
    const response = await fetch(`/api/project/`)
    projects.value = await response.json()


    if (projects.length < 0) {
        console.log('No data')
    } else {
        projectDisplay.value = projects.value[0]
    }
})


</script>

<style scoped>
.project-container {
    margin: 0 auto;
    width: 80%;
}

.project-details-heading {
    margin-bottom: 1rem;
}

.tg {
    table-layout: fixed;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
}

.tg td {
    border-color: black;
    border-style: solid;
    border-width: 1px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    overflow: hidden;
    padding: 10px 5px;
    word-break: normal;
}

.tg th {
    border-color: black;
    border-style: solid;
    border-width: 1px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: normal;
    overflow: hidden;
    padding: 10px 5px;
    word-break: normal;
}

.tg .tg-0lax {
    text-align: left;
    vertical-align: top
}

tr,
td {
    border-style: none;
}
</style>