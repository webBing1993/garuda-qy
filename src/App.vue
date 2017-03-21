<template>
  <router-view id="app"></router-view>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'app',
    methods: {
      ...mapActions([
        'resource'
      ])
    },
    mounted(){
      this.resource({
        url: "/login",
        onSuccess: () => null,
        onFail: () => null
      })
    }
  }
</script>

<style>
  @import "./assets/main.less";
</style>
