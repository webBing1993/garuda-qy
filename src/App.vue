<template>
  <div>
    <router-view></router-view>
    <Toast v-model="Interface.toast.show" :title="Interface.toast.text"/>
    <Toast v-model="Interface.loading.show" loading/>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'app',
    computed: {
      ...mapState([
        'AppParams',
        'Interface',
        'hotel',
        'route',
      ]),
      currentMsg(){
        return this.AppParams.msg
      },
      currentApp(){
        return this.AppParams.app
      },
      sessionId(){
        return this.AppParams.session
      }
    },
    methods: {
      ...mapActions([
        'settitle',
        'urlquery',
        'login',
        'replaceto',
        'gethotelinfo'
      ]),
      crossroad(){
        if (this.currentMsg) {
          this.replaceto(this.currentMsg)
        } else {
          let path = ''
          switch (this.currentApp) {
            case 'prepay':
              path = '/precheckin/prepay/0'
              break;
            case 'record':
              path = '/record'
              break;
            case 'precheckin-today':
              path = '/precheckin/order/today/0'
              break;
            case 'precheckin-history':
              path = '/precheckin/order/history/0'
              break;
            case 'roommanager':
              path = '/roommanager'
              break;
            case 'identity-today':
              path = '/identity/today/0'
              break;
            case 'identity-history':
              path = '/identity/history/0'
              break;
            case 'livein-today':
              path = '/livein/today'
              break;
            case 'livein':
              path = '/livein/all'
              break;
            case 'invoice':
              path = '/invoice/0'
              break;
            case 'checkout':
              path = '/checkout/0';
              break;
            case 'refund':
              path = '/refund';
              break;
            case 'setting':
              path = '/setting'
              break;
          }
          this.replaceto(path)
        }
      }
    },
    mounted(){
      this.urlquery()
      this.login()
    },
    watch: {
      $route(val){
        const path = val.fullPath
        let title = '加载中...'
        path.match(/record/) ? title = '录入修改' : null
        path.match(/roommanager/) ? title = '房态管理' : null
        path.match(/prepay/) ? title = '预付款确认' : null
        path.match(/order\/today/) ? title = '当日登记' : null
        path.match(/order\/history/) ? title = '历史登记' : null
        path.match(/order\/detail/) ? title = '预登记订单详情' : null
        path.match(/identity\/./) ? title = '验证详情' : null
        path.match(/identity\/today/) ? title = '当日验证' : null
        path.match(/identity\/history/) ? title = '历史验证' : null
        path.match(/identity\/todo/) ? title = '待验证' : null
        path.match(/livein\/./) ? title = '入住单详情' : null
        path.match(/livein\/today/) ? title = '当日入住' : null
        path.match(/livein\/all/) ? title = '全部在住' : null
        path.match(/invoice/) ? title = '待开发票' : null
        path.match(/checkout/) ? title = '退房申请' : null;
        path.match(/refund/) ? title = '退款' : null;
        this.settitle(title)
      },
      sessionId(val){
        if (val) {
          this.gethotelinfo(this.hotel.hotel_id)
          this.$nextTick(() => this.crossroad())
        }
      }
    }
  }
</script>

<style lang="less">
  @import "./assets/styles/index.less";
</style>
