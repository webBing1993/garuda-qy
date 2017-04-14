<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabmenu"
                 :key="index"
                 :value="item"
                 :selected="route.params.tab == index"
                 @click.native="replaceto('/precheckin/prepay/'+index)"/>
      </Tab>
      <div class="toolbar" v-if="batch">
        <span @click="allPick"
              class="allpick"
              :class="{batch:batchlist.length === tobeconfirmed.length}">全选</span>
        <span @click="cancelPick">取消操作</span>
      </div>
    </header>

    <scroller v-show="route.params.tab == 0"
              :pulldown-config="Interface.scroller"
              :depend="[tobeconfirmed,batch]"
              height="-44"
              use-pulldown
              lock-x>
      <section :class="{batch}">
        <checker v-model="batchlist"
                 type="checkbox"
                 default-item-class="item"
                 selected-item-class="selected">
          <checker-item v-for="(item,index) in tobeconfirmed"
                        :key="index"
                        :value="item.order_id">
            <orderitem :orderId="item.order_pmsid"
                       :booker="item.owner"
                       :phoneNum="item.owner_tel"
                       :rooms="item.rooms_plan"
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
              :pulldown-config="Interface.scroller"
              height="-44"
              :depend="[confirmed,batch]"
              use-pulldown
              lock-x>
      <section>
        <orderitem v-for="(item,index) in confirmed"
                   key="'confirmed'+index"
                   :orderId="item.order_pmsid"
                   :booker="item.owner"
                   :phoneNum="item.owner_tel"
                   :rooms="item.rooms_plan"
                   :fee="item.payinfo.total_roomfee"
                   :prepay="item.payinfo.staff_pay"
                   :remark="item.remark"
                   :arrow="!batch"
                   @onClick="orderClick(item.order_id)"/>
      </section>
    </scroller>

    <footer v-show="route.params.tab == 0">
      <x-button v-if="batch" value="未支付" @onClick="setMulticonfirm" warn/>
      <x-button class="blue-btn" v-else @onClick="goPick" value="未支付批量处理"/>
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
        tobeconfirmed: [],
        confirmed: []
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route'
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'getconfirmelist',
        'multiconfirm'
      ]),
      donePullDown: function (ref) {
        //刷新
        this.$nextTick(() => setTimeout(() => this.$refs[ref].donePulldown(), 3000))
      },
      allPick(){
        //全选和取消全选
        if (this.batchlist.length === this.tobeconfirmed.length) {
          this.batchlist = []
        } else {
          this.batchlist = [];
          this.tobeconfirmed.forEach(
            item => this.batchlist.push(item.order_id)
          )
        }
      },
      setMulticonfirm() {
        if (this.batchlist.length != 0) {
          this.multiconfirm({
            order_ids: this.batchlist,
            onsuccess: () => {
              this.batchlist.forEach(item => {
                let tempIndex = this.tobeconfirmed.findIndex(i => i.order_id === item);
                tempIndex > -1
                  ? this.tobeconfirmed.splice(tempIndex, 1)
                  : null
              });
              if (this.tobeconfirmed.length === 0) {
                this.batchlist = [];
                this.batch = false;
              }
            }
          })
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
          this.goto('/precheckin/prepay' + orderId)
        }
      }
    },
    watch: {
      'route.params.tab': function (val, oldval) {
        val ? this.cancelPick() : null;
        if (val == 0 && !this.tobeconfirmed.length) {
          console.log(0)
          this.getconfirmelist({
            status: val,
            onsuccess: body => this.tobeconfirmed = body.data
          })
        } else if (val == 1 && !this.confirmed.length) {
          console.log(1)
          this.getconfirmelist({
            status: val,
            onsuccess: body => this.confirmed = body.data
          })
        }
      }
    },
    mounted(){
      this.getconfirmelist({
        status: this.$route.params.tab,
        onsuccess: body => this[this.$route.params.tab == 0 ? 'tobeconfirmed' : 'confirmed'] = body.data
      })
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
