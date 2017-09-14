<template>
  <article>
    <Tab active-color="#5077AA">
      <TabItem v-for="(item,index) in tabMenu"
               :key="'tabmenu'+index"
               :class="{'vux-1px-r': index===0}"
               :selected="route.params.tab == index"
               @on-item-click="toggleTab(index)">{{item}}
      </TabItem>
    </Tab>

    <scroller lock-x :scrollbar-x=false
              :pulldown-config="Interface.scroller"
              @on-pulldown-loading="refreshList"
              :depend="renderList"
              height="-45"
              use-pulldown>
      <div class="scroller-wrap">
        <p v-if="(!renderList || renderList.length === 0) && renderPageIndex > 0" class="no-data">暂无数据</p>
        <group v-for="(item,index) in renderList" :key="index">
          <cell :title="item.room.room_number + ' '+ item.room.room_type_name"
                :value="datetimeparse(item.created_time,tabIndex ?'MMDDhhmm' : 'hhmm')"
                @onClick="goto('/identity/' + item.identity_id)"></cell>
          <cell :title="getGuestItem(item)"
                @onClick="goto('/identity/' + item.identity_id)"
                link></cell>
        </group>
      </div>
    </scroller>

    <footer>
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
    data(){
      return {
        tabMenu: ['已通过', '未通过'],
        selectedTab: '已通过',
        agreedIdentities: [],
        refusedIdentities: [],
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
      tabIndex(){
        return +this.route.params.tab
      },
      renderList(){
        return this.tabIndex ? this.refusedIdentities : this.agreedIdentities
      },
      renderPageIndex(){
        return this.tabIndex ? this.refusedPageIndex : this.agreedPageIndex
      }
    },
    methods: {
      ...mapActions([
        'getIdentities',
        'replaceto',
        'goto'
      ]),
      toggleTab(index){
        let newpath = this.route.path.replace(this.route.params.tab, index)
        this.replaceto(newpath)
      },
      getGuestItem(item){
        let dom = ``;
        item.guests.forEach(i => {
          dom += `<div style="display: flex;justify-content: space-between;line-height: 2;color:#4a4a4a;">
                    <span>${i.name + this.idnumber(i.idcard)}</span><span>相似度 ${i.similarity}%</span>
                  </div>`
        });
        if (item.lvye_report_status === 'SUBMITTED' || item.lvye_report_status === 'PENDING') {
          dom += `<p style="color:#999999;">正在上传旅业系统</p>`
        } else if (item.lvye_report_status === 'FAILED') {
          dom += `<p style="color:#DF4A4A;">上传旅业系统失败</p>`
        } else if (!item.lvye_report_status || item.lvye_report_status === 'NONE') {
          dom += `<p style="color:#DF4A4A;">未上传旅业系统</p>`
        }

        return dom
      },
      getList(callback){
        this.getIdentities({
          scope: this.periodFilter[0] && this.periodFilter[1] ? 'HISTORY' : 'TODAY',
          status: this.tabIndex ? 'REFUSED' : 'AGREED',
          start_time: this.periodFilter[0],
          end_time: this.periodFilter[1],
          onsuccess: callback
        })
      },
      initList(){
        if ((this.tabIndex && !this.refusedIdentities.length) || (!this.tabIndex && !this.agreedIdentities.length)) {
          this.getList(body => (this[this.tabIndex ? 'refusedIdentities' : 'agreedIdentities'] = [...body.data], this.tabIndex ? this.refusedPageIndex++ : this.agreedPageIndex++))
        }
      },
      refreshList(){
        this.getList(body => this[this.tabIndex ? 'refusedIdentities' : 'agreedIdentities'] = [...body.data])
      },
      resetList(){
        this.agreedIdentities = [];
        this.refusedIdentities = [];
      },
      resetFilter() {
        this.periodFilter = [null, null]
      }
    },
    mounted(){
      this.initList()
    },
    watch: {
      tabIndex(val) {
        this.periodFilter = [null, null];
        typeof val === 'number' && !isNaN(val)
          ? this.renderList.length == 0 ? this.initList() : this.refreshList()
          : null
      },
      periodFilter(val){
        val[0] && val[1] && this.refreshList()
      }
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
