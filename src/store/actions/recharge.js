module.exports = {
  //充值记录列表接口
  getRechargelist(ctx, param){
    ctx.dispatch('resource', {
      url:'/rechargelist/'+param.hotel_id,
      method: 'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
// 续充展示
  getRechargeInfo(ctx, param){
    ctx.dispatch('resource', {
      url:'/recharge/'+param.hotel_id,
      method: 'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  pmscheckout(ctx, param){
    ctx.dispatch('resource', {
      url: '/checkout/' + param.id + '/pms',
      method: 'PUT',
      onSuccess: body => {
        ctx.dispatch('showtoast');
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getLiveINlist(ctx, param){
    ctx.dispatch('resource', {
      url:'/suborder/search?limit=5&offset='+param.offset,
      method:'POST',
      body: param.data,
      onSuccess: (body,headers) => {
        param.onsuccess ? param.onsuccess(body,headers) : null
      }
    })
  },
  //已离店
  getOutlist(ctx, param){
    ctx.dispatch('resource', {
      url:'/suborder/search?limit=5&offset='+param.offset,
      method:'POST',
      body: param.data,
      onSuccess: (body,headers) => {
        param.onsuccess ? param.onsuccess(body,headers) : null
      }
    })
  },
  //搜索房型
  getR(ctx, param){
    ctx.dispatch('resource', {
      url:'/room/room_type_list',
      method: 'GET',
      onSuccess: body => {
        // ctx.dispatch('showtoast');
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //退款申请
  applicationRefund(ctx, param){
    ctx.dispatch('resource', {
      url:'/refundAply',
      method:'POST',
      body: {
        orderId:param.orderId,//订单ID
        refundFee:param.refundFee,//退款金额(分)
        subOrderId:param.subOrderId,//入住单ID
      },
      onSuccess: (body) => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
};
