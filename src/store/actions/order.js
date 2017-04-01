module.exports = {
  //获取确认订单列表
  tobeconfirmed(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/precheckin/confirm',
      // params: {
      //   status: 0
      // },
      onSuccess: (body) => (console.log(body), ctx.commit('TOBECONFIRMED', body.data)),
      onFail: () => null
    })
  },
  //获取确认订单详情
  confirmeddetail(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/precheckin/confirm/'+param,
      onSuccess: (body) => (console.log(body,'confirmeddetail'), ctx.commit('CONFIRMEDDETAIL', body.data)),
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
  //当日预登记订单列表
  precheckintoday(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/precheckin/today',
      method: "POST",
      onSuccess: (body) => (console.log(body), ctx.commit('PRECHECKINTODAY', body.data)),
      onFail: () => null
    })
  },
  checkincancel(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/precheckin/today/checkincancel',
      // url: '/order/precheckin/today',
      onSuccess: (body) => (console.log(body), ctx.commit('CHECKINCANCEL', body.data)),
      onFail: () => null
    })
  },

  //当日预登记订单详情
  todayorderdetail(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/precheckin/today/order_id',
      onSuccess: (body) => {
        let data = body.data;
        let phone = data.owner_tel;
        phone.substr(3, 11);
        console.log(phone);
        ctx.commit('TODAYDETAIL', data)
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

