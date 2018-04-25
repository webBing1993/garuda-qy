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
  }
}
