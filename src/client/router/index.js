import Vue from 'vue'
import Router from 'vue-router'

// 导入对应的vuex文件
import store from './../store/store'

// 导入相应的子组件
import Login from './../pages/Login.vue'
import index from './../pages/index.vue'
import Register from './../pages/Register.vue'
import create from './../pages/create.vue'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    { name: 'login', path: '/login', component: Login },
    { name: 'Register', path: '/register', component: Register },
    { name: 'index', path: '/', component: index },
    { name: 'create', path: '/create', component: create },
  ]
})

export default router