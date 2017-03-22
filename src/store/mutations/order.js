module.exports = {
  TOBECONFIRMED(state, payload){
    state.orderlist.tobeconfirmed = [...payload]
  },
  CONFIRMED(state, payload){
    state.orderlist.confirmed = [...payload]
  }
}
