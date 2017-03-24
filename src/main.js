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
// Vue.component('CellBox', Vux.Cell)
// Vue.component('Cell', Vux.Cell)
Vue.component('Tab', Vux.Tab)
Vue.component('TabItem', Vux.TabItem)
Vue.component('Flexbox', Vux.Flexbox)
Vue.component('FlexboxItem', Vux.FlexboxItem)
Vue.component('Checker', Vux.Checker)
Vue.component('CheckerItem', Vux.CheckerItem)
Vue.component('Scroller', Vux.Scroller)
Vue.component('Icon', Vux.Icon)
Vue.component('Confirm', Vux.Confirm)

Vue.component('cell', require('./components/cell'))
Vue.component('cellbox', require('./components/cellbox'))
Vue.component('btn', require('./components/button'))


/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  template: '<App/>',
  components: {App}
})
