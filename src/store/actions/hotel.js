module.exports = {
  gethotelinfo(ctx, hotel_id){
    ctx.dispatch('resource', {
      url: '/hotel/' + hotel_id,
      onSuccess: body => ctx.commit('HOTEL', body.data)
    })
  },
  hotelrefresh(ctx, param){
    ctx.dispatch('resource', {
      url: '/hotel/' + ctx.state.hotel.hotel_id + '/refresh',
      method: "PUT",
      onSuccess: body => {
        ctx.commit('HOTEL', {...body.data})
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
