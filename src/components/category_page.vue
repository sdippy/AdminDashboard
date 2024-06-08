<script setup>
import { onMounted, ref, provide } from 'vue'
import axios from 'axios'

import CardListCategory from './CardListCategory.vue'

// Массив категорий
const categories = ref([])
const categoriesNumber = ref(0)
const selectedCategory = ref(null) // Переменная для хранения информации о выбранном бренде

const updateselectedCategory = (order) => {
  selectedCategory.value = order
  console.log(selectedCategory.value)
}

const onClickCategory = (category) => {
  updateselectedCategory(category)
  // openOrderWindow()
}

provide('category', {
  onClickCategory,
  selectedCategory
  // closeOrderWindow
})

const fetchItems = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/categories')
    categories.value = data.map((obj) => ({
      ...obj
    }))
    categoriesNumber.value = data.length
  } catch (err) {
    console.log(err)
  }
}

const load = async () => {
  await fetchItems()
}

onMounted(async () => {
  await fetchItems()
})
</script>

<template>
  <div class="h-svh min-h-[700px] w-full p-10">
    <div class="w-full h-full flex flex-col gap-5">
      <div class="w-full flex flex-col p-5 gap-5 h-[150px] bg-[#2C2C2C] rounded-[30px]"></div>

      <div
        class="bg-[#2C2C2C] h-[calc(100%-170px)] rounded-[30px] hover:shadow-2xl transition-all ease-in-out flex flex-col p-5 gap-5"
      >
        <div class="w-full flex justify-between">
          <h2 class="text-[#efefef] font-bold text-[20px]">Бренды</h2>
        </div>
        <div class="w-full flex text-[#B9B9B9] font-light text-[16px]">
          <span class="w-[100px]">Бренд</span>
          <span class="w-[400px]">Наименование</span>
          <span class="w-[150px]">Картинка</span>
        </div>
        <div class="overflow-auto h-full">
          <CardListCategory :items="categories" />
        </div>
        <div class="h-[30px] w-full flex gap-5 text-[#B9B9B9] font-light text-[16px]">
          <div>Всего брендов: {{ categoriesNumber }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
