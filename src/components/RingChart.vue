<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'

// Регистрируем компоненты Chart.js
Chart.register(...registerables)

const chartCanvas = ref(null)

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d')
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Текущее значение', 'Осталось до цели'],
      datasets: [
        {
          label: 'Progress',
          data: [300, 1000 - 300], // Текущее значение и оставшееся до цели (например, 300 текущего и 200 оставшегося)
          backgroundColor: ['rgba(29, 115, 70, 1)', 'rgba(113, 26, 92, 1)'],
          borderColor: ['rgba(113, 26, 92, 1)', 'rgba(29, 115, 70, 1)'],
          borderWidth: 1
        }
      ]
    },
    options: {
      cutout: '70%', // Настройка размера отверстия в середине диаграммы (для кольцевой диаграммы)
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.label + ': ' + context.raw
            }
          }
        }
      }
    }
  })
})
</script>

<template>
  <div class="chart-container flex justify-center items-center">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 95%; /* Устанавливаем высоту контейнера */
  width: 100%; /* Устанавливаем ширину контейнера */
}
</style>
