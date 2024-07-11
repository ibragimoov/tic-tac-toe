<template>
  <div class="create-room">
    <h1 class="title">Создание комнаты 🔍</h1>

    <h3>Выберите себе ник:</h3>
    <input v-model="username" maxlength="20" class="input__input" placeholder="Ваш ник" />

    <h3>Выберите роль:</h3>
    <div class="create-room__roles-list">
      <div @click="() => handleSelectRole('X')" :class="{ 'create-room__roles-item--active': role === 'X' }" class="create-room__roles-item">
        <cross-icon :width="70" :height="70" />
      </div>
      <div @click="() => handleSelectRole('O')" :class="{ 'create-room__roles-item--active': role === 'O' }" class="create-room__roles-item">
        <circle-icon :width="70" :height="65" />
      </div>
    </div>

    <div class="loader" v-if="isLoading">
      <vue-loaders-pacman color="red"/>
    </div>

    <button 
      :disabled="!isFormValid" 
      :class="{ disabled: !isFormValid }" 
      @click="() => handleCreateGame()" 
      class="create-room__submit"
    >
      {{ submitButtonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { socket } from '../socket'

import crossIcon from '../components/icons/CrossIcon.vue'
import circleIcon from '../components/icons/CircleIcon.vue'

import type { SquareValue } from '../stores/game'

const role = ref<SquareValue>(null)
const username = ref<string>('')
const isLoading = ref<boolean>(false)

const isFormValid = computed(() => {
  return username.value.length && role.value
})

const submitButtonText = computed(() => {
  return isFormValid.value ? 'Начать игру' : '⛔️ Убедитесь, что вы выбрали ник и роль ⛔️'
})

const router = useRouter()

const handleSelectRole = (value: SquareValue) => {
  role.value = value
}

const handleCreateGame = () => {
  isLoading.value = true
  socket.emit('createUser', { username: username.value })
  socket.emit('createRoom', { username: username.value, role: role.value, socketId: socket.id })
}

socket.on('roomCreated', (room) => {
  isLoading.value = false
  router.push(`/room/${room.id}`)
})
</script>