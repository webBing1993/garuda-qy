const Mock = require('mockjs')
const prefix = "/gemini"

Mock.mock(
  prefix + '/login',
  {
    code: 200,
    msg: "ok",
    data: {
      session: "asiodhoiawhdoihoi123128uasihci"
    }
  }
)
//获取确认订单列表 status ='0未确认，1待确认'
Mock.mock(
  prefix + '/order/precheckin/confirm',
  {
    code: 200,
    msg: "ok",
    data: [{
      order_id: "230420402402404",//订单号
      order_pmsid: "230420402402404",//订单号
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
        deposit:0, //应付押金
      },
      status: {
        is_cancelled:false,// 是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false,// pms入账是否成功
      },
      timeline: { //状态变化时间
        staff_confirm: null, //营业员确认订单的时间
        precheckin_done: null, //预登记全部完成时间
      }
    },{
      order_id: "230420402402404",//订单号
      order_pmsid: "230420402402404",//订单号
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
        deposit:0, //应付押金
      },
      status: {
        is_cancelled:false,// 是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false,// pms入账是否成功
      },
      timeline: { //状态变化时间
        staff_confirm: null, //营业员确认订单的时间
        precheckin_done: null, //预登记全部完成时间
      }
    },{
      order_id: "230420402402404",//订单号
      order_pmsid: "230420402402404",//订单号
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
        deposit:0, //应付押金
      },
      status: {
        is_cancelled:false,// 是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false,// pms入账是否成功
      },
      timeline: { //状态变化时间
        staff_confirm: null, //营业员确认订单的时间
        precheckin_done: null, //预登记全部完成时间
      }
    }]
  }
);
//获取确认订单详情
Mock.mock(
  prefix + '/order/precheckin/confirm/230420402402404',
  {
    code: 200,
    msg: "ok",
    data: {
      order_id: "230420402402404",//订单号
      order_pmsid: "230420402402404",//订单号
      in_time: '2017/4/4',
      out_time: '2017/4/5',
      owner: "张三",//预订人
      owner_tel: "+8618500059035",//预订人手机
      remark: "",//备注
      rooms_plan: [{
        room_type: "大床房",
        room_count: 2
      }],
      payinfo: {
        total_roomfee: 2000, //总房费
        pms_pay:0, //PMS中记录的已付金额,
        staff_pay: null, //营业员确认的付款金额,
        user_pay:0, //小程序的已付金额
        deposit:0, //应付押金
      },
      status: {
        is_cancelled:false,// 是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false,// pms入账是否成功
      },
      timeline: { //状态变化时间
        staff_confirm: null, //营业员确认订单的时间
        precheckin_done: null, //预登记全部完成时间
      }
    }
  }
);

Mock.mock(
  prefix + '/order/confirmed',
  {
    code: 200,
    msg: "ok",
    data: [{
      order_id: "230420402402404",//订单号
      order_pmsid: "230420402402404",//订单号
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
        staff_pay: 4000,//营业员确认的付款金额,
        user_pay: 1000, //小程序已付金额
        deposit:0, //应付押金
      },
      status: {
        is_cancelled:false,// 是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false,// pms入账是否成功
      },
      timeline: { //状态变化时间
        staff_confirm: null, //营业员确认订单的时间
        precheckin_done: null, //预登记全部完成时间
      }
    },{
      order_id: "230420402402404",//订单号
      order_pmsid: "230420402402404",//订单号
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
        staff_pay: 10,//营业员确认的付款金额,
        user_pay: 1000, //小程序已付金额
        deposit:0, //应付押金
      },
      status: {
        is_cancelled:false,// 是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false,// pms入账是否成功
      },
      timeline: { //状态变化时间
        staff_confirm: null, //营业员确认订单的时间
        precheckin_done: null, //预登记全部完成时间
      }
    },{
      order_id: "230420402402404",//订单号
      order_pmsid: "230420402402404",//订单号
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
        staff_pay: 0,//营业员确认的付款金额,
        user_pay: 1000, //小程序已付金额
        deposit:0, //应付押金
      },
      status: {
        is_cancelled:false,// 是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false,// pms入账是否成功
      },
      timeline: { //状态变化时间
        staff_confirm: null, //营业员确认订单的时间
        precheckin_done: null, //预登记全部完成时间
      }
    }]
  }
)

/* 当日预登记订单列表 */
Mock.mock(
  prefix + '/order/precheckin/today',
  {
    code: 200,
    msg: "ok",
    data: [{
      warning: '需退款',  //测试添加
      order_id: "130420402402404",  //订单号
      in_time: '',
      out_time: '',
      owner: "马化腾", //预订人
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
        precheckin_done: '1491014211',  // 预登记完成时间, null未发生
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
        precheckin_done: '1491014211',  // 预登记完成时间, null未发生
      }
    }]
  }
);

Mock.mock(
  prefix + '/order/precheckin/today/checkincancel',
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
  prefix + '/order/precheckin/today/order_id',
  {
    code: 200,
    msg: "ok",
    data: {
      warning: '入账失败',  //测试添加
      order_id: "120420402402405", //订单号
      in_time: '1440000',
      out_time: '1491014211',
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
