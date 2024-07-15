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

  const isMoveValid = (indexSquare: number, playerX: Player | null, playerO: Player | null, isCurrentStepX: boolean) => {
    if (!playerX || !playerO) return false

    const currentMove = isCurrentStepX ? 'X' : 'O'

    if (currentMove !== store.myMove) return false

    const isGameEnded = store.gameOver || store.squares[indexSquare]
    return !isGameEnded
  }

  const handleRestartGame = (roomId: string) => {
    socket.emit('restartGame', { roomId })
    store.restartGame()
  }

  const handleMakeMove = (
    data: { roomId: number, index: number, move: SquareValue, isCurrentStepX: boolean }
  ) => {
    socket.emit('makeMove', { 
      roomId: data.roomId, 
      index: data.index, 
      move: data.move, 
      isCurrentStepX: data.isCurrentStepX,
    })

    store.updateSquares(data.index, data.move, store.isCurrentStepX ? false : true)
  }

  const sendEmoji = (roomId: number, from: string, emojiToSend: string) => {
    addNotification(emojiToSend, 'success')
    socket.emit('sendEmoji', { roomId, from, emoji: emojiToSend })
  }

  socket.on('moveMade', (data: { index: number, move: SquareValue, isCurrentStepX: boolean, socketId: string }) => {
    store.updateSquares(data.index, data.move, data.isCurrentStepX)
  })

  socket.on('gameStateUpdate', (data: { indexSquare: number, currentStepX: boolean, move: 'X' | 'O' }) => {
    store.setBoardState(data.indexSquare, data.currentStepX, data.move)
  })

  socket.on('handleEmoji', ({ message }) => {
    addNotification(message, 'success')
  })

  socket.on('restartGame', () => {
    store.restartGame()
  })

  socket.on('playerLeft', ({ message }) => {
    addNotification(message, 'info')
  })

  return {
    handleMakeMove,
    handleRestartGame,
    isMoveValid,
    sendEmoji
  }
}
