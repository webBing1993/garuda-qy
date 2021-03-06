module.exports = {
    //充值记录列表接口
    getRechargelist (ctx, param) {
        ctx.dispatch ('resource', {
            url: '/rechargelist/' + param.hotel_id+'?offset='+param.offset+'&limit='+param.limit,
            method: 'GET',
            onSuccess: body => {
                param.onsuccess ? param.onsuccess (body) : null
            }
        })
    },
// //续充展示
    getRechargeInfo (ctx, param) {
        ctx.dispatch ('resource', {
            url: '/recharge/' + param.hotel_id,
            method: 'GET',
            onSuccess: body => {
                ctx.commit('SURPLUS',body.data.surplus_time)
                param.onsuccess ? param.onsuccess (body) : null
            }
        })
    },
////充值核验详情列表
    getNoIdentityDetailList(ctx, param){
        ctx.dispatch ('resource', {
            url: '/undocumented/list?page='+param.page+'&limit='+param.limit,
            method: 'GET',
            onSuccess: body => {
                param.onsuccess ? param.onsuccess (body) : null
            }
        })
    },
    pmscheckout (ctx, param) {
        ctx.dispatch ('resource', {
            url: '/checkout/' + param.id + '/pms',
            method: 'PUT',
            onSuccess: body => {
                ctx.dispatch ('showtoast');
                param.onsuccess ? param.onsuccess (body) : null
            }
        })
    },
    //充值使用次数
    getRechargeUsedNum(ctx,param){
        ctx.dispatch ('resource', {
            url: '/usetime/'+param.hotelId+'?start_time='+param.start_time+'&end_time='+param.end_time,
            method: 'GET',
            onSuccess: (body, headers) => {
                param.onsuccess ? param.onsuccess (body, headers) : null
            }
        })
    }
}