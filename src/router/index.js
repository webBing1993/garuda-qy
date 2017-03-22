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
      name: "pms",
      template: `<keep-alive><router-view/></keep-alive>`,
    },
    children: [{
      path: 'prepay',
      component: require('../containers/PMS/prepay/list')
    }, {
      path: 'prepay/:id',
      component: require('../containers/PMS/prepay/detail')
    }, {
      path: 'message',
      component: require('../containers/PMS/message/index')
    }]
  }]
})
