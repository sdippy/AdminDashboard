<script setup>
import { onMounted, ref, provide, watch, reactive } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { useRouter } from 'vue-router'

import CardListClient_component from './CardListClient_component.vue'
import WindowClient from './WindowAdmin.vue'

const router = useRouter()

const userSession = sessionStorage.getItem('userSession')

const administratorRights = userSession === 'admin'

if (!administratorRights) {
  window.location.reload()

  router.back()
}

// Массив категорий
const users = ref([])
const usersNumber = ref(0)
const selectedClient = ref(null) // Переменная для хранения информации о выбранном клиенте

const searchInput = ref(null)
const titleSort = ref(null)
const RoleSelect = ref(null)

const defaultSort = 'id'
const defaultOrder = 'asc'
const title = 'fullName'

const filters = reactive({
  sort: defaultSort,
  order: defaultOrder,
  searchQuerry: '',
  RoleProcess: ''
})

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

const onChangeRoleProcess = (event) => {
  filters.RoleProcess = event.target.value
}

const clearCategory = async () => {
  searchInput.value.value = ''
  filters.searchQuerry = ''
  filters.sort = defaultSort
  filters.order = defaultOrder
  titleSort.value.value = `${defaultSort}`
  filters.RoleProcess = ''
  RoleSelect.value.value = ``
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuerry = event.target.value
}, 200)

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
    const params = {
      _sort: filters.sort,
      _order: filters.order
    }
    if (filters.searchQuerry) {
      params.q = filters.searchQuerry
    }

    if (filters.RoleProcess) {
      params.role = filters.RoleProcess
    }

    const { data } = await axios.get('http://localhost:3000/users?role_ne=user', { params })
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

watch(filters, fetchItems)
</script>

<template>
  <WindowClient v-if="clientWindowOpen" />
  <div class="h-svh min-h-[700px] w-full p-10">
    <div class="w-full h-full flex flex-col gap-5">
      <div class="w-full flex gap-5 h-[60px] bg-[#383838]">
        <div class="w-[400px] flex flex-col">
          <div class="relative mb-5 w-[400px] flex items-center">
            <img class="find_icon absolute pl-5" src="/Images/search.svg" alt="Search" />
            <input
              ref="searchInput"
              @input="onChangeSearchInput"
              class="find_box h-[40px] w-full text-center text-[#efefef] font-light text-[16px] bg-[#2C2C2C] border border-[#383838] rounded-[5px]"
              placeholder="Поиск"
              type="text"
            />
          </div>
        </div>
        <div class="w-[400px]">
          <select
            ref="titleSort"
            @change="onChangeSelect"
            class="select_filter h-[40px] w-full text-center text-[#efefef] font-light text-[16px] bg-[#2C2C2C] border border-[#383838] rounded-[5px]"
          >
            <option value="id">По id (По возрастанию)</option>
            <option value="id&_order=desc">По id (По убыванию)</option>
            <option :value="title">По ФИО (По возрастанию)</option>
            <option :value="`${title}&_order=desc`">По ФИО (По убыванию)</option>
          </select>
        </div>

        <select
          ref="RoleSelect"
          @change="onChangeRoleProcess"
          class="select_filter h-[40px] w-[400px] text-center text-[#efefef] font-light text-[16px] bg-[#2C2C2C] border border-[#383838] rounded-[5px]"
        >
          <option value="">Все роли</option>
          <option value="manager">Менеджер</option>
          <option value="admin">Администратор</option>
        </select>

        <button
          @click="clearCategory"
          class="h-[40px] w-[250px] bg-[#2C2C2C] active:bg-[#efefef] active:text-[#2C2C2C] hover:bg-[#efefef] hover:text-[#2C2C2C] transition-all ease-in-out text-[#efefef] font-light text-[16px] rounded-[5px]"
        >
          Очистить фильтры
        </button>
      </div>

      <div
        class="bg-[#2C2C2C] h-[calc(100%-40px)] rounded-[30px] hover:shadow-2xl transition-all ease-in-out flex flex-col p-5 gap-5"
      >
        <div class="w-full flex justify-between">
          <h2 class="text-[#efefef] font-bold text-[20px]">Клиенты</h2>
        </div>
        <div class="w-full flex text-[#B9B9B9] font-light text-[16px]">
          <span class="w-[100px]">Клиент</span>
          <span class="w-[400px]">ФИО</span>
          <span class="w-[500px]">Почта</span>
          <span class="w-[100px]">Роль</span>
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
