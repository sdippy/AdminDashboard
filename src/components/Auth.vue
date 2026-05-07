<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import CryptoJS from 'crypto-js'

const router = useRouter()

var storedUserId = sessionStorage.getItem('userSession')
if (storedUserId) {
  window.location.reload()

  router.back()
}

const email = ref('')
const password = ref('')
const buttonDisabled = ref(true)
const errorMessage = ref('')

const checkInputs = () => {
  buttonDisabled.value = !email.value || !password.value
}

const loginUser = async () => {
  try {
    const emailValue = email.value // Значение email из инпута
    const passwordValue = password.value // Значение пароля из инпута

    // Хеширование логина
    const hashedLogin = CryptoJS.SHA512(emailValue).toString()

    const userResponse = await axios.get(
      `https://s-shop-production.up.railway.app/users?login=${hashedLogin}&role_ne=user`
    )
    const userData = userResponse.data

    if (userData.length === 0) {
      errorMessage.value = 'Пользователь с таким логином не найден.'
    } else {
      const hashedPasswordFromServer = userData[0].password // Получение хешированного пароля с сервера
      const userId_no_hash = userData[0].id // Получение id пользователя
      const userSession = userData[0].role // Получение id пользователя

      // Хеширование userid
      const userId = CryptoJS.MD5(userId_no_hash.toString()).toString()
      // const userId = userId_no_hash.toString()

      // Хеширование введенного пользователем пароля
      const hashedPasswordInput = CryptoJS.SHA512(passwordValue).toString()

      // Сравнение хешированных паролей
      if (hashedPasswordInput === hashedPasswordFromServer) {
        // Здесь можно выполнить какие-то действия при успешной аутентификации
        // Сохранение userId в локальном хранилище
        sessionStorage.setItem('userSession', userSession)
        // Обновление страницы
        location.reload()
        // Переход на главную страницу
        window.location.href = '/'

        // console.log('Успешная аутентификация')
      } else {
        errorMessage.value = 'Неправильный логин или пароль.'
      }
    }
  } catch (error) {
    errorMessage.value = 'Ошибка аутентификации.'
    console.error('Ошибка:', error)
  }
}
</script>

<template>
  <div
    class="auth flex h-full w-full bg-[#383838] sm:bg-[url('/Images/bg.jpg')] bg-no-repeat bg-center"
  >
    <div
      v-if="!storedUserId"
      class="h-svh w-full flex justify-center items-center md:container mx-auto"
    >
      <div
        class="auth_form mx-auto flex flex-col gap-5 bg-[#383838] sm:p-20 md:p-40 sm:rounded-[30px]"
      >
        <p class="title sm:mb-2">Авторизация</p>

        <input
          class="w-80 sm:w-96"
          type="email"
          placeholder="Логин"
          v-model="email"
          @input="checkInputs"
          :class="{ 'has-text': email }"
        />
        <input
          class="w-80 sm:w-96"
          type="password"
          placeholder="Пароль"
          v-model="password"
          @input="checkInputs"
          :class="{ 'has-text': password }"
        />
        <button
          class="btn_auth w-80 sm:w-96 h-[50px] bg-[#efefef] rounded-[5px] text-[#444444] font-light border border-[#383838] active:bg-[#444444] active:text-[#efefef] active:border-[#efefef] transition-all ease-in-out duration-300"
          :disabled="buttonDisabled"
          @click="loginUser"
        >
          Войти
        </button>

        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
      </div>
    </div>

    <div v-else>Здесь что нить придумать надо</div>
  </div>
</template>

<style scoped>
.auth {
  width: 100%;
}

/* .auth_form {
  border: 1px solid #141414;
  border-radius: 10px;
} */

.title {
  color: #efefef;
  font-size: 20px;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
}

input {
  height: 50px;
  border: 1px solid #444444;
  font-size: 20px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  color: #efefef;
  text-align: center;
  background-color: #2c2c2c;
  border-radius: 5px;
}

input:focus {
  outline: none !important;
  border: 1px solid #efefef;
  background-color: transparent;
}

input::placeholder {
  font-size: 20px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  color: #444444;
  text-align: center;
}
</style>
