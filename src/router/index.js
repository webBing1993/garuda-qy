import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const pmsRouter = [{
  path: '/',
  // component: require('../containers/home')
  // component: require('../containers/PMS/prepay/list')
  component: require('../containers/PMS/predeal/list')
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
  }, {
    path: 'message',
    component: require('../containers/PMS/message/index')
  }]
}];

const preorderRouter = [{
  path: '/predeal',
  component: {
    name: "predeal",
    template: `<router-view/>`,
  },
  children: [{
    path: ':tab',
    component: require('../containers/PMS/predeal/list')
  }, {
    path: 'predetail/:id',
    component: require('../containers/PMS/predeal/detail')
  }]
}];

export default new VueRouter({
  routes: [...pmsRouter, ...preorderRouter]
})
