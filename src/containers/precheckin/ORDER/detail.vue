<template>
  <article class="detail">
    <div v-if="detail">
      <p class="synchronize">上次同步PMS时间: {{datetimeparse(detail.update_time, 'MMDDhhmm')}}</p>
      <div class="recording" v-if="detail.status && !detail.status.is_recording_success">
        <div class="title-body">入账失败</div>
        <a @click="confirmPmsResult">已手工入账</a>
      </div>

      <Group title="预订信息">
        <Cell class="key" title="订单号" :value="detail.order_pmsid"></Cell>
        <Cell class="key" title="预订人" :value="detail.owner"></Cell>
        <Cell class="key" title="手机号" :value="detail.owner_tel"></Cell>
        <Cell class="key" title="入离时间"
              :value="datetimeparse(detail.in_time) + ' - '+ datetimeparse(detail.out_time)"></Cell>
      </Group>

      <Group title="PMS支付信息" v-if="detail.payinfo">
        <Cell class="key" title="应付房费" :value="cashHandling(detail.payinfo.total_roomfee)"></Cell>
        <Cell class="key" title="预付" :value="cashHandling(detail.payinfo.pms_pay)"></Cell>
        <Cell class="key" title="备注" :value="detail.remark"></Cell>
      </Group>

      <Group title="支付信息">
        <Cell class="key" title="微信交易号" value="1233333333333"></Cell>
        <Cell class="key" title="支付金额" value="200"></Cell>
        <Cell class="key" title="交易时间" value="06/05 23:23"></Cell>
        <Cell class="key" title="免押金" value="是"></Cell>
      </Group>

      <Group title="退款信息">
        <Cell class="key" title="消费金额"></Cell>
        <Cell class="key" title="退款金额"></Cell>
        <Cell class="key" title="申请时间"></Cell>
      </Group>

      <Group v-for="(item,index) in detail.suborders" :key="'guests'+index"
             :title="index == 0? '选房信息' : null">
        <cell class="key" :title="getGuestItem(item)"/>
      </Group>

      <Group title="发票信息" v-if="detail.invoice">
        <Cell class="key" title="领取方式" :value="detail.invoice.media == 'PAPER' ? '纸质发票' : '电子发票'"></Cell>
        <Cell class="key" title="开票类型" :value="invoiceType(detail.invoice.type)"></Cell>
        <Cell class="key" title="开票内容" :value="detail.invoice.category"></Cell>
        <Cell class="key" title="发票抬头" :value="detail.invoice.title"></Cell>
      </Group>

    </div>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
  module.exports = {
    name: 'detail',
    data(){
      return {
        detail: {},
      }
    },
    computed: {
      ...mapState([
        'route'
      ]),
      routeId() {
        return this.$route.params.id
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
          onsuccess: body => this.detail.status.is_recording_success = true
        })
      },
      getGuestItem(item){
        let dom = `<div style="display: flex;justify-content: space-between;line-height: 2;color: #4a4a4a"><span>${(item.room_number ? item.room_number : '未选房') + ' ' + item.room_type_name + ' ' + this.getBreakFast(item.breakfast)}</span></div>`;
        if (item.guests) {
          item.guests.forEach(i => dom += `<div style="display: flex;color: #4a4a4a;justify-content: space-between;line-height: 2;"><span>${i.name} ${i.idcard}</span></div>`)
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
          onsuccess: body => this.detail = body.data
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
