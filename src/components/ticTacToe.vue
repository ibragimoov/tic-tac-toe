<script setup lang="ts">
import { watch, inject } from 'vue'
import { storeToRefs } from 'pinia'

import SquareBlock from './squareBlock.vue'

import { socket } from '../socket'

import { useTicTacToeStore } from '../stores/game'
import type { WinnerValue, SquareValue } from '../stores/game'

import type { NotificationType } from '../plugins/notification'

const props = defineProps({
  players: {
    type: Array,
    required: true,
  },
  roomId: {
    type: Number,
    required: false
  }
})

const store = useTicTacToeStore()
const { isCurrentStepX, winner, gameStatus, gameOver, currentPlayer, currentPlayerSocketId } = storeToRefs(store)

const addNotification = inject('addNotification') as (message: string, type: NotificationType) => {}

const handleRestartGame = () => {
  socket.emit('restartGame', { roomId: props.roomId })
  store.restartGame()
}

const handleSquareClick = (indexSquare: number) => {
  const isCurrentPlayerExist = currentPlayerSocketId.value !== null && currentPlayerSocketId.value !== socket.id
  if (isCurrentPlayerExist) { return }

  const isGameEnded = gameOver.value || store.squares[indexSquare]
  if (isGameEnded) { return }

  const currentValue: SquareValue = isCurrentStepX.value ? 'X' : 'O'

  console.log(currentPlayerSocketId.value, socket.id)

  socket.emit('makeMove', { 
    roomId: props.roomId, 
    index: indexSquare, 
    move: currentValue, 
    player: props.players[isCurrentStepX.value ? 0 : 1], 
    socketId: socket.id
  })

  store.updateSquares(indexSquare, currentValue, String(socket.id))
}

watch(winner, (newVal: WinnerValue, _: WinnerValue) => {
  if (newVal) {
    const winnerMessage = `Игра окончена, ${newVal} победил 😎`
    addNotification(winnerMessage, 'success')
  }
})

socket.on('moveMade', (data: { index: number, player: SquareValue, socketId: string }) => {
  if (data.socketId !== socket.id) {
    store.updateSquares(data.index, data.player, data.socketId)
  }
})

socket.on('gameStateUpdate', (data: { boardState: Array<'X' | 'O' | null>, currentStepX: boolean, socketId: string }) => {
  store.setBoardState(data.boardState, data.currentStepX, data.socketId)
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
        @click="() => handleRestartGame()"
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
