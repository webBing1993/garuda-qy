<template>
  <div>
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
        <router-link to="/pms/prepay/0">PMS订单/预付款确认</router-link>
      </dd>
      <dd>
        <router-link to="/preorder/today/0">预登记订单/当日登记</router-link>
      </dd>
      <dd>
        <router-link to="/preorder/history/0">预登记订单/历史登记</router-link>
      </dd>
    </dl>


    <dl>
      <dt>入住</dt>
      <dd>
        <router-link to="/checkin/identity/today">公安验证/当日验证</router-link>
      </dd>
      <dd>
        <router-link to="/checkin/identity/history">公安验证/历史验证</router-link>
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
        <router-link to="/checkin/identity/todo/213123">前台开票/待开发票</router-link>
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
