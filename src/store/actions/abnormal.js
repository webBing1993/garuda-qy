// ===============================================================
// 异常提醒详情列表
// ===============================================================

module.exports = {
  //获取异常提醒详情列表
  getAbnormalList(ctx, param) {
    ctx.dispatch('resource', {
      url: '/exceptionsList',
      body:{
        is_history:param.is_history
      },
      method:"POST",
      headers:{
        Session: sessionStorage.session_id,
        "X-Current-Page":param.currentPage.toString(),
        "X-Page-Size":"10"
      },
      onSuccess: (body) => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 异常列表按钮'我知道了'处理
  exceptionsHandel(ctx,param){
    ctx.dispatch('resource',{
      url:'/exceptions/'+param.exception_id,
      method:"PATCH",
      onSuccess:()=>{
        param.onsuccess ? param.onsuccess() : null
      }
    })
  },
  //脏房列列表
  getDirtyRoomList(ctx, param) {
    ctx.dispatch('resource', {
      url: '/room/dirtyRoomRemind',
      body:{
        hotel_id:param.hotel_id,
        is_deal_with:param.is_deal_with
      },
      method:"POST",
      onSuccess: (body) => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 修改脏房处理状态
  handleDirtyRoom(ctx,param){
    ctx.dispatch('resource',{
      url:'/room/setDirtyRoomStatus',
      body:{
        hotel_id:param.hotel_id,
        sub_id:param.sub_id,
        is_deal_with:param.is_deal_with
      },
      method:"post",
      onSuccess:(body)=>{
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
}
