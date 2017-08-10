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
}];

const precheckin = [{
  path: '/precheckin',
  component: {
    name: "precheckin",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: 'prepay/:tab',
    component: require('./containers/prepay/list.vue')
  }, {
    path: 'prepay/detail/:id',
    component: require('./containers/prepay/detail.vue')
  }, {
    path: 'order/today/:tab',
    component: require('./containers/precheckin.vue')
  }, {
    path: 'order/history/:tab',
    component: require('./containers/precheckin.vue')
  }, {
    path: 'order/detail/:id',
    component: require('./containers/detail.vue')
  }]
}];

const checkin = [{
  path: '/identity',
  component: {
    name: "identity",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: 'today/:tab',
    component: require('./containers/identity/list')
  }, {
    path: 'history/:tab',
    component: require('./containers/identity/list')
  }, {
    path: 'todo/:id',
    component: require('./containers/identity/todo')
  }, {
    path: ':id',
    component: require('./containers/identity/detail')
  }]
}, {
  path: '/new-identity',
  component: {
    name: "newIdentity",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: 'handle/:tab',
    component: require('./containers/newIdentity/list')
  },
  // {
  //   path: 'wxPay/:identityId',
  //   component: require('./containers/newIdentity/wxPay')
  // },
  {
    path: ':id',
    component: require('./containers/newIdentity/detail')
  }]
},{
  path: '/livein',
  component: {
    name: "livein",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: 'today',
    component: require('./containers/livein.vue')
  }, {
    path: 'all',
    component: require('./containers/livein.vue')
  }, {
    path: ':id',
    component: require('./containers/detail.vue')
  }]
}];
const checkout = [{
  path: '/checkout',
  component: {
    name: "checkout",
    template: `<keep-alive><router-view/></keep-alive>`
  },
  children: [{
    path: ':tab',
    component: require('./containers/checkout.vue')
  }, {
    path: 'detail/:id',
    component: require('./containers/detail.vue')
  }]
}];

const refund = [{
  path: '/refund',
  component: {
    name: "refund",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: '/',
    component: require('./containers/refund.vue')
  },
    {
      path: ':id',
      component: require('./containers/detail.vue')
    }]
}];

//ljs的老版发票
// const invoice = [{
//   path: '/invoice',
//   component: {
//     name: "invoice",
//     template: `<router-view/>`,
//   },
//   children: [{
//     path: ':tab',
//     component: require('./containers/invoice.vue')
//   }, {
//     path: 'detail/:id',
//     component: require('./containers/detail.vue')
//   },]
// }];

//闪开发票
const invoice = [{
  path: '/invoice',
  component: {
    name: "invoice",
    template: `<router-view/>`,
  },
  children: [{
    path: ':tab',
    component: require('./containers/invoice/index.vue')
  }, {
    path: 'detail/:id',
    component: require('./containers/invoice/detail.vue')
  }, {
    path: 'detail/:id/result',
    component: require('./containers/invoice/result.vue')
  }]
}];

const others = [
  {
    path: '/',
    component: require('./containers/home.vue')
  }, {
    path: '/examples',
    component: require('./containers/examples.vue')
  }, {
    path: '/404',
    component: require('./containers/404.vue')
  }, {
    path: '/*',
    redirect: '/'
  }
];

export default new VueRouter({
  mode: 'history',
  routes: [...unchained, ...precheckin, ...checkin, ...invoice, ...checkout, ...refund, ...others]
})
