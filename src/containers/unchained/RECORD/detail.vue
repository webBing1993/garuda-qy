<template>
  <article>
    <Group>
      <XInput title="订单号" :value="detail.order_pmsid"></XInput>
      <Cell title="订单来源" :value="detail.source_id" link></Cell>
    </Group>
    <Group title="预订人信息">
      <XInput title="姓名" :value="detail.owner"></XInput>
      <XInput title="手机号" :value="detail.owner_tel"></XInput>
    </Group>
    <Group title="房间信息">
      <Cell title="房型" :value="detail.room_type_name" link></Cell>
      <Cell title="入住时间" :value="detail.in_time" link></Cell>
      <Cell title="离店时间" :value="detail.out_time" link></Cell>
      <Cell title="房价￥"></Cell>
      <Cell title="房间数量" :value="detail.room_numbers" link></Cell>
      <Cell title="房号" :value="detail.room_numbers" link></Cell>
    </Group>
    <Group title="预付/备注">
      <XInput title="金额"></XInput>
      <XTextarea placeholder="备注" :value="detail.remark"></XTextarea>
    </Group>
    <XButton value="修改"></XButton>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    data(){
      return {
        detail: {
          order_id: "230420402402402",//订单号
          order_pmsid: "230420402402402",//订单号
          in_time: '1491384458888',
          out_time: '1491384458000',
          owner: "张三",//预订人
          owner_tel: "+8618500059035",//预订人手机
          remark: "",//备注
          rooms_plan: [{
            room_type: "大床房",
            room_count: 2
          }],
          payinfo: {
            total_roomfee: 4000, //总房费
            pms_pay: 1000, //PMS中的已付金额,
            staff_pay: null,//营业员确认的付款金额,
            user_pay: 1000, //小程序已付金额
            deposit: 0, //应付押金
          },
          status: {
            is_cancelled: false,// 是否已取消
            is_refund_required: false, //是否需要退款
            is_recording_success: false,// pms入账是否成功
          },
          timeline: { //状态变化时间
            staff_confirm: '1491384458000', //营业员确认订单的时间
            precheckin_done: '1491384458000', //预登记全部完成时间
          },
          suborders: [{
            suborder_id: "2304204024024011",
            status: {
              is_cancelled: false, //是否已取消
              is_checkin: false, //是否入住
              is_checkout: false, //是否离店
            },
            room_number: "203",
            room_tags: ["靠南", "带窗"],
            room_type_id: "房型代码",
            room_type_name: "大床房",
            room_price: [{
              date: '1491384458000',
              price: '2222',
            }],
            guests: [{
              name: "李四",
              idcard: "343245623456728199"
            }, {
              name: "李四",
              idcard: "343245623456728199"
            }],
            checkin_time: '1491384458000', //办理入住时间
            checkout_time: '1491384458000', //离店时间
          }, {
            suborder_id: "2304204024024012",
            status: {
              is_cancelled: false, //是否已取消
              is_checkin: false, //是否入住
              is_checkout: false, //是否离店
            },
            room_number: "204",
            room_tags: ["靠南", "带窗"],
            room_type_id: "房型代码",
            room_type_name: "大床房",
            room_price: [{
              date: '1491384458000',
              price: '2222',
            }],
            guests: [{
              name: "张三",
              idcard: "360123333333333456"
            }],
            checkin_time: '1491384458555', //办理入住时间
            checkout_time: '1491384458888', //离店时间
          }]
        },
        order_pmsid: '123', //pms订单号客户端渲染用
        owner: "",
        owner_tel: "",
        room_type_id: "",
        room_type_name: '大床房', //房型名称
        in_time: '',
        out_time: '',
        date_price: [{
          date: '',// 日期
          price: '', //房费
        }],
        room_numbers: [],
        staff_pay: "", //营业员确认的预付
        source_id: '22',
        remark: "",
        suborders:[{
            room_number:''
        }]
      }
    },
    computed: {},
    methods: {},
    mounted(){

    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
