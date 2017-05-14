<template>
  <article>
    <header class="tab-wrapper">
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

    <div class="list-wrapper">
      <p class="synchronize">
        上次同步PMS时间: {{datetimeparse(hotel.order_update_time, 'MMDDhhmm')}}
        <x-button mini value="同步" @onClick="syncTime"></x-button>
      </p>

      <div v-show="!currentTab" :class="{batch}">
        <p v-show="(!tobeconfirmed||tobeconfirmed.length === 0) && tobeConfirmedPageIndex > 0" class="no-data">暂无数据</p>
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

      <div v-show="currentTab">
        <p v-show="(!confirmed||confirmed.length === 0) && confirmedPageIndex > 0" class="no-data">暂无数据</p>
        <Group v-for="(item,index) in confirmed" :key="index">
          <Cell :title="getCellTitle(item)"/>
          <Cell :title="getCellBody(item)" link @onClick="orderClick(item.order_id)"/>
          <Cell v-if="item.remark" :title="getCellFooter(item)"/>
        </Group>
      </div>
    </div>

    <footer v-show="route.params.tab == 0 && tobeconfirmed.length !== 0 && tobeConfirmedPageIndex > 0">
      <div class="button-group">
        <x-button v-if="batch" value="未支付" @onClick="setMultiConfirm" warn/>
        <x-button class="blue-btn" v-else @onClick="goPick" value="未支付批量处理"/>
      </div>
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
        confirmed: [],
        tobeConfirmedPageIndex: 0,
        confirmedPageIndex: 0
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route',
        'hotel'
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
        'multiconfirm',
        'hotelrefresh',
      ]),
      getCellTitle(item){
        let paystatus = item.payinfo.pay_mode;
        console.log(paystatus)
        let paystatusdom = ``
        if (paystatus) {
          paystatusdom = paystatus === 1
            ? `<span class="cell-right warn">现付</span>`
            : paystatus === 2
              ? `<span class="cell-right primary">预付</span>`
              : `<span class="cell-right other">后付/挂账等</span>`
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
      getList(callback){
        this.getconfirmelist({
          status: this.currentTab,
          onsuccess: callback
        })
      },
      initList(){
        if ((!this.currentTab && this.tobeconfirmed.length === 0) || (this.currentTab && this.confirmed.length === 0)) {
          this.getList(body => (this[this.currentTab ? 'confirmed' : 'tobeconfirmed'] = [...body.data], this.currentTab ? this.confirmedPageIndex++ : this.tobeConfirmedPageIndex++))
        }
      },
      refreshList(){
        this.getList(body => this[this.currentTab ? 'confirmed' : 'tobeconfirmed'] = [...body.data])
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

              this.cancelPick()
            }
          })
        }
      },
      syncTime(){
        this.hotelrefresh({
          onsuccess: (body) => this.refreshList()
        })
      }
    },
    watch: {
      currentTab: function (val, oldval) {
        this.cancelPick()
        typeof val === 'number' && !isNaN(val) ? this.initList() : null
      }
    },
    activated(){
      this.initList();
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
