<script setup>
import { onMounted, ref, provide } from 'vue'
import axios from 'axios'

import CardListSneakers from './CardListSneakers.vue'
import WindowSneaker from './WindowSneaker.vue'

// Массив категорий
const sneakers = ref([])
const sneakersNumber = ref(0)
const selectedSneaker = ref(null) // Переменная для хранения информации о выбранном товаре

const updateselectedSneaker = (order) => {
  selectedSneaker.value = order
  console.log(selectedSneaker.value)
}

const onClickSneaker = (sneaker) => {
  updateselectedSneaker(sneaker)
  openSneakerWindow()
}

const sneakerWindowOpen = ref(false)

const closeSneakerWindow = async () => {
  sneakerWindowOpen.value = false
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  load()
}

const openSneakerWindow = () => {
  load()
  sneakerWindowOpen.value = true
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
  document.body.style.overflow = 'hidden'
}

provide('sneaker', {
  onClickSneaker,
  selectedSneaker,
  closeSneakerWindow
})

const fetchItems = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/sneakers')
    sneakers.value = data.map((obj) => ({
      ...obj
    }))
    sneakersNumber.value = data.length
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
  <WindowSneaker v-if="sneakerWindowOpen" />
  <div class="h-svh min-h-[700px] w-full p-10">
    <div class="w-full h-full flex flex-col gap-5">
      <div class="w-full flex flex-col p-5 gap-5 h-[150px] bg-[#2C2C2C] rounded-[30px]"></div>

      <div
        class="bg-[#2C2C2C] h-[calc(100%-170px)] rounded-[30px] hover:shadow-2xl transition-all ease-in-out flex flex-col p-5 gap-5"
      >
        <div class="w-full flex justify-between">
          <h2 class="text-[#efefef] font-bold text-[20px]">Товары</h2>
        </div>
        <div class="w-full flex text-[#B9B9B9] font-light text-[16px]">
          <span class="w-[100px]">Товар</span>
          <span class="w-[400px]">Наименование</span>
          <span class="w-[300px]">Категория</span>
          <span class="w-[150px]">Цена</span>
          <span class="w-[150px]">Цена со скидкой</span>
          <span class="w-[150px]">Картинка</span>
        </div>
        <div class="overflow-auto h-full">
          <CardListSneakers :items="sneakers" />
        </div>
        <div class="h-[30px] w-full flex gap-5 text-[#B9B9B9] font-light text-[16px]">
          <div>Всего товаров: {{ sneakersNumber }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
