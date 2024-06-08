<script setup>
import CardCategory from './CardCategory.vue'

defineProps({
  items: Array
})
</script>

<template>
  <div class="flex flex-col gap-2" v-auto-animate>
    <CardCategory
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
    />
  </div>
</template>
