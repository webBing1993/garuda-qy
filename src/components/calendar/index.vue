<template>
  <div>
    <h1>calendar  </h1>
    <p>{{starttime}}</p>
    <p>{{endtime}}</p>
    <div v-for="item in daylist" @click="dateclick(item)">{{item.day}} {{item.checked}} {{item.disabled}}</div>
  </div>
</template>

<script>
  import moment from 'moment'
  moment.locale('zh-cn');
  console.log(moment.locale())
  export default{
    name: 'calendar',
    data(){
      return {
        current: moment(),
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
      }
    }
  }
</script>

<style scoped lang="less">
  @import 'index.less';
</style>
