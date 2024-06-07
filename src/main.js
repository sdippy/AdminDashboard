import './assets/main.css'

import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'

import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import main_page from './components/main_page.vue'
import order_page from './components/order_page.vue'
import category_page from './components/category_page.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: main_page },
  { path: '/Order', name: 'Order', component: order_page },
  { path: '/Category', name: 'Category', component: category_page }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)

app.use(autoAnimatePlugin)

app.mount('#app')
