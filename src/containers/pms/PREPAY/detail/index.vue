<template>
  <div class="confirmeddetail">
    <orderitem title="预定信息"
               :underOrderId="orderlist.confirmeddetail.order_id"
               :booker="orderlist.confirmeddetail.owner"
               :underPhoneNum="orderlist.confirmeddetail.owner_tel"
               :rooms="orderlist.confirmeddetail.rooms"
               :inTime="orderlist.confirmeddetail.in_time"
               :outTime="orderlist.confirmeddetail.out_time">
    </orderitem>

    <orderitem title="PMS支付信息"
               :payinfo="orderlist.confirmeddetail.payinfo">
    </orderitem>

    <div class="btn-group">
      <x-button value="已全额支付 ￥400" primary @onClick="popupShow = !popupShow, showDialog = !showDialog"/>
      <x-button value="未支付" warn/>
      <x-button value="已付其他金额"/>
    </div>

    <popup v-model="popupShow"
           :maskShow="true"
           :center="true">
      <Dialog v-model="showDialog"
              confirm
              @onConfirm="popupShow = false,showDialog= false"
              @onCancel="popupShow = false,showDialog= false"
              >
        <label>输入金额</label>
        <input class="money" placeholder="￥400">
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
        showDialog: false
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
