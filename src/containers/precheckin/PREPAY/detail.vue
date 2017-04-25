<template>
  <div class="confirmeddetail" v-if="isNotEmpty(orderdetail)">
    <Group>
      <Cell title="预订信息"/>
      <Cell :title="getCellBody()"/>
    </Group>
    <Group>
      <Cell title="PMS支付信息"/>
      <Cell :title="getCellBodyPMS()"/>
      <Cell :title="getCellFooter()"/>
    </Group>

    <Group v-if="payInfo">
      <Cell title="已确认" :value="payInfo"></Cell>
    </Group>

    <div class="button-group">
      <x-button v-if='orderdetail.payinfo.staff_pay != orderdetail.payinfo.total_roomfee'
                :value="cashHandling(orderdetail.payinfo.total_roomfee,'已全额支付 ')"
                primary
                @onClick="staffpayConfirm"/>
      <x-button v-if='orderdetail.payinfo.staff_pay != 0'
                value="未支付"
                warn
                @onClick="staffpayConfirm(1)"/>
      <x-button
        v-if='orderdetail.payinfo.staff_pay == 0 || orderdetail.payinfo.staff_pay == orderdetail.payinfo.total_roomfee ||orderdetail.payinfo.staff_pay === null'
        value="已付其他金额"
        @onClick="staffpayConfirm(2)"
        plain/>
    </div>

    <Dialog v-model="showDialog"
            @onConfirm="setSingleConfirm"
            :confirm="!!(dialogStatus != 2 || inputValue)"
            cancel>
      <div v-if="!dialogStatus">
        <p>确认已全额支付？</p>
      </div>
      <div v-if="dialogStatus == 1">
        <p>确认未支付？</p>
      </div>
      <div v-if="dialogStatus == 2">
        <label>输入金额</label>
        <input type="number" v-model.number='inputValue'
               class="money" :placeholder="cashHandling(orderdetail.payinfo.total_roomfee,'总房费')">
      </div>
    </Dialog>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    name: "prepaydetail",
    data(){
      return {
        orderdetail: {},
        showDialog: false,
        dialogStatus: null,
        inputValue: null
      }
    },
    computed: {
      ...mapState([
        'route'
      ]),
      payInfo() {
        let a = this.orderdetail.payinfo.staff_pay;
        if (a == null) {
          return null;
        } else if (a === this.orderdetail.payinfo.total_roomfee) {
          return `<span style="font-size: 14px; color: #4a4a4a;">已全额支付<abbr style="color: #80C435">￥` + parseInt(a) / 100 + `</abbr></span>`
        } else if (a === 0) {
          return `<span style="color: #DF4A4A; font-size: 14px">未支付</span>`
        } else {
          return `<span style="font-size: 14px;color: #4a4a4a;">已付<abbr style="color: #80C435">￥` + parseInt(a) / 100 + `</abbr></span>`
        }
      }
    },
    methods: {
      ...mapActions([
        'getorderdetail',
        'singleconfirm'
      ]),
      isNotEmpty(obj){
        for (var key in obj) {
          return true;
        }
        return false;
      },
      getCellBody(){
        let roomtypewords = ''
        this.orderdetail.rooms_plan.forEach(i => roomtypewords += (i.room_type + 'x' + i.room_count))
        return `<div class="cell-body">` +
          `<p><span class="cell-key2">订单号：</span><span class="cell-value">${this.orderdetail.order_pmsid}</span></p>` +
          `<p><span class="cell-key2">预订人：</span><span class="cell-value">${this.orderdetail.owner}</span></p>` +
          `<p><span class="cell-key2">手机号：</span><span class="cell-value">${this.orderdetail.owner_tel}</span></p>` +
          `<p><span class="cell-key2">入离时间：</span><span class="cell-value">${this.datetimeparse(this.orderdetail.in_time)}- ${this.datetimeparse(this.orderdetail.out_time)}</span></p>` +
          `<p><span class="cell-key2">房型：</span><span class="cell-value">${roomtypewords}</span></p>` +
          `</div>`
      },
      getCellBodyPMS(){
        return `<div class="cell-body">` +
          `<p><span class="cell-key">应付房费：</span><span class="cell-value">￥${this.orderdetail.payinfo.total_roomfee / 100}</span></p>` +
          `<p><span class="cell-key">已付房费：</span><span class="cell-value">￥${this.orderdetail.payinfo.pms_pay / 100}</span></p>` +
          `</div>`
      },
      getCellFooter(){
        return `<p><span class="cell-key">备注：</span><span class="cell-value">${this.orderdetail.remark}</span></p>`
      },
      staffpayConfirm(paystatus){
        this.showDialog = true;
        this.dialogStatus = paystatus ? paystatus : null;
      },
      setSingleConfirm () {
        let staff_pay = this.dialogStatus
          ? this.inputValue ? this.inputValue * 100 : 0
          : this.orderdetail.payinfo.total_roomfee
        console.log('staff_pay:' + staff_pay)

        this.singleconfirm({
          order_id: this.orderdetail.order_id,
          staff_pay: staff_pay,
          onsuccess: () => this.orderdetail.payinfo.staff_pay = staff_pay
        })
      },
      getDetail(){
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
      },
      resetDetail(){
        this.orderdetail = {}
      }
    },
    watch: {
      showDialog(val, oldV) {
        oldV ? (this.dialogStatus = null, this.inputValue = null) : null
      }
    },
    activated(){
      console.log('activated')
      this.resetDetail()
      this.getDetail()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
