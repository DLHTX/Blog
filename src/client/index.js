import Vue from 'vue'
import App from './App'

import router from './router/index'
import store from './store/store'

import axios from 'axios'
import Swipe from './lib/swipe'
import Friendly from './lib/friendly'

import ElementUI from 'element-ui';
import MintUI from 'mint-ui';
import Share from 'vue-social-sharing'


Vue.config.debug = true
Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(Swipe)
Vue.use(ElementUI);
Vue.use(MintUI);
Vue.use(Friendly);
Vue.use(Share);


// this.$loading('loading...');
// this.$loading.close(); toast用法
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { 
    App
  }
})
