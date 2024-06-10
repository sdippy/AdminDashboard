<script setup>
import { onMounted, ref, provide, reactive, watch } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import Datepicker from 'vue3-datepicker'

import CardListQuestion from './CardListQuestion.vue'
import WindowQuestion from './WindowQuestion.vue'

const questions = ref([])
const questionsNumber = ref(0)
const selectedQuestion = ref(null) // Переменная для хранения информации о выбранном вопросе

const searchInput = ref(null)
const titleSort = ref(null)
const selectedDate = ref(null)
const format = 'yyyy-MM-dd'
const ActiveSelect = ref(null)

const defaultSort = 'id'
const defaultOrder = 'asc'
const title = 'name'

const filters = reactive({
  sort: defaultSort,
  order: defaultOrder,
  searchQuerry: '',
  ActiveProcess: ''
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

const onChangeActiveProcess = (event) => {
  filters.ActiveProcess = event.target.value
}

const clearCategory = async () => {
  searchInput.value.value = ''
  filters.searchQuerry = ''
  filters.sort = defaultSort
  filters.order = defaultOrder
  titleSort.value.value = `${defaultSort}`
  selectedDate.value = null
  filters.ActiveProcess = ''
  ActiveSelect.value.value = ``
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuerry = event.target.value
}, 200)

const updateselectedQuestion = (order) => {
  selectedQuestion.value = order
}

const onClickQuestion = (question) => {
  updateselectedQuestion(question)
  openQuestionWindow()
}

const questionWindowOpen = ref(false)

const closeQuestionWindow = async () => {
  questionWindowOpen.value = false
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  load()
}

const openQuestionWindow = () => {
  load()
  questionWindowOpen.value = true
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
  document.body.style.overflow = 'hidden'
}

provide('question', {
  onClickQuestion,
  selectedQuestion,
  closeQuestionWindow
})

const fetchItems = async () => {
  try {
    let formattedDate = null
    if (selectedDate.value) {
      const date = new Date(selectedDate.value)
      formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    }
    const params = {
      _sort: filters.sort,
      _order: filters.order,
      date: formattedDate
    }
    if (filters.searchQuerry) {
      params.q = filters.searchQuerry
    }

    if (filters.ActiveProcess) {
      params.isChecked = filters.ActiveProcess
    }
    const { data } = await axios.get('http://localhost:3000/blank', { params })
    questions.value = data.map((obj) => ({
      ...obj
    }))
    questionsNumber.value = data.length
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
watch(selectedDate, fetchItems)
</script>

<template>
  <WindowQuestion v-if="questionWindowOpen" />
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
          <select
            ref="ActiveSelect"
            @change="onChangeActiveProcess"
            class="select_filter h-[40px] w-full text-center text-[#efefef] font-light text-[16px] bg-[#2C2C2C] border border-[#383838] rounded-[5px]"
          >
            <option value="">Все статусы</option>
            <option :value="true">Проверен</option>
            <option :value="false">Не проверен</option>
          </select>
        </div>
        <div class="w-[400px]">
          <select
            ref="titleSort"
            @change="onChangeSelect"
            class="select_filter h-[40px] w-full text-center text-[#efefef] font-light text-[16px] bg-[#2C2C2C] border border-[#383838] rounded-[5px]"
          >
            <option value="id">По id (По возрастанию)</option>
            <option value="id&_order=desc">По id (По убыванию)</option>
            <option :value="title">По отправителю (По возрастанию)</option>
            <option :value="`${title}&_order=desc`">По отправителю (По убыванию)</option>
          </select>
        </div>
        <div class="">
          <datepicker
            v-model="selectedDate"
            placeholder="Выберите дату"
            :format="format"
            class="h-[40px] w-[400px] text-center text-[#efefef] font-light text-[16px] bg-[#2C2C2C] border border-[#383838] rounded-[5px]"
          ></datepicker>
        </div>
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
          <h2 class="text-[#efefef] font-bold text-[20px]">Вопросы</h2>
        </div>
        <div class="w-full flex text-[#B9B9B9] font-light text-[16px]">
          <span class="w-[100px]">Вопрос</span>
          <span class="w-[300px]">Отправитель</span>
          <span class="w-[600px]">Почта</span>
          <span class="w-[150px]">isChecked?</span>
          <span class="w-[200px]">Дата</span>
        </div>
        <div class="overflow-auto h-full">
          <CardListQuestion :items="questions" />
        </div>
        <div class="h-[30px] w-full flex gap-5 text-[#B9B9B9] font-light text-[16px]">
          <div>Всего вопросов: {{ questionsNumber }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
