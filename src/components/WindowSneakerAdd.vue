<script setup>
import { inject, ref, onMounted, watch } from 'vue'

import axios from 'axios'

const { closeSneakerAddWindow } = inject('sneaker')

const message = ref('')

const categories = ref([])

const imageUrl = ref('')
const imageUrl2 = ref('')
const imageUrl3 = ref('')
const title = ref('')
const category = ref('')
const price = ref('')
const discountCategory = ref(false)
const description = ref('')
const newprice = ref('')
const discount = ref('')

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
    imageUrl.value = `/Images/Sneakers/${fileName.value}`
  }
}

const handleFileChange2 = (event) => {
  const file = event.target.files[0]
  if (file) {
    fileName2.value = file.name
    imageUrl2.value = `/Images/Sneakers/${fileName2.value}`
  }
}

const handleFileChange3 = (event) => {
  const file = event.target.files[0]
  if (file) {
    fileName3.value = file.name
    imageUrl3.value = `/Images/Sneakers/${fileName3.value}`
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
  if (
    title.value &&
    imageUrl.value &&
    imageUrl2.value &&
    imageUrl3.value &&
    category.value &&
    price.value &&
    description.value
  ) {
    // Проверяем, что все обязательные поля заполнены
    try {
      // Подготовка данных для отправки на сервер
      const sneakerData = {
        imageUrl: imageUrl.value,
        imageUrl2: imageUrl2.value,
        imageUrl3: imageUrl3.value,
        category: category.value,
        price: Number(price.value),
        description: description.value,
        title: title.value,
        discountCategory: discountCategory.value
      }

      // Добавляем поля newprice и discount, если discountCategory = true
      if (discountCategory.value) {
        sneakerData.newprice = newprice.value
        sneakerData.discount = discount.value
      }

      // Отправка данных на сервер
      await axios.post('http://localhost:3000/sneakers', sneakerData)

      // Закрываем окно после успешного сохранения
      closeSneakerAddWindow()
    } catch (err) {
      console.log(err) // Обработка ошибки при сохранении
    }
  } else {
    message.value = 'Пожалуйста, заполните все поля' // Выводим предупреждение, если обязательные поля не заполнены
  }
}

watch(price, (newPrice) => {
  if (newPrice && discount.value != null) {
    newprice.value = newPrice - (newPrice * discount.value) / 100
  }
})

watch(discount, (newDiscount) => {
  if (price.value && newDiscount != null) {
    newprice.value = price.value - (price.value * newDiscount) / 100
  }
})

watch(newprice, (newPrice) => {
  if (price.value && newPrice != null) {
    const calculatedDiscount = ((price.value - newPrice) / price.value) * 100
    discount.value = parseFloat(calculatedDiscount.toFixed(2))
  }
})
</script>

<template>
  <div
    @click="closeSneakerAddWindow"
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-30"
  ></div>
  <div
    class="orderWindow fixed h-full w-full 2xl:h-5/6 2xl:max-h-[1000px] 2xl:w-6/12 2xl:max-w-[1200px] inset-2/4 -translate-x-2/4 -translate-y-2/4 z-20"
  >
    <div class="w-full h-full">
      <!-- very-small -->
      <div class="product-window flex flex-col gap-5 w-full h-full p-10 bg-[#383838]">
        <div class="flex justify-end w-full">
          <svg
            @click="closeSneakerAddWindow"
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
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Наименование:</p>
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Категория:</p>
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Цена:</p>
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Скидка:</p>
                <p v-if="discountCategory" class="h-[40px] text-[#efefef] font-light text-[16px]">
                  Процент скидки:
                </p>
                <p v-if="discountCategory" class="h-[40px] text-[#efefef] font-light text-[16px]">
                  Цена со скидкой:
                </p>
                <p class="h-[40px] text-[#efefef] font-light text-[16px]">Описание:</p>
              </div>
              <div class="flex flex-col gap-5 col-span-2">
                <input
                  v-model="title"
                  placeholder="Наименование"
                  type="text"
                  class="bg-transparent break-all h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                />

                <select
                  v-model="category"
                  placeholder="Категория"
                  class="bg-[#383838] break-all h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                >
                  <option disabled value="">Выберите категорию</option>
                  <option v-for="category in categories" :key="category.id" :value="category.title">
                    {{ category.title }}
                  </option>
                </select>
                <input
                  placeholder="Цена"
                  v-model="price"
                  type="number"
                  class="bg-transparent break-all h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                />
                <div class="h-[40px]">
                  <input
                    v-model="discountCategory"
                    type="checkbox"
                    class="h-full w-full text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                  />
                </div>
                <input
                  v-if="discountCategory"
                  v-model="discount"
                  type="number"
                  class="bg-transparent break-all h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                />

                <input
                  v-if="discountCategory"
                  v-model="newprice"
                  type="number"
                  class="bg-transparent break-all h-[40px] text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                />
                <textarea
                  placeholder="Описание"
                  v-model="description"
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  class="bg-transparent break-all text-center text-[#efefef] font-light text-[16px] border border-[#efefef] rounded-[5px]"
                ></textarea>
              </div>
            </div>
            <div class="flex justify-center gap-5 my-10">
              <div class="flex flex-col gap-5 items-center w-full">
                <div class="flex justify-center w-[250px]">
                  <img :src="imageUrl" alt="Изображение 1" class="w-[250px] border" />
                </div>
                <div class="flex flex-col gap-5 w-full">
                  <input
                    v-model="imageUrl"
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
              <div class="flex flex-col gap-5 items-center w-full">
                <div class="flex justify-center w-full">
                  <img :src="imageUrl2" alt="Изображение 2" class="w-[250px] border" />
                </div>
                <div class="flex flex-col gap-5 w-full">
                  <input
                    v-model="imageUrl2"
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
              <div class="flex flex-col gap-5 items-center w-full">
                <div class="flex justify-center w-full">
                  <img :src="imageUrl3" alt="Изображение 3" class="w-[250px] border" />
                </div>
                <div class="flex flex-col gap-5 w-full">
                  <input
                    v-model="imageUrl3"
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
              @click="closeSneakerAddWindow"
              class="bg-[#2C2C2C] text-[#efefef] font-light text-[16px] border border-transparent rounded-[10px] hover:border-[#efefef] active:bg-[#efefef] active:text-[#2c2c2c] active:border-[#2c2c2c] transition-all ease-in-out"
            >
              Отмена
            </button>
          </div>
          <p v-if="message" class="text-red-500 font-light text-[16px]">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
