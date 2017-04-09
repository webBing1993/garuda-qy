import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const unchained = [{
  path: '/unchained',
  component: {
    name: "unchained",
    template: `<router-view/>`,
  },
  children: [{
    path: 'roommanager',
    component: require('./containers/unchained/ROOMMANAGER')
  }, {
    path: 'record',
    component: require('./containers/unchained/RECORD/list.vue')
  }, {
    path: 'record/new',
    component: require('./containers/unchained/RECORD/detail.vue')
  },{
    path: 'record/:id',
    component: require('./containers/unchained/RECORD/detail.vue')
  },]
}]

const precheckin = [{
  path: '/pms',
  component: {
    name: "pms",
    template: `<router-view/>`,
  },
  children: [{
    path: 'prepay/:tab',
    component: require('./containers/pms/PREPAY/list')
  }, {
    path: 'prepay/detail/:id',
    component: require('./containers/pms/PREPAY/detail')
  }]
}, {
  path: '/preorder',
  component: {
    name: "preorder",
    template: `<router-view/>`,
  },
  children: [{
    path: 'today/:tab',
    component: require('./containers/preorder/TODAY/list')
  }, {
    path: 'today/predetail/:id',
    component: require('./containers/preorder/detail')
  }, {
    path: 'history/:tab',
    component: require('./containers/preorder/HISTORY/list')
  }, {
    path: 'history/predetail/:id',
    component: require('./containers/preorder/detail')
  }]
}];

const checkin = [{
  path: '/checkin',
  component: {
    name: "checkin",
    template: `<router-view/>`,
  },
  children: [{
    path: 'identity/today',
    component: require('./containers/checkin/IDENTITY/list')
  }, {
    path: 'identity/history',
    component: require('./containers/checkin/IDENTITY/list')
  },{
    path: 'livein',
    component: require('./containers/checkin/LIVEIN/list')
  }, {
    path: 'livein/detail/:id',
    component: require('./containers/checkin/LIVEIN/detail')
  }]
}]

const invoice = [{
  path: '/invoice',
  component: {
    name: "invoice",
    template: `<router-view/>`,
  },
  children: [{
    path: '',
    component: require('./containers/invoice/INVOICE/list.vue')
  }, {
    path: 'detail',
    component: require('./containers/invoice/INVOICE/detail.vue')
  },]
}]

const others = [{
  path: '/',
  component: require('./containers/home.vue')
}, {
  path: '/*',
  redirect: '/'
}]

export default new VueRouter({
  routes: [...unchained, ...precheckin, ...checkin, ...invoice, ...others]
})
