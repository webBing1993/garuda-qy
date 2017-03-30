// Mockdata
import './mock';

import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

// normalize.css
import 'normalize.css';
import './assets/varible.less';

// utils
import FastClick from 'fastclick';
FastClick.attach(document.body);
import moment from 'moment';
moment.locale('zh-cn');


// router & store
import router from './router';
import store from './store';
import {sync} from 'vuex-router-sync';
sync(store, router);

// components
const Vux = require('vux');
Vue.component('Group', Vux.Group);
Vue.component('Tab', Vux.Tab);
Vue.component('TabItem', Vux.TabItem);
Vue.component('Flexbox', Vux.Flexbox);
Vue.component('FlexboxItem', Vux.FlexboxItem);
Vue.component('Checker', Vux.Checker);
Vue.component('CheckerItem', Vux.CheckerItem);
Vue.component('Scroller', Vux.Scroller);
Vue.component('Icon', Vux.Icon);
Vue.component('Confirm', Vux.Confirm);

Vue.component('calendar', require('./components/calendar'));
Vue.component('popup', require('./components/popup'));

// layout
Vue.component('Group', require('./components/group/group.vue'));
Vue.component('Cell', require('./components/group/cell.vue'));
Vue.component('Link', require('./components/group/link.vue'));
// form
Vue.component('XSwitch', require('./components/form/switch.vue'));
Vue.component('XInput', require('./components/form/input.vue'));
Vue.component('XTextarea', require('./components/form/textarea.vue'));
Vue.component('XRadio', require('./components/form/radiolist.vue'));
Vue.component('XCheckbox', require('./components/form/checklist.vue'));
// popover
Vue.component('Toast', require('./components/toast.vue'));
Vue.component('Actionsheet', require('./components/actionsheet.vue'));
Vue.component('Dialog', require('./components/dialog.vue'));
// functional
Vue.component('XButton', require('./components/button.vue'));

//modules
Vue.component('orderitem', require('./modules/orderitem'));
Vue.component('preorderitem', require('./modules/preorderitem'));

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  template: '<App/>',
  components: {App}
});
