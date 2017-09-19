import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import router from '../../router.js'

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
        Session: sessionStorage.session_id
      },
      params: param.params || null,
      method: param.method || "GET",
      timeout: param.timeout || 60000,
      credentials: false,
      emulateHTTP: false,
      emulateJSON: false,
    }).then(
      response => {
        if (response.body.errcode && +response.body.errcode === 0) {
          param.method && !param.url.match(/precheckin/) && !param.url.match(/login/)&& !param.url.match(/refund_apply_list/) && !param.url.match(/searchLvyeReportInfo/)&& !param.url.match(/lvyeReport/)&& !param.url.match(/order\/pay/) ? ctx.dispatch('showtoast') : null
          param.onSuccess ? param.onSuccess(response.body) : null
        } else {
          ctx.dispatch('showtoast', response.body.errmsg);
          param.onFail ? param.onFail(response.body) : null
        }
      }
    ).catch(
      error => {
        //ErrorCallback
        ctx.dispatch('showtoast', error.status === 401 ? '登录失效!' : 'Request Error');
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
    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
      var i = document.createElement('iframe');
      i.src = '/favicon.ico';
      i.style.display = 'none';
      i.onload = function () {
        setTimeout(function () {
          i.remove();
        })
      }
      document.body.appendChild(i);
    }
  },
}
