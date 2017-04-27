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
              @on-pulldown-loading="invoiceList"
              lock-x
              use-pulldown
              height="-44">
      <div class="scroller-wrap">
        <Group v-for="(item,index) in renderList" :key="index">
          <Cell :title="getCellTitle(item)"/>
          <Cell :title="getCellBody(item)" link @onClick="goto('/invoice/detail/' + item.order_id)"/>
        </Group>
      </div>
    </scroller>

  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  module.exports = {
    name: 'list',
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
      getCellTitle(item){
        let roomNumber = '';
        if(item.rooms_number.length > 0){
          item.rooms_number.forEach(i => roomNumber += roomNumber ? ' '+i : i);
        }else {
            roomNumber += '未选房'
        }
        return `<p><span class="cell-value">${roomNumber}</span><span class="cell-right primary">${item.is_any_checkin ? '已入住' : ''}</span></p>`
      },
      getCellBody(item){
        return `<div class="cell-body">` +
          `<p><span class="cell-value">${item.owner + ' ' + item.phone_number}</span><b class="cell-right">${item.invoice_status == 2 ? '已开票' : ''}</b></p>` +
          `<p><span class="cell-value">${this.invoiceType(item.type)}·${item.category}·${item.media == 'PAPER' ? '纸质发票' : '电子发票'}</span></p>` +
          `<p><span class="cell-value">${item.title}</span></p>` +
          `<p><span class="cell-value">${this.datetimeparse(item.in_time) + '-' + this.datetimeparse(item.out_time)}</span></p>` +
          `</div>`
      },
      invoiceList() {
        this.getInvoiceList({
          scope: this.tabIndex === 0 ? 'TODAY' : 'ALL',
          invoice_status: 1,
          onsuccess: body => this.tabIndex ? this.todayList = body.data : this.allList = body.data
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
