<template>
  <div class="create-room">
    <h1 class="title">Создание комнаты 🔍</h1>

    <h3>Выберите роль:</h3>
    <div class="create-room__roles-list">
      <div @click="() => handleClick('X')" :class="{ 'create-room__roles-item--active': role === 'X' }" class="create-room__roles-item">
        <cross-icon :width="70" :height="70" />
      </div>
      <div @click="() => handleClick('O')" :class="{ 'create-room__roles-item--active': role === 'O' }" class="create-room__roles-item">
        <circle-icon :width="70" :height="65" />
      </div>
    </div>

    <h3>Игроки:</h3>
    <div class="create-room__players-list">
      <div class="create-room__players-item">
        <h3># EIbragimov</h3>
        <p><span>Рейтинг</span> 450 конфет <strong>🍬</strong></p>    
      </div>
      <div class="create-room__players-item">
        <h3># Peridot</h3>
        <p><span>Рейтинг</span> 35 конфет <strong>🍬</strong></p>    
      </div>
      <div class="create-room__players-item create-room__players-item--new">
        <h3>Пригласить друга ➕</h3>   
      </div>
    </div>

    <button class="create-room__submit">Начать игру</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import crossIcon from '../components/icons/CrossIcon.vue'
import circleIcon from '../components/icons/CircleIcon.vue'

import type { SquareValue } from '../stores/game'

const role = ref<SquareValue>(null)

const handleClick = (value: SquareValue) => {
  role.value = value
}
</script>

<style scoped>

</style>