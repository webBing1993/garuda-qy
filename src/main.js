// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// normalize.css & main.less
import 'normalize.css'
import './assets/main.less'

// router
import router from './router'

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: {App}
})
