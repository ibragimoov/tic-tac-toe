// services/socketService.ts
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { socket } from '../socket'

import type { Player } from './tic-tac-toe.service'

export const useRoom = () => {
  const isJoined = ref(false)
  const isRoomResponse = ref(false)
  const playerX = ref<Player>({} as Player)
  const playerO = ref<Player>({} as Player)
  const isLoading = ref(false)

  const router = useRouter()

  const initializeRoom = (roomId: string | string[]) => {
    console.log(roomId)
    socket.emit('getRoom', { roomId })
  }

  const joinRoom = (roomId: string | string[], username: string) => {
    isLoading.value = true
    socket.emit('joinRoom', { roomId, username, role: 'X or O', socketId: socket.id })
    console.log(roomId, username, 'X or O', socket.id)
  }

  socket.on('playerJoined', (room) => {
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
      if (isPlayerHost) isJoined.value = true
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
      if (isPlayerHost) isJoined.value = true
    } else {
      router.push('/')
    }
  })

  return {
    initializeRoom,
    joinRoom,
    isJoined,
    isRoomResponse,
    playerX,
    playerO,
    isLoading
  }
}