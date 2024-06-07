<script setup>
import menuPanel from './components/menu.vue'
import main_page from './components/main_page.vue'
import order_page from './components/order_page.vue'
import category_page from './components/category_page.vue'
</script>

<template>
  <div class="flex">
    <menuPanel />
    <router-view></router-view>
  </div>
</template>
