<template>
  <div class="today-detail">
    <p class="room-title">主单信息</p>
    <section class="sub-rooms">
      <div class="room-type">
        <span class="left grey">订单号</span>
        <span class="right">{{detail.order_id}}</span>
      </div>
      <div class="room-type">
        <span class="left grey">预订人</span>
        <span class="right">{{detail.owner}}</span>
      </div>
      <div class="room-type">
        <span class="left grey">手机号</span>
        <span class="right">{{detail.owner_tel |  filterPhoneNum}}</span>
      </div>
      <div class="room-type">
        <span class="left grey">入离时间</span>
        <span class="right">{{detail.in_time | datetimeparse}} - {{detail.out_time | datetimeparse}}</span>
      </div>
    </section>
    <p class="room-title">房间信息</p>
    <section v-for='item in detail.suborders' class="sub-rooms">
      <div class="room-type">
        <span class="left">{{item.room_type_name}} {{item.room_number}}</span>
        <span class="right">{{item.checkin_time | datetimeparse}} - {{item.checkout_time | datetimeparse}}</span>
      </div>
      <div class="suborders">
        <div class="sub">
          <p class="sub-booker" v-for="i in item.guests">{{i.name}} {{i.idcard}} </p>
        </div>
        <p class="time">{{item.checkin_time | datetimeparse('MM/DD hh:mm')}}</p>
      </div>
    </section>
  </div>
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
    methods: {
      ...mapActions([
        'getorderdetail'
      ])
    },
    mounted() {
      this.getorderdetail({
        order_id: this.$route.params.id,
        suborder: 0,
        onsuccess: body => {
          this.detail = body.data
        }
      })
    }
  }
</script>

<style lang="less">
  @import "index.less";
</style>
