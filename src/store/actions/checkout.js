module.exports = {
  //退房申请列表
  getcheckoutlist(ctx, param){
    ctx.dispatch('resource', {
      url: '/checkout',
      method:'POST',
      body: {
        status: param.status,
        start_time: param.start_time,
        end_time: param.end_time,
        guest_name:param.guest_name,//入住人名称
        room_no:param.room_no,//房间号
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //PMS退房
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
  searchRoom(ctx, param){
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
        subOrderId:param.subOrderId,//退款金额(分)
      },
      onSuccess: (body) => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
};
