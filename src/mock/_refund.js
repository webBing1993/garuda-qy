const Mock = require('mockjs');
import data from './data';

//退款申请列表
Mock.mock(
  // data.prefix + '/refund_apply_list',
   /\/refund_apply_list\?status.+/,
  {
    errcode: "0",
    errmsg: "ok",
    data: [
      {
        order_id: "230420402402401",    //主订单ID
        room_numbers: ["201"], //房号
        pay_fee: 500000,
        refund: 20000,
        created_time: "1495252046000",  //申请时间
        status: 'FAILED'
      },
      {
        order_id: "230420402402402",    //主订单ID
        room_numbers: ["202"], //房号
        pay_fee: 500000,
        refund: 20000,
        created_time: "1495358557000",  //申请时间
        status: 'FAILED'
      },
      {
        order_id: "230420402402403",    //主订单ID
        room_numbers: ["203"], //房号
        pay_fee: 500000,
        refund: 20000,
        created_time: "1495350550000",  //申请时间
        status: 'FAILED'
      },
      {
        order_id: "230420402402404",    //主订单ID
        room_numbers: ["204","205"], //房号
        pay_fee: 500000,
        refund: 20000,
        created_time: "1495419805000",  //申请时间
        status: 'REFUNDED'
      },
    ]
  }
);

//PMS退房
Mock.mock(
  /\/orders\/.+\/refund/,// data.prefix + '/orders/{order_id}/refund'
  {
    errcode: "0",
    msg: "ok",
  }
);
