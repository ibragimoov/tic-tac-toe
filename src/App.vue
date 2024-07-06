<script setup lang="ts">
import { computed, ref } from "vue";

import square from "./components/square/index.vue"

import cross from './assets/icons/Cross.vue'
import blox from './assets/icons/blox.vue'

const squares = ref(Array(9).fill(null))
const isCurrentX = ref(true)
const winner = ref('')

const move = computed(() => {
  let status: string
  const winnerr = calculateWinner(squares.value)
  if (winnerr) {
    status = "Победил: " + winnerr;
    winner.value = String(winnerr)
  } else {
    status = "Сейчас ходит:"
  }
  return status
})

const handleSquareClick = (indexSquare: number) => {
  const square = squares.value[indexSquare]
  if (square || calculateWinner(squares.value)) {
    return
  }

  const currentValue = isCurrentX.value ? 'X' : 'O'
  squares.value[indexSquare] = currentValue
  isCurrentX.value = !isCurrentX.value
}

const calculateWinner = (squares: Array<number>) => {
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
}
</script>

<template>
  <div class="board">
    <div>
      <a href="https://t.me/eldar_ibragimov" target="_blank" class="board__madeby">made by @eldar_ibragimov</a>
      <h1 class="board__title">Крестики-нолики</h1>
      <h3 class="board__move">
        {{ move }}
        <div v-if="!winner">
          <cross v-if="isCurrentX" :width="30" :height="30" />
          <blox v-else :width="30" :height="30" />
        </div>
      </h3>
    </div>

    <div class="board__wrapper">
      <div class="board__row">
        <square :value="squares[0]" @square-change="() => handleSquareClick(0)" />
        <square :value="squares[1]" @square-change="() => handleSquareClick(1)" />
        <square :value="squares[2]" @square-change="() => handleSquareClick(2)" />
      </div>

      <div class="board__row">
        <square :value="squares[3]" @square-change="() => handleSquareClick(3)" />
        <square :value="squares[4]" @square-change="() => handleSquareClick(4)" />
        <square :value="squares[5]" @square-change="() => handleSquareClick(5)" />
      </div> 

      <div class="board__row">
        <square :value="squares[6]" @square-change="() => handleSquareClick(6)" />
        <square :value="squares[7]" @square-change="() => handleSquareClick(7)" />
        <square :value="squares[8]" @square-change="() => handleSquareClick(8)" />
      </div>  
    </div> 
  </div>
</template>

<style scoped>

</style>
