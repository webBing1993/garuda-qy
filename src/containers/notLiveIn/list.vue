<template>
  <!--<Group>-->
  <!--<Cell :title="liveInCellTitle()"/>-->
  <!--<Cell :title="liveInBody()"/>-->
  <!--</Group>-->
  <div class="center">
    <p class="title">203 <span>同住人未办理入住</span></p>
    <div>
      <p>入住人</p>
      <p>李四</p>
    </div>
    <div>
      <p>状态</p>
      <p>上天了</p>
    </div>
    <div>
      <p>订单号</p>
      <p>dhkdfhvjhdjdksvdjdjdk3456789</p>
    </div>
    <div>
      <p>预订人</p>
      <p>范冰冰</p>
    </div>
    <div>
      <p>手机号码</p>
      <p>1876457765547</p>
    </div>
    <div class="space"></div>
    <div>
      <x-button value="我知道了" @onClick=""></x-button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'list',
    data() {
      return {
        todayList: []
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route',
        'hotel'
      ]),

    },
    methods: {
      ...mapActions([
        'goto'

      ]),
      liveInCellTitle(){
        return '302同住人未办理入住'
      },
      liveInBody(){
        let dom = '';
        dom += `<div class="center">
         <div class="itemlist">
          <p class="itemtiele">入住人</p>
          <p class="itemtiele">李四</p>
        </div>
        <div class="itemlist">
          <p class="itemtiele">状态</p>
          <p class="itemtiele">李四</p>
        </div>
        <div class="itemlist">
          <p class="itemtiele">订单号</p>
          <p class="itemtiele">李四</p>
        </div>
        <div class="itemlist">
          <p class="itemtiele">预订人</p>
          <p class="itemtiele">张三</p>
        </div>
        <div class="itemlist">
          <p class="itemtiele">手机号码</p>
          <p class="itemtiele">1876457765547</p>
        </div>
        </div>`
        return dom
      }
    },
    activated() {
      this.initList()
    }
  }
</script>
<style lang="less">
  @import "./index.less";
</style>
