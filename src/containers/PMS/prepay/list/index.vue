<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabmenu"
                 :key="index"
                 @click.native="goto('/pms/prepay/'+index)"
                 :selected="route.params.tab == index">
          {{item}}
        </TabItem>
      </Tab>
      <div class="toolbar" v-if="batch">
        <span @click="allPick">全选</span>
        <span @click="cancelPick">取消操作</span>
      </div>
    </header>

    <scroller ref="tbcscroller"
              v-show="route.params.tab == 0"
              lock-x>
      <section :class="{'batch':batch}">
        <checker v-model="batchlist"
                 type="checkbox"
                 default-item-class="item"
                 selected-item-class="selected">
          <checker-item v-for="(item,index) in orderlist.tobeconfirmed"
                        :key="index"
                        :value="item.orderId"
                        @on-item-click="orderClick(item.orderId)">
            <Group>
              <cell>
                <span>订单号：</span>
                <span>{{item.orderId}}</span>
              </cell>
              <cellbox>
                <ul>
                  <li><span>预订人：</span><span>{{item.booker}}</span><span>{{item.phoneNum}}</span></li>
                  <li><span>房型：</span><span>{{item.roomType}}x{{item.roomCount}}</span></li>
                  <li><span>房费：{{item.fee}}</span><span>已付：{{item.prepay}}</span></li>
                </ul>
              </cellbox>
              <cell v-if="item.remark">
                <span>备注：</span><span>{{item.remark}}</span>
              </cell>
            </Group>
          </checker-item>
        </checker>
      </section>
    </scroller>

    <scroller ref="confirmedscroller"
              v-show="route.params.tab == 1"
              lock-x>
      <section class="confirmed">
        <Group v-for="(item,index) in orderlist.confirmed"
               :key="index">
          <cell>
            <span>订单号：</span>
            <span>{{item.orderId}}</span>
          </cell>
          <cellbox>
            <ul>
              <li><span>预订人：</span><span>{{item.booker}}</span><span>{{item.phoneNum}}</span></li>
              <li><span>房型：</span><span>{{item.roomType}}x{{item.roomCount}}</span></li>
              <li><span>房费：{{item.fee}}</span><span>已付：{{item.prepay}}</span></li>
            </ul>
          </cellbox>
          <cell v-if="item.remark">
            <span>备注：</span><span>{{item.remark}}</span>
          </cell>
        </Group>
      </section>
    </scroller>

    <footer v-show="route.params.tab == 0">
      <btn v-if="batch" red>未支付</btn>
      <flexbox v-else>
        <flexbox-item>
          <btn>拉取新订单</btn>
        </flexbox-item>
        <flexbox-item>
          <btn reverse @onClick="goPick">无信息批量处理</btn>
        </flexbox-item>
      </flexbox>
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
        'route',
        'orderlist'
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'tobeconfirmed',
        'confirmed'
      ]),
      reset: function (ref, param) {
        //重置scroller高度
        this.$nextTick(() => this.$refs[ref].reset(param))
      },
      allPick(){
        //全选和取消全选
        if (this.batchlist.length == this.orderlist.tobeconfirmed.length) {
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
          this.reset('tbcscroller')
        } else {
          this.cancelPick()
          this.reset('confirmedscroller')
        }
      },
      'batch': function (val, oldval) {
        //切换批量选择模式时
        this.reset('tbcscroller')
      },
      'orderlist.tobeconfirmed': function () {
        //tobeconfirmed列表变化时
        this.reset('tbcscroller')
      },
      'orderlist.confirmed': function () {
        //confirmed列表变化时
        this.reset('confirmedscroller')
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
