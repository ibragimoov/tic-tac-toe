import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// types
export type SquareValue = 'X' | 'O' | null
export type WinnerValue = 'Крестик' | 'Нолик' | 'Ничья' | null

export const useTicTacToeStore = defineStore('tic-tac-toe', () => {
  // state
  const squares = ref<Array<SquareValue>>(Array(9).fill(null))
  const isCurrentStepX = ref<Boolean>(true)
  const currentPlayerSocketId = ref<string | null>(null)

  // computed
  const allSquares = computed(() => squares.value)

  const winner = computed<WinnerValue>(() => {
    const winnerValue = calculateWinner(squares.value)
    return winnerValue !== null ? (winnerValue === 'X' ? 'Крестик' : 'Нолик') : null
  })

  const currentPlayer = computed(() => (isCurrentStepX.value ? 'X' : 'O'))

  const gameStatus = computed(() => {
    if (winner.value) return `Победил: ${winner.value}` 
    if (isDraw.value) return 'Ничья'
    else return `Сейчас ходит: ${currentPlayer.value}`
  })

  const isDraw = computed(() => {
    const isBoardFull = squares.value.every(square => square !== null)
    return isBoardFull && !winner.value
  })

  const gameOver = computed(() => (
    winner.value !== null || isDraw.value
  ))

  // actions
  const updateSquares = (indexSquare: number, value: SquareValue, socketId: string): void => {
    if (squares.value[indexSquare] !== value) {
      squares.value[indexSquare] = value
    }

    isCurrentStepX.value = !isCurrentStepX.value
    currentPlayerSocketId.value = socketId
  }

  const setBoardState = (boardState: Array<SquareValue>, currentStepX: boolean, socketId: string): void => {
    const areEqual = JSON.stringify(squares.value) === JSON.stringify(boardState)
    if (!areEqual) {
      squares.value = [...boardState]
    }

    isCurrentStepX.value = currentStepX
    currentPlayerSocketId.value = socketId || null
  }

  const restartGame = () => {
    isCurrentStepX.value = true
    currentPlayerSocketId.value = null
  }

  const calculateWinner = (squares: Array<SquareValue>): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  return {
    squares,
    calculateWinner,
    allSquares,
    updateSquares,
    setBoardState,
    restartGame,
    isCurrentStepX,
    winner,
    gameStatus,
    currentPlayer,
    isDraw,
    gameOver,
    currentPlayerSocketId
  }
})
