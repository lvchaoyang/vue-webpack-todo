import Vue from 'vue'

import Router from 'vue-router'

import routes from './routes'

Vue.use(Router)
export default () => {
  return new Router({
    mode: 'history',
    // base: '',
    // linkActiveClass: '',
    // linkExactActiveClass: '',
    routes,
    scrollBehavior (to, from, savedPosition) { // 路由跳转后是否滚动页面
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    fallback: true
  })
}
