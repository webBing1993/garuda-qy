import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import router from '../../router-config.js'

module.exports = {
  goto: (ctx, param) => {
    typeof param == 'number'
      ? router.go(param)
      : router.push(param)
  },
  replaceto: (ctx, param) => {
    router.replace(param)
  },
  urlquery(ctx) {
    let o = {}
    window.location.search.split('&').forEach(i => o[i.split(/=/)[0].replace(/\?/, '')] = i.split(/=/)[1])
    ctx.commit('URLQUERY', o)
  },
  resource: (ctx, param) => {
    Vue.http({
      url: '/gemini' + param.url,
      body: param.body || null,
      headers: param.headers || {
        Session: sessionStorage.session
      },
      params: param.params || null,
      method: param.method || "GET",
      timeout: param.timeout || 5000,
      credentials: false,
      emulateHTTP: false,
      emulateJSON: false,
    }).then(
      response => {
        response.body.errcode >= 0 && response.body.errcode < 400
          ? param.onSuccess ? param.onSuccess(response.body) : null
          : param.onFail ? param.onFail(response.body) : null
      }
    ).catch(
      error => {
        //ErrorCallback
        console.error("request error occurred!")
      }
    ).finally(
      final => {
        //FinalCallback
        // console.log("request done!")
      }
    )
  }
}
