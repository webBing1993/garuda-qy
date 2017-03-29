import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const pmsRouter = [{
  path: '/',
  // component: require('../containers/home')
  // component: require('../containers/PMS/prepay/list')
  component: require('../containers/preOrder/historyOrder/list')

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
  path: '/preOrder',
  component: {
    name: "preOrder",
    template: `<router-view/>`,
  },
  children: [{
    path: 'todayOrder/:tab',
    component: require('../containers/preOrder/todayOrder/list')
  }, {
    path: 'todayOrder/predetail/:id',
    component: require('../containers/preOrder/todayOrder/detail')
  },{
    path: 'historyOrder/:tab',
    component: require('../containers/preOrder/historyOrder/list')
  }, {
    path: 'historyOrder/predetail/:id',
    component: require('../containers/preOrder/historyOrder/detail')
  }]
}];

export default new VueRouter({
  routes: [...pmsRouter, ...preorderRouter]
})
