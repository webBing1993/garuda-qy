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
        "X-Current-Page":"1",
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
  }
}
