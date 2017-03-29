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
  preorder0(ctx, param){
    ctx.dispatch('resource', {
      url: '/preorderlist/0',
      // url: '/order/precheckin/today',
      onSuccess: (body) => (console.log(body), ctx.commit('PREORDER0', body.data)),
      onFail: () => null
    })
  },
  preorder1(ctx, param){
    ctx.dispatch('resource', {
      url: '/preorderlist/1',
      // url: '/order/precheckin/today',
      onSuccess: (body) => (console.log(body), ctx.commit('PREORDER1', body.data)),
      onFail: () => null
    })
  },
  predetail(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/precheckin/today',
      onSuccess: (body) => {
        let data = body.data;
        let phone = data.owner_tel;
        phone.substr(3, 11);
        console.log(phone);
        ctx.commit('PREDETAIL', data)
      },
      onFail: () => null
    })
  },
  history(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/precheckin/history',
      onSuccess: (body) => (console.log(body), ctx.commit('HISTORY', body.data)),
      onFail: () => null
    })
  }

}

