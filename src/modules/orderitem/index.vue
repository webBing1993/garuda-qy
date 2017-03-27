<template>
  <div class="orderitem" v-if="item">
    <div class="hd" v-if="item.orderId || item.status || item.date">
      <p class="hdl">
        <span class="key">订单号：</span>
        <span>{{item.orderId}}</span>
      </p>
      <p class="hdr">
        <span>{{item.status}}</span>
        <span>{{item.date}}</span>
      </p>
    </div>

    <div class="bd">
      <p v-if="item.booker || item.phoneNum">
        <span class="key">预订人：</span>
        <span>{{item.booker}}</span>
        <span>{{item.phoneNum}}</span>
      </p>

      <p v-if="item.roomType || item.roomCount">
        <span class="key">房型：</span>
        <span>{{item.roomType}}x{{item.roomCount}}</span>
      </p>

      <p v-if="item.fee || item.prepay">
        <span class="key">房费：</span>
        <span>{{item.fee | CNY}}</span>
        <span class="paid"><span class="key">已付：</span>{{item.prepay | CNY}}</span>
      </p>
    </div>

    <div class="ft">
      <p>
        <span class="key">备注：</span>
        <span>{{item.remark}}</span>
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
      item: {
        type: Object
      },
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
