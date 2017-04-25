<template>
  <article class="detail">
    <scroller lock-x :depend="orderdetail">
      <div class="scroller-wrap">
        <div v-if="orderdetail">
          <div class="recording" v-if="orderdetail.status && !orderdetail.status.is_recording_success">
            <div class="title-body">入账失败</div>
            <a @click="confirmPmsResult">已手工入账</a>
          </div>

          <Group title="预订信息">
            <Cell class="key" title="订单号" :value="orderdetail.order_pmsid"></Cell>
            <Cell class="key" title="预订人" :value="orderdetail.owner"></Cell>
            <Cell class="key" title="手机号" :value="orderdetail.owner_tel"></Cell>
            <Cell class="key" title="入离时间"
                  :value="datetimeparse(orderdetail.in_time) + ' - '+ datetimeparse(orderdetail.out_time)"></Cell>
          </Group>

          <Group title="PMS支付信息" v-if="orderdetail.payinfo">
            <Cell class="key" title="应付房费" :value="cashHandling(orderdetail.payinfo.total_roomfee)"></Cell>
            <Cell class="key" title="已付" :value="cashHandling(orderdetail.payinfo.pms_pay)"></Cell>
            <Cell class="key" title="备注" :value="orderdetail.remark"></Cell>
          </Group>

          <Group v-for="(item,index) in orderdetail.suborders" :key="'guests'+index"
                 :title="index == 0? '选房信息' : null">
            <cell class="key" :title="getGuestItem(item)"/>
          </Group>

          <Group title="发票信息" v-if="orderdetail.invoice">
            <Cell class="key" title="领取方式" :value="orderdetail.invoice.media == 'PAPER' ? '纸质发票' : '电子发票'"></Cell>
            <Cell class="key" title="开票类型" :value="invoiceType(orderdetail.invoice.type)"></Cell>
            <Cell class="key" title="开票内容" :value="orderdetail.invoice.category"></Cell>
            <Cell class="key" title="发票抬头" :value="orderdetail.invoice.title"></Cell>
          </Group>

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
