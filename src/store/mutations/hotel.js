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
  },
  SERVICECONFIG(state,payload){
      let arr={'ZHIFANGTONG':false,'FAPIAOTONG':false,'ZHIDINGTONG':false,'KEKONGTONG':false,'RENZHENGTONG':false,'ZHIFUTONG':false,'EKATONG':false};
      if(payload.length!==0){
          payload.forEach(item=>{
              if(item.fun_model_code=='zhi_fang_tong'){
                  arr.ZHIFANGTONG=item.status
              }else if(item.fun_model_code=='fa_piao_tong'){
                  arr.FAPIAOTONG=item.status
              }else if(item.fun_model_code=='ren_zheng_tong'){
                  arr.RENZHENGTONG=item.status
              }else if(item.fun_model_code=='zhi_fu_tong'){
                  arr.ZHIFUTONG=item.status
              }else if(item.fun_model_code=='zhi_ding_tong'){
                  arr.ZHIDINGTONG=item.status
              }else if(item.fun_model_code=='e_ka_tong'){
                  arr.EKATONG=item.status
              }else if(item.fun_model_code=='ke_kong_tong'){
                  arr.KEKONGTONG=item.status
              }
              // switch (item.fun_model_code){
              //     case 'zhi_fang_tong':
              //         arr.ZHIFANGTONG==item.status;
              //         break;
              //     case 'fa_piao_tong':
              //         arr.FAPIAOTONG==item.status;
              //         break;
              //     case 'ren_zheng_tong':
              //         arr.RENZHENGTONG==item.status;
              //         break;
              //     case 'zhi_ding_tong':
              //         arr.ZHIDINGTONG==item.status;
              //         break;
              //     case 'e_ka_tong':
              //         arr.EKATONG==item.status;
              //         break;
              //     case 'ke_kong_tong':
              //         arr.KEKONGTONG==item.status;
              //         break;
              //     case 'zhi_fu_tong':
              //         arr.ZHIFUTONG==item.status;
              //         break;
              // }
          })
      };
      console.log('arr:',arr)
      state.serviceConfig={...arr}
  }
}
