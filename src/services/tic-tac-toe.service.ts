import { ref, computed, inject } from 'vue'
import { useTicTacToeStore, type SquareValue } from '@/stores/game'
import { socket } from '../socket'
import type { NotificationType } from '@/plugins/notification'

export interface Player {
  id: number
  username: string
  rating: number
}

export const useTicTacToe = () => {
  const store = useTicTacToeStore()
  const addNotification = inject('addNotificationEmoji') as (message: string, type: NotificationType) => {}

  const currentPlayerSocketId = computed(() => store.currentPlayerSocketId)

  const isMoveValid = (indexSquare: number, playerX: Player | null, playerO: Player | null) => {
    if (!playerX || !playerO) return false

    if (socket.id !== currentPlayerSocketId.value) {
      return false
    }

    const isGameEnded = store.gameOver || store.squares[indexSquare]
    return !isGameEnded
  }

  const handleRestartGame = (roomId: string) => {
    socket.emit('restartGame', { roomId })
    store.restartGame()
  }

  const handleMakeMove = (
    data: { roomId: number, index: number, move: SquareValue, player: string }
  ) => {
    socket.emit('makeMove', { 
      roomId: data.roomId, 
      index: data.index, 
      move: data.move, 
      player: data.player, 
      socketId: socket.id
    })

    store.updateSquares(data.index, data.move, store.isCurrentStepX ? false : true, String(socket.id))
  }

  const sendEmoji = (roomId: number, from: string, emojiToSend: string) => {
    socket.emit('sendEmoji', { roomId, from, emoji: emojiToSend })
  }

  socket.on('moveMade', (data: { index: number, move: SquareValue, isCurrentStepX: boolean, socketId: string }) => {
    store.updateSquares(data.index, data.move, data.isCurrentStepX, data.socketId)
  })

  socket.on('gameStateUpdate', (data: { boardState: Array<'X' | 'O' | null>, currentStepX: boolean, socketId: string, isRestart: boolean, boardSize: number }) => {
    const isUpdateGameStateToAnotherPlayer = data.socketId === socket.id
    if (isUpdateGameStateToAnotherPlayer || data.isRestart) {
      store.setBoardState(data.boardState, data.currentStepX, data.socketId, data.boardSize)
    }
  })

  socket.on('getPlayerFirstMove', ({ socketId }) => {
    store.currentPlayerSocketId = socketId
  })

  socket.on('handleEmoji', ({ to, message }) => {
    addNotification(message, 'success')
  })

  return {
    handleMakeMove,
    handleRestartGame,
    isMoveValid,
    sendEmoji
  }
}
