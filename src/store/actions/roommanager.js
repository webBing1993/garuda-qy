module.exports = {
  getroomtypelist(ctx, param){
    ctx.dispatch('resource', {
      url: '/room/room_type_list',
      onSuccess: body => {
        param.onsuccess(body)
      },
    })
  },
  getfloorlist(ctx, param){
    ctx.dispatch('resource', {
      url: '/room/floor_list',
      onSuccess: body => {
        param.onsuccess(body)
      },
      onFail: () => null
    })
  },
  getroomlist(ctx, param){
    ctx.dispatch('resource', {
      url: '/room/list',
      onSuccess: body => {
        param.onsuccess(body)
      }
    })
  },
  setroomstatus(ctx, param){
    ctx.dispatch('resource', {
      url: '/room/status',
      param: {
        room_ids: param.room_ids,
        room_status: param.room_status
      },
      onSuccess: body => {
        ctx.dispatch('showtoast')
        param.onsuccess(body)
      }
    })
  },
  setroomenabledpick(ctx, param){
    ctx.dispatch('resource', {
      url: '/room/enabled_pick',
      method: 'POST',
      body: {
        room_ids: param.room_ids,
        enabled: param.enabled
      },
      onSuccess: body => {
        ctx.dispatch('showtoast')
        param.onsuccess(body)
      }
    })
  },
  setroominout(ctx, param){
    ctx.dispatch('resource', {
      url: '/room/inout',
      param: {
        room_id: param.room_id,
        action: param.action
      },
      onSuccess: body => {
        ctx.dispatch('showtoast')
        param.onsuccess(body)
      }
    })
  },
  cancelsuborder(ctx, param){
    ctx.dispatch('resource', {
      url: '/room/cancel_suborder',
      method: 'POST',
      param: {
        room_id: param.room_id,
      },
      onSuccess: body => {
        param.onsuccess(body)
      }
    })
  },

}
