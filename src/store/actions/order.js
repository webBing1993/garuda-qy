// import * as _dataUtil from './dataUtil';

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
  //当日预登记订单列表
  precheckintoday(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/precheckin/today',
      method: "POST",
      onSuccess: (body) => {
        let bodydatas = [...body.data];
        bodydatas.forEach((item, index) => {
          // console.log(item.timeline.precheckin_done);
          item.timeline.precheckin_done = new Date(parseInt(item.timeline.precheckin_done));
          item.timeline.precheckin_done = {
            year: item.timeline.precheckin_done.getFullYear(),
            month: parseInt(item.timeline.precheckin_done.getMonth() + 1) > 10 ? item.timeline.precheckin_done.getMonth() + 1 : '' + item.timeline.precheckin_done.getMonth() + 1,
            day: parseInt(item.timeline.precheckin_done.getDate()) > 10 ? item.timeline.precheckin_done.getDate() : '0' + item.timeline.precheckin_done.getDate(),
            hour: item.timeline.precheckin_done.getHours(),
            minute: item.timeline.precheckin_done.getMinutes()
          };
        });
        // console.log(bodydatas);
        ctx.commit('PRECHECKINTODAY', bodydatas)
      },
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
        let datas = {...body.data};
        datas.owner_tel = datas.owner_tel.substring(3, 14);

        datas.in_time = new Date(parseInt(datas.in_time));
        datas.in_time = {
          day: parseInt(datas.in_time.getDate()) > 10 ? datas.in_time.getDate() : '0' + datas.in_time.getDate(),
          year: datas.in_time.getFullYear(),
          month: datas.in_time.getMonth() + 1,
          hour: datas.in_time.getHours(),
          minute: datas.in_time.getMinutes()
        };
        datas.out_time = new Date(parseInt(datas.out_time));
        datas.out_time = {
          day: parseInt(datas.out_time.getDate()) > 10 ? datas.out_time.getDate() : '0' + datas.out_time.getDate(),
          year: datas.out_time.getFullYear(),
          month: datas.out_time.getMonth() + 1,
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

