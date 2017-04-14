<template>
  <article>
    <scroller :pulldown-config="Interface.scroller"
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
                   @click.native="goto('/livein/'+item.order_id)">
        </orderitem>
      </div>
    </scroller>
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
      }
    },
    computed: {
      ...mapState([
        'Interface',
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
