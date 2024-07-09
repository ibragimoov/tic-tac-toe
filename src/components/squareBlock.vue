<script setup lang="ts">
import { ref } from "vue"

import cross from '../assets/icons/Cross.vue'
import blox from '../assets/icons/Blox.vue'

defineProps<{
  value: string | null
}>()

const emit = defineEmits<{
  (e: 'square-change'): void
}>()

const handleClick = () => {
  emit('square-change')
}
</script>

<template>
  <button @click="handleClick" class="square">
    <transition>
      <cross v-if="value === 'X'" :width="60" :height="60" />
    </transition>
    <transition>
      <blox v-if="value === 'O'" :width="60" :height="60" />
    </transition>
  </button>
</template>