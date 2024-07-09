import { reactive, type App } from 'vue';

export type NotificationType = 'success' | 'error' | 'info'

export interface Notification {
  id: number
  message: string
  type: NotificationType
}

const notifications = reactive<Notification[]>([])
let nextId: number = 1

export default {
  install: (app: App): void => {
    app.config.globalProperties.$notification = (message: string, type: NotificationType) => {
      notifications.push({ id: nextId++, message, type })

      setTimeout(() => {
        const notificationIndex = notifications.findIndex((notification: Notification) => notification.id === nextId - 1)

        if (notificationIndex !== -1) {
          notifications.shift()
        }
      }, 5000)
    }

    app.config.globalProperties.$removeNotification = (messageId: number) => {
      const notificationIndex = notifications.findIndex((notification: Notification) => notification.id === messageId)

      if (notificationIndex !== -1) {
        notifications.splice(notificationIndex, 1)
      }
    }

    app.provide('notifications', notifications)
    app.provide('addNotification', app.config.globalProperties.$notification)
    app.provide('removeNotification', app.config.globalProperties.$removeNotification)
  }
}