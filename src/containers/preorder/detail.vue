<template>
  <div class="predetail-container">
    <div class="warning-title" v-show="!is_recording_success">
      <div class="title-body" v-if="!is_recording_success">️入账失败</div>
      <div class="title-footer" @click="confirmPmsResult"><input type="button" value="已手工入账"></div>
    </div>

    <!--预订信息-->
    <Group title="预订信息">
      <Cell title="订单号" :value="orderdetail.order_pmsid"></Cell>
      <Cell title="预订人" :value="orderdetail.owner"></Cell>
      <Cell title="手机号" :value="orderdetail.owner_tel"></Cell>
      <Cell title="入离时间" :value="orderdetail.in_time | datetimeparse"></Cell>
    </Group>

    <!-- PMS支付信息 -->
    <Group title="PMS支付信息" v-if="orderdetail.payinfo">
      <Cell title="应付房费" :value="orderdetail.payinfo.total_roomfee | CNY"></Cell>
      <Cell title="已付" :value="orderdetail.payinfo.pms_pay | CNY"></Cell>
      <Cell title="备注" :value="orderdetail.remark"></Cell>
    </Group>

    <Group title="支付信息" v-if="orderdetail.payinfo">
      <Cell title="已付" :value="orderdetail.payinfo.user_pay | CNY"></Cell>
    </Group>

    <Group :title="index == 0? '选房信息' : null" v-for="(item,index) in orderdetail.suborders">
      <cell :title="getGuestItem(item)"/>
    </Group>

    <!-- 发票信息 -->
    <Group v-if="orderdetail.invoice" title="发票信息">
      <div class="predetail-cell">
        <div class="cell-body">发票抬头</div>
        <div class="cell-footer">{{orderdetail.invoice.title}}</div>
      </div>
      <div class="predetail-cell">
        <div class="cell-body">开票类型</div>
        <div class="cell-footer">{{orderdetail.invoice.type}}</div>
      </div>
      <div class="predetail-cell">
        <div class="cell-body">领取方式</div>
        <div class="cell-footer">{{orderdetail.invoice.media}}</div>
      </div>
      <div class="predetail-cell">
        <div class="cell-body">开票内容</div>
        <div class="cell-footer">{{orderdetail.invoice.category}}</div>
      </div>
      <div class="predetail-btn" @click="popupShow = !popupShow">
        <div class="log-btn">操作日志</div>
      </div>
    </Group>

    <!-- log 弹窗 -->
    <popup v-model="popupShow"
           :maskShow="true"
           :top="true"
           :animationTop="true">
      <div class="log-box">
        <span class="log-title">操作日志</span>
        <div class="log-cell">
          <div class="log-header">日期</div>
          <div class="log-body textAlign">内容</div>
          <div class="log-footer">操作人</div>
        </div>
        <div class="log-cell" v-for="item in orderdetail.logs">
          <div class="log-header">{{item.date | datetimeparse('YYYY/MM/DD hh:mm')}}</div>
          <div class="log-body">{{item.action}}</div>
          <div class="log-footer">{{item.operator}}</div>
        </div>
        <span class="logBtn" @click="popupShow = false">确定</span>
      </div>
    </popup>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
  import './index.less';
  module.exports = {
    name: 'predetails',
    data(){
      return {
        orderdetail: {},
        popupShow: false,
        inTime: '',
        outTime: ''
      }
    },
    computed: {
      ...mapState([
        'route',
        'orderdetail',
      ]),
      is_recording_success() {
        return this.orderdetail.status ? this.orderdetail.status.is_recording_success : false
      },
      period() {
          return
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'getorderdetail',
        'conformPmsSync'
      ]),
      isNotEmpty(obj){
        for (var key in obj) {
          return true;
        }
        return false;
      },
      confirmPmsResult() {
        this.conformPmsSync({
          order_id: this.$route.params.id,
          action: 'SETACCOUNT',
          onsuccess: body => this.orderdetail.status.is_recording_success = true
        })
      },
      getGuestItem(item){
        console.log(item)
        let dom = `<div style="display: flex;justify-content: space-between;line-height: 2;"><span>${item.room_type_name + ' ' + item.room_number}</span></div>`;
        item.guests.forEach(i => dom += `<div style="display: flex;justify-content: space-between;line-height: 2;text-indent: 1em;"><span>${i.name} ${i.idcard}</span></div>`)
        return dom
      }
    },
    mounted() {
      this.getorderdetail({
        order_id: this.$route.params.id,
        roomfee: 0,
        suborder: 0,
        invoice: 0,
        log: 0,
        onsuccess: body => {
          this.orderdetail = body.data
        }
      })
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
