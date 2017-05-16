<template>
  <article>
    <header class="tab-wrapper">
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in tabMenu"
                 :key="'tabmenu'+index"
                 :value="item"
                 :selected="route.params.tab == index"
                 @onSelected="toggleTab(index)"/>
      </Tab>
    </header>


    <div class="list-wrapper">
      <p class="synchronize">
        上次同步PMS时间: {{datetimeparse(hotel.order_update_time, 'MMDDhhmm')}}
        <x-button mini value="同步" @onClick="syncTime"/>
      </p>
    </div>
  </article>
</template>
<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  export default{
    name: 'application',
    data(){
      return {
        tabMenu: ['待处理', '已完成']
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route',
        'hotel'
      ])
    },
    methods: {
      ...mapActions([
        'replaceto',
        'hotelrefresh'
      ]),
      toggleTab(index){
        let newpath = this.route.path.replace(this.route.params.tab, index);
        this.replaceto(newpath)
      },
      syncTime(){
        this.hotelrefresh({
//          onsuccess: (body) => this.refreshList()
        })
      }
    }
  }
</script>
