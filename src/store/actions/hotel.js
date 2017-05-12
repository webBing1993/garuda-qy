module.exports = {
  hotelInfo(ctx, param){
    ctx.dispatch('resource', {
      url: '/hotel/c336ea2b2b5911e780ad5cb9018d9b5c',
      onSuccess: body => {
        ctx.commit('HOTEL',{...body.data});
      },
    })
  },
  hotelRefresh(ctx, param){
    ctx.dispatch('resource', {
      url: '/hotel/'+ctx.state.hotel.hotel_id +'/refresh',
      method: "PUT",
      onSuccess: body => {
        ctx.commit('HOTEL',{...body.data});
      },
    })
  }
}
