import Vue from 'vue'
import Router from 'vue-router'

// 导入对应的vuex文件
import store from './../store/store'

// 导入相应的子组件
import Login from './../pages/Login.vue'
import index from './../pages/index.vue'
import Register from './../pages/Register.vue'
import create from './../pages/create.vue'
import blogDetail from './../pages/blogDetail.vue'
import talk from './../pages/talk.vue'
Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    { name: 'login', path: '/login', component: Login },
    { name: 'Register', path: '/register', component: Register },
    { name: 'index', path: '/', component: index },
    { name: 'create', path: '/create', component: create },
    { name: 'blogDetail', path: '/blogDetail', component: blogDetail },
    { name: 'talk', path: '/talk', component: talk },
  ]
})

export default router