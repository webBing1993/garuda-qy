module.exports = {
  //退房申请列表
  getcheckoutlist(ctx, param){
    ctx.dispatch('resource', {
      url: '/checkout',
      params: {
        status: param.status,
        start_time: param.start_time,
        end_time: param.end_time
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
        ctx.dispatch('showtoast');
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
};
