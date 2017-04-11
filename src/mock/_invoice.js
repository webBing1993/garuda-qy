const Mock = require('mockjs')
import data from './data'

// ===============================================================
// 发票  获取待开发票列表
// ===============================================================

Mock.mock(
  data.prefix + '/invoice_apply',
  {
    errcode: "0",
    errmsg: "ok",
    data: [{
      invoice_apply_id: '1234',
      order_id: '11344412345',
      is_any_checkin: '已入住', //true已入住 false未入住
      rooms_number: 203,
      owner: '张翠山',
      phone_number: '+8613112334544',
      in_time: '1491384458000',
      out_time: '1491384458000',
      type: "VAT",
      category: "住宿费",
      media: "PAPER",
      title: "上海二建",
      invoice_status: '已开票', //1有效未开票 2已开票
    }, {
      invoice_apply_id: '1234',
      order_id: '22334412345',
      is_any_checkin: '已入住', //true已入住 false未入住
      rooms_number: 205,
      owner: '张无忌',
      phone_number: '+8613112334544',
      in_time: '1491384458000',
      out_time: '1491384458000',
      type: "VAT",
      category: "住宿费",
      media: "PAPER",
      title: "上海三建",
      invoice_status: '已开票', //1有效未开票 2已开票
    }]
  }
)

// ===============================================================
// 发票  获取待开发票详情
// ===============================================================

Mock.mock(
  data.prefix + '/invoice_apply/invoice_apply_id',
  {
    errcode: "0",
    errmsg: "ok",
    data: {
      order_id: "230420402402401",//订单号
      order_pmsid: "230420402402401",//订单号
      in_time: '1491384458000',
      out_time: '1491384458000',
      owner: "张三",//预订人
      owner_tel: "+8618500059035",//预订人手机
      room_fees: [{
        room_type_name: '大床房', //房型名称
        roomNo: 203, //房间号
        roomInfo: [{
          name: '张三',
          idcard: '3004009988800',
        }, {
          name: '李四',
          idcard: '20030040099888',
        }]
      }],
      invoice: {
        type: "PERSONAL",
        media: "PAPER",
        category: "住宿费",
        title: "上海复创",
        tax_registry_no: "统一社会信用代码",
        address: "地址",
        phone_number: null,
        bank_name: null,
        bank_account: null
      },
    }
  }
)

// ===============================================================
// 发票  确认已开发票
// ===============================================================

Mock.mock(
  data.prefix + '/invoice_apply/{invoice_apply_id}/invoice_status',
  {
    errcode: "0",
    errmsg: "ok",
    data: 404
  }
)
