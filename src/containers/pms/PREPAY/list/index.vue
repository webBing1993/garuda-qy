<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabmenu"
                 :key="index"
                 :value="item"
                 :selected="route.params.tab == index"
                 @click.native="goto('/pms/prepay/'+index)"/>
      </Tab>
      <div class="toolbar" v-if="batch">
        <span @click="allPick"
              class="allpick"
              :class="{batch:batchlist.length === orderlist.tobeconfirmed.length}">全选</span>
        <span @click="cancelPick">取消操作</span>
      </div>
    </header>

    <scroller v-show="route.params.tab == 0"
              :pulldown-config="app.scroller.config"
              :depend="[orderlist.tobeconfirmed,batch]"
              height="-44"
              use-pulldown
              lock-x>
      <section :class="{batch}">
        <checker v-model="batchlist"
                 type="checkbox"
                 default-item-class="item"
                 selected-item-class="selected">
          <checker-item v-for="(item,index) in orderlist.tobeconfirmed"
                        :key="index"
                        :value="item.order_id">
            <orderitem :orderId="item.order_id"
                       :booker="item.owner"
                       :phoneNum="item.owner_tel"
                       :rooms="item.rooms"
                       :fee="item.payinfo.total_roomfee"
                       :prepay="item.payinfo.staff_pay"
                       :remark="item.remark"
                       :arrow="!batch"
                       @onClick="orderClick(item.order_id)"/>
          </checker-item>
        </checker>
      </section>
    </scroller>

    <scroller v-show="route.params.tab == 1"
              height="-44"
              lock-x>
      <section>
        <orderitem v-for="(item,index) in orderlist.confirmed"
                   key="'confirmed'+index"
                   :orderId="item.order_id"
                   :booker="item.owner"
                   :phoneNum="item.owner_tel"
                   :rooms="item.rooms"
                   :fee="item.payinfo.total_roomfee"
                   :prepay="item.payinfo.staff_pay"
                   :remark="item.remark"
                   :arrow="!batch"
                   @onClick="orderClick(item.order_id)"/>
      </section>
    </scroller>

    <footer v-show="route.params.tab == 0">
      <x-button v-if="batch" value="未支付" warn/>
      <x-button v-else @onClick="goPick" value="未支付批量处理"/>
    </footer>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    name: "prepay",
    data(){
      return {
        tabmenu: ["待确认", "已确认"],
        batch: false,
        batchlist: [],
      }
    },
    computed: {
      ...mapState([
        'app',
        'route',
        'orderlist',
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'tobeconfirmed',
        'confirmed'
      ]),
      donePullDown: function (ref) {
        //刷新
        this.$nextTick(() => setTimeout(() => this.$refs[ref].donePulldown(), 3000))
      },
      allPick(){
        //全选和取消全选
        if (this.batchlist.length === this.orderlist.tobeconfirmed.length) {
          this.batchlist = []
        } else {
          this.batchlist = []
          this.orderlist.tobeconfirmed.forEach(
            item => this.batchlist.push(item.orderId)
          )
        }

      },
      goPick(){
        this.batchlist = []
        this.batch = true
      },
      cancelPick(){
        //退出批量选择
        this.batchlist = []
        this.batch ? this.batch = false : null
      },
      orderClick: function (orderId) {
        //非批量模式下点击订单跳转至详情页面
        if (!this.batch) {
          this.batchlist = []
          this.goto('/pms/PREPAY/detail/' + orderId)
        }
      }
    },
    watch: {
      'route.params.tab': function (val) {
        val ? this.cancelPick() : null
      }
    },
    mounted(){
      this.tobeconfirmed()
      this.confirmed()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
