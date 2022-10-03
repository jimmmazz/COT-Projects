<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavMain from './components/header-main.vue'
import MyProjects from './views/my-projects.vue'

const router = useRouter()

const user = ref(null)
const updateUser = (userData) => {
  user.value = userData
}

const project = ref(null)
const updateProjects = (projectData) => {
  project.value = projectData
}

const projectDetailId = ref(null)
const updateProjectId = (id) => {
  projectDetailId.value = id
}

const detailsProject = (id) => {
  router.push({ name: 'Home' })
  projectDetailId.value = id
}

const projectEditId = ref(null)
const editProject = (id) => {
  projectEditId.value = id
}
</script>

<template>
  <div class="container">
    <main>
      <NavMain :user="user" @user-data="updateUser" />
      <router-view :user="user" @user-data="updateUser" @new-project="updateProjects"
        :projectDetailId="projectDetailId">
      </router-view>
      <MyProjects :user="user" :project="project" @project-id="updateProjectId" @projectDetails="detailsProject"
        @project-edit="editProject" />
    </main>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}

main {
  display: grid;
  grid-template-columns: 3fr 2fr;
}
</style>
