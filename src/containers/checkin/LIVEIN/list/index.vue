<template>
  <article>
    <scroller lock-x use-pulldown>
      <section>
        <orderitem v-for="(item,index) in todayList"
                   :key="index"
                   :roomNumber="item.room_number"
                   :roomTypeName="item.room_type_name"
                   :intg="item.intg"
                   :checkinTime="item.checkin_time"
                   :guests="item.guests"
                   :arrow="true"
                   @click.native="goto('/checkin/livein/detail/'+item.suborder_id)">
        </orderitem>
      </section>
    </scroller>
    <footer>
      <div class="select" v-if="!popupShowSort">
        <span v-if="sortSelected == '预登记时间从早到晚'" @click="popupShowSort = !popupShowSort">时间正序</span>
        <span v-else-if="sortSelected == '预登记时间从晚到早'" @click="popupShowSort = !popupShowSort">时间倒序</span>
        <span v-else @click="popupShowSort = !popupShowSort">时间排序</span>
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
        popupShowSort: false,
        sortSelected: null,
        sort: ['预登记时间从早到晚', '预登记时间从晚到早'],
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'getTodaySuborder'
      ]),
    },
    mounted() {
      this.getTodaySuborder({
        onsuccess: body => this.todayList = body.data
      })
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
