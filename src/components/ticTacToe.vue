<script setup lang="ts">
import { watch, inject } from 'vue'
import { storeToRefs } from 'pinia'

import type { WinnerValue, SquareValue } from '../stores/game'
import { useTicTacToeStore } from '../stores/game'

import { useTicTacToe } from '../services/tic-tac-toe.service'
import { useCopyToClipboard } from '../services/clipboard.service'
import type { Player } from '../services/tic-tac-toe.service'

import SquareBlock from './squareBlock.vue'

import type { NotificationType } from '../plugins/notification'

const props = defineProps({
  players: {
    type: Array<Player>,
    required: true,
  },
  roomId: {
    type: Number,
    required: true
  }
})

const store = useTicTacToeStore()
const { isCurrentStepX, winner, gameStatus, gameOver, currentPlayer, currentPlayerSocketId } = storeToRefs(store)
const { handleMakeMove, handleRestartGame, isMoveValid } = useTicTacToe()
const { copyToClipboard, isCopied } = useCopyToClipboard()
const addNotification = inject('addNotification') as (message: string, type: NotificationType) => {}

const handleRestartClick = () => {
  handleRestartGame(String(props.roomId))
}

const handleSquareClick = (indexSquare: number) => {
  if (!isMoveValid(indexSquare, props.players[0], props.players[1])) {
    return
  }

  const currentValue: SquareValue = isCurrentStepX.value ? 'X' : 'O'

  const moveObj = { 
    roomId: props.roomId, 
    index: indexSquare, 
    move: currentValue, 
    player: props.players[isCurrentStepX.value ? 0 : 1].username
  }
  
  handleMakeMove(moveObj)
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
      <div class="board__info-wrapper">
        <button
          v-if="gameOver" 
          class="board__restart"
          @click="() => handleRestartClick()"
        >
          Перезапустить игру
        </button>
        <button class="board__copy" @click="copyToClipboard">
          {{ isCopied ? 'Ссылка скопирована' : 'Скопировать ссылку на игру' }}
        </button>
      </div>
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
