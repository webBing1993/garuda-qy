<template>
  <article>
    <div class="wx-pay-container">
      <ul class="pay-list">
        <li class="list-item">
          <label class="item-left">房费</label>
          <span class="price-icon">￥</span>
          <input class="item-right room-fee" v-model="roomFee"/>
        </li>
        <li class="list-item">
          <label class="item-left">押金</label>
          <span class="price-icon">￥</span>
          <input class="item-right deposit" v-model="deposit"/>
        </li>
        <li class="list-item">
          <span class="item-left">总计：</span>
          <span class="item-right total-fee"><span class="total-icon">￥</span>{{totalFee}}</span>
        </li>
      </ul>
      <x-button value="确定" primary @onClick="getwxPay"></x-button>
      <x-button value="订阅" primary @onClick="subscribe"></x-button>
      <x-button value="发布" primary @onClick="testPublish"></x-button>
    </div>

    <div class="custom-dialog" v-if="showDialog">
      <div class="dialog-mask"></div>
      <div class="dialog-container">
        <p class="dialog-content" v-if="!(wxPayStatus == 'SUCCESS' || wxPayStatus == 'FAILED' || errCode == '403')">
          等待支付......</p>
        <p v-if="wxPayStatus == 'SUCCESS'" class="dialog-content" style="color: #80C435;">支付成功</p>
        <p v-if="wxPayStatus == 'FAILED'" class="dialog-content">支付失败</p>
        <p v-if="errCode == '403'" class="dialog-content">设备被占用, 请重试</p>
        <p class="dialog-btn" @click="dialogBtnClick">{{dialogBtnText}}</p>
      </div>
    </div>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  export default {
    data(){
      return {
        roomFee: 0,
        deposit: 0,
        publishCbMessage: [],
        showDialog: false,
        oderId: '',
        cmd: '',
        wxPayStatus: '',
        errCode: ''
      }
    },
    computed: {
      ...mapState([
        'yunbaInstance',
        'yunbaConnected',
        'AppParams'
      ]),
      totalFee() {
        let r1, r2, m;
        let arg1 = this.roomFee;
        let arg2 = this.deposit;
        try {
          r1 = arg1.toString().split(".")[1].length
        } catch (e) {
          r1 = 0
        }
        try {
          r2 = arg2.toString().split(".")[1].length
        } catch (e) {
          r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));//10的几次幂
        return (parseInt(arg1 * m, 10) + parseInt(arg2 * m, 10)) / m
      },
      dialogBtnText() {
        if (this.wxPayStatus === 'SUCCESS' || this.wxPayStatus === 'FAILED') {
          return '确定'
        } else if (this.errCode == 403) {
          return '重试'
        } else {
          return '取消'
        }
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'yunbaConnect',
        'yunbaSubscribe',
        'yunbaPublish',
        'setPublishCallback',
        'wxPayConfirm'
      ]),
      dialogBtnClick() {
        if (this.dialogBtnText === '重试') {
          this.cmd = '';
          let msg = {
            "tid": this.getUUID(),
            "sender": 'orders/' + this.orderId,//orders/{order_id}
            "cmd": '3002', //指令编号 3002 重置魔镜
            "code": "0",
            "data": {
              "order_id": this.orderId
            }
          };
          this.publish(msg);
        } else if (this.wxPayStatus === 'SUCCESS') {
          this.goto('/new-identity/' + this.$route.params.id)
        } else {
          this.showDialog = false
        }
      },
      getwxPay() {
        this.wxPayConfirm({
          identity_id: this.$route.params.id,
          room_fee: Math.round(this.roomFee * 100),//房费
          deposit: Math.round(this.deposit * 100),
          onsuccess: (body) => {
            this.showDialog = true;
            this.oderId = body.order_id;
            this.subscribe(this.orderId);
            let msg = {
              "tid": this.getUUID(),
              "sender": 'orders/' + this.orderId,//orders/{order_id}
              "cmd": '3074', //指令编号 3074 支付订单二维码
              "code": "0",
              "data": {
                "order_id": this.orderId
              }
            };
            this.publish(msg);
            this.showDialog = true;
          }//押金
        })
      },
      testPublish(){
        let msg = {
          "tid": this.getUUID(),
          "sender": 'orders/' + this.orderId,//orders/{order_id}
          "cmd": '', //指令编号 3074 支付订单二维码
          "code": "0",
          "data": {
            "order_id": this.orderId
          }
        };
        this.publish(msg);
      },
      subscribe(orderId) {
        this.yunbaSubscribe({
          info: {
            'topic': 'orders/' + orderId //orders/{order_id}
          },
          subscribeCallback: () => console.log('subscribe', 'orders/')
        })
      },
      publish(msg) {
        this.yunbaPublish({
          info: {
            'topic': 'lisijing',
            'msg': JSON.stringify(msg)
          },
          publishCallback: () => console.log('publish', '3074')
        })
      }
    },
    mounted() {
      this.yunbaConnect();
    },
    watch: {
      roomFee(val, oldVal) {
        if (val && val.split().some(i => !(/^[0-9]*$/.test(val) || /\./.test(i)))) this.roomFee = +oldVal
      },
      deposit(val, oldVal) {
        if (val && val.split().some(i => !(/^[0-9]*$/.test(val) || /\./.test(i)))) this.roomFee = +oldVal
      },
      yunbaConnected(val) {
        val && this.setPublishCallback({
          onSuccess: (data) => {
            let messageCbInfo = JSON.parse(data.msg);
            if (messageCbInfo.cmd) this.cmd = messageCbInfo.cmd;
            if (messageCbInfo.data.code) this.errCode = messageCbInfo.data.code;
            if (messageCbInfo.data.status) this.wxPayStatus = messageCbInfo.data.status;
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
