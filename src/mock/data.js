module.exports = {
  prefix: "/gemini",
  // ===============================================================
  // 订单列表
  // ===============================================================
  orderlist: [
    {
      order_id: "230420402402401",//订单号
      order_pmsid: "230420402402401",//订单号
      source_id: 'XC',
      in_time: 1490976000000,
      out_time: 1491148800000,
      owner: "张三",//预订人
      owner_tel: "8618500059035",//预订人手机
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
        pay_mode: 1,
      },
      bill: {
        payment: {
          wx_order_id: '4008162001602672232323295',
          pay_fee: 0,//支付金额
          pay_time: 1495444639000
        },
        refund: {
          need_pay_fee: 200,  //消费金额
          refund_fee: 100,  //退款金额
          refund_time: 1495444639000,  //申请退款时间
          refund_status: 'REFUNDED',  //PENDING退款中、FAILED失败，REFUNDED退款完成
        }
      },
      status: {
        is_cancelled: false, //是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false, //PMS入账是否成功
        is_any_checkin: false, //订单是否有入住
        is_free_deposit: true,//true免押、false不免押
      },
      timeline: { //状态变化时间
        staff_confirm: 1491384458000, //营业员确认订单的时间
        precheckin_done: 1491384458000, //预登记全部完成时间
      },
      invoice: {
        id: '00210212310001',
        type: "GENERAL",
        media: "PAPER",
        category: "住宿费",
        title: "上海复创",
        tax_registry_no: "统一社会信用代码",
        address: "地址",
        phone_number: null,
        bank_name: null,
        bank_account: null,
        invoice_status: 1,//1未开，2已开
        draw_time: 1491384458000//开票时间
      },
      logs: [{
        date: 1491384458000,
        action: '操作“确认退款”转退款流程',
        operator: '张三'
      }, {
        date: 1491384458000,
        action: '操作“确认退款”转退款流程',
        operator: 'ted'
      }],
      room_fees: [{
        room_type_name: '大床房', //房型名称
        amount: 2, //房间数
        date_price: [{
          date: 1491384458000, //日期
          price: 30000, //房费
        }]
      }],
      suborders: [
        {
          suborder_id: "2304204024024011",
          order_id: '2304204024024011',
          order_pmsid: '2304204024024011',
          union_tag: '023jatrtgfs00001',
          status: {
            is_cancelled: false, //是否已取消
            is_checkin: false, //是否入住
            is_checkout: false, //是否离店
          },
          breakfast: 1,//早餐份数 null未配置,0-无早，1-单早，2-双早，3-全早
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
          guests: [
            // {
            //   name: "李四",
            //   idcard: "343245623456728199"
            // }, {
            //   name: "李四",
            //   idcard: "343245623456728199"
            // }
          ],
          in_time: null, //办理入住时间
          out_time: null, //离店时间
          identity_id: "", //身份验证记录ID:null,
          lvye_report_time: 1490976000000, //成功上传旅业系统的时间时间戳
          lvye_report_status: 'SUCCESS', //NONE未上传，SUCCESS成功，FAILED失败, PENDING等待 。上传旅业系统状态。
        }, {
          suborder_id: "2304204024024011",
          order_id: '2304204024024011',
          order_pmsid: '2304204024024011',
          union_tag: '023jatrtgfs00001',
          status: {
            is_cancelled: false, //是否已取消
            is_checkin: false, //是否入住
            is_checkout: false, //是否离店
          },
          breakfast: 3,//早餐份数 null未配置,0-无早，1-单早，2-双早，3-全早
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
          guests: [
            {
              name: "李四",
              idcard: "343245623456728199"
            }, {
              name: "李四",
              idcard: "343245623456728199"
            }
          ],
          in_time: null, //办理入住时间
          out_time: null, //离店时间
          identity_id: "", //身份验证记录ID:null,
          lvye_report_time: 1490976000000, //成功上传旅业系统的时间时间戳
          lvye_report_status: 'FAILED', //NONE未上传，SUCCESS成功，FAILED失败, PENDING等待 。上传旅业系统状态。
        }, {
          suborder_id: "2304204024024011",
          order_id: '2304204024024011',
          order_pmsid: '2304204024024011',
          union_tag: '023jatrtgfs00001',
          status: {
            is_cancelled: false, //是否已取消
            is_checkin: false, //是否入住
            is_checkout: false, //是否离店
          },
          breakfast: 0,//早餐份数 null未配置,0-无早，1-单早，2-双早，3-全早
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
          guests: [
            {
              name: "李四",
              idcard: "343245623456728199"
            }, {
              name: "李四",
              idcard: "343245623456728199"
            }
          ],
          in_time: null, //办理入住时间
          out_time: null, //离店时间
          identity_id: "", //身份验证记录ID:null,
          lvye_report_time: 1490976000000, //成功上传旅业系统的时间时间戳
          lvye_report_status: 'PENDING', //NONE未上传，SUCCESS成功，FAILED失败, PENDING等待 。上传旅业系统状态。
        }]
    },
    {
      order_id: "230420402402402",//订单号
      order_pmsid: "230420402402402",//订单号
      source_id: 'XC',
      in_time: 1490976000000,
      out_time: 1491148800000,
      owner: "张三",//预订人
      owner_tel: "8618500059035",//预订人手机
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
        pay_mode: 1,
      },
      bill: {
        payment: {
          wx_order_id: '4008162001602672232323295',
          pay_fee: 0,//支付金额
          pay_time: 1495444639000
        },
        refund: {
          need_pay_fee: 200,  //消费金额
          refund_fee: 100,  //退款金额
          refund_time: 1495444639000,  //申请退款时间
          refund_status: 'PENDING',  //PENDING退款中、FAILED失败，REFUNDED退款完成
        }
      },
      status: {
        is_cancelled: false, //是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false, //PMS入账是否成功
        is_any_checkin: false, //订单是否有入住
        is_free_deposit: true,//true免押、false不免押
      },
      timeline: { //状态变化时间
        staff_confirm: 1491384458000, //营业员确认订单的时间
        precheckin_done: 1491384458000, //预登记全部完成时间
      },
      room_fees: [{
        room_type_name: '大床房', //房型名称
        amount: 2, //房间数
        date_price: [{
          date: 1491384458000, //日期
          price: 30000, //房费
        }]
      }],
      suborders: []
    },
    {
      order_id: "230420402402403",//订单号
      order_pmsid: "230420402402403",//订单号
      source_id: 'XC',
      in_time: 1490976000000,
      out_time: 1491148800000,
      owner: "张三",//预订人
      owner_tel: "8618500059035",//预订人手机
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
        pay_mode: 1,
      },
      bill: {
        payment: {
          wx_order_id: '4008162001602672232323295',
          pay_fee: 0,//支付金额
          pay_time: 1495444639000
        },
        refund: {
          need_pay_fee: 200,  //消费金额
          refund_fee: 100,  //退款金额
          refund_time: 1495444639000,  //申请退款时间
          refund_status: 'PENDING',  //PENDING退款中、FAILED失败，REFUNDED退款完成
        }
      },
      status: {
        is_cancelled: false, //是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false, //PMS入账是否成功
        is_any_checkin: false, //订单是否有入住
        is_free_deposit: true,//true免押、false不免押
      },
      timeline: { //状态变化时间
        staff_confirm: 1491384458000, //营业员确认订单的时间
        precheckin_done: 1491384458000, //预登记全部完成时间
      },
      invoice: {
        id: '00210212310001',
        type: "GENERAL",
        media: "PAPER",
        category: "住宿费",
        title: "上海复创",
        tax_registry_no: "统一社会信用代码",
        address: "地址",
        phone_number: null,
        bank_name: null,
        bank_account: null,
        invoice_status: 1,//1未开，2已开
        draw_time: 1491384458000//开票时间
      },
      logs: [{
        date: 1491384458000,
        action: '操作“确认退款”转退款流程',
        operator: '张三'
      }, {
        date: 1491384458000,
        action: '操作“确认退款”转退款流程',
        operator: 'ted'
      }],
      room_fees: [{
        room_type_name: '大床房', //房型名称
        amount: 2, //房间数
        date_price: [{
          date: 1491384458000, //日期
          price: 30000, //房费
        }]
      }],
      suborders: [
        {
          suborder_id: "2304204024024011",
          order_id: '2304204024024011',
          order_pmsid: '2304204024024011',
          union_tag: '023jatrtgfs00001',
          status: {
            is_cancelled: false, //是否已取消
            is_checkin: false, //是否入住
            is_checkout: false, //是否离店
          },
          breakfast: 1,//早餐份数 null未配置,0-无早，1-单早，2-双早，3-全早
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
          guests: [
            {
              name: "李四",
              idcard: "343245623456728199"
            }, {
              name: "李四",
              idcard: "343245623456728199"
            }
          ],
          in_time: null, //办理入住时间
          out_time: null, //离店时间
          identity_id: "", //身份验证记录ID:null,
          lvye_report_time: 1490976000000, //成功上传旅业系统的时间时间戳
          lvye_report_status: 'SUCCESS', //NONE未上传，SUCCESS成功，FAILED失败, PENDING等待 。上传旅业系统状态。
        }]

    },
    {
      order_id: "230420402402404",//订单号
      order_pmsid: "230420402402404",//订单号
      source_id: 'XC',
      in_time: 1490976000000,
      out_time: 1491148800000,
      owner: "张三",//预订人
      owner_tel: "8618500059035",//预订人手机
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
        pay_mode: 1,
      },
      bill: {
        payment: {
          wx_order_id: '4008162001602672232323295',
          pay_fee: 0,//支付金额
          pay_time: 1495444639000
        },
        refund: {
          need_pay_fee: 200,  //消费金额
          refund_fee: 100,  //退款金额
          refund_time: 1495444639000,  //申请退款时间
          refund_status: 'PENDING',  //PENDING退款中、FAILED失败，REFUNDED退款完成
        }
      },
      status: {
        is_cancelled: false, //是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false, //PMS入账是否成功
        is_any_checkin: false, //订单是否有入住
        is_free_deposit: true,//true免押、false不免押
      },
      timeline: { //状态变化时间
        staff_confirm: 1491384458000, //营业员确认订单的时间
        precheckin_done: 1491384458000, //预登记全部完成时间
      },
      invoice: {
        id: '00210212310001',
        type: "GENERAL",
        media: "PAPER",
        category: "住宿费",
        title: "上海复创",
        tax_registry_no: "统一社会信用代码",
        address: "地址",
        phone_number: null,
        bank_name: null,
        bank_account: null,
        invoice_status: 1,//1未开，2已开
        draw_time: 1491384458000//开票时间
      },
      logs: [{
        date: 1491384458000,
        action: '操作“确认退款”转退款流程',
        operator: '张三'
      }, {
        date: 1491384458000,
        action: '操作“确认退款”转退款流程',
        operator: 'ted'
      }],
      room_fees: [{
        room_type_name: '大床房', //房型名称
        amount: 2, //房间数
        date_price: [{
          date: 1491384458000, //日期
          price: 30000, //房费
        }]
      }],
      suborders: []
    },
    {
      order_id: "230420402402405",//订单号
      order_pmsid: "230420402402405",//订单号
      source_id: 'XC',
      in_time: 1490976000000,
      out_time: 1491148800000,
      owner: "张三",//预订人
      owner_tel: "8618500059035",//预订人手机
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
        pay_mode: 1,
      },
      bill: {
        payment: {
          wx_order_id: '4008162001602672232323295',
          pay_fee: 0,//支付金额
          pay_time: 1495444639000
        },
        refund: {
          need_pay_fee: 200,  //消费金额
          refund_fee: 100,  //退款金额
          refund_time: 1495444639000,  //申请退款时间
          refund_status: 'PENDING',  //PENDING退款中、FAILED失败，REFUNDED退款完成
        }
      },
      status: {
        is_cancelled: false, //是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false, //PMS入账是否成功
        is_any_checkin: false, //订单是否有入住
        is_free_deposit: true,//true免押、false不免押
      },
      timeline: { //状态变化时间
        staff_confirm: 1491384458000, //营业员确认订单的时间
        precheckin_done: 1491384458000, //预登记全部完成时间
      },
      room_fees: [{
        room_type_name: '大床房', //房型名称
        amount: 2, //房间数
        date_price: [{
          date: 1491384458000, //日期
          price: 30000, //房费
        }]
      }],
      suborders: []
    },
    {
      order_id: "230420402402406",//订单号
      order_pmsid: "230420402402406",//订单号
      source_id: 'XC',
      in_time: 1490976000000,
      out_time: 1491148800000,
      owner: "张三",//预订人
      owner_tel: "8618500059035",//预订人手机
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
        pay_mode: 1,
      },
      bill: {
        payment: {
          wx_order_id: '4008162001602672232323295',
          pay_fee: 0,//支付金额
          pay_time: 1495444639000
        },
        refund: {
          need_pay_fee: 200,  //消费金额
          refund_fee: 100,  //退款金额
          refund_time: 1495444639000,  //申请退款时间
          refund_status: 'PENDING',  //PENDING退款中、FAILED失败，REFUNDED退款完成
        }
      },
      status: {
        is_cancelled: false, //是否已取消
        is_refund_required: false, //是否需要退款
        is_recording_success: false, //PMS入账是否成功
        is_any_checkin: false, //订单是否有入住
        is_free_deposit: true,//true免押、false不免押
      },
      timeline: { //状态变化时间
        staff_confirm: 1491384458000, //营业员确认订单的时间
        precheckin_done: 1491384458000, //预登记全部完成时间
      },
      room_fees: [{
        room_type_name: '大床房', //房型名称
        amount: 2, //房间数
        date_price: [{
          date: 1491384458000, //日期
          price: 30000, //房费
        }]
      }],
      suborders: []

    }
  ],
  // ===============================================================
  // 子单列表
  // ===============================================================
  suborders: [
    {
      suborder_id: "2304204024024011",
      order_id: '230420402402401',
      order_pmsid: '2304204024024011',
      union_tag: '023jatrtgfs00001',
      status: {
        is_cancelled: false, //是否已取消
        is_checkin: false, //是否入住
        is_checkout: false, //是否离店
      },
      breakfast: 3,//早餐份数 null未配置,0-无早，1-单早，2-双早，3-全早
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
      guests: [
        {
          name: "李四",
          idcard: "343245623456728199"
        }, {
          name: "李四",
          idcard: "343245623456728199"
        }
      ],
      in_time: null, //办理入住时间
      out_time: null, //离店时间
      identity_id: "", //身份验证记录ID:null,
      lvye_report_time: 1490976000000, //成功上传旅业系统的时间时间戳
      lvye_report_status: 'SUCCESS', //NONE未上传，SUCCESS成功，FAILED失败, PENDING等待 。上传旅业系统状态。
    },
    {
      suborder_id: "2304204024024011",
      order_id: '230420402402402',
      order_pmsid: '2304204024024011',
      union_tag: '023jatrtgfs00001',
      status: {
        is_cancelled: false, //是否已取消
        is_checkin: false, //是否入住
        is_checkout: false, //是否离店
      },
      breakfast: 1,//早餐份数 null未配置,0-无早，1-单早，2-双早，3-全早
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
      guests: [
        // {
        //   name: "李四",
        //   idcard: "343245623456728199"
        // }, {
        //   name: "李四",
        //   idcard: "343245623456728199"
        // }
      ],
      in_time: null, //办理入住时间
      out_time: null, //离店时间
      identity_id: "", //身份验证记录ID:null,
      lvye_report_time: 1490976000000, //成功上传旅业系统的时间时间戳
      lvye_report_status: 'FAILED', //NONE未上传，SUCCESS成功，FAILED失败, PENDING等待 。上传旅业系统状态。
    }
  ],
  // ===============================================================
  // 公安验证
  // ===============================================================
  identityList: [
    {
      identity_id: 'id0001',
      suborder_id: '',
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
      status: "PASSED", //PENDING待审核、PASSED通过、REJECTED拒绝
      is_upload_success: true, //上传旅业系统是否成功
      lvye_report_time: null, //成功上传旅业系统的时间时间戳
      lvye_report_status: "", //NONE未上传，SUCCESS成功，FAILED失败。上传旅业系统状态。
    },
    {
      identity_id: 'id0002',
      suborder_id: '',
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
      status: "PASSED", //PENDING待审核、PASSED通过、REJECTED拒绝
      is_upload_success: false, //上传旅业系统是否成功
      lvye_report_time: null, //成功上传旅业系统的时间时间戳
      lvye_report_status: "", //NONE未上传，SUCCESS成功，FAILED失败。上传旅业系统状态。
    },
    {
      identity_id: 'id0001',
      suborder_id: '',
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
      status: "PASSED", //PENDING待审核、PASSED通过、REJECTED拒绝
      is_upload_success: false, //上传旅业系统是否成功
      lvye_report_time: null, //成功上传旅业系统的时间时间戳
      lvye_report_status: "", //NONE未上传，SUCCESS成功，FAILED失败。上传旅业系统状态。
    },
    {
      identity_id: 'id0001',
      suborder_id: '',
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
      status: "PASSED", //PENDING待审核、PASSED通过、REJECTED拒绝
      is_upload_success: false, //上传旅业系统是否成功
      upload_time: null, //成功上传旅业系统的时间
      next_identity_id: '' //下一个待处理的验证id
    },
    {
      identity_id: 'id0001',
      suborder_id: '',
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
      status: "PASSED", //PENDING待审核、PASSED通过、REJECTED拒绝
      is_upload_success: true, //上传旅业系统是否成功
      lvye_report_time: null, //成功上传旅业系统的时间时间戳
      lvye_report_status: "", //NONE未上传，SUCCESS成功，FAILED失败。上传旅业系统状态。
    },
    {
      identity_id: 'id0001',
      suborder_id: '',
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
      status: "PASSED", //PENDING待审核、PASSED通过、REJECTED拒绝
      is_upload_success: true, //上传旅业系统是否成功
      lvye_report_time: null, //成功上传旅业系统的时间时间戳
      lvye_report_status: "", //NONE未上传，SUCCESS成功，FAILED失败。上传旅业系统状态。
    },
  ],
  // ===============================================================
  // 退房
  // ===============================================================
  checkoutList: [
    {
      order_id: "230420402402401",    //主订单ID
      suborder_id: "230420402402401",  //子订单ID
      room_type_name: "大床房",  //房型名称
      room_number: "201", //房号
      union_tag: "204sssddeer",  //联房
      guests: [{
        name: "李思静",  //姓名
        idcard: "360123183892128910"  //身份证号码
      }, {
        name: "Ted",  //姓名
        idcard: "360123183892123456"  //身份证号码
      }],
      created_time: "1495419805000"  //申请时间
    }, {
      order_id: "230420402402402",    //主订单ID
      suborder_id: "230420402402402",  //子订单ID
      room_type_name: "大床房",  //房型名称
      room_number: "202", //房号
      union_tag: "204sssddeer",  //联房
      guests: [{
        name: "李思静",  //姓名
        idcard: "360123183892128910"  //身份证号码
      }, {
        name: "Ted",  //姓名
        idcard: "360123183892123456"  //身份证号码
      }],
      created_time: "1495419805000"  //申请时间
    }
  ],
  // ===============================================================
  // 获取待开发票列表
  // ===============================================================
  invoiceList: [
    {
      invoice_apply_id: '1234',
      order_id: '230420402402401',
      is_any_checkin: true, //true已入住 false未入住
      rooms_number: ['203'],
      owner: '张翠山',
      phone_number: '+8613112334544',
      in_time: '1491384458000',
      out_time: '1491384458000',
      type: "VAT",
      category: "住宿费",
      media: "PAPER",
      title: "上海二建",
      invoice_status: 1, //1有效未开票 2已开票
      order_status: 4
    },
    {
      invoice_apply_id: '1234',
      order_id: '230420402402402',
      is_any_checkin: false, //true已入住 false未入住
      rooms_number: ['205'],
      owner: '张无忌',
      phone_number: '+8613112334544',
      in_time: '1491384458000',
      out_time: '1491384458000',
      type: "VAT",
      category: "住宿费",
      media: "PAPER",
      title: "上海三建",
      invoice_status: 2, //1有效未开票 2已开票
      order_status: 6
    }
  ],
  // ===============================================================
  // 退款
  // ===============================================================
  refundList: [
    {
      order_id: "230420402402401",    //主订单ID
      room_numbers: ["201"], //房号
      pay_fee: 500000,
      refund: 20000,
      created_time: "1495252046000",  //申请时间
      status: 'FAILED'
    },
    {
      order_id: "230420402402402",    //主订单ID
      room_numbers: ["202"], //房号
      pay_fee: 500000,
      refund: 20000,
      created_time: "1495358557000",  //申请时间
      status: 'FAILED'
    },
    {
      order_id: "230420402402403",    //主订单ID
      room_numbers: ["203"], //房号
      pay_fee: 500000,
      refund: 20000,
      created_time: "1495350550000",  //申请时间
      status: 'FAILED'
    },
    {
      order_id: "230420402402404",    //主订单ID
      room_numbers: ["204", "205"], //房号
      pay_fee: 500000,
      refund: 20000,
      created_time: "1495419805000",  //申请时间
      status: 'REFUNDED'
    },
  ]
};
