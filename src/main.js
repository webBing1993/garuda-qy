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

// Forms
import XInput from './components/Forms/x-input.vue'
Vue.component('XInput', XInput)
import XTextarea from './components/Forms/x-textarea.vue'
Vue.component('XTextarea', XTextarea)
import XSwitch from './components/Forms/x-switch.vue'
Vue.component('XSwitch', XSwitch)
import XRadio from './components/Forms/x-radio.vue'
Vue.component('XRadio', XRadio)
import XCheckbox from './components/Forms/x-checkbox.vue'
Vue.component('XCheckbox', XCheckbox)

// Layers
import Actionsheet from './components/Layers/actionsheet.vue'
Vue.component('Actionsheet', Actionsheet)
import Dialog from './components/Layers/dialog.vue'
Vue.component('Dialog', Dialog)
import Toast from './components/Layers/toast.vue'
Vue.component('Toast', Toast)

// List
import Group from './components/List/group.vue'
Vue.component('Group', Group)
import Cell from './components/List/cell.vue'
Vue.component('Cell', Cell)
import Link from './components/List/link.vue'
Vue.component('Link', Link)

// Layouts
import Grids from './components/Layouts/grids/girds.vue'
import Grid from './components/Layouts/grids/grid.vue'
Vue.component('Grids', Grids)
Vue.component('Grid', Grid)

// Display
import XButton from './components/Displays/button.vue'
Vue.component('XButton', XButton)


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
