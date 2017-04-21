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
                :value="datetimeparse(item.created_time,'hhmm')"
                @onClick="goto('/identity/' + item.identity_id)"></cell>
          <cell :title="getGuestItem(item)"
                @onClick="goto('/identity/' + item.identity_id)"
                link></cell>
        </group>
      </div>
    </scroller>

    <div class="filters" v-if="!isToday">
      <section>
        <div @click="isCalendarShow = true">
          <svg width="12px" height="12px" viewBox="41 23 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="筛选" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
               transform="translate(41.000000, 23.000000)">
              <path
                d="M5.06124755,3.56040356 L5.06124755,1.1888546 C5.06124755,0.536759644 4.55832168,0.00320474777 3.94361958,0.00320474777 C3.32888392,0.00320474777 2.82595804,0.536759644 2.82595804,1.1888546 L2.82595804,3.56040356 C1.20728392,4.07205935 0.0236307692,5.66517507 0.0236307692,7.54632641 C0.0236307692,9.42747774 1.20731748,11.0205579 2.82595804,11.5322493 L2.82595804,22.7409258 C2.82595804,23.3930208 3.32888392,23.9265757 3.94361958,23.9265757 C4.55832168,23.9265757 5.06124755,23.3930208 5.06124755,22.7409258 L5.06124755,11.5322493 C6.67992168,11.0205579 7.86357483,9.42747774 7.86357483,7.54632641 C7.86357483,5.66517507 6.67992168,4.07205935 5.06124755,3.56040356 Z M3.94358601,9.66423739 C2.84270769,9.66423739 1.94715524,8.7141365 1.94715524,7.54636202 C1.94715524,6.37855193 2.84274126,5.42848665 3.94358601,5.42848665 C5.0443972,5.42848665 5.94005035,6.37855193 5.94005035,7.54636202 C5.94005035,8.71417211 5.0443972,9.66423739 3.94358601,9.66423739 L3.94358601,9.66423739 Z"
                id="Fill-1" fill="#4A4A4A"></path>
              <path
                d="M23.9831161,7.54632641 C23.9831161,5.66517507 22.7994629,4.07205935 21.1808224,3.56040356 L21.1808224,1.1888546 C21.1808224,0.536759644 20.6778629,0.00320474777 20.0631608,0.00320474777 C19.4484587,0.00320474777 18.9454993,0.536759644 18.9454993,1.1888546 L18.9454993,3.56040356 C17.3268587,4.07205935 16.1432056,5.66517507 16.1432056,7.54632641 C16.1432056,9.42747774 17.3268923,11.0205579 18.9454993,11.5322493 L18.9454993,22.7409258 C18.9454993,23.3930208 19.4484587,23.9265757 20.0631608,23.9265757 C20.6778629,23.9265757 21.1808224,23.3930208 21.1808224,22.7409258 L21.1808224,11.5322493 C22.7994629,11.0205579 23.9831161,9.42747774 23.9831161,7.54632641 Z M20.0631273,9.66423739 C18.9622825,9.66423739 18.0666965,8.7141365 18.0666965,7.54636202 C18.0666965,6.37855193 18.9623161,5.42848665 20.0631273,5.42848665 C21.163972,5.42848665 22.0595916,6.37855193 22.0595916,7.54636202 C22.0595916,8.71417211 21.163972,9.66423739 20.0631273,9.66423739 L20.0631273,9.66423739 Z"
                id="Fill-2" fill="#4A4A4A"></path>
              <path
                d="M13.0675133,12.5221246 C13.0684867,12.5021484 13.0689566,12.4820297 13.0689566,12.4618398 L13.0689566,1.1888546 C13.0689566,0.536759644 12.5660308,0.00320474777 11.9512951,0.00320474777 C11.336593,0.00320474777 10.8336671,0.536759644 10.8336671,1.1888546 L10.8336671,12.4618398 C10.8336671,12.4820297 10.8341371,12.5021484 10.8351105,12.5221246 C9.21573147,13.0333175 8.03133986,14.6268249 8.03133986,16.5085104 C8.03133986,18.3896617 9.21502657,19.9827774 10.8336671,20.4944332 L10.8336671,22.7956914 C10.8336671,23.4477864 11.336593,23.9813056 11.9512951,23.9813056 C12.5660308,23.9813056 13.0689566,23.4477864 13.0689566,22.7956914 L13.0689566,20.4944332 C14.6876308,19.9827774 15.8712839,18.3896617 15.8712839,16.5085104 C15.8712839,14.6268249 14.6868923,13.0333175 13.0675133,12.5221246 Z M11.9512951,18.6263858 C10.8504168,18.6263858 9.95486434,17.6763205 9.95486434,16.5085104 C9.95486434,15.3407359 10.8504503,14.390635 11.9512951,14.390635 C13.0521063,14.390635 13.9477259,15.3407003 13.9477259,16.5085104 C13.9477259,17.6763205 13.0521063,18.6263858 11.9512951,18.6263858 L11.9512951,18.6263858 Z"
                id="Fill-3" fill="#4A4A4A"></path>
            </g>
          </svg>
          <span v-if="periodFilter[0]">{{periodFilter[0] | datetimeparse}} - {{periodFilter[1] | datetimeparse}}</span>
          <span v-else>筛选</span>
        </div>
      </section>
    </div>

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
        })
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
