<template>
  <article class="invoce-detail">
    <!-- 主单信息 -->
    <Group title="主单信息">
      <Cell title="订单号" :value="invoiceList.order_id"></Cell>
      <Cell title="预订人" :value="invoiceList.owner"></Cell>
      <Cell title="手机号" :value="18762636236"></Cell>
      <Cell title="入离时间" :value="invoiceList.in_time | datetimeparse"></Cell>
      <Cell title="房型" value="大床房·2"></Cell>
    </Group>

    <!-- 房间信息 -->
    <Group :title="index == 0? '房间信息' : null" v-for="(item,index) in room_fees" :key="index">
      <Cell style="padding: 10px 0 10px 15px" :title="getIvoiceItem(item)"></Cell>
    </Group>

    <!-- 发票信息 -->
    <Group title="发票信息">
      <Cell title="发票信息" :value="invoiceList.invoice.title"></Cell>
      <Cell title="开票类型" :value="invoiceList.invoice.type"></Cell>
      <Cell title="领取方式" :value="invoiceList.invoice.media"></Cell>
      <Cell title="开票内容" :value="invoiceList.invoice.category"></Cell>
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
        invoiceList: [],
        room_fees: [{
          room_type_name: '大床房', //房型名称
          roomNo: 203, //房间数
          rooms: [{
            name: '张三',
            idcard: '4008009999999',
          }, {
            name: '李四',
            idcard: '4008009999999',
          }]
        }]
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
      getIvoiceItem(item){
        console.log(item);
        let dom = `<div style="display: flex;justify-content: space-between;line-height: 2;border-bottom: solid 1px #D9D9D9;padding: 0 15px 6px 0;margin-bottom: 8px"><span>${item.room_type_name + ' ' + item.roomNo}</span><span>2017/04/04-2017/04/06</span></div>`;
        item.rooms.forEach(i => dom += `<div style="display: flex;justify-content: space-between;line-height: 2;text-indent: 1em;"><span>${i.name} ${i.idcard}</span></div>`)
        return dom
      },
    },
    mounted(){
      this.getInvoiceDetail({
        onsuccess: body => this.invoiceList = body.data
      })
    }
  }
</script>

<style scoped lang="less">
  @import "./index.less";
</style>
