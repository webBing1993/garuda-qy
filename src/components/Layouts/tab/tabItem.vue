<template>
  <div class="weui-navbar__item" :class="{'weui-bar__item_on':selected}">
    {{value}}
  </div>
</template>
<script>
  export default {
    name: 'tab',
    props: {
      value: {
        default: '选项一'
      },
      selected: false
    }

  }
</script>
