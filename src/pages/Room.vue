<template>
  <div>
    <div class="loader loader--create-room" v-if="!isRoomResponse">
      <vue-loaders-pacman scale="2" color="red"/>
    </div>
    <div class="room" v-else-if="!isJoined">
      <h1 class="title">Присоединение в комнату</h1>
      <h3 style="margin-top: 20px">Введите ваш ник:</h3>
      <input v-model="username" @keypress.enter="joinRoomHandler" maxlength="20" class="input__input" placeholder="Ваш ник" />
      <div class="loader" v-if="isLoading">
        <vue-loaders-pacman color="red"/>
      </div>
      <button class="create-room__submit" @click="joinRoomHandler" :disabled="!username && isLoading">Присоединиться</button>
    </div>
    <div v-else>
      <div class="players">
        <div class="players__item--x">
          <span>{{ playerX?.username || 'Ожидание игрока...' }}</span>
          <cross-icon :width="30" :height="30" />
        </div>
        <div class="players__item--o">
          <span>{{ playerO?.username || 'Ожидание игрока...' }}</span>
          <circle-icon :width="30" :height="30" />
        </div>
      </div>
      <tic-tac-toe :roomId="+route.params.id" :players="[playerX, playerO]" :move="move" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useRoom } from '../services/room.service'

import crossIcon from '../components/icons/CrossIcon.vue'
import circleIcon from '../components/icons/CircleIcon.vue'
import ticTacToe from '../components/ticTacToe.vue'

const username = ref<string>('')
const route = useRoute()
const roomId = ref<string | string[]>('')

const {
  isJoined,
  isRoomResponse,
  playerX,
  playerO,
  isLoading,
  initializeRoom,
  joinRoom,
  move
} = useRoom()

onMounted(() => {
  roomId.value = route.params.id
  initializeRoom(roomId.value)
})

const joinRoomHandler = () => {
  joinRoom(roomId.value, username.value)
}
</script>