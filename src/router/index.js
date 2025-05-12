import { createRouter, createWebHistory } from 'vue-router'
import YoutubeSearch from '../components/YoutubeSearch.vue'  
import SavedMovies from '../components/SavedMovies.vue' 

const routes = [
  { path: '/youtube-project/', name: 'Main', component: YoutubeSearch },
  { path: '/saved', name: 'Saved', component: SavedMovies },
]

const router = createRouter({
  history: createWebHistory(),  
  routes,  
})

export default router
