<template>
  <article>
    <Tab active-color="#373946">
      <TabItem v-for="(item,index) in tabMenu"
               :key="index"
               :class="{'vux-1px-r': index===0}"
               :selected="currentTab === index"
               @on-item-click="toggleTab(index)">{{item}}
      </TabItem>
    </Tab>

    <scroller lock-x :scrollbar-x=false
              :pulldown-config="Interface.scroller"
              @on-pulldown-loading="refreshList"
              :depend="tobeHandled"
              height="-45"
              use-pulldown
              v-show="!currentTab">
      <div class="scroller-wrap">
        <div v-show="!currentTab" :class="{batch}">
          <p v-show="(!tobeHandled||tobeHandled.length === 0) && tobeHandledPageIndex > 0" class="no-data">暂无数据</p>
          <checker type="checkbox" v-model="batchlist" default-item-class="checker-item" selected-item-class="selected">
            <checker-item v-for="(item,index) in renderList" :key="index" :value="item.lvyeReportRecordId">
              <group>
                <cell :title="tobeHandledItem(item)" @onClick="orderClick(item.lvyeReportRecordId)" link></cell>
              </group>
            </checker-item>
          </checker>
        </div>
      </div>
    </scroller>

    <scroller lock-x :scrollbar-x=false
              :pulldown-config="Interface.scroller"
              @on-pulldown-loading="refreshList"
              :depend="handled"
              height="-45"
              use-pulldown
              v-show="currentTab">
      <div class="scroller-wrap">
        <div v-show="currentTab">
          <p v-show="(!handled||handled.length === 0) && handledPageIndex > 0" class="no-data">暂无数据</p>
          <group v-for="(item,index) in handled" :key="index" :title="titleFilter(index)">
            <cell :title="'房间 '+ ' '+ (item.roomNumber ?  item.roomNumber : '')"
                  :value="datetimeparse(item.createdTime,'hhmm')"></cell>
            <cell :title="handledItem(item,item.inTime,item.outTime)"
                  @onClick="orderClick(item.lvyeReportRecordId)"></cell>
          </group>
        </div>
      </div>
    </scroller>


    <footer v-show="route.params.tab == 0 && tobeHandled.length !== 0 && tobeHandledPageIndex > 0">
      <div class="button-group">
        <div class="pick-btn-group" v-if="batch">
          <x-button value="取消" @onClick="cancelPick" plain/>
          <x-button value="确认选择" @onClick="showDialog = true"/>
        </div>
        <x-button class="blue-btn" v-else @onClick="goPick()" value="合并入住"/>
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

    <popup v-model="isCalendarShow" maskShow bottom animationTopBottom>
      <calendar v-model="periodFilter" @onReset="resetFilter" @onCancel="isCalendarShow = false"></calendar>
    </popup>

    <Dialog v-show="select" v-model="showDialog">
      <div class="dialog-report-info">
        <div class="report-info ">
          <div class="info-item">
            <label class="item-left">入住人:</label>
            <span class="item-right">{{selectedName.join()}}</span>
          </div>
          <div class="info-item">
            <label class="item-left">房间号码:</label>
            <input class="item-right room-number" v-model="roomNumber"/>
          </div>
          <div class="search">
            <label>搜索结果</label>
            <ul class="search-result" v-if="resultList.length > 0">
              <li v-for=" result in resultList" @click="resultPick(result)">{{result}}</li>
            </ul>
          </div>
          <p class="error-room-number" v-if="isErrorNumber && roomNumberList.length>0">房间号输入错误</p>
          <div class="info-item">
            <label class="item-left">入住几晚:</label>
            <div class="item-right days-item">
              <span class="days-reduce" @click="daysReduce">-</span>
              <input type="number" class="days" v-model="days"/>
              <span class="days-add" @click="daysAdd()">+</span>
            </div>
          </div>
          <div class="info-item">
            <label class="item-left">入住时间:</label>
            <span class="item-right">{{datetimeparse(inTimeFilter)}}</span>
          </div>

          <div class="info-item">
            <label class="item-left">离店时间:</label>
            <span class="item-right">{{datetimeparse(outTimeFilter)}}</span>
          </div>
          <x-button value="上传旅业系统" @onClick="isInfoDialogShow"
                    :disabled="!roomNumber || !days || !inTimeFilter || !outTimeFilter"></x-button>
        </div>
      </div>
    </Dialog>

    <Dialog v-show="!select" v-model="showInfoDialog" confirm cancel @onCancel="infoDialogCancel"
            @onConfirm="setMultiConfirm">
      <ul class="dialog-info">
        <li class="info-col"><span class="dialog-key">姓名：</span><span
          class="dialog-value">{{selectedName.join()}}</span></li>
        <li class="info-col"><span class="dialog-key">房间：</span><span class="dialog-value">{{roomNumber}}</span></li>
        <li class="info-col"><span class="dialog-key">入住天数：</span><span class="dialog-value">{{days}}</span></li>
        <li class="info-col"><span class="dialog-key">入住日期：</span><span
          class="dialog-value">{{datetimeparse(inTimeFilter)}}</span></li>
        <li class="info-col"><span class="dialog-key">离店日期：</span><span
          class="dialog-value">{{datetimeparse(outTimeFilter)}}</span></li>
      </ul>
    </Dialog>
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
        isCalendarShow: false,
        roomNumber: '',
        days: 1,
        inTimeFilter: Date.parse(new Date()),
        outTimeFilter: '',
        showDialog: false,
        showInfoDialog: false,
        select: true,
        resultList: [],
        isErrorNumber: false,
        canSearch: true
      }
    },
    computed: {
      ...mapState([
        'route',
        'Interface',
        'roomNumberList'
      ]),
      currentTab(){
        return parseInt(this.route.params.tab)
      },
      renderList(){
        return this.currentTab ? this.handled : this.tobeHandled
      },
      renderPageIndex(){
        return this.currentTab ? this.handledPageIndex : this.tobeHandledPageIndex
      },
      selectedName() {
        let names = [];
        this.tobeHandled.forEach(i => {
          let tempIndex = this.batchlist.findIndex(id => i.lvyeReportRecordId === id);
          tempIndex > -1 && names.push(i.name);
        });
        return names;
      }
    },
    methods: {
      ...mapActions([
        'replaceto',
        'goto',
        'reportLvYe',
        'newIdentityList',
        'getRoomNumberList'
      ]),
      resultPick(item) {
        this.canSearch = false;
        this.roomNumber = item;
        this.resultList = [];
      },
      infoDialogCancel(){
        this.showInfoDialog = false;
        this.select = true;
        this.showDialog = true;
      },
      isInfoDialogShow() {
        if (this.roomNumber && this.days && this.inTimeFilter && this.outTimeFilter) {
          this.select = false;
          this.showDialog = false;
          this.showInfoDialog = true;
        }
      },
      daysReduce() {
        this.days !== 1 ? this.days = this.days - 1 : null
      },
      daysAdd() {
        this.days < 10 ? this.days = this.days + 1 : null
      },
      toggleTab(index){
        let newpath = this.route.path.replace(this.route.params.tab, index);
        this.replaceto(newpath)
      },
      titleFilter(index){
        if (this.handled.length > 0) {
          return index
            ? this.datetimeparse(this.handled[index].createdTime) === this.datetimeparse(this.handled[index - 1].createdTime)
              ? null : this.datetimeparse(this.handled[index].createdTime)
            : this.datetimeparse(this.handled[index].createdTime)
        }
      },
      goPick(){
        // 批量选择
        this.batchlist = [];
        this.batch = true;
      },
      cancelPick(){
        // 退出批量选择
        this.batchlist = [];
        this.batch ? this.batch = false : null
      },
      orderClick: function (orderId) {
        //非批量模式下点击订单跳转至详情页面
        if (!this.batch) {
          this.batchlist = [];
          this.goto('/new-identity/' + orderId)
        }
      },
      setMultiConfirm() {
        if (this.batchlist.length !== 0 && this.roomNumber && this.days && this.inTimeFilter && this.outTimeFilter) {
          this.reportLvYe({
            lvyeReportRecordIds: this.batchlist,
            roomNumber: this.roomNumber, //房间号码
            nights: this.days, //入住几晚
            inTime: this.inTimeFilter, //入住几晚
            outTime: this.outTimeFilter, //入住几晚
            onsuccess: () => {
              this.batchlist.forEach(item => {
                let tempIndex = this.tobeHandled.findIndex(i => i.lvyeReportRecordId === item);
                tempIndex > -1
                  ? this.tobeHandled.splice(tempIndex, 1)
                  : null
              });
              this.cancelPick()
            }
          })
        }
      },
      tobeHandledItem(item){
        return `<div class="cell-body">` +
          `<span class="cell-right warn">待处理</abbr></span>` +
          `<p><span class="cell-key">姓名：</span><span class="cell-value">${item.name}</span></p>` +
          `<p><span class="cell-key">身份证：</span><span class="cell-value">${this.idnumber(item.idCard)}</span><span class="cell-right">${this.datetimeparse(item.createdTime, 'hhmm')}</span></p>` +
          `</div>`;
      },
      handledItem(item, in_time, out_time){
        return `<div class="cell-body">` +
          `<p><span class="cell-key">姓名：</span><span class="cell-value">${item.name}</span></p>` +
          `<p><span class="cell-key">身份证：</span><span class="cell-value">${this.idnumber(item.idCard)}</span></p>` +
          `<p><span class="cell-key">入离：</span><span class="cell-value">${this.datetimeparse(in_time)} - ${this.datetimeparse(out_time)}</span></p>` +
          `</div>`
      },
      getList(callback){
        this.newIdentityList({
          startTime: this.periodFilter ? this.periodFilter[0] : '',
          endTime: this.periodFilter ? this.periodFilter[1] : '',
          reportInStatuses: this.currentTab ? ['SUCCESS'] : ['NONE', 'FAILED'],//需要的入住上报旅业状态
          onsuccess: callback
        })
      },
      initList(){
        if ((this.currentTab && !this.handled.length) || (!this.currentTab && !this.tobeHandled.length)) {
          this.getList(body => (this[this.currentTab ? 'handled' : 'tobeHandled'] = [...body.data], this.currentTab ? this.handledPageIndex++ : this.tobeHandledPageIndex++))
        }
      },
      refreshList(){
        this.getList(body => this[this.currentTab ? 'handled' : 'tobeHandled'] = [...body.data])
      },
      resetList(){
        this.handled = [];
        this.tobeHandled = [];
      },
      resetFilter() {
        this.periodFilter = [null, null]
      }
    },
    mounted(){
      this.initList();
      this.getRoomNumberList();
      this.days === 1 && (this.outTimeFilter = new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000));
    },
    watch: {
      currentTab(val) {
        typeof val === 'number' && !isNaN(val) ? this.initList() : null
      },
      periodFilter(){
        this.refreshList();
      },
      days() {
        let nowDate = new Date();
        let tempTime = nowDate.setTime(nowDate.getTime() + 24 * 60 * 60 * 1000 * this.days);
        this.outTimeFilter = tempTime;
      },
      roomNumber(val, old) {
        if (!this.canSearch) return;
        if (!val) {
          this.resultList = [];
          this.isErrorNumber = false;
        }
        if (this.roomNumberList.length > 0 && val) {
          this.resultList = [];
          this.resultList = this.roomNumberList.filter(room => room.toString().indexOf(val) > -1);
          if (this.resultList.length === 0) this.isErrorNumber = true;
        }
      },
      resultList(val, old) {
        if (old.length > 0) this.canSearch = true
      }
    },
//    activated(){
//      this.refreshList();
//    }
  }
</script>

<style lang="less">
  @import "index.less";
</style>
