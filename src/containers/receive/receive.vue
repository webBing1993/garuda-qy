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
        <!--<p class="synchronize">-->
        <!--<x-button mini value="同步" @onClick="syncTime"></x-button>-->
        <!--上次同步PMS时间: {{hotel.order_update_time ? datetimeparse(hotel.order_update_time, 'MMDDhhmm') : ''}}-->
        <!--</p>-->
        <div v-show="(!renderList||renderList.length === 0) && renderPageIndex>0" class="no-data">暂无数据</div>

        <!--预登记-->
       <div class="list-wrapper" v-if="tempPage == '预登记'">
        <Group  v-for="(item,index) in renderList" :key="index">
          <Cell :title="preCheckInCellTitle(item)"/>
          <Cell :title="preCheckInCellBody(item)" link
                @onClick="goto('/receive/precheckin-detail/' + item.order_id)"/>
        </Group>
       </div>
         <!--在住-->
       <div class="list-wrapper" v-if="tempPage == '在住'">
        <!--<scroller  :pullup-config="Interface.scrollerUp" @on-pullup-loading="refreshLiveIn" lock-x use-pullup height="-40"-->
                  <!--v-model="scrollerStatusLiveIn" scrollbarY bounce ref="scrollerBottom1">-->
          <div style="margin-bottom: 4rem">
              <div class="rowCont" v-for="(item,index) in renderList" :key="index">
               <div class="cell-title-content">
                 <div class="cell-value">
                   <span>{{item.room_number}}</span>
                   <span>{{item.room_type_name}}</span>
                   <span> {{getBreakFast(item.breakfast)}}</span>
                   <span v-html="_liveInCellTitleGetuni(item)"></span>
                 </div>
                 <div class="cell-title-right">
                   <div class="cell-right gray">{{datetimeparse(item.in_time, this.isToday ? 'hhmm' : 'MMddhhmm')}}</div>
                   <div class="array-right" @click="goto('/receive/livein-detail/'+item.order_id+'/'+item.room_number)"></div>
                 </div>
               </div>
              <div class="space"></div>
              <div class="rowItem" v-for="(i,k) in item.guests" :key="k">
                <p>入住人:</p>
                <div class="liveInPeop">
                  <span>{{i.name}}</span>
                  <span v-if="i.checkin_status && i.checkin_status === 'R'">(尚未入住)</span>
                  <span v-if="i.checkin_status && i.checkin_status === 'PMS'">(pms转入住)</span>
                  <span class="LvReportFaile"
                        v-if="i.checkin_status && i.checkin_status === 'I' && i.lvye_report_in_status && i.lvye_report_in_status === 'FAILED'">(旅业上传失败)</span>
                  <span class="LvReport"
                        v-if="i.checkin_status && i.checkin_status === 'I'&&i.lvye_report_in_status && i.lvye_report_in_status === 'SUCCESS'">(旅业已上报)</span>
                  <span class="LvReportIng"
                        v-if="i.checkin_status && i.checkin_status === 'I'&&i.lvye_report_in_status && i.lvye_report_in_status === 'PENDING'">(旅业正在上传)</span>
                  <img @click="confirmDelete(i)" v-if="i.checkin_status && i.checkin_status === 'R'"
                       src="../../../static/icon/delete.png" alt="">
                </div>
              </div>
              <div class="comTime">
                <span style="color:  #8A8A8A">入离时间:</span>
                <span
                  style="float: right">{{datetimeparse(item.in_time, 'YYMMDD')}} - {{datetimeparse(item.out_time, 'YYMMDD')}}</span>
              </div>
              <div
                v-if="(refundPathway=='MANUAL'&& hotel_config_can_REfend!='false' && item.order.is_paid &&!item.order.has_refund_apply)||(refundPathway=='MANUAL'&& hotel_config_can_REfend=='false' && item.order.cash_pledge && item.order.cash_pledge!=0 && item.order.is_paid &&!item.order.has_refund_apply)">
                <x-button value="退款" @onClick="showTK(item)" v-if="tkBtnHide">退款</x-button>
              </div>
            </div>
          </div>
        <!--</scroller>-->
       </div>
        <!--退房申请-->
        <!--<div class="spaceTopApply"></div>-->
        <!--<div class="list-wrapper" v-if="tempPage == '退房申请'">-->
          <!--<Group  v-for="(item,index) in renderList" :key="index"-->
                 <!--:title="titleFilter(index)">-->
            <!--<Cell :title="checkoutCellTitle(item)"/>-->
            <!--<Cell :title="getCheckoutGuestItem(item)" link-->
                  <!--@onClick="goto('/receive/checkout-application-detail/'+item.order_id+'/'+item.room_number)"/>-->
            <!--<div class="appalyBtn"-->
                 <!--v-if="(refundPathway=='MANUAL'&& hotel_config_can_REfend!='false' && item.order.is_paid &&!item.order.has_refund_apply)||(refundPathway=='MANUAL'&& hotel_config_can_REfend=='false' && item.order.cash_pledge && item.order.cash_pledge!=0 && item.order.is_paid &&!item.order.has_refund_apply)">-->
              <!--<x-button value="退款" @onClick="showTK(item)" v-if="tkBtnHide">退款</x-button>-->
            <!--</div>-->
          <!--</Group>-->
        <!--</div>-->

        <!--已离店-->
        <div  class="list-wrapper" v-if="tempPage == '已离店'">
          <!--<scroller   :pullup-config="Interface.scrollerUp" @on-pullup-loading="refreshLiveOut" lock-x use-pullup height="-40"-->
                    <!--v-model="scrollerStatusLiveOut" scrollbarY bounce ref="scrollerBottom2">-->
            <div style="margin-bottom: 4rem">
                <Group  v-for="(item,index) in renderList" :key="index"
                       :title="datetimeparse(item.out_time,'YYMMDD')">
                  <Cell :title="checkoutCellTitle(item,index)"/>
                  <Cell :title="getLeaveItem(item)" link
                        @onClick="goto('/receive/checkout-detail/'+item.order_id+'/'+item.room_number)"/>
                </Group>
            </div>
          <!--</scroller>-->
        </div>

    <!--//筛选按钮-->
    <footer>
      <div class="listFilter">
        <!--<span class="filter" @click="showDialog = true">-->
        <span class="filter" @click="_filtrate">
          <abbr>筛选</abbr>
        </span>
      </div>
    </footer>

    <!--筛选弹窗-->
    <div class="receiveDialog">

      <Dialog v-if="tempPage == '预登记'" v-model="showDialog"
                :hide-on-blur=false
                mask-z-index="1">
        <p class="filterTop">筛选</p>
        <group>
          <x-input @on-focus="inputShow" title="姓名：" v-model="preName" novalidate placeholder="请输入筛选人姓名"
                   :show-clear="true"
                   placeholder-align="right"></x-input>
          <x-input @on-focus="inputShow" title="分享码：" v-model="preCode" novalidate placeholder="请输入分享码"
                   :show-clear="true"
                   placeholder-align="right"></x-input>
          <x-input @on-focus="inputShow" title="订单号：" v-model="preNum" novalidate placeholder="请输入筛选人订单号"
                   :show-clear="true"
                   placeholder-align="right"></x-input>
          <x-input @on-focus="inputShow" title="手机号码：" v-model="preTel" novalidate placeholder="请输入筛选人手机号"
                   :show-clear="true"
                   placeholder-align="right"></x-input>
          <div>
            <div class="invoiceBtn" @click=cancel>取消</div>
            <div class="invoiceBtn" @click=confirmHandle>确定</div>
          </div>
        </group>
      </Dialog>

      <Dialog v-if="tempPage == '在住'" v-model="showDialog"
                :hide-on-blur=false
                mask-z-index="1">
        <p class="filterTop">筛选</p>
        <group>
          <x-input @on-focus="inputShow" title="姓名：" v-model="preName" novalidate placeholder="请输入筛选人姓名"
                   :show-clear="true"
                   placeholder-align="right"></x-input>
          <x-input @on-focus="inputShow" title="房间号：" v-model="live_RoomNum" novalidate placeholder="请输入筛选人房号"
                   :show-clear="true"
                   placeholder-align="right"></x-input>
          <div>
            <div class="invoiceBtn" @click=cancel>取消</div>
            <div class="invoiceBtn" @click=confirmHandle>确定</div>
          </div>
        </group>
      </Dialog>

      <Dialog v-if="tempPage == '退房申请'" v-model="showDialog"
                :hide-on-blur=false
                mask-z-index="1">
        <p class="filterTop">筛选</p>
        <group>
          <x-input @on-focus="inputShow" title="姓名：" v-model="preName" novalidate placeholder="请输入筛选人姓名"
                   :show-clear="true"
                   placeholder-align="right"></x-input>
          <x-input @on-focus="inputShow" title="房间号：" v-model="live_RoomNum" novalidate placeholder="请输入筛选人房号"
                   :show-clear="true"
                   placeholder-align="right"></x-input>
          <div>
            <div class="invoiceBtn" @click=cancel>取消</div>
            <div class="invoiceBtn" @click=confirmHandle>确定</div>
          </div>
        </group>
      </Dialog>

      <Dialog v-if="tempPage == '已离店'" v-model="showDialog"
                :hide-on-blur=false
                mask-z-index="1">
        <p class="filterTop">筛选</p>
        <group>
          <x-input @on-focus="inputShow" title="房号" novalidate placeholder="请输入房号" :show-clear="true"
                   placeholder-align="left" v-model="filterRoomVal"></x-input>
          <x-input @on-focus="inputShow" title="入住人" novalidate placeholder="请输入住人姓名" :show-clear="true"
                   placeholder-align="left" v-model="guestName"></x-input>
          <popup-picker show-name
                        :show=isShowPP
                        hide-on-deactivated
                        :popup-style="{'z-index':'5002','max-height':'235px'}"
                        :title="roomTitle"
                        :data="roomList"
                        v-model=roomType
                        @on-show="popupShow"></popup-picker>
          <cell title="起始日期" @onClick="isCalendarShow = true" link
                :value="datetimeparse(periodFilter[0],'YYMMDD')"></cell>
          <cell title="截止日期" @onClick="isCalendarShow = true" link
                :value="datetimeparse(periodFilter[1],'YYMMDD')"></cell>
          <div>
            <div class="invoiceBtn" @click=cancel>取消</div>
            <div class="invoiceBtn" @click=confirmHandle>确定</div>
          </div>
        </group>
      </Dialog>
    </div>
    <!--日历控件-->
    <popup hide-on-deactivated :popup-style="{'z-index':'5003','borderTop':'1px solid #eeeeee'}"
           v-model="isCalendarShow"
           bottom
           animationTopBottom>
      <calendar v-model="periodFilter" @onReset="resetFilter" @onCancel="isCalendarShow = false"></calendar>
    </popup>

    <!--确认删除-->
    <div v-if="confirmDeleteDialog" class="conformDialog">
      <div class="mask"></div>
      <div class="dialogCont">
        <div>确认删除"{{deleteName}}"</div>
        <div class="space"></div>
        <div>
          <p @click="confirmDeleteDialog=false">取消</p>
          <span></span>
          <p @click="_makeSureDelete()">确定</p>
        </div>
      </div>
    </div>

    <!--确定退款弹框-->
    <div v-if="tkDialog" class="conformDialog">
      <div class="mask"></div>
      <div class="tkDialogCont" v-if="tkCont1">
        <div class="close1" @click="_closeDialog()">
          <img src="../../../static/icon/close.png" alt="">
        </div>
        <p>是否已在PMS里录入 <br>该房间的消费</p>
        <x-button value="确定" @onClick="_changeTkDialogCont()"></x-button>
      </div>

      <div class="tkDialogCont" v-if="tkCont2">
        <div class="close1" @click="_closeDialog()">
          <img src="../../../static/icon/close.png" alt="">
        </div>
        <!--单房状态-->
        <div>
          <p>退款金额</p>
          <x-input placeholder-align="left" v-model="tkMoney" :is-type="numCheck"></x-input>
          <!--<x-input title="必须输入2333" :is-type="be2333" placeholder="I'm placeholder"></x-input>-->
          <!--<input type = "text" name= "price" id = 'price' onkeyup= "if( ! /^d*(?:.d{0,2})?$/.test(this.value)){alert('只能输入数字，小数点后只能保留两位');this.value='';}" />-->
          <p class="tip">如对退款金额有异议，请手动输入</p>
          <x-button value="确定" v-if="/^[0-9]+([.]{1}[0-9]{1})?$/.test(tkMoney)"
                    @onClick="_changeTkDialogCont1()"></x-button>
        </div>
        <!--联房状态-->
        <!--<div>-->
        <!--<p class="lfTip">该房间处于联房状态<br>退款将在最后一个房间退房时退款</p>-->
        <!--<x-button value="确定" @onClick="_changeTkDialogCont1()"></x-button>-->
        <!--</div>-->

        <!--退款大于押金状态-->
        <!--<div class="DisableBtn">-->
        <!--<p class="tip">退款金额大于押金</p>-->
        <!--<x-button value="确定"></x-button>-->
        <!--</div>-->
      </div>

      <div class="tkDialogCont" v-if="tkCont3">
        <div class="close1" @click="_closeDialog()">
          <img src="../../../static/icon/close.png" alt="">
        </div>
        <div class="isOk">
          <img src="../../../static/icon/right.png" alt="">
        </div>
        <p>操作完成</p>
        <p class="miniTip">该房处于联房状态，请PMS手动退款</p>
      </div>
    </div>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
   import {Scroller, XDialog, Group, PopupRadio, XInput, PopupPicker, Picker, Popup} from 'vux'
  export default {
    name: 'receive',
    components: {
      XDialog,
      Group,
      PopupRadio,
      XInput,
      PopupPicker,
      Picker,
      Popup,
      Scroller
    },
    data() {
      return {
        isShowPP: false,
        scrollerStatusLiveIn: {pullupStatus: 'default'},
        scrollerStatusLiveOut: {pullupStatus: 'default'},
        onFetching1: false,
        onFetching2: false,
        flag: false,
        guestName: '',
        filterRoomVal: '',
        roomList: [],
        roomList1: [],
        roomType: [],
        showDialog: false,
        isCalendarShow: false,
        offset1: 0,
        offset2:0,
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
        roomTitle: "房型",
        checkOutTotal: 0,
          liveInTotal:0,
        confirmDeleteDialog: false,
        deleteName: '',
        guest_id: '',
        i: false,
        tkDialog: false,
        tkCont1: true,
        tkCont2: false,
        tkCont3: false,
        tkBtnHide: true,
        preName: '',
        preCode: '',
        preTel: '',
        preNum: '',
        live_RoomNum: '',
        tkMoney: '',
        orderId: '',
        suborderId: '',
        canuse: true,
        hotel_config_can_REfend: '',
        refundPathway: '',
        showRefundBtn: [],
        numCheck: function (value) {
          return {
//            valid: value.toFixed(1),
//            valid: !/^d*(?:.d{0,1})?$/.test(value),
            valid: /^[0-9]+([.]{1}[0-9]{1})?$/.test(value),
            msg: '请输入含一位小数的字符',
          }
        }
      }
    },
    watch: {
      isCalendarShow(val) {
        if (val) {
          this.isShowPP = false;
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
        menu[1] = `在住(${this.liveInTotal})`;
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
            // return this.liveInList
          return this.sortByTime(this.liveInList, 'in_time');
          return sortLiveInList;
        } else if (this.tempPage == '退房申请') {
          return this.sortByTime(this.checkOutApplicationList, 'created_time');
          return sortCheckOutApplicationList;
        } else if (this.tempPage == '已离店') {
          return this.sortByTime(this.checkOutList, 'created_time');
        }
      },

      LiveInRenderList(){
//        this.sortByTime(this.liveInList, 'in_time');
//        let guests=[]
//        this.liveInList.map((item,index)=>{
//         guests.push(item.guests)
//        })
        let guests = []

        for (let i = 0; i < this.liveInList.length; i++) {
          guests.push(this.liveInList[i].guests[0])
        }
        return guests
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
      },
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
        'getOutlist',
        'deleteAbsentPerson',
        'applicationRefund',
        'getLiveINlist'
      ]),

      //标题项时间处理
      titleFilter(index) {
        if (this.tempPage == '已离店') {
          if (index && this.renderList.length > 0) {
            if (this.datetimeparse(this.renderList[index].out_time) === this.datetimeparse(this.renderList[index - 1].out_time)) {
              return null
            } else {
              return this.datetimeparse(this.renderList[index].out_time);
            }
          } else {
            return this.datetimeparse(this.renderList[index].out_time);
          }
        }
      },

      inputShow(){
        this.isCalendarShow = false;
        this.isShowPP = false;
      },
      //筛选确定处理
      confirmHandle() {
        this.showDialog = false;
        this.isCalendarShow = false;
        this.offset1 = 0;
        if (this.tempPage == '预登记') {
          this.gettodaylist({
            is_cancelled: 0, //是否取消
            is_sequence: 0,// 依据precheckin_done false:默认倒序 true:正序
            like_owner: this.preName,//预定人
            like_owner_tel: this.preTel,//预定电话
            like_order_no: this.preNum,//订单号
            like_auth_code: this.preCode,//分享码
            onsuccess: body => (this.preCheckInList = [...body.data], this.preCheckInPageIndex++)
          });
        }
        else if (this.tempPage == '在住') {
          this.liveInList = []
          this.getOutlist({
            data: {
              "filter": "IN",
              "guest_name": this.preName,
              room_no: this.live_RoomNum || "",
            },
            offset: this.offset1 || 0,
            onsuccess: body => (this.liveInList = [...body.data.content], this.liveInPageIndex++)
          });
          this.preName = '';
          this.live_RoomNum = ''
        }
        else if (this.tempPage == '退房申请') {
          this.getcheckoutlist({
            status: 'PENDING',
            guest_name: this.preName,//入住人名称
            room_no: this.live_RoomNum || "",
            onsuccess: body => (this.checkOutApplicationList = [...body.data], this.checkOutApplicationPageIndex++)
          })
        }
        else if (this.tempPage == '已离店') {
          this.outList(false);
        }
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
              this.$nextTick(() => {
                  this.$refs.scrollerBottom1.reset({top:0});
              });
            break;
          case '退房申请':
            this.replaceto('/receive/checkout-application');
            break;
          case '已离店':
            this.replaceto('/receive/checkout');
            this.$nextTick(() => {
                this.$refs.scrollerBottom2.reset({top:0});
            });
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
          `<p><span class="cell-key">分享码：</span><span style="color: #32ABE5" class="cell-value">${item.share_code ? item.share_code : '暂无分享码'}</span></p>` +
          `</div>`
      },
      _liveInCellTitleGetuni(item){
        let tag = this.getUnionTag(item.union_tag, item.room_number);
        return `${tag ? '(联' + tag + ')' : ''}`
      },
      // liveInGuestItem(item) {
      //   let dom = ``;
      //   if (item.guests) {
      //     item.guests.length > 0
      //       ? item.guests.forEach(i => {
      //
      //       dom += `<div style="color: #4a4a4a;justify-content: space-between;line-height: 2;">
      //               <p><span style="color:  #8A8A8A">入住人</span>`
      //       i.checkin_status && i.checkin_status === 'R' ? dom += ` <span style="float:right;margin-left:5px;">(尚未入住)</span>` : null
      //       i.checkin_status && i.checkin_status === 'I' && i.lvye_report_in_status && i.lvye_report_in_status === 'FAILED' ? dom += ` <span style="float:right;margin-left:5px;color:#FFB01F;">(旅业上传失败)</span>` : null
      //       i.checkin_status && i.checkin_status === 'I' && i.lvye_report_in_status && i.lvye_report_in_status === 'SUCCESS' ? dom += ` <span style="float:right;margin-left:5px;color:#86E85E;">(旅业已上报)</span>` : null
      //       i.checkin_status && i.checkin_status === 'I' && i.lvye_report_in_status && i.lvye_report_in_status === 'PENDING ' ? dom += ` <span style="float:right;margin-left:5px;">(旅业正在上传)</span>` : null
      //       dom += `<span style="float: right">${i.name}</span>`;
      //       dom += `</p></div>`
      //     })
      //       : dom += `<div>无入住人</div>`
      //   } else {
      //     dom += `<div>无入住人</div>`
      //   }
      //   dom += `<div>
      //            <span style="color:  #8A8A8A">入离时间</span>
      //            <span style="float: right">${this.datetimeparse(item.in_time, 'YYMMDD')} - ${this.datetimeparse(item.out_time, 'YYMMDD')}</span>
      //          </div>`
      //   return dom
      // },

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
        this.periodFilter = [null, null]
      },


      titleFilter(index) {
        return
      },

      initList() {
        if (this.renderPageIndex === 0 || this.renderList.length == 0) {
          this.prePayList();
          this.getLiveInList();
          this.ChechOutAppl();
          this.outList();
        }
      },

//      获取预登记列表
      prePayList(){
        this.gettodaylist({
          is_cancelled: 0,
          is_sequence: 0,
          onsuccess: body => (this.preCheckInList = [...body.data], this.preCheckInPageIndex++)
        });
      },

//      获取退房申请列表
      ChechOutAppl(){
        this.getcheckoutlist({
          status: 'PENDING',
          start_time: this.periodFilter[0],
          end_time: this.periodFilter[1] ? this.periodFilter[0] == this.periodFilter[1] ? this.periodFilter[1] + 86400000 : this.periodFilter[1] : '',
          onsuccess: body => (this.checkOutApplicationList = [...body.data.content],
            this.hotel_config_can_REfend = body.data.config.enable_out_of_cash_pledge_refund,
            this.refundPathway = body.data.config.refund_amount_source,
            this.checkOutApplicationPageIndex++)
        });
        for(let i=0;i<this.checkOutApplicationList.length;i++){
          this.checkOutApplicationList[i]['hotel_config_can_REfend']=this.hotel_config_can_REfend
          this.checkOutApplicationList[i]['refundPathway']=this.refundPathway
        }
        console.log('退房申请列表是', this.checkOutApplicationList)
      },

       //获取在住列表
        getLiveInList(isPullup){
          let _this=this;
            this.getLiveINlist({
                data: {
                    "filter": "IN",
                    "guest_name": this.preName,
                    room_no: this.live_RoomNum || ""
                },
                offset: this.offset2 || 0,
                onsuccess: (body, headers) => {
                    this.liveInTotal = headers.get('x-total-count');
                    if (isPullup) {
                        if(!body.data.content||body.data.content.length==0) {
                            _this.scrollerStatusLiveIn.pullupStatus = 'disabled';
                        }else {
                            _this.liveInList = [..._this.liveInList, ...body.data.content];
                            _this.scrollerStatusLiveIn.pullupStatus = 'default';
                            //$nextTick是为了数据改变了等待dom渲染后使用
                            _this.$nextTick(() => {
                                _this.$refs.scrollerBottom2.reset();
                            });
                        }
                        _this.onFetching1 = false;
                    } else if (!isPullup) {
                        _this.liveInList = [...body.data.content];
                        _this.scrollerStatusLiveIn.pullupStatus = 'enabled';
                    };
                }
            })
        },
        //已离店列表
        outList(isPullup) {
            let _this=this;
          let roomTypeValue = '';
          roomTypeValue = this.roomType[0];
          this.getOutlist({
            data: {
              "filter": "OUT",
              "room_no": this.filterRoomVal || "",//房间号
              "pms_room_type_id": roomTypeValue || "",//PMS房型的ID
              "guest_name": this.guestName || "",//入住人名称
              "out_start_time": this.periodFilter[0] || "",//入住时间
              "out_end_time": this.periodFilter[1] ? this.periodFilter[1] + 86400000 : "",//离店时间
              "order_by": "out_time",//通过哪种时间排序 in_time, out_time
              "desc": true,
            },
            offset: this.offset1 || 0,
            onsuccess: (body, headers) => {
              this.checkOutTotal = headers.get('x-total-count');
              if (isPullup) {
                  if(body.data.content=null||body.data.content.length==0) {
                      _this.scrollerStatusLiveOut.pullupStatus = 'disabled';
                  }else {
                      console.log('11,:',_this.checkOutList)
                      _this.checkOutList = [..._this.checkOutList,...body.data.content];
                      console.log('333:',_this.checkOutList)
                      _this.scrollerStatusLiveOut.pullupStatus = 'default';
                      //$nextTick是为了数据改变了等待dom渲染后使用
                      _this.$nextTick(() => {
                          _this.$refs.scrollerBottom1.reset();
                      });
                  }
                  _this.onFetching2 = false;
              } else if (!isPullup) {
                  _this.checkOutList = [...body.data.content];
                  _this.scrollerStatusLiveOut.pullupStatus = 'enabled';
              };
                console.log('_this.checkOutList:',_this.checkOutList)
            }
          });
        },

      //下拉刷新离店列表，按需加载
      refreshLiveOut(){
        let off1 = this.checkOutTotal - this.offset1;
        if (this.onFetching1 || off1 < 5) {
          console.log('不能再请求了')
          return;
        } else {
          this.onFetching1 = true;
          setTimeout(() => {
            if (this.tempPage == '已离店' ) {
              this.offset1 = this.offset1 + 5;
              this.outList(true);
            }else {
              return;
            };
            console.log('第' + this.offset1 + '起');
          }, 500);
        }
      },
        //下拉刷新在住列表，按需加载
        refreshLiveIn(){
            let off2= this.liveInTotal - this.offset2;
            if (this.onFetching2 ||off2 < 5) {
                console.log('不能再请求了')
                return;
            } else {
                this.onFetching2 = true;
                setTimeout(() => {
                    if(this.tempPage == '在住'){
                        this.offset2 = this.offset2 + 5;
                        this.getLiveInList(true);
                    }else {
                        return;
                    };
                    console.log('第' + this.offset2+ '起');
                }, 500);
            }
        },

      refreshList(){
        this.offset1=0;
        if (this.tempPage == '预登记') {
          this.prePayList();
          return false;
        } else if (this.tempPage == '在住') {
          this.getLiveInList();
          return false;
        } else if (this.tempPage == '退房申请') {
          this.ChechOutAppl()
          return false;
        } else if (this.tempPage == '已离店') {
          this.outList();
          return false;
        }
      },
      searchRoomType() {
        this.roomList1 = [{name: '全部房型', value: ''}];
        this.roomList = [];
        this.searchRoom({
          onsuccess: body => {
            let list = body.data;
            list.forEach((item, index) => {
              this.roomList1.push({name: item.room_type_name, value: item.room_type_id});
            });
            this.roomList.push(this.roomList1);
            console.log('房型', this.roomList)
          }
        })
      },

      confirmDelete(i){
        this.confirmDeleteDialog = true
        this.guest_id = i.guest_id
        this.deleteName = i.name
      },

      _makeSureDelete(){
        this.confirmDeleteDialog = false
        this.deleteAbsentPerson(this.guest_id)
      },

      showTK(item){
        console.log('------->', item)
        if (this.tempPage == '在住') {
          this.tkDialog = true
          this.tkMoney = (item.order.cash_pledge * 0.01).toFixed(1)
          this.orderId = item.order.order_id
          this.suborderId = item.suborder_id
        } else if (this.tempPage == '退房申请') {
          this.tkDialog = true
          this.tkMoney = (item.order.cash_pledge * 0.01).toFixed(1)
          this.orderId = item.order.order_id
          this.suborderId = item.suborder_id
        }

      },

      _closeDialog(){
        this.tkDialog = false
        this.tkCont1 = true
        this.tkCont2 = false
        this.tkCont3 = false
      },

      _changeTkDialogCont(){
        this.tkCont1 = false
        this.tkCont2 = true
        this.tkCont3 = false
      },

//      确认退款按钮
      _changeTkDialogCont1(){
        let res = ''
        this.applicationRefund({
          orderId: this.orderId,//订单ID
          refundFee: parseFloat((this.tkMoney * 100).toFixed(2)),
//          refundFee:this.tkMoney/0.01,//退款金额(分)
          subOrderId: this.suborderId,
          onsuccess: body => (res = [...body])
        })
        this.tkDialog = false
        this.tkMoney = null
        console.log('res是', res)
        if (res.errcode == 0) {
          this.tkBtnHide = false;
        }
      },

//      筛选按钮
      _filtrate(){
        this.showDialog = true
      }

    },
    mounted() {
      this.initList();
    },

  }
</script>
<style lang="less" scoped>
  @import "./index.less";
  article{
    height: 100%;
    .list-wrapper{
      position: relative;
      margin-top: 3.5rem;
      padding-top: 0;
      padding-bottom: 0;
      margin-bottom: 2rem;
    }
  }
  .rowCont{
    font-size: 14px;
    .cell-value{
      font-size: 14px;
    }
    .cell-title-right{
      font-size: 14px;
    }
  }
</style>


