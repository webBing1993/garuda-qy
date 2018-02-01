<template>
  <div class="home-container">
    <div class="app">
      <Group title="应用">
        <ul class="app-container" >
          <li class="app-item" @click="goto('/policeIdentity/handle/0')">
            <img :src='flag?imgList[0].openItem:imgList[0].closeItem' alt="身份核验">
            <span class="app-title">公安验证</span>
          </li>
          <li class="app-item" @click="flag?goto('prepay/0'):''">
            <img :src='flag?imgList[1].openItem:imgList[1].closeItem' alt="订单中心">
            <span class="app-title">订单中心</span>
          </li>
          <li class="app-item" @click="flag?goto('receive/precheckin'):''">
            <img :src='flag?imgList[2].openItem:imgList[2].closeItem' alt="接待服务">
            <span class="app-title">住离信息</span>
          </li>
          <li class="app-item" @click="flag?goto('/identity/0'):''">
            <img :src='flag?imgList[3].openItem:imgList[3].closeItem' alt="公安验证">
            <span class="app-title">入住核验</span>
          </li>
          <li class="app-item" @click="flag?goto('/invoice/0'):''">
            <img :src='flag?imgList[4].openItem:imgList[4].closeItem' alt="闪开发票">
            <span class="app-title">发票中心</span>
          </li>
          <li class="app-item" @click="flag?goto('/bill/0'):''">
            <img :src='flag?imgList[5].openItem:imgList[5].closeItem' alt="账务管理">
            <span class="app-title">账务管理</span>
          </li>
          <li class="app-item" @click="flag?goto('abnormalNotice/listDetail'):''">
            <img :src='flag?imgList[6].openItem:imgList[6].closeItem' alt="异常提醒">
            <span class="app-title">异常提醒</span>
          </li>
        </ul>
      </Group>
      <Group title="待办事项" v-if="isHaveTodoList">
        <Cell v-if="prepayTodoNum > 0" icon="../../../static/icon/ic_prepay_confirm.png" title="订单金额待确认" link :badge="prepayTodoNum"
              @onClick="goto('prepay/0')"></Cell>
        <Cell v-if="identityNum > 0" icon="../../../static/icon/ic_lvye.png" title="您有一条入住核验待处理" link :badge="identityNum"
              @onClick="goto('/identity/0')"></Cell>
        <Cell v-if="policeIdentityNum > 0" icon="../../../static/icon/ic_police.png" title="公安验证待处理" link :badge="policeIdentityNum"
              @onClick="goto('policeIdentity/handle/0')"></Cell>
        <Cell v-if="invoiceNum > 0" icon="../../../static/icon/ic_invoice.png" title="开票申请待处理" link :badge="invoiceNum"
              @onClick="goto('invoice/0')"></Cell>
        <Cell v-if="checkoutApplicationNum > 0" icon="../../../static/icon/ic_checkout.png" title="离店申请待处理" link :badge="checkoutApplicationNum"
              @onClick="goto('receive/checkout-application')"></Cell>
        <Cell v-if="abnormalNoticeNum > 0" icon="../../../static/icon/ic_abnormity_notice.png" title="异常提醒" link :badge="abnormalNoticeNum"
              @onClick="goto('abnormalNotice/listDetail')"></Cell>
      </Group>
      <div v-else class="none-list-container">
        <img src="../../../static/icon/no_todo_list.png" alt="">
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
        flag:true,
        List: [],
        prepayTodoNum: 0,
        identityNum: 0,
        policeIdentityNum: 0,
        invoiceNum: 0,
        checkoutApplicationNum: 0,
        abnormalNoticeNum: 0,
        imgList:[
          {
            openItem:'../../../static/icon/ic_police.png',
            closeItem:'../../../static/icon/ic_police.png'
          },
          {
            openItem:'../../../static/icon/ic_prepay_confirm.png',
            closeItem:'../../../static/icon/closePrepay.png'
          },
          {
            openItem:'../../../static/icon/ic_checkout.png',
            closeItem:'../../../static/icon/closeCheckout.png'
          },
          {
            openItem:'../../../static/icon/ic_lvye.png',
            closeItem:'../../../static/icon/closeLvye.png'
          },
          {
            openItem:'../../../static/icon/ic_invoice.png',
            closeItem:'../../../static/icon/closeInvoice.png'
          },
          {
            openItem:'../../../static/icon/ic_bill.png',
            closeItem:'../../../static/icon/closeBill.png'
          },
          {
            openItem:'../../../static/icon/ic_abnormity_notice.png',
            closeItem:'../../../static/icon/closeAbnormity.png'
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
        return this.prepayTodoNum > 0 || this.identityNum > 0 || this.policeIdentityNum > 0 || this.invoiceNum > 0 || this.checkoutApplicationNum > 0||this.abnormalNoticeNum > 0
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'hoteltodolist',
        'yunbaConnect',
        'yunbaSubscribe',
        'yunbaUnsubscribe',
        'yunbaPublish',
        'setPublishCallback',
        'getConfig'
      ]),
      setPlay(){
        document.querySelector('#audio').play();
      },
      //获取待办事项列表
      getTodoList() {
        this.hoteltodolist({
          onsuccess: body => {
            let list = body.data;
            list.forEach(i => {
                if(i.type == 'PREPAY') this.prepayTodoNum = i.total;
                if(i.type == 'IDENTITY') this.identityNum = i.total;
                if(i.type == 'LVYE') this.policeIdentityNum = i.total;
                if(i.type == 'INVOICE') this.invoiceNum = i.total;
                if(i.type == 'CHECKOUT') this.checkoutApplicationNum = i.total;
                if(i.type == 'EXCEPTION') this.abnormalNoticeNum=i.total;
            })
          }
        })
      },
      gethotelConfig(){
        this.getConfig({
          onsuccess: body => {
            if(body.data){
              if(body.data.business_mode==='WQT'){
                this.flag=true;
              }else if(body.data.business_mode==='IDENTITY'){
                this.flag=false;
              }
            }
          }
        })
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
            console.log('---------  收到云吧消息',JSON.parse(body.msg));
            let data = JSON.parse(body.msg);
            this.setPlay();
            if(data.type == 'PREPAY') this.prepayTodoNum = data.total;
            if(data.type == 'IDENTITY') this.identityNum = data.total;
            if(data.type == 'LVYE') this.policeIdentityNum = data.total;
            if(data.type == 'INVOICE') this.invoiceNum = data.total;
            if(data.type == 'CHECKOUT') this.checkoutApplicationNum = data.total;
            if(data.type == 'EXCEPITON') this.abnormalNoticeNum = data.total;
           console.log(this.abnormalNoticeNum)
          }
        })
      },
//      云吧链接
      init() {
        this.getTodoList();
        this.gethotelConfig();
        if (!this.yunbaConnected) {
//          this.yunbaConnect();
        }
      }
    },
    mounted(){
      this.init();
    },
    watch: {
      yunbaConnected(val) {
        val && this.subscribe()
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
