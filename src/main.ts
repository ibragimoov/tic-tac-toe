import './assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import notificationPlugin from './plugins/notification'
import { router } from './router/index'
import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';

import App from './App.vue'
  
const app = createApp(App)
app.use(notificationPlugin)

app.use(router)
app.use(VueLoaders)
app.use(createPinia())

app.mount('#app')
