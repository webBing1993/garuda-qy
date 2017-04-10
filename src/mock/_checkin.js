const Mock = require('mockjs')
import data from './data'

// ===============================================================
// 公安验证
// ===============================================================

Mock
  .mock(
    // 获取身份验证列表 /identities
    data.prefix + '/identities',
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
  )

// ===============================================================
// 在住管理
// ===============================================================

Mock
  .mock(
    // 当日入住单列表 /suborder/today
    data.prefix + '/suborder/today',
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
