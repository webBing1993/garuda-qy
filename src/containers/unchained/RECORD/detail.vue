<template>
  <article>
    <Group>
      <XInput title="订单号" v-model="orderdetail.order_pmsid" placeholder="选填, PMS订单号"></XInput>
    </Group>

    <Group title="预订人信息">
      <XInput title="姓名" v-model="orderdetail.owner" placeholder="未填写"></XInput>
      <XInput title="手机号" v-model="orderdetail.owner_tel" placeholder="未填写"></XInput>
    </Group>

    <Group title="房型信息">
      <Cell title="房型" :value="orderdetail.room_type_name || '未选择'" @onClick="showAction = true" link></Cell>
      <Cell title="入住时间" :value="orderdetail.in_time | datetimeparse" @onClick="popupShowCalendar = true" link></Cell>
      <Cell title="离店时间" :value="orderdetail.out_time | datetimeparse" link></Cell>
      <XInput title="房价" placeholder="2017/04/01"></XInput>
      <XInput title="房间数" placeholder="未填写"></XInput>
      <Cell title="房号" value="未选择" link></Cell>
    </Group>

    <Group>
      <XInput title="金额" placeholder="预付款金额"></XInput>
      <XTextarea placeholder="备注" max="50"/>
    </Group>

    <div class="button-group">
      <XButton value="修改"></XButton>
      <XButton value="删除" warn></XButton>
    </div>

    <Actionsheet v-model="showAction" :menu="menuAction" @onClick="changeRoomType"/>

    <popup v-model="popupShowCalendar"
           maskShow
           bottom
           animationTopBottom>
      <calendar @onCancel="popupShowCalendar = false" v-model="period"/>
    </popup>

  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    data(){
      return {
        popupShowCalendar: false,
        period: [],
        showAction: false,
//        menuAction: ['大床房'],
        roomTypeList: [],
        orderdetail: {
          order_pmsid: '',
          owner: "张三",
          owner_tel: "+8618500059035",
          room_type_id: "",
          room_type_name: '大床房',
          in_time: '1491559200000',
          out_time: '1491863200000',
          date_price: [{
            date: 1488432346,
            price: 30000,
          }],
          room_numbers: [],
          staff_pay: "",
          remark: ""
        }
      }
    },
    computed: {
      menuAction(){
        let arr = []
        this.roomTypeList.forEach(i => arr.push(i.room_type_name))
        return arr
      }
    },
    methods: {
      ...mapActions([
        'getroomtypelist'
      ]),
      changeRoomType(val){
        this.orderdetail.room_type_name = val
      }
    },
    mounted(){
      this.getroomtypelist({
        onsuccess: body => this.roomTypeList = body.data
      })
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
