<template>
  <h1 class="title">Добро пожаловать! <wave-hand-icon /></h1>
  <p class="description">Известнейшая логическая игра. Сразитесь с друзьями за право быть лучшим стратегом</p>
  <div class="choosing-menu">
    <router-link to="/create-room">
      <button class="choosing-menu--multiplayer">
        Создать комнату <gamepad-icon />
        </button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import GamepadIcon from '../components/icons/GamepadIcon.vue';
import WaveHandIcon from '../components/icons/WaveHandIcon.vue'
</script>

<style scoped>
h1 {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  padding-left: 15px;
  padding-right: 15px;
}
</style>