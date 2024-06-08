<script setup>
import CardQuestion from './CardQuestion.vue'

defineProps({
  items: Array
})
</script>

<template>
  <div class="flex flex-col gap-2" v-auto-animate>
    <CardQuestion
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :date="item.date"
      :email="item.email"
      :message="item.message"
      :is-checked="item.isChecked"
    />
  </div>
</template>
