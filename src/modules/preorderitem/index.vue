<template>
  <div class="orderitem" @click="$emit('onClick')">
    <div class="hd" v-if="item.order_id || item.warning">
      <p class="hdl">
        <span class="key">订单号：</span>
        <span>{{item.order_id}}</span>
      </p>

      <p class="hdr">
        <span class="hdrstyle">{{item.warning}}</span>
      </p>
    </div>

    <div class="bd">
      <p v-if="item.owner || item.owner_tel">
        <span class="key">预订人：</span>
        <span>{{item.owner}}</span>
        <span>{{item.owner_tel | filterNum}}</span>
      </p>

      <p v-if="item.rooms || item.precheckin_time" v-for="itm in item.rooms">
        <span class="key">房型：</span>
        <span>{{itm.room_type}}x{{itm.room_count}}</span>
        <span class="paid">{{item.timeline.precheckin_done}}</span>
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
    name: 'preorderitem',
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
      },
      filterNum(val){
        let newPhone = val.substr(3, 11);
        return newPhone
      }
    }
  }
</script>

<style scoped lang="less">
  @import 'index.less';
</style>
