<template>
  <article class="preorder-list">
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in renderTabMenu"
                 :key="'tabmenu'+index"
                 :value="item"
                 :selected="route.params.tab == index" @onSelected="toggleTab(index)">
        </TabItem>
      </Tab>
    </header>

    <scroller :pulldown-config="Interface.scroller"
              :depend="renderList"
              @on-pulldown-loading="getList"
              use-pulldown
              lock-x
              height="-44">
      <div class="scroller-wrap">
        <Group v-for="(item,index) in renderList" :key="index">
          <Cell :title="getCellTitle(item)"/>
          <Cell :title="getCellBody(item)" link @onClick="goto('/precheckin/order/detail/' + item.order_id)"/>
        </Group>
      </div>
    </scroller>

    <footer>
      <div class="listFilter">
        <span class="filter" v-if="!isToday" @click="isCalendarShow = true">
          <abbr v-if="periodFilter[0]">{{datetimeparse(periodFilter[0])}} - {{datetimeparse(periodFilter[1])}}</abbr>
          <abbr v-else>筛选</abbr>
        </span>
        <span class="sort" @click="isSortShow = true">{{isSequence ? '时间正序' : '时间倒序'}}</span>
      </div>
    </footer>

    <popup v-model="isSortShow"
           maskShow
           bottom>
      <div class="sortmenu">
        <p v-for="(item,index) in sortMenu" :key="index"
           class="sortText" :class="{selected:isSequence === index}"
           @click="isSequence = index, isSortShow = false">
          <span>{{item}}</span>
        </p>
      </div>
    </popup>

    <popup v-model="isCalendarShow"
           maskShow
           bottom
           animationTopBottom>
      <calendar v-model="periodFilter" @onReset="resetFilter" @onCancel="isCalendarShow = false"></calendar>
    </popup>
  </article>
</template>
<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  module.exports = {
    name: 'list',
    data(){
      return {
        // today
        todayTabMenu: ["待入住", "已取消"],
        toStayList: [],
        todayCancelList: [],

        // history
        historyTabMenu: ["NO-SHOW", "已取消"],
        noShowList: [],
        historyCancelList: [],

        // common
        isSequence: 0,
        periodFilter: [null, null],
        sortMenu: ['预订时间从晚到早', '预订时间从早到晚'],
        isSortShow: false,
        isCalendarShow: false
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route'
      ]),
      isToday(){
        return !!this.$route.path.match(/today/)
      },
      tabIndex(){
        return +this.route.params.tab
      },
      renderTabMenu() {
        return this.isToday ? this.todayTabMenu : this.historyTabMenu
      },
      renderList(){
        return this.isToday
          ? this.tabIndex
            ? this.todayCancelList
            : this.toStayList
          : this.tabIndex
            ? this.historyCancelList
            : this.noShowList
      },
      maxAndMin() {
        let timeList = [];
        this.renderList.forEach(item => timeList.push(item.in_time));
        timeList.sort((a, b) => a - b);
        return [timeList[0], timeList[timeList.length - 1]];
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'gettodaylist',
        'gethistorylist'
      ]),
      getCellTitle(item){
        let alertdom = item.status.is_recording_success ? `` : `<span class="cell-right warn">入账失败</span>`
        return `<p><span class="cell-key">订单号：</span><span class="cell-value">${item.order_pmsid}</span>${alertdom}</p>`
      },
      getCellBody(item){
        let roomtypewords = ''
        item.rooms_plan.forEach(i => roomtypewords += (i.room_type + 'x' + i.room_count))
        let time = this.datetimeparse(item.timeline.precheckin_done, this.isToday ? 'hhmm' : 'MMddhhmm')
        return `<div class="cell-body">` +
          `<p><span class="cell-key">预订人：</span><span class="cell-value">${item.owner + ' ' + item.owner_tel}</span></p>` +
          `<p><span class="cell-key">房型：</span><span class="cell-value">${roomtypewords}</span><span class="cell-key cell-right">${time}</span></p>` +
          `</div>`
      },
      toggleTab(index){
        let newpath = this.route.path.replace(this.route.params.tab, index);
        this.replaceto(newpath);
      },
      getList() {
        let currentList = this.tabIndex;
        this.isToday
          ?
          this.gettodaylist({
            is_cancelled: currentList,
            is_sequence: this.isSequence,
            onsuccess: body => currentList
              ? this.todayCancelList = body.data
              : this.toStayList = body.data
          })
          :
          this.gethistorylist({
            is_cancelled: currentList,
            is_sequence: this.isSequence,
            start: this.periodFilter[0],
            end: this.periodFilter[1],
            onsuccess: body => currentList
              ? this.historyCancelList = body.data
              : this.noShowList = body.data
          })
      },
      initList(){
        if (!this.renderList.length) {
          this.getList()
        }
      },
      resetList() {
        this.todayCancelList = []
        this.toStayList = []
        this.historyCancelList = []
        this.noShowList = []
      },
      resetFilter() {
        console.log('resetFilter')
        this.periodFilter = [null, null]
      },
    },
    watch: {
      tabIndex(val) {
        val >= 0 ? this.getList() : null
      },
      isSequence() {
        this.resetList();
        this.getList();
      },
      periodFilter() {
        this.resetList();
        this.getList();
        this.isCalendarShow = false;
      }
    },
    mounted(){
      this.initList()
    },
    activated(){
      //reset all data
      this.getList();
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
