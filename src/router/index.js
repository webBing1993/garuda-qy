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
    path: 'prepay/:tab',
    component: require('../containers/pms/PREPAY/list')
  }, {
    path: 'prepay/detail/:id',
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
  path: '/preorder',
  component: {
    name: "preorder",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: 'today/:tab',
    component: require('../containers/preorder/TODAY/list')
  }, {
    path: 'today/predetail/:id',
    component: require('../containers/preorder/TODAY/detail')
  }, {
    path: 'history/:tab',
    component: require('../containers/preorder/HISTORY/list')
  }, {
    path: 'history/predetail/:id',
    component: require('../containers/preorder/HISTORY/detail')
  }]
}];

const final = [{
  path: '/*',
  redirect: '/'
}]

export default new VueRouter({
  routes: [...pmsRouter, ...unchained, ...preorderRouter, ...final]
})
