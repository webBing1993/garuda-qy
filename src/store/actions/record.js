module.exports = {
  getsourcelist(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/source',
      onSuccess: (body) => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getrecord(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/record',
      onSuccess: (body) => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
