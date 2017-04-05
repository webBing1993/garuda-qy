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
              @on-pulldown-loading="donePullDown('tableft')"
              lock-x
              ref="tableft"
              use-pulldown
              height="-44">
      <div>
        <section v-for="(item,index) in todayorderlist.checkintoday" :key="index">
          <orderitem :orderId="item.order_id"
                     :need_hint="item.warning"
                     :date="item.timeline.precheckin_done"
                     :booker="item.owner"
                     :phoneNum="item.owner_tel"
                     :rooms="item.rooms"
                     :arrow=true
                     @onClick="_gotodetail(item.order_id)">
          </orderitem>
        </section>
      </div>
    </scroller>

    <scroller v-show="route.params.tab == 1"
              :pulldown-config="app.scroller.config"
              @on-pulldown-loading="donePullDown('tabright')"
              lock-x
              ref="tabright"
              use-pulldown
              height="-44">
      <div>
        <section v-for="(item,index) in todayorderlist.checkincancel" :key="index">
          <orderitem :orderId="item.order_id"
                     :date="item.timeline.precheckin_done"
                     :booker="item.owner"
                     :phoneNum="item.owner_tel"
                     :rooms="item.rooms"
                     :arrow=true>
          </orderitem>
        </section>
      </div>
    </scroller>

    <!-- 弹出层 -->
    <footer>
      <div class="select">
        <span @click="popupShowSort = !popupShowSort">时间排序</span>
      </div>
    </footer>

    <popup v-model="popupShowSort"
           :maskShow="true"
           :bottom="true"
           :animationTopBottom="true">
      <div class="sort">
        <div v-for="(item,index) in sortMenus" class="sortText" :key="index">
        <span :class="{selected:sortSelected === item}"
              @click="sortSelected = item, popupShowSort = false">{{item}}</span>
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
        tabmenu: ["待入住", "已取消"],
        timestamp: [],
        batch: false,
        showSort: false,
        sortMenus: ['预登记时间从早到晚', '预登记时间从晚到早'],
        sortSelected: "",
        popupShowSort: false,
      }
    },
    computed: {
      ...mapState([
        'app',
        'route',
        'todayorderlist'
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'precheckintoday',
        'checkincancel'
      ]),
      reset: function (ref, param) {
        //重置scroller高度
        this.$nextTick(() => this.$refs[ref].reset(param))
      },
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
    },
    watch: {
      'route.params.tab': function (val) {
        //切换标签卡时
        if (val == 0) {
          this.reset('tableft');
        } else {
          this.reset('tabright');
        }
      },
      'todayorderlist.checkintoday': function () {
        //checkintoday 列表变化时
        this.reset('tableft');
      },
      'todayorderlist.checkincancel': function () {
        //checkincancel 列表变化时
        this.reset('tabright');
      }
    },
    mounted(){
      this.precheckintoday();
      this.checkincancel();
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
