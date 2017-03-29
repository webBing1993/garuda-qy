module.exports = {
  TOBECONFIRMED(state, payload){
    state.orderlist.tobeconfirmed = [...payload]
  },
  CONFIRMED(state, payload){
    state.orderlist.confirmed = [...payload]
  },
  PREORDER0(state, payload){
    state.preorderlist0 = [...payload]
  },
  PREORDER1(state, payload){
    state.preorderlist1 = [...payload]
  },
  PREDETAIL(state, payload){
    state.predetaildata = {...payload}
  },
  HISTORY(state, payload){
    state.historyList = {...payload}
  }
}
