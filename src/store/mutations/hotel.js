module.exports = {
  HOTEL(state,payload){
    state.hotel = {...state.hotel,...payload}
  }
}
