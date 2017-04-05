<template>
  <div id="app">
    <router-view ></router-view>
    <Toast v-model="app.toast.show" :title="app.toast.title"/>
  </div>
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
