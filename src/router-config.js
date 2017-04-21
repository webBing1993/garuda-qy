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
  path: '/precheckin',
  component: {
    name: "precheckin",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: 'prepay/:tab',
    component: require('./containers/precheckin/PREPAY/list.vue')
  }, {
    path: 'prepay/detail/:id',
    component: require('./containers/precheckin/PREPAY/detail.vue')
  }, {
    path: 'order/today/:tab',
    component: require('./containers/precheckin/ORDER/list.vue')
  }, {
    path: 'order/history/:tab',
    component: require('./containers/precheckin/ORDER/list.vue')
  }, {
    path: 'order/detail/:id',
    component: require('./containers/precheckin/ORDER/detail.vue')
  }]
}]

const checkin = [{
  path: '/identity',
  component: {
    name: "identity",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: 'today/:tab',
    component: require('./containers/checkin/IDENTITY/list')
  }, {
    path: 'history/:tab',
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
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: 'today',
    component: require('./containers/checkin/LIVEIN/list.vue')
  }, {
    path: 'all',
    component: require('./containers/checkin/LIVEIN/list.vue')
  }, {
    path: ':id',
    component: require('./containers/checkin/LIVEIN/detail.vue')
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

const others = [
  {
    path: '/',
    component: require('./containers/home.vue')
  }, {
    path: '/examples',
    component: require('./containers/examples.vue')
  }, {
    path: '/*',
    redirect: '/'
  }
]

export default new VueRouter({
  // mode: 'history',
  routes: [...unchained, ...precheckin, ...checkin, ...invoice, ...others]
})
