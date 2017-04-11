// ===============================================================
// PMS订单-预付确认
// ===============================================================
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

// ===============================================================
// 预登记订单
// ===============================================================


  //当日预登记订单列表
  getTodayList(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/precheckin/today',
      method: 'POST',
      body: {
        is_cancelled: param.is_cancelled, //是否取消
        is_sequence: param.is_sequence,// 依据precheckin_done false:默认倒序 true:正序
      },
      onSuccess: (body) => {
        param.onsuccess(body)
      },
      onFail: () => null
    })
  },
  //历史预登记订单列表
  gethistorylist(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/precheckin/history',
      method: 'POST',
      body: {
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

  // 营业员确认PMS同步结果
  conformPmsSync(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/conform_pms_sync',
      method: 'POST',
      body: {
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

