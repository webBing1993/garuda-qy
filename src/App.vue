<template>
  <router-view id="app"></router-view>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'app',
    computed: {
      ...mapState([
        'app'
      ])
    },
    methods: {
      ...mapActions([
        'token'
      ])
    },
    mounted(){
//      this.token()
    }
  }
</script>

<style lang="less">
  @import "./assets/styles/index.less";
</style>
