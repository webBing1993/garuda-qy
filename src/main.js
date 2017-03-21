// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// normalize.css
import 'normalize.css'

import FastClick from 'fastclick'
FastClick.attach(document.body)

import moment from 'moment'
moment.locale('zh-cn');

import router from './router'
import store from './store';
import {sync} from 'vuex-router-sync'
sync(store, router)

// 组件全局引入和注册
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
