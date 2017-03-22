<template>
  <article>
    <header>
      <Tab active-color="#373946" defaultColor="#8F8F8F" activeColor="#373946">
        <TabItem v-for="(item,index) in tabmenu"
                 :key="index"
                 @click.native="goto('/pms/prepay/'+index)"
                 :selected="route.params.tab == index">{{item}}
        </TabItem>
      </Tab>
      <div class="toolbar" v-if="batch">
        <span @click="allPick">全选</span>
        <span @click="cancelPick">取消操作</span>
      </div>
    </header>

    <scroller v-show="route.params.tab == '0'" lock-x ref="tbcscroller">
      <section class="tobeconfirmed" :class="{'checklist':batch}">
        <checker v-model="batchlist"
                 type="checkbox"
                 default-item-class="item"
                 selected-item-class="selected">
          <checker-item v-for="(item,index) in orderlist.tobeconfirmed" :key="index" :value="item.orderId"
                        @on-item-click="orderClick(item.orderId)">
            <Group class="group">
              <cell>
                <span>订单号：</span>
                <span>{{item.orderId}}</span>
              </cell>
              <cellbox>
                <ul>
                  <li>
                    <span>预订人：</span>
                    <span>{{item.booker}}</span>
                    <span>{{item.phoneNum}}</span>
                  </li>
                  <li>
                    <span>房型：</span>
                    <span>{{item.roomType}}x{{item.roomCount}}</span>
                  </li>
                  <li>
                    <span>房费：{{item.fee}}</span>
                    <span>已付：{{item.prepay}}</span>
                  </li>
                </ul>
              </cellbox>
              <cell v-if="item.remark">
                <span>备注：</span>
                <span>{{item.remark}}</span>
              </cell>
            </Group>
          </checker-item>
        </checker>
      </section>
    </scroller>

    <scroller v-show="route.params.tab == 1" lock-x ref="confirmedscroller">
      <section class="confirmed">
        <Group class="group" v-for="(item,index) in orderlist.confirmed" :key="index">
          <cell>
            <span>订单号：</span>
            <span>{{item.orderId}}</span>
          </cell>
          <cellbox>
            <ul>
              <li>
                <span>预订人：</span>
                <span>{{item.booker}}</span>
                <span>{{item.phoneNum}}</span>
              </li>
              <li>
                <span>房型：</span>
                <span>{{item.roomType}}x{{item.roomCount}}</span>
              </li>
              <li>
                <span>房费：{{item.fee}}</span>
                <span>已付：{{item.prepay}}</span>
              </li>
            </ul>
          </cellbox>
          <cell v-if="item.remark">
            <span>备注：</span>
            <span>{{item.remark}}</span>
          </cell>
        </Group>
      </section>
    </scroller>

    <footer v-show="route.params.tab == '0'">
      <btn v-if="batch" red>未支付</btn>
      <flexbox v-else>
        <flexbox-item>
          <btn>拉取新订单</btn>
        </flexbox-item>
        <flexbox-item>
          <btn reverse @onClick="batch = true,batchlist=[]">无信息批量处理</btn>
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
        currenttab: "待确认",
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
        this.$nextTick(() => this.$refs[ref].reset(param))
      },
      allPick(){
        this.batchlist.length === this.orderlist.tobeconfirmed.length
          ? this.batchlist = []
          : (this.batchlist = [], this.orderlist.tobeconfirmed.forEach(item => this.batchlist.push(item.orderId)))
      },
      cancelPick(){
        this.batchlist = []
        this.batch = false
      },
      orderClick: function (orderId) {
        !this.batch ? (this.batchlist = [], this.goto('/pms/prepay/detail/' + orderId)) : null
      }
    },
    watch: {
      'route.params.tab': function (val) {
        val == 1 ? (this.batch = false, this.reset('confirmedscroller')) : this.reset('tbcscroller')
      },
      'batch': function (val, oldval) {
        this.reset('tbcscroller')
      },
      'orderlist.tobeconfirmed': function () {
        this.reset('tbcscroller')
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
