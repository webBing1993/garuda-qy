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
  }]
}]

const pms = [{
  path: '/',
  component: require('./containers/home.vue')
}, {
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
  },{
    path: 'identity/history',
    component: require('./containers/checkin/IDENTITY/list')
  },]
}]


const precheckin = [{
  path: '/preorder',
  component: {
    name: "preorder",
    template: `<keep-alive><router-view/></keep-alive>`,
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

const others = [{
  path: '/*',
  redirect: '/'
}]

export default new VueRouter({
  routes: [...unchained, ...pms, ...precheckin, ...checkin, ...others]
})
