const Mock = require('mockjs');
import data from './data';

//退款申请列表
Mock.mock(
  // data.prefix + '/refund_apply_list',
   /\/refund_apply_list/,
  {
    errcode: "0",
    errmsg: "ok",
    data: data.refundList
  }
);

//PMS退房
Mock.mock(
  /\/orders\/applyRefund/,
  {
    errcode: "0",
    msg: "ok",
  }
);
