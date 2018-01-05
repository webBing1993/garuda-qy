<!--发票中心-->
<template>
  <article>
    <header class="tab-wrapper">
      <Tab active-color="#5077AA">
        <TabItem v-for="(item,index) in tabMenu"
                 :key="'tabmenu'+index"
                 :class="{'vux-1px-r': index===0}"
                 :selected="route.params.tab == index"
                 @on-item-click="toggleTab(index)">{{item}}
        </TabItem>
      </Tab>
    </header>

    <div class="list-wrapper">
      <div v-show="tabIndex === 0">
        <p v-if="!waitList || waitList.length === 0" class="no-data">暂无数据</p>
        <Group @click.native="goDetail(item)" v-for="(item,index) in renderList" :key="index"
               :title="titleFilter(index)">
          <Cell>
            <p><span class="cell-value">{{item.room_no}}</span><span
              class="cell-right">{{datetimeparse(item.create_time, 'hhmm')}}</span></p>
          </Cell>
          <Cell link>
            <div class="cell-body">
              <p v-if="item.contact_name"><span class="cell-value">联系人：{{item.contact_name}}</span></p>
              <p><span class="cell-value">开票类型：{{item.invoice_type | filterInvoiceType}}</span></p>
            </div>
          </Cell>
          <Cell v-if="item.remark" >
            <p><span class="cell-value">备注：</span><span class="remark">{{item.remark}}</span></p>
          </Cell>
        </Group>
      </div>
      <div v-show="tabIndex === 1">
        <p v-if="!doneList || doneList.length === 0" class="no-data">暂无数据</p>
        <Group @click.native="goDetail(item)" v-for="(item,index) in renderList" :key="index"
               :title="titleFilter(index)">
          <Cell>
            <p><span class="cell-value">{{item.room_no}}</span><span class="cell-right">{{item.update_time | filterTime}}</span>
            </p>
          </Cell>
          <Cell link>
            <div class="cell-body">
              <p><span class="cell-value">名称：{{item.title}}</span></p>
              <p v-if="item.contact_name"><span class="cell-value">联系人：{{item.contact_name}}</span></p>
              <p><span class="cell-value">开票类型：{{item.invoice_type | filterInvoiceType}}</span></p>
            </div>
          </Cell>
        </Group>
      </div>
    </div>

    <footer>
      <div class="listFilter">
        <span class="filter" @click="showDialog = true">
          <abbr>筛选</abbr>
        </span>
      </div>
    </footer>
    <div class="dialog">
      <x-dialog v-model="showDialog"
                :hide-on-blur=false
                 mask-z-index="5"
                :dialog-style="{'top':'32%'}"
      >
        <p class="filterTop">筛选</p>
        <group>
          <x-input title="房号" novalidate  placeholder="请输入房号" :show-clear="true" placeholder-align="left" v-model="filterRoomVal"></x-input>
          <x-input title="发票抬头" novalidate placeholder="请输入发票抬头" :show-clear="true" placeholder-align="left" v-model="filterInvoice"></x-input>
          <popup-radio title="开票类型" :options="invoTypeList" v-model="invoiceVal" @on-show=popupShow :disabled=flag></popup-radio>
          <cell title= "起始时间" @onClick="isCalendarShow = true" link :value=datetimeparse(periodFilter[0]) ></cell>
          <cell title= "起始时间" @onClick="isCalendarShow = true" link :value=datetimeparse(periodFilter[1]) ></cell>
          <div>
            <div class="invoiceBtn" @click="cancel">取消</div>
            <div class="invoiceBtn" @click=confirmHandle>确定</div>
          </div>
        </group>
      </x-dialog>
     </div>
    <!--日历控件-->
    <popup v-model="isCalendarShow"
           maskShow
           bottom
           animationTopBottom>
      <calendar v-model="periodFilter" @onReset="resetFilter" @onCancel="isCalendarShow = false"></calendar>
    </popup>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import {Scroller, XDialog, XButton, Group,PopupRadio,XInput } from 'vux'

  module.exports = {
    name: 'list',
    components: {
      Scroller,
      XDialog,
      XButton,
      Group,
      PopupRadio,
      XInput
    },
    data(){
      return {
        filterInvoice:'',
        filterRoomVal:'',
        flag:false,
        invoiceVal:'',
        invoTypeList:["普通发票","专用发票","个人发票"],
        popup:false,
        startDate:'',
        endDate:'',
        showDialog:false,
        scrollerStatus1: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
        scrollerStatus2: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
        pullupConfig: {
          content: '上拉加载更多',
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: '松开加载',
          upContent: '上拉加载更多',
          loadingContent: '加载中..',
          clsPrefix: 'xs-plugin-pullup-'
        },
        page1: 1,
        page2: 1,
//        tabmenu: ["待处理", "已处理"],
        waitList: [],
        doneList: [],
        isCalendarShow: false,
        periodFilter: [null, null],

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
      tabMenu() {
        let menu = [];
        menu[0] = `待处理(${this.waitList.length})`;
        menu[1] = `已处理(${this.doneList.length})`;
        return menu;
      },
      renderList() {
//        return this.tabIndex ? this.sortByTime(this.doneList, 'update_time') : this.sortByTime(this.waitList, 'out_time')
        return this.tabIndex ? this.sortByTime(this.doneList, 'create_time') : this.sortByTime(this.waitList, 'out_time')
      }
    },
    watch: {
      isCalendarShow(val){
        if(val){
          console.log("打开了")
          this.flag=true;
        }
        else if(!val){
          console.log("关闭了")
          this.flag=false;
        }
      },
      tabIndex(val) {
        this.resetFilter();
//        val ? this.$refs.scroller1.reset() : this.$refs.scroller2.reset();

        typeof val === 'number' && !isNaN(val)
          ? this.renderList.length == 0 ? this.initList() : this.refresh() : null
      },
      periodFilter(val) {
        val[0] && val[1] && this.refresh();
        this.isCalendarShow = false;
      }
    },
    filters: {
      filterInvoiceType(v) {
        let val;
        switch (v) {
          case '1':
            val = '增值税普通发票';
            break;
          case '2':
            val = '增值税专用发票';
            break;
          case '3':
            val = '个人发票';
            break;
          default:
            val = '增值税普通发票';
        }
        return val;
      },
      filterTime(v) {
        let date = new Date(+v),
          hour = date.getHours(),
          min = date.getMinutes(),
          hourStr = hour > 9 ? hour : `0${hour}`,
          minStr = min > 9 ? min : `0${min}`;
        return `${hourStr}:${minStr}`;
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'getInvoiceList'
      ]),
      confirmHandle(){
        this.showDialog=false;
        this.isCalendarShow=false;
      },
      cancel(){
        this.showDialog=false;
        this.isCalendarShow=false;
      },
      popupShow(){
        this.isCalendarShow=false;
      },
      titleFilter(index){
        if (this.renderList.length > 0) {
          return index
            ? this.datetimeparse(this.renderList[index].update_time) === this.datetimeparse(this.renderList[index - 1].update_time)
              ? null : this.datetimeparse(this.renderList[index].update_time)
            : this.datetimeparse(this.renderList[index].update_time)
        }
      },
      goDetail(obj) {
        this.goto(`/invoice/detail/${obj.id}`)
      },
      toggleTab(index){
        let newpath = this.route.path.replace(this.route.params.tab, index)
        this.replaceto(newpath)
      },
      resetFilter() {
        console.log('resetFilter');
        this.periodFilter = [null, null]
      },
      refresh() {
        let pa = {
          from: "top",
          page: 1
        }
        this.getList( this.tabIndex, body =>this.tabIndex ? this.doneList = [...body.data] : this.wait = [...body.data], pa)
      },
      loadMore() {
        let page;
        this.tabIndex ? page = ++this.page1 : page = ++this.page2;
        let pa = {
          from: "loadMore",
          page: page
        }
        this.getList(pa)
      },
      filterHandle(){

      },
      getList(status, callback) {
        this.getInvoiceList({
          status: status,
          start_time: this.periodFilter[0],
          end_time: this.periodFilter[1] ? this.periodFilter[0] == this.periodFilter[1] ? this.periodFilter[1] + 86400000 : this.periodFilter[1] : '',
          title:this.filterRoomVal,
          invoice_type:this.filterInvoice,
          onsuccess: callback
        })
      },
      initList() {
        let pa = {
          from: 'top',
          page: 1
        }
        if (this.renderList.length === 0) {
          this.getList(0, body => this.waitList = [...body.data], pa);
          this.getList(1, body => this.doneList = [...body.data], pa);
        }
      }
      // getList(param) {
      //   let successCallback = (body, headers) => {
      //     let page = +headers['x-current-page'],size = +headers['x-page-size'],total = +headers['x-total'];
      //     if(body && Array.isArray(body.data) && body.data.length > 0) {
      //       if(param.from == "loadMore") {
      //         if (this.tabIndex) {
      //           this.page2 = page;
      //           this.scrollerStatus2.pullupStatus = 'default';
      //         } else {
      //           this.page1 = page
      //           this.scrollerStatus1.pullupStatus = 'default';
      //         }
      //       } else {
      //         if (this.tabIndex) {
      //           this.doneList = [];
      //           this.page2 = 1
      //           this.scrollerStatus2.pulldownStatus = 'default';
      //         } else {
      //           this.waitList = [];
      //           this.page1 = 1
      //           this.scrollerStatus1.pulldownStatus = 'default';
      //         }
      //       }
      //       // 是否是最后一页
      //       if (page * size >= total) {
      //         //禁止上拉
      //         this.tabIndex ? this.scrollerStatus2.pullupStatus = 'disabled' : this.scrollerStatus1.pullupStatus = 'disabled';
      //       }
      //       // 合并数据
      //       this.tabIndex ? this.doneList = this.doneList.concat(body.data) : this.waitList = this.waitList.concat(body.data)
      //     } else {
      //       if (param.from != "loadMore") {
      //         if (this.tabIndex) {
      //           this.doneList = body.data;
      //           this.scrollerStatus2.pulldownStatus = 'default';
      //           this.scrollerStatus2.pullupStatus = 'disabled';
      //         } else {
      //           this.waitList = body.data;
      //           this.scrollerStatus1.pulldownStatus = 'default';
      //           this.scrollerStatus1.pullupStatus = 'disabled';
      //         }
      //       } else {
      //         if (this.tabIndex) {
      //           this.scrollerStatus2.pullupStatus = 'default'
      //           this.scrollerStatus2.pullupStatus = 'disabled'
      //         } else {
      //           this.scrollerStatus1.pullupStatus = 'default'
      //           this.scrollerStatus1.pullupStatus = 'disabled'
      //         }
      //       }
      //     }
      //     //更新数据,不然页面容器不够，无法上拉
      //     this.$nextTick(() => {
      //       this.tabIndex ? this.$refs.scroller2.reset() : this.$refs.scroller1.reset();
      //     })
      //   };

      //   let errorCallback = (data) => {
      //     this.tabIndex ? this.scrollerStatus2 = {pullupStatus: 'default',pulldownStatus: 'default'} : this.scrollerStatus1 = {pullupStatus: 'default',pulldownStatus: 'default'}
      //   };

      //   this.getWaitInvoiceList({
      //     page: +this.page,
      //     status: this.tabIndex,
      //     onsuccess: successCallback,
      //     onfail: errorCallback
      //   })
      // },

    },
    mounted(){
      this.initList();
    }
  }

</script>
<style lang="less">
  .dialog .weui-dialog{
    text-align: left;
  }
  .scroller-wrap {
    padding-bottom: 0;
  }
  .invoiceBtn{
    width: 49%;
    height: 2rem;
    float: left;
    border-top: 1px solid #EEEEEE;
    padding-top: 1rem;
    text-align: center;
  }
  .invoiceBtn:nth-child(2){
    border-left: 1px solid #EEEEEE;
    color: #22AAFF;
  }
  .remark{
    margin-left: 1rem;
    color: #22AAFF;
  }
  .weui-dialog__bd{
    padding-left: 0rem;
  }
  .filterTop{
    margin-left: 1rem;
    text-align: left;
    padding-top: 0.5rem;
    font-size: 20px;
    margin-bottom: -0.6rem;
  }
</style>
