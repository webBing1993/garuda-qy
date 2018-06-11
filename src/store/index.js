import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const debug = process.env.NODE_ENV!=='production'

export default new Vuex.Store(
    {
        state: require('./state'),
        getters: require('./getters'),
        actions: require('./actions'),
        mutations:require('./mutations')
    },
    {
       strict:debug
    })
