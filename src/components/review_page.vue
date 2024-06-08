<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import CardListReview from './CardListReview.vue'

const reviews = ref([])
const reviewsNumber = ref(0)

const fetchItems = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/reviews')
    reviews.value = data.map((obj) => ({
      ...obj
    }))
    reviewsNumber.value = data.length
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
          <h2 class="text-[#efefef] font-bold text-[20px]">Отзывы</h2>
        </div>
        <div class="w-full flex text-[#B9B9B9] font-light text-[16px]">
          <span class="w-[100px]">Отзыв</span>
          <span class="w-[200px]">isActive?</span>
          <span class="w-[100px]">Рейтинг</span>
          <span class="w-[500px]">Товар</span>
          <span class="w-[200px]">Дата</span>
        </div>
        <div class="overflow-auto h-full">
          <CardListReview :items="reviews" />
        </div>
        <div class="h-[30px] w-full flex gap-5 text-[#B9B9B9] font-light text-[16px]">
          <div>Всего отзывов: {{ reviewsNumber }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
