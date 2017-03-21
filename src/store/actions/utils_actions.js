import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

module.exports = {
  resource: (ctx, param) => {
    Vue.http({
      url: param.url,
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
        response.body.code >= 200 && response.body.code < 400
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
  }
}
