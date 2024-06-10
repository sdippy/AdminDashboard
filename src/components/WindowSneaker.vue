<script setup>
import { inject, ref, onMounted, watch } from 'vue'

import axios from 'axios'

const { selectedSneaker, closeSneakerWindow } = inject('sneaker')

const categories = ref([])

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:3000/categories')
    categories.value = response.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchCategories()
})

const fileInputRef = ref(null)
const fileInputRef2 = ref(null)
const fileInputRef3 = ref(null)

const fileName = ref('')
const fileName2 = ref('')
const fileName3 = ref('')

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    fileName.value = file.name
    selectedSneaker.value.imageUrl = `/Images/Sneakers/${fileName.value}`
  }
}

const handleFileChange2 = (event) => {
  const file = event.target.files[0]
  if (file) {
    fileName2.value = file.name
    selectedSneaker.value.imageUrl2 = `/Images/Sneakers/${fileName2.value}`
  }
}

const handleFileChange3 = (event) => {
  const file = event.target.files[0]
  if (file) {
    fileName3.value = file.name
    selectedSneaker.value.imageUrl3 = `/Images/Sneakers/${fileName3.value}`
  }
}

const triggerFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

const triggerFileInput2 = () => {
  if (fileInputRef2.value) {
    fileInputRef2.value.click()
  }
}

const triggerFileInput3 = () => {
  if (fileInputRef3.value) {
    fileInputRef3.value.click()
  }
}

const saveChanges = async () => {
  try {
    await axios.patch(`http://localhost:3000/Sneakers/${selectedSneaker.value.id}`, {
      imageUrl: selectedSneaker.value.imageUrl,
      imageUrl2: selectedSneaker.value.imageUrl2,
      imageUrl3: selectedSneaker.value.imageUrl3,
      title: selectedSneaker.value.title,
      category: selectedSneaker.value.category,
      price: selectedSneaker.value.price,
      discountCategory: selectedSneaker.value.discountCategory,
      newprice: selectedSneaker.value.newprice,
      discount: selectedSneaker.value.discount,
      description: selectedSneaker.value.description
    })
    closeSneakerWindow()
  } catch (err) {
    console.log(err)
  }
}

const deleteSneaker = async () => {
  try {
    await axios.delete(`http://localhost:3000/categories/${selectedCategory.value.id}`)
    closeSneakerWindow()
  } catch (err) {
    console.log(err)
  }
}

watch(
  () => selectedSneaker.value.discount,
  (newDiscount) => {
    if (selectedSneaker.value.price && newDiscount != null) {
      selectedSneaker.value.newprice =
        selectedSneaker.value.price - (selectedSneaker.value.price * newDiscount) / 100
    }
  }
)

watch(
  () => selectedSneaker.value.newprice,
  (newPrice) => {
    if (selectedSneaker.value.price && newPrice != null) {
      const discount =
        ((selectedSneaker.value.price - newPrice) / selectedSneaker.value.price) * 100
      selectedSneaker.value.discount = parseFloat(discount.toFixed(2))
    }
  }
)

watch(
  () => selectedSneaker.value.price,
  (newPrice) => {
    if (newPrice && selectedSneaker.value.discount != null) {
      selectedSneaker.value.newprice = newPrice - (newPrice * selectedSneaker.value.discount) / 100
    }
  }
)
</script>

<template>
  <div
    @click="closeSneakerWindow"
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-30"
  ></div>
  <div
    class="orderWindow fixed h-full w-full 2xl:h-5/6 2xl:max-h-[1000px] 2xl:w-6/12 2xl:max-w-[1200px] inset-2/4 -translate-x-2/4 -translate-y-2/4 z-20"
  >
    <div class="w-full h-full">
      <!-- very-small -->
      <div
        v-if="selectedSneaker"
        class="product-window flex flex-col gap-5 w-full h-full p-10 bg-[#383838]"
      >
        <div class="flex justify-end w-full">
          <svg
            @click="closeSneakerWindow"
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
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Товар #</p>
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Наименование:</p>
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Категория:</p>
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Цена:</p>
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Скидка:</p>
                <p
                  v-if="selectedSneaker.discountCategory"
                  class="h-[40px] text-[#efefef] font-light text-[16px]"
                >
                  Процент скидки:
                </p>
                <p
                  v-if="selectedSneaker.discountCategory"
                  class="h-[40px] text-[#efefef] font-light text-[16px]"
                >
                  Цена со скидкой:
                </p>
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Описание:</p>
              </div>
              <div class="flex flex-col gap-5 col-span-2">
                <input
                  v-model="selectedSneaker.id"
                  disabled
                  type="text"
                  class="bg-transparent break-all h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#2C2C2C] rounded-[5px]"
                />
                <input
                  v-model="selectedSneaker.title"
                  type="text"
                  class="bg-transparent break-all h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                />

                <select
                  v-model="selectedSneaker.category"
                  class="bg-transparent break-all h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                >
                  <option v-for="category in categories" :key="category.id" :value="category.title">
                    {{ category.title }}
                  </option>
                </select>

                <input
                  v-model="selectedSneaker.price"
                  type="text"
                  class="bg-transparent break-all h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                />
                <div class="h-[40px]">
                  <input
                    v-model="selectedSneaker.discountCategory"
                    type="checkbox"
                    class="h-full w-full text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                  />
                </div>

                <input
                  v-if="selectedSneaker.discountCategory"
                  v-model="selectedSneaker.discount"
                  type="number"
                  class="bg-transparent break-all h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                />

                <input
                  v-if="selectedSneaker.discountCategory"
                  v-model="selectedSneaker.newprice"
                  type="text"
                  class="bg-transparent break-all h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                />

                <textarea
                  v-model="selectedSneaker.description"
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  class="bg-transparent break-all text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                ></textarea>
              </div>
            </div>
            <div class="flex gap-5 my-10">
              <div class="flex flex-col gap-5 items-center w-[300px]">
                <div class="flex justify-center w-full">
                  <img
                    :src="selectedSneaker.imageUrl"
                    alt="Изображение 1"
                    class="w-[300px] border"
                  />
                </div>
                <div class="flex flex-col gap-5 w-full">
                  <input
                    v-model="selectedSneaker.imageUrl"
                    type="text"
                    class="bg-transparent break-all h-[40px] w-full text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                  />
                  <button
                    @click="triggerFileInput"
                    class="bg-[#2A1A58] text-[#efefef] h-[40px] font-light text-[16px] border border-transparent rounded-[5px] hover:border-[#efefef] active:bg-[#efefef] active:text-[#2A1A58] active:border-[#2A1A58] transition-all ease-in-out"
                  >
                    Выбрать файл 1
                  </button>
                </div>
                <!-- Hidden file input element -->
                <input ref="fileInputRef" type="file" class="hidden" @change="handleFileChange" />
              </div>
              <div class="flex flex-col gap-5 items-center w-[300px]">
                <div class="flex justify-center w-full">
                  <img
                    :src="selectedSneaker.imageUrl2"
                    alt="Изображение 2"
                    class="w-[300px] border"
                  />
                </div>
                <div class="flex flex-col gap-5 w-full">
                  <input
                    v-model="selectedSneaker.imageUrl2"
                    type="text"
                    class="bg-transparent break-all h-[40px] w-full text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                  />
                  <button
                    @click="triggerFileInput2"
                    class="bg-[#2A1A58] text-[#efefef] h-[40px] font-light text-[16px] border border-transparent rounded-[5px] hover:border-[#efefef] active:bg-[#efefef] active:text-[#2A1A58] active:border-[#2A1A58] transition-all ease-in-out"
                  >
                    Выбрать файл 2
                  </button>
                </div>
                <!-- Hidden file input element -->
                <input ref="fileInputRef2" type="file" class="hidden" @change="handleFileChange2" />
              </div>
              <div class="flex flex-col gap-5 items-center w-[300px]">
                <div class="flex justify-center w-full">
                  <img
                    :src="selectedSneaker.imageUrl3"
                    alt="Изображение 3"
                    class="w-[300px] border"
                  />
                </div>
                <div class="flex flex-col gap-5 w-full">
                  <input
                    v-model="selectedSneaker.imageUrl3"
                    type="text"
                    class="bg-transparent break-all h-[40px] w-full text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                  />
                  <button
                    @click="triggerFileInput3"
                    class="bg-[#2A1A58] text-[#efefef] h-[40px] font-light text-[16px] border border-transparent rounded-[5px] hover:border-[#efefef] active:bg-[#efefef] active:text-[#2A1A58] active:border-[#2A1A58] transition-all ease-in-out"
                  >
                    Выбрать файл 3
                  </button>
                </div>
                <!-- Hidden file input element -->
                <input ref="fileInputRef3" type="file" class="hidden" @change="handleFileChange3" />
              </div>
            </div>
          </div>
          <div class="w-full h-[40px] grid grid-cols-2 grid-rows-1 gap-5 mt-5 mb-5">
            <button
              @click="saveChanges"
              class="bg-[#145F37] text-[#efefef] font-light text-[16px] border border-transparent rounded-[10px] hover:border-[#efefef] active:bg-[#efefef] active:text-[#145F37] active:border-[#145F37] transition-all ease-in-out"
            >
              Сохранить
            </button>
            <button
              @click="closeSneakerWindow"
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
