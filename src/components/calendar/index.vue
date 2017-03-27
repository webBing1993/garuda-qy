<template>
  <div class="calendar">
    <p>{{current}}</p>
    <p>{{starttime}}</p>
    <p>{{endtime}}</p>
    <div class="select-bar">
      <span>左</span>
      <span>{{year}}年{{month+1}}月</span>
      <span @click="nextMonth(1)">右</span>
    </div>
    <div class="day-list">
      <span v-for="item in daylist" @click="dateclick(item)" class="day-item">{{item.day}}</span>
    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  moment.locale('zh-cn');

  export default{
    name: 'calendar',
    data(){
      return {
        current: moment(new Date()),
        starttime: null,
        endtime: null,
      }
    },
    computed: {
      year(){
        return this.current.year()
      },
      month(){
        return this.current.month()
      },
      days(){
        return moment().daysInMonth(this.month);
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
            date: dd,
            day: i,
            disabled: false,
            checked: Date.parse(dd) >= Date.parse(this.starttime) && Date.parse(dd) <= Date.parse(this.endtime)
          })
        }
        return arr
      }
    },
    methods: {
      dateclick(item){
        if (this.starttime === null && this.endtime === null) {
          console.log("======0")
          this.starttime = item.date
        } else if (this.starttime !== null && this.endtime === null) {
          console.log("======1")
          this.endtime = item.date
        } else {
          this.starttime = null
          this.endtime = null
        }
      },
      nextMonth(val) {
        console.log('0')
        if (val > 0) {
//          console.log(this.current)
//          let a = Object.assign(this.current)
//          a.add(1, 'months')
//          console.log(a.toLocaleString())
//          this.current = a
//          this.current = this.current.add(val, 'months');
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import 'index.less';
</style>
