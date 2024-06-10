<script setup>
import { ref, onMounted, provide, computed, watch, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from 'axios'
import debounce from 'lodash.debounce'
import Datepicker from 'vue3-datepicker'

import CardListOrder from './CardListOrder.vue'
import WindowOrder from './WindowOrder.vue'

const router = useRouter()
const route = useRoute()

const orders = ref([])
const ordersNumber = ref(0)
const selectedOrder = ref(null)
const searchInput = ref(null)
const sortSelect = ref(null)
const deliverySelect = ref(null)

const defaultSort = 'id'
const defaultOrder = 'asc'
const priceSort = 'totalPrice'
const selectedDate = ref(null)
const format = 'yyyy-MM-dd'

const filters = reactive({
  sort: defaultSort,
  order: defaultOrder,
  searchQuerry: '',
  DeliveryProcess: '',
  user: route.query.user || null
})

const clearCategory = async () => {
  searchInput.value.value = ''
  filters.searchQuerry = ''
  filters.sort = defaultSort
  filters.order = defaultOrder
  filters.DeliveryProcess = ''
  selectedDate.value = null
  sortSelect.value.value = `${defaultSort}`
  deliverySelect.value.value = ``
  filters.user = null
  router.push({ path: '/Order' })
}

const onChangeSelect = (event) => {
  const value = event.target.value
  if (value.includes('&')) {
    const [sort, order] = value.split('&')
    filters.sort = sort
    filters.order = order.replace('_order=', '')
  } else {
    filters.sort = value
    filters.order = 'asc'
  }
}

const onChangeDeliveryProcess = (event) => {
  filters.DeliveryProcess = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuerry = event.target.value
}, 200)

const updateSelectedOrder = (order) => {
  selectedOrder.value = order
}

const onClickOrder = (order) => {
  updateSelectedOrder(order)
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
    let formattedDate = null
    if (selectedDate.value) {
      const date = new Date(selectedDate.value)
      formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    }
    const params = {
      _sort: filters.sort,
      _order: filters.order,
      DeliveryDate: formattedDate,
      userId: filters.user
    }

    if (filters.searchQuerry) {
      params.q = filters.searchQuerry
    }

    if (filters.DeliveryProcess) {
      params.DeliveryProcess = filters.DeliveryProcess
    }

    const { data } = await axios.get(`http://localhost:3000/orders`, { params })

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

const totalRevenue = computed(() => {
  return orders.value.reduce((acc, order) => acc + (order.totalPrice || 0), 0)
})

watch(filters, fetchOrders)
watch(selectedDate, fetchOrders)
</script>

<template>
  <WindowOrder v-if="orderWindowOpen" />
  <div class="h-svh min-h-[700px] w-full p-10">
    <div class="w-full h-full flex flex-col gap-5">
      <div class="w-full flex gap-5 h-[100px] bg-[#383838]">
        <div class="w-[400px]">
          <div class="relative mb-5 h-[40px] flex items-center">
            <img class="find_icon absolute pl-5" src="/Images/search.svg" alt="Search" />
            <input
              ref="searchInput"
              @input="onChangeSearchInput"
              class="find_box h-full w-full text-center text-[#efefef] font-light text-[16px] bg-[#2C2C2C] border border-[#383838] rounded-[5px]"
              placeholder="Поиск"
              type="text"
            />
          </div>

          <select
            ref="deliverySelect"
            @change="onChangeDeliveryProcess"
            class="select_filter h-[40px] w-full text-center text-[#efefef] font-light text-[16px] bg-[#2C2C2C] border border-[#383838] rounded-[5px]"
          >
            <option value="">Все статусы</option>
            <option value="Отменен">Отменен</option>
            <option value="Ожидает подтверждения">Ожидает подтверждения</option>
            <option value="Заказ отправлен">Заказ отправлен</option>
            <option value="Заказ получен">Заказ получен</option>
          </select>
        </div>
        <div class="h-[40px] w-[400px]">
          <select
            ref="sortSelect"
            @change="onChangeSelect"
            class="select_filter h-full w-full text-center text-[#efefef] font-light text-[16px] bg-[#2C2C2C] border border-[#383838] rounded-[5px]"
          >
            <option value="id">По id (По возрастанию)</option>
            <option value="id&_order=desc">По id (По убыванию)</option>
            <option :value="priceSort">По цене (дешевые)</option>
            <option :value="`${priceSort}&_order=desc`">По цене (дорогие)</option>
          </select>
        </div>
        <div class="h-[40px] w-[400px] flex flex-col gap-5">
          <div class="">
            <datepicker
              v-model="selectedDate"
              placeholder="Выберите дату"
              :format="format"
              class="h-[40px] w-[400px] text-center text-[#efefef] font-light text-[16px] bg-[#2C2C2C] border border-[#383838] rounded-[5px]"
            ></datepicker>
          </div>
        </div>
        <button
          @click="clearCategory"
          class="h-[40px] w-[250px] bg-[#2C2C2C] active:bg-[#efefef] active:text-[#2C2C2C] hover:bg-[#efefef] hover:text-[#2C2C2C] transition-all ease-in-out text-[#efefef] font-light text-[16px] rounded-[5px]"
        >
          Очистить фильтры
        </button>
      </div>

      <div
        class="bg-[#2C2C2C] h-[calc(100%-80px)] rounded-[30px] hover:shadow-2xl transition-all ease-in-out flex flex-col p-5 gap-5"
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
          <div>На сумму: {{ totalRevenue }} ₽</div>
        </div>
      </div>
    </div>
  </div>
</template>
