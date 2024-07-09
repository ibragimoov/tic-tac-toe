<template>
  <div class="notifications">
      <transition-group>
        <div 
          v-for="(notification, index) in notifications"
          :key="index"
          class="notifications__message"
          :class="`${'notifications__message--' + notification.type}`"
          @click="() => removeNotification(notification.id)"
        >
          {{ notification.message }}
        </div>
      </transition-group>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { Notification } from '../plugins/notification'

const notifications = inject('notifications') as Notification[]
const removeNotification = inject('removeNotification') as (id: number) => void
</script>