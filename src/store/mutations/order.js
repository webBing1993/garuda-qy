module.exports = {
  TOBECONFIRMED(state, payload){
    state.orderlist.tobeconfirmed = [...payload]
  },
  CONFIRMED(state, payload){
    state.orderlist.confirmed = [...payload]
  },
  //当日预登记订单列表
  PRECHECKINTODAY(state, payload){
    state.todayorderlist.checkintoday = [...payload]
  },
  CHECKINCANCEL(state, payload){
    state.todayorderlist.checkincancel = [...payload]
  },
  //当日预登记订单详情
  TODAYDETAIL(state, payload){
    state.todaydetail = {...payload}
  },
  //历史预登记订单列表
  HISTORY(state, payload){
    state.historyList = {...payload}
  }
}
