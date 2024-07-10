<template>
  <div>
    <div v-if="!isJoined">
      <h1 class="title">Присоединение в комнату</h1>
      <h3 style="margin-top: 20px">Введите ваш ник:</h3>
      <input v-model="username" maxlength="20" class="input__input" placeholder="Ваш ник" />
      <button class="create-room__submit" @click="joinRoom" :disabled="!username">Присоединиться</button>
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

const joinRoom = () => {
  const roomId = route.params.id
  socket.emit('joinRoom', { roomId, username: username.value, role: 'X or O', socketId: socket.id })
}

socket.on('playerJoined', async (room) => {
  isJoined.value = true

  playerX.value = room.playerX
  playerO.value = room.playerO
})

socket.on('joinRoomResponse', ({ success, room }) => {
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