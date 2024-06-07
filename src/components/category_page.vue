<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import CardListCategory from './CardListCategory.vue'

// Массив категорий
const categories = ref([])

const fetchItems = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/categories')
    categories.value = data.map((obj) => ({
      ...obj
    }))
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchItems()
})
</script>

<template>
  <div class="h-svh min-h-[700px] w-full p-10">
    <div class="w-full h-full flex flex-col gap-5">
      <CardListCategory :items="categories" />
    </div>
  </div>
</template>
