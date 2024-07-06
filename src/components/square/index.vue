<script setup lang="ts">
import { ref } from "vue"

import cross from '../../assets/icons/Cross.vue'
import blox from '../../assets/icons/blox.vue'

defineProps<{
  value: string
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
    <cross v-if="value === 'X'" :width="60" :height="60" />
    <blox v-if="value === 'O'" :width="60" :height="60" />
  </button>
</template>

<style lang="scss" scoped>

</style>