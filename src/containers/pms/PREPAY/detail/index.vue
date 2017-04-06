<template>
  <div class="confirmeddetail" v-if="isNotEmpty(orderdetail)">
    <orderitem title="预定信息"
               :underOrderId="orderdetail.order_id"
               :booker="orderdetail.owner"
               :underPhoneNum="orderdetail.owner_tel"
               :rooms="orderdetail.rooms_plan"
               :inTime="orderdetail.in_time"
               :outTime="orderdetail.out_time">
    </orderitem>

    <orderitem title="PMS支付信息"
               :payinfo="orderdetail.payinfo">
    </orderitem>
    <Group v-if="payInfo">
      <Cell title="已确认" :value="payInfo"></Cell>
    </Group>
    <div class="btn-group">
      <x-button  v-if='orderdetail.payinfo.staff_pay === null ||orderdetail.payinfo.staff_pay < orderdetail.payinfo.total_roomfee ||orderdetail.payinfo.staff_pay === 0'
                :value="'已全额支付 ￥'+orderdetail.payinfo.total_roomfee"
                primary
                @onClick="orderdetail.payinfo.staff_pay = orderdetail.payinfo.total_roomfee,payInfo = '已全额支付￥' + orderdetail.payinfo.staff_pay"/>
      <x-button v-if='orderdetail.payinfo.staff_pay === null ||(orderdetail.payinfo.staff_pay <= orderdetail.payinfo.total_roomfee) && orderdetail.payinfo.staff_pay != 0'
                value="未支付"
                warn
                @onClick="payInfo = '未支付',orderdetail.payinfo.staff_pay = 0"/>
      <x-button v-if='orderdetail.payinfo.staff_pay === null||orderdetail.payinfo.staff_pay === orderdetail.payinfo.total_roomfee ||orderdetail.payinfo.staff_pay===0'
                value="已付其他金额"
                @onClick="popupShow = !popupShow, showDialog = !showDialog"/>
    </div>

    <popup v-model="popupShow"
           :maskShow="true"
           :center="true">
      <Dialog v-model="showDialog"
              @onConfirm="popupShow = false,showDialog= false,orderdetail.payinfo.staff_pay= inputValue,payInfo = '已付￥' + orderdetail.payinfo.staff_pay"
              @onCancel="popupShow = false,showDialog= false"
              confirm
              cancel>
        <label>输入金额</label>
        <input v-model='inputValue'
               class="money" placeholder="￥400">
      </Dialog>
    </popup>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    name: "prepaydetail",
    data(){
      return {
        orderdetail: {},
        popupShow: false,
        showDialog: false,
        payInfo:'',
        inputValue:''
      }
    },
    computed: {
      ...mapState([
        'route'
      ])
    },
    methods: {
      ...mapActions([
        'getorderdetail'
      ]),
      isNotEmpty(obj){
        for (var key in obj) {
          return true;
        }
        return false;
      }
    },
    mounted() {
      this.getorderdetail({
        order_id: this.route.params.id,
        onsuccess: body => this.orderdetail = body.data
      })
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
