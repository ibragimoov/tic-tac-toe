import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export type SquareValue = 'X' | 'O' | null;
export type WinnerValue = 'Крестик' | 'Нолик' | 'Ничья' | null;

export const useTicTacToeStore = defineStore('tic-tac-toe', () => {
  const squares = ref<Array<SquareValue>>(Array(9).fill(null));
  const isCurrentStepX = ref(true);

  const allSquares = computed(() => {
    return squares.value;
  });

  const winner = computed<WinnerValue>(() => {
    const winnerValue = calculateWinner(squares.value);
    return winnerValue !== null ? (winnerValue === 'X' ? 'Крестик' : 'Нолик') : null;
  });

  const currentPlayer = computed(() => {
    return isCurrentStepX.value ? 'X' : 'O';
  });

  const gameStatus = computed(() => {
    if (winner.value) {
      return `Победил: ${winner.value}`;
    } else if (isDraw.value) {
      return 'Ничья';
    } else {
      return `Сейчас ходит: ${currentPlayer.value}`;
    }
  });

  const isDraw = computed(() => {
    return squares.value.every(square => square !== null) && !winner.value;
  });

  const gameOver = computed(() => {
    return winner.value !== null || isDraw.value;
  });

  const updateSquares = (indexSquare: number, value: SquareValue): void => {
    if (gameOver.value || squares.value[indexSquare]) return;
    squares.value[indexSquare] = value;
    isCurrentStepX.value = !isCurrentStepX.value;
  };

  const restartGame = () => {
    squares.value = Array(9).fill(null);
    isCurrentStepX.value = true;
  };

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
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  return { squares, calculateWinner, allSquares, updateSquares, restartGame, isCurrentStepX, winner, gameStatus, currentPlayer, isDraw, gameOver };
});
