<script setup>
import { inject } from 'vue'

const { selectedClient, closeClientWindow } = inject('client')
</script>

<template>
  <div
    @click="closeClientWindow"
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-30"
  ></div>
  <div
    class="orderWindow fixed h-full w-full 2xl:h-5/6 2xl:max-h-[1000px] 2xl:w-6/12 2xl:max-w-[1200px] inset-2/4 -translate-x-2/4 -translate-y-2/4 z-20"
  >
    <div class="w-full h-full">
      <!-- very-small -->
      <div
        v-if="selectedClient"
        class="product-window flex flex-col gap-5 w-full h-full p-10 bg-[#383838]"
      >
        <div class="flex justify-end w-full">
          <svg
            @click="closeClientWindow"
            class="cursor-pointer opacity-60 hover:opacity-100 hover:-translate-y-1 transition-all ease-in-out"
            width="20"
            height="20"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.94585 1.27057L6.60657 4.60985L3.26741 1.27069C1.97981 -0.0169192 -0.0171327 1.98002 1.27047 3.26763L4.60964 6.60679L1.27036 9.94607C-0.0169635 11.2334 1.9799 13.2303 3.26723 11.9429L6.6065 8.60366L9.94567 11.9428C11.2333 13.2304 13.2302 11.2335 11.9426 9.94588L8.60344 6.60672L11.9427 3.26744C13.2302 1.97995 11.2333 -0.016916 9.94585 1.27057Z"
              fill="#efefef"
            />
          </svg>
        </div>
        <div class="h-full w-full flex flex-col">
          <div class="w-full h-full flex-1 flex-col overflow-auto">Client</div>
          <div class="w-full h-[40px] grid grid-cols-2 grid-rows-1 gap-5 mt-5">
            <button
              class="bg-[#145F37] text-[#efefef] font-light text-[16px] border border-transparent rounded-[10px] hover:border-[#efefef] active:bg-[#efefef] active:text-[#145F37] active:border-[#145F37] transition-all ease-in-out"
            >
              Сохранить
            </button>
            <button
              @click="closeClientWindow"
              class="bg-[#2C2C2C] text-[#efefef] font-light text-[16px] border border-transparent rounded-[10px] hover:border-[#efefef] active:bg-[#efefef] active:text-[#2c2c2c] active:border-[#2c2c2c] transition-all ease-in-out"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
