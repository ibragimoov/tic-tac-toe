// services/socketService.ts
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { socket } from '../socket'

import type { Player } from './tic-tac-toe.service'

import { useTicTacToeStore, type SquareValue } from '@/stores/game'

export const useRoom = () => {
  const store = useTicTacToeStore()
  const isJoined = ref(false)
  const isRoomResponse = ref<boolean>(false)
  const playerX = ref<Player>({} as Player)
  const playerO = ref<Player>({} as Player)
  const isLoading = ref(false)
  const move = ref<'X' | 'O' | null>(null)

  const router = useRouter()

  const initializeRoom = (roomId: string | string[]) => {
    socket.emit('getRoom', { roomId })
  }

  const joinRoom = (roomId: string | string[], username: string) => {
    isLoading.value = true
    socket.emit('joinRoom', { roomId, username, role: 'X or O' })
  }

  const createUser = (username: string) => {
    socket.emit('createUser', { username })
  }

  const createGame = (data :{ username: string, role: SquareValue, boardSize: number }) => {
    socket.emit('createRoom', { username: data.username, role: data.role, boardSize: data.boardSize })
  }

  socket.on('playerJoined', ({ success, room, myMove }) => {
    isJoined.value = true
    isLoading.value = false
    isRoomResponse.value = true

    if (success) {
      playerX.value = room.playerX
      playerO.value = room.playerO

      move.value = myMove

      store.boardSize = room.boardSize
      store.squares.push(...Array(Number(store.boardSize) * Number(store.boardSize)).fill(null))

      isJoined.value = true
    } else {
      router.push('/')
    }
  })

  socket.on('getRoomResponse', ({ success, room, myMove }) => {
    if (success) {
      playerX.value = room.playerX
      playerO.value = room.playerO

      isRoomResponse.value = true

      isJoined.value = true
      move.value = myMove
    } else{
      isRoomResponse.value = true
    }
  })

  socket.on('roomCreated', (room) => {
    router.push({
      path: `/room/${room.id}`
    })
  })

  return {
    initializeRoom,
    joinRoom,
    isJoined,
    isRoomResponse,
    playerX,
    playerO,
    isLoading,
    createGame,
    createUser,
    move
  }
}