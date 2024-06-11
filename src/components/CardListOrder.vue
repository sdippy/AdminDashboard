<script setup>
import CardOrder from './CardOrder.vue'

defineProps({
  items: Array
})
</script>

<template>
  <div class="flex flex-col gap-2" v-auto-animate>
    <CardOrder
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :date="item.DeliveryDate"
      :total-price="item.totalPrice"
      :total-price-discount="item.totalPriceDiscount"
      :delivery="item.DeliveryProcess"
      :userId="item.userId"
      :City="item.City"
      :Address="item.Address"
      :Zip="item.Zip"
      :TotalOrder="item.TotalOrder"
    />
  </div>
</template>
