const Mock = require('mockjs')

Mock.mock(
  '/login',
  {
    code: 200,
    msg: "ok",
    data: {
      session: "asiodhoiawhdoihoi123128uasihci"
    }
  }
)

Mock.mock(
  '/order/tobeconfirmed',
  {
    code: 200,
    msg: "ok",
    data: [
      {
        orderId: 230420402402403,
        booker: "张三",
        phoneNum: "15829321022",
        roomType: "大床房",
        roomCount: 2,
        fee: 80000,
        prepay: 0,
        remark: ''
      }, {
        orderId: 230420402402404,
        booker: "张三",
        phoneNum: "15829321022",
        roomType: "大床房",
        roomCount: 2,
        fee: 80000,
        prepay: 50000,
        remark: '此订单已在携程支付500元'
      }, {
        orderId: 230420402402405,
        booker: "张三",
        phoneNum: "15829321022",
        roomType: "大床房",
        roomCount: 2,
        fee: 80000,
        prepay: 50000,
      }, {
        orderId: 230420402402406,
        booker: "张三",
        phoneNum: "15829321022",
        roomType: "大床房",
        roomCount: 2,
        fee: 80000,
        prepay: 50000,
      }, {
        orderId: 230420402402407,
        booker: "张三",
        phoneNum: "15829321022",
        roomType: "大床房",
        roomCount: 2,
        fee: 80000,
        prepay: 50000,
      }, {
        orderId: 230420402402408,
        booker: "张三",
        phoneNum: "15829321022",
        roomType: "大床房",
        roomCount: 2,
        fee: 80000,
        prepay: 50000,
      }
    ]
  }
)

Mock.mock(
  '/order/confirmed',
  {
    code: 200,
    msg: "ok",
    data: [
      {
        orderId: 230420402402409,
        booker: "张三",
        phoneNum: "15829321022",
        roomType: "大床房",
        roomCount: 2,
        fee: 80000,
        prepay: 0,
        status: '未付款'
      }
    ]
  }
)

/* 当日预登记订单列表 */
Mock.mock(
  '/preorderlist/0',
  {
    code: 200,
    msg: "ok",
    data: [{
      order_id: "130420402402404",
      order_status: {
        iscancelled: true,
      },
      precheckin_time: '03/31 08:20',
      owner: "张三",
      owner_tel: "+8618500059035",
      warning: '待退款',
      room_type: "大床房",
      room_count: 4
    }, {
      order_id: "240420402402404",
      order_status: {
        iscancelled: true,
      },
      precheckin_time: '03/31 08:20',
      owner: "张三",
      owner_tel: "+8618500059035",
      warning: '待退款',
      rooms: [{
        room_type: "大床房",
        room_count: 6
      }]
    }]
  }
);

Mock.mock(
  '/preorderlist/1',
  {
    code: 200,
    msg: "ok",
    data: [{
      order_id: "130420402402404",
      order_status: {
        iscancelled: true,
      },
      precheckin_time: '03/31 08:20',
      owner: "张三",
      owner_tel: "18500059035",
      room_type: "大床房",
      room_count: 2
    }]
  }
);

/* 当日预登记订单详情 */
Mock.mock(
  '/order/precheckin/today',
  {
    code: 200,
    msg: "ok",
    data: {
      order_id: "120420402402405",
      order_status: {
        iscancelled: true,
      },
      in_time: '2017/4/4',
      out_time: '2017/4/6',
      owner: "张三",
      owner_tel: "+8618500059035",
      remark: "",
      pay_status: 'NEED_PAY',
      precheckin_time: '',
      timestamp: '',
      warning: '入账失败',
      room_type: "大床房",
      room_count: 2,
      payinfo: {
        fees: [{
          room_type: '房型名称',
          amount: '房间数量',
          date_price: [{
            date: '03/31 08:20',
            price: '3000',
          }]
        }],
        deposit: '押金',
        total_fee: '总费用=总房费+押金',
        prepay: '已付金额款',
        need_pay: '应付金额=总费用-已付金额'
      },
      paymark: {
        pay_status: '0未付，1已付，2其他',
        prepay: 0,
      },
      suborders: [{
        suborder_id: "",
        room_type_id: "房型代码",
        room_type_name: "大床房",
        room_number: "203",
        guests: [{
          name: "刘斌",
          idcard: '400800999333222',
        }, {
          name: "刘斌",
          idcard: '400800999333222',
        }]
      }],
      invoice: {
        type: "PERSONAL/GENERAL/VAT",
        media: "PAPER/EINVOICE",
        category: "住宿费",
        title: "抬头",
        tax_registry_no: "统一社会信用代码",
        address: "地址",
        phone_number: "",
        bank_name: "",
        bank_account: ""
      },
      logs: [{
        date: '03/31 08:20',
        action: '操作“确认退款”转退款流程',
        operator: '刘斌'
      }, {
        date: '03/31 09:20',
        action: '房间302变更为301',
        operator: '刘斌'
      }, {
        date: '03/31 10:20',
        action: '检测到订单需退款¥400',
        operator: '系统'
      }]
    }
  }
)

Mock.mock(
  '/order/precheckin/history',
  {
    code: 200,
    msg: "ok",
    data: [{
      order_id: "532654768744",
      in_time: "532654768744",
      out_time: "532654768744",
      owner: "张三",//预订人
      owner_tel: "+8618500059035",//预订人手机
      remark: "",//备注
      rooms: [{
        room_type: "大床房",
        room_count: 2
      }],
      payinfo: {
        total_roomfee: 0, //总房费
        pms_pay: 0, //PMS中的已付金额,
        staff_pay: 0,//营业员确认的付款金额,
        user_pay: 0, //小程序已付金额
      },
      status: {
        is_staff_confirm: false, //是否营业已确认
        need_refund: false, //是否需要退款
        pmsaccount_result: false,// PMS入账是否成功
        is_cancelled:false, //是否已取消,
      },
      timeline:{ //状态变化时间
       precheckin_done: null, //预登记完成时间, null未发生
      }
    },{
      order_id: "532654768744",
      in_time: "532654768744",
      out_time: "532654768744",
      owner: "张三",//预订人
      owner_tel: "+8618500059035",//预订人手机
      remark: "",//备注
      rooms: [{
        room_type: "大床房",
        room_count: 2
      }],
      payinfo: {
        total_roomfee: 0, //总房费
        pms_pay: 0, //PMS中的已付金额,
        staff_pay: 0,//营业员确认的付款金额,
        user_pay: 0, //小程序已付金额
      },
      status: {
        is_staff_confirm: false, //是否营业已确认
        need_refund: false, //是否需要退款
        pmsaccount_result: false,// PMS入账是否成功
        is_cancelled:false, //是否已取消,
      },
      timeline:{ //状态变化时间
        precheckin_done: null, //预登记完成时间, null未发生
      }
    },{
      order_id: "532654768744",
      in_time: "532654768744",
      out_time: "532654768744",
      owner: "张三",//预订人
      owner_tel: "+8618500059035",//预订人手机
      remark: "",//备注
      rooms: [{
        room_type: "大床房",
        room_count: 2
      }],
      payinfo: {
        total_roomfee: 0, //总房费
        pms_pay: 0, //PMS中的已付金额,
        staff_pay: 0,//营业员确认的付款金额,
        user_pay: 0, //小程序已付金额
      },
      status: {
        is_staff_confirm: false, //是否营业已确认
        need_refund: true, //是否需要退款
        pmsaccount_result: false,// PMS入账是否成功
        is_cancelled:false, //是否已取消,
      },
      timeline:{ //状态变化时间
        precheckin_done: null, //预登记完成时间, null未发生
      }
    }]
  }
);
