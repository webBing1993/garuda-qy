module.exports = {
  showtoast(ctx, param){
    ctx.commit('TOAST', {show: true})
  }
}
