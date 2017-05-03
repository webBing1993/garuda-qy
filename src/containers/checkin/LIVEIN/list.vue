<template>
  <article>
    <scroller :pulldown-config="Interface.scroller"
              :depend="renderList"
              @on-pulldown-loading="getList"
              use-pulldown
              lock-x>
      <div class="scroller-wrap">
        <p v-show="!renderList||renderList.length === 0" class="no-data">暂无数据</p>
        <Group v-for="(item,index) in renderList" :key="index">
          <Cell :title="getCellTitle(item)"/>
          <Cell :title="getGuestItem(item)" link @onClick="goto('/livein/'+item.order_id)"/>
        </Group>
      </div>
    </scroller>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'list',
    data() {
      return {
        todayList: [],
        allList: []
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
      },
      unionTag() {
        let totalList = [...this.todayList, ...this.allList];
        let tagList = [];
        totalList.forEach(item => {
            if (item.union_tag) {
              let tagIndex = tagList.findIndex(i => i.tag === item.union_tag);
              tagIndex === -1
                ? tagList.push({tag: item.union_tag, room_number: [item.room_number]})
                : tagList[tagIndex].room_number = [...tagList[tagIndex].room_number, item.room_number]
            }
          }
        );
        return tagList;
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'getTodaySuborder',
        'getAllSuborder'
      ]),
      getCellTitle(item){
        let tag = this.getUnionTag(item.union_tag, item.room_number);
        return `<p><span class="cell-value">${item.room_number} ${item.room_type_name} ${tag ? '（联' + tag + ')' : ''} </span><span class="cell-right gray">${this.datetimeparse(item.in_time, this.isToday ? 'hhmm' : 'MMddhhmm')}</span></p>`
      },
      getUnionTag(tag, tempRoom){
        return this.unionTag.filter(i => i.tag === tag)[0].room_number.filter(i => i !== tempRoom).join(',')
      },
      getGuestItem(item){
        let dom = ``;
        if (item.guests) {
          item.guests.length > 0
            ? item.guests.forEach(i => {
            dom += `<div style="display: flex;color: #4a4a4a;justify-content: space-between;line-height: 2;"><span>${i.name} ${this.idnumber(i.idcard)}</span></div>`
          })
            : dom += `<div>无入住人</div>`
        } else {
          dom += `<div>无入住人</div>`
        }
        item.lvye_report_status ? null : dom += `<p style="color:#DF4A4A;">未上传旅业系统</p>`

        return dom
      },
      getList() {
        this.isToday
          ?
          this.getTodaySuborder({
            onsuccess: body => this.todayList = [...body.data]
          })
          :
          this.getAllSuborder({
            onsuccess: body => this.allList = [...body.data]
          })
      }
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
