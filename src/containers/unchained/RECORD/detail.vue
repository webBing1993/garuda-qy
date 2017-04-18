<template>
  <article>
    <scroller lock-x>
      <section class="wrap">
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
      </section>
    </scroller>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    data(){
      return {
        detail: {},
        sourcelist: [],
        roomtypelist: []
      }
    },
    computed: {
      ...mapState([
        'route'
      ]),
      orderId(){
        return this.route.params.id
      }
    },
    methods: {
      ...mapActions([
        'getsourcelist',
        'getroomtypelist'
      ]),
      getSourceList(){
        this.getsourcelist({
          onsuccess: (body) => this.sourcelist = body.data
        })
      },
      getRoomTypeList(){
        this.getroomtypelist({
          onsuccess: body => this.roomtypelist = body.data
        })
      },


      editDetail(order_id){
        if (this.formDetail.order_id !== order_id) {
          this.getorderdetail({
            order_id: order_id,
            roomfee: 0,
            suborder: 0,
            invoice: 0,
            log: 0,
            onsuccess: (body) => {
              this.formDetail = body.data
              this.showForm = true
            }
          })
        } else {
          this.showForm = true
        }
      }
    },
    mounted(){
      this.getSourceList()
      this.getRoomTypeList()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
