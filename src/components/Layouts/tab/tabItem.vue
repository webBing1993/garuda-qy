<template>
  <div class="weui-navbar__item"
       :class="{'weui-bar__item_on':selected}"
       @click="$emit('onSelected')">
    {{value}}
  </div>
</template>
<script>
  export default {
    name: 'tabItem',
    props: {
      value: {
        default: '选项一'
      },
      selected: false
    }
  }
</script>
