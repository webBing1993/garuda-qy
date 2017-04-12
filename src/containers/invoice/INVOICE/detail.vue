<template>
  <article class="invoce-detail">
    <!-- 主单信息 -->
    <Group title="主单信息">
      <Cell title="订单号" :value="invoiceDtail.order_id"></Cell>
      <Cell title="预订人" :value="invoiceDtail.owner"></Cell>
      <Cell title="手机号" :value="invoiceDtail.owner_tel | filterPhoneNum"></Cell>
      <Cell title="入离时间" :value="invoiceDtail.in_time | datetimeparse"></Cell>
      <Cell title="房型" :value="getRoomCount(invoiceDtail)"></Cell>
    </Group>

    <!-- 房间信息 -->
    <Group :title="index == 0? '房间信息' : null" v-for="(item,index) in invoiceDtail.suborders" :key="index">
      <Cell :title="item.room_type_name +' '+ item.room_number"
            :value="item.checkin_time |datetimeparse + '-' + item.checkout_time|datetimeparse"></Cell>
      <Cell :title="getIvoiceRoomInfo(item)"></Cell>
    </Group>

    <!-- 发票信息 -->
    <Group title="发票信息" v-if="invoiceDtail.invoice">
      <Cell title="发票信息" :value="invoiceDtail.invoice.title"></Cell>
      <Cell title="开票类型" :value="invoiceDtail.invoice.type"></Cell>
      <Cell title="领取方式" :value="invoiceDtail.invoice.media"></Cell>
      <Cell title="开票内容" :value="invoiceDtail.invoice.category"></Cell>
      <div class="detailBtn">
        <XButton value="登记开票" default @onClick="staffpayConfirm"></XButton>
      </div>
    </Group>

    <Dialog v-model="showDialog"
            @onConfirm="setInvoiceConfirm"
            confirm
            cancel>
      <div v-if="!dialogStatus">
        <p>是否已开发票？</p>
      </div>
    </Dialog>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
  export default{
    name: 'invoicedetail',
    data(){
      return {
        showDialog: false,
        dialogStatus: null,
        inputValue: null,
        invoiceDtail: {}
      }
    },
    computed: {
      ...mapState([
        'app',
        'route',
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'getInvoiceDetail'
      ]),
      invoiceClick(){
        console.log('登记开票 ====>')
      },
      staffpayConfirm(paystatus){
        this.showDialog = true;
        this.dialogStatus = paystatus ? paystatus : null;
      },
      setInvoiceConfirm () {
        console.log('setInvoiceConfirm:')
      },
      getRoomCount(item){
        let temp = ``
        item.rooms_plan.forEach(i => temp += `<div>${i.room_type + '·' + i.room_count}</div>`)
        return temp
      },
      getIvoiceRoomInfo(item){
        let dom = ``;
        item.guests.forEach(i => dom += `<div style="line-height: 2;text-indent: 1em;">${i.name} ${i.idcard}</div>`)
        return dom
      },
    },
    mounted(){
      this.getInvoiceDetail({
        onsuccess: body => this.invoiceDtail = body.data
      })
    }
  }
</script>

<style scoped lang="less">
  @import "./index.less";
</style>
