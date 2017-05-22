const Mock = require('mockjs');
import data from './data';

//退款申请列表
Mock.mock(
  // data.prefix + '/refund_apply_list',
   /\/refund_apply_list\?status.+/,
  {
    errcode: "0",
    errmsg: "ok",
    data: data.refundList
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
