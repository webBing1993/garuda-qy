// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// normalize.css & main.less
import 'normalize.css'
import './assets/main.less'

import FastClick from 'fastclick'
FastClick.attach(document.body)

import moment from 'moment'
moment.locale('zh-cn');

import router from './router'
import store from './store';
import {sync} from 'vuex-router-sync'
sync(store, router)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  template: '<App/>',
  components: {App}
})
