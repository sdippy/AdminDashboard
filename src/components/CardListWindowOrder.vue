<script setup>
import CardWindowOrder from './CardWindowOrder.vue'

defineProps({
  items: Array
})
</script>

<template>
  <div class="flex flex-col gap-2" v-auto-animate>
    <CardWindowOrder
      v-for="sneaker in items"
      :key="sneaker.id"
      :id="sneaker.id"
      :title="sneaker.title"
      :quantity="sneaker.quantity"
      :size="sneaker.size"
      :price="sneaker.price"
      :newprice="sneaker.newprice"
      :imageUrl="sneaker.imageUrl"
    />
  </div>
</template>
