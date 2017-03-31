<template>

  <div class="calendar">
      <p>{{current}}</p>
      <p>Start:{{starttime}}</p>
      <p>End:{{endtime}}</p>

      <div class="tools-bar">
        <span class="clear" @click="(starttime=null,endtime=null)">清除筛选</span>
        <span class="cancel" @click="$emit('onCancel',false)">取消</span>
      </div>

      <div class="select-bar">
        <span @click="nextMonth(-1)">左</span>
        <span>{{year}}年{{month + 1}}月</span>
        <span @click="nextMonth(1)">右</span>
      </div>
      <div class="day-list">
        <span v-for="item in renderdays"
              @click="dateclick(item)"
              class="day-item"
              :class="{checked:item.checked}"
        >{{item.day}}</span>
      </div>

  </div>
</template>

<script>
  import moment from 'moment'
  moment.locale('zh-cn');

  export default{
    name: 'calendar',
    props: ['value'],
    data(){
      return {
        current: Date.parse(new Date()),
        starttime: null,
        endtime: null,
      }
    },
    computed: {
      year(){
        return moment(this.current).year()
      },
      month(){
        return moment(this.current).month()
      },
      date(){
        return moment(this.current).date()
      },
      days(){
        return moment(moment(this.current).format('YYYY-MM'), "YYYY-MM").daysInMonth();
      },
      daylist(){
        let arr = []
        for (let i = 1; i <= this.days; i++) {
          const dd = moment({
            year: this.year,
            month: this.month,
            day: i
          })
          arr.push({
            date: Date.parse(dd),
            day: i,
            disabled: false,
            checked: (Date.parse(dd) >= this.starttime && Date.parse(dd) <= this.endtime)
            || Date.parse(dd) === this.starttime
            || Date.parse(dd) === this.endtime
          })
        }
        return arr
      },
      renderdays(){
        let day = moment(this.current).date(1).day()
        let a = [].concat([...this.daylist])
        if (day != 7) {
          for (let i = 0; i < day; i++) {
            a.unshift({
              date: null,
              day: null,
              disabled: true,
              checked: false
            })
          }
        }
        return a
      }
    },
    methods: {
      dateclick(item){
        if (this.starttime === null && this.endtime === null) {
          this.starttime = item.date
        } else if (this.starttime !== null && this.endtime === null) {
          if (item.date >= this.starttime) {
            this.endtime = item.date
          } else {
            let mm = this.starttime
            this.starttime = item.date
            this.endtime = mm
          }
          this.$emit('input',this.endtime);
          this.$emit('onCancel',false);
        } else {
          this.starttime = item.date
          this.endtime = null
        }
      },
      nextMonth(val) {
        if (val > 0) {
          this.current = Date.parse(moment(this.current).add(1, 'months'))
        } else {
          this.current = Date.parse(moment(this.current).subtract(1, 'months'))
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import 'index.less';
</style>
