// import Home from '../views/home-view.vue'
import SignUp from '../views/sign-up.vue'
import Login from '../views/log-in.vue'
import Projects from '../views/my-projects.vue'
import addProject from '../views/add-project.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login,
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
  },
  {
    path: '/add-project',
    name: 'AddProject',
    component: addProject,
  },
]

export default routes
