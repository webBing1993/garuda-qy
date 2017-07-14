<template>
  <article>
    <header class="tab-wrapper">
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabMenu"
                 :key="index"
                 :class="{'vux-1px-r': index===0}"
                 :selected="currentTab === index"
                 @click.native="replaceto('/new-identity/handle/'+index)">{{item}}</TabItem>
      </Tab>
      <!--<div class="batchbar" v-if="batch">-->
        <!--<span class="allpick" :class="{batch:batchlist.length === tobeHandled.length}" @click="allPick">全选</span>-->
        <!--<span @click="cancelPick">取消操作</span>-->
      <!--</div>-->
    </header>

    <div class="list-wrapper">
      <div v-show="!currentTab" :class="{batch}">
        <p v-show="(!tobeHandled||tobeHandled.length === 0) && tobeHandledPageIndex > 0" class="no-data">暂无数据</p>
        <checker type="checkbox" v-model="batchlist"
                 default-item-class="checker-item" selected-item-class="selected">
          <checker-item v-for="(item,index) in renderList" :key="index" :value="item.identity_id">
            <group>
              <cell :title="tobeHandledItem(item)" @onClick="orderClick(item.order_id)" link></cell>
            </group>
          </checker-item>
        </checker>
      </div>

      <div v-show="currentTab">
        <p v-show="(!handled||handled.length === 0) && handledPageIndex > 0" class="no-data">暂无数据</p>
        <group v-for="(item,index) in renderList" :key="index">
          <cell :title="item.room.room_number + ' '+ item.room.room_type_name"
                :value="datetimeparse(item.created_time,'hhmm')"></cell>
          <cell :title="handledItem(item,item.in_time,item.out_time)" @onClick="orderClick(item.order_id)"></cell>
        </group>
      </div>
    </div>

    <footer v-show="route.params.tab == 0 && tobeHandled.length !== 0 && tobeHandledPageIndex > 0">
      <div class="button-group">
        <div class="pick-btn-group" v-if="batch">
          <x-button value="取消" @onClick="cancelPick" plain/>
          <x-button value="确认选择" @onClick="setMultiConfirm"/>
        </div>
        <x-button class="blue-btn" v-else @onClick="goPick()" value="批量处理"/>
      </div>
    </footer>

    <footer v-if="currentTab">
      <div class="listFilter">
        <span class="filter" @click="isCalendarShow = true">
          <abbr v-if="periodFilter[0]">{{datetimeparse(periodFilter[0])}} - {{datetimeparse(periodFilter[1])}}</abbr>
          <abbr v-else>筛选</abbr>
        </span>
      </div>
    </footer>

    <popup v-model="isCalendarShow"
           maskShow
           bottom
           animationTopBottom>
      <calendar v-model="periodFilter" @onReset="resetFilter" @onCancel="isCalendarShow = false"></calendar>
    </popup>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  module.exports = {
    name: 'List',
    data(){
      return {
        tabMenu: ['待办理', '已办理'],
        tobeHandled: [],
        handled: [],
        batch: false,
        batchlist: [],
        tobeHandledPageIndex: 0,
        handledPageIndex: 0,
        periodFilter: [null, null],
        isCalendarShow: false
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
        return this.currentTab ? this.handled : this.tobeHandled
      },
      renderPageIndex(){
        return this.currentTab ? this.handledPageIndex : this.tobeHandledPageIndex
      }
    },
    methods: {
      ...mapActions([
        'getIdentities',
        'replaceto',
        'goto'
      ]),
      goPick(){
        // 批量选择
        this.batchlist = [];
        this.batch = true
      },
      cancelPick(){
        // 退出批量选择
        this.batchlist = []
        this.batch ? this.batch = false : null
      },
      allPick(){
        // 全选和取消全选
        if (this.batchlist.length === this.tobeHandled.length) {
          this.batchlist = []
        } else {
          this.batchlist = [];
          this.tobeHandled.forEach(
            item => this.batchlist.push(item.identity_id)
          )
        }
      },
      orderClick: function (orderId) {
        //非批量模式下点击订单跳转至详情页面
        if (!this.batch) {
          this.batchlist = []
          this.goto('/new-identity/' + orderId)
        }
      },
      tobeHandledItem(item){
        let dom = ``;
        item.guests.forEach(i => {
          dom +=`<div class="cell-body">` +
            `<p><span class="cell-key">姓名：</span><span class="cell-value">${i.name}</span></p>` +
            `<p><span class="cell-key">身份证：</span><span class="cell-value">${this.idnumber(i.idcard)}</span></p>` +
            `</div>`
        });

        return dom
      },
      handledItem(item,in_time,out_time){
        let dom = ``;
        item.guests.forEach(i => {
          dom += `<div class="cell-body">` +
            `<p><span class="cell-key">姓名：</span><span class="cell-value">${i.name}</span></p>` +
            `<p><span class="cell-key">身份证：</span><span class="cell-value">${this.idnumber(i.idcard)}</span></p>` +
            `</div>`
        });
        dom += `<p><span class="cell-key">入离：</span><span class="cell-value">${this.datetimeparse(in_time)} - ${this.datetimeparse(out_time)}</span></p>`

        return dom
      },
      getList(callback){
        this.getIdentities({
//          scope: this.isToday ? 'TODAY' : 'HISTORY',
          status: this.currentTab ? 'HANDLED' : 'TOBEHANDLED',
          start_time: this.periodFilter[0],
          end_time: this.periodFilter[1],
          onsuccess: callback
        })
      },
      initList(){
        if ((this.currentTab && !this.handled.length) || (!this.currentTab && !this.tobeHandled.length)) {
          this.getList(body => (this[this.currentTab ? 'handled' : 'tobeHandled'] = [...body.data], this.currentTab ? this.handledPageIndex++ : this.tobeHandledPageIndex++))
        }
      },
      setMultiConfirm() {
        if (this.batchlist.length != 0) {
//          this.multiconfirm({
//            order_ids: this.batchlist,
//            onsuccess: () => {
//              this.batchlist.forEach(item => {
//                let tempIndex = this.tobeHandled.findIndex(i => i.identity_id === item);
//                tempIndex > -1
//                  ? this.tobeHandled.splice(tempIndex, 1)
//                  : null
//              });
//
//              this.cancelPick()
//            }
//          })
        }
      },
      refreshList(){
        this.getList(body => this[this.currentTab ? 'handled' : 'tobeHandled'] = [...body.data])
      },
      resetList(){
        this.handled = []
        this.tobeHandled = []
      },
      resetFilter() {
        this.periodFilter = [null, null]
      }
    },
    mounted(){
      this.initList()
    },
    watch: {
      currentTab(val) {
        typeof val === 'number' && !isNaN(val) ? this.initList() : null
      },
      periodFilter(){
        this.refreshList()
      }
    },
    activated(){
      this.refreshList();
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
