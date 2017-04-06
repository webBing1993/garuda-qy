const Mock = require('mockjs')
const prefix = "/gemini"

const confirmlist = [
  {
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
      staff_confirm: null, //营业员确认订单的时间
      precheckin_done: null, //预登记全部完成时间
    }
  }, {
    order_id: "230420402402402",//订单号
    order_pmsid: "230420402402402",//订单号
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
      staff_confirm: null, //营业员确认订单的时间
      precheckin_done: null, //预登记全部完成时间
    }
  }, {
    order_id: "230420402402403",//订单号
    order_pmsid: "230420402402403",//订单号
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
      staff_confirm: null, //营业员确认订单的时间
      precheckin_done: null, //预登记全部完成时间
    }
  }, {
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
      deposit: 0, //应付押金
    },
    status: {
      is_cancelled: false,// 是否已取消
      is_refund_required: false, //是否需要退款
      is_recording_success: false,// pms入账是否成功
    },
    timeline: { //状态变化时间
      staff_confirm: null, //营业员确认订单的时间
      precheckin_done: null, //预登记全部完成时间
    }
  }, {
    order_id: "230420402402405",//订单号
    order_pmsid: "230420402402405",//订单号
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
      deposit: 0, //应付押金
    },
    status: {
      is_cancelled: false,// 是否已取消
      is_refund_required: false, //是否需要退款
      is_recording_success: false,// pms入账是否成功
    },
    timeline: { //状态变化时间
      staff_confirm: null, //营业员确认订单的时间
      precheckin_done: null, //预登记全部完成时间
    }
  }, {
    order_id: "230420402402406",//订单号
    order_pmsid: "230420402402406",//订单号
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
      deposit: 0, //应付押金
    },
    status: {
      is_cancelled: false,// 是否已取消
      is_refund_required: false, //是否需要退款
      is_recording_success: false,// pms入账是否成功
    },
    timeline: { //状态变化时间
      staff_confirm: null, //营业员确认订单的时间
      precheckin_done: null, //预登记全部完成时间
    }
  }]
const orderlist=[
  {
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
      staff_confirm: null, //营业员确认订单的时间
      precheckin_done: null, //预登记全部完成时间
    }
  }, {
    order_id: "230420402402402",//订单号
    order_pmsid: "230420402402402",//订单号
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
      staff_confirm: null, //营业员确认订单的时间
      precheckin_done: null, //预登记全部完成时间
    }
  }, {
    order_id: "230420402402403",//订单号
    order_pmsid: "230420402402403",//订单号
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
      staff_confirm: null, //营业员确认订单的时间
      precheckin_done: null, //预登记全部完成时间
    }
  }
]

Mock.mock(
  prefix + '/login',
  {
    errcode: "0",
    errmsg: "ok",
    data: {
      session: "asiodhoiawhdoihoi123128uasihci"
    }
  }
)
//获取确认订单列表
//待确认
Mock.mock(
  prefix + '/order/precheckin/confirm',
  {
    errcode: "0",
    errmsg: "ok",
    data: orderlist
  }
);
//已确认
Mock.mock(
  prefix + '/order/confirmed',
  {
    errcode: "0",
    msg: "ok",
    data: [
      {
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
          deposit: 0, //应付押金
        },
        status: {
          is_cancelled: false,// 是否已取消
          is_refund_required: false, //是否需要退款
          is_recording_success: false,// pms入账是否成功
        },
        timeline: { //状态变化时间
          staff_confirm: null, //营业员确认订单的时间
          precheckin_done: null, //预登记全部完成时间
        }
      }, {
        order_id: "230420402402405",//订单号
        order_pmsid: "230420402402405",//订单号
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
          deposit: 0, //应付押金
        },
        status: {
          is_cancelled: false,// 是否已取消
          is_refund_required: false, //是否需要退款
          is_recording_success: false,// pms入账是否成功
        },
        timeline: { //状态变化时间
          staff_confirm: null, //营业员确认订单的时间
          precheckin_done: null, //预登记全部完成时间
        }
      }, {
        order_id: "230420402402406",//订单号
        order_pmsid: "230420402402406",//订单号
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
          deposit: 0, //应付押金
        },
        status: {
          is_cancelled: false,// 是否已取消
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
//获取确认订单详情
Mock.mock(
  /\/order\/precheckin\/confirm\/\d+$/,
  function (opts) {
    // console.log(opts);
    let id = opts.url.split('/').pop();
    // console.log(id);
    let orderdetail = confirmlist.filter(item => item.order_id == id)[0];
    // console.log(orderdetail)
    return orderdetail ? {
        errcode: 0,
        data: orderdetail
      } : {
        errcode: 404
      }
  }
);
// 批量确认预订单
Mock.mock(
  prefix + '/order/multiconfirm',
  {
    errcode: "0",
    msg: "ok",
  }
);
// 单个确认预订单
Mock.mock(
  prefix + '/order/singleconfirm',
  {
    errcode: "0",
    msg: "ok",
  }
);


/* 当日预登记订单列表 */
Mock.mock(
  prefix + '/order/precheckin/today',
  {
    errcode: "0",
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
    errcode: "0",
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
    errcode: "0",
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
//获取历史预登记订单列表
Mock.mock(
  prefix + '/order/precheckin/history',
  {
    errcode: "0",
    msg: "ok",
    data: confirmlist
  }
);


// 房态管理
Mock.mock(
  prefix + '/room/room_type_list',
  {
    errcode: "0",
    errmsg: "ok",
    data: [
      {
        room_type_id: 'DCF',
        room_type_name: '大床房'
      }, {
        room_type_id: 'SCF',
        room_type_name: '双床房'
      }
    ]
  }
)

Mock.mock(
  prefix + '/room/floor_list',
  {
    errcode: "0",
    errmsg: "ok",
    data: [
      {
        floor_id: 111,
        floor_name: '1层'
      }, {
        floor_id: 222,
        floor_name: '2层'
      }, {
        floor_id: 333,
        floor_name: '3层'
      }, {
        floor_id: 444,
        floor_name: '4层'
      }
    ]
  }
)

Mock.mock(
  prefix + '/room/list',
  {
    errcode: "0",
    errmsg: "ok",
    data: [
      {
        room_id: 'f101',//房间id
        room_number: 101,//房间号
        room_status: 0, //0:空净 1:空脏 2:在住
        room_type_id: 'DCF', //房型代码
        floor_id: 111, //楼层id
        config: {
          enabled_pick: true, //是否允许自助选房
        },
        owner_name: 'ted',
        guest_name: ''
      }, {
        room_id: 'f102',//房间id
        room_number: '102',//房间号
        room_status: 0, //0:空净 1:空脏 2:在住
        room_type_id: 'DCF', //房型代码
        floor_id: 111, //楼层id
        config: {
          enabled_pick: true, //是否允许自助选房
        },
        owner_name: '',
        guest_name: ''
      }, {
        room_id: 'f103',//房间id
        room_number: '103',//房间号
        room_status: 0, //0:空净 1:空脏 2:在住
        room_type_id: 'DCF', //房型代码
        floor_id: 111, //楼层id
        config: {
          enabled_pick: true, //是否允许自助选房
        },
        owner_name: '',
        guest_name: ''
      }, {
        room_id: 'f104',//房间id
        room_number: '104',//房间号
        room_status: 0, //0:空净 1:空脏 2:在住
        room_type_id: 'DCF', //房型代码
        floor_id: 111, //楼层id
        config: {
          enabled_pick: true, //是否允许自助选房
        },
        owner_name: '',
        guest_name: ''
      }, {
        room_id: 'f105',//房间id
        room_number: '105',//房间号
        room_status: 2, //0:空净 1:空脏 2:在住
        room_type_id: 'DCF', //房型代码
        floor_id: 111, //楼层id
        config: {
          enabled_pick: true, //是否允许自助选房
        },
        owner_name: '思路',
        guest_name: ''
      }, {
        room_id: 'f106',//房间id
        room_number: '106',//房间号
        room_status: 2, //0:空净 1:空脏 2:在住
        room_type_id: 'DCF', //房型代码
        floor_id: 111, //楼层id
        config: {
          enabled_pick: true, //是否允许自助选房
        },
        owner_name: '思路',
        guest_name: '思路'
      }, {
        room_id: 'f201',//房间id
        room_number: '201',//房间号
        room_status: 1, //0:空净 1:空脏 2:在住
        room_type_id: 'SCF', //房型代码
        floor_id: 222, //楼层id
        config: {
          enabled_pick: true, //是否允许自助选房
        },
        owner_name: 'ted',
        guest_name: 'alan'
      }, {
        room_id: 'f202',//房间id
        room_number: '202',//房间号
        room_status: 1, //0:空净 1:空脏 2:在住
        room_type_id: 'SCF', //房型代码
        floor_id: 222, //楼层id
        config: {
          enabled_pick: false, //是否允许自助选房
        },
        owner_name: '',
        guest_name: ''
      }, {
        room_id: 'f203',//房间id
        room_number: '203',//房间号
        room_status: 1, //0:空净 1:空脏 2:在住
        room_type_id: 'SCF', //房型代码
        floor_id: 222, //楼层id
        config: {
          enabled_pick: false, //是否允许自助选房
        },
        owner_name: '',
        guest_name: ''
      }, {
        room_id: 'f301',//房间id
        room_number: '301',//房间号
        room_status: 2, //0:空净 1:空脏 2:在住
        room_type_id: 'SCF', //房型代码
        floor_id: 333, //楼层id
        config: {
          enabled_pick: false, //是否允许自助选房
        },
        owner_name: 'ted',
        guest_name: 'alan'
      }, {
        room_id: 'f302',//房间id
        room_number: '302',//房间号
        room_status: 2, //0:空净 1:空脏 2:在住
        room_type_id: 'SCF', //房型代码
        floor_id: 333, //楼层id
        config: {
          enabled_pick: false, //是否允许自助选房
        },
        owner_name: 'ted',
        guest_name: 'alan'
      }, {
        room_id: 'f303',//房间id
        room_number: '303',//房间号
        room_status: 2, //0:空净 1:空脏 2:在住
        room_type_id: 'SCF', //房型代码
        floor_id: 333, //楼层id
        config: {
          enabled_pick: false, //是否允许自助选房
        },
        owner_name: 'ted',
        guest_name: 'alan'
      }
    ]
  }
)

Mock.mock(
  prefix + '/room/status',
  {
    errcode: "0",
    errmsg: "ok"
  }
)

Mock.mock(
  prefix + '/room/enabled_pick',
  {
    errcode: "0",
    errmsg: "ok"
  }
)

Mock.mock(
  prefix + '/room/inout',
  {
    errcode: "0",
    errmsg: "ok"
  }
)

Mock.mock(
  prefix + '/room/cancel_suborder',
  {
    errcode: "0",
    errmsg: "ok"
  }
)
