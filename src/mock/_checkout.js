const Mock = require('mockjs');
import data from './data';

Mock
  .mock(
    data.prefix + '/checkout',
    {
      errcode: "0",
      errmsg: "ok",
      data: data.suborders
    }
  );
