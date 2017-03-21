<template>
  <div class="button"
       :class="{'reverse':reverse,'red':red}"
       @click="$emit('onClick')">
    <slot>按钮</slot>
  </div>
</template>

<script>
  import './index.less'

  module.exports = {
    name: 'button',
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      reverse: {
        type: Boolean,
        default: false
      },
      red: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      typeclass(){
        return this.alert ? "alert" : this.plain ? "plain" : "normal"
      },
      disabledclass(){
        return this.disabled ? "disabled" : null
      }
    }
  }
</script>
