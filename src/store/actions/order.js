module.exports = {
  tobeconfirmed(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/tobeconfirmed',
      onSuccess: (body) => (console.log(body), ctx.commit('TOBECONFIRMED', body.data)),
      onFail: () => null
    })
  },
  confirmed(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/confirmed',
      onSuccess: (body) => (console.log(body), ctx.commit('CONFIRMED', body.data)),
      onFail: () => null
    })
  },
}

