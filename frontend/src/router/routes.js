import Home from '../views/home-view.vue'
import SignUp from '../views/sign-up.vue'
import Login from '../views/log-in.vue'
import Projects from '../views/my-projects.vue'
import addProject from '../views/add-project.vue'
import editProject from '../views/edit-project.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    props: true,
  },
  {
    path: '/add-project',
    name: 'AddProject',
    component: addProject,
    beforeEnter: (to, from) => {
      if (!to.params.user) {
        return false
      }
    },
  },
  {
    path: '/edit-project',
    name: 'EditProject',
    component: editProject,
    props: true,
    beforeEnter: (to, from) => {
      if (!to.params.user) {
        return false
      }
    },
  },
]

export default routes
