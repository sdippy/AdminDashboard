<script setup>
import BarChart_component from './BarChart.vue'
</script>

<template>
  <div class="h-svh min-h-[700px] w-full p-10">
    <div class="w-full h-full flex flex-col gap-5">
      <div class="grid grid-cols-3 grid-rows-1 gap-5">
        <div
          class="order flex flex-col h-[140px] rounded-[30px] pl-20 justify-center hover:shadow-2xl hover:-translate-y-1 transition-all ease-in-out"
        >
          <h2 class="text-[#efefef] font-bold text-[20px]">Заказов</h2>
          <span class="text-[#efefef] font-bold text-[40px]">20</span>
        </div>
        <div
          class="money flex flex-col h-[140px] rounded-[30px] pl-20 justify-center hover:shadow-2xl hover:-translate-y-1 transition-all ease-in-out"
        >
          <h2 class="text-[#efefef] font-bold text-[20px]">Доход</h2>
          <span class="text-[#efefef] font-bold text-[40px]">20 ₽</span>
        </div>
        <div
          class="clients flex flex-col h-[140px] rounded-[30px] pl-20 justify-center hover:shadow-2xl hover:-translate-y-1 transition-all ease-in-out"
        >
          <h2 class="text-[#efefef] font-bold text-[20px]">Клиентов</h2>
          <span class="text-[#efefef] font-bold text-[40px]">20</span>
        </div>
      </div>
      <div class="grid grid-cols-3 grid-rows-1 gap-5">
        <div
          class="col-span-2 bg-[#2C2C2C] h-[300px] rounded-[30px] hover:shadow-2xl hover:-translate-y-1 transition-all ease-in-out"
        >
          <BarChart_component />
        </div>
        <div
          class="col-start-3 h-[300px] bg-[#2C2C2C] rounded-[30px] hover:shadow-2xl hover:-translate-y-1 transition-all ease-in-out"
        >
          123
        </div>
      </div>
      <div
        class="bg-[#2C2C2C] h-full rounded-[30px] hover:shadow-2xl hover:-translate-y-1 transition-all ease-in-out"
      >
        123
      </div>
    </div>
  </div>
</template>

<style scoped>
.order {
  background-image: url('/public/bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.money {
  background-image: url('/public/bg (1).jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.clients {
  background-image: url('/public/bg (2).jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
