<script setup>
import { ref, watch, onMounted, defineProps } from 'vue'
import { Chart, registerables } from 'chart.js'

const chartCanvas = ref(null)

const props = defineProps({
  totalRevenue: {
    type: Number,
    required: true
  }
})

// Регистрируем компоненты Chart.js
Chart.register(...registerables)

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d')
  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Текущее значение', 'Осталось до цели'],
      datasets: [
        {
          label: 'Progress',
          data: [props.totalRevenue, 1000000 - props.totalRevenue], // Текущее значение и оставшееся до цели (например, 300 текущего и 200 оставшегося)
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

  // Подписываемся на изменения totalRevenue и обновляем диаграмму
  watch(
    () => props.totalRevenue,
    (newValue, oldValue) => {
      chart.data.datasets[0].data = [newValue, 1000000 - newValue]
      chart.update()
    }
  )
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
  height: 95%;
  width: 100%;
}
</style>
