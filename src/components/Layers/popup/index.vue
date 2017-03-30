<template>
  <div class="popup" v-if="value">
    <div class="mask" v-if="maskShow" @click="popupHide"></div>
    <div class="container" :class="{bottom:bottom,top:top,center:center,Animation:Animation}">
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
      Animation: {
        type: Boolean
      }

    },
    data() {
      return {

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
