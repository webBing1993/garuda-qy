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
      staff_confirm: '1491384458000', //营业员确认订单的时间
      precheckin_done: '1491384458000', //预登记全部完成时间
    },
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
        name: "李四",
        idcard: "343245623456728199"
      }, {
        name: "李四",
        idcard: "343245623456728199"
      }],
      checkin_time: null, //办理入住时间
      checkout_time: null, //离店时间
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
        name: "张三",
        idcard: "360123333333333456"
      }],
      checkin_time: '1491384458000', //办理入住时间
      checkout_time: '1491384458000', //离店时间
    }]

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
      staff_confirm: '1491384458000', //营业员确认订单的时间
      precheckin_done: '1491384458000', //预登记全部完成时间
    },
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
        name: "李四",
        idcard: "343245623456728199"
      }, {
        name: "李四",
        idcard: "343245623456728199"
      }],
      checkin_time: null, //办理入住时间
      checkout_time: null, //离店时间
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
        name: "张三",
        idcard: "360123333333333456"
      }],
      checkin_time: '1491384458000', //办理入住时间
      checkout_time: '1491384458000', //离店时间
    }]
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
      is_recording_success: true,// pms入账是否成功
    },
    timeline: { //状态变化时间
      staff_confirm: '1491384458000', //营业员确认订单的时间
      precheckin_done: '1491384458000', //预登记全部完成时间
    },
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
        name: "李四",
        idcard: "343245623456728199"
      }, {
        name: "李四",
        idcard: "343245623456728199"
      }],
      checkin_time: null, //办理入住时间
      checkout_time: null, //离店时间
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
        name: "张三",
        idcard: "360123333333333456"
      }],
      checkin_time: null, //办理入住时间
      checkout_time: null, //离店时间
    }]
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
      is_recording_success: true,// pms入账是否成功
    },
    timeline: { //状态变化时间
      staff_confirm: '1491384458000', //营业员确认订单的时间
      precheckin_done: '1491384458000', //预登记全部完成时间
    },
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
        name: "李四",
        idcard: "343245623456728199"
      }, {
        name: "李四",
        idcard: "343245623456728199"
      }],
      checkin_time: null, //办理入住时间
      checkout_time: null, //离店时间
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
        name: "张三",
        idcard: "360123333333333456"
      }],
      checkin_time: null, //办理入住时间
      checkout_time: null, //离店时间
    }]
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
      is_recording_success: true,// pms入账是否成功
    },
    timeline: { //状态变化时间
      staff_confirm: '1491384458000', //营业员确认订单的时间
      precheckin_done: '1491384458000', //预登记全部完成时间
    },
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
        name: "李四",
        idcard: "343245623456728199"
      }, {
        name: "李四",
        idcard: "343245623456728199"
      }],
      checkin_time: null, //办理入住时间
      checkout_time: null, //离店时间
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
        name: "张三",
        idcard: "360123333333333456"
      }],
      checkin_time: null, //办理入住时间
      checkout_time: null, //离店时间
    }]
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
      is_recording_success: true,// pms入账是否成功
    },
    timeline: { //状态变化时间
      staff_confirm: '1491384458000', //营业员确认订单的时间
      precheckin_done: '1491384458000', //预登记全部完成时间
    },
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
        name: "李四",
        idcard: "343245623456728199"
      }, {
        name: "李四",
        idcard: "343245623456728199"
      }],
      checkin_time: null, //办理入住时间
      checkout_time: null, //离店时间
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
        name: "张三",
        idcard: "360123333333333456"
      }],
      checkin_time: null, //办理入住时间
      checkout_time: null, //离店时间
    }]
  }]
const orderlist = [
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
const confirmedlist = [
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
    data: confirmedlist
  }
)
//获取确认订单详情
Mock.mock(
  /\/order\/detail\/\d+$/,
  function (opts) {
    console.log(opts);
    let id = opts.url.split('/').pop();
    console.log(id);
    let orderdetail = confirmlist.filter(item => item.order_id == id)[0];
    console.log(orderdetail)
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
// 营业员确认PMS同步结果
Mock.mock(
  prefix + '/order/conform_pms_sync',
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
    data: confirmlist
  }
);

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


Mock.mock(
  prefix + '/identities',
  {
    errcode: "0",
    errmsg: "ok",
    data: [{
      identity_id: 'id0001',
      owner: "ted",
      phone_number: "15300686661",
      in_time: '1491384458000',
      out_time: '1491384458000',
      room: {
        room_type_name: "大床房",
        room_number: "201",
      },
      guests: [{
        name: "张三", //姓名
        sex: "男", //性别
        ethnicity: "汉族", //民族
        date_of_birth: "19681010", //生日
        address: "上海市控江路1680号", //住址
        idcard: "23042040242420", //身份证号码
        photo: "", //身份证照片url
        curr_photo: "", //现在抓拍的照片url
        similarity: "70" //相似度65"
      }, {
        name: "李四", //姓名
        sex: "男", //性别
        ethnicity: "汉族", //民族
        date_of_birth: "19681010", //生日
        address: "上海市控江路1680号", //住址
        idcard: "23042040242420", //身份证号码
        photo: "", //身份证照片url
        curr_photo: "", //现在抓拍的照片url
        similarity: "70" //相似度65"
      }],
      created_time: "1491384458000", //验证时间
      status: "PASSED" //PENDING待审核、PASSED通过、REJECTED拒绝
    }]
  }
);
//当日入住单列表
Mock.mock(
  prefix + '/suborder/today',
  {
    errcode: "0",
    errmsg: "ok",
    data: [{
      suborder_id: '230420402402401', //子单号
      order_id: "230420402402401", //订单号业务查询用
      order_pmsid: '230420402402401', //pms订单号客户端渲染用
      intg: '204', //联房标签
      checkin_time: '1491384458000', //办理登记时间
      in_time: '1491384458000', //订单入住时间
      out_time: '1491384458000', //订单离店时间
      room_type_id: "3", //房型代码
      room_type_name: "大床房", //房型名称
      room_number: "201", //房间号
      guests: [{
        name: "张三", //入住人姓名
        idcard: '3344402198912290011', //入住人身份证
      }, {
        name: "李四",
        idcard: '3344402198912290011',
      }]
    }, {
      suborder_id: '230420402402402', //子单号
      order_id: "230420402402402", //订单号业务查询用
      order_pmsid: '230420402402402', //pms订单号客户端渲染用
      intg: '204', //联房标签
      checkin_time: '1491384458000', //办理登记时间
      in_time: '1491384458000', //订单入住时间
      out_time: '1491384458000', //订单离店时间
      room_type_id: "3", //房型代码
      room_type_name: "大床房", //房型名称
      room_number: "201", //房间号
      guests: [{
        name: "张三", //入住人姓名
        idcard: '3344402198912290011', //入住人身份证
      }, {
        name: "李四",
        idcard: '3344402198912290011',
      }]
    }]
  }
)


