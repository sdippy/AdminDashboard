<script setup>
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'

import menuPanel from './components/menu.vue'
import main_page from './components/main_page.vue'
import order_page from './components/order_page.vue'
import category_page from './components/category_page.vue'
import ExitWindow from './components/ExitWindow.vue'

const router = useRouter()

var storedUserId = sessionStorage.getItem('userSession')
if (!storedUserId) {
  router.push('/auth')
}

const exitWindowOpen = ref(false)

const closeExitWindow = async () => {
  exitWindowOpen.value = false
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

const openExitWindow = () => {
  exitWindowOpen.value = true
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
  document.body.style.overflow = 'hidden'
}

provide('exit', {
  closeExitWindow,
  openExitWindow
})
</script>

<template>
  <ExitWindow v-if="exitWindowOpen" />
  <div class="flex">
    <menuPanel v-if="!$route.meta.hideNavigation" />
    <router-view></router-view>
  </div>
</template>
