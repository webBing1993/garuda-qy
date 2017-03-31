const Mock = require('mockjs')
const prefix = "/gemini"

Mock.mock(
  prefix +'/login',
  {
    code: 200,
    msg: "ok",
    data: {
      session: "asiodhoiawhdoihoi123128uasihci"
    }
  }
)

Mock.mock(
  prefix +'/order/tobeconfirmed',
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
  prefix +'/order/precheckin/today',
  {
    code: 200,
    msg: "ok",
    data: [{
      warning: '入账失败',  //测试添加
      order_id: "130420402402404",  //订单号
      in_time: '',
      out_time: '',
      owner: "马云", //预订人
      owner_tel: "+8618500059035", //预订人手机
      remark: "", //备注
      rooms: [{
        room_type: "总统套房",
        room_count: 2
      }],
      payinfo: {
        total_roomfee: 0,   //总房费
        pms_pay: 0,   // PMS中的已付金额,
        staff_pay: null,  // null 0 营业员确认的付款金额,
        user_pay: 0,   //小程序已付金额
      },
      status: {
        is_staff_confirm: false,  //是否营业已确认
        need_refund: false,   //是否需要退款(Orders.pms_syn_state==3, 返回true)
        pmsaccount_result: false,   //PMS入账是否成功(Orders.pms_syn_state==2, 返回true)
        is_cancelled: false,  //是否已取消, (Orders.status==2，返回true，其它返回false)
      },
      timeline: {   //状态变化时间
        precheckin_done: '03/21 08:20',  // 预登记完成时间, null未发生
      }
    }, {
      warning: '入账失败',  //测试添加
      order_id: "130420402402404",  //订单号
      in_time: '',
      out_time: '',
      owner: "马云", //预订人
      owner_tel: "+8618500059035", //预订人手机
      remark: "", //备注
      rooms: [{
        room_type: "情侣房",
        room_count: 4
      }],
      payinfo: {
        total_roomfee: 0,   //总房费
        pms_pay: 0,   // PMS中的已付金额,
        staff_pay: null,  // null 0 营业员确认的付款金额,
        user_pay: 0,   //小程序已付金额
      },
      status: {
        is_staff_confirm: false,  //是否营业已确认
        need_refund: false,   //是否需要退款(Orders.pms_syn_state==3, 返回true)
        pmsaccount_result: false,   //PMS入账是否成功(Orders.pms_syn_state==2, 返回true)
        is_cancelled: false,  //是否已取消, (Orders.status==2，返回true，其它返回false)
      },
      timeline: {   //状态变化时间
        precheckin_done: '03/25 10:20',  // 预登记完成时间, null未发生
      }
    }]
  }
);

Mock.mock(
  prefix +'/order/precheckin/today/checkincancel',
  {
    code: 200,
    msg: "ok",
    data: [{
      order_id: "130420402402404",  //订单号
      in_time: '',
      out_time: '',
      owner: "马云", //预订人
      owner_tel: "+8618500059035", //预订人手机
      remark: "", //备注
      rooms: [{
        room_type: "总统套房",
        room_count: 2
      }],
      payinfo: {
        total_roomfee: 0,   //总房费
        pms_pay: 0,   // PMS中的已付金额,
        staff_pay: null,  // null 0 营业员确认的付款金额,
        user_pay: 0,   //小程序已付金额
      },
      status: {
        is_staff_confirm: false,  //是否营业已确认
        need_refund: false,   //是否需要退款(Orders.pms_syn_state==3, 返回true)
        pmsaccount_result: false,   //PMS入账是否成功(Orders.pms_syn_state==2, 返回true)
        is_cancelled: false,  //是否已取消, (Orders.status==2，返回true，其它返回false)
      },
      timeline: {   //状态变化时间
        precheckin_done: '03/21 08:20',  // 预登记完成时间, null未发生
      }
    }]
  }
);

/* 当日预登记订单详情 */
Mock.mock(
  prefix +'/order/precheckin/today/order_id',
  {
    code: 200,
    msg: "ok",
    data: {
      warning: '入账失败',  //测试添加
      order_id: "120420402402405", //订单号
      in_time: '2017/4/4',
      out_time: '2017/4/6',
      owner: "古龙详情",  //预订人
      owner_tel: "+8618500059035", //预订人手机
      remark: "", //备注
      rooms: [{
        room_type: "大床房",
        room_count: 2
      }],
      payinfo: {
        total_roomfee: 400,  //总房费
        pms_pay: 200,  //PMS中的已付金额,
        staff_pay: null, //null 0,营业员确认的付款金额,
        user_pay: 0,  //小程序已付金额
      },
      status: {
        is_staff_confirm: false, // 是否营业已确认
        need_refund: false, // 是否需要退款
        pmsaccount_result: false, // PMS入账是否成功
        is_cancelled: false, // 是否已取消
      },
      timeline: { //状态变化时间
        precheckin_done: '', //timestamp, 预登记完成时间, null未发生
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
          name: "流川枫",
          idcard: '400800999333222',
        }]
      }, {
        suborder_id: "",
        room_type_id: "房型代码",
        room_type_name: "总统套房",
        room_number: "204",
        guests: [{
          name: "三通",
          idcard: '400800999333222',
        }, {
          name: "三条",
          idcard: '400800999333222',
        }]
      }],
      invoice: {
        type: "公司·增值税专用发票",
        media: "电子发票",
        category: "住宿费",
        title: "上海复创",
        tax_registry_no: "统一社会信用代码",
        address: "凤凰大厦9999",
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
  prefix + '/order/precheckin/history',
  {
    code: 200,
    msg: "ok",
    data: [{
      order_id: "120420402402405",
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
        is_cancelled: false, //是否已取消,
      },
      timeline: { //状态变化时间
        precheckin_done: null, //预登记完成时间, null未发生
      }
    }, {
      order_id: "120420402402405",
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
        is_cancelled: false, //是否已取消,
      },
      timeline: { //状态变化时间
        precheckin_done: null, //预登记完成时间, null未发生
      }
    }]
  }
);
