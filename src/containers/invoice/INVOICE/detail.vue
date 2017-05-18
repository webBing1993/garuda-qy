<template>
  <article class="invoce-detail">
    <scroller lock-x :depend="detail">
      <div class="scroller-wrap">
        <!-- 主单信息 -->
        <Group title="主单信息">
          <Cell class="key" title="订单号" :value="detail.order_pmsid"></Cell>
          <Cell class="key" title="预订人" :value="detail.owner"></Cell>
          <Cell class="key" title="手机号" :value="detail.owner_tel"></Cell>
          <Cell class="key" title="入离时间"
                :value="datetimeparse(detail.in_time) + ' - '+ datetimeparse(detail.out_time)"></Cell>
          <Cell class="key" title="房型" :value="getRoomType(detail)"></Cell>
        </Group>

        <!-- 房间信息 -->
        <Group :title="index === roomInfoTitleIndex(detail) ? '房间信息':null"
               v-for="(item,index) in detail.suborders"
               :key="index"
               v-if="item.guests && item.guests.length > 0">
          <Cell
            :title="`<span style='color:#4a4a4a'>${(item.room_number ? item.room_number : '未选房') + ' ' + item.room_type_name + ' ' + getBreakFast(item.breakfast)}</span>`"></Cell>
          <Cell class="key" :title="getGuestItem(item)"></Cell>
        </Group>

        <!-- 发票信息 -->
        <Group title="发票信息" v-if="detail.invoice">
          <Cell class="key" title="领取方式" :value="detail.invoice.media === 'PAPER' ? '纸质发票' : '电子发票'"></Cell>
          <Cell class="key" title="开票类型" :value="invoiceType(detail.invoice.type)"></Cell>
          <Cell class="key" title="开票内容" :value="detail.invoice.category"></Cell>
          <Cell class="key" title="发票信息" :value="detail.invoice.title"></Cell>
          <Cell v-if="detail.invoice.type === 'VAT'" class="key" title="统一社会信用代码" :value="detail.invoice.tax_registry_no"></Cell>
          <Cell v-if="detail.invoice.type === 'VAT'" class="key" title="地址" :value="detail.invoice.address"></Cell>
          <Cell v-if="detail.invoice.type === 'VAT'" class="key" title="联系电话" :value="detail.invoice.phone_number"></Cell>
          <Cell v-if="detail.invoice.type === 'VAT'" class="key" title="开户银行" :value="detail.invoice.bank_name"></Cell>
          <Cell v-if="detail.invoice.type === 'VAT'" class="key" title="银行账号" :value="detail.invoice.bank_account"></Cell>
        </Group>

        <div class="button-group" v-if="detail.invoice && detail.invoice.invoice_status ===  1">
          <XButton value="登记开票" default @onClick="staffpayConfirm"></XButton>
        </div>
        <p v-if="detail.invoice && detail.invoice.invoice_status ===  2" class="tips">已确认开票。</p>

      </div>
    </scroller>

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
    name: 'detail',
    data(){
      return {
        showDialog: false,
        dialogStatus: null,
        inputValue: null,
        detail: {}
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route',
      ]),
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
          invoice_apply_id: this.detail.invoice.id,
          invoice_status: 2,
          onsuccess: () => this.detail.invoice.invoice_status = 2
        })
      }
    },
    mounted(){
      this.getorderdetail({
        order_id: this.$route.params.id,
        roomfee: 0,
        suborder: 1,
        invoice: 1,
        log: 0,
        onsuccess: body => this.detail = body.data
      })
    }
  }
</script>

<style scoped lang="less">
  @import "./index.less";
</style>
