module.exports = {
  getIdentities(ctx, param){
    ctx.dispatch('resource', {
      url: '/identities',
      params: {
        status: param.status,
        scope: param.scope
      },
      onSuccess: body => {
        param.onsuccess(body)
      },
    })
  }
}