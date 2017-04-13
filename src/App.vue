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
      ])
    }
  }
</script>

<style lang="less">
  @import "./assets/styles/index.less";
</style>
