<template>
  <h1 class="title">Добро пожаловать! 👋</h1>
  <p class="description">Известнейшая логическая игра. Сразитесь с друзьями за право быть лучшим стратегом</p>
  <div class="choosing-menu">
    <!-- <router-link to="/game">
      <button class="choosing-menu--one">
        На одном 📱
      </button>
    </router-link> -->
    <router-link to="/create-room">
      <button class="choosing-menu--multiplayer">
        Создать комнату 👫
        </button>
    </router-link>
  </div>
</template>

<script setup>
</script>