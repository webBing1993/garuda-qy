<template>
  <article>
    <Group>
      <XInput title="订单号" v-model="orderdetail.order_pmsid" placeholder="PMS订单号，选填"></XInput>
    </Group>

    <Group title="预订人信息">
      <XInput title="姓名" v-model="orderdetail.owner" placeholder="未填写"></XInput>
      <XInput title="手机号" v-model="orderdetail.owner_tel" placeholder="未填写"></XInput>
    </Group>

    <Group title="房型信息">
      <Cell title="房型" :value="orderdetail.room_type_name || '未选择'" @onClick="showAction = true" link></Cell>
      <Cell title="入住时间" :value="orderdetail.in_time | datetimeparse" @onClick="popupShowCalendar = true" link></Cell>
      <Cell title="离店时间" :value="orderdetail.out_time | datetimeparse" link></Cell>


      <XInput title="房价" v-for="(item,index) in room_numbers" :key="index" type="number" v-model.number="item.inputValue"></XInput>

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
        roomTypeList: [],
        orderdetail: {
          order_pmsid: "",
          owner: "",
          owner_tel: "",
          room_type_id: "",
          room_type_name: "",
          in_time: '1491559200000',
          out_time: '1491732000000',
          date_price: [{
            date: 1488432346,
            price: 30000,
          }],
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
      },
      room_numbers(){
        const days = Math.floor((this.orderdetail.out_time - this.orderdetail.in_time) / 86400000)
        let a = []
        for (let i = 0; i < days; i++) {
          a.push({
            date_price: parseInt(this.orderdetail.in_time) + i * 86400000,
            inputValue: null,
          })
        }
        return a
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
