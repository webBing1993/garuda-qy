<template>
  <article>
    <scroller lock-x use-pulldown>
      <section>
        <orderitem v-for="(item,index) in todayList"
                   :key="index"
                   :roomNumber="item.room_number"
                   :roomTypeName="item.room_type_name"
                   :intg="item.union_tag"
                   :checkinTime="item.in_time"
                   :guests="item.guests"
                   :arrow="true"
                   @click.native="goto('/checkin/livein/detail/'+item.suborder_id)">
        </orderitem>
      </section>
    </scroller>
    <footer>
      <div class="select" v-if="!popupShowSort">
        <span v-if="sortSelected == '入住时间从早到晚'" @click="popupShowSort = !popupShowSort">时间正序</span>
        <span v-else-if="sortSelected == '入住时间从晚到早'" @click="popupShowSort = !popupShowSort">时间倒序</span>
        <span v-else @click="popupShowSort = !popupShowSort">筛选</span>
      </div>
    </footer>
    <popup v-model="popupShowSort"
           maskShow
           bottom
           animationTopBottom>
      <div class="sort">
        <div v-for="(item,index) in sort" class="sortText" :key="index">
        <span :class="{selected:sortSelected === item}"
              @click="sortSelected = item, popupShowSort = false">{{item}}</span>
        </div>
      </div>
    </popup>
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
        popupShowSort: false,
        sortSelected: null,
        sort: ['入住时间从早到晚', '入住时间从晚到早'],
      }
    },
    computed: {
      ...mapState([
        'route'
      ]),
      isToday() {
          reutrn
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'getTodaySuborder',
        'getAllSuborder'
      ]),
    },
    mounted() {
      let content = this.$route.path.search('today') > -1;
      if (content) {
        this.getTodaySuborder({
          onsuccess: body => this.todayList = body.data
        })
      } else {
        this.getAllSuborder({
          onsuccess: body => this.allList = body.data
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
