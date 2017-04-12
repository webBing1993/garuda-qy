<template>
  <article>
    <Tab active-color="#373946">
      <TabItem v-for="(item,index) in tabMenu"
               :key="'tabmenu'+index"
               :value="item"
               :selected="route.params.tab == index" @onSelected="toggleTab(index)">
      </TabItem>
    </Tab>

    <scroller lock-x :scrollbar-x=false :depend="renderList" height="-45">
      <section>
        <group v-for="(item,index) in renderList" :key="index">
          <cell :title="item.room.room_number + item.room.room_type_name"
                :value="item.created_time | datetimeparse('YYYYMMDDhhmm')"/>
          <cell :title="getGuestItem(item)"
                @onClick="goto('/identity/' + item.identity_id)"
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
      ...mapState([
        'route'
      ]),
      isToday(){
        return !!this.$route.path.match(/today/)
      },
      tabIndex(){
        return +this.route.params.tab
      },
      renderList(){
        return this.tabIndex ? this.refusedIdentities : this.agreedIdentities
      }
    },
    methods: {
      ...mapActions([
        'timeparse',
        'getIdentities',
        'goto',
        'replaceto'
      ]),
      getList(){
        if ((!this.tabIndex && !this.agreedIdentities.length) || (this.tabIndex && !this.refusedIdentities.length)) {
          this.getIdentities({
            scope: this.isToday ? 'TODAY' : 'HISTORY',
            status: this.tabIndex ? 'REFUSED' : 'AGREED',
            start_time: '',
            end_time: '',
            onsuccess: body => this.tabIndex ? this.refusedIdentities = body.data : this.agreedIdentities = body.data
          })
        }
      },
      resetList(){
        this.agreedIdentities = []
        this.refusedIdentities = []
      },
      getGuestItem(item){
        let dom = ``;
        item.guests.forEach(i => dom += `<div style="display: flex;justify-content: space-between;line-height: 2;">
<span>${i.name} ${i.idcard}</span><span>相似度 ${i.similarity}%</span></div>`)
        return dom
      },
      toggleTab(index){
        let newpath = this.route.path.replace(this.route.params.tab, index)
        this.replaceto(newpath)
      },
    },
    mounted(){
      this.getList()
    },
    watch: {
      tabIndex() {
        this.resetList()
        this.getList()
      }
    }
  }
</script>

