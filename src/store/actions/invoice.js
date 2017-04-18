/**
 * Created by lisj on 2017/4/9.
 * 发票
 */
module.exports = {
  getInvoiceList(ctx, param){
    ctx.dispatch('resource', {
      url: '/invoice_apply',
      params: {
        invoice_status: param.invoice_status,
        scope: param.scope
      },
      onSuccess: (body) => {
        param.onsuccess(body)
      }
    })
  },
  getInvoiceDetail(ctx, param){
    ctx.dispatch('resource', {
      url: '/invoice_apply/invoice_apply_id',
      onSuccess: (body) => {
        param.onsuccess(body);
      },
      onFail: () => console.log('发票请求失败')
    })
  },
  confirmInvoice(ctx,param) {
    ctx.dispatch('resource', {
      url: 'invoice_apply/'+ param.invoice_apply_id + '/invoice_status',
      params: {
        invoice_status:param.invoice_status
      },
      onSuccess:(body) => {
        ctx.dispatch('showtoast');
        param.onsuccess(body)
      }
    })
  }
}
