<template>
  <div class="cell">
    <slot></slot>
  </div>
</template>

<script>
  export default{
    name: 'cell',
    props: []
  }
</script>

<style scoped lang="less">
  @import 'index.less';
</style>
