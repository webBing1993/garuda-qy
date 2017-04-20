<template>
  <div>
    <router-view></router-view>
    <Toast v-model="Interface.toast.show" :title="Interface.toast.title"/>
    <Toast v-model="Interface.loading.show" loading/>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'app',
    computed: {
      ...mapState([
        'Interface',
      ])
    }
  }
</script>

<style lang="less">
  @import "./assets/styles/index.less";
</style>
