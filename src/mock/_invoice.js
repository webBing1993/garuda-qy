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
      remark: "",//备注
      rooms_plan: [{
        room_type: "大床房",
        room_count: 2
      }],
      payinfo: {
        total_roomfee: 4000, //总房费
        pms_pay: 1000, //PMS中的已付金额,
        staff_pay: null,//营业员确认的付款金额,
        user_pay: 1000, //小程序已付金额
        deposit: 0, //应付押金
      },
      status: {
        is_cancelled: false,// 是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false,// pms入账是否成功
      },
      timeline: { //状态变化时间
        staff_confirm: '1491384458000', //营业员确认订单的时间
        precheckin_done: '1491384458000', //预登记全部完成时间
      },
      invoice: {
        type: "公司·增值税专用发票",
        media: "电子发票",
        category: "住宿费",
        title: "上海复创",
        tax_registry_no: "统一社会信用代码",
        address: "地址",
        phone_number: null,
        bank_name: null,
        bank_account: null
      },
      logs: [{
        date: '1491384458000',
        action: '操作“确认退款”转退款流程',
        operator: '张三'
      }, {
        date: '1491384458000',
        action: '操作“确认退款”转退款流程',
        operator: 'ted'
      }],
      room_fees: [{
        room_type_name: '大床房', //房型名称
        amount: 2, //房间数
        date_price: [{
          date: 1488432346, //日期
          price: 30000, //房费
        }]
      }],
      suborders: [{
        suborder_id: "2304204024024011",
        status: {
          is_cancelled: false, //是否已取消
          is_checkin: false, //是否入住
          is_checkout: false, //是否离店
        },
        room_number: "203",
        room_tags: ["靠南", "带窗"],
        room_type_id: "房型代码",
        room_type_name: "大床房",
        room_price: [{
          date: '1491384458000',
          price: '2222',
        }],
        guests: [{
          name: "张三",
          idcard: "343245623456728199"
        }, {
          name: "李四",
          idcard: "343245623456728199"
        }],
        checkin_time: '1491384458000', //办理入住时间
        checkout_time: '1491384458000', //离店时间
      }, {
        suborder_id: "2304204024024012",
        status: {
          is_cancelled: false, //是否已取消
          is_checkin: false, //是否入住
          is_checkout: false, //是否离店
        },
        room_number: "204",
        room_tags: ["靠南", "带窗"],
        room_type_id: "房型代码",
        room_type_name: "大床房",
        room_price: [{
          date: '1491384458000',
          price: '2222',
        }],
        guests: [{
          name: "张无忌",
          idcard: "360123333333333456"
        }],
        checkin_time: '1491384458000', //办理入住时间
        checkout_time: '1491384458000', //离店时间
      }]

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
