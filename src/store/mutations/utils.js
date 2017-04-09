module.exports = {
  URLQUERY(state, payload){
    state.url = {...state.url, ...payload}
  },
  SESSION(state, payload){
    state.app.session = payload
  },
  TOAST(state, payload){
    state.app.toast = {...state.app.toast, ...payload}
  }
}
