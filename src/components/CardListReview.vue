<script setup>
import CardReview from './CardReview.vue'

defineProps({
  items: Array
})
</script>

<template>
  <div class="flex flex-col gap-2" v-auto-animate>
    <CardReview
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :product="item.product"
      :rating="item.rating"
      :message="item.message"
      :user-id="item.userId"
      :date="item.date"
      :is-active="item.isActive"
    />
  </div>
</template>
