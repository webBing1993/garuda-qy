import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import router from '../../router-config.js'

module.exports = {
  goto: (ctx, param) => {
    typeof param === 'number'
      ? router.go(param)
      : router.push(param)
  },
  replaceto: (ctx, param) => {
    router.replace(param)
  },
  urlquery(ctx) {
    let o = {}
    decodeURIComponent(window.location.search).split('&').forEach(i => i ? o[i.split(/=/)[0].replace(/\?/, '')] = i.split(/=/)[1] : null)
    ctx.commit('URLQUERY', o)
  },
  resource: (ctx, param) => {
    ctx.commit('LOADING', 1)
    Vue.http({
      url: '/gemini' + param.url,
      body: param.body || null,
      headers: param.headers || {
        Session: sessionStorage.session
      },
      params: param.params || null,
      method: param.method || "GET",
      timeout: param.timeout || 10000,
      credentials: false,
      emulateHTTP: false,
      emulateJSON: false,
    }).then(
      response => {
        if (+response.body.errcode === 0) {
          param.method && !param.url.match(/precheckin/) && !param.url.match(/login/) ? ctx.dispatch('showtoast') : null
          param.onSuccess ? param.onSuccess(response.body) : null
        } else {
          ctx.dispatch('showtoast', 'errcode:' + response.body.errcode + ';\n errmsg:' + response.body.errmsg);
          param.onFail ? param.onFail(response.body) : null
        }
      }
    ).catch(
      error => {
        //ErrorCallback
        ctx.dispatch('showtoast', 'Request Error');
        console.error("request error occurred!")
      }
    ).finally(
      final => {
        //FinalCallback
        ctx.commit('LOADING')
      }
    )
  },
  settitle: (x, t) => {
    document.title = t;
    let i = document.createElement('iframe');
    i.src = "/static/settitle.html"
    i.style.display = 'none';
    i.onload = () => setTimeout(() => i.remove(), 9)
    document.body.appendChild(i);
  },
}
