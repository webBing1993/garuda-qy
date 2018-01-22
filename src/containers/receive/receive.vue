<!--住离信息列表-->
<template>
  <article>

    <header class="tab-wrapper">
      <Tab active-color="#5077AA">
        <TabItem v-for="(item,index) in tabMenu"
                 :key="'tabMenu'+index"
                 :selected="tempPage == item.split('(')[0]"
                 @on-item-click="toggleTab(item)">{{item}}
        </TabItem>
      </Tab>
    </header>
    <scroller :pullup-config="Interface.scrollerUp"
              @on-pullup-loading="refresh"
              lock-x
              use-pullup
              height="-40"
              v-model="scrollerStatus"
              scrollbarY bounce ref="scrollerBottom">
    <div class="list-wrapper">
      <!--<p class="synchronize">-->
      <!--<x-button mini value="同步" @onClick="syncTime"></x-button>-->
      <!--上次同步PMS时间: {{hotel.order_update_time ? datetimeparse(hotel.order_update_time, 'MMDDhhmm') : ''}}-->
      <!--</p>-->

      <div v-show="(!renderList||renderList.length === 0) && renderPageIndex>0" class="no-data">暂无数据</div>

      <Group v-if="tempPage == '预登记'" v-for="(item,index) in renderList" :key="index">
        <Cell :title="preCheckInCellTitle(item)"/>
        <Cell :title="preCheckInCellBody(item)" link
              @onClick="goto('/receive/precheckin-detail/' + item.order_id)"/>
      </Group>

      <Group v-if="tempPage == '在住'" v-for="(item,index) in renderList" :key="index">
        <Cell :title="liveInCellTitle(item)"/>
        <Cell :title="liveInGuestItem(item)"
              @onClick="goto('/receive/livein-detail/'+item.order_id)"/>
      </Group>

      <Group v-if="tempPage == '退房申请'" v-for="(item,index) in renderList" :key="index"
             :title="titleFilter(index)">
        <Cell :title="checkoutCellTitle(item)"/>
        <Cell :title="getCheckoutGuestItem(item)" link
              @onClick="goto('/receive/checkout-application-detail/'+item.order_id)"/>
      </Group>

      <Group v-if="tempPage == '已离店'" v-for="(item,index) in renderList" :key="index"
             :title="datetimeparse(item.out_time,'YYMMDD')">
        <Cell :title="checkoutCellTitle(item,index)"/>
        <!--<Cell :title="getGuestItem(item)" link @onClick="goto('/receive/checkout-detail/'+item.order_id)"/>-->
        <Cell :title="getLeaveItem(item)" link
              @onClick="goto('/receive/checkout-detail/'+item.order_id)"/>
      </Group>
    </div>
    </scroller>
    <!--筛选按钮-->
    <footer v-if="tempPage == '已离店'">
      <div class="listFilter">
        <span class="filter" @click="showDialog = true">
          <abbr>筛选</abbr>
        </span>
      </div>
    </footer>

    <!--筛选弹窗-->
    <div class="dialog">
      <x-dialog v-model="showDialog"
                :hide-on-blur=false
                mask-z-index="1">
        <p class="filterTop">筛选</p>
        <group>
          <x-input @on-focus="inputShow" title="房号" novalidate  placeholder="请输入房号" :show-clear="true" placeholder-align="left" v-model="filterRoomVal"></x-input>
          <x-input @on-focus="inputShow" title="入住人" novalidate placeholder="请输入住人姓名" :show-clear="true" placeholder-align="left" v-model="guestName"></x-input>
          <popup-picker show-name :show=isShowPP hide-on-deactivated :popup-style="{'z-index':'5002','max-height':'235px'}" :title="roomTitle" :data="roomList" v-model=roomType @on-show="popupShow"></popup-picker>
          <cell title= "起始日期" @onClick="isCalendarShow = true" link :value="datetimeparse(periodFilter[0],'YYMMDD')" ></cell>
          <cell title= "截止日期" @onClick="isCalendarShow = true" link :value="datetimeparse(periodFilter[1],'YYMMDD')" ></cell>
          <div>
            <div class="invoiceBtn" @click=cancel>取消</div>
            <div class="invoiceBtn" @click=confirmHandle>确定</div>
          </div>
        </group>
      </x-dialog>
    </div>
    <!--日历控件-->
    <popup hide-on-deactivated :popup-style="{'z-index':'5003','borderTop':'1px solid #eeeeee'}" v-model="isCalendarShow"
           bottom
           animationTopBottom >
      <calendar v-model="periodFilter" @onReset="resetFilter" @onCancel="isCalendarShow = false"></calendar>
    </popup>

  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import {Scroller, XDialog, XButton, Group,PopupRadio,XInput,PopupPicker,Picker,Popup } from 'vux'

  export default {
    name: 'receive',
    components: {
      Scroller,
      XDialog,
      XButton,
      Group,
      PopupRadio,
      XInput,
      PopupPicker,
      Picker,
      Popup
    },
    data() {
      return {
        isShowPP:false,
        scrollerStatus: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
        onFetching:false,
        flag: false,
        guestName: '',
        filterRoomVal: '',
        roomList: [],
        roomList1:[],
        roomType: [],
        showDialog: false,
        isCalendarShow: false,
        offset: 0,
        preCheckInList: [],
        liveInList: [],
        checkOutApplicationList: [],
        checkOutList: [],
        preCheckInPageIndex: 0,
        liveInPageIndex: 0,
        checkOutApplicationPageIndex: 0,
        checkoutPageIndex: 0,
        isCalendarShow: false,
        periodFilter: [null, null],
        roomTitle:"房型",
        checkOutTotal:0
      }
    },
    watch: {
      showDialog(val) {
        if (!val) {
          // this.filterRoomVal = '';
          // this.guestName = '';
          // this.periodFilter = []
        }
      },
      tempPage(val) {
        this.periodFilter = [null, null];
        this.renderList.length == 0 ? this.initList() : this.refreshList();
      },
      // periodFilter(val) {
      //   val[0] && val[1] && this.refreshList();
      //   this.isCalendarShow = false;
      // },
      isCalendarShow(val) {
        if(val){
          this.isShowPP=false;
          console.log(this.isShowPP)
        }
      },
    },
    computed: {
      ...mapState([
        'route',
        'hotel',
        'Interface'
      ]),
      tabMenu() {
        let menu = [];
        menu[0] = `预登记(${this.preCheckInList.length})`;
        menu[1] = `在住(${this.liveInList.length})`;
        menu[2] = `退房申请(${this.checkOutApplicationList.length})`;
        menu[3] = `已离店(${this.checkOutTotal})`;
        return menu;
      },
      getParameter() {
        // let tempRoute = this.route.path.split('/')[2];
        // return tempRoute
        return ''
      },
      tempPage() {
        let tempRoute = this.route.path.split('/')[2];
        switch (tempRoute) {
          case 'precheckin':
            tempRoute = '预登记';
            break;
          case 'livein':
            tempRoute = '在住';
            break;
          case 'checkout-application':
            tempRoute = '退房申请';
            break;
          case 'checkout':
            tempRoute = '已离店';
            break;
        }
        return tempRoute
      },
//      离店信息上传失败----》入住信息上传旅业失败
      renderList() {
        if (this.tempPage == '预登记') {
          return this.sortByTime(this.preCheckInList, 'in_time');
        } else if (this.tempPage == '在住') {
          return this.sortByTime(this.liveInList, 'in_time');
          return sortLiveInList;
        } else if (this.tempPage == '退房申请') {
          return this.sortByTime(this.checkOutApplicationList, 'created_time');
          return sortCheckOutApplicationList;
        } else if (this.tempPage == '已离店') {
          return this.sortByTime(this.checkOutList, 'created_time');
        }
      },
      renderPageIndex() {
        if (this.tempPage == '预登记') {
          return this.preCheckInPageIndex;
        } else if (this.tempPage == '在住') {
          return this.liveInPageIndex;
        } else if (this.tempPage == '退房申请') {
          return this.checkOutApplicationPageIndex;
        } else if (this.tempPage == '已离店') {
          return this.checkoutPageIndex;
        }
      },
      unionTag() {
        let totalList = [...this.renderList];
        let tagList = [];
        totalList.forEach(item => {
            if (item.union_tag) {
              let tagIndex = tagList.findIndex(i => i.tag === item.union_tag);
              tagIndex === -1
                ? tagList.push({tag: item.union_tag, room_number: [item.room_number]})
                : tagList[tagIndex].room_number = [...tagList[tagIndex].room_number, item.room_number]
            }
          }
        );
        return tagList;
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'hotelrefresh',
        'gettodaylist',
        'getTodaySuborder',
        'getcheckoutlist',
        'searchRoom',
        'getOutlist'
      ]),
      inputShow(){
        this.isCalendarShow = false;
        this.isShowPP=false;
      },
      //筛选确定处理
      confirmHandle() {
        this.showDialog = false;
        this.isCalendarShow = false;
        this.offset=0;
        this.outList(false);
      },
      //筛选取消处理
      cancel() {
        this.showDialog = false;
        this.isCalendarShow = false;
      },
      popupShow() {
        this.searchRoomType();
        this.isCalendarShow = false;
      },
      toggleTab(item) {
        let tempItem = item.split('(')[0];
        switch (tempItem) {
          case '预登记':
            this.replaceto('/receive/precheckin');
            break;
          case '在住':
            this.replaceto('/receive/livein');
            break;
          case '退房申请':
            this.replaceto('/receive/checkout-application');
            break;
          case '已离店':
            this.replaceto('/receive/checkout');
            break;
        }
      },
      preCheckInCellTitle(item) {
        let alertdom = item.status.is_recording_success ? `` : `<span class="cell-right warn">入账失败</span>`;
        return `<p><span class="cell-key">订单号：</span><span class="cell-value">${item.order_pmsid}</span>${alertdom}</p>`
      },
      preCheckInCellBody(item) {
        let roomtypewords = '';
        item.rooms_plan.forEach(i => roomtypewords += (i.room_type + 'x' + i.room_count));
        let time = this.datetimeparse(item.timeline.precheckin_done, this.isToday ? 'hhmm' : 'MMddhhmm');
        return `<div class="cell-body">` +
          `<p><span class="cell-key">预订人：</span><span class="cell-value">${item.owner + ' ' + item.owner_tel}</span></p>` +
          `<p><span class="cell-key">房型：</span><span class="cell-value">${roomtypewords}</span></p>` +
          `<p><span class="cell-key">分享码：</span><span style="color: #32ABE5" class="cell-value">${item.share_code?item.share_code:'暂无分享码'}</span></p>` +
          `</div>`
      },
      liveInCellTitle(item) {
        let tag = this.getUnionTag(item.union_tag, item.room_number);
        return `<p><span class="cell-value">${item.room_number} ${item.room_type_name}${this.getBreakFast(item.breakfast)}${tag ? '(联' + tag + ')' : ''}</span><span class="cell-right gray">${this.datetimeparse(item.in_time, this.isToday ? 'hhmm' : 'MMddhhmm')}</span></p>`
      },
//      liveInGuestItem(item){
//        let dom = ``;
//        if (item.guests) {
//          item.guests.length > 0
//            ? item.guests.forEach(i => {
//            dom += `<div style="display: flex;color: #4a4a4a;justify-content: space-between;line-height: 2;"><span>${i.name} ${this.idnumber(i.idcard)}</span></div>`
//          })
//            : dom += `<div>无入住人</div>`
//        } else {
//          dom += `<div>无入住人</div>`
//        }
//        !item.lvye_report_status || item.lvye_report_status === 'FAILED' ? dom += `<p style="color:#DF4A4A;">入住信息上传旅业失败</p>` : null
//        !item.lvye_report_status || item.lvye_report_status === 'NONE' ? dom += `<p style="color:#DF4A4A;">未上传旅业系统</p>` : null
//        return dom
//      },
      liveInGuestItem(item) {
        let dom = ``;
        if (item.guests) {
          item.guests.length > 0
            ? item.guests.forEach(i => {
              dom += `<div style="color: #4a4a4a;justify-content: space-between;line-height: 2;">
                    <p><span style="color:  #8A8A8A">入住人</span>`
              i.checkin_status && i.checkin_status === 'R' ? dom += ` <span style="float:right;margin-left:5px;">(尚未入住)</span>` : null
              i.checkin_status && i.checkin_status === 'I' && i.lvye_report_in_status && i.lvye_report_in_status === 'FAILED' ? dom += ` <span style="float:right;margin-left:5px;color:#FFB01F;">()</span>` : null
              i.checkin_status && i.checkin_status === 'I' && i.lvye_report_in_status && i.lvye_report_in_status === 'SUCCESS' ? dom += ` <span style="float:right;margin-left:5px;color:#86E85E;">(旅业已上报)</span>` : null
              i.checkin_status && i.checkin_status === 'I' && i.lvye_report_in_status && i.lvye_report_in_status === 'PENDING ' ? dom += ` <span style="float:right;margin-left:5px;">(旅业正在上传)</span>` : null
              dom += `<span style="float: right">${i.name}</span>`;
              dom += `</p></div>`
            })
            : dom += `<div>无入住人</div>`
        } else {
          dom += `<div>无入住人</div>`
        }
        dom += `<p>
                 <span style="color:  #8A8A8A">入离时间</span>
                 <span style="float: right">${this.datetimeparse(item.in_time, 'YYMMDD')} - ${this.datetimeparse(item.out_time, 'YYMMDD')}</span>
               </p>`
        return dom
      },
      checkoutCellTitle(item) {
        let tag = this.getUnionTag(item.union_tag, item.room_number);
        return `<p><span class="cell-value">${item.room_number} ${item.room_type_name}${this.getBreakFast(item.breakfast)}${tag ? '(联' + tag + ')' : ''}</span><span class="cell-right gray">${this.datetimeparse(item.created_time, this.isCompleted ? 'MMddhhmm' : 'hhmm')}</span></p>`
      },
      getCheckoutGuestItem(item) {
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
        if (item.status) {
          if (!(item.status.checkout_success && item.status.refund_success && item.status.lvye_checkout_success)) {
            dom += `<div style="display: flex;color: #DF4A4A;line-height: 2;justify-content: flex-start">`;
            if (!item.status.checkout_success) dom += `<span style="margin-right:10px">退房失败</span>`;
            if (!item.status.refund_success) dom += `<span style="margin-right:10px">退款失败</span>`;
            if (!item.status.lvye_checkout_success) dom += `<span style="margin-right:10px">旅业系统上传失败</span>`;
            dom += `</div>`;
          }
        }
        return dom
      },
      getLeaveItem(item) {
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
        if (item.status) {
          dom += `<div style="display: flex;color: #DF4A4A;line-height: 2;justify-content: flex-start">`;
          if (item.status.lvye_checkout_status && item.status.lvye_checkout_status === 'NONE') dom += `<span style="margin-right:10px">未上传旅业系统</span>`;
          if (item.status.lvye_checkout_status && item.status.lvye_checkout_status === 'FAILED') dom += `<span style="margin-right:10px">旅业系统上传失败</span>`;
          dom += `</div>`;

        }
        return dom
      },
      getUnionTag(tag, tempRoom) {
        return this.unionTag.filter(i => i.tag === tag)[0].room_number.filter(i => i !== tempRoom).join(',')
      },
      resetFilter() {
        console.log('resetFilter');
        this.periodFilter = [null, null]
      },
      titleFilter(index) {
        return
        // return index
        //   ? this.datetimeparse(this.renderList[index].created_time) === this.datetimeparse(this.renderList[index - 1].created_time)
        //     ? null : this.datetimeparse(this.renderList[index].created_time)
        //   : this.datetimeparse(this.renderList[index].created_time)
      },
//      syncTime() {
//        this.hotelrefresh({
//          onsuccess: (body) => this.refreshList()
//        })
//      },
      getList(callback) {
        if (this.tempPage == '预登记') {
          this.gettodaylist({
            is_cancelled: 0,
            is_sequence: 0,
            onsuccess: callback
          })
        } else if (this.tempPage == '在住') {
          this.getTodaySuborder({
            onsuccess: callback
          })
        } else if (this.tempPage == '退房申请') {
          this.getcheckoutlist({
            status: 'PENDING',
            start_time: this.periodFilter[0],
            end_time: this.periodFilter[1],
            onsuccess: callback
          });
        } else if (this.tempPage == '已离店') {
          this.outList(false);
        }
      },
      initList() {
        if (this.renderPageIndex === 0 || this.renderList.length == 0) {
          this.gettodaylist({
            is_cancelled: 0,
            is_sequence: 0,
            onsuccess: body => (this.preCheckInList = [...body.data], this.preCheckInPageIndex++)
          });
          this.getTodaySuborder({
            onsuccess: body => (this.liveInList = [...body.data], this.liveInPageIndex++)
          });
          this.getcheckoutlist({
            status: 'PENDING',
            start_time: this.periodFilter[0],
            end_time: this.periodFilter[1] ? this.periodFilter[0] == this.periodFilter[1] ? this.periodFilter[1] + 86400000 : this.periodFilter[1] : '',
            onsuccess: body => (this.checkOutApplicationList = [...body.data], this.checkOutApplicationPageIndex++)
          });
          //已经离店
          this.outList(false);
        }
      },
      //已离店列表
      outList(isPullup) {
        let roomTypeValue='';
        roomTypeValue=this.roomType[0];
        this.getOutlist({
          data: {
            "filter": "OUT",
            "room_no": this.filterRoomVal || "",//房间号
            "pms_room_type_id":roomTypeValue ||"",//PMS房型的ID
            "guest_name": this.guestName || "",//入住人名称
            "out_start_time": this.periodFilter[0] || "",//入住时间
            "out_end_time": this.periodFilter[1]?this.periodFilter[1] + 86400000 :"",//离店时间
            "order_by":"out_time",//通过哪种时间排序 in_time, out_time
            "desc":true,
          },
          offset: this.offset || 0,
          onsuccess:(body,headers)=> {
            // this.checkOutTotal=headers.map['x-total-count'][0];
            this.checkOutTotal=172;
            if(isPullup){
              this.checkOutList = [...this.checkOutList,...body.data];
            }else if(!isPullup){
              this.checkOutList=[...body.data];
              this.$nextTick(() => {
                this.$refs.scrollerBottom.reset();
              });
            }
            console.log('list:',this.renderList)
          }
        });
      },
      //下拉刷新列表，按需加载
      refresh(){
        let off=this.checkOutTotal-this.offset;
        if (this.onFetching||off<5) {
          console.log('不能再请求了')
          return;
        }else{
          this.onFetching = true;
          setTimeout(() => {
            if (this.tempPage == '已离店'){
              this.offset=this.offset+5;
              this.outList(true);
            }else {
              return;
            };
            console.log('第'+this.offset+'起');
            this.scrollerStatus.pullupStatus = 'default';
            //$nextTick是为了数据改变了等待dom渲染后使用
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset();
            });
            this.onFetching = false
          }, 500);
        }
      },
      refreshList() {
        if (this.tempPage == '预登记') {
//          this.resetList();
          this.getList(body => this.preCheckInList = [...body.data]);
        } else if (this.tempPage == '在住') {
//          this.resetList();
          this.getList(body => this.liveInList = [...body.data]);
        } else if (this.tempPage == '退房申请') {
//          this.resetList();
          this.getList(body => this.checkOutApplicationList = [...body.data]);
        } else if (this.tempPage == '已离店') {
//          this.resetList();
          this.getList();
        }
      },
      resetList() {
        if (this.tempPage == '预登记') {
          this.preCheckInList = [];
        } else if (this.tempPage == '在住') {
          this.liveInList = [];
        } else if (this.tempPage == '退房申请') {
          this.checkOutApplicationList = [];
        } else if (this.tempPage == '已离店') {
          this.checkOutList = [];
        }
      },
      searchRoomType() {
        this.roomList1=[{name:'全部房型',value:''}];
        this.roomList=[];
        this.searchRoom({
          onsuccess: body => {
            let list = body.data;
            list.forEach((item, index) => {
              this.roomList1.push({name: item.room_type_name,value:item.room_type_id});
            });
              this.roomList.push(this.roomList1);
              console.log('房型',this.roomList)
          }
        })
      }
    },
    mounted() {
      this.initList();
    },

  }
</script>
<style lang="less">
  .dialog .weui-dialog{
    text-align: left;
  }
  .weui-dialog__bd{
    padding-left: 0rem;
  }
  .invoiceBtn{
    width: 49%;
    height: 2rem;
    float: left;
    border-top: 1px solid #EEEEEE;
    padding-top: 1rem;
    text-align: center;
  }
  .invoiceBtn:nth-child(2){
    border-left: 1px solid #EEEEEE;
    color: #22AAFF;
  }
  .dialog .filterTop{
    margin-left: 1rem;
    text-align: left;
    padding-top: 0.5rem;
    font-size: 16px;
    margin-bottom: -0.6rem;
  }
  .dialog .weui-cells{
    font-size: 14px;
  }
  .dialog .vux-popup-dialog{
    z-index: 5001;
  }
</style>
