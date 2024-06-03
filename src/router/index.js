import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Scrum from '../views/Scrum.vue'
import Quiz from '../views/Quiz.vue'
import DownloadMaterials from '../views/DownloadMaterials.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/scrum',
    name: 'Scrum',
    component: Scrum
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/download-materials',
    name: 'DownloadMaterials',
    component: DownloadMaterials
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
