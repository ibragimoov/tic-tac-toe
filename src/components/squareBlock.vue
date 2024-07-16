<script setup lang="ts">
import { computed } from 'vue';

import crossIcon from './icons/CrossIcon.vue'
import circleIcon from './icons/CircleIcon.vue'

const props = defineProps<{
  value: string | null,
  isWin: boolean
}>()

const emit = defineEmits<{
  (e: 'square-change'): void
}>()

const handleClick = () => {
  emit('square-change')
}

const getIconByValue = computed(() => {
  if (props.value === 'X') return crossIcon
  if (props.value === 'O') return circleIcon

  return null
})
</script>

<template>
  <button @click="handleClick" class="square" :class="{ 'square__win': isWin }">
    <transition>
      <component :is="getIconByValue" :width="60" :height="60" />
    </transition>
  </button>
</template>