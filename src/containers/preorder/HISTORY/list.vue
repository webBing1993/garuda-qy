<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabmenu"
                 :key="index"
                 :value="item"
                 :selected="route.params.tab == index"
                 @click.native="goto('/preorder/history/'+index)">
        </TabItem>
      </Tab>
    </header>
    <scroller v-show="route.params.tab == 0"
              :pulldown-config="app.scroller.config"
              :depend="[noshowList]"
              @on-pulldown-loading="donePullDown('NO-SHOW')"
              lock-x
              ref="NO-SHOW"
              use-pulldown
              height="-44">
      <div>
        <section v-for="(item,index) in noshowList" :key="index">
          <orderitem :orderId="item.order_id"
                     :inTime="item.in_time"
                     :outTime="item.out_time"
                     :booker="item.owner"
                     :phoneNum="item.owner_tel"
                     :rooms="item.rooms_plan"
                     :arrow=true
                     @onClick="_gotodetail(item.order_id)"/>
        </section>
      </div>
    </scroller>

    <scroller v-show="route.params.tab == 1"
              :depend="[cancelledList]"
              :pulldown-config="app.scroller.config"
              @on-pulldown-loading="donePullDown('cancel')"
              lock-x
              ref="cancel"
              use-pulldown
              height="-44">
      <div>
        <section v-for="(item,index) in cancelledList" :key="index">
          <orderitem :orderId="item.order_id"
                     :inTime="item.in_time"
                     :outTime="item.out_time"
                     :booker="item.owner"
                     :phoneNum="item.owner_tel"
                     :rooms="item.rooms_plan"
                     :arrow=true
                     @onClick="_gotodetail(item.order_id)"/>
        </section>
      </div>
    </scroller>
    <footer>
      <div class="select" v-if="!popupShowCalendar || !popupShowSort">
        <span v-if="period[0] && period[1]" @click="popupShowCalendar = !popupShowCalendar"> {{period[0] | datetimeparse}} - {{period[1] | datetimeparse('MM/DD')}}| </span>
        <span v-else @click="popupShowCalendar = !popupShowCalendar">筛选 |</span>
        <span v-if="sortSelected == '预登记时间从早到晚'" @click="popupShowSort = !popupShowSort">时间正序</span>
        <span v-else-if="sortSelected == '预登记时间从晚到早'" @click="popupShowSort = !popupShowSort">时间倒序</span>
        <span v-else @click="popupShowSort = !popupShowSort">时间排序</span>
      </div>
    </footer>
    <popup v-model="popupShowCalendar"
           maskShow
           bottom
           animationTopBottom>
      <calendar @onCancel="getPeriodList(route.params.tab == 0 ? 'noshowList' : 'cancelledList')" v-model="period"/>
    </popup>
    <popup v-model="popupShowSort"
           maskShow
           bottom
           animationTopBottom>
      <div class="sort">
        <div v-for="(item,index) in sort" class="sortText" :key="index">
        <span :class="{selected:sortSelected === item}"
              @click="getSequenceList(item, item === '预登记时间从早到晚' ? 1 : 0,route.params.tab == 0 ? 'noshowList' : 'cancelledList' )">{{item}}</span>
        </div>
      </div>
    </popup>
  </article>
</template>
<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import moment from 'moment'

  export default {
    data() {
      return {
        noshowList: [],
        cancelledList: [],
        tabmenu: ["NO-SHOW", "已取消"],
        popupShowCalendar: false,
        popupShowSort: false,
        sort: ['预登记时间从早到晚', '预登记时间从晚到早'],
        sortSelected: null,
        period: [null, null]
      }
    },
    computed: {
      ...mapState([
        'app',
        'route'
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'gethistorylist',
      ]),
      donePullDown: function (ref) {
        //刷新
        this.$nextTick(() => setTimeout(() => this.$refs[ref].donePulldown(), 3000))
      },
      _gotodetail(orderId) {
        this.goto('/preorder/today/predetail/' + orderId);
      },
      //正倒序
      getSequenceList(item, sequence, scroller) {
        this.sortSelected = item;
        this.popupShowSort = false;
        console.log(item, sequence, scroller);
        this.gethistorylist({
          is_sequence: sequence,
          onsuccess: body => this[scroller] = body.data
        })
      },
      //日期时段
      getPeriodList(scroller) {
        this.popupShowCalendar= false
        this.gethistorylist({
          start: this.period[0], //筛选开始
          end: this.period[1],
          onsuccess: body => this[scroller] = body.data
        })
      }
    },
    watch: {
      'route.params.tab': function (val) {
        //切换标签卡时
        if (val == 0 && !this.noshowList.length) {
          console.log(0)
          this.gethistorylist({
            status: val,
            onsuccess: body => this.noshowList = body.data
          })
        } else if (val == 1 && !this.cancelledList.length) {
          console.log(1)
          this.gethistorylist({
            status: val,
            onsuccess: body => this.cancelledList = body.data
          })
        }
      }
    },
    mounted(){
      this.gethistorylist({
        is_cancelled: this.$route.params.tab,
        onsuccess: body => this[this.$route.params.tab == 0 ? 'noshowList' : 'cancelledList'] = body.data
      })
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>

