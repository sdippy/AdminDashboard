import './assets/main.css'

import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'

import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import main_page from './components/main_page.vue'
import order_page from './components/order_page.vue'
import category_page from './components/category_page.vue'
import sneaker_page from './components/sneaker_page.vue'
import review_page from './components/review_page.vue'
import client_page from './components/client_page.vue'
import question_page from './components/question_page.vue'
import admin_page from './components/admin_page.vue'
import Auth from './components/Auth.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: main_page },
  { path: '/Order', name: 'Order', component: order_page },
  { path: '/Category', name: 'Category', component: category_page },
  { path: '/Sneaker', name: 'Sneaker', component: sneaker_page },
  { path: '/Review', name: 'Review', component: review_page },
  { path: '/Client', name: 'Client', component: client_page },
  { path: '/Question', name: 'Question', component: question_page },
  { path: '/Admin', name: 'Admin', component: admin_page },
  {
    path: '/Auth',
    name: 'Auth',
    component: Auth,
    meta: { hideNavigation: true },
    beforeEnter: (to, from, next) => {
      const userSession = sessionStorage.getItem('userSession')
      // Если пользователь уже авторизован, перенаправляем его на главную страницу
      if (userSession) {
        router.back()
      } else {
        // Если пользователь не авторизован, разрешаем доступ к странице входа
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)

app.use(autoAnimatePlugin)

app.mount('#app')
