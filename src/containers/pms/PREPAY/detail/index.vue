<template>
  <div class="confirmeddetail" v-if="isNotEmpty(orderlist.confirmeddetail)">
    <orderitem title="预定信息"
               :underOrderId="orderlist.confirmeddetail.order_id"
               :booker="orderlist.confirmeddetail.owner"
               :underPhoneNum="orderlist.confirmeddetail.owner_tel"
               :rooms="orderlist.confirmeddetail.rooms_plan"
               :inTime="orderlist.confirmeddetail.in_time"
               :outTime="orderlist.confirmeddetail.out_time">
    </orderitem>

    <orderitem title="PMS支付信息"
               :payinfo="orderlist.confirmeddetail.payinfo">
    </orderitem>
    <Group v-if="payInfo">
      <Cell title="已确认" :value="payInfo"></Cell>
    </Group>
    <div class="btn-group">
      <x-button  v-if='orderlist.confirmeddetail.payinfo.staff_pay === null ||orderlist.confirmeddetail.payinfo.staff_pay < orderlist.confirmeddetail.payinfo.total_roomfee ||orderlist.confirmeddetail.payinfo.staff_pay === 0'
                :value="'已全额支付 ￥'+ orderlist.confirmeddetail.payinfo.total_roomfee"
                primary
                @onClick="orderlist.confirmeddetail.payinfo.staff_pay = orderlist.confirmeddetail.payinfo.total_roomfee,payInfo = '已全额支付￥' + orderlist.confirmeddetail.payinfo.staff_pay"/>
      <x-button v-if='orderlist.confirmeddetail.payinfo.staff_pay === null ||(orderlist.confirmeddetail.payinfo.staff_pay <= orderlist.confirmeddetail.payinfo.total_roomfee) && orderlist.confirmeddetail.payinfo.staff_pay != 0'
                value="未支付"
                warn
                @onClick="payInfo = '未支付',orderlist.confirmeddetail.payinfo.staff_pay = 0"/>
      <x-button v-if='orderlist.confirmeddetail.payinfo.staff_pay === null||orderlist.confirmeddetail.payinfo.staff_pay === orderlist.confirmeddetail.payinfo.total_roomfee ||orderlist.confirmeddetail.payinfo.staff_pay===0'
                value="已付其他金额"
                @onClick="popupShow = !popupShow, showDialog = !showDialog"/>
    </div>

    <popup v-model="popupShow"
           :maskShow="true"
           :center="true">
      <Dialog v-model="showDialog"
              @onConfirm="popupShow = false,showDialog= false,orderlist.confirmeddetail.payinfo.staff_pay= inputValue,payInfo = '已付￥' + orderlist.confirmeddetail.payinfo.staff_pay"
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
        popupShow: false,
        showDialog: false,
        payInfo:'',
        inputValue:''
      }
    },
    computed: {
      ...mapState([
        'route',
        'orderlist'
      ])
    },
    methods: {
      ...mapActions([
        'confirmeddetail'
      ]),
      isNotEmpty(obj){
        for (var key in obj) {
          return true;
        }
        return false;
      }
    },
    mounted() {
      this.confirmeddetail(this.route.params.id);
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
