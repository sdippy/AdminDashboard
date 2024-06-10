<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { closeExitWindow } = inject('exit')

function logoutUser() {
  // Очистка локального хранилища
  sessionStorage.clear()
  // Обновление страницы
  location.reload()
  // Переход на главную страницу
  window.location.href = '/'
}
</script>

<template>
  <div
    @click="closeExitWindow"
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-30"
  ></div>
  <div
    class="orderWindow fixed h-full w-full 2xl:h-2/6 2xl:max-h-[300px] 2xl:w-6/12 2xl:max-w-[600px] inset-2/4 -translate-x-2/4 -translate-y-2/4 z-20"
  >
    <div class="w-full h-full">
      <!-- very-small -->
      <div class="product-window flex flex-col gap-5 w-full h-full p-10 bg-[#383838]">
        <div class="h-full w-full flex flex-col gap-5 justify-center items-center">
          <h1 class="text-[#efefef] font-bold text-[24px]">Вы уверены, что хотите выйти?</h1>
          <div class="w-full h-[40px] grid grid-cols-2 grid-rows-1 gap-5 mt-5">
            <button
              @click="logoutUser"
              class="bg-[#145F37] text-[#efefef] font-light text-[16px] border border-transparent rounded-[10px] hover:border-[#efefef] active:bg-[#efefef] active:text-[#145F37] active:border-[#145F37] transition-all ease-in-out"
            >
              Да
            </button>
            <button
              @click="closeExitWindow"
              class="bg-[#2C2C2C] text-[#efefef] font-light text-[16px] border border-transparent rounded-[10px] hover:border-[#efefef] active:bg-[#efefef] active:text-[#2c2c2c] active:border-[#2c2c2c] transition-all ease-in-out"
            >
              Нет
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
