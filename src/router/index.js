import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const pmsRouter = [{
  path: '/',
  component: require('../containers/home.vue')
}, {
  path: '/pms',
  component: {
    name: "pms",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: 'PREPAY/:tab',
    component: require('../containers/pms/PREPAY/list')
  }, {
    path: 'PREPAY/detail/:id',
    component: require('../containers/pms/PREPAY/detail')
  }]
}];

const unchained = [{
  path: '/unchained',
  component: {
    name: "unchained",
    template: `<router-view/>`,
  },
  children: [{
    path: 'roommanager',
    component: require('../containers/unchained/ROOMMANAGER')
  }]
}]

const preorderRouter = [{
  path: '/preOrder',
  component: {
    name: "preOrder",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: 'todayOrder/:tab',
    component: require('../containers/preOrder/todayOrder/list')
  }, {
    path: 'todayOrder/predetail/:id',
    component: require('../containers/preOrder/todayOrder/detail')
  }, {
    path: 'historyOrder/:tab',
    component: require('../containers/preOrder/historyOrder/list')
  }, {
    path: 'historyOrder/predetail/:id',
    component: require('../containers/preOrder/historyOrder/detail')
  }]
}];

export default new VueRouter({
  routes: [...pmsRouter, ...unchained, ...preorderRouter]
})
