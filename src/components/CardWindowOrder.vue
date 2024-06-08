<script setup>
const props = defineProps({
  id: Number,
  title: String,
  quantity: Number,
  price: Number,
  newprice: Number,
  size: String,
  imageUrl: String
})
</script>

<template>
  <div
    class="category w-full items-center flex text-[#B9B9B9] font-light text-[16px] border border-transparent"
  >
    <span class="w-[50px] break-all">{{ id }}</span>
    <span class="w-[300px] break-all">{{ title }}</span>
    <span v-if="newprice" class="ml-2 w-[150px] break-all">{{ newprice }} ₽</span>
    <span v-else class="ml-2 w-[150px] break-all">{{ price }} ₽</span>
    <span class="w-[100px] break-all">{{ quantity }}</span>
    <span class="w-[100px] break-all">{{ size }}</span>
    <span class="w-[100px] break-all">
      <img :src="imageUrl" alt="category_image" class="w-[50px]" />
    </span>
  </div>
</template>
