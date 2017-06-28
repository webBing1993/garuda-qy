module.exports = {
  //退款申请列表
  getrefundlist(ctx, param){
    ctx.dispatch('resource', {
      url: '/refund_apply_list',
      method: 'POST',
      body: {
        // status: param.status,
        start_time: param.start_time,
        end_time: param.end_time
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //退款申请
  refundapply(ctx, param){
    ctx.dispatch('resource', {
      url: '/orders/' + param.order_id + '/refund',
      method: 'POST',
      onSuccess: body => {
        ctx.dispatch('showtoast');
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
};
