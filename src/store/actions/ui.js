module.exports = {
  showtoast(ctx, text){
    ctx.commit('TOAST',
      {
        show: true,
        text: text ? text : '操作成功'
      }
    )
  },
  showloading(ctx, text){
    ctx.commit('LOADING', 1)
  },
  stoploading(ctx, text){
    ctx.commit('LOADING')
  },
}
