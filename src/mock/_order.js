const Mock = require('mockjs')
import data from './data'

Mock
  .mock(
    /\/order\/detail\/\d+$/,
    function (opts) {
      let id = opts.url.split('/').pop();
      let orderdetail = data.confirmlist.filter(item => item.order_id == id)[0];
      return orderdetail
        ? {
          errcode: 0,
          data: orderdetail
        }
        : {
          errcode: 404
        }
    }
  )
