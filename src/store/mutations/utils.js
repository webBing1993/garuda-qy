module.exports = {
  URLQUERY(state, payload){
    state.AppParams = {...state.AppParams, ...payload}
  },
  SESSION(state, payload){
    state.AppParams.session = payload
  },
  TOAST(state, payload){
    state.Interface.toast = {...state.Interface.toast, ...payload}
  }
}
