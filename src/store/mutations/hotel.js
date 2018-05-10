module.exports = {
  HOTEL(state,payload){
    state.hotel = {...state.hotel,...payload}
  },
  ROOMNUMBERLIST(state,payload){
    state.roomNumberList = [...payload]
  },
  SEARCHHOTELID(state,payload) {
      state.searchHotelId = payload
      console.log('searchHotelId:',payload)
  },
  SEARCHORDERLIST(state,payload) {
      state.orderList = payload
      console.log('orderList:',payload)
  },
  CHECKORDERITEM(state,payload) {
     state.checkedOrder=[...payload];
     console.log('checkedOrder',payload)
  },
  CURRENTLVYERECORDID(state,payload){
    state.currentLvyeRecordId=payload;
  }
}
