const Mock = require('mockjs')
import data from './data'

// ===============================================================
// 公安验证
// ===============================================================

Mock
  .mock(
    // 获取身份验证列表 /identities
    // /\/identities\?status.+/,
    /\/identities\/guests/,
    {
      errcode: "0",
      errmsg: "ok",
      data: data.identityList
    }
  )
  .mock(
    // 获取身份验证列表 //lvye/searchLvyeReportInfo
    data.prefix + '/lvye/searchLvyeReportInfo',
    {
      errcode: "0",
      errmsg: "ok",
      data: data.newIdentityList
    }
  )
  .mock(
    /lvye\/lvyeReportInfo/,
    {
      errcode: "0",
      errmsg: "ok",
      data: data.newIdentityDetail
    }
  )
  .mock(
    // /\/identities\/.+/,
    /\/identities\/guest\/.+/,
    // {
    //   errcode: "0",
    //   errmsg: "ok",
    //   data: {
    //     identity_id: 'id111',
    //     suborder_id: 'suborder111',
    //     owner: "张三",
    //     phone_number: "17867894324",
    //     in_time: "1491384458000",
    //     out_time: "1491384458000",
    //     room: {
    //       room_type_name: "大床房",
    //       room_number: "203",
    //     },
    //     guests: [{
    //       name: "张三", //姓名
    //       sex: "男", //性别
    //       ethnicity: "汉", //民族
    //       date_of_birth: "", //生日
    //       address: "上海市控江路1690", //住址
    //       idcard: "230988392980230", //身份证号码
    //       photo: "", //身份证照片url
    //       live_photo: "", //现在抓拍的照片url
    //       similarity: "77" //相似度65"
    //     }, {
    //       name: "张三", //姓名
    //       sex: "男", //性别
    //       ethnicity: "汉", //民族
    //       date_of_birth: "", //生日
    //       address: "上海市控江路1690", //住址
    //       idcard: "230988392980230", //身份证号码
    //       photo: "", //身份证照片url
    //       live_photo: "", //现在抓拍的照片url
    //       similarity: "77" //相似度65"
    //     },],
    //     created_time: "1491384458000", //验证时间
    //     status: "PENDING", //PENDING待审核、AGREED通过、REFUSED拒绝
    //     lvye_report_status: "FAILED", //NONE未上传，SUCCESS成功，FAILED失败。上传旅业系统状态。
    //     lvye_report_time: null, //成功上传旅业系统的时间时间戳
    //     next_identity_id: 'id001' //下一个待处理的验证id
    //   }
    // }

    /*{
      errcode: "0",
      errmsg: "ok",
      data:{
        config:{
          identity_check_channel:"YOUTU" // SHENFENBAO(厦门身份宝)/identity_check_channel(腾讯优图)
        },
        order:{
          suborder_id:"",//子订单ID
          room_number:"",//房间号
          owner:"香菇",
          phone_number:"123456788",
          in_time: "1491384458000",
          out_time: "1491384458000",
        },
        room: {
                room_type_name: "大床房",
                room_number: "203",
              },
        guest:{
          identity_guest_id:"",//入住人身份验证记录ID
          identity_id:"",//身份验证记录ID
          name:"张三", //姓名
          sex:"男", //性别
          ethnicity:"汉", //民族
          date_of_birth:"2015/07/09", //生日
          address:"上海市控江路1690", //住址
          idcard:"230988392980230", //身份证号码
          photo:"http://img01.taopic.com/141025/234987-1410250J11189.jpg", //身份证照片url
          live_photo:"http://img01.taopic.com/141025/234987-1410250J11189.jpg", //现在抓拍的照片url
          similarity:"80", //相似度65"
          identity_status:"PENDING", //身份状态：PENDING待审核、AGREED人工同意、REFUSED人工拒绝、AUTO_AGREED自核同意、AUTO_REFUSED自核拒绝
          identity_check_time:"", //验证时间
        },
        lvye_report:{
          lvye_report_in_status:"FAILED", //NONE未上传，SUCCESS成功，FAILED失败。上传旅业系统状态。
          lvye_report_in_time:null, //成功上传旅业系统的时间时间戳
          lvye_report_out_status:"", //NONE未上传，SUCCESS成功，FAILED失败。上传旅业系统状态。
          lvye_report_out_time:null, //成功上传旅业系统的时间时间戳
        },
        next_identity_id:'' //下一个待处理的验证id
      }
    }*/
    {
      "errcode": "0",
      "errmsg": "ok",
      "data": {
        "config": {
          "identity_check_channel": "YOUTU"
        },
        "order": {
          "order_id": "e354e0c2f8294e28968be317214b8d86",
          "suborder_id": "0064f6b5c7c64698b7312cbb532910f2",
          "room_number": "",
          "owner": "2959",
          "phone_number": "15072315951",
          "in_time": 1508840040000,
          "out_time": 1508854440000
        },
        "room": {
          "room_type_name": "标准双床",
          "room_number": "0515"
        },
        "guest": {
          "identity_guest_id": "4f9f79d2f9a5401a907d8d08d236966d",
          "identity_id": "0af410e34d3b445a85fd042cf933ca9d",
          "suborder_id": "0064f6b5c7c64698b7312cbb532910f2",
          "room_number": "0515",
          "name": "夏之镅",
          "sex": null,
          "ethnicity": null,
          "date_of_birth": null,
          "address": null,
          "idcard": "",
          "photo": null,
          "live_photo": "http://livephoto.storage.fortrun.cn/20170409/fdf7f56c-b4a5-4a0b-a54b-781da2169bc6.jpeg",
          "similarity": 47,
          "identity_status": "PENDING",
          "identity_check_time": 1494322034000
        },
        "lvye_report": {
          "lvye_report_in_status": "NONE",
          "lvye_report_in_time": null,
          "lvye_report_out_status": null,
          "lvye_report_out_time": null
        },
        "next_identity_id": ""
      }
    }

  )
  .mock(
    //手动上传旅业系统 /identities/lvye_report
    data.prefix + '/identities/lvye_report',
    {
      errcode: '0',
      errmsg: 'ok'
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

