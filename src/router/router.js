import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'

const routes = [
  { path: '/', component: HomePage, name: 'Accueil' },
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
