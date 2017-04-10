// import * as _dataUtil from './dataUtil';

module.exports = {
  //获取确认订单列表
  getconfirmelist(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/precheckin/confirm',
      params: {
        status: param.status
      },
      onSuccess: (body) => {
        param.onsuccess(body)
      },
      onFail: () => null
    })
  },
  //获取确认订单详情
  getorderdetail(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/detail/' + param.order_id,
      params: {
        roomfee: param.roomfee,
        suborder: param.suborder,
        invoice: param.invoice,
        log: param.log
      },
      onSuccess: (body) => {
        param.onsuccess(body)
      }
    })
  },
  //当日预登记订单列表
  getTodayList(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/precheckin/today',
      method: 'POST',
      params: {
        is_cancelled: param.is_cancelled, //是否取消
        is_sequence: param.is_sequence,// 依据precheckin_done false:默认倒序 true:正序
      },
      onSuccess: (body) => {
        param.onsuccess(body)
      },
      onFail: () => null
    })
  },
  // checkincancel(ctx, param){
  //   ctx.dispatch('resource', {
  //     url: '/order/precheckin/today/checkincancel',
  //     onSuccess: (body) => (console.log(body), ctx.commit('CHECKINCANCEL', body.data)),
  //     onFail: () => null
  //   })
  // },

  // //当日预登记订单详情
  // todayorderdetail(ctx, param){
  //   ctx.dispatch('resource', {
  //     url: '/order/precheckin/today/order_id',
  //     onSuccess: (body) => {
  //       let datas = {...body.data};
  //       datas.owner_tel = datas.owner_tel.substring(3, 14);
  //
  //       datas.in_time = new Date(parseInt(datas.in_time));
  //       datas.in_time = {
  //         year: datas.in_time.getFullYear(),
  //         month: parseInt(datas.in_time.getMonth() + 1) > 10 ? datas.in_time.getMonth() + 1 : '' + datas.in_time.getMonth() + 1,
  //         day: parseInt(datas.in_time.getDate()) > 10 ? datas.in_time.getDate() : '0' + datas.in_time.getDate(),
  //         hour: datas.in_time.getHours(),
  //         minute: datas.in_time.getMinutes()
  //       };
  //       datas.out_time = new Date(parseInt(datas.out_time));
  //       datas.out_time = {
  //         year: datas.out_time.getFullYear(),
  //         month: parseInt(datas.out_time.getMonth() + 1) > 10 ? datas.out_time.getMonth() + 1 : '' + datas.out_time.getMonth() + 1,
  //         day: parseInt(datas.out_time.getDate()) > 10 ? datas.out_time.getDate() : '0' + datas.out_time.getDate(),
  //         hour: datas.out_time.getHours(),
  //         minute: datas.out_time.getMinutes()
  //       };
  //       // console.log(datas);
  //       ctx.commit('TODAYDETAIL', datas)
  //     },
  //     onFail: () => null
  //   })
  // },
  gethistorylist(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/precheckin/history',
      method: 'POST',
      param: {
        is_cancelled: param.is_cancelled, //是否取消
        is_sequence: param.is_sequence,// 依据precheckin_done false:默认倒序 true:正序
        start: param.start, //筛选开始 无则null
        end: param.end, //筛选结束 无则null
      },
      onSuccess: (body) => {
        param.onsuccess(body)
      }
    })
  },
  //批量确认预订单
  multiconfirm(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/multiconfirm',
      method: "POST",
      body: {
        order_ids: param.order_ids
      },
      onSuccess: body => {
        ctx.dispatch('showtoast')
        param.onsuccess(body)
      }
    })
  },
  //单个确认预订单
  singleconfirm(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/singleconfirm',
      method: 'POST',
      body: {
        order_id: param.order_id,
        staff_pay: param.staff_pay
      },
      onSuccess: body => {
        ctx.dispatch('showtoast')
        param.onsuccess(body)
      }
    })
  },
  // 营业员确认PMS同步结果
  conformPmsSync(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/conform_pms_sync',
      param: {
        order_id: param.order_id,
        action: param.action
      },
      onSuccess: body => {
        ctx.dispatch('showtoast');
        param.onsuccess(body);
      }
    })
  }
};

