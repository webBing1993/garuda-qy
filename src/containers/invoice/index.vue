<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabmenu"
                 :key="'tabmenu'+index"
                 :class="{'vux-1px-r': index===0}"
                 :selected="route.params.tab == index"
                 @on-item-click="toggleTab(index)">{{item}}
        </TabItem>
      </Tab>
    </header>

    <scroller v-show="tabIndex === 0" lock-x
              use-pulldown
              ref="scroller1"
              v-model="scrollerStatus1"
              :pullup-config="pullupConfig"
              :pulldown-config="Interface.scroller"
              @on-pulldown-loading="refresh"
              @on-pullup-loading="loadMore"
              height="-44">
      <div class="scroller-wrap">
        <p v-if="!waitList || waitList.length === 0" class="no-data">暂无数据</p>
        <Group @click.native="goDetail(item)" v-for="(item,index) in waitList" :key="index">
          <Cell>
            <p><span class="cell-value">{{item.rooms.join(', ')}}</span><span class="cell-right warn">待处理</span></p>
          </Cell>
          <Cell link>
            <div class="cell-body">
              <p><span class="cell-value">联系人：{{item.contact}}</span></p> 
              <p><span class="cell-value">开票类型：{{item.type}}</span></p> 
            </div>
          </Cell>
        </Group>
      </div>
    </scroller>

    <scroller v-show="tabIndex === 1" lock-x
              use-pulldown
              ref="scroller2"
              v-model="scrollerStatus2"
              :pullup-config="pullupConfig"
              :pulldown-config="Interface.scroller"
              @on-pulldown-loading="refresh"
              @on-pullup-loading="loadMore"
              height="-44">
      <div class="scroller-wrap">
        <p v-if="!doneList || doneList.length === 0" class="no-data">暂无数据</p>
        <Group @click.native="goDetail(item)" v-for="(item,index) in doneList" :key="index" :title="item.date">
          <Cell>
            <p><span class="cell-value">{{item.rooms.join(', ')}}</span><span class="cell-right">{{item.date}}</span></p>
          </Cell>
          <Cell link>
            <div class="cell-body">
              <p><span class="cell-value">名称：{{item.name}}</span></p> 
              <p><span class="cell-value">联系人：{{item.contact}}</span></p> 
              <p><span class="cell-value">开票类型：{{item.type}}</span></p> 
            </div>
          </Cell>
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
        tabmenu: ["待处理", "已处理"],
        waitList: [
          {
            id: 666,
            status: 0,
            rooms: [205,206],
            contact: '张三',
            type: '单位·增值税专用发票'
          },
          {
            id: 777,
            status: 0,
            rooms: [305,306],
            contact: '王五',
            type: '单位·增值税专用发票'
          }
        ],
        doneList: [{
            id: 888,
            status: 0,
            date: '2017/04/01 13:11',
            name: 'fortrun',
            rooms: [205,206],
            contact: '张三',
            type: '单位·增值税专用发票'
          },
          {
            id: 999,
            status: 0,
            date: '2017/04/01 13:11',
            name: '上海复创',
            rooms: [305,306],
            contact: '王五',
            type: '单位·增值税专用发票'
          }]
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route',
      ]),
      tabIndex() {
        return +this.route.params.tab
      }
    },
    watch: {
      tabIndex(val) {
        val ? this.$refs.scroller1.reset() : this.$refs.scroller2.reset();

        typeof val === 'number' && !isNaN(val) ? this.initList() : null
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'getInvoiceList'
      ]),
      goDetail(obj) {
        this.goto(`/invoice/detail/${obj.id}`)
      },
      toggleTab(index){
        let newpath = this.route.path.replace(this.route.params.tab, index)
        this.replaceto(newpath)
      },

      getList(callback) {
        this.getInvoiceList({
          scope: this.tabIndex === 0 ? 'TODAY' : 'ALL',
          invoice_status: 1,
          onsuccess: callback
        })
      },
      refresh() {
        let pa = {
          from: "top",
          page: 1
        }
        this.getList(pa)
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
      // getList(param) {
      //   let successCallback = (body, headers) => {
      //     let page = +headers['x-current-page'],size = +headers['x-page-size'],total = +headers['x-total'];
      //     if(body && Array.isArray(body.data) && body.data.length > 0) {
      //       if(param.from == "loadMore") {
      //         if (this.tabIndex) {
      //           this.page1 = page;
      //           this.scrollerStatus1.pullupStatus = 'default';
      //         } else {
      //           this.page2 = page
      //           this.scrollerStatus2.pullupStatus = 'default';
      //         }
      //       } else {
      //         if (this.tabIndex) {
      //           this.waitList = [];
      //           this.page1 = 1
      //           this.scrollerStatus1.pulldownStatus = 'default';
      //         } else {
      //           this.doneList = [];
      //           this.page2 = 1
      //           this.scrollerStatus2.pulldownStatus = 'default';
      //         }
      //       }
      //       // 是否是最后一页
      //       if (page * size >= total) {
      //         //禁止上拉
      //         this.tabIndex ? this.scrollerStatus1.pullupStatus = 'disabled' : this.scrollerStatus2.pullupStatus = 'disabled';
      //       }
      //       // 合并数据
      //       this.tabIndex ? this.waitList = this.waitList.concat(body.data) : this.doneList = this.doneList.concat(body.data)
      //     } else {
      //       if (param.from != "loadMore" && this.tabIndex) {
      //         if (this.tabIndex) {
      //           this.waitList = body.data;
      //           this.scrollerStatus1.pulldownStatus = 'default';
      //           this.scrollerStatus1.pullupStatus = 'disabled';
      //         } else {
      //           this.doneList = body.data;
      //           this.scrollerStatus2.pulldownStatus = 'default';
      //           this.scrollerStatus2.pullupStatus = 'disabled';
      //         }
      //       } else {
      //         if (this.tabIndex) {
      //           this.scrollerStatus1.pullupStatus = 'default'
      //           this.scrollerStatus1.pullupStatus = 'disabled'
      //         } else {
      //           this.scrollerStatus2.pullupStatus = 'default'
      //           this.scrollerStatus2.pullupStatus = 'disabled'
      //         }
      //       }
      //     }
      //     //更新数据,不然页面容器不够，无法上拉
      //     this.$nextTick(() => {
      //       this.tabIndex ? this.$refs.scroller1.reset() : this.$refs.scroller2.reset();
      //     })
      //   };

      //   let errorCallback = (data) => {
      //     this.tabIndex ? this.scrollerStatus1 = {pullupStatus: 'default',pulldownStatus: 'default'} : this.scrollerStatus2 = {pullupStatus: 'default',pulldownStatus: 'default'}
      //   };

      //   this.getWaitInvoiceList({
      //     page: +this.page,
      //     status: this.tabIndex,
      //     onsuccess: successCallback,
      //     onfail: errorCallback
      //   })
      // },
      getList() {
        this.getInvoiceList({
          status: this.tabIndex,
          onsuccess: body => {
            this.tabIndex ? this.waitList = body.data : this.doneList = body.data;
          }
        })
      },
      initList() {
        let pa = {
          from: 'top',
          page: 1
        }
        this.getList(pa)

        if (!this.tabIndex && this.waitList.length === 0) {
          this.getWaitList(pa)
        } else if (this.tabIndex && this.doneList.length === 0) {
          this.getDoneList(pa)
        }
      }
    },
    mounted(){
      this.initList();
    }
  }

</script>
<style lang="less" scoped>
  .scroller-wrap {
    padding-bottom: 0;
  }
</style>
