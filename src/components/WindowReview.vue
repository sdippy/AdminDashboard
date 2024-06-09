<script setup>
import { inject, ref, onMounted } from 'vue'
import axios from 'axios'

const { selectedReview, closeReviewWindow } = inject('review')

const user = ref([])
const fullName = ref('')

const fetchUser = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/users?id=${selectedReview.value.userId}`
    )
    user.value = data.map((obj) => ({
      ...obj
    }))
    if (user.value.length > 0) {
      fullName.value = user.value[0].fullName
    }
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchUser()
})

const saveChanges = async () => {
  try {
    await axios.patch(`http://localhost:3000/reviews/${selectedReview.value.id}`, {
      isActive: selectedReview.value.isActive,
      message: selectedReview.value.message
    })
    closeReviewWindow()
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div
    @click="closeReviewWindow"
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-30"
  ></div>
  <div
    class="orderWindow fixed h-full w-full 2xl:h-5/6 2xl:max-h-[1000px] 2xl:w-6/12 2xl:max-w-[1200px] inset-2/4 -translate-x-2/4 -translate-y-2/4 z-20"
  >
    <div class="w-full h-full">
      <!-- very-small -->
      <div
        v-if="selectedReview"
        class="product-window flex flex-col gap-5 w-full h-full p-10 bg-[#383838]"
      >
        <div class="flex justify-end w-full">
          <svg
            @click="closeReviewWindow"
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
          <div class="w-full h-full flex-1 flex-col overflow-auto">
            <div class="grid grid-cols-3 grid-rows-1 gap-2">
              <div class="flex flex-col gap-5">
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Отзыв #</p>
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">ФИО пользователя:</p>
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Товар:</p>
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Рейтинг:</p>
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Статус публикации:</p>
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Сообщение:</p>
              </div>
              <div class="flex flex-col gap-5 col-span-2">
                <input
                  type="text"
                  disabled
                  class="bg-transparent break-all h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#2C2C2C] rounded-[5px]"
                  :value="selectedReview.id"
                />
                <input
                  type="text"
                  disabled
                  class="bg-transparent break-all h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#2C2C2C] rounded-[5px]"
                  :value="fullName"
                />
                <input
                  type="text"
                  disabled
                  class="bg-transparent break-all h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#2C2C2C] rounded-[5px]"
                  :value="selectedReview.product"
                />
                <input
                  type="text"
                  disabled
                  class="bg-transparent break-all h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#2C2C2C] rounded-[5px]"
                  :value="selectedReview.rating"
                />

                <select
                  v-model="selectedReview.isActive"
                  class="bg-[#383838] h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                >
                  <option :value="true">Активен</option>
                  <option :value="false">Не активен</option>
                </select>
                <textarea
                  v-model="selectedReview.message"
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  class="bg-transparent break-all overflow-auto text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="w-full h-[40px] grid grid-cols-2 grid-rows-1 gap-5 mt-5">
            <button
              @click="saveChanges"
              class="bg-[#145F37] text-[#efefef] font-light text-[16px] border border-transparent rounded-[10px] hover:border-[#efefef] active:bg-[#efefef] active:text-[#145F37] active:border-[#145F37] transition-all ease-in-out"
            >
              Сохранить
            </button>
            <button
              @click="closeReviewWindow"
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
