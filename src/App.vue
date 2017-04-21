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
        'route',
        'Interface',
      ]),
      appTitle(){
        const path = this.route.fullPath
        let out = '加载中...'

        path.match(/record/) ? out = '录入修改' : null
        path.match(/roommanager/) ? out = '房态管理' : null

        path.match(/prepay/) ? out = '预付款确认' : null

        path.match(/order\/today/) ? out = '当日登记' : null
        path.match(/order\/history/) ? out = '历史登记' : null
        path.match(/order\/detail/) ? out = '预登记订单详情' : null

        path.match(/identity\/./) ? out = '验证详情' : null
        path.match(/identity\/today/) ? out = '当日验证' : null
        path.match(/identity\/history/) ? out = '历史验证' : null
        path.match(/identity\/todo/) ? out = '待验证' : null

        path.match(/livein\/./) ? out = '入住单详情' : null
        path.match(/livein\/today/) ? out = '当日入住' : null
        path.match(/livein\/all/) ? out = '全部入住' : null

        path.match(/invoice/) ? out = '待开发票' : null

        this.settitle(out)
        return out
      }
    },
    methods: {
      ...mapActions([
        'settitle'
      ])
    },
    watch: {
      appTitle(val){
        console.log(val)
      }
    }
  }
</script>

<style lang="less">
  @import "./assets/styles/index.less";
</style>
