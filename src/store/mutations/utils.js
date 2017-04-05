module.exports = {
  TOKEN(state, payload){
    state.app.token = payload
  },
  TOAST(state, payload){
    state.app.toast = {...state.app.toast, ...payload}
  }
}
