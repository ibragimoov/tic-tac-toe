<script setup lang="ts">
import { watch, inject, computed, ref, onMounted } from 'vue'
import type { PropType } from 'vue'
import { storeToRefs } from 'pinia'

import type { WinnerValue, SquareValue } from '../stores/game'
import { useTicTacToeStore } from '../stores/game'

import { useTicTacToe } from '../services/tic-tac-toe.service'
import { useCopyToClipboard } from '../services/clipboard.service'
import type { Player } from '../services/tic-tac-toe.service'

import SquareBlock from './squareBlock.vue'

import type { NotificationType } from '../plugins/notification'
import { socket } from '../socket'

import AngryIcon from './icons/AngryIcon.vue'
import CryingIcon from './icons/CryingIcon.vue'
import LaughIcon from './icons/LaughIcon.vue'
import CoolIcon from './icons/CoolIcon.vue'

const props = defineProps({
  players: {
    type: Array as PropType<Player[]>,
    required: true,
  },
  roomId: {
    type: Number,
    required: true
  },
  move: {
    type: String as PropType<'X' | 'O' | null>,
    required: true
  }
})

const store = useTicTacToeStore()
const { isCurrentStepX, winner, gameStatus, gameOver, currentPlayer, boardSize, allSquares, boardRows } = storeToRefs(store)
const { handleMakeMove, handleRestartGame, isMoveValid, sendEmoji } = useTicTacToe()
const { copyToClipboard, isCopied } = useCopyToClipboard()
const addNotification = inject('addNotification') as (message: string, type: NotificationType) => {}

const handleRestartClick = () => {
  handleRestartGame(String(props.roomId))
}

const handleSquareClick = (indexSquare: number) => {
  const currentValue: SquareValue = isCurrentStepX.value ? 'X' : 'O'
  const valueIsCurrentStepX = isCurrentStepX.value ? true: false

  if (!isMoveValid(indexSquare, props.players[0], props.players[1], valueIsCurrentStepX)) {
    return
  }

  const moveObj = { 
    roomId: props.roomId, 
    index: indexSquare, 
    move: currentValue, 
    isCurrentStepX: isCurrentStepX.value ? true: false,
  }

  handleMakeMove(moveObj)
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

onMounted(() => {
  store.myMove = props.move
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
          <transition>
            <div class="board__reaction-wrapper">
              <div @click="() => handleReactionClick('🤣')" class="board__reaction-item"><laugh-icon /></div>
              <div @click="() => handleReactionClick('😡')" class="board__reaction-item"><angry-icon /></div>
              <div @click="() => handleReactionClick('😭')" class="board__reaction-item"><crying-icon /></div>
              <div @click="() => handleReactionClick('😎')" class="board__reaction-item"><cool-icon /></div>
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
