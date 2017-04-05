<template>
  <div class="popup" v-if="value">
    <div class="mask" v-if="maskShow" @click="popupHide"></div>
    <div class="container"
         :class="{bottom:bottom,center:center,animationTopBottom:animationTopBottom,animationTop:animationTop }"
         :style="top?topClass : null">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'popup',
    data() {
        return {
            topClass: {
              'position': 'absolute',
              'top': (this.top + 'px')||0,
              'left': 0,
              'z-index': 333
            }
        }
    },
    props: {
      value: null,
      maskShow: {
        type: Boolean
      },
      bottom: {
        type: Boolean
      },
      top: null,
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
