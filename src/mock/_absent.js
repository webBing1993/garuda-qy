const Mock = require('mockjs')
import data from './data'

// ===============================================================
// 公安验证
// ===============================================================

Mock
  .mock(
    // 获取身份验证列表 /identities
    // /\/identities\?status.+/,
    /\/remindNoShow\/list/,
    {
      errcode: "0",
      errmsg: "ok",
      data: data.AbsentList
    }
  )



