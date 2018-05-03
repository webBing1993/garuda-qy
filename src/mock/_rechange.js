const Mock = require('mockjs')
import data from './data'

// ===============================================================
// 公安验证
// ===============================================================

Mock
  .mock(
    /\/rechargelist/,
    {
      errcode: "0",
      errmsg: "ok",
      data: data.rechargelist
    }
  )

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

