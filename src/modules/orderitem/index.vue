<template>
  <div class="orderitem" @click="$emit('onClick')">

    <div class="hd" v-if="orderId || status || date || roomNumber || roomTypeName || intg">

      <p class="hdl" v-if="orderId">
        <span class="key">订单号：</span>
        <span>{{orderId}}</span>
      </p>

      <p class="hdl" v-if="roomNumber || roomTypeName || intg">
        <span>{{roomNumber}} {{roomTypeName}} (联{{intg}})</span>
      </p>

      <!--<p class="hdr">-->
        <!--<span v-if="need_hint" class="warning">{{need_hint}}</span>-->
        <!--&lt;!&ndash;<span>{{status}}</span>&ndash;&gt;-->
        <!--&lt;!&ndash;<span>{{date}}</span>&ndash;&gt;-->
      <!--</p>-->

      <p class="hdr" v-if=" fee || prepay ">
        <span v-if="prepay === null"></span>
        <span v-else-if="prepay === 0" class="warning">未付款</span>
        <span v-else-if="prepay === fee" class="default">已付全额</span>
        <span v-else-if="prepay < fee" class="other">已付其他</span>
      </p>

      <p class="hdr" v-if="status">
        <span v-if="!status.is_recording_success" class="warning">入账失败</span>
      </p>

      <p class="hdr" v-if="checkinTime">
        <span>{{checkinTime | datetimeparse('hh:mm')}}</span>
      </p>
    </div>

    <div class="hd" v-if="title">
      <p class="hdl">{{title}}</p>
    </div>

    <div class="bd">
      <p v-if="underOrderId">
        <span class="key">订单号：</span>
        <span>{{underOrderId}}</span>
      </p>
      <p v-if="booker || phoneNum">
        <span class="key">预订人：</span>
        <span>{{booker}}</span>
        <span>{{phoneNum | filterPhoneNum}}</span>
      </p>
      <p v-if="guests">
        <span class="key guest-left">预订人：</span>
        <span v-for="item in guests" class="guests">
          <span style="padding-right: 5px">{{item.name}}</span>
          <span>{{item.idcard}}</span>
        </span>
      </p>
      <p v-if="underPhoneNum">
        <span class="key">手机号：</span>
        <span>{{underPhoneNum | filterPhoneNum}}</span>
      </p>
      <p v-if="inTime">
        <span class="key">入离时间：</span>
        <span>{{inTime | datetimeparse}} - {{outTime |datetimeparse}}</span>
      </p>
      <p v-if="rooms" v-for="room in rooms">
        <span class="key">房型：</span>
        <span v-if="room.room_type || room.room_count">{{room.room_type}}x{{room.room_count}}</span>
        <span v-if="staff_confirm_timeline" class="intime">{{staff_confirm_timeline | datetimeparse('MM/DD hh:mm')}}</span>
      </p>
      <p v-if="fee || prepay">
        <span class="key">房费：</span>
        <span>{{fee | CNY}}</span>
        <span class="paid"><span class="key">已付：</span>{{prepay | CNY}}</span>
      </p>
      <p v-if="payinfo">
        <span class="key">应付房费：</span>
        <span>{{payinfo.total_roomfee | CNY}}</span>
      </p>
      <p v-if="payinfo">
        <span class="key">已付房费：</span>
        <span>{{payinfo.user_pay | CNY}}</span>
      </p>
    </div>

    <div class="ft" v-if="remark">
      <p>
        <span class="key">备注：</span>
        <span>{{remark}}</span>
      </p>
    </div>

    <svg v-if="arrow"
         class="arrow"
         width="10px"
         height="28px"
         viewBox="718 721 20 56"
         version="1.1"
         xmlns="http://www.w3.org/2000/svg">
      <polyline id="右箭头"
                stroke="none"
                fill="#C3C3C3"
                fill-rule="evenodd"
                points="718 722.389391 734.764206 749.037813 718.619206 775.729959 720.91254 777 737.860238 748.950214 720.362143 721.14125 718 722.389391"></polyline>
    </svg>
  </div>
</template>

<script>
  export default{
    name: 'orderitem',
    props: {
      title: null,
      orderId: null,
      underOrderId: null,
      status: null,
      date: null,
      booker: null,
      phoneNum: null,
      underPhoneNum: null,
      rooms: null,
      inTime: null,
      outTime: null,
      fee: null,//总房费
      prepay: null,//营业员确认的付款金额
      payinfo: null,
      remark: null,
      need_hint: null,
      staff_confirm_timeline: null,
      roomNumber: null,
      roomTypeName: null,
      intg: null,
      checkinTime: null,
      guests: null,
      arrow: {
        type: Boolean
      }
    }
  }
</script>

<style scoped lang="less">
  @import 'index.less';
</style>
