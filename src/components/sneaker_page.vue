<script setup>
import { onMounted, ref, provide, reactive, watch } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'

import CardListSneakers from './CardListSneakers.vue'
import WindowSneaker from './WindowSneaker.vue'
import WindowSneakerAdd from './WindowSneakerAdd.vue'

// Массив категорий
const sneakers = ref([])
const sneakersNumber = ref(0)
const selectedSneaker = ref(null) // Переменная для хранения информации о выбранном товаре
const categories = ref([])

const searchInput = ref(null)
const titleSort = ref(null)
const BrandSelect = ref(null)

const defaultSort = 'id'
const defaultOrder = 'asc'
const title = 'title'

const filters = reactive({
  sort: defaultSort,
  order: defaultOrder,
  searchQuerry: '',
  BrandProcess: ''
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

const onChangeBrandProcess = (event) => {
  filters.BrandProcess = event.target.value
}

const clearCategory = async () => {
  searchInput.value.value = ''
  filters.searchQuerry = ''
  filters.sort = defaultSort
  filters.order = defaultOrder
  titleSort.value.value = `${defaultSort}`
  filters.BrandProcess = ''
  BrandSelect.value.value = ``
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuerry = event.target.value
}, 200)

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

const sneakerWindowAddOpen = ref(false)

const closeSneakerAddWindow = async () => {
  sneakerWindowAddOpen.value = false
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  load()
}

const openSneakerAddWindow = () => {
  load()
  sneakerWindowAddOpen.value = true
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
  document.body.style.overflow = 'hidden'
}

provide('sneaker', {
  onClickSneaker,
  selectedSneaker,
  closeSneakerWindow,
  closeSneakerAddWindow
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

    if (filters.BrandProcess) {
      params.category = filters.BrandProcess
    }

    const { data } = await axios.get('https://s-shop-production.up.railway.app/sneakers', { params })
    sneakers.value = data.map((obj) => ({
      ...obj
    }))
    sneakersNumber.value = data.length
  } catch (err) {
    console.log(err)
  }
}

const fetchCategories = async () => {
  try {
    const response = await axios.get('https://s-shop-production.up.railway.app/categories')
    categories.value = response.data
  } catch (err) {
    console.log(err)
  }
}

const load = async () => {
  await fetchItems()
  await fetchCategories()
}

onMounted(async () => {
  await fetchItems()
  await fetchCategories()
})

watch(filters, fetchItems)
</script>

<template>
  <WindowSneaker v-if="sneakerWindowOpen" />
  <WindowSneakerAdd v-if="sneakerWindowAddOpen" />

  <div class="h-svh min-h-[700px] w-full p-10">
    <div class="w-full h-full flex flex-col gap-5">
      <div class="w-full flex gap-5 h-[100px] bg-[#383838]">
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
          <button
            @click="openSneakerAddWindow"
            class="h-[40px] w-full bg-[#145F37] active:bg-[#efefef] active:text-[#145F37] border border-transparent hover:border-[#efefef] transition-all ease-in-out text-[#efefef] font-light text-[16px] rounded-[5px]"
          >
            Создать
          </button>
        </div>
        <div class="w-[400px]">
          <select
            ref="titleSort"
            @change="onChangeSelect"
            class="select_filter h-[40px] w-full text-center text-[#efefef] font-light text-[16px] bg-[#2C2C2C] border border-[#383838] rounded-[5px]"
          >
            <option value="id">По id (По возрастанию)</option>
            <option value="id&_order=desc">По id (По убыванию)</option>
            <option :value="title">По наименованию (По возрастанию)</option>
            <option :value="`${title}&_order=desc`">По наименованию (По убыванию)</option>
          </select>
        </div>

        <select
          ref="BrandSelect"
          @change="onChangeBrandProcess"
          class="select_filter h-[40px] w-[400px] text-center text-[#efefef] font-light text-[16px] bg-[#2C2C2C] border border-[#383838] rounded-[5px]"
        >
          <option value="">Все категории</option>
          <option v-for="category in categories" :key="category.id" :value="category.title">
            {{ category.title }}
          </option>
        </select>

        <button
          @click="clearCategory"
          class="h-[40px] w-[250px] bg-[#2C2C2C] active:bg-[#efefef] active:text-[#2C2C2C] border border-transparent hover:border-[#efefef] transition-all ease-in-out text-[#efefef] font-light text-[16px] rounded-[5px]"
        >
          Очистить фильтры
        </button>
      </div>

      <div
        class="bg-[#2C2C2C] h-[calc(100%-80px)] rounded-[30px] hover:shadow-2xl transition-all ease-in-out flex flex-col p-5 gap-5"
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
