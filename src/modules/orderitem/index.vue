<template>
  <div class="orderitem" @click="$emit('onClick')">

    <div class="hd" v-if="orderId || status || roomNumber || roomTypeName || intg">

      <p class="hdl" v-if="orderId">
        <span class="key">订单号：</span>
        <span>{{orderId}}</span>
      </p>

      <p class="hdl" v-if="roomNumber || roomTypeName || intg">
        <span>{{roomNumber}} {{roomTypeName}} {{intg ? '(联' + intg + ')' : null}}</span>
      </p>

      <p class="hdr" v-if=" fee || prepay ">
        <span v-if="prepay === null"></span>
        <span v-if="prepay === 0" class="warning">未付款</span>
        <span v-if="prepay === fee" class="default">已付全额</span>
        <span v-if="prepay && prepay !==fee" class="other">已付其他</span>
      </p>

      <p class="hdr" v-if="status">
        <span v-if="!status.is_recording_success" class="warning">入账失败</span>
      </p>

      <p class="hdr" v-if="checkinTime || timeformat">
        <span style="color: #8A8A8A; padding-right: 15px">{{checkinTime | datetimeparse(timeformat)}}</span>
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
        <span>{{phoneNum}}</span>
      </p>
      <p v-if="guests" class="list-box">
        <!--<span class="key list-left">预订人：</span>-->
        <section>
          <span v-for="item in guests" class="list-item">
            <span style="padding-right: 5px">{{item.name}}</span>
            <span>{{item.idcard}}</span>
          </span>
        </section>
      </p>
      <p v-if="underPhoneNum">
        <span class="key">手机号：</span>
        <span>{{underPhoneNum}}</span>
      </p>
      <p v-if="inTime">
        <span class="key">入离时间：</span>
        <span>{{inTime | datetimeparse}} - {{outTime | datetimeparse}}</span>
      </p>
      <p v-if="rooms" class="list-box">
        <span class="key">房型：</span>
        <section>
          <span v-for="(room,index) in rooms" class="list-item" v-if="room.room_type || room.room_count">
            <span>{{room.room_type}}x{{room.room_count}} </span>
          </span>
        </section>
        <abbr class="intime">{{staff_confirm_timeline | datetimeparse('MM/DD hh:mm')}}</abbr>
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

    <div class="ft" v-if="remark">
      <p>
        <span class="key">备注：</span>
        <span>{{remark}}</span>
      </p>
    </div>


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
      staff_confirm_timeline: null,
      roomNumber: null,
      roomTypeName: null,
      intg: null,
      checkinTime: null,
      timeformat: null,
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
