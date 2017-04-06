<template>
  <article>
    <Tab>
      <TabItem v-for="(item,index) in tabMenu"
               :value="item"
               :key="index"
               :selected="selectedTab === item"
               @onSelected="selectedTab = item"/>
    </Tab>

    <scroller lock-x :scrollbar-x=false use-pulldown height="-45">
      <section>
        <group v-for="item in passedIdentities">
          <cell :title="item.room.room_number + item.room.room_type_name"
                :value="item.created_time|timeparse('12321')"/>
          <cell :title="getGuestItem(item)"></cell>
        </group>
      </section>
    </scroller>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  module.exports = {
    name: 'identity-list',
    data(){
      return {
        tabMenu: ['已通过', '未通过'],
        selectedTab: '已通过',
        passedIdentities: []
      }
    },
    computed: {
      isToday(){
        return this.$route.path.indexOf('today') > -1
      },
    },
    filters: {
      'timeparse'(val, p){
        let dateobj, timestamp;
        if (val) {
          timestamp = val.length == 10 ? val + '000' : val
          dateobj = new Date()
//          dateobj = new Date(parseInt(timestamp))
          console.log(timestamp)
          console.log(dateobj)

          let YY = dateobj.getFullYear()
          console.log(YY)

          let MM = dateobj.getMonth() > 8 ? dateobj.getMonth() + 1 : '0' + (dateobj.getMonth() + 1)
          console.log(MM)

          let DD = dateobj.getDate() > 9 ? dateobj.getDate() > 9 : '0' + dateobj.getDate()
          console.log(DD)

          let HH = dateobj.getHours()
          console.log(HH)

          let mm = dateobj.getHours()
          console.log(HH)


          return 123
        } else {
          return '请传入 timestamp'
        }
        console.log(val, p)
      }
    },
    methods: {
      ...mapActions([
        'timeparse',
        'getIdentities'
      ]),
      getGuestItem(item){
        let dom = ``;
        item.guests.forEach(i => dom += `<div style="display: flex;justify-content: space-between;line-height: 2;"><span>${i.name} ${i.idcard}</span><span>相似度 ${i.similarity}%</span></div>`)
        return dom
      }
    },
    mounted(){
      this.getIdentities({
        onsuccess: body => this.passedIdentities = body.data
      })
    }
  }
</script>

