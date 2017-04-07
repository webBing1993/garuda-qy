<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabmenu"
                 :key="index"
                 :value="item"
                 :selected="route.params.tab == index"
                 @click.native="goto('/preorder/today/'+index)">
        </TabItem>
      </Tab>
    </header>


    <scroller v-show="route.params.tab == 0"
              :pulldown-config="app.scroller.config"
              :depend="[tostayList]"
              @on-pulldown-loading="donePullDown('tableft')"
              lock-x
              ref="tableft"
              use-pulldown
              height="-44">
      <div>
        <section v-for="(item,index) in tostayList" :key="index">
          <orderitem :orderId="item.order_id"
                     :staff_confirm_timeline="item.timeline.staff_confirm"
                     :status="item.status"
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
              @on-pulldown-loading="donePullDown('tabright')"
              lock-x
              ref="tabright"
              use-pulldown
              height="-44">
      <div>
        <section v-for="(item,index) in cancelledList" :key="index">
          <orderitem :orderId="item.order_pmsid"
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

    <!-- 弹出层 -->
    <footer>
      <div class="select">
        <span v-if="sortSelected == '预登记时间从早到晚'" @click="popupShowSort = !popupShowSort">时间正序</span>
        <span v-else-if="sortSelected == '预登记时间从晚到早'" @click="popupShowSort = !popupShowSort">时间倒序</span>
        <span v-else @click="popupShowSort = !popupShowSort">时间排序</span>
      </div>
    </footer>

    <popup v-model="popupShowSort"
           :maskShow="true"
           :bottom="true"
           :animationTopBottom="true">
      <div class="sort">
        <div v-for="(item,index) in sortMenus" class="sortText" :key="index">
        <span :class="{selected:sortSelected === item}"
              @click="getSequenceList(item, item === '预登记时间从早到晚' ? 1 : 0,route.params.tab == 0 ? 'noshowList' : 'cancelledList' )">{{item}}</span>
        </div>
      </div>
    </popup>
  </article>
</template>
<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  module.exports = {
    name: 'TODAY',
    data(){
      return {
        tostayList: {},
        cancelledList: {},
        tabmenu: ["待入住", "已取消"],
        timestamp: [],
        batch: false,
        showSort: false,
        sortMenus: ['预登记时间从早到晚', '预登记时间从晚到早'],
        sortSelected: null,
        popupShowSort: false,
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
        'getTodayList'
      ]),
      _gotodetail(orderId) {
        this.goto('/preorder/today/predetail/' + orderId);
      },
      _showSortBox(){
        this.showSort = true;
      },
      _hidSortBox(){
        this.showSort = false;
      },
      _sortClick(key) {
        this._hidSortBox();
        let timestamp = this.timestamp;
        timestamp = [];
        this.todayorderlist.checkintoday.forEach(item => {
          timestamp.push(item.timeline.precheckin_done);
        });
        if (key == '预登记时间从早到晚') {
          console.log(key);
          timestamp.sort((a, b) => {
            return a > b;
          })
        } else {
          console.log(key);
          timestamp.sort((a, b) => {
            return a < b;
          })
        }
        console.log(timestamp);
      },
      //正倒序
      getSequenceList(item, sequence, scroller) {
        this.sortSelected = item;
        this.popupShowSort = false;
        console.log(item, sequence, scroller);
        this.getTodayList({
          is_sequence: sequence,
          onsuccess: body => this[scroller] = body.data
        })
      },
    },
    watch: {
      'route.params.tab': function (val) {
        //切换标签卡时
        if (val == 0 && !this.tostayList.length) {
          console.log(0)
          this.getTodayList({
            status: val,
            onsuccess: body => this.tostayList = body.data
          })
        } else if (val == 1 && !this.cancelledList.length) {
          console.log(1)
          this.getTodayList({
            status: val,
            onsuccess: body => this.cancelledList = body.data
          })
        }
      }
    },
    mounted(){
      this.getTodayList({
        is_cancelled: this.$route.params.tab,
        onsuccess: body => this[this.$route.params.tab == 0 ? 'tostayList' : 'cancelledList'] = body.data
      })
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
