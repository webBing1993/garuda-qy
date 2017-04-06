<template>
  <article>
    <Tab>
      <TabItem v-for="(item,index) in tabMenu"
               :value="item"
               :key="index"
               :selected="selectedTab === item"
               @onSelected="selectedTab = item"/>
    </Tab>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  module.exports = {
    name: 'identity-list',
    data(){
      return {
        tabMenu: ['已通过', '未通过'],
        selectedTab: '已通过'
      }
    },
    computed: {
      isToday(){
        return this.$route.path.indexOf('today') > -1
      }
    },
    methods: {}
  }
</script>

