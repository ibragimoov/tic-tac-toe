<script setup lang="ts">
import { watch, inject, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useTicTacToeStore } from '../stores/game'
import type { WinnerValue, SquareValue } from '../stores/game'
import type { NotificationType } from '../plugins/notification'

import SquareBlock from './squareBlock.vue'

const store = useTicTacToeStore()
const { isCurrentStepX, winner, gameStatus, gameOver } = storeToRefs(store)

const addNotification = inject('addNotification') as (message: string, type: NotificationType) => {}

const handleSquareClick = (indexSquare: number) => {
  if (gameOver.value || store.squares[indexSquare]) {
    return
  }

  const currentValue: SquareValue = isCurrentStepX.value ? 'X' : 'O'
  store.updateSquares(indexSquare, currentValue)
}

watch(winner, (newVal: WinnerValue, _: WinnerValue) => {
  if (newVal) {
    const winnerMessage = `Игра окончена, ${newVal} победил 😎`
    addNotification(winnerMessage, 'success')
  }
})
</script>

<template>
  <div class="board">
    <div>
      <a href="https://t.me/eldar_ibragimov" target="_blank" class="board__madeby">made by @eldar_ibragimov</a>
      <h1 class="board__title">Крестики-нолики</h1>
      <h3 class="board__move">
        {{ gameStatus }}
      </h3>
      <button
        v-if="gameOver" 
        class="board__restart"
        @click="store.restartGame"
      >
        Перезапустить игру
      </button>
    </div>

    <div class="board__wrapper">
      <div class="board__row">
        <square-block :value="store.allSquares[0]" @square-change="() => handleSquareClick(0)" />
        <square-block :value="store.allSquares[1]" @square-change="() => handleSquareClick(1)" />
        <square-block :value="store.allSquares[2]" @square-change="() => handleSquareClick(2)" />
      </div>

      <div class="board__row">
        <square-block :value="store.allSquares[3]" @square-change="() => handleSquareClick(3)" />
        <square-block :value="store.allSquares[4]" @square-change="() => handleSquareClick(4)" />
        <square-block :value="store.allSquares[5]" @square-change="() => handleSquareClick(5)" />
      </div> 

      <div class="board__row">
        <square-block :value="store.allSquares[6]" @square-change="() => handleSquareClick(6)" />
        <square-block :value="store.allSquares[7]" @square-change="() => handleSquareClick(7)" />
        <square-block :value="store.allSquares[8]" @square-change="() => handleSquareClick(8)" />
      </div>  
    </div> 
  </div>
</template>
