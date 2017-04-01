<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabmenu"
                 :key="index"
                 :value="item"
                 :selected="route.params.tab == index"
                 @click.native="goto('/preOrder/historyOrder/'+index)">
        </TabItem>
      </Tab>
    </header>
    <scroller v-show="route.params.tab == 0"
              :pulldown-config="app.scroller.config"
              @on-pulldown-loading="donePullDown('NO-SHOW')"
              lock-x
              ref="NO-SHOW"
              use-pulldown
              height="-44">
      <div>
        <section v-for="(item,index) in orderlist.confirmed" :key="index">
          <orderitem :orderId="item.order_id"
                     :inTime="item.in_time"
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
              ref="canceled"
              lock-x>
      <section>
        已取消
      </section>
    </scroller>
    <footer>
      <div class="select" v-if="!popupShowCalendar || !popupShowSort">
        <span  v-if="period[0] && period[1]" @click="popupShowCalendar = !popupShowCalendar"> {{period[0] | getDate}} - {{period[1] | getMonth}}| </span>
        <span v-else @click="popupShowCalendar = !popupShowCalendar">筛选 |</span>
        <span @click="popupShowSort = !popupShowSort">时间排序</span>
      </div>
    </footer>
    <popup v-model="popupShowCalendar"
           :maskShow="true"
           :bottom="true"
           :animationTopBottom="true">
      <calendar @onCancel="popupShowCalendar= false" v-model="period"/>
    </popup>
    <popup v-model="popupShowSort"
           :maskShow="true"
           :bottom="true"
           :animationTopBottom="true">
      <div class="sort">
        <div v-for="(item,index) in sort" class="sortText" :key="index">
        <span :class="{selected:sortSelected === item}"
              @click="sortSelected = item, popupShowSort = false">{{item}}</span>
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
        tabmenu: ["NO-SHOW", "已取消"],
        popupShowCalendar: false,
        popupShowSort: false,
        sort: ['预登记时间从早到晚', '预登记时间从晚到早'],
        sortSelected: '预登记时间从早到晚',
        period: [null, null]
      }

    },
    computed: {
      ...mapState([
        'app',
        'route',
        'orderlist',
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'confirmed',
      ]),
      reset: function (ref, param) {
        //重置scroller高度
        this.$nextTick(() => this.$refs[ref].reset(param))
      },
      donePullDown: function (ref) {
        //刷新
        this.$nextTick(() => setTimeout(() => this.$refs[ref].donePulldown(), 3000))
      },
      _gotodetail(orderId) {
        this.goto('/preOrder/todayOrder/predetail/' + orderId);
        console.log('goto predetail ===> 1111111')
      },
    },
    watch: {
      'route.params.tab': function (val) {
        //切换标签卡时
        if (val == 0) {
          this.reset('NO-SHOW')
        } else {
          this.reset('canceled')
        }
      },
      'historyList': function () {
        this.reset('NO-SHOW')
      },
    },
    filters: {
      getDate(timestampunix){
        const timestamp = parseInt(timestampunix);
        const timeobj = new Date(timestamp);
        return timeobj.toLocaleDateString(timeobj);
      },
      getMonth(timestampunix){
        const timestamp = parseInt(timestampunix);
        const timeobj = moment(timestamp);
        return (timeobj.month()+1)+'/'+timeobj.date();
      }
    },
    mounted(){
      this.confirmed();
    }
  }
</script>
<style scoped lang="less">
  @import "./index.less";
</style>

