import Vue from 'vue'
import VueResource from 'vue-resource'
// import configUrl from '../../../../garuda-qy/config/index'

Vue.use(VueResource)

import router from '../../router.js'

module.exports = {
  goto: (ctx, param) => {
      if(typeof param === 'number'){
          router.go(param)
      }else {
          router.push(param)
      }
      // console.log('router:',router)
  },
  replaceto: (ctx, param) => {
    router.replace(param)
      // console.log('router:',router)
  },
  // gotoNew:(ctx, param)=> {
  //     if(typeof param === 'number'){
  //         router.go(param)
  //     }else {
  //         router.push(param).
  //     }
  // },
  urlquery(ctx) {
    let o = {}
    // console.log("哈哈哈：",window.location.search); ?app=wqt&session=gs_lacaw2mcb4apjef06lxmzq==&hotel_id=0864f6731acb11e780ad5cb9018d9b5c
    console.log("hehhe：",decodeURIComponent(window.location.search));
    window.location.search.split('&').forEach(i => i ? o[i.split(/=/)[0].replace(/\?/, '')] = decodeURIComponent(i.split(/=/)[1]) : null)

    ctx.commit('URLQUERY', o);
  },

  //服务器请求
  resource: (ctx, param) => {
    let isRefresh = /hotel\/.+\/refresh/.test(param.url);
    isRefresh ? ctx.dispatch('showprogress', {show: true, isOk: false}) : ctx.commit('LOADING', 1);
    Vue.http({
      url: './gemini'+param.url,//wqtenv/wqtversion
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
          let isShowToast = param.url.match(/identities/) ||
            param.url.match(/precheckin/) ||
            param.url.match(/login/) ||
            param.url.match(/refund_apply_list/) ||
            param.url.match(/searchLvyeReportInfo/) ||
            param.url.match(/lvyeReport/) ||
            param.url.match(/order\/pay/) ||
            param.url.match(/hotel\/.+\/refresh/) ||
            param.url.match(/suborder\/search/) ||
            param.url.match(/exceptions/)||
            param.url.match(/hotel\/config/)||
            param.url.match(/hotel\/config/)||
            param.url.match(/identity\/illegalGuest/)
            param.url.match(/online/)
          param.method && !isShowToast ? ctx.dispatch('showtoast','') : null;
          param.onSuccess ? param.onSuccess(response.body, response.headers) : null
        } else {
          ctx.dispatch('showtoast', response.body.errmsg);
          param.onFail ? param.onFail(response.body) : null
        }
      }
    ).catch(
      error => {
        //ErrorCallback
        console.log(error);
        let hint = '';
        if (error.status === 401) {
          hint = '登录失效!'
        } else if (error.status === 1) {
          hint = '请求超时!';
        } else {
          // hint = 'Request Error'
          hint = '请求失败'
        }
        ctx.dispatch('showtoast', hint);
      }
    ).finally(
      final => {
        //FinalCallback
        // console.log('finish',isRefresh)
        isRefresh ? ctx.dispatch('showprogress', {show: false, isOk: true}) : ctx.commit('LOADING');
      }
    )
  },
  settitle: (x, t) => {
    document.title = t;
    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
      var i = document.createElement('iframe');
      // i.src = '/favicon.ico';
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
