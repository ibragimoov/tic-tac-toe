<template>
  <div class="notifications-emoji">
      <transition-group>
        <div 
          v-for="(notification, index) in limitedNotifications"
          :key="index"
          class="notifications-emoji__emoji"
          @click="() => removeNotificationEmoji(notification.id)"
        >
          <angry-icon v-if="notification.message === '😡'" />
          <laugh-icon v-if="notification.message === '🤣'" />
          <crying-icon v-if="notification.message === '😭'" />
          <cool-icon v-if="notification.message === '😎'" />
        </div>
      </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Notification } from '../plugins/notification'

import AngryIcon from './icons/AngryIcon.vue'
import CryingIcon from './icons/CryingIcon.vue'
import LaughIcon from './icons/LaughIcon.vue'
import CoolIcon from './icons/CoolIcon.vue'

const notificationsEmoji = inject('notificationsEmoji') as Notification[]
const removeNotificationEmoji = inject('removeNotificationEmoji') as (id: number) => void

const limitedNotifications = computed(() => {
  return notificationsEmoji.slice(0, 10)
})
</script>