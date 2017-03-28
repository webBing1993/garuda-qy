<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabmenu"
                 :key="index"
                 :selected="route.params.tab == index"
                 @click.native="goto('/pms/prepay/'+index)">{{item}}






        </TabItem>
      </Tab>
      <div class="toolbar" v-if="batch">
        <span @click="allPick"
              class="allpick"
              :class="{batch:batchlist.length === orderlist.tobeconfirmed.length}">全选</span>
        <span @click="cancelPick">取消操作</span>
      </div>
    </header>

    <scroller :pulldown-config="app.scroller.config"
              height="-44"
              @on-pulldown-loading="donePullDown('tbc')"
              ref="tbc"
              v-show="route.params.tab == 0"
              use-pulldown
              lock-x>
      <section :class="{batch}">
        <checker v-model="batchlist"
                 type="checkbox"
                 default-item-class="item"
                 selected-item-class="selected">
          <checker-item v-for="(item,index) in orderlist.tobeconfirmed"
                        :key="index"
                        :value="item.orderId">
            <orderitem :orderId="item.orderId"
                       :status="item.status"
                       :date="item.date"
                       :booker="item.booker"
                       :phoneNum="item.phoneNum"
                       :roomType="item.roomType"
                       :roomCount="item.roomCount"
                       :fee="item.fee"
                       :prepay="item.prepay"
                       :remark="item.remark"
                       :arrow="!batch"
                       @onClick="orderClick(item.orderId)"/>
          </checker-item>
        </checker>
      </section>
    </scroller>

    <scroller v-show="route.params.tab == 1" ref="confirmed" lock-x>
      <section>
        <orderitem v-for="(item,index) in orderlist.confirmed"
                   key="'confirmed'+index"
                   :orderId="item.orderId"
                   :status="item.status"
                   :date="item.date"
                   :booker="item.booker"
                   :phoneNum="item.phoneNum"
                   :roomType="item.roomType"
                   :roomCount="item.roomCount"
                   :fee="item.fee"
                   :prepay="item.prepay"
                   :remark="item.remark"
                   :arrow="!batch"
                   @onClick="orderClick(item.orderId)"/>
      </section>
    </scroller>

    <footer v-show="route.params.tab == 0">
      <xbutton v-if="batch" red>未支付</xbutton>
      <xbutton v-else @onClick="goPick">未支付批量处理</xbutton>
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
      reset: function (ref, param) {
        //重置scroller高度
        this.$nextTick(() => this.$refs[ref].reset(param))
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
        this.batch = false
      },
      orderClick: function (orderId) {
        //非批量模式下点击订单跳转至详情页面
        if (!this.batch) {
          this.batchlist = []
          this.goto('/pms/prepay/detail/' + orderId)
        }
      }
    },
    watch: {
      'route.params.tab': function (val) {
        //切换标签卡时
        if (val == 0) {
          this.reset('tbc')
        } else {
          this.cancelPick()
          this.reset('confirmed')
        }
      },
      'batch': function (val, oldval) {
        //切换批量选择模式时
        this.reset('tbc')
      },
      'orderlist.tobeconfirmed': function () {
        //tobeconfirmed列表变化时
        this.reset('tbc')
      },
      'orderlist.confirmed': function () {
        //confirmed列表变化时
        this.reset('confirmed')
      }
    },
    mounted(){
      //获取tobeconfirmed&confirmed列表
      this.tobeconfirmed()
      this.confirmed()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
