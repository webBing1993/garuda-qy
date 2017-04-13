module.exports = {
  login(ctx, param){
    if (sessionStorage.session) {
      ctx.commit('SESSION', sessionStorage.session)
      console.log('SESSION STORAGE: ' + sessionStorage.session)
    } else {
      ctx.dispatch('resource', {
        url: "/login",
        method: "POST",
        body: {
          code: ctx.state.AppParams.code,
          corpid: ctx.state.AppParams.state
        },
        onSuccess: (body) => {
          ctx.commit('SESSION', body.data)
          sessionStorage.session = body.data
          console.log('NEW SESSION: ' + body.data)
        },
        onFail: body => {
          alert('errcode:' + body.errcode + ', errmsg:' + body.errmsg)
        }
      })
    }
  }
}
