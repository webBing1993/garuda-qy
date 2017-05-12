module.exports = {
  login(ctx, param){
    if (sessionStorage.session && sessionStorage.hotel_id) {
      ctx.commit('SESSION', sessionStorage.session)
      ctx.commit('HOTEL', {'hotel_id': sessionStorage.hotel_id});
      console.log('SESSION STORAGE: ' + sessionStorage.session)
      console.log('HOTEL ID: ' + sessionStorage.hotel_id)
    } else {
      ctx.dispatch('resource', {
        url: "/login",
        method: "POST",
        body: {
          code: ctx.state.AppParams.code,
          corpid: ctx.state.AppParams.state
        },
        onSuccess: (body) => {
          console.log(body);
          // ctx.commit('SESSION', body.data)
          // sessionStorage.session = body.data
          // console.log('NEW SESSION: ' + body.data)

          ctx.commit('SESSION', body.data.session_id);
          ctx.commit('HOTEL', {'hotel_id': body.data.hotel_id});

          // ctx.dispatch('gethotelinfo', body.data.hotel_id);

          sessionStorage.session = body.data.session_id
          sessionStorage.hotel_id = body.data.hotel_id
          console.log('NEW SESSION: ' + body.data.session_id)
          console.log('NEW HOTELID: ' + body.data.hotel_id)
        }
      })
    }
  }
}
