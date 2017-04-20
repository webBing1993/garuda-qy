<template>
  <div>
    <router-link to="/examples">components示例</router-link>

    <dl>
      <dt>非对接</dt>
      <dd>
        <router-link to="/record">录入修改</router-link>
      </dd>
      <dd>
        <router-link to="/roommanager">房态管理</router-link>
      </dd>
    </dl>

    <dl>
      <dt>当日将到</dt>
      <dd>
        <router-link to="precheckin/prepay/0">PMS订单/预付款确认</router-link>
      </dd>
      <dd>
        <router-link to="precheckin/order/today/0">预登记订单/当日登记</router-link>
      </dd>
      <dd>
        <router-link to="precheckin/order/history/0">预登记订单/历史登记</router-link>
      </dd>
    </dl>

    <dl>
      <dt>入住</dt>
      <dd>
        <router-link to="/identity/today/0">公安验证/当日验证</router-link>
      </dd>
      <dd>
        <router-link to="/identity/history/0">公安验证/历史验证</router-link>
      </dd>
      <dd>
        <router-link to="/checkin/identity/todo/213123">公安验证/待验证</router-link>
      </dd>
      <dd>
        <router-link to="/livein/today">在住管理/当日入住</router-link>
      </dd>
      <dd>
        <router-link to="/livein/all">在住管理/全部入住</router-link>
      </dd>
    </dl>

    <dl>
      <dt>发票</dt>
      <dd>
        <router-link to="/invoice/0">前台开票/待开发票</router-link>
      </dd>
    </dl>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    name: "home",
    data(){
      return {}
    },
    computed: {
      ...mapState([
        'AppParams'
      ]),
      currentMsg(){
        return decodeURIComponent(this.AppParams.msg)
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
        'urlquery',
        'login',
        'goto'
      ]),
      crossroad(){
        if (this.currentMsg) {
          this.goto(this.currentMsg)
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
            case 'setting':
              path = '/setting'
              break;
          }
          this.goto(path)
        }
      }
    },
    mounted(){
      this.urlquery()
      this.login()
    },
    watch: {
      sessionId(val){
        val ? this.crossroad() : null
      }
    }
  }
</script>
