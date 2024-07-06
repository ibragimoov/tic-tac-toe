<script setup lang="ts">
import { computed, ref } from "vue";

import square from "./components/square/index.vue"

import cross from './assets/icons/Cross.vue'
import blox from './assets/icons/blox.vue'

import { useTicTacToeStore } from './stores/game'

const store = useTicTacToeStore()

const isCurrentStepX = ref(true)

const move = computed(() => {
  let status: string
  const winner: number = store.calculateWinner(store.squares)

  if (winner) {
    status = "Победил: " + String(winner ? 'Крестик' : 'Нолик');
  } else {
    status = "Сейчас ходит: " + String(isCurrentStepX.value ? 'X' : 'O')
  }
  return status
})

const handleSquareClick = (indexSquare: number) => {
  const square = store.squares[indexSquare]
  if (square || store.calculateWinner(store.squares)) {
    return
  }

  const currentValue = isCurrentStepX.value ? 'X' : 'O'
  store.updateSquares(indexSquare, currentValue)
  isCurrentStepX.value = !isCurrentStepX.value
}
</script>

<template>
  <div class="board">
    <div>
      <a href="https://t.me/eldar_ibragimov" target="_blank" class="board__madeby">made by @eldar_ibragimov</a>
      <h1 class="board__title">Крестики-нолики</h1>
      <h3 class="board__move">
        {{ move }}
      </h3>
      <button
        v-if="store.calculateWinner(store.squares)" 
        class="board__restart"
        @click="() => store.restartGame()"
      >
        Перезапустить игру
      </button>
    </div>

    <div class="board__wrapper">
      <div class="board__row">
        <square :value="store.allSquares[0]" @square-change="() => handleSquareClick(0)" />
        <square :value="store.allSquares[1]" @square-change="() => handleSquareClick(1)" />
        <square :value="store.allSquares[2]" @square-change="() => handleSquareClick(2)" />
      </div>

      <div class="board__row">
        <square :value="store.allSquares[3]" @square-change="() => handleSquareClick(3)" />
        <square :value="store.allSquares[4]" @square-change="() => handleSquareClick(4)" />
        <square :value="store.allSquares[5]" @square-change="() => handleSquareClick(5)" />
      </div> 

      <div class="board__row">
        <square :value="store.allSquares[6]" @square-change="() => handleSquareClick(6)" />
        <square :value="store.allSquares[7]" @square-change="() => handleSquareClick(7)" />
        <square :value="store.allSquares[8]" @square-change="() => handleSquareClick(8)" />
      </div>  
    </div> 
  </div>
</template>

<style scoped>

</style>
