// Mockdata
import './mock'

import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// normalize.css
import 'normalize.css'

// utils
import FastClick from 'fastclick'
FastClick.attach(document.body)
import moment from 'moment'
moment.locale('zh-cn');

// router & store
import router from './router'
import store from './store';
import {sync} from 'vuex-router-sync'
sync(store, router)

// components
const Vux = require('vux')
Vue.component('Group', Vux.Group)
Vue.component('Cell', Vux.Cell)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  template: '<App/>',
  components: {App}
})
