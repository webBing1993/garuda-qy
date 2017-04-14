<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabmenu"
                 :key="index"
                 :value="item"
                 :selected="route.params.tab == index"
                 @onSelected="toggleTab(index)">
        </TabItem>
      </Tab>
    </header>

    <scroller :pulldown-config="Interface.scroller"
              @on-pulldown-loading=""
              lock-x
              use-pulldown
              height="-44">
      <div>
        <section v-for="(item,index) in renderList" :key="index">
          <div class="invoice-container" @click="orderClick(item.order_id)">
            <div class="invoice-title">
              <span>{{item.rooms_number}}</span>
              <span>{{item.is_any_checkin}}</span>
            </div>
            <div class="invoice-body">
              <span>{{item.owner}} {{item.phone_number | filterPhoneNum}} <i>{{item.invoice_status}}</i></span>
              <span>{{item.type}}·{{item.category}}·{{item.media}}</span>
              <span>{{item.title}}</span>
              <span>{{item.in_time | datetimeparse}} - {{item.out_time | datetimeparse}}</span>
            </div>
          </div>
        </section>
      </div>
    </scroller>

    <!--<footer v-show="route.params.tab == 1">-->
      <!--<div class="select">-->
        <!--<span v-if="period[0] && period[1]" @click="popupShowCalendar = !popupShowCalendar"> {{period[0] | getDate}} - {{period[1] | getMonth}}| </span>-->
        <!--<span v-else @click="popupShowCalendar = !popupShowCalendar">筛选</span>-->
      <!--</div>-->
    <!--</footer>-->

  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  module.exports = {
    name: 'INVOICE',
    data(){
      return {
        tabmenu: ["当日发票", "全部发票"],
        todayList: [],
        allList: []
//        popupShowCalendar: false,
//        sort: ['预登记时间从早到晚', '预登记时间从晚到早'],
//        sortSelected: null,
//        period: [null, null]
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route',
      ]),
      tabIndex() {
        return +this.route.params.tab
      },
      renderList() {
        return this.tabIndex ? this.todayList : this.allList
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'getInvoiceList'
      ]),
      orderClick: function (orderId) {
        this.goto('/invoice/detail/' + orderId);
      },
      invoiceList() {
        this.getInvoiceList({
          scope: this.tabIndex == 0 ? 'TODAY' : 'OTHER',
          invoice_status: 1,
          onsuccess: body => this.tabIndex? this.todayList = body.data : this.allList = body.data
        })
      },
      toggleTab(index){
        let newpath = this.route.path.replace(this.route.params.tab, index)
        this.replaceto(newpath)
      },
    },
    watch: {
      tabIndex(val) {
          val ? this.todayList = [] : this.allList = [];
          this.invoiceList();
      }
    },
    mounted(){
      this.invoiceList();
    }
  }

</script>

<style scoped lang="less">
  @import "./index.less";
</style>
