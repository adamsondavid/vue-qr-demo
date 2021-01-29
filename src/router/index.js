import Vue from 'vue'
import VueRouter from 'vue-router'
import QrScanner from "@/pages/QrScanner";
import Home from "@/pages/Home";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/scan',
    component: QrScanner
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
