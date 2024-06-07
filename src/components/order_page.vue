<script setup>
import { ref, onMounted, provide } from 'vue'

import axios from 'axios'

import CardListOrder from './CardListOrder.vue'
import WindowOrder from './WindowOrder.vue'

const orders = ref([])
const ordersNumber = ref(0)
const selectedOrder = ref(null) // Переменная для хранения информации о выбранном заказе

const updateSelectedOrder = (order) => {
  selectedOrder.value = order
  // console.log(selectedOrder.value)
}

const onClickOrder = (order) => {
  updateSelectedOrder(order)
  console.log(selectedOrder.value)
  openOrderWindow()
}

const orderWindowOpen = ref(false)

const closeOrderWindow = async () => {
  orderWindowOpen.value = false
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  load()
}

const openOrderWindow = () => {
  load()
  orderWindowOpen.value = true
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
  document.body.style.overflow = 'hidden'
}

provide('order', {
  onClickOrder,
  selectedOrder,
  closeOrderWindow
})

const fetchOrders = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/orders`)

    orders.value = data.map((order) => ({
      ...order
    }))
    ordersNumber.value = data.length
  } catch (err) {
    console.log(err)
  }
}

const load = async () => {
  await fetchOrders()
}

onMounted(async () => {
  await fetchOrders()
})
</script>

<template>
  <WindowOrder v-if="orderWindowOpen" />
  <div class="h-svh min-h-[700px] w-full p-10">
    <div class="w-full h-full flex flex-col gap-5">
      <div class="w-full flex flex-col p-5 gap-5 h-[150px] bg-[#2C2C2C] rounded-[30px]"></div>

      <div
        class="bg-[#2C2C2C] h-full rounded-[30px] hover:shadow-2xl transition-all ease-in-out flex flex-col p-5 gap-5"
      >
        <div class="w-full flex justify-between">
          <h2 class="text-[#efefef] font-bold text-[20px]">Заказы</h2>
        </div>
        <div class="w-full flex text-[#B9B9B9] font-light text-[16px]">
          <span class="w-[100px]">Заказ</span>
          <span class="w-[400px]">ФИО клиента</span>
          <span class="w-[200px]">Дата</span>
          <span class="w-[300px]">Цена</span>
          <span class="w-[300px]">Статус заказа</span>
        </div>
        <div class="overflow-auto h-full">
          <CardListOrder :items="orders" />
        </div>
        <div class="h-[30px] w-full flex gap-5 text-[#B9B9B9] font-light text-[16px]">
          <div>Всего заказов: {{ ordersNumber }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order {
  background-image: url('/bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.money {
  background-image: url('/bg (1).jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.clients {
  background-image: url('/bg (2).jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
