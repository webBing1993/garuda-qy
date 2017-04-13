<template>
  <article>
    <scroller :pulldown-config="app.scroller.config"
              :depend="renderList"
              @on-pulldown-loading=""
              use-pulldown
              lock-x>
      <div>
        <orderitem v-for="(item,index) in renderList"
                   :key="index"
                   :roomNumber="item.room_number"
                   :roomTypeName="item.room_type_name"
                   :intg="item.union_tag"
                   :checkinTime="item.in_time"
                   :timeformat="isToday ? 'hh:mm' : 'MM/DD hh:mm'"
                   :guests="item.guests"
                   :arrow="true"
                   @click.native="goto('/livein/'+item.suborder_id)">
        </orderitem>
      </div>
    </scroller>
    <!--<footer v-if="!isToday">-->
      <!--<div class="select" >-->
        <!--<span @click="isCalendarShow = true">-->
         <!--<abbr v-if="periodFilter[0]">{{periodFilter[0] | datetimeparse}} - {{periodFilter[1] | datetimeparse}}</abbr>-->
          <!--<abbr v-else>筛选</abbr>-->
        <!--</span>-->
      <!--</div>-->
    <!--</footer>-->
    <!--<popup v-model="isCalendarShow"-->
           <!--maskShow-->
           <!--bottom-->
           <!--animationTopBottom>-->
      <!--<calendar v-model="periodFilter" @onReset="resetFilter" @onCancel="isCalendarShow = false"></calendar>-->
    <!--</popup>-->
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'livein',
    data() {
      return {
        todayList: [],
        allList: [],
//        isCalendarShow: false,
//        periodFilter: [null,null]
      }
    },
    computed: {
      ...mapState([
        'app',
        'route'
      ]),
      isToday() {
        return !!this.$route.path.match(/today/)
      },
      renderList() {
          return this.isToday ? this.todayList : this.allList
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'getTodaySuborder',
        'getAllSuborder'
      ]),
      getList() {
          this.isToday
            ?
            this.getTodaySuborder({
              onsuccess: body => this.todayList = body.data
            })
            :
            this.getAllSuborder({
              onsuccess: body => this.allList = body.data
            })
      },
//      resetFilter() {
//        this.periodFilter = [null, null]
//      }
    },
    watch: {
      isToday() {
          this.todayList = [];
          this.allList = [];
          this.getList();
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
