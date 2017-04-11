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
      data: data.suborders
    }
  )
  .mock(
    // 全部入住单列表 /suborder/list
    data.prefix + '/suborder/list',
    {
      errcode: "0",
      errmsg: "ok",
      data: data.suborders
    }
  )
