import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import SignUp from '@/views/SignUp.vue'
import Dashboard from '@/views/Dashboard.vue'
import ProjectsTable from '../components/Dashboard/ProjectsTable.vue'
import Statistics from '../components/Dashboard/Statistics.vue'
import Viewer from '../views/Viewer.vue'

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/signup', component: SignUp, name: 'SignUp' },
  { path: '/dashboard', component: Dashboard, name: 'Dashboard', 
    
    children: [
      {
        path: 'projects',
        name: 'Projects Table',
        component: ProjectsTable
      },
      {
        path : 'statistics',
        name : 'Statistics',
        component : Statistics
      }
    ]
  },
  {
    path: '/viewer',
    name: 'Viewer',
    component: Viewer
  }
//   { path: '/bars', component: Bars, name: 'Bars' },
//   { path: '/references', component: References, name: 'Références' },
//   { path: '/stocks', component: Stocks },
//   { 
//     path  : `/stocks/:typeReference(${["bars", "references"].join('|')})/:idReference(\\d+)`
//     // typeReference  -> Bar / Boisson
//     // idReference     -> id de la boisson ou du bar
//     , component: Stocks 
//   },
//   { path: "/:pathMatch(.*)*", component: PageIntrouvable },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
