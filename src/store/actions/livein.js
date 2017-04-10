/**
 * Created by lisj on 2017/4/9.
 */
module.exports = {
  getTodaySuborder(ctx, param){
    ctx.dispatch('resource', {
      url: '/suborder/today',
      onSuccess: body => {
        param.onsuccess(body)
      },
    })
  },
  getAllSuborder(ctx, param){
    ctx.dispatch('resource', {
      url: '/suborder/list',
      onSuccess: body => {
        param.onsuccess(body)
      },
    })
  }
}
