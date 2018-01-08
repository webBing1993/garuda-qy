/**
 * Created by lisj on 2017/4/9.
 * 发票
 */
module.exports = {
  confirmInvoice(ctx, param) {
    ctx.dispatch('resource', {
      url: '/invoice_apply/' + param.invoice_apply_id + '/invoice_status',
      method: 'PATCH',
      body: {
        invoice_status: param.invoice_status
      },
      onSuccess: (body) => {
        ctx.dispatch('showtoast');
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //闪开发票
  getInvoiceList(ctx, param){
    ctx.dispatch('resource', {
      url: '/getInvoiceList?offset='+param.offset+'&limit=10',
      method:'POST',
      headers: {
        Session: sessionStorage.session_id,
      },
      body: {
        status: param.status.toString() || "0",
        start_time: param.start_time||"",
        end_time: param.end_time||"",
        room_no:param.room_no||"",
        title:param.title||"",
        invoice_type:param.invoice_type||''
      },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      },
      onFail: body => {
        param.onfail ? param.onfail(body) : null
      }
    })
  },
  getInvoiceDetail(ctx, param) {
    ctx.dispatch('resource', {
      url: `/getInvoice`,
      // method:'GET',
      params: {
        id: param.id
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: err => {
        param.onfail ? param.onfail(err) : null
      }
    })
  },
  invoiceComplete(ctx, param){
    ctx.dispatch('resource', {
      url: '/udpateStatus',
      // method:'GET',
      params: {
        id: param.id
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
}
