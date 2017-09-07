<template>
  <article>

    <header class="tab-wrapper">
      <Tab active-color="#5077AA">
        <TabItem v-for="(item,index) in tabMenu"
                 :key="'tabMenu'+index"
                 :selected="tempPage == item"
                 @on-item-click="toggleTab(item)">{{item}}
        </TabItem>
      </Tab>
    </header>

    <div class="list-wrapper">
      <p class="synchronize">
        <x-button mini value="同步" @onClick="syncTime"></x-button>
        上次同步PMS时间: {{hotel.order_update_time ? datetimeparse(hotel.order_update_time, 'MMDDhhmm') : ''}}
      </p>

      <!--<div v-show="(!renderList||renderList.length === 0)&& renderPageIndex>0" class="no-data">暂无数据</div>-->

      <Group v-if="tempPage == '预登记'" v-for="(item,index) in renderList" :key="index">
        <Cell :title="preCheckInCellTitle(item)"/>
        <Cell :title="preCheckInCellBody(item)" link @onClick="goto('/precheckin/order/detail/' + item.order_id)"/>
      </Group>

      <Group v-if="tempPage == '在住'" v-for="(item,index) in renderList" :key="index">
        <Cell :title="liveInCellTitle(item)"/>
        <Cell :title="liveInGuestItem(item)" link @onClick="goto('/livein/'+item.order_id)"/>
      </Group>
    </div>

  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'receive',
    data() {
      return {
        tabMenu: ['预登记', '在住', '退房申请', '已离店'],
        preCheckInList: [],
        liveInList: [],
        checkOutApplicationList: [],
        checkOutList: []
      }
    },
    computed: {
      ...mapState([
        'route',
        'hotel'
      ]),
      tempPage(){
        let tempRoute = this.route.path.split('/')[2];
        switch (tempRoute) {
          case 'precheckin':
            tempRoute = '预登记';
            break;
          case 'livein':
            tempRoute = '在住';
            break;
          case 'checkout-application':
            tempRoute = '退房申请';
            break;
          case 'checkout':
            tempRoute = '已离店';
            break;
        }
        console.log(tempRoute);
        return tempRoute
      },
      renderList() {
        let tempList = [];
        switch (this.tempPage) {
          case '预登记':
            tempList = this.preCheckInList;
            break;
          case '在住':
            tempList = this.liveInList;
            break;
          case '退房申请':
            tempList = this.checkOutApplicationList;
            break;
          case '已离店':
            tempList = this.checkOutList;
            break;
        }
        return tempList;
      },
    },
    methods: {
      ...mapActions([
        'replaceto',
        'hotelrefresh',
        'gettodaylist',
        'getTodaySuborder',
        'getcheckoutlist'
      ]),
      toggleTab(item){
        switch (item) {
          case '预登记':
            this.replaceto('/receive/precheckin');
            break;
          case '在住':
            this.replaceto('/receive/livein');
            break;
          case '退房申请':
            this.replaceto('/receive/checkout-application');
            break;
          case '已离店':
            this.replaceto('/receive/checkout');
            break;
        }
      },
      preCheckInCellTitle(item){
        let alertdom = item.status.is_recording_success ? `` : `<span class="cell-right warn">入账失败</span>`;
        return `<p><span class="cell-key">订单号：</span><span class="cell-value">${item.order_pmsid}</span>${alertdom}</p>`
      },
      preCheckInCellBody(item){
        let roomtypewords = '';
        item.rooms_plan.forEach(i => roomtypewords += (i.room_type + 'x' + i.room_count));
        let time = this.datetimeparse(item.timeline.precheckin_done, this.isToday ? 'hhmm' : 'MMddhhmm');
        return `<div class="cell-body">` +
          `<p><span class="cell-key">预订人：</span><span class="cell-value">${item.owner + ' ' + item.owner_tel}</span></p>` +
          `<p><span class="cell-key">房型：</span><span class="cell-value">${roomtypewords}</span><span class="cell-key cell-right">${time}</span></p>` +
          `</div>`
      },
      liveInCellTitle(item){
        let tag = this.getUnionTag(item.union_tag, item.room_number);
        return `<p><span class="cell-value">${item.room_number} ${item.room_type_name}${this.getBreakFast(item.breakfast)}${tag ? '(联' + tag + ')' : ''}</span><span class="cell-right gray">${this.datetimeparse(item.in_time, this.isToday ? 'hhmm' : 'MMddhhmm')}</span></p>`
      },
      liveInGuestItem(item){
        let dom = ``;
        if (item.guests) {
          item.guests.length > 0
            ? item.guests.forEach(i => {
            dom += `<div style="display: flex;color: #4a4a4a;justify-content: space-between;line-height: 2;"><span>${i.name} ${this.idnumber(i.idcard)}</span></div>`
          })
            : dom += `<div>无入住人</div>`
        } else {
          dom += `<div>无入住人</div>`
        }
        !item.lvye_report_status || item.lvye_report_status === 'NONE' ? dom += `<p style="color:#DF4A4A;">未上传旅业系统</p>` : null

        return dom
      },
      syncTime() {
        this.hotelrefresh({
          onsuccess: (body) => this.refreshList()
        })
      },
      getPreCheckInList(){
        this.gettodaylist({
          is_cancelled: 1,
          is_sequence: 0,
          onsuccess: body => this.preCheckInList = [...body.data]
        })
      },
      getLiveInList(){
        this.getTodaySuborder({
          onsuccess: body => this.liveInList = [...body.data]
        })
      },
      getCheckOutList() {
        let tempStatus = '';
        if (this.tempPage == '退房申请') {
          tempStatus = 'PENDING'
        } else if (this.tempPage == '已离店') {
          tempStatus = 'DONE'
        }
        this.getcheckoutlist({
          status: tempStatus,
//          start_time: this.periodFilter[0],
//          end_time: this.periodFilter[1],
          onsuccess: body => {
            if (this.tempPage == '退房申请') {
              this.checkOutApplicationList = [...body.data]
            } else if (this.tempPage == '已离店') {
              this.checkOutList = [...body.data]
            }
          }
        });
      },
      getList(){
        switch (this.tempPage) {
          case '预登记':
            this.getPreCheckInList();
            break;
          case '在住':
            this.getLiveInList();
            break;
          case '退房申请':
            this.getCheckOutList();
            break;
          case '已离店':
            this.getCheckOutList();
            break;
        }
      },
    },
    mounted(){
      this.getList();
    },
    watch: {
      tempPage(val) {
        this.getList();
      }
    }
  }
</script>
