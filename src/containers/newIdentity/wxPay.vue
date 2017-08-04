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
      <!--<x-button value="test确定" primary @onClick="testGetwxPay"></x-button>-->
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
    <Toast v-model="isToastShow" title="操作成功" timer='100'/>
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
        orderId: '',
        cmd: '',
        wxPayStatus: '',
        errCode: '',
        isToastShow: false
      }
    },
    computed: {
      ...mapState([
        'yunbaInstance',
        'yunbaConnected',
        'AppParams',
        'deviceId'
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
            "cmd": '3074', //指令编号
            "code": "0",
            "data": {
              "order_id": this.orderId
            }
          };
          this.publish(msg);
        } else if (this.wxPayStatus === 'SUCCESS') {
          this.resetData();
          this.showDialog = false;
          this.goto('/new-identity/' + this.$route.params.id)
        } else if (this.dialogBtnText === '取消') {
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
          this.showDialog = false;
        } else if (this.wxPayStatus === 'FAILED') {
          this.resetData();
          this.showDialog = false;
        }
      },
      getwxPay() {
        console.log(this.roomFee, this.deposit);
        if ((+this.roomFee) >= 0 && (+this.deposit) >= 0) {
          this.wxPayConfirm({
            identity_id: this.$route.params.identityId,
            room_fee: Math.round(this.roomFee * 100),//房费
            deposit: Math.round(this.deposit * 100),
            onsuccess: (body) => {
                console.log(body);
              if (body.data) {
                this.isToastShow = true;
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
                setTimeout(() => {
                  this.showDialog = true;
                },200);
              }
            }//押金
          })
        }
      },
      subscribe(topic) {
        this.yunbaSubscribe({
          info: {
            'topic': 'orders/' + this.orderId //orders/{order_id}
          },
          subscribeCallback: () => console.log('subscribe', 'lisijing')
        })
      },
      publish(msg) {
        this.yunbaPublish({
          info: {
            'topic': 'devices/' + this.deviceId, //orders/{order_id}
            'msg': JSON.stringify(msg)
          },
          publishCallback: () => console.log('publish', 'devices/' + this.deviceId)
        })
      },
      resetData() {
        this.cmd = '';
        this.errCode = '';
        this.wxPayStatus = '';
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
            console.log(data);
            this.resetData();
            let messageCbInfo = JSON.parse(data.msg);
            if (messageCbInfo.cmd) this.cmd = messageCbInfo.cmd;
            if (messageCbInfo.data.code) this.errCode = messageCbInfo.data.code;
            if (messageCbInfo.data.status) this.wxPayStatus = messageCbInfo.data.status;
          }
        })
      }
    },
    activated() {
      if (this.wxPayStatus === 'SUCCESS') {
        this.resetData();
        this.roomFee = 0;
        this.deposit = 0;
        this.showDialog = false;
      }
      if (this.wxPayStatus === 'FAILED') {
        this.resetData();
        this.showDialog = false;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
