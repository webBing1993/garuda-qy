<template>
  <div class="home-container">

    <Group title="待办事项">
      <Cell icon="../../../static/icon/ic_prepay_confirm.png" title="待预付款确认" link badge="2"
            @onClick="goto('prepay/0')"></Cell>
      <Cell icon="../../../static/icon/ic_police.png" title="您有一条公安验证待处理" link badge="2"
            @onClick="goto('identity/today/0')"></Cell>
      <Cell icon="../../../static/icon/ic_lvye.png" title="待手动输入，旅业上传" link badge="2"
            @onClick="goto('policeIdentity/handle/0')"></Cell>
      <Cell icon="../../../static/icon/ic_invoice.png" title="待提前开具发票" link badge="2"
            @onClick="goto('invoice/0')"></Cell>
      <Cell icon="../../../static/icon/ic_checkout.png" title="待操作离店" link badge="2"
            @onClick="goto('receive/checkout-application')"></Cell>
    </Group>

    <Group title="应用">
      <ul class="app-container">
        <li class="app-item" @click="goto('prepay/0')">
          <img src="../../../static/icon/ic_prepay_confirm.png" alt="订单中心">
          <span class="app-title">订单中心</span>
          <div class="warn">
            <span class="warn-dot"></span>
            <span>异常</span>
          </div>
        </li>
        <li class="app-item" @click="goto('receive/precheckin')">
          <img src="../../../static/icon/ic_checkout.png" alt="接待服务">
          <span class="app-title">接待服务</span>
        </li>
        <li class="app-item" @click="goto('/identity/today/0')">
          <img src="../../../static/icon/ic_police.png" alt="公安验证">
          <span class="app-title">公安验证</span>
        </li>
        <li class="app-item" @click="goto('/policeIdentity/handle/0')">
          <img src="../../../static/icon/ic_lvye.png" alt="身份核验">
          <span class="app-title">身份核验</span>
        </li>
        <li class="app-item" @click="goto('/invoice/0')">
          <img src="../../../static/icon/ic_invoice.png" alt="闪开发票">
          <span class="app-title">闪开发票</span>
        </li>
        <li class="app-item" @click="goto('/refund')">
          <img src="../../../static/icon/ic_bill.png" alt="账务管理">
          <span class="app-title">账务管理</span>
        </li>
      </ul>
    </Group>

  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'home',
    data() {
      return {}
    },
    methods: {
      ...mapActions([
        'goto'
      ])
    }
  }
</script>

<style lang="less">
  @import "./home.less";
</style>
