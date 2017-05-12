module.exports = {
  login(ctx, param){
    if (sessionStorage.session) {
      ctx.commit('SESSION', sessionStorage.session)
      console.log('SESSION STORAGE: ' + sessionStorage.session)
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
          ctx.commit('HOTEL', {'hotel_id':body.data.hotel_id});
          ctx.dispatch('hotelInfo', body);

          sessionStorage.session = body.data.session_id
          console.log('NEW SESSION: ' + body.data.session_id)
        }
      })
    }
  }
}
