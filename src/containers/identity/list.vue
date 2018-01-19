<!--入住核验-->
<template>
  <article>
    <header class="tab-wrapper">
      <Tab active-color="#5077AA">
        <TabItem v-for="(item,index) in tabMenu"
                 :key="'tabmenu'+index"
                 :selected="route.params.tab == index"
                 @on-item-click="toggleTab(index)">{{item}}
        </TabItem>
      </Tab>
    </header>
    <!--<scroller lock-x :scrollbar-x=false-->
    <!--:pulldown-config="Interface.scroller"-->
    <!--@on-pulldown-loading="refreshList"-->
    <!--:depend="renderList"-->
    <!--height="-45"-->
    <!--use-pulldown>-->
    <div class="list-wrapper">
      <p v-if="(!renderList || renderList.length === 0) && renderPageIndex > 0" class="no-data">暂无数据</p>
      <group v-if="tabIndex===0" v-for="(item,index) in renderList" :key="index">
        <cell title="住客身份核验"
              :value="datetimeparse(item.identity_check_time,'YYMMDDhhmm')"></cell>
        <cell :title="getGuestToDoItem(item,index)"></cell>
        <cell title="查看详情"
              @onClick="toDetail(item.identity_guest_id)"
              link></cell>
      </group>
      <group v-if="tabIndex===1" v-for="(item,index) in renderList" :key="index">
        <cell title="住客身份核验"
              :value="datetimeparse(item.identity_check_time,'YYMMDDhhmm')"></cell>
        <cell :title="getGuestPassItem(item,index)"></cell>
        <cell title="查看详情"
              @onClick="toDetail(item.identity_guest_id)"
              link></cell>
      </group>
      <group v-if="tabIndex===2" v-for="(item,index) in renderList" :key="index">
        <cell title="住客身份核验"
              :value="datetimeparse(item.identity_check_time,'YYMMDDhhmm')"></cell>
        <cell :title="getGuestRejectItem(item,index)"></cell>
        <cell title="查看详情"
              @onClick="toDetail(item.identity_guest_id)"
              link></cell>
      </group>
    </div>
    <!--</scroller>-->

    <footer v-if="tabIndex">
      <div class="listFilter">
        <span class="filter" @click="isCalendarShow = true">
          <abbr v-if="periodFilter[0]">{{datetimeparse(periodFilter[0])}} - {{datetimeparse(periodFilter[1])}}</abbr>
          <abbr v-else>筛选</abbr>
        </span>
      </div>
    </footer>

    <popup v-model="isCalendarShow"
           maskShow
           bottom
           animationTopBottom>
      <calendar v-model="periodFilter" @onReset="resetFilter" @onCancel="isCalendarShow = false"></calendar>
    </popup>
  </article>

</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  module.exports = {
    name: 'List',
    data() {
      return {
//        tabMenu: ['已通过', '未通过'],
        pendingList: [],//待处理
        agreedIdentities: [],//已通过
        refusedIdentities: [],//未通过
        pendingPageIndex: 0,
        agreedPageIndex: 0,
        refusedPageIndex: 0,
        periodFilter: [null, null],
        isCalendarShow: false
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route'
      ]),
//      isToday(){
//        return !!this.$route.path.match(/today/)
//      },
      tabMenu() {
//          this.initList();
        let menu = [];
        menu[0] = `待办理(${this.pendingList.length})`;
        menu[1] = `已通过(${this.agreedIdentities.length})`;
        menu[2] = `未通过(${this.refusedIdentities.length})`;
        return menu;
      },
      tabIndex() {
        return +this.route.params.tab
      },
      renderList() {
        switch (this.tabIndex) {
          case 0:
            return this.pendingList;
            break;
          case 1:
            return this.agreedIdentities;
            break;
          case 2:
            return this.refusedIdentities;

        }
      },
      renderPageIndex() {
        switch (this.tabIndex) {
          case 0:
            return this.pendingPageIndex;
            break;
          case 1:
            return this.agreedPageIndex
            break;
          case 2:
            return this.refusedPageIndex;

        }
      }
    },
    methods: {
      ...mapActions([
        'getIdentities',
        'replaceto',
        'goto'
      ]),
      toggleTab(index) {
        let newpath = this.route.path.replace(this.route.params.tab, index);
        this.replaceto(newpath)
      },
      toDetail(identity_guest_id) {
        this.tabIndex === 0 ? this.goto(`/identity/todo/${identity_guest_id}`) : this.goto(`/identity/detail/${identity_guest_id}`)
      },
//      getGuestItem(item){
//        let dom = ``;
//        item.guests.forEach(i => {
//          dom += `<div style="display: flex;justify-content: space-between;line-height: 2;color:#4a4a4a;">
//                    <span>${i.name + this.idnumber(i.idcard)}</span><span>相似度 ${i.similarity}%</span>
//                  </div>`
//        });
//        if (item.lvye_report_status === 'SUBMITTED' || item.lvye_report_status === 'PENDING') {
//          dom += `<p style="color:#999999;">正在上传旅业系统</p>`
//        } else if (item.lvye_report_status === 'FAILED') {
//          dom += `<p style="color:#DF4A4A;">上传旅业系统失败</p>`
//        } else if (!item.lvye_report_status || item.lvye_report_status === 'NONE') {
//          dom += `<p style="color:#DF4A4A;">未上传旅业系统</p>`
//        }
//
//        return dom
//      },
      getGuestToDoItem(item, index) {
        let dom = ``;
//        let len = item.guests.length
        dom += `<div style="text-align: center;color: #8A8A8A">入住房间</div><div style="text-align: center;font-size: 24px">${item.room_number}</div>`;
        dom += `<div style="justify-content: space-between;line-height: 2;color:#4a4a4a;">
            <p><span>入住人：</span>${item.name}</p>
           </div>`
        dom += ` <p style="color: #ffb01f">人脸识别度低于预设值，请进行人工核验</p>`;
        return dom
      },
      getGuestPassItem(item, index) {
        let dom = ``;
        dom += `<div style="justify-content: space-between;line-height: 2;color:#4a4a4a;">
            <span>房间号:</span><span>${item.room_number}</span>
            <p></p>
            <span>入住人：</span><span>${item.name}</span>`

        item.identity_status && item.identity_status === 'AUTO_AGREED' ? dom += `<p style = "color: #86e85e" > 人脸识别度预设值，已自动通过 </p >` : null
        item.identity_status && item.identity_status === 'AGREED' ? dom += `<p style = "color: #86e85e" > 人脸识别度大于预设值，人工核验通过 </p >` : null
        dom += `</div>`
        return dom
      },
      getGuestRejectItem(item, index) {
        let dom = ``;
        dom += `<div style="justify-content: space-between;line-height: 2;color:#4a4a4a;">
            <span>房间号:</span><span>${item.room_number}</span>
            <p></p>
            <span>入住人：</span><span>${item.name}</span>`
        item.identity_status && item.identity_status === 'AUTO_REFUSED' ? dom += `<p style="color: #e51324">人脸识别度低于预设值，已自动拒绝</p>` : null
        item.identity_status && item.identity_status === 'REFUSED' ? dom += `<p style="color: #e51324">人脸识别度低于预设值，人工核验拒绝</p>` : null
        dom += `</div>`
        return dom
      },
//      identity_status: "PENDING", //身份状态：PENDING待审核、AGREED人工同意、REFUSED人工拒绝、AUTO_AGREED自核同意、AUTO_REFUSED自核拒绝

      getList(callback, status){
        this.getIdentities({
          scope: this.periodFilter[0] && this.periodFilter[1] ? 'HISTORY' : 'TODAY',
          // scope:'HISTORY',
          status: status,
          start_time: this.periodFilter[0]||'',
          end_time: this.periodFilter[1] ? this.periodFilter[0] == this.periodFilter[1] ? this.periodFilter[1] + 86400000 : this.periodFilter[1] : '',
          onsuccess: callback
        })
      },
      initList() {
        if (this.renderList.length === 0) {
//          this.getList(body => (this.pendingList = [...body.data.content], this.pendingPageIndex++), 'PENDING');
//          this.getList(body => (this.refusedIdentities = [...body.data.content], this.refusedPageIndex++), 'REFUSED,AUTO_REFUSED');
//          this.getList(body => (this.agreedIdentities = [...body.data.content], this.agreedPageIndex++), 'AGREED,AUTO_AGREED');
          this.getPendingList();
          this.getAgreedIdentities();
          this.getRefusedIdentities();
        }
      },
      getPendingList() {
        this.getList(body => (this.pendingList = [...body.data.content], this.pendingPageIndex++), ['PENDING']);
      },
      getAgreedIdentities() {

        this.getList(body => (this.agreedIdentities = [...body.data.content], this.refusedPageIndex++), ['AGREED', 'AUTO_AGREED']);
      },
      getRefusedIdentities() {
        this.getList(body => (this.refusedIdentities = [...body.data.content], this.agreedPageIndex++), ['REFUSED', 'AUTO_REFUSED']);
      },
      refreshList() {
        let tempStatus = '';
        switch (this.tabIndex) {
          case 0:
            tempStatus = 'PENDING';
            break;
          case 1:
            tempStatus = 'REFUSED,AUTO_REFUSED';
            break;
          case 2:
            tempStatus = 'AGREED,AUTO_AGREED';
        }
        let tempList = '';
        switch (this.tabIndex) {
          case 0:
            tempList = 'pendingList';
            break;
          case 1:
            tempList = 'refusedIdentities';
            break;
          case 2:
            tempList = 'agreedIdentities';
        }
        this.getList(body => this[tempList] = [...body.data], tempStatus)
      },
      resetList() {
        this.pendingList = [];
        this.agreedIdentities = [];
        this.refusedIdentities = [];
      },
      resetFilter() {
        this.periodFilter = [null, null]
      }
    },
    mounted() {
      this.initList();
    },
    watch: {
      tabIndex(val) {
        if (val === 0) {
          this.getPendingList();
        } else if (val === 1) {
          this.getAgreedIdentities();
        } else if (val === 2) {
          this.getRefusedIdentities();
        }
//        this.periodFilter = [null, null];
//        typeof val === 'number' && !isNaN(val)
//          ? this.renderPageIndex === 0 ? this.initList() : this.refreshList()
//          //          ? this.renderPageIndex === 0 ? this.initList() : this.initList()
//          : null
      },
//      periodFilter(val){
//        val[0] && val[1] && this.refreshList()
////        val[0] && val[1] && this.initList()
//      }
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";

</style>
