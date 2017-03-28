<template>
  <div class="orderitem" @click="$emit('onClick')">
    <div class="hd" v-if="orderId || status || date">
      <p class="hdl">
        <span class="key">订单号：</span>
        <span>{{orderId}}</span>
      </p>
      <p class="hdr">
        <span>{{status}}</span>
        <span>{{date}}</span>
      </p>
    </div>

    <div class="bd">
      <p v-if="booker || phoneNum">
        <span class="key">预订人：</span>
        <span>{{booker}}</span>
        <span>{{phoneNum}}</span>
      </p>

      <p v-if="roomType || roomCount">
        <span class="key">房型：</span>
        <span>{{roomType}}x{{roomCount}}</span>
      </p>

      <p v-if="fee || prepay">
        <span class="key">房费：</span>
        <span>{{fee | CNY}}</span>
        <span class="paid"><span class="key">已付：</span>{{prepay | CNY}}</span>
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
      orderId: null,
      status: null,
      date: null,

      booker: null,
      phoneNum: null,

      roomType: null,
      roomCount: null,

      fee: null,
      prepay: null,

      remark: null,

      arrow: {
        type: Boolean
      }
    },
    filters: {
      CNY(val){
        return '¥' + (val / 100)
      }
    }
  }
</script>

<style scoped lang="less">
  @import 'index.less';
</style>
