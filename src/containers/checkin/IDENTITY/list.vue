<template>
  <article>
    <Tab>
      <TabItem v-for="(item,index) in tabMenu"
               :value="item"
               :key="index"
               :selected="selectedTab === item"
               @onSelected="selectedTab = item"/>
    </Tab>

    <scroller lock-x :scrollbar-x=false height="-45">
      <section>
        <group v-for="(item,index) in agreedIdentities" :key="index">
          <cell :title="item.room.room_number + item.room.room_type_name"
                :value="item.created_time | datetimeparse('hhmm')"/>
          <cell :title="getGuestItem(item)"
                @onClick="goto('/checkin/identity/detail/'+item.identity_id)"
                link/>
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
        agreedIdentities: [],
        refusedIdentities: []
      }
    },
    computed: {
      isToday(){
        return !!this.$route.path.match(/today/)
      },
      isAgreed(){
        return !this.tabMenu.findIndex(i => i == this.selectedTab)
      }
    },
    methods: {
      ...mapActions([
        'timeparse',
        'getIdentities',
        'goto'
      ]),
      getGuestItem(item){
        let dom = `<div style="display: flex;justify-content: space-between;line-height: 2;color:#bdbdbd;"><span>入住人</span><span>相似度</span></div>`;
        item.guests.forEach(i => dom += `<div style="display: flex;justify-content: space-between;line-height: 2;"><span>${i.name} ${i.idcard}</span><span>${i.similarity}%</span></div>`)
        return dom
      }
    },
    mounted(){
      this.getIdentities({
        onsuccess: body => this.agreedIdentities = body.data
      })
    },
    watch: {
      selectedTab(val){
        if ((this.isAgreed && !this.agreedIdentities.length) || (!this.isAgreed && !this.refusedIdentities.length)) {
          this.getIdentities({
            scope: this.isToday ? 'TODAY' : 'HISTORY',
            status: this.isAgreed ? 'AGREED' : 'REFUSED',
            onsuccess: body => this.isAgreed ? this.agreedIdentities = body.data : this.refusedIdentities = body.data
          })
        }
      }
    }
  }
</script>

