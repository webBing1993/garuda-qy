<template>
  <div class="home-container">
    <div class="app">
      <Group title="应用">
        <ul class="app-container">
          <li class="app-item" @click="appConfig?appConfig.identity_check_view?goto('/policeIdentity/handle/0'):'':flag?goto('/policeIdentity/handle/0'):''">
            <img :src='appConfig?appConfig.identity_check_view?imgList[0].openItem:imgList[0].closeItem:flag?imgList[0].openItem:imgList[0].closeItem' alt="身份核验">
            <span class="app-title">公安验证</span>
          </li>
          <li class="app-item" @click="appConfig?appConfig.order_view?goto('prepay/0'):'':flag?goto('prepay/0'):''">
            <img :src='appConfig?appConfig.order_view?imgList[1].openItem:imgList[1].closeItem:flag?imgList[1].openItem:imgList[1].closeItem' alt="订单中心">
            <span class="app-title">订单中心</span>
          </li>
          <li class="app-item" @click="appConfig?appConfig.room_status_view?goto('receive/precheckin'):'':flag?goto('receive/precheckin'):''">
            <img :src='appConfig?appConfig.room_status_view?imgList[2].openItem:imgList[2].closeItem:flag?imgList[2].openItem:imgList[2].closeItem' alt="接待服务">
            <span class="app-title">住离信息</span>
          </li>
          <li class="app-item" @click="appConfig?appConfig.check_in_identity_check_view?goto('/identity/0'):'':flag?goto('/identity/0'):''">
            <img :src='appConfig?appConfig.check_in_identity_check_view?imgList[3].openItem:imgList[3].closeItem:flag?imgList[3].openItem:imgList[3].closeItem' alt="公安验证">
            <span class="app-title">入住核验</span>
          </li>
          <li class="app-item" @click="appConfig?appConfig.invoice_view?goto('/invoice/0'):'':flag?goto('/invoice/0'):''">
            <img :src='appConfig?appConfig.invoice_view?imgList[4].openItem:imgList[4].closeItem:flag?imgList[4].openItem:imgList[4].closeItem' alt="闪开发票">
            <span class="app-title">发票中心</span>
          </li>
          <li class="app-item" @click="appConfig?appConfig.order_bill_view?goto('/bill/0'):'':flag?goto('/bill/0'):''">
            <img :src='appConfig?appConfig.order_bill_view?imgList[5].openItem:imgList[5].closeItem:flag?imgList[5].openItem:imgList[5].closeItem' alt="账务管理">
            <span class="app-title">账务管理</span>
          </li>
          <li class="app-item" @click="appConfig?appConfig.exception_view?goto('abnormalNotice/listDetail'):'':flag?goto('abnormalNotice/listDetail'):''">
            <img :src='appConfig?appConfig.exception_view?imgList[6].openItem:imgList[6].closeItem:flag?imgList[6].openItem:imgList[6].closeItem' alt="异常提醒">
            <span class="app-title">异常提醒</span>
          </li>
          <li class="app-item" @click="appConfig?appConfig.suspicious_person_view?goto('/suspicious/suspiciousList/0'):'':flag?goto('/suspicious/suspiciousList/0'):''">
            <img :src='appConfig?appConfig.suspicious_person_view?imgList[7].openItem:imgList[7].closeItem:flag?imgList[7].openItem:imgList[7].closeItem' alt="可疑人员">
            <span class="app-title">可疑人员</span>
          </li>
          <!--<li class="app-item" @click="appConfig?appConfig.recharge_view?goto('/recharge/0'):'':flag?goto('/recharge/0'):''">-->
            <!--<img :src='appConfig?appConfig.recharge_view?imgList[8].openItem:imgList[8].closeItem:flag?imgList[8].openItem:imgList[8].closeItem' alt="充值中心">-->
            <!--<span class="app-title">充值中心</span>-->
          <!--</li>-->
          <li class="app-item" @click="appConfig?appConfig.dirty_room_view?goto('/dirtyroom/0'):'':flag?goto('/dirtyroom/0'):''">
            <img :src='appConfig?appConfig.dirty_room_view?imgList[9].openItem:imgList[9].closeItem:flag?imgList[9].openItem:imgList[9].closeItem' alt="脏房处理">
            <span class="app-title">脏房处理</span>
          </li>
        </ul>
      </Group>
      <Group title="待办事项" v-if="isHaveTodoList">
        <Cell v-if="prepayTodoNum > 0" icon="./static/icon/ic_prepay_confirm.png" title="订单金额待确认" link
              :badge="prepayTodoNum"
              @onClick="goto('prepay/0')"></Cell>
        <Cell v-if="identityNum > 0" icon="./static/icon/ic_lvye.png" title="您有一条入住核验待处理" link
              :badge="identityNum"
              @onClick="goto('/identity/0')"></Cell>
        <Cell v-if="policeIdentityNum > 0" icon="./static/icon/ic_police.png" title="公安验证待处理" link
              :badge="policeIdentityNum+noCardCheckNum"
              @onClick="goto('policeIdentity/handle/0')"></Cell>
        <Cell v-if="invoiceNum > 0" icon="./static/icon/ic_invoice.png" title="开票申请待处理" link :badge="invoiceNum"
              @onClick="goto('invoice/0')"></Cell>
        <Cell v-if="checkoutApplicationNum > 0" icon="./static/icon/ic_checkout.png" title="离店申请待处理" link
              :badge="checkoutApplicationNum"
              @onClick="goto('receive/checkout-application')"></Cell>
        <Cell v-if="abnormalNoticeNum > 0" icon="./static/icon/abnormity.png" title="异常提醒" link
              :badge="abnormalNoticeNum"
              @onClick="goto('abnormalNotice/listDetail')"></Cell>
        <Cell v-if="absentPersonNum > 0" icon="./static/icon/ic_checkout.png" title="同住人未入住提醒" link
              :badge="absentPersonNum"
              @onClick="goto('notLiveIn/list')"></Cell>
        <Cell v-if="suspiciousNum > 0" icon="./static/icon/suspicious.png" title="可疑人员" link :badge="suspiciousNum"
              @onClick="goto('suspicious/suspiciousList/0')"></Cell>
        <Cell v-if="dirtyroomNum > 0" icon="./static/icon/clean.png" title="有脏房需要打扫" link :badge="dirtyroomNum"
              @onClick="goto('dirtyroom/0')"></Cell>
        <!--<Cell v-if="noCardCheckNum > 0" icon="./static/icon/ic_police.png" title="无证核验待处理" link :badge="noCardCheckNum"-->
              <!--@onClick="goto('policeIdentity/handle/0')"></Cell>-->
        <!--<Cell v-if="chargeNum > 0" icon="./static/icon/charge.png" title=" 金额不足，暂时没法使用，请及时充值" link :badge="chargeNum"-->
              <!--@onClick="goto('recharge/0')"></Cell>-->
      </Group>
      <div v-else class="none-list-container">
        <img :src="'./static/icon/no_todo_list.png'">
        <span>暂无待办事项</span>
      </div>
      <div class="tel"><a href="tel:4001-690-890" style="color: rgba(107, 107, 107, 0.82)">客服电话：4001-690-890</a></div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'home',
    data() {
      return {
        flag: true,
        appConfig:{},
        List: [],
        prepayTodoNum: 0,
        identityNum: 0,
        policeIdentityNum: 0,
        invoiceNum: 0,
        checkoutApplicationNum: 0,
        abnormalNoticeNum: 0,
        suspiciousNum:0,
        dirtyroomNum:0,
        absentPersonNum: 0,
        chargeNum:0,
        noCardCheckNum:0,
        imgList: [
          {
            openItem: './static/icon/ic_police.png',
            closeItem: './static/icon/closePolice.png'
          },
          {
            openItem: './static/icon/ic_prepay_confirm.png',
            closeItem: './static/icon/closePrepay.png'
          },
          {
            openItem: './static/icon/ic_checkout.png',
            closeItem: './static/icon/closeCheckout.png'
          },
          {
            openItem: './static/icon/ic_lvye.png',
            closeItem: './static/icon/closeLvye.png'
          },
          {
            openItem: './static/icon/ic_invoice.png',
            closeItem: './static/icon/closeInvoice.png'
          },
          {
            openItem: './static/icon/ic_bill.png',
            closeItem: './static/icon/closeBill.png'
          },
          {
            openItem: './static/icon/abnormity.png',
            closeItem: './static/icon/closeAbnormity.png'
          },
          {
            openItem:'./static/icon/suspicious.png',
            closeItem:'./static/icon/closeLvye.png'
          },
          {
            openItem: './static/icon/charge.png',
            closeItem: './static/icon/closeCharge.png'
          },
          {
            openItem: './static/icon/clean.png',
            closeItem: './static/icon/closeClean.png'
          }
        ]
      }
    },
    computed: {
      ...mapState([
        'hotel',
        'yunbaInstance',
        'yunbaConnected',
      ]),
      isHaveTodoList() {
        return this.prepayTodoNum > 0 ||
          this.identityNum > 0 ||
          this.policeIdentityNum > 0 ||
          this.invoiceNum > 0 ||
          this.checkoutApplicationNum > 0 ||
          this.abnormalNoticeNum > 0||
          this.absentPersonNum > 0||
          this.suspiciousNum>0||
          this.dirtyroomNum>0||
          this.chargeNum>0||
          this.noCardCheckNum>0
      }
    },
    methods: {
        ...mapActions ([
            'goto',
            'hoteltodolist',
            'yunbaConnect',
            'yunbaSubscribe',
            'yunbaUnsubscribe',
            'yunbaPublish',
            'setPublishCallback',
            'yunbaDisconnect',
            'getAppConfig',
            'getHotelConfig'
        ]),
        setPlay () {
            document.querySelector ('#audio').play ();
        },
        //获取待办事项列表
        getTodoList () {
            this.hoteltodolist ({
                onsuccess: body => {
                    let list = body.data;
                    list.forEach (i => {
                        if (i.type == 'PREPAY' && (this.appConfig ? this.appConfig.order_view : this.flag)) this.prepayTodoNum = i.total;
                        if (i.type == 'IDENTITY' && (this.appConfig ? this.appConfig.check_in_identity_check_view : this.flag)) this.identityNum = i.total;
                        if (i.type == 'LVYE' && (this.appConfig ? this.appConfig.identity_check_view : this.flag)) this.policeIdentityNum = i.total;
                        if (i.type == 'INVOICE' && (this.appConfig ? this.appConfig.invoice_view : this.flag)) this.invoiceNum = i.total;
                        if (i.type == 'CHECKOUT' && (this.appConfig ? this.appConfig.room_status_view : this.flag)) this.checkoutApplicationNum = i.total;
                        if (i.type == 'EXCEPTION' && (this.appConfig ? this.appConfig.exception_view : this.flag)) this.abnormalNoticeNum = i.total;
                        if (i.type == 'NOCHECKIN' && (this.appConfig ? this.appConfig.room_status_view : this.flag)) this.absentPersonNum = i.total;
                        if (i.type == 'SUS_PERSON' && (this.appConfig ? this.appConfig.recharge_view : this.flag)) this.chargeNum = i.total;
                        if (i.type == 'NOCARDCHECK' &&(this.appConfig ? this.appConfig.identity_check_view : this.flag)) this.noCardCheckNum = i.total;
                        if (i.type == 'DIRTY_ROOM' && (this.appConfig ? this.appConfig.dirty_room_view : this.flag)) this.dirtyroomNum = i.total;
                        if (i.type == 'NOCARDCHECK' &&(this.appConfig ? this.appConfig.identity_check_view : this.flag)) this.noCardCheckNum = i.total;
                    })
                }
            })
        },
        //获取酒店应用功能配置
        gethotelConfigs () {
            this.getHotelConfig ({
                onsuccess: body => {
                    try {
                        if (body.data) {
                            this.appConfig = JSON.parse (body.data);
                        }

                  }catch (err){
                      console.log('getHotelConfig:',err)
                  }
                  // console.log('2222:',JSON.parse(body.data))
              }
          });
          this.getAppConfig({
           onsuccess: body => {
               try {
                   if(body.data){
                       if(body.data.business_mode==='WQT'){
                           this.flag=true;
                       }else if(body.data.business_mode==='IDENTITY'){
                           this.flag=false;
                       }
                   }else {
                       this.flag=true;
                   }
               }catch(err) {
                   console.log('getConfig',err)
               }

             }
          });
      },
      subscribe() {
        this.yunbaSubscribe({
          info: {
            'topic': `hotels/${this.hotel.hotel_id}/todo`
          },
          subscribeCallback: () => {
            console.log('subscribe', `hotels/${this.hotel.hotel_id}/todo`);
            this.publishCallback();
          }
        })
      },
      publishCallback() {
        this.setPublishCallback({
          onSuccess: (body) => {
            console.log('---------收到云吧消息', JSON.parse(body.msg));
            let data = JSON.parse(body.msg);
            this.setPlay();
            if (data.type == 'PREPAY'&&(this.appConfig?this.appConfig.order_view:this.flag)) this.prepayTodoNum = data.total;
            if (data.type == 'IDENTITY'&&(this.appConfig?this.appConfig.check_in_identity_check_view:this.flag)) this.identityNum = data.total;
            if (data.type == 'LVYE'&&(this.appConfig?this.appConfig.identity_check_view:this.flag))this.policeIdentityNum = data.total;
            if (data.type == 'INVOICE'&&(this.appConfig?this.appConfig.invoice_view:this.flag)) this.invoiceNum = data.total;
            if (data.type == 'CHECKOUT'&&(this.appConfig?this.appConfig.room_status_view:this.flag)) this.checkoutApplicationNum = data.total;
            if (data.type == 'EXCEPITON'&&(this.appConfig?this.appConfig.exception_view:this.flag)) this.abnormalNoticeNum = data.total;
            if (data.type == 'NOCHECKIN'&&(this.appConfig?this.appConfig.room_status_view:this.flag)) this.absentPersonNum = data.total;
            if (data.type == 'SUS_PERSON'&&(this.appConfig?this.appConfig.suspicious_person_view:this.flag)) this.suspiciousNum = data.total;
            if (data.type == 'DIRTY_ROOM'&&(this.appConfig?this.appConfig.dirty_room_view:this.flag)) this.dirtyroomNum = data.total;
            if (data.type == 'RECHARGE'&&(this.appConfig?this.appConfig.recharge_view:this.flag)) this.chargeNum = data.total;
            if (i.type == 'NOCARDCHECK' &&(this.appConfig ? this.appConfig.identity_check_view : this.flag)) this.noCardCheckNum = data.total;

          }
        })
      },
//      云吧链接config
        init () {
            this.getTodoList ();
            this.gethotelConfigs()
            if (!this.yunbaConnected) {
                // this.yunbaConnect ();
            }
        },
    },
    mounted(){
      this.init();
    },
    watch: {
      yunbaConnected(val) {
        // val && this.subscribe()
      }
    },
    beforeDestroy() {
      if (this.yunbaConnected) {
        this.yunbaDisconnect({
          disconnectCallback: () => {
            console.log('unsubscribe');
            this.$store.commit('ISYUNBACONNECTED', false);
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import "./home.less";
</style>
