module.exports = {
  URLQUERY(state, payload){
    state.urlparams = {...state.urlparams, ...payload}
  },
  SESSION(state, payload){
    state.app.session = payload
  },
  TOAST(state, payload){
    state.app.toast = {...state.app.toast, ...payload}
  }
}
