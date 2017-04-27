<template>
  <article>
    <Tab active-color="#373946">
      <TabItem v-for="(item,index) in tabMenu"
               :key="'tabmenu'+index"
               :value="item"
               :selected="route.params.tab == index" @onSelected="toggleTab(index)">
      </TabItem>
    </Tab>

    <scroller lock-x :scrollbar-x=false
              :pulldown-config="Interface.scroller"
              @on-pulldown-loading="getList"
              :depend="renderList"
              height="-45"
              use-pulldown>
      <div class="scroller-wrap">
        <group v-for="(item,index) in renderList" :key="index">
          <cell :title="item.room.room_number + ' '+ item.room.room_type_name"
                :value="datetimeparse(item.created_time,isToday ?'hhmm' : 'MMDDhhmm')"
                @onClick="goto('/identity/' + item.identity_id)"></cell>
          <cell :title="getGuestItem(item)"
                @onClick="goto('/identity/' + item.identity_id)"
                link></cell>
        </group>
      </div>
    </scroller>

    <footer v-if="!isToday">
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
        periodFilter: [null, null],
        isCalendarShow: false
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route'
      ]),
      isToday(){
        return !!this.$route.path.match(/today/)
      },
      tabIndex(){
        return +this.route.params.tab
      },
      renderList(){
        return this.tabIndex ? this.refusedIdentities : this.agreedIdentities
      },
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
        !item.lvye_report_status ? dom += `<p style="color:#DF4A4A;">未上传旅业系统</p>` : null;
        return dom
      },
      getList(){
        this.getIdentities({
          scope: this.isToday ? 'TODAY' : 'HISTORY',
          status: this.tabIndex ? 'REFUSED' : 'AGREED',
          start_time: this.periodFilter[0],
          end_time: this.periodFilter[1],
          onsuccess: body => this.tabIndex ? this.refusedIdentities = body.data : this.agreedIdentities = body.data
        })
      },
      initList(){
        if ((this.tabIndex && !this.refusedIdentities.length) || (!this.tabIndex && !this.agreedIdentities.length)) {
          this.getList()
        }
      },
      resetList(){
        this.agreedIdentities = []
        this.refusedIdentities = []
      },
      resetFilter() {
        this.periodFilter = [null, null]
      }
    },
    mounted(){
      this.initList()
    },
    watch: {
      tabIndex() {
        this.initList()
      },
      periodFilter(){
        this.getList()
      }
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
