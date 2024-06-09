<script setup>
import { onMounted, ref, provide } from 'vue'
import axios from 'axios'

import CardListClient_component from './CardListClient_component.vue'
import WindowClient from './WindowClient.vue'

// Массив категорий
const users = ref([])
const usersNumber = ref(0)
const selectedClient = ref(null) // Переменная для хранения информации о выбранном клиенте

const updateselectedClient = (order) => {
  selectedClient.value = order
}

const onClickClient = (client) => {
  updateselectedClient(client)
  openClientWindow()
}

const clientWindowOpen = ref(false)

const closeClientWindow = async () => {
  clientWindowOpen.value = false
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  load()
}

const openClientWindow = () => {
  load()
  clientWindowOpen.value = true
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
  document.body.style.overflow = 'hidden'
}

provide('client', {
  onClickClient,
  selectedClient,
  closeClientWindow
})

const fetchItems = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/users')
    users.value = data.map((obj) => ({
      ...obj
    }))
    usersNumber.value = data.length
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
  <WindowClient v-if="clientWindowOpen" />
  <div class="h-svh min-h-[700px] w-full p-10">
    <div class="w-full h-full flex flex-col gap-5">
      <div class="w-full flex flex-col p-5 gap-5 h-[150px] bg-[#2C2C2C] rounded-[30px]"></div>

      <div
        class="bg-[#2C2C2C] h-[calc(100%-170px)] rounded-[30px] hover:shadow-2xl transition-all ease-in-out flex flex-col p-5 gap-5"
      >
        <div class="w-full flex justify-between">
          <h2 class="text-[#efefef] font-bold text-[20px]">Клиенты</h2>
        </div>
        <div class="w-full flex text-[#B9B9B9] font-light text-[16px]">
          <span class="w-[100px]">Клиент</span>
          <span class="w-[400px]">ФИО</span>
          <span class="w-[700px]">Почта</span>
        </div>
        <div class="overflow-auto h-full">
          <CardListClient_component :items="users" />
        </div>
        <div class="h-[30px] w-full flex gap-5 text-[#B9B9B9] font-light text-[16px]">
          <div>Всего клиентов: {{ usersNumber }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
