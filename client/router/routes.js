import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    name: 'todo',
    component: Todo
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]
