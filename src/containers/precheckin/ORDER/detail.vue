<template>
  <article class="detail">
    <scroller lock-x :depend="orderdetail">
      <div class="scroller-wrap">
        <div v-if="orderdetail">
          <div class="warning-title" v-if="orderdetail.status && !orderdetail.status.is_recording_success">
            <div class="title-body">入账失败</div>
            <div class="title-footer" @click="confirmPmsResult"><input type="button" value="已手工入账"></div>
          </div>

          <!--预订信息-->
          <Group title="预订信息">
            <Cell class="key" title="订单号" :value="orderdetail.order_pmsid"></Cell>
            <Cell class="key" title="预订人" :value="orderdetail.owner"></Cell>
            <Cell class="key" title="手机号" :value="orderdetail.owner_tel"></Cell>
            <Cell class="key" title="入住时间" :value="orderdetail.in_time |datetimeparse"></Cell>
            <Cell class="key" title="离店时间" :value="orderdetail.out_time |datetimeparse"></Cell>
          </Group>

          <!-- PMS支付信息 -->
          <Group title="PMS支付信息" v-if="orderdetail.payinfo">
            <Cell class="key" title="应付房费" :value="orderdetail.payinfo.total_roomfee | CNY"></Cell>
            <Cell class="key" title="已付" :value="orderdetail.payinfo.pms_pay | CNY"></Cell>
            <Cell class="key" title="备注" :value="orderdetail.remark"></Cell>
          </Group>

          <Group title="支付信息" v-if="orderdetail.payinfo">
            <Cell class="key" title="已付" :value="orderdetail.payinfo.user_pay | CNY"></Cell>
          </Group>

          <Group v-for="(item,index) in orderdetail.suborders" :key="'guests'+index"
                 :title="index == 0? '选房信息' : null">
            <cell class="key" :title="getGuestItem(item)"/>
          </Group>

          <!-- 发票信息 -->
          <Group title="发票信息" v-if="orderdetail.invoice">
            <Cell class="key" title="领取方式" :value="orderdetail.invoice.media == 'PAPER' ? '纸质发票' : '电子发票'"></Cell>
            <Cell class="key" title="开票类型" :value="invoiceType"></Cell>
            <Cell class="key" title="开票内容" :value="orderdetail.invoice.category"></Cell>
            <Cell class="key" title="发票抬头" :value="orderdetail.invoice.title"></Cell>
          </Group>

          <!--<div class="predetail-btn">-->
          <!--<XButton value="操作日志" plain mini @onClick="popupShow = !popupShow"></XButton>-->
          <!--</div>-->

          <!-- log 弹窗 -->
          <!--<popup v-model="popupShow"-->
          <!--:maskShow="true"-->
          <!--:top="true"-->
          <!--:animationTop="true">-->
          <!--<div class="log-box">-->
          <!--<span class="log-title">操作日志</span>-->
          <!--<div class="log-cell">-->
          <!--<div class="log-header">日期</div>-->
          <!--<div class="log-body textAlign">内容</div>-->
          <!--<div class="log-footer">操作人</div>-->
          <!--</div>-->
          <!--<div class="log-cell" v-for="item in orderdetail.logs">-->
          <!--<div class="log-header">{{item.date | datetimeparse('YYYY/MM/DD hh:mm')}}</div>-->
          <!--<div class="log-body">{{item.action}}</div>-->
          <!--<div class="log-footer">{{item.operator}}</div>-->
          <!--</div>-->
          <!--<span class="logBtn" @click="popupShow = false">确定</span>-->
          <!--</div>-->
          <!--</popup>-->
        </div>
      </div>
    </scroller>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
  module.exports = {
    name: 'detail',
    data(){
      return {
        orderdetail: {},
//        popupShow: false
      }
    },
    computed: {
      ...mapState([
        'route'
      ]),
      routeId() {
        return this.$route.params.id
      },
      invoiceType() {
        if (this.orderdetail.invoice.type == 'PERSONAL') {
          return '个人发票'
        } else if (this.orderdetail.invoice.type == 'GENERAL') {
          return '增值税普通发票'
        } else if (this.orderdetail.invoice.type == 'VAT') {
          return '专用发票'
        } else return ''
      },
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
          order_id: this.routeId,
          action: 'SETACCOUNT',
          onsuccess: body => this.orderdetail.status.is_recording_success = true
        })
      },
      getGuestItem(item){
        let dom = `<div style="display: flex;justify-content: space-between;line-height: 2;color: #4a4a4a"><span>${(item.room_number ? item.room_number : '未选房') + ' ' + item.room_type_name}</span></div>`;
        if (item.guests) {
          item.guests.forEach(i => dom += `<div style="display: flex;color: #4a4a4a;justify-content: space-between;line-height: 2;text-indent: 1em;"><span>${i.name} ${i.idcard}</span></div>`)
        }
        return dom
      },
      getDetail() {
        this.getorderdetail({
          order_id: this.routeId,
          roomfee: 1,
          suborder: 1,
          invoice: 1,
          log: 1,
          onsuccess: body => {
            this.orderdetail = body.data
          }
        })
      },
    },
    watch: {
      routeId(val) {
        val ? this.getDetail() : null
      }
    },
    mounted() {
      this.getDetail();
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
