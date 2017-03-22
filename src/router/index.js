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
      path: 'prepay/:tab',
      component: require('../containers/PMS/prepay/list')
    }, {
      path: 'prepay/detail/:id',
      component: require('../containers/PMS/prepay/detail')
    }]
  }]
})
