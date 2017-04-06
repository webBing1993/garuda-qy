module.exports = {
  getIdentities(ctx, param){
    ctx.dispatch('resource', {
      url: '/identities',
      onSuccess: body => {
        param.onsuccess(body)
      },
    })
  }
}
