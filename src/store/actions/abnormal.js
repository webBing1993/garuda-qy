// ===============================================================
// 异常提醒详情列表
// ===============================================================

module.exports = {
  //获取异常提醒详情列表
  getAbnormallist(ctx, param) {
    ctx.dispatch('resource', {
      url: '/exceptionsList',
      params:{
        is_history:param.is_history
      },
      headers:{
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
      onSuccess:()=>{
        param.onsuccess ? param.onsuccess() : null
      }
    })
  }
}
