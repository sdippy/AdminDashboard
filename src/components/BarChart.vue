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
      labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
      datasets: [
        {
          label: 'Покупки',
          data: [65, 59, 80, 81, 56, 55, 40],
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
