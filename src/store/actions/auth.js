module.exports = {
  login(ctx, param){
    if (sessionStorage.token) {
      ctx.commit('SESSION', sessionStorage.token)
    } else {
      ctx.dispatch('resource', {
        url: "/login",
        method: "POST",
        body: {
          code: ctx.state.url.code
        },
        onSuccess: (body) => {
          ctx.commit('SESSION', body.data)
          sessionStorage.token = body.data
        }
      })
    }
  }
}
