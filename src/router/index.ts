import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'

import HomePage from '../pages/Home.vue'
import CreateRoom from '../pages/CreateRoom.vue'
import Room from '../pages/Room.vue'
import TicTacToe from '../components/ticTacToe.vue'

type AppRouterRecord = Omit<RouteRecordRaw, 'children' & {
  name: string,
  children?: AppRouterRecord[]
}>

const routes = [
  { path: '/', name: 'main', component: HomePage },
  { path: '/home', component: HomePage },
  { path: '/game', component: TicTacToe },
  { path: '/room/:id(\\d+)', component: Room },
  { path: '/create-room', component: CreateRoom },
  { path: '/:pathMatch(.*)*', component: () => import('@/pages/NotFound.vue') }
] satisfies readonly AppRouterRecord[]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})