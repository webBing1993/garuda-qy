<template>
  <article>
    <div v-if="detail">
      <p class="synchronize">上次同步PMS时间: {{datetimeparse(detail.update_time, 'MMDDhhmm')}}</p>

      <Group title="预订信息">
        <Cell class="key" title="订单号" :value="detail.order_pmsid"></Cell>
        <Cell class="key" title="预订人" :value="detail.owner"></Cell>
        <Cell class="key" title="手机号" :value="detail.owner_tel"></Cell>
        <Cell class="key" title="入离时间"
              :value="datetimeparse(detail.in_time) + ' - '+ datetimeparse(detail.out_time)"></Cell>
        <Cell class="key" title="房型" :value="getRoomType(detail)"></Cell>
      </Group>

      <Group title="PMS支付信息" v-if="detail.payinfo">
        <Cell class="key" title="应付房费" :value="cashHandling(detail.payinfo.total_roomfee)"></Cell>
        <Cell class="key" title="PMS预付" :value="cashHandling(detail.payinfo.pms_pay)"></Cell>
        <Cell class="key" title="备注" :value="detail.remark"></Cell>
        <Cell class="key" title="免押金" value="是"></Cell>
      </Group>

      <Group title="支付信息">
        <Cell class="key" title="微信交易号" :value="detail.payinfo ? detail.payinfo.payment.wx_order_id : null"></Cell>
        <Cell class="key" title="微信支付" :value="detail.payinfo ? cashHandling(detail.payinfo.payment.pay_fee) : null"></Cell>
        <Cell class="key" title="交易时间" :value="detail.payinfo ? datetimeparse(detail.payinfo.payment.pay_time) : null"></Cell>
      </Group>

      <Group title="退款信息">
        <Cell class="key" title="消费金额"></Cell>
        <Cell class="key" title="退款金额"></Cell>
        <Cell class="key" title="退款时间"></Cell>
      </Group>

      <Group v-for="(item,index) in detail.suborders"
             :key="'guests'+index"
             :title="index === roomInfoTitleIndex(detail) ? '房间信息':null"
             v-if="item.guests && item.guests.length > 0">
        <Cell
          :title="`<span style='color:#4a4a4a'>${(item.room_number ? item.room_number : '未选房') + ' ' + item.room_type_name + ' ' + getBreakFast(item.breakfast)}</span>`"></Cell>
        <cell class="key" :title="getGuestItem(item)"/>
        <div class="button-group" style="padding-top: 0">
          <x-button value="PMS退房" @onClick="pmsCheckout"/>
        </div>
      </Group>

      <Group title="发票信息" v-if="detail.invoice">
        <Cell class="key" title="领取方式" :value="detail.invoice.media == 'PAPER' ? '纸质发票' : '电子发票'"></Cell>
        <Cell class="key" title="开票类型" :value="invoiceType(detail.invoice.type)"></Cell>
        <Cell class="key" title="开票内容" :value="detail.invoice.category"></Cell>
        <Cell class="key" title="发票抬头" :value="detail.invoice.title"></Cell>
        <Cell v-if="detail.invoice.type === 'VAT'" class="key" title="统一社会信用代码"
              :value="detail.invoice.tax_registry_no"></Cell>
        <Cell v-if="detail.invoice.type === 'VAT'" class="key" title="地址" :value="detail.invoice.address"></Cell>
        <Cell v-if="detail.invoice.type === 'VAT'" class="key" title="联系电话" :value="detail.invoice.phone_number"></Cell>
        <Cell v-if="detail.invoice.type === 'VAT'" class="key" title="开户银行" :value="detail.invoice.bank_name"></Cell>
        <Cell v-if="detail.invoice.type === 'VAT'" class="key" title="银行账号" :value="detail.invoice.bank_account"></Cell>
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
        'conformPmsSync',
        'pmscheckout'
      ]),
      confirmPmsResult() {
        this.conformPmsSync({
          order_id: this.routeId,
          action: 'SETACCOUNT',
          onsuccess: body => this.detail.status.is_recording_success = true
        })
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
      pmsCheckout(){
        this.pmscheckout({
          id: this.routeId,
          onsuccess: body => this.getDetail()
        })
      }
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
