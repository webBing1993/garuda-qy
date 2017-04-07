// Mockdata
import './server-mock';

import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

// normalize.css
import 'normalize.css';
import './assets/varible.less';

// utils
import FastClick from 'fastclick';
FastClick.attach(document.body);

// router & store
import store from './store';
import router from './router-config';
import {sync} from 'vuex-router-sync';
sync(store, router);

import filters  from './filters'
Object.entries(filters).forEach(item => Vue.filter(item[0], item[1]))

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
import popup from './components/Layers/popup/index.vue'
Vue.component('popup', popup)

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
import Tab from './components/Layouts/tab/tab.vue'
import TabItem from './components/Layouts/tab/tabItem.vue'
Vue.component('Tab', Tab)
Vue.component('TabItem', TabItem)
import Scroller from './components/Layouts/scroller.vue'
Vue.component('Scroller', Scroller)

// Display
import XButton from './components/Displays/button.vue'
Vue.component('XButton', XButton)

// Functional
import calendar from './components/Functional/calendar'
Vue.component('calendar', calendar)
import Checker from './components/Functional/checker/checker.vue'
import CheckerItem from './components/Functional/checker/checker-item.vue'
Vue.component('Checker', Checker);
Vue.component('CheckerItem', CheckerItem);

//modules
Vue.component('orderitem', require('./modules/orderitem'));

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  template: '<App/>',
  components: {App}
});
