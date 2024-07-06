import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type SquareValue =  'X' | 'O';

export const useTicTacToeStore = defineStore('tic-tac-toe', () => {
  const squares = ref<Array<any>>(Array(9).fill(null))

  const allSquares = computed(() => {
    return squares.value
  })

  const updateSquares = (indexSquare: number, value: SquareValue): void => {
    squares.value[indexSquare] = value
  }

  const restartGame = () => {
    squares.value = Array(9).fill(null)
  }

  const calculateWinner = (squares: Array<number>): number | null => {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  return { squares, calculateWinner, allSquares, updateSquares, restartGame }
})
