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

</script>

<template>
  <div class="container">
    <main>
      <NavMain :user="user" @user-data="updateUser" />
      <router-view :user="user" @user-data="updateUser" @new-project="updateProjects"></router-view>
      <MyProjects :user="user" :project="project" />
    </main>
  </div>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

navMain {
  grid: 1/3;
}
</style>
