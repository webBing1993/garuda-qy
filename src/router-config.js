import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const unchained = [{
  path: '/roommanager',
  component: require('./containers/unchained/ROOMMANAGER')
}, {
  path: '/record',
  component: {
    name: "record",
    template: `<router-view/>`,
  },
  children: [{
    path: '/',
    component: require('./containers/unchained/RECORD/list.vue')
  }, {
    path: 'new',
    component: require('./containers/unchained/RECORD/detail.vue')
  }, {
    path: ':id',
    component: require('./containers/unchained/RECORD/detail.vue')
  }]
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
    path: ':id',
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
    path: 'history/:tab',
    component: require('./containers/preorder/HISTORY/list')
  }, {
    path: ':id',
    component: require('./containers/preorder/detail')
  }]
}]

const checkin = [{
  path: '/identity',
  component: {
    name: "identity",
    template: `<router-view/>`,
  },
  children: [{
    path: 'today',
    component: require('./containers/checkin/IDENTITY/list')
  }, {
    path: 'history',
    component: require('./containers/checkin/IDENTITY/list')
  }, {
    path: 'todo/:id',
    component: require('./containers/checkin/IDENTITY/todo')
  }, {
    path: ':id',
    component: require('./containers/checkin/IDENTITY/detail')
  }]
}, {
  path: '/livein',
  component: {
    name: "livein",
    template: `<router-view/>`,
  },
  children: [{
    path: 'today',
    component: require('./containers/checkin/LIVEIN/list')
  }, {
    path: 'all',
    component: require('./containers/checkin/LIVEIN/list')
  }, {
    path: ':id',
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
    path: ':tab',
    component: require('./containers/invoice/INVOICE/list.vue')
  }, {
    path: 'detail/:id',
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
