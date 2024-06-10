<script setup>
import { ref, onMounted, watch, defineProps } from 'vue'
import { Chart, registerables } from 'chart.js'

// Определяем пропсы
const props = defineProps({
  month_data: {
    type: Object,
    required: true
  }
})

// Регистрируем компоненты Chart.js
Chart.register(...registerables)

const chartCanvas = ref(null)
let chart = null

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d')
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
      ],
      datasets: [
        {
          label: 'Покупки',
          data: Object.values(props.month_data),
          backgroundColor: ['rgba(217, 79, 95, 1)', 'rgba(61, 44, 141, 1)'],
          borderColor: ['rgba(217, 79, 95, 1)', 'rgba(61, 44, 141, 1)'],
          borderRadius: 40,
          borderWidth: 1,
          borderSkipped: false,
          maxBarThickness: 50
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
})

// Наблюдаем за изменением данных и обновляем график
watch(
  () => props.month_data,
  (newValue) => {
    chart.data.datasets[0].data = Object.values(newValue)
    chart.update()
  },
  { deep: true }
)
</script>

<template>
  <div class="h-[300px] w-full flex justify-center items-center">
    <canvas ref="chartCanvas" style="width: 100%; height: 100%"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
}
</style>
