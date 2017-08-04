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

    <scroller :pulldown-config="Interface.scroller"
              :depend="renderList"
              @on-pulldown-loading="refreshList"
              lock-x
              use-pulldown
              height="-44">
      <div class="scroller-wrap">
        <p v-if="(!renderList || renderList.length === 0) && renderPageIndex >0 " class="no-data">暂无数据</p>
        <Group v-show="tabIndex === 0" @click.native="goDetail(item)" v-for="(item,index) in renderList" :key="index">
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
        <Group v-show="tabIndex === 1" @click.native="goDetail(item)" v-for="(item,index) in renderList" :key="index" :title="item.date">
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
          }],
        waitPageIndex: 0,
        donePageIndex: 0
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
        return this.tabIndex ? this.doneList : this.waitList
      },
      renderPageIndex(){
        return this.tabIndex ? this.donePageIndex : this.waitPageIndex
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
      getList(callback) {
        this.getInvoiceList({
          scope: this.tabIndex === 0 ? 'TODAY' : 'ALL',
          invoice_status: 1,
          onsuccess: callback
        })
      },
      initList(){
        if ((!this.tabIndex && this.waitList.length === 0) || (this.tabIndex && this.doneList.length === 0)) {
          this.getList(body => (this[this.tabIndex ? 'doneList' : 'waitList'] = [...body.data], this.tabIndex ? this.donePageIndex++ : this.waitPageIndex++))
        }
      },
      refreshList(){
        this.getList(body => this[this.tabIndex ? 'doneList' : 'waitList'] = [...body.data])
      },
      toggleTab(index){
        let newpath = this.route.path.replace(this.route.params.tab, index)
        this.replaceto(newpath)
      },
    },
    watch: {
      tabIndex(val) {
        typeof val === 'number' && !isNaN(val) ? this.initList() : null
      }
    },
    mounted(){
      // this.initList();
    }
  }

</script>
