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
              :depend="renderList"
              @on-pulldown-loading="onPullDown"
              lock-x
              use-pulldown
              height="-44">
      <div>
        <section v-for="(item,index) in renderList" :key="index">
          <div class="invoice-container" @click="goto('/invoice/detail/' + item.order_id)">
            <div class="invoice-title">
              <p class="left-title">
                <span v-for="room in item.rooms_number">{{room}}</span>
              </p>
              <span class="right-title">{{item.is_any_checkin ? '已入住' : ''}}</span>
            </div>
            <div class="invoice-body">
              <span>{{item.owner}} {{item.phone_number}} <i>{{item.invoice_status == 2 ? '已开票' : ''}}</i></span>
              <span>{{item.type}}·{{item.category}}·{{item.media == 'PAPER' ? '纸质发票' : ''}}</span>
              <span>{{item.title}}</span>
              <span>{{item.in_time | datetimeparse}} - {{item.out_time | datetimeparse}}</span>
            </div>
          </div>
        </section>
      </div>
    </scroller>

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
      onPullDown() {
          this.tabIndex ? this.todayList= [] : this.allList = [];
          this.invoiceList();
      }
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
