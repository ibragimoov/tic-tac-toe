<script setup lang="ts">
import ReactNotification from './components/reactNotification.vue'
import theHeader from './components/theHeader.vue'
</script>

<template>
  <react-notification />

  <router-link to="/">
    <h1 class="logo">#</h1>
  </router-link>
  <the-header />
  <router-view />

  <img class="image--top-right" src="/images/block.png" />
  <img class="image--top-left" src="/images/block1.png" />
  <img class="image--bottom-left" src="/images/block.png" />
  <img class="image--bottom-right" src="/images/block1.png" />
</template>