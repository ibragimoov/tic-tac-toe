<template>
  <div class="notifications-emoji">
      <transition-group>
        <div 
          v-for="(notification, index) in notificationsEmoji"
          :key="index"
          class="notifications-emoji__emoji"
          @click="() => removeNotificationEmoji(notification.id)"
        >
          {{ notification.message }}
        </div>
      </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Notification } from '../plugins/notification'

const notificationsEmoji = inject('notificationsEmoji') as Notification[]
const removeNotificationEmoji = inject('removeNotificationEmoji') as (id: number) => void

// const limitedNotifications = computed(() => {
//   return notificationsEmoji.slice(0, 3)
// })
</script>