module.exports = {
  //退款申请列表
  getrefundlist(ctx, param){
    ctx.dispatch('resource', {
      url: '/refund_apply_list',
      method: 'POST',
      body: {
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
      url: '/orders/applyRefund',
      method: 'POST',
      body: {
        orderId: param.orderId,
        refundFee: param.refundFee,
        type: param.type,
      },
      onSuccess: body => {
        ctx.dispatch('showtoast');
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
};
