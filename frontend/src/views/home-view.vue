<template>
    <h1>home</h1>
</template>

<!-- <template>
    <div>
        <main>
            <NavMain :user="user" @user-data="updateUser" />
            <router-view @user-data="updateUser" :user="user" class="main-view"></router-view>
            <router-view name="projects" :user="user" class="projects"></router-view>
            <MyProjects :user="user" />
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import NavMain from '../components/header-main.vue'
import MyProjects from '../views/my-projects.vue'

const user = ref(null)
const updateUser = (userData) => {
    user.value = userData
}


</script>

<style scoped>
main {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 1fr 12fr;
}

.main-view {
    background-color: coral;
    /* grid-column: ; */
}

.projects {
    background-color: blue;
    color: darkorange;
}
</style> -->