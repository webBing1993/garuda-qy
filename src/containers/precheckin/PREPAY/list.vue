<template>
  <article>
    <header>
      <Tab>
        <TabItem v-for="(item,index) in tabmenu" :key="index"
                 :value="item" :selected="currentTab === index"
                 @click.native="replaceto('/precheckin/prepay/'+index)"/>
      </Tab>
      <div class="batchbar" v-if="batch">
        <span class="allpick" :class="{batch:batchlist.length === tobeconfirmed.length}" @click="allPick">全选</span>
        <span @click="cancelPick">取消操作</span>
      </div>
    </header>

    <scroller v-show="!currentTab"
              :pulldown-config="Interface.scroller"
              :depend="[tobeconfirmed,batch]"
              @on-pulldown-loading="getList"
              use-pulldown
              height="-44"
              lock-x>
      <div class="scroller-wrap" :class="{batch}">
        <checker type="checkbox" v-model="batchlist"
                 default-item-class="checker-item" selected-item-class="selected">
          <checker-item v-for="(item,index) in tobeconfirmed" :key="index" :value="item.order_id">
            <Group>
              <Cell :title="getCellTitle(item)"/>
              <Cell :title="getCellBody(item)" link @onClick="orderClick(item.order_id)"/>
              <Cell v-if="item.remark" :title="getCellFooter(item)"/>
            </Group>
          </checker-item>
        </checker>
      </div>
    </scroller>

    <scroller v-show="currentTab"
              :depend="[confirmed,batch]"
              :pulldown-config="Interface.scroller"
              @on-pulldown-loading="getList"
              use-pulldown
              height="-44"
              lock-x>
      <div class="scroller-wrap">
        <Group v-for="(item,index) in confirmed" :key="index">
          <Cell :title="getCellTitle(item)"/>
          <Cell :title="getCellBody(item)" link @onClick="orderClick(item.order_id)"/>
          <Cell v-if="item.remark" :title="getCellFooter(item)"/>
        </Group>
      </div>
    </scroller>

    <footer v-show="route.params.tab == 0">
      <x-button v-if="batch" value="未支付" @onClick="setMultiConfirm" warn/>
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
      ]),
      currentTab(){
        return parseInt(this.route.params.tab)
      },
      renderList(){
        return this.currentTab ? this.confirmed : this.tobeconfirmed
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'getconfirmelist',
        'multiconfirm'
      ]),
      getCellTitle(item){
        let paystatus = null
        if (item.payinfo.staff_pay !== null) {
          paystatus = item.payinfo.staff_pay === 0
            ? 0 // 未支付
            : item.payinfo.staff_pay === item.payinfo.total_roomfee
              ? 1 // 已付全额
              : 2 // 已付其他
        }
        let paystatusdom = ``
        if (paystatus !== null) {
          paystatusdom = paystatus === 0
            ? `<span class="cell-right warn">未支付</span>`
            : paystatus === 1
              ? `<span class="cell-right primary">已付全额</span>`
              : `<span class="cell-right other">已付其他</span>`
        }

        return `<p><span class="cell-key">订单号：</span><span class="cell-value">${item.order_pmsid}</span>${paystatusdom || ''}</p>`
      },
      getCellBody(item){
        let roomtypewords = ''
        item.rooms_plan.forEach(i => roomtypewords += (i.room_type + 'x' + i.room_count))
        let paiddom = item.payinfo.staff_pay !== null ? `<span class="cell-right"><span class="cell-key">已付：</span>${'¥' + (item.payinfo.staff_pay / 100 || 0)}</span>` : ``

        return `<div class="cell-body">` +
          `<p><span class="cell-key">预订人：</span><span class="cell-value">${item.owner + ' ' + item.owner_tel}</span></p>` +
          `<p><span class="cell-key">房型：</span><span class="cell-value">${roomtypewords}</span></p>` +
          `<p><span class="cell-key">房费：</span><span class="cell-value">${'¥' + item.payinfo.total_roomfee / 100}</span>${paiddom}</p>` +
          `</div>`
      },
      getCellFooter(item){
        return `<p><span class="cell-key">备注：</span><span class="cell-value">${item.remark}</span></p>`
      },
      getList(){
        const currentList = this.currentTab ? 'confirmed' : 'tobeconfirmed'
        this.getconfirmelist({
          status: this.currentTab,
          onsuccess: body => this[currentList] = [...body.data]
        })
      },
      initList(){
        if ((this.currentTab && this.confirmed.length === 0) || (!this.currentTab && this.tobeconfirmed.length === 0)) {
          this.getList()
        }
      },
      goPick(){
        // 批量选择
        this.batchlist = []
        this.batch = true
      },
      cancelPick(){
        // 退出批量选择
        this.batchlist = []
        this.batch ? this.batch = false : null
      },
      allPick(){
        // 全选和取消全选
        if (this.batchlist.length === this.tobeconfirmed.length) {
          this.batchlist = []
        } else {
          this.batchlist = [];
          this.tobeconfirmed.forEach(
            item => this.batchlist.push(item.order_id)
          )
        }
      },
      orderClick: function (orderId) {
        //非批量模式下点击订单跳转至详情页面
        if (!this.batch) {
          this.batchlist = []
          this.goto('/precheckin/prepay/detail/' + orderId)
        }
      },
      setMultiConfirm() {
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
      }
    },
    watch: {
      currentTab: function (val, oldval) {
        this.cancelPick()
        typeof val === 'number' ? this.initList() : null
      }
    },
    activated(){
      this.getList()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
