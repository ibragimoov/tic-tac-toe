import { reactive, type App } from 'vue';

export type NotificationType = 'success' | 'error' | 'info'

export interface Notification {
  id: number
  message: string
  type: NotificationType
}

const notificationsGameStatus = reactive<Notification[]>([])
const notificationsEmoji = reactive<Notification[]>([])
let nextId: number = 1

export default {
  install: (app: App): void => {
    // game status messages
    app.config.globalProperties.$notification = (message: string, type: NotificationType) => {
      notificationsGameStatus.push({ id: nextId++, message, type })

      setTimeout(() => {
        const notificationIndex = notificationsGameStatus.findIndex((notification: Notification) => notification.id === nextId - 1)

        if (notificationIndex !== -1) {
          notificationsGameStatus.shift()
        }
      }, 5000)
    }

    app.config.globalProperties.$removeNotification = (messageId: number) => {
      const notificationIndex = notificationsGameStatus.findIndex((notification: Notification) => notification.id === messageId)

      if (notificationIndex !== -1) {
        notificationsGameStatus.splice(notificationIndex, 1)
      }
    }

    // emoji messages
    app.config.globalProperties.$notificationEmoji = (message: string, type: NotificationType) => {
      notificationsEmoji.push({ id: nextId++, message, type })

      setTimeout(() => {
        const notificationIndex = notificationsEmoji.findIndex((notification: Notification) => notification.id === nextId - 1)

        if (notificationIndex !== -1) {
          notificationsEmoji.shift()
        }
      }, 5000)
    }

    app.config.globalProperties.$removeNotificationEmoji = (messageId: number) => {
      console.log(notificationsEmoji, notificationsEmoji.length)
      const notificationIndex = notificationsGameStatus.findIndex((notification: Notification) => notification.id === messageId)

      if (notificationIndex !== -1) {
        notificationsGameStatus.splice(notificationIndex, 1)
      }
    }

    app.provide('notificationsGameStatus', notificationsGameStatus)
    app.provide('notificationsEmoji', notificationsEmoji)

    app.provide('addNotification', app.config.globalProperties.$notification)
    app.provide('addNotificationEmoji', app.config.globalProperties.$notificationEmoji)
    app.provide('removeNotification', app.config.globalProperties.$removeNotification)
    app.provide('removeNotificationEmoji', app.config.globalProperties.$removeNotificationEmoji)
  }
}