<template>
  <div>
    <dl>
      <dt>非对接</dt>
      <dd>
        <router-link to="/unchained/record">录入修改</router-link>
        <router-link to="/unchained/roommanager">房态管理</router-link>
      </dd>
    </dl>

    <dl>
      <dt>当日将到</dt>
      <dd>
        <router-link to="/pms/prepay/0">预付款确认</router-link>
      </dd>
    </dl>

  </div>
</template>

<script>
  export default{
    name: "home",
    data(){
      return {}
    }
  }
</script>
