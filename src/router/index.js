import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/',
    component: require('../containers/home')
  }, {
    path: '/pms',
    component: {
      template: `<router-view/>`,
    },
    children: [{
      path: 'prepay',
      component: require('../containers/PMS/prepay')
    }]
  }]
})
