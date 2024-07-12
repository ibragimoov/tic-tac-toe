<script setup lang="ts">
import { watch, inject, computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import type { WinnerValue, SquareValue } from '../stores/game'
import { useTicTacToeStore } from '../stores/game'

import { useTicTacToe } from '../services/tic-tac-toe.service'
import { useCopyToClipboard } from '../services/clipboard.service'
import type { Player } from '../services/tic-tac-toe.service'

import SquareBlock from './squareBlock.vue'

import type { NotificationType } from '../plugins/notification'
import { emojiObj } from '../utils/getEmoji'
import { socket } from '../socket'

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
const { isCurrentStepX, winner, gameStatus, gameOver, currentPlayer, currentPlayerSocketId, boardSize, allSquares } = storeToRefs(store)
const { handleMakeMove, handleRestartGame, isMoveValid, sendEmoji } = useTicTacToe()
const { copyToClipboard, isCopied } = useCopyToClipboard()
const addNotification = inject('addNotification') as (message: string, type: NotificationType) => {}

const isReactionToggled = ref<boolean>(false)

const boardRows = computed(() => {
  const rows = []
  for (let i = 0; i < boardSize.value; i++) {
    rows.push(store.squares.slice(i * boardSize.value, i * boardSize.value + boardSize.value))
  }
  return rows
})

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

const handleReactionToggle = () => {
  isReactionToggled.value = !isReactionToggled.value
}

const handleReactionClick = (emojiToSend: string) => {
  sendEmoji(props.roomId, socket.id || '', emojiToSend)
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
    <div class="board__info">
      <a href="https://t.me/eldar_ibragimov" target="_blank" class="board__madeby">made by @eldar_ibragimov</a>
      <h1 class="board__title">Крестики-нолики</h1>
      <h3 class="board__move">
        {{ gameStatus }}
      </h3>
      <div class="board__info-wrapper">
        <button
          v-if="gameOver" 
          class="board__restart"
          @click="handleRestartClick"
        >
          Перезапустить игру
        </button>
        <button v-if="players[0] === null || players[1] === null" class="board__copy" @click="copyToClipboard">
          {{ isCopied ? 'Ссылка скопирована' : 'Скопировать ссылку на игру' }}
        </button>
        <div class="board__reaction">
          <!-- <button @click="handleReactionToggle" class="board__reaction-toggle">Отправить реакцию</button> -->
          <transition>
            <div class="board__reaction-wrapper">
              <div @click="() => handleReactionClick('🤣')" class="board__reaction-item">🤣</div>
              <div @click="() => handleReactionClick('😡')" class="board__reaction-item">😡</div>
              <div @click="() => handleReactionClick('😭')" class="board__reaction-item">😭</div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div class="board__wrapper">
      <div 
        v-for="(row, rowIndex) in boardRows" 
        :key="rowIndex" 
        class="board__row"
      >
        <square-block 
          v-for="(square, colIndex) in row" 
          :key="colIndex"
          :value="square" 
          :val="rowIndex * boardSize + colIndex"
          @square-change="handleSquareClick(rowIndex * boardSize + colIndex)" 
        />
      </div> 
    </div> 
  </div>
</template>
