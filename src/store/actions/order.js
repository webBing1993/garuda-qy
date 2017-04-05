// import * as _dataUtil from './dataUtil';

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
      url: '/order/precheckin/confirm/' + param,
      onSuccess: (body) => (console.log(body, 'confirmeddetail'), ctx.commit('CONFIRMEDDETAIL', body.data)),
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
      onSuccess: (body) => (console.log(body), ctx.commit('CHECKINCANCEL', body.data)),
      onFail: () => null
    })
  },

  //当日预登记订单详情
  todayorderdetail(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/precheckin/today/order_id',
      onSuccess: (body) => {
        let datas = {...body.data};
        datas.owner_tel = datas.owner_tel.substring(3, 14);

        datas.in_time = new Date(parseInt(datas.in_time));
        datas.in_time = {
          year: datas.in_time.getFullYear(),
          month: parseInt(datas.in_time.getMonth() + 1) > 10 ? datas.in_time.getMonth() + 1 : '' + datas.in_time.getMonth() + 1,
          day: parseInt(datas.in_time.getDate()) > 10 ? datas.in_time.getDate() : '0' + datas.in_time.getDate(),
          hour: datas.in_time.getHours(),
          minute: datas.in_time.getMinutes()
        };
        datas.out_time = new Date(parseInt(datas.out_time));
        datas.out_time = {
          year: datas.out_time.getFullYear(),
          month: parseInt(datas.out_time.getMonth() + 1) > 10 ? datas.out_time.getMonth() + 1 : '' + datas.out_time.getMonth() + 1,
          day: parseInt(datas.out_time.getDate()) > 10 ? datas.out_time.getDate() : '0' + datas.out_time.getDate(),
          hour: datas.out_time.getHours(),
          minute: datas.out_time.getMinutes()
        };
        // console.log(datas);
        ctx.commit('TODAYDETAIL', datas)
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

