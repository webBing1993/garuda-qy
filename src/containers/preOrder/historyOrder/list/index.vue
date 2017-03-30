<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabmenu"
                 :key="index"
                 :selected="route.params.tab == index"
                 @click.native="goto('/preOrder/historyOrder/'+index)">{{item}}
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
        <section v-for="(list,index) in historyList" :key="index">
          <p class="list-date">{{list.order_date | getDate}}</p>
          <orderitem v-for="(item,index) in list.order_info"
                     :key="index"
                     :orderId="item.order_id"
                     :need_refund="true"
                     :date="item.in_time"
                     :booker="item.owner"
                     :phoneNum="item.owner_tel"
                     :roomType="item.rooms[0].room_type"
                     :roomCount="item.rooms[0].room_count"
                     :arrow=true>
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
      <div class="select" v-if="!popupShowCalendar">
        <span @click="popupShowCalendar = !popupShowCalendar">筛选 |</span>
        <span @click="popupShowSort = !popupShowSort">时间排序</span>
      </div>
    </footer>
    <popup v-model="popupShowCalendar"
           :maskShow="true"
           :bottom="true"
           :top="false"
           :center="false"
           :Animation="true">
      <calendar @onCancel="popupShowCalendar= false"></calendar>
    </popup>
    <popup v-model="popupShowSort"
           :maskShow="true"
           :bottom="true"
           :Animation="true">
      <div class="sort">
        <div v-for="(item,index) in sort" class="sortText" :key="index">
        <span :class="{selected:sortSelected === item}"
              @click="sortSelected = item">{{item}}</span>
        </div>
      </div>
    </popup>
  </article>
</template>
<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        tabmenu: ["NO-SHOW", "已取消"],
        popupShowCalendar: false,
        popupShowSort: false,
        sort: ['预登记时间从早到晚', '预登记时间从晚到早'],
        sortSelected: '预登记时间从早到晚'
      }
    },
    computed: {
      ...mapState([
        'app',
        'route',
        'historyList',
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'history',
      ]),
      reset: function (ref, param) {
        //重置scroller高度
        this.$nextTick(() => this.$refs[ref].reset(param))
      },
      donePullDown: function (ref) {
        //刷新
        this.$nextTick(() => setTimeout(() => this.$refs[ref].donePulldown(), 3000))
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
    },
    mounted(){
      this.history();
    }
  }
</script>
<style scoped lang="less">
  @import "./index.less";
</style>

