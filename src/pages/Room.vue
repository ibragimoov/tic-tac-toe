<template>
  <div>
    <div class="loader loader--create-room" v-if="!isRoomResponse">
      <vue-loaders-pacman scale="2" color="red"/>
    </div>
    <div class="room" v-else-if="!isJoined">
      <h1 class="title">Присоединение в комнату</h1>
      <h3 style="margin-top: 20px">Введите ваш ник:</h3>
      <input v-model="username" @keypress.enter="joinRoom" maxlength="20" class="input__input" placeholder="Ваш ник" />
      <div class="loader" v-if="isLoading">
        <vue-loaders-pacman color="red"/>
      </div>
      <button class="create-room__submit"@click="joinRoom" :disabled="!username && isLoading">Присоединиться</button>
    </div>
    <div v-else>
      <div class="players">
        <div class="players__item--x">
            <span>
              {{ playerX?.username || 'Ожидание игрока...' }}
            </span>
            <cross-icon :width="30" :height="30" />
        </div>
        <div class="players__item--o">
            <span>
              {{ playerO?.username || 'Ожидание игрока...' }}
            </span>
            <circle-icon :width="30" :height="30" />
        </div>
      </div>  
      <tic-tac-toe :roomId="+route.params.id" :players="[playerX, playerO]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { socket } from '../socket'

import crossIcon from '../components/icons/CrossIcon.vue'
import circleIcon from '../components/icons/CircleIcon.vue'

import ticTacToe from '../components/ticTacToe.vue'

const route = useRoute()
const router = useRouter()
const isJoined = ref(false)
const username = ref('')
const playerX = ref<{username: string} | null>(null)
const playerO = ref<{username: string} | null>(null)

const isLoading = ref<boolean>(false)
const isRoomResponse = ref<boolean>(false)

const joinRoom = () => {
  isLoading.value = true
  const roomId = route.params.id
  socket.emit('joinRoom', { roomId, username: username.value, role: 'X or O', socketId: socket.id })
}

socket.on('playerJoined', async (room) => {
  isJoined.value = true
  isRoomResponse.value = true

  playerX.value = room.playerX
  playerO.value = room.playerO
})

socket.on('joinRoomResponse', ({ success, room }) => {
  isLoading.value = false
  isRoomResponse.value = true
  if (success) {
    playerX.value = room.playerX
    playerO.value = room.playerO

    const isPlayerHost = room.socketIdX === socket.id || room.socketIdO === socket.id
    if (isPlayerHost)  isJoined.value = true
  } else {
    router.push('/')
  }
})

socket.on('getRoomResponse', ({ success, room }) => {
  if (success) {
    playerX.value = room.playerX
    playerO.value = room.playerO

    isRoomResponse.value = true

    const isPlayerHost = room.socketIdX === socket.id || room.socketIdO === socket.id
    if (isPlayerHost)  isJoined.value = true
  } else {
    router.push('/')
  }
})

onMounted(() => {
  const roomId = route.params.id
  socket.emit('getRoom', { roomId })
})
</script>

<style scoped>
.loader--create-room {
  margin-top: 50%;
  transform: translateY(+100%);
}
</style>