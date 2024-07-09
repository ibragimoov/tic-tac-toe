<script setup lang="ts">
import notificationBlock from './components/notificationBlock.vue'
import theHeader from './components/theHeader.vue'
</script>

<template>
  <notification-block />

  <the-header />
  <router-view />

  <img class="image--top-right" src="/images/block.png" />
  <img class="image--top-left" src="/images/block1.png" />
  <img class="image--bottom-left" src="/images/block.png" />
  <img class="image--bottom-right" src="/images/block1.png" />
</template>