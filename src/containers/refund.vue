<template>
  <article>
    <p class="synchronize">
      <x-button mini value="同步" @onClick="syncTime"/>
      上次同步PMS时间: {{hotel.order_update_time ? datetimeparse(hotel.order_update_time, 'MMDDhhmm') : ''}}
    </p>

    <div>
      <div v-show="(!list||list.length === 0)&& pageIndex>0" class="no-data">暂无数据</div>
      <Group v-for="(item,index) in list"
             :key="index"
             :title="titleFilter(index)">
        <Cell :title="getCellTitle(item)"/>
        <Cell :title="getCellBody(item)" link @onClick="goto('/refund/'+item.order_id)"/>
      </Group>
    </div>

    <footer>
      <div class="listFilter">
        <span class="filter" @click="isCalendarShow = true">
          <abbr v-if="periodFilter[0]">{{datetimeparse(periodFilter[0])}} - {{datetimeparse(periodFilter[1])}}</abbr>
          <abbr v-else>筛选</abbr>
        </span>
      </div>
    </footer>

    <popup v-model="isCalendarShow">
      <calendar v-model="periodFilter" @onReset="resetFilter" @onCancel="isCalendarShow = false"></calendar>
    </popup>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  export default{
    name: 'refund',
    data(){
      return {
        list: [],
        pageIndex: 0,
        isCalendarShow: false,
        periodFilter: []
      }
    },
    computed: {
      ...mapState([
        'hotel'
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'hotelrefresh',
        'getrefundlist'
      ]),
      syncTime(){
        this.hotelrefresh({
          onsuccess: (body) => this.refreshList()
        })
      },
      titleFilter(index){
        return index
          ? this.datetimeparse(this.list[index].created_time) === this.datetimeparse(this.list[index - 1].created_time)
            ? null : this.datetimeparse(this.list[index].created_time)
          : this.datetimeparse(this.list[index].created_time)
      },
      getCellTitle(item){
        let refurndStatus = item.status;
        let refurndStatusDom = ``;
        if (refurndStatus) {
          refurndStatusDom = refurndStatus === 'FAILED'
            ? `<span class="cell-right warn">退款失败</span>`
            : refurndStatus === 'REFUNDED'
              ? `<span class="cell-right primary">已退款</span>` : ''
        }
        return `<p><span class="cell-value">${item.room_numbers}</span>${refurndStatusDom}</p>`
      },
      getCellBody(item){
        return `<p><span class="cell-value">微信支付：${this.cashHandling(item.pay_fee)}</span></p>` +
          `<p><span class="cell-value">退款金额：${this.cashHandling(item.refund_fee)}</span><span class="cell-right gray">${this.datetimeparse(item.created_time, 'hhmm')}</span></p>`;
      },
      getList(callback){
        this.getrefundlist({
          start_time: this.periodFilter[0],      //开始时间 无则null
          end_time: this.periodFilter[1],        //结束时间 无则null
          onsuccess: callback
        })
      },
      initList(){
        this.list.length ? null : this.getList(body => (this.list = [...body.data], this.pageIndex++));
      },
      refreshList(){
        this.getList(body => this.list = [...body.data]);
      },
      resetFilter() {
        this.periodFilter = [null, null]
      },
    },
    watch: {
      periodFilter() {
        this.list = [];
        this.refreshList();
        this.isCalendarShow = false;
      }
    },
    mounted(){
      this.initList();
    }
  }
</script>
