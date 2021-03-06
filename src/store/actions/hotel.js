module.exports = {
  gethotelinfo(ctx, hotel_id){
    ctx.dispatch('resource', {
      url: '/hotel/' + hotel_id,
      onSuccess: body => ctx.commit('HOTEL', body.data)
    })
  },
    getHotelConfigVersion(ctx,param) {
        ctx.dispatch('resource',{
            url:'/getHotelConfig/product_version',
            onSuccess: body => {
                 param.onsuccess ? param.onsuccess(body) : null
            }
        })
    },
    getHotelConfig(ctx,param){
        ctx.dispatch('resource',{
            url:'/getHotelConfig/wqt_main_control',
            onSuccess: body => {
                param.onsuccess ? param.onsuccess(body) : null
            }
        })

    },
    getServiceConfigs(ctx,param){
      ctx.dispatch('resource',{
          url:'/productConfig/getproductConfig/'+param.hotelId,
          onSuccess: body => {
               param.onsuccess ? param.onsuccess(body) : null
          }
      })
    },
    get_is_free_deposit_config(ctx,param){
        ctx.dispatch('resource',{
            url:'/hotel/config/cash_pledge_config',
            onSuccess: body => {
                ctx.commit('ISFREEDEPOSIT', body.data)
               // param.onsuccess ? param.onsuccess(body) : null
            }
        })
    },
  hotelrefresh(ctx, param){
    ctx.dispatch('resource', {
      url: '/hotel/' + ctx.state.hotel.hotel_id + '/refresh',
      method: "PUT",
      timeout: 180000,
      onSuccess: body => {
        ctx.commit('HOTEL', {...body.data})
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  hoteltodolist(ctx, param){
    ctx.dispatch('resource', {
      url: '/todolist',
      onSuccess: function (body) {
        return param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getAppConfig(ctx, param){
    ctx.dispatch('resource', {
      url: '/hotel/config',
      method: "GET",
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  getAbsentList(ctx, param){
    ctx.dispatch('resource', {
      url: '/remindNoShow/list',
      method: "POST",
      body: {},
      onSuccess: (body) => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: () => null
    })
  },
  setRemindStatus(ctx, param){
    ctx.dispatch('resource', {
      url: '/remindNoShow/confirm/' +param.remindId,
      method: "PUT",
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })

  }


};
