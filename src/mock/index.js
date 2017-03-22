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
        remark: ''
      }
    ]
  }
)
