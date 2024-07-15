import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { socket } from '@/socket'

// types
export type SquareValue = 'X' | 'O' | null
export type WinnerValue = 'Крестик' | 'Нолик' | 'Ничья' | null

export const useTicTacToeStore = defineStore('tic-tac-toe', () => {
  // state
  const boardSize = ref<number>(0)
  const squares = ref<Array<SquareValue>>([] || Array(boardSize.value).fill(null))
  const isCurrentStepX = ref<Boolean>(true)
  const myMove = ref<'X' | 'O' | null>(null)

  // computed
  const allSquares = computed(() => squares.value)

  const winner = computed<WinnerValue>(() => {
    const winnerValue = calculateWinner(squares.value, boardSize.value)
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

  const boardRows = computed(() => {
    const rows = []
    for (let i = 0; i < boardSize.value; i++) {
      rows.push(squares.value.slice(i * boardSize.value, i * boardSize.value + boardSize.value))
    }
    return rows
  })

  // actions
  const updateSquares = (indexSquare: number, value: SquareValue, currentStepX: boolean): void => {
    if (squares.value[indexSquare] !== value) {
      squares.value.splice(indexSquare, 1, value)
    }

    isCurrentStepX.value = currentStepX
  }

  const setBoardState = (indexSquare: number, currentStepX: boolean, move: 'X' | 'O'): void => {
    squares.value[indexSquare] = move
    isCurrentStepX.value = currentStepX
  }

  const restartGame = () => {
    squares.value = Array(boardSize.value * boardSize.value).fill(null)
    isCurrentStepX.value = true
  }

  const calculateWinner = (squares: Array<SquareValue>, size: number): string | null => {
    const winLength = size >= 4 ? size - 1 : 3

    const checkLine = (line: number[]): SquareValue | null => {
      const [first, ...rest] = line
      if (squares[first] && rest.every(index => squares[index] === squares[first])) {
        return squares[first]
      }
      return null
    }

    const lines: number[][] = []

    for (let i = 0; i < size; i++) {
      for (let j = 0; j <= size - winLength; j++) {
        lines.push(Array.from({ length: winLength }, (_, k) => i * size + j + k))
      }
    }

    for (let i = 0; i < size; i++) {
      for (let j = 0; j <= size - winLength; j++) {
        lines.push(Array.from({ length: winLength }, (_, k) => j * size + i + k * size))
      }
    }

    for (let i = 0; i <= size - winLength; i++) {
      for (let j = 0; j <= size - winLength; j++) {
        lines.push(Array.from({ length: winLength }, (_, k) => (i + k) * size + (j + k)))
      }
    }

    for (let i = 0; i <= size - winLength; i++) {
      for (let j = winLength - 1; j < size; j++) {
        lines.push(Array.from({ length: winLength }, (_, k) => (i + k) * size + (j - k)))
      }
    }

    for (const line of lines) {
      const result = checkLine(line)
      if (result) {
        return result
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
    boardSize,
    myMove,
    boardRows
  }
})
