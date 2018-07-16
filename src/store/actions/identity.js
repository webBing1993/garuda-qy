module.exports = {
  // getIdentities(ctx, param){
  //   ctx.dispatch('resource', {
  //     url: '/identities',
  //     params: {
  //       status: param.status,
  //       scope: param.scope,
  //       start_time: param.start_time,
  //       end_time: param.end_time
  //     },
  //     onSuccess: body => {
  //       param.onsuccess ? param.onsuccess(body) : null
  //     },
  //   })
  // },
  getIdentities(ctx, param){
    ctx.dispatch('resource', {
      url: '/identities/guests',
      method: 'POST',
      body: {
        status: param.status,
        scope: param.scope,
        start_time: param.start_time,
        end_time: param.end_time
      },
      onSuccess: (body,headers) => {
        param.onsuccess ? param.onsuccess(body,headers) : null
      },
    })
  },
  // getIdentity(ctx, param){
  //   ctx.dispatch('resource', {
  //     url: '/identities/' + param.identity_id,
  //     onSuccess: body => {
  //       param.onsuccess ? param.onsuccess(body) : null
  //     }
  //   })
  // },
  getIdentity(ctx, param){
    ctx.dispatch('resource', {
      url: '/identities/guest/' + param.identityGuestId,
      method: 'GET',
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
  // 离店
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
  },
  // 退房退房退房
  setLeaveStatus(ctx, param){
    ctx.dispatch('resource', {
      url: '/checkout/lvye/'+param.suborder_Id,
      method: 'PUT',
      body: {
        suborder_Id: param.suborder_id,
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  newIdentityList(ctx, param) {
    ctx.dispatch('resource', {
      url: '/lvye/searchLvyeReportInfos?limit='+ param.limit+'&offset='+param.offset,
      method: 'POST',
      body: param.data,
      onSuccess: (body,headers) => {
        param.onsuccess ? param.onsuccess(body,headers) : null
      }
    })
  },
  newIdentityDetail(ctx, param) {
    ctx.dispatch('resource', {
      url: '/lvye/lvyeReportInfo/' + param.identity_id,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
    getWhiteList(ctx, param){
        ctx.dispatch('resource', {
            url: '/identity/whitelist/search?limit='+param.limit+'&offset='+param.offset,
            method: 'POST',
            body:param.data,
            onSuccess: (body,headers) => {
                param.onsuccess ? param.onsuccess(body,headers) : null
            }
        })
    },
    delWhiteItem(ctx, param){
        ctx.dispatch('resource', {
            url: '/identity/whitelist',
            method: 'DELETE',
            body:param.data,
            onSuccess: body => {
                param.onsuccess ? param.onsuccess(body) : null
            }
        })
    },
    getSuspicious(ctx, param){
        ctx.dispatch('resource', {
            url: '/identity/illegalGuest/list?limit='+param.limit+'&offset='+param.offset,
            method: 'POST',
            body:param.data,
            onSuccess: (body,headers) => {
                param.onsuccess ? param.onsuccess(body,headers) : null
            }
        })
    },
    getSuspiciousDetail(ctx, param){
        ctx.dispatch('resource', {
            url: '/identity/illegalGuest/'+param.illegalGuestId,
            method: 'GET',
            onSuccess: body => {
                param.onsuccess ? param.onsuccess(body) : null
            }
        })
    },
    hasChecked(ctx, param){
        ctx.dispatch('resource', {
            url: '/identity/illegalGuest/read/'+param.illegalGuestId,
            method: 'PUT',
            onSuccess: body => {
                param.onsuccess ? param.onsuccess(body) : null
            }
        })
    },
  reportLvYe(ctx, param) {
    ctx.dispatch('resource', {
      url: '/lvye/lvyeReport',
      method: 'PUT',
      body: {
        lvyeReportRecordIds: param.lvyeReportRecordIds,//旅业上报记录Id
        roomNumber: param.roomNumber,//房间号
        nights: param.nights,//入住晚数
        inTime: param.inTime,//入住时间
        outTime: param.outTime,//离店时间
        guestType:param.guestType
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', '提交成功');
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: body => {
        param.onfail ? param.onfail(body) : null
      }
    })
  },
  getRoomNumberList(ctx, param) {
    ctx.dispatch('resource', {
      url: '/room/numberList',
      method: 'GET',
      onSuccess: body => {
          if(body.data&&body.data.length!==0){
              ctx.commit('ROOMNUMBERLIST', body.data)
          }
      }
    })
  },
    getShowPoliceConfigs(ctx, param){
        ctx.dispatch('resource', {
            url: '/getHotelConfig/enable_show_plice_processed',
            method: 'GET',
            onSuccess: body=>{
                param.onsuccess ? param.onsuccess(body) : null
            }
        })
    },
  wxPayConfirm(ctx, param) {
    ctx.dispatch('resource', {
      url: '/order/pay',
      method: 'POST',
      body: {
        identity_id: param.identity_id,//设备ID
        room_fee: param.room_fee,//房费
        deposit: param.deposit//押金
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  rcPrint(ctx, param){
    console.log('过来了')
    console.log('body:'+param.aaa);
    ctx.dispatch('resource',{
      url:'/order/rcprint',
      method:'POST',
      body:param.body,
      onSuccess:body=> {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  rejectStatus(ctx, param){
    ctx.dispatch('resource',{
      url:'/lvye/checkStatus/'+param.identity_id+'/'+param.status,
      method:'PUT',
      body:param.body,
      onSuccess:body=> {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 无证核验获取民族列表
  getNationality(ctx, param){
    ctx.dispatch('resource', {
      url: '/nation',
      method: 'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 无证核验获取设备名称
  // hotelEquipment(ctx, param){
  //   ctx.dispatch('resource', {
  //     url: '/hotel/device/bottom',
  //     method: 'GET',
  //     onSuccess: body => {
  //       param.onsuccess ? param.onsuccess(body) : null
  //     }
  //   })
  // },
  hotelEquipment(ctx, param){
    ctx.dispatch('resource', {
      url: '/hotel/device',
      method: 'POST',
      body: {
        deviceTypes:["31","21","23"]
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
    // 新增无证核验入住人 /identities/undocumented/guest
  withoutIdCard(ctx, param) {
    ctx.dispatch('resource', {
      url: '/identities/undocumented/guest',
      method: 'POST',
      body: {
         guest_name: param.guest_name,
        id_card: param.id_card,
        nation_id: param.nation_id,
        address: param.address,
        device_id: param.device_id
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail:body=>{
          param.onfail? param.onfail(body) : null
      }
    })
  },

};
