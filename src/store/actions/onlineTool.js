//上线工具actionsmodule.exports = {    searchOnlineHotleList(ctx,param){        ctx.dispatch('resource',{            url: `/onlineTool/selectHotellList`,            method:"POST",            // body:param.body,            onSuccess:body => {                param.onsuccess?param.onsuccess(body):null            }        })    },    addHotelInfo(ctx,param){        ctx.dispatch('resource',{            url: `/onlineTool/addHotelInfo`,            method:"POST",            body:param.data,            onSuccess:body => {                param.onsuccess?param.onsuccess(body):null            }        })    },    updateHotelInfo(ctx,param){        ctx.dispatch('resource',{            url: `/onlineTool/updateHotelInfo`,            method:"PUT",            body:param.data,            onSuccess:body => {                param.onsuccess?param.onsuccess(body):null            }        })    },    searchHotelDetail(ctx,param){        ctx.dispatch('resource',{            url: `/onlineTool/selectHotelInfoByHotelId/`+param.hotelId,            method:"POST",            body:param.data,            onSuccess:body => {                param.onsuccess?param.onsuccess(body):null            }        })    },    addHotelMember(ctx,param){        ctx.dispatch('resource',{            url: `/onlineTool/addOperatorInfo`,            method:"POST",            body:param.data,            onSuccess:body => {                param.onsuccess?param.onsuccess(body):null            }        })    },    addDevice(ctx,param){        ctx.dispatch('resource',{            url: `/onlineTool/addOperatorInfo`,            method:"POST",            body:param.data,            onSuccess:body => {                param.onsuccess?param.onsuccess(body):null            }        })    },    modifyHotelInfo(ctx,param){        ctx.dispatch('resource',{            url: `/onlineTool/selectHotelDetail/`+param.hotelId,            method:"POST",            onSuccess:body => {                param.onsuccess?param.onsuccess(body):null            }        })    },    delPeoples(ctx,param){        ctx.dispatch('resource',{            url: `/onlineTool/deleteOperator/`+param.peopleId,            method:"PUT",            onSuccess:body => {                param.onsuccess?param.onsuccess(body):null                ctx.dispatch('showtoast', '删除成功')            }        })    },    delDevices(ctx,param){        ctx.dispatch('resource',{            url: `/onlineTool/deleteDeviceSn/`+param.deviceId,            method:"PUT",            onSuccess:body => {                param.onsuccess?param.onsuccess(body):null                ctx.dispatch('showtoast', '删除成功')            }        })    },    addDevice(ctx,param){        ctx.dispatch('resource',{            url: `/onlineTool/addDeviceSnInfo`,            body:param.data,            method:"POST",            onSuccess:body => {                param.onsuccess?param.onsuccess(body):null            }        })    },    searchHotel(ctx,param){        ctx.dispatch('resource',{            url:`/onlineTool/selectHotelByHotelName/`+param.hotelName,            method:'GET',            onSuccess:body => {                param.onsuccess?param.onsuccess(body):null            }        })    },    synchHotelRoomNums(ctx,param){        ctx.dispatch('resource',{            url:`/onlineTool/updateHotelRoom/`+param.hotelId,            method:'POST',            body:param.data,            onSuccess:body => {                param.onsuccess?param.onsuccess(body):null            }        })    },    getJsApiTicket(ctx,param){        ctx.dispatch('resource',{            url:`/jsapiticket`,            method:'GET',            onSuccess:body => {                param.onsuccess?param.onsuccess(body):null            }        })    }}