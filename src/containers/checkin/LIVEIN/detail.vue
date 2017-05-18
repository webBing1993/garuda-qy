<template>
  <article>
    <div class="today-detail" v-if="detail">
      <div class="recording" v-if="detail.status && !detail.status.is_recording_success">
        <div class="title-body">入账失败</div>
        <a @click="confirmPmsResult">已手工入账</a>
      </div>
      <Group title="主单信息">
        <Cell class="key" title="订单号" :value="detail.order_pmsid"></Cell>
        <Cell class="key" title="预订人" :value="detail.owner"></Cell>
        <Cell class="key" title="手机号" :value="detail.owner_tel"></Cell>
        <Cell class="key" title="入离时间"
              :value="datetimeparse(detail.in_time) + ' - '+ datetimeparse(detail.out_time)"></Cell>
        <Cell class="key" title="房型" :value="getRoomType(detail)"></Cell>
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

      <Group :title="index === roomInfoTitleIndex ? '房间信息':null"
             v-for="(item,index) in detail.suborders"
             :key="'guests'+index"
             v-if="item.guests && item.guests.length > 0">
        <Cell
          :title="`<div style='color: #4a4a4a'>${(item.room_number || '未选房')+ ' ' + item.room_type_name + ' ' +getBreakFast(item.breakfast)}</div>`"></Cell>
        <Cell :title="getGuestItem(item)"/>
        <p style="color: #DF4A4A;padding: 15px;font-size: 13px;box-sizing:border-box;background-color: #EAEDF0;"
           v-if="item.lvye_report_status !== 'SUCCESS'">
          当前入住房间信息尚未上传旅业系统，您可以前往‘公安验证-当日验证’已通过列表进行旅业系统上传；或点击该链接进行操作。
          <a v-if="item.identity_id" style="color: #25B8F1; border-bottom: 1px solid #25B8F1"
             @click="goto('/identity/' + item.identity_id)">上传旅业系统</a>
        </p>
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
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  module.exports = {
    name: 'liveindetail',
    data() {
      return {
        detail: {},
      }
    },
    computed: {
      routeId() {
        return this.$route.params.id
      },
      roomInfoTitleIndex(){
        return this.detail.suborders.findIndex(i => i.guests && i.guests.length > 0)
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'getorderdetail',
        'conformPmsSync'
      ]),
      getDetail() {
        this.getorderdetail({
          order_id: this.routeId,
          roomfee: 0,
          suborder: 1,
          invoice: 1,
          log: 0,
          onsuccess: body => {
            this.detail = body.data
          }
        })
      },
      confirmPmsResult() {
        this.conformPmsSync({
          order_id: this.routeId,
          action: 'SETACCOUNT',
          onsuccess: body => this.detail.status.is_recording_success = true
        })
      },
    },
    watch: {
      routeId(val) {
        val ? this.getDetail() : null;
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
