import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Scrum from '../views/ScrumView.vue'
import Quiz from '../views/QuizView.vue'
import DownloadMaterials from '../views/DownloadMaterialsView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: Home
  },
  {
    path: '/scrum',
    name: 'ScrumView',
    component: Scrum
  },
  {
    path: '/quiz',
    name: 'QuizView',
    component: Quiz
  },
  {
    path: '/download-materials',
    name: 'DownloadMaterialsView',
    component: DownloadMaterials
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
