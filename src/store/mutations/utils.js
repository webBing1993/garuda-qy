module.exports = {
  URLQUERY(state, payload){
    state.AppParams = {...state.AppParams, ...payload}
  },
  SESSION(state, payload){
    state.AppParams.session = payload
  }
}
