<script setup>
import { onMounted, ref, provide } from 'vue'
import axios from 'axios'

import CardListQuestion from './CardListQuestion.vue'
import WindowQuestion from './WindowQuestion.vue'

const questions = ref([])
const questionsNumber = ref(0)
const selectedQuestion = ref(null) // Переменная для хранения информации о выбранном вопросе

const updateselectedQuestion = (order) => {
  selectedQuestion.value = order
  console.log(selectedQuestion.value)
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
    const { data } = await axios.get('http://localhost:3000/blank')
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
</script>

<template>
  <WindowQuestion v-if="questionWindowOpen" />
  <div class="h-svh min-h-[700px] w-full p-10">
    <div class="w-full h-full flex flex-col gap-5">
      <div class="w-full flex flex-col p-5 gap-5 h-[150px] bg-[#2C2C2C] rounded-[30px]"></div>

      <div
        class="bg-[#2C2C2C] h-[calc(100%-170px)] rounded-[30px] hover:shadow-2xl transition-all ease-in-out flex flex-col p-5 gap-5"
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
