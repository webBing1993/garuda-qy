<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabmenu"
                 :key="index"
                 :value="item"
                 :selected="route.params.tab == index"
                 @click.native="goto('/invoice/'+index)">
        </TabItem>
      </Tab>
    </header>

    <scroller v-show="route.params.tab == 0"
              :pulldown-config="app.scroller.config"
              :depend="[invoiceList]"
              @on-pulldown-loading="donePullDown('tableft')"
              lock-x
              ref="tableft"
              use-pulldown
              height="-44">
      <div>
        <section v-for="(item,index) in invoiceList" :key="index">
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

    <scroller v-show="route.params.tab == 1"
              :pulldown-config="app.scroller.config"
              @on-pulldown-loading="donePullDown('tabright')"
              lock-x
              ref="tabright"
              use-pulldown
              height="-44">
      <div>
        <h1>其他待开</h1>
      </div>
    </scroller>

    <footer v-show="route.params.tab == 1">
      <div class="select">
        <span v-if="period[0] && period[1]" @click="popupShowCalendar = !popupShowCalendar"> {{period[0] | getDate}} - {{period[1] | getMonth}}| </span>
        <span v-else @click="popupShowCalendar = !popupShowCalendar">筛选</span>
      </div>
    </footer>

  </article>
</template>
<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
  import './index.less';

  module.exports = {
    name: 'INVOICE',
    data(){
      return {
        tabmenu: ["当日发票", "全部发票"],
        invoiceList: [],
        otherinvoice: [],
        popupShowCalendar: false,
        sort: ['预登记时间从早到晚', '预登记时间从晚到早'],
        sortSelected: null,
        period: [null, null]
      }
    },
    computed: {
      ...mapState([
        'app',
        'route',
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'getInvoiceList'
      ]),
      reset: function (ref, param) {
        //重置scroller高度
        this.$nextTick(() => this.$refs[ref].reset(param))
      },
      orderClick: function (orderId) {
        this.goto('/invoice/detail/' + orderId);
//        console.log(orderId);
      }
    },
    watch: {
      'route.params.tab': function (val) {
        //切换标签卡时
        if (val == 0 && !this.invoiceList.length) {
          this.reset('tableft');
          this.getInvoiceList({
            onsuccess: body => this.invoiceList = body.data
        })
        } else if (val == 1 && !this.otherinvoice.length) {
          this.reset('tabright');
          this.getInvoiceList({
            onsuccess: body => this.otherinvoice = body.data
        })
        }
      }
    },
    mounted(){
      this.getInvoiceList({
        onsuccess: body => this.invoiceList = body.data
    })
    }
  }

</script>
