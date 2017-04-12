<template>
  <div>
    <router-view></router-view>
    <Toast v-model="app.toast.show" :title="app.toast.title"/>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'app',
    computed: {
      ...mapState([
        'app',
        'urlparams'
      ]),
      currentApp(){
        return this.urlparams.app
      }
    },
    methods: {
      ...mapActions([
        'urlquery',
        'login'
      ])
    },
    mounted(){
      this.urlquery()
      this.login()
    },
    watch: {
      currentApp(val){
        console.log('CURRENT APP: ' + val)
      }
    }
  }
</script>

<style lang="less">
  @import "./assets/styles/index.less";
</style>
