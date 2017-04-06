import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import router from '../../router-config.js'

module.exports = {
  goto: (ctx, param) => {
    typeof param == 'number' ? router.go(param) : router.push(param)
  },
  resource: (ctx, param) => {
    Vue.http({
      url: '/gemini' + param.url,
      body: param.body || null,
      headers: param.headers || null,
      params: param.params || null,
      method: param.method || "GET",
      timeout: param.timeout || 5000,
      credentials: false,
      emulateHTTP: false,
      emulateJSON: false,
    }).then(
      response => {
        response.body.errcode >= 0 && response.body.errcode < 400
          //SuccessCallback
          ? param.onSuccess ? param.onSuccess(response.body) : null
          //FailCallback
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
  },
  token(ctx, param){
    ctx.dispatch('resource', {
      url: "/login",
      onSuccess: (body) => ctx.commit('TOKEN', body.data.session),
      onFail: () => null
    })
  },
  showtoast(ctx, param){
    ctx.commit('TOAST', {show: true})
  }
}
