<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in renderTabMenu"
                 :key="'tabmenu'+index"
                 :value="item"
                 :selected="route.params.tab == index" @onSelected="toggleTab(index)">
        </TabItem>
      </Tab>
    </header>

    <scroller :pulldown-config="app.scroller.config"
              depend="renderList"
              @on-pulldown-loading=""
              use-pulldown
              lock-x
              height="-44">
      <section>
        <orderitem v-for="(item,index) in renderList"
                   :key="index"
                   :orderId="item.order_pmsid"
                   :inTime="item.in_time"
                   :outTime="item.out_time"
                   :booker="item.owner"
                   :phoneNum="item.owner_tel"
                   :rooms="item.rooms_plan"
                   :arrow=true
                   @onClick="goto('/preorder/' + item.order_id)"></orderitem>
      </section>
    </scroller>

    <footer>
      <div class="select">
        <span v-if="!isToday" @click="isCalendarShow = true">
          <abbr v-if="periodFilter[0]">{{periodFilter[0] | datetimeparse}} - {{periodFilter[1] | datetimeparse}}</abbr>
          <abbr v-else>筛选</abbr>
        </span>
        <span @click="isSortShow = true">{{isSequence ? '时间正序' : '时间倒序'}}</span>
      </div>
    </footer>

    <popup v-model="isSortShow"
           maskShow
           bottom
           animationTopBottom>
      <div class="sort">
        <div v-for="(item,index) in sortMenu" class="sortText" :key="index">
          <span :class="{selected:isSequence === index}" @click="isSequence = index, isSortShow = false">{{item}}</span>
        </div>
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
        'app',
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
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'gettodaylist',
        'gethistorylist'
      ]),
      toggleTab(index){
        let newpath = this.route.path.replace(this.route.params.tab, index)
        this.goto(newpath)
      },
      getList() {
        if (!this.renderList.length) {
          this.isToday
            ?
            this.gettodaylist({
              is_cancelled: this.tabIndex,
              is_sequence: this.isSequence,
              onsuccess: body => this.tabIndex
                ? this.todayCancelList = body.data
                : this.toStayList = body.data
            })
            :
            this.gethistorylist({
              is_cancelled: this.tabIndex,
              is_sequence: this.isSequence,
              start: this.periodFilter[0],
              end: this.periodFilter[1],
              onsuccess: body => this.tabIndex
                ? this.historyCancelList = body.data
                : this.noShowList = body.data
            })
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
      }
    },
    watch: {
      tabIndex() {
        this.getList()
      },
      isSequence() {
        this.resetList();
        this.getList();
      },
      periodFilter() {
        this.isCalendarShow = false
        this.resetList();
        this.getList();
      }
    },
    mounted(){
      this.getList()
    }
  }
</script>

<style scoped lang="less">
  @import "./index.less";
</style>
