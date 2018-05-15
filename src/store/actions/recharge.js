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
                param.onsuccess ? param.onsuccess (body) : null
            }
        })
    },
////充值核验详情列表
    getNoIdentityDetailList(ctx, param){
        ctx.dispatch ('resource', {
            url: '/rechargelist/' + param.hotel_id+'?offset='+param.offset+'&limit='+param.limit,
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
    getLiveINlist (ctx, param) {
        ctx.dispatch ('resource', {
            url: '/suborder/search?limit=5&offset=' + param.offset,
            method: 'POST',
            body: param.data,
            onSuccess: (body, headers) => {
                param.onsuccess ? param.onsuccess (body, headers) : null
            }
        })
    },
    //充值使用次数
    getRechargeUsedNum(ctx,param){
        ctx.dispatch ('resource', {
            url: '/usetime/'+param.hotelId,
            method: 'POST',
            body: param.data,
            onSuccess: (body, headers) => {
                param.onsuccess ? param.onsuccess (body, headers) : null
            }
        })
    }
}