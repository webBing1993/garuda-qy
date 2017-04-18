<template>
  <article class="invoce-detail">
    <!-- 主单信息 -->
    <Group title="主单信息">
      <Cell title="订单号" :value="invoiceDtail.order_pmsid"></Cell>
      <Cell title="预订人" :value="invoiceDtail.owner"></Cell>
      <Cell title="手机号" :value="invoiceDtail.owner_tel"></Cell>
      <Cell title="入住时间" :value="invoiceDtail.in_time | datetimeparse"></Cell>
      <Cell title="离店时间" :value="invoiceDtail.out_time | datetimeparse"></Cell>
      <Cell title="房型" :value="getRoomCount(invoiceDtail)"></Cell>
    </Group>

    <!-- 房间信息 -->
    <Group :title="index == 0? '房间信息' : null" v-for="(item,index) in invoiceDtail.suborders" :key="index">
      <Cell :title="`<span style='color:#4a4a4a'>${item.room_type_name} ${item.room_number}</span>`"></Cell>
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
        'Interface',
        'route',
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'getorderdetail',
        'confirmInvoice'
      ]),
      staffpayConfirm(paystatus){
        this.showDialog = true;
        this.dialogStatus = paystatus ? paystatus : null;
      },
      setInvoiceConfirm () {
        this.confirmInvoice({
          invoice_apply_id: this.invoiceDtail.orderId,
          invoice_status: 2,
          onsuccess:function () {
              this.invoiceDtail.invoice_status = 2
          }
        })
      },
      getRoomCount(item){
        if (item.rooms_plan) {
          let temp = ``
          item.rooms_plan.forEach(i => temp += `<div>${i.room_type + '·' + i.room_count}</div>`)
          return temp
        }
      },
      getIvoiceRoomInfo(item){
        if (item.guests) {
          let dom = ``;
          item.guests.forEach(i => dom += `<div style="line-height: 2;text-indent: 1em;color: #4a4a4a">${i.name} ${i.idcard}</div>`)
          return dom
        }
      },
    },
    mounted(){
      this.getorderdetail({
        order_id: this.$route.params.id,
        roomfee: 1,
        suborder: 1,
        invoice: 1,
        log: 1,
        onsuccess: body => {
          this.invoiceDtail = body.data
        }
      })
    }
  }
</script>

<style scoped lang="less">
  @import "./index.less";
</style>
