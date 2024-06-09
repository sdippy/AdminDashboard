<script setup>
import { ref, onMounted, computed, provide } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

import BarChart_component from './BarChart.vue'
import RingChart_component from './RingChart.vue'

import axios from 'axios'

import CardListOrder from './CardListOrder.vue'
import WindowOrder from './WindowOrder.vue'

const orders = ref([])
const ordersTotal = ref([])
const ordersNumber = ref(0)
const usersNumber = ref(0)
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
    const { data } = await axios.get(
      `http://localhost:3000/orders?DeliveryProcess=Ожидает подтверждения`
    )

    orders.value = data.map((order) => ({
      ...order
    }))
    ordersNumber.value = data.length
  } catch (err) {
    console.log(err)
  }
}

const fetchOrders_1 = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/orders`)

    ordersTotal.value = data.map((order) => ({
      ...order
    }))
  } catch (err) {
    console.log(err)
  }
}

const fetchUsers = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/users`)

    usersNumber.value = data.length
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchOrders()
  await fetchUsers()
  await fetchOrders_1()
})

const load = async () => {
  await fetchOrders()
}

const totalRevenue = computed(() => {
  return ordersTotal.value.reduce((acc, order) => acc + (order.totalPrice || 0), 0)
})
</script>

<template>
  <WindowOrder v-if="orderWindowOpen" />
  <div class="h-svh min-h-[700px] w-full p-10">
    <div class="w-full h-full flex flex-col gap-5">
      <div class="grid grid-cols-3 grid-rows-1 gap-5">
        <div
          class="order flex flex-col h-[140px] rounded-[30px] pl-20 justify-center hover:shadow-2xl hover:-translate-y-1 transition-all ease-in-out"
        >
          <h2 class="text-[#efefef] font-bold text-[20px]">Заказов</h2>
          <span class="text-[#efefef] font-bold text-[40px]">{{ ordersNumber }}</span>
          <div class="flex justify-end">
            <router-link
              to="/order"
              class="text-[#efefef] font-bold text-[15px] text-right mr-[20px] border-b border-transparent hover:border-b hover:border-[#efefef] transition-all ease-in-out"
              >Детали ➔</router-link
            >
          </div>
        </div>
        <div
          class="money flex flex-col h-[140px] rounded-[30px] pl-20 justify-center hover:shadow-2xl hover:-translate-y-1 transition-all ease-in-out"
        >
          <h2 class="text-[#efefef] font-bold text-[20px]">Доход</h2>
          <span class="text-[#efefef] font-bold text-[40px]">{{ totalRevenue }} ₽</span>
          <div class="flex justify-end">
            <router-link
              to="/order"
              class="text-[#efefef] font-bold text-[15px] text-right mr-[20px] border-b border-transparent hover:border-b hover:border-[#efefef] transition-all ease-in-out"
              >Детали ➔</router-link
            >
          </div>
        </div>
        <div
          class="clients flex flex-col h-[140px] rounded-[30px] pl-20 justify-center hover:shadow-2xl hover:-translate-y-1 transition-all ease-in-out"
        >
          <h2 class="text-[#efefef] font-bold text-[20px]">Клиентов</h2>
          <span class="text-[#efefef] font-bold text-[40px]">{{ usersNumber }}</span>
          <div class="flex justify-end">
            <a
              href="#"
              class="text-[#efefef] font-bold text-[15px] text-right mr-[20px] border-b border-transparent hover:border-b hover:border-[#efefef] transition-all ease-in-out"
              >Детали ➔</a
            >
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 grid-rows-1 gap-5">
        <div
          class="col-span-2 bg-[#2C2C2C] h-[300px] rounded-[30px] flex justify-center hover:shadow-2xl hover:-translate-y-1 transition-all ease-in-out"
        >
          <BarChart_component />
        </div>
        <div
          class="col-start-3 h-[300px] bg-[#2C2C2C] rounded-[30px] flex justify-center hover:shadow-2xl hover:-translate-y-1 transition-all ease-in-out"
        >
          <RingChart_component :total-revenue="totalRevenue" />
        </div>
      </div>
      <div
        class="bg-[#2C2C2C] h-[400px] rounded-[30px] hover:shadow-2xl transition-all ease-in-out flex flex-col p-5 gap-5"
      >
        <div class="w-full flex justify-between">
          <h2 class="text-[#efefef] font-bold text-[20px]">Заказы</h2>
          <router-link
            to="/order"
            class="text-[#efefef] font-light text-[16px] border-b border-transparent hover:border-[#efefef] transition-all ease-in-out"
            >Посмотреть все</router-link
          >
        </div>
        <div class="w-full flex text-[#B9B9B9] font-light text-[16px]">
          <span class="w-[100px]">Заказ</span>
          <span class="w-[400px]">ФИО клиента</span>
          <span class="w-[200px]">Дата</span>
          <span class="w-[300px]">Цена</span>
          <span class="w-[300px]">Статус заказа</span>
        </div>
        <div class="overflow-auto">
          <CardListOrder :items="orders" />
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
