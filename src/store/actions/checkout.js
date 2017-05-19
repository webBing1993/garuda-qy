module.exports = {
  getcheckoutlist(ctx, param){
    ctx.dispatch('resource', {
      url: '/checkout',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
};
