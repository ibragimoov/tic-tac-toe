<template>
  <h1 class="title">Доброе пожаловать! 👋</h1>
  <p class="description">Выберите формат игры. Будете играть на одном устройстве или вместе с другом</p>
  <div class="choosing-menu">
    <router-link to="/game">
      <button class="choosing-menu--one">
        На одном 📱
      </button>
    </router-link>
    <router-link to="/create-room">
      <button class="choosing-menu--multiplayer">
        Создать комнату 👫
        </button>
    </router-link>
  </div>
</template>

<script setup>

</script>