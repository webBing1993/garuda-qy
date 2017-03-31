<template>
  <div class="popup" v-if="value">
    <div class="mask" v-if="maskShow" @click="popupHide"></div>
    <div class="container" :class="{bottom:bottom,top:top,center:center,animationTopBottom:animationTopBottom,animationTop:animationTop }" >
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'popup',
    props: {
      value: null,
      maskShow: {
        type: Boolean
      },
      bottom: {
        type: Boolean
      },
      top: {
        type: Boolean
      },
      center: {
        type: Boolean
      },
      animationTopBottom: {
        type: Boolean
      },
      animationTop: {
        type: Boolean
      }
    },
    methods: {
      popupHide() {
        this.$emit('input', false)
      }
    }
  }
</script>
<style scoped lang="less">
  @import 'index.less';
</style>
