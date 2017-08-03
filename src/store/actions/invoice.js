/**
 * Created by lisj on 2017/4/9.
 * 发票
 */
module.exports = {
  //lsj老版本发票
  // getInvoiceList(ctx, param){
  //   ctx.dispatch('resource', {
  //     url: '/invoice_apply',
  //     params: {
  //       invoice_status: param.invoice_status,
  //       scope: param.scope
  //     },
  //     onSuccess: (body) => {
  //       param.onsuccess ? param.onsuccess(body) : null
  //     }
  //   })
  // },
  // getInvoiceDetail(ctx, param){
  //   ctx.dispatch('resource', {
  //     url: '/invoice_apply/invoice_apply_id',
  //     onSuccess: (body) => {
  //       param.onsuccess ? param.onsuccess(body) : null
  //     },
  //     onFail: () => console.log('发票请求失败')
  //   })
  // },
  // confirmInvoice(ctx,param) {
  //   ctx.dispatch('resource', {
  //     url: '/invoice_apply/'+ param.invoice_apply_id + '/invoice_status',
  //     method:'PATCH',
  //     body: {
  //       invoice_status:param.invoice_status
  //     },
  //     onSuccess:(body) => {
  //       ctx.dispatch('showtoast');
  //       param.onsuccess ? param.onsuccess(body) : null
  //     }
  //   })
  // },

  //闪开发票
  getInvoiceList(ctx, param){
    ctx.dispatch('resource', {
      url: '/invoice',
      params: {
        invoice_status: param.invoice_status,
        scope: param.scope
      },
      onSuccess: (body) => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
}
