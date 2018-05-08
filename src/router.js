import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

//订单列表
const prepay = [{
  path: '/prepay',
  component: {
    name: "prepay",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: ':tab',
    component: require('./containers/prepay/list.vue')
  }, {
    path: 'detail/:id',
    component: require('./containers/prepay/detail.vue')
  }]
}];

//住离信息
const receive = [{
  path: '/receive',
  component: {
    name: 'receive',
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: 'precheckin',
    component: require('./containers/receive/receive.vue')
  }, {
    path: 'livein',
    component: require('./containers/receive/receive.vue')
  }, {
    path: 'checkout-application',
    component: require('./containers/receive/receive.vue')
  }, {
    path: 'checkout',
    component: require('./containers/receive/receive.vue')
  }, {
    path: 'precheckin-detail/:id',
    // component: require('./containers/detail.vue')
    component: require('./containers/receive/prereg_detail.vue')
  }, {
    path: 'livein-detail/:id/:roomNum',
    // component: require('./containers/detail.vue')
    component: require('./containers/receive/livein_detail.vue')
  }, {
    path: 'checkout-application-detail/:id/:roomNum',
    // component: require('./containers/detail.vue')
    component: require('./containers/receive/check_appli_detail.vue')
  }, {
    path: 'checkout-detail/:id/:roomNum',
    // component: require('./containers/detail.vue')
    component: require('./containers/receive/checkout_detail.vue')
  }]
}];

//公安核验
const policeIdentity = [{
  path: '/policeIdentity',
  component: {
    name: 'policeIdentity',
    template: `<router-view/>`,
  },
  children: [{
    path: 'handle/:tab',
    component: require('./containers/policeIdentity/list')
  },
      {
          path: 'orderSearch',
          component: require('./containers/policeIdentity/orderSearch.vue')
      },

    {
      path: ':id',
      component: require('./containers/policeIdentity/detail')
    },

  ],


}];

//异常提醒列表
　const abnormalNotice=[{
    path:'/abnormalNotice',
    component: {
       name: 'abnormalNotice',
       template: `<keep-alive><router-view/></keep-alive>`,
     },
    children:[{
      path:'listDetail',
      component:require('./containers/abnormalNotice/listDetail.vue')
    }]
 }];

//可疑人员列表
const suspicious = [{
    path: '/suspicious',
    component: {
        name: 'suspicious',
        template: `<router-view/>`,
    },
    children: [{
        path: 'suspiciousList/:tab',
        component: require('./containers/suspicious/list.vue'),
    },{
        path: 'susDetail/:id',
        component: require('./containers/suspicious/suspiciousDetail.vue')
    }]
}];

//身份核验
const identity = [{
  path: '/identity',
  component: {
    name: 'identity',
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: ':tab',
    component: require('./containers/identity/list')
  }, {
    path: 'todo/:id',
    component: require('./containers/identity/todo')
  },{
    path: 'detail/:id',
    component: require('./containers/identity/detail')
  }]
}];

//财务管理
const bill = [{
  path: '/bill',
  component: {
    name: "bill",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: ':tab',
    component: require('./containers/bill.vue')
  }, {
      path: 'receipt/detail/:id',
      component: require('./containers/detail.vue')
    }, {
      path: 'refund/detail/:id',
      component: require('./containers/detail.vue')
    }]
}];

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

//上线工具
const onlineTool=[{
    path:'/onlineTool',
    component:{
        name:"onlineTool",
        template:`<router-view/>`
    },
    children:[{
        path:'onlineList',
        component:require('./containers/onlineTool/list.vue')
    },{
        path:'onlineDetail',
        component:require('./containers/onlineTool/onlineDetail.vue')
    },{
        path:'onlineDevice',
        component:require('./containers/onlineTool/onlineDevice.vue')
    },{
        path:'hotelBasicInfo',
        component:require('./containers/onlineTool/hotelBasicInfo.vue')
    }
    ]
}];

const unchained = [
  {
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

const notLiveIn=[{
  path: '/notLiveIn',
  component: {
    name: "notLiveIn",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [{
    path: 'list',
    component: require('./containers/notLiveIn/list.vue')
  }]
}]

// 充值中心
const recharge=[{
  path:'/recharge',
  component: {
    name: "recharge",
    template: `<keep-alive><router-view/></keep-alive>`,
  },
  children: [
    {
      path: ':tab',
      component: require('./containers/recharge/index.vue')
    }]
  }]


const others = [
  {
    path: '/',
    component: require('./containers/default.vue')
  },{
    path: '/home',
    component: require('./containers/home/home.vue')
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
  routes: [...recharge,...unchained, ...prepay, ...receive, ...policeIdentity, ...identity, ...invoice, ...bill,...abnormalNotice,...notLiveIn,...suspicious, ...onlineTool,...others]
})

// const precheckin = [{
//   path: '/precheckin',
//   component: {
//     name: "precheckin",
//     template: `<keep-alive><router-view/></keep-alive>`,
//   },
//   children: [{
//     path: 'prepay/:tab',
//     component: require('./containers/prepay/listDetail.vue')
//   }, {
//     path: 'prepay/detail/:id',
//     component: require('./containers/prepay/detail.vue')
//   }, {
//     path: 'order/today/:tab',
//     component: require('./containers/precheckin.vue')
//   }, {
//     path: 'order/history/:tab',
//     component: require('./containers/precheckin.vue')
//   }, {
//     path: 'order/detail/:id',
//     component: require('./containers/detail.vue')
//   }]
// }];

// const identity = [{
//   path: '/identity',
//   component: {
//     name: "identity",
//     template: `<keep-alive><router-view/></keep-alive>`,
//   },
//   children: [{
//     path: 'today/:tab',
//     component: require('./containers/identity/list')
//   }, {
//     path: 'history/:tab',
//     component: require('./containers/identity/list')
//   }, {
//     path: 'todo/:id',
//     component: require('./containers/identity/todo')
//   }, {
//     path: ':id',
//     component: require('./containers/identity/detail')
//   }]
// }, {
//   path: '/new-identity',
//   component: {
//     name: "policeIdentity",
//     template: `<keep-alive><router-view/></keep-alive>`,
//   },
//   children: [{
//     path: 'handle/:tab',
//     component: require('./containers/policeIdentity/list')
//   },
//     // {
//     //   path: 'wxPay/:identityId',
//     //   component: require('./containers/policeIdentity/wxPay')
//     // },
//     {
//       path: ':id',
//       component: require('./containers/policeIdentity/detail')
//     }]
// }, {
//   path: '/livein',
//   component: {
//     name: "livein",
//     template: `<keep-alive><router-view/></keep-alive>`,
//   },
//   children: [{
//     path: 'today',
//     component: require('./containers/livein.vue')
//   }, {
//     path: 'all',
//     component: require('./containers/livein.vue')
//   }, {
//     path: ':id',
//     component: require('./containers/detail.vue')
//   }]
// }];
// const checkout = [{
//   path: '/checkout',
//   component: {
//     name: "checkout",
//     template: `<keep-alive><router-view/></keep-alive>`
//   },
//   children: [{
//     path: ':tab',
//     component: require('./containers/checkout.vue')
//   }, {
//     path: 'detail/:id',
//     component: require('./containers/detail.vue')
//   }]
// }];

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




