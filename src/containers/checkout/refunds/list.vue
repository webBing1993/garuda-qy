<template>
  <article>
    <p class="synchronize">
      上次同步PMS时间: {{datetimeparse(hotel.order_update_time, 'MMDDhhmm')}}
      <x-button mini value="同步" @onClick="syncTime"/>
    </p>
    <div class="list-wrapper">

    </div>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  export default{
    name: 'refunds',
    data(){
      return {}
    },
    computed: {
      ...mapState([
        'hotel'
      ])
    },
    methods: {
      ...mapActions([
        'hotelrefresh'
      ]),
      syncTime(){
        this.hotelrefresh({
//          onsuccess: (body) => this.refreshList()
        })
      }
    }
  }
</script>
