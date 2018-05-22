import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Todolist from './views/Todolist.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: Todolist
    }
  ]
})
