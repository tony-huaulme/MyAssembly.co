import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import Authenticate from '@/views/Authenticate.vue'
import Dashboard from '@/views/Dashboard.vue'
import ProjectsTable from '../components/Dashboard/ProjectsTable.vue'
import Statistics from '../components/Dashboard/Statistics.vue'
import Model from '../views/Model.vue'
import ModelFromProjectId from '../views/ModelFromProjectId.vue'
import ShareDemoModal from '../components/ShareDemoModal.vue'
import Authenticated from '../views/Authenticated.vue'
import Contact from '../views/Contact.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import ProjectsTableAdmin from '../components/AdminDashboard/ProjectsTableAdmin.vue'
import UsersTable from '../components/AdminDashboard/UsersTable.vue'

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/authenticate', component: Authenticate, name: 'Authenticate' },
  { path: '/dashboard', component: Dashboard, name: 'Dashboard', redirect: '/dashboard/projects',
    
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
    path: '/model',
    name: 'Model',
    component: Model
  },
  // ModelFromProjectId
  {
    path: '/ModelFromProjectId',
    name: 'ModelFromProjectId',
    component: ModelFromProjectId
  },
  {
    path : '/testModal',
    name : 'TestModal',
    component : ShareDemoModal
  },
  {
    path : '/authenticated',
    name : 'Authenticated',
    component : Authenticated
  },
  {
    path : '/contact',
    name : 'Contact',
    component : Contact
  },
  {
    path:'/dbuiazertyuiop',
    component:AdminDashboard,
    redirect: '/dbuiazertyuiop/projects',
    children: [
      {
        path: 'projects',
        name: 'ProjectsAdmin',
        component: ProjectsTableAdmin
      },
      {
        path: 'users',
        name: 'UsersAdmin',
        component: UsersTable
      },
      {
        path : 'statistics',
        name : 'StatisticsAdmin',
        component : Statistics
      }
    ]
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
