module.exports = {
  prefix: "/gemini",
  confirmlist: [
    {
      order_id: "230420402402401",//订单号
      order_pmsid: "230420402402401",//订单号
      source_id: 'XC',
      in_time: 1490976000000,
      out_time: 1491148800000,
      owner: "张三",//预订人
      owner_tel: "8618500059035",//预订人手机
      is_free_deposit: true,//true免押、false不免押
      remark: "携程已付300元",//备注
      rooms_plan: [{
        room_type: "大床房",
        room_count: 2
      }],
      payinfo: {
        total_roomfee: 4000, //总房费
        pms_pay: 1000, //PMS中的已付金额,
        staff_pay: 100,//营业员确认的付款金额,
        user_pay: 1000, //小程序已付金额
        deposit: 0, //应付押金
      },
      status: {
        is_cancelled: false, //是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false, //PMS入账是否成功
        is_any_checkin: false, //订单是否有入住
      },
      timeline: { //状态变化时间
        staff_confirm: '1491384458000', //营业员确认订单的时间
        precheckin_done: '1491384458000', //预登记全部完成时间
      },
      invoice: {
        type: "GENERAL",
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
        room_type_id: "DCF",
        room_type_name: "大床房",
        room_price: [{
          date: 1490976000000,
          price: '2222',
        }, {
          date: 1490976000000 + 86400000,
          price: '3333',
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
        identity_id: 'id0001',
        is_upload_success: true
      }, {
        suborder_id: "2304204024024012",
        status: {
          is_cancelled: false, //是否已取消
          is_checkin: false, //是否入住
          is_checkout: false, //是否离店
        },
        room_number: "204",
        room_tags: ["靠南", "带窗"],
        room_type_id: "DCF",
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
        identity_id: 'id0001',
        is_upload_success: false
      }]

    },
    {
      order_id: "230420402402402",//订单号
      order_pmsid: "230420402402402",//订单号
      in_time: '1491384458888',
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
        is_cancelled: false, //是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: true, //PMS入账是否成功
        is_any_checkin: false, //订单是否有入住
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
        room_number: "",
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
        checkin_time: '1491384458000', //办理入住时间
        checkout_time: '1491384458000', //离店时间
      }, {
        suborder_id: "2304204024024012",
        status: {
          is_cancelled: false, //是否已取消
          is_checkin: false, //是否入住
          is_checkout: false, //是否离店
        },
        room_number: null,
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
        checkin_time: '1491384458555', //办理入住时间
        checkout_time: '1491384458888', //离店时间
      }]
    },
    {
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
        type: "VAT",
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
    },
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
        is_recording_success: true,// pms入账是否成功
      },
      timeline: { //状态变化时间
        staff_confirm: '1491384458000', //营业员确认订单的时间
        precheckin_done: '1491384458000', //预登记全部完成时间
      },
      invoice: {
        type: "",
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
    },
    {
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
    },
    {
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
    }
  ],
  orderlist: [
    {
      order_id: "230420402402401",//订单号
      order_pmsid: "230420402402401",//订单号
      in_time: '1491384458000',
      out_time: '1491384458000',
      owner: "张三",//预订人
      owner_tel: "+8618500059035",//预订人手机
      remark: "123",//备注
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
      order_id: "230420402402404",//订单号
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
        staff_pay: 1000,//营业员确认的付款金额,
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
  ],
  confirmedlist: [
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
  ],
  //子单模板
  suborders: [
    {
      suborder_id: '230420402402401', //子单号
      order_id: "230420402402401", //订单号业务查询用
      order_pmsid: '230420402402401', //pms订单号客户端渲染用
      union_tag: '204sssddeer', //联房标签
      status: {
        is_cancelled: false,// 是否已取消
        is_checkin: false,// 是否入住
        is_checkout: false,// 是否离店
      },
      room_number: "201",
      room_tags: ["靠南", "带窗"],
      room_type_id: "3", //房型代码
      room_type_name: "大床房", //房型名称
      room_price: [{
        date: '1491384458000',
        price: '34500'
      }],
      guests: [{
        name: "张三", //入住人姓名
        idcard: '3344402198912290011', //入住人身份证
      }, {
        name: "李四",
        idcard: '3344402198912290011',
      }],
      in_time: '1491384458000', //入住时间
      out_time: '1491384458000', //离店时间
      identity_id: 'id0001',
      is_upload_success: true
    }, {
      suborder_id: '230420402402402', //子单号
      order_id: "230420402402402", //订单号业务查询用
      order_pmsid: '230420402402402', //pms订单号客户端渲染用
      union_tag: '204sssddeer', //联房标签
      status: {
        is_cancelled: false,// 是否已取消
        is_checkin: false,// 是否入住
        is_checkout: false,// 是否离店
      },
      room_number: "202",
      room_tags: ["靠南", "带窗"],
      room_type_id: "3", //房型代码
      room_type_name: "大床房", //房型名称
      room_price: [{
        date: '1491384458000',
        price: '34500'
      }],
      // guests: [{
      //   name: "张三", //入住人姓名
      //   idcard: '3344402198912290011', //入住人身份证
      // }, {
      //   name: "李四",
      //   idcard: '3344402198912290011',
      // }],
      in_time: '1491384458000', //入住时间
      out_time: '1491384458000', //离店时间
      identity_id: 'id0001',
      is_upload_success: false
    }]
}
