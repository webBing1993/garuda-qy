//值房通接口交互module.exports ={    //改变订单状态    changeStatus(ctx,param){        ctx.dispatch('resource', {            method:'PUT',            url: '/order/update/paymode',            body:param.data,            onSuccess: body => {                param.onsuccess ? param.onsuccess(body) : null            },        })    },    //分享二维码到屏幕    shareQrCode(ctx,param){        ctx.dispatch('resource', {            method:'POST',            url: '/qrcode/zft/send',            body:param.data,            onSuccess: body => {                param.onsuccess ? param.onsuccess(body) : null            },        })    },    //子单入住    suborderCheckIn(ctx,param){        ctx.dispatch('resource', {            method:'POST',            url: '/suborder/checkin',            body:param.data,            onSuccess: body => {                param.onsuccess ? param.onsuccess(body) : null            },        })    },    //查询订单列表    searOrderList(){        ctx.dispatch('resource', {            method:'POST',            url: '/order/rzt/search',            body:param.data,            onSuccess: body => {                param.onsuccess ? param.onsuccess(body) : null            },        })    }}