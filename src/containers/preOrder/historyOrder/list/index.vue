<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabmenu"
                 :key="index"
                 :selected="route.params.tab == index"
                 @click.native="goto('/preOrder/historyOrder/'+index)">{{item}}
        </TabItem>
      </Tab>
    </header>
    <scroller ref="NO-SHOW"
              v-show="route.params.tab == 0"
              lock-x>
      <section>
        <orderitem v-for="(item,index) in historyList"
                   :orderId="item.order_id"
                   :need_refund="true"
                   :date="item.in_time"
                   :booker="item.owner"
                   :phoneNum="item.owner_tel"
                   :roomType="item.rooms[0].room_type"
                   :roomCount="item.rooms[0].room_count"
                   :fee="item.fee"
                   :arrow= true>

        </orderitem>
      </section>
    </scroller>

    <scroller v-show="route.params.tab == 1"
              ref="canceled"
              lock-x>
      <section>
        已取消
      </section>
    </scroller>
  </article>
</template>
<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        tabmenu: ["NO-SHOW", "已取消"],
      }
    },
    computed: {
      ...mapState([
        'app',
        'route',
        'historyList',
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'history',
      ]),
      reset: function (ref, param) {
        //重置scroller高度
        this.$nextTick(() => this.$refs[ref].reset(param))
      },
    },
    watch: {
      'route.params.tab': function (val) {
        //切换标签卡时
        if (val == 0) {
          this.reset('NO-SHOW')
        } else {
//          this.reset('confirmed')
        }
      },
    },
    mounted(){
      this.history();
    }
  }
</script>
<style scoped lang="less">
  @import "./index.less";
</style>

