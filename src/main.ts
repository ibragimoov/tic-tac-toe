import './assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import notificationPlugin from './plugins/notification'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(notificationPlugin)

app.mount('#app')
