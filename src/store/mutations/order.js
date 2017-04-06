module.exports = {
  CONFIRMEDDETAIL(state, payload){
    state.orderlist.confirmeddetail = payload
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
  }
}
