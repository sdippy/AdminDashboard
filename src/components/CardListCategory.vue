<script setup>
import CardCategory from './CardCategory.vue'

defineProps({
  items: Array
})
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 2xl:px-0 gap-6"
    v-auto-animate
  >
    <CardCategory
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
    />
  </div>
</template>
