<script setup>
import { ref } from 'vue';
import NavMain from './components/header-main.vue'
import MyProjects from './views/my-projects.vue'

const user = ref(null)
const updateUser = (userData) => {
  user.value = userData
}

const project = ref(null)
const updateProjects = (projectData) => {
  project.value = projectData
}

const projectDetailId = ref(null)
const updateProjectDetails = (id) => {
  // console.log('from APP ', id)
  projectDetailId.value = id
  // console.log(projectDetailId.value)
}

</script>

<template>
  <div class="container">
    <main>
      <NavMain :user="user" @user-data="updateUser" />
      <router-view :user="user" @user-data="updateUser" @new-project="updateProjects"
        :projectDetailId="projectDetailId">
      </router-view>
      <MyProjects :user="user" :project="project" @project-id="updateProjectDetails" />
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
