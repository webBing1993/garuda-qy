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
        param.onsuccess ? param.onsuccess(body) : null
      },
    })
  },
  getIdentity(ctx, param){
    ctx.dispatch('resource', {
      url: '/identities/' + param.identity_id,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  setIdentityStatus(ctx, param){
    ctx.dispatch('resource', {
      url: '/identities/' + param.identity_id + '/status',
      method: 'PUT',
      body: {
        suborder_id: param.suborder_id,
        status: param.status
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  setUploadStatus(ctx, param){
    ctx.dispatch('resource', {
      url: '/identities/lvye_report',
      method: 'POST',
      body: {
        identity_id: param.identity_id,
        room_number: param.room_number, //房间号码
        days: param.days, //入住几晚
        in_time: param.in_time, //入住几晚
        out_time: param.out_time, //入住几晚
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
