<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'

// Регистрируем компоненты Chart.js
Chart.register(...registerables)

const chartCanvas = ref(null)

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d')
  new Chart(ctx, {
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
          data: [2, 1, 2, 3, 5, 4, 0, 0, 0, 0, 0, 0],
          backgroundColor: ['rgba(217, 79, 95, 1)', 'rgba(61, 44, 141, 1)'],
          borderColor: ['rgba(217, 79, 95, 1)', 'rgba(61, 44, 141, 1)'],
          borderWidth: 1
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
