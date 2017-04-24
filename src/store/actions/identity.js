module.exports = {
  getIdentities(ctx, param){
    ctx.dispatch('resource', {
      url: '/identities',
      params: {
        status: param.status,
        scope: param.scope,
        start_time: param.start_time,
        end_time: param.end_time
      },
      onSuccess: body => {
        param.onsuccess(body)
      },
    })
  },
  getIdentity(ctx, param){
    ctx.dispatch('resource', {
      url: '/identities/' + param.identity_id,
      onSuccess: body => {
        param.onsuccess(body)
      }
    })
  },
  setIdentityStatus(ctx, param){
    ctx.dispatch('resource', {
      url: '/identities/' + param.identity_id + '/status',
      method:'PUT',
      body: {
        suborder_id: param.suborder_id,
        status: param.status
      },
      onSuccess: body => {
        param.onsuccess(body)
      }
    })
  },
  setUploadStatus(ctx, param){
    ctx.dispatch('resource', {
      url: '/identities/' + param.identity_id + '/police',
      method:'POST',
      body: {
        identity_id: param.identity_id
      },
      onSuccess: body => {
        param.onsuccess(body)
      }
    })
  }
}
