<script setup>
import CardSneaker from './CardSneaker.vue'

defineProps({
  items: Array
})
</script>

<template>
  <div class="flex flex-col gap-2" v-auto-animate>
    <CardSneaker
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :category="item.category"
      :price="item.price"
      :newprice="item.newprice"
      :discount="item.discount"
      :discount-category="item.discountCategory"
      :description="item.description"
      :image-url="item.imageUrl"
      :image-url2="item.imageUrl2"
      :image-url3="item.imageUrl3"
    />
  </div>
</template>
