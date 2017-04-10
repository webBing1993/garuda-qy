module.exports = {
  getrecord(ctx,param){
    ctx.dispatch('resource', {
      url: '/order/record',
      onSuccess: (body) => {
        param.onsuccess(body)
      }
    })
  }
}
