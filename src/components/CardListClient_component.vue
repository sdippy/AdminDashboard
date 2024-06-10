<script setup>
import CardClient from './CardClient.vue'

defineProps({
  items: Array
})
</script>

<template>
  <div class="flex flex-col gap-2" v-auto-animate>
    <CardClient
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :email="item.email"
      :full-name="item.fullName"
      :newsletter="item.newsletter"
      :role="item.role"
    />
  </div>
</template>
