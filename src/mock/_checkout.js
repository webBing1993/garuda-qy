const Mock = require('mockjs');
import data from './data';

//退房申请列表
Mock.mock(
  // data.prefix + '/checkout',
  /\/checkout\?status.+/,
  {
    errcode: "0",
    errmsg: "ok",
    data: [
      {
        order_id: "230420402402401",    //主订单ID
        suborder_id: "230420402402401",  //子订单ID
        room_type_name: "大床房",  //房型名称
        room_number: "201", //房号
        union_tag: "204sssddeer",  //联房
        guests: [{
          name: "李思静",  //姓名
          idcard: "360123183892128910"  //身份证号码
        }, {
          name: "Ted",  //姓名
          idcard: "360123183892123456"  //身份证号码
        }],
        created_time: "1495419805000"  //申请时间
      }, {
        order_id: "230420402402402",    //主订单ID
        suborder_id: "230420402402402",  //子订单ID
        room_type_name: "大床房",  //房型名称
        room_number: "202", //房号
        union_tag: "204sssddeer",  //联房
        guests: [{
          name: "李思静",  //姓名
          idcard: "360123183892128910"  //身份证号码
        }, {
          name: "Ted",  //姓名
          idcard: "360123183892123456"  //身份证号码
        }],
        created_time: "1495419805000"  //申请时间
      }
    ]
  }
);

//PMS退房
Mock.mock(
  /\/checkout\/\d+\/pms/,// data.prefix + '/checkout/{id}/pms'
  {
    errcode: "0",
    msg: "ok",
  }
);
