<script setup lang="ts">
import notificationBlock from './components/notificationBlock.vue'
import theHeader from './components/theHeader.vue'
</script>

<template>
  <notification-block />

  <the-header />
  <router-view />
</template>