import Vue from 'vue'
import strTool from './tool/strTool.js'
import objTool from './tool/objTool.js'
import arrTool from './tool/arrTool.js'
import pinYing from './tool/pinying.js'
Vue.mixin({
  data(){
      return{
          strTool:strTool,
          objTool:objTool,
          arrTool:arrTool,
          pinYing:pinYing
      }
  },
  methods: {
      //时间格式处理
      datetimeparse (timestamp, format, prefix) {
          //转换时区
          let currentZoneTime = new Date (timestamp);
          let currentTimestamp = currentZoneTime.getTime ();
          let offsetZone = currentZoneTime.getTimezoneOffset () / 60;//如果offsetZone>0是西区，西区晚
          let offset = null;
          //客户端时间与服务器时间保持一致，固定北京时间东八区。
          offset = offsetZone + 8;
          currentTimestamp = currentTimestamp + offset * 3600 * 1000

          let newtimestamp = null;
          if (currentTimestamp) {
              if (currentTimestamp.toString ().length === 13) {
                  newtimestamp = currentTimestamp.toString ()
              } else if (currentTimestamp.toString ().length === 10) {
                  newtimestamp = currentTimestamp + '000'
              } else {
                  newtimestamp = null
              }
          } else {
              newtimestamp = null
          }
          ;
          let dateobj = newtimestamp ? new Date (parseInt (newtimestamp)) : new Date ()
          let YYYY = dateobj.getFullYear ()
          let MM = dateobj.getMonth () > 8 ? dateobj.getMonth () + 1 : '0' + (dateobj.getMonth () + 1)
          let DD = dateobj.getDate () > 9 ? dateobj.getDate () : '0' + dateobj.getDate ()
          let HH = dateobj.getHours () > 9 ? dateobj.getHours () : '0' + dateobj.getHours ()
          let mm = dateobj.getMinutes () > 9 ? dateobj.getMinutes () : '0' + dateobj.getMinutes ()
          let ss = dateobj.getSeconds () > 9 ? dateobj.getSeconds () : '0' + dateobj.getSeconds ()
          let output = '';
          let separator = '/'
          if (format) {
              separator = format.match (/-/) ? '-' : '/'
              output += format.match (/yy/i) ? YYYY : ''
              output += format.match (/MM/) ? (output.length ? separator : '') + MM : ''
              output += format.match (/dd/i) ? (output.length ? separator : '') + DD : ''
              output += format.match (/hh/i) ? (output.length ? ' ' : '') + HH : ''
              output += format.match (/mm/) ? (output.length ? ':' : '') + mm : ''
              output += format.match (/ss/i) ? (output.length ? ':' : '') + ss : ''
          } else {
              output += YYYY + separator + MM + separator + DD
          }
          output = prefix ? (prefix + output) : output

          return newtimestamp ? output : ''
      },
    idnumber: id => {
      return id.replace(id.slice(3, 14), '***********')
    },
    getGuestItem(item){
      let dom = ``;
      if (item.guests) {
        item.guests.length > 0
          ? item.guests.forEach(i => {
          dom += `<div style="display: flex;color: #4a4a4a;justify-content: space-between;line-height: 2;"><span>${i.name} ${this.idnumber(i.idcard)}</span></div>`
        })
          : dom += `<div>无入住人</div>`
      } else {
        dom += `<div>无入住人</div>`
      }
      return dom
    },
    getRoomType(item){
      let temp = ``;
      item.rooms_plan ? item.rooms_plan.forEach(i => temp += `<div>${i.room_type + 'x' + i.room_count}</div>`) : null;
      return temp;
    },
    getShareCode(item){
      let temp = ``;
      item ? temp += `<div style="color: #32ABE5">${item}</div>` : '暂无分享码';
      return temp;
    },
    invoiceType(type){
      let typeStr = '';
      if (type === 'PERSONAL') {
        typeStr = '个人发票'
      } else if (type === 'GENERAL') {
        typeStr = '增值税普通发票'
      } else if (type === 'VAT') {
        typeStr = '增值税专用发票'
      }
      return typeStr
    },
    roomInfoTitleIndex(detail){
      return detail.suborders.findIndex(i => i.guests && i.guests.length > 0)
    },
    cashHandling(val, prefix){
      return typeof val === 'number' && !isNaN(val)
        ? prefix ? prefix + '¥' + (val / 100) : '¥' + (val / 100) : ''

      },
      getBreakFast (breakfastStatus) {
          if (breakfastStatus === 0) {
              return '(无早)'
          } else if (breakfastStatus === 1) {
              return '(单早)'
          } else if (breakfastStatus === 2) {
              return '(双早)'
          } else if (breakfastStatus === 3) {
              return '(全早)'
          } else {
              return ''
          }
      },
      refundStatus (status) {
          if (status) {
              switch (status) {
                  case 'PENDING':
                      return '退款中';
                  case  "REFUNDED":
                      return '退款完成';
                  case "FAILED":
                      return '退款中';
                  case "SUCCESS":
                      return '退款成功';
                  default:
                      return null
              }


          }

      },
      timeFetch () {
          var todayZero = new Date ();
          var todayEleven = new Date ();
          var today = {};
          todayZero.setHours (0);
          todayZero.setMinutes (0);
          todayZero.setSeconds (0);
          todayEleven.setHours (23);
          todayEleven.setMinutes (59);
          todayEleven.setSeconds (59);
          console.log ('今天零点：' + todayZero.getTime ());
          console.log ('23:59：' + todayEleven.getTime ());
          return today = {todayStart: todayZero.getTime (), todayEnd: todayEleven.getTime ()}
      },
      //获取UUID
      getUUID () {
          let randomness = Math.round (Math.random () * 1e16) % Math.pow (2, 23);
          randomness = randomness.toString (2).length > 23
              ? (randomness >>> (randomness.toString (2).length - 23)).toString (2)
              : (randomness << (23 - randomness.toString (2).length)).toString (2);
          let timestamp = (new Date ().getTime ()).toString (2);
          return parseInt (timestamp, 2).toString () + parseInt (randomness, 2).toString ();
      },
      sortByTime (list, timeTag) {
          return timeTag ? list.sort ((a, b) => b[timeTag] - a[timeTag]) : list.sort ();
      },

      idCardParse: () => {
          // suborder.guests[j]['cardStar'] = suborder.guests[j].idcard.replace(/^(.{3})(?:\d+)(.{4})$/, "$1*******$2")
      },
      //标题日期筛选
      titleDateFilter (index, arr) {
          if (arr.length > 0) {
              return index
                  ? this.datetimeparse (arr[index].createdTime) === this.datetimeparse (arr[index - 1].createdTime)
                      ? null : this.datetimeparse (arr[index].createdTime)
                  : this.datetimeparse (arr[index].createdTime)
          }
      }
  }
})
