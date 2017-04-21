<template>
  <div class="js_dialog" :class="{hide:!value}">
    <div class="weui-mask" @click="$emit('input',false)"></div>
    <div class="weui-dialog">
      <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
      <div class="weui-dialog__bd">
        <slot>弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</slot>
      </div>
      <div class="weui-dialog__ft">
        <a v-if="cancel" class="weui-dialog__btn weui-dialog__btn_default" @click="onCancel">取消</a>
        <a v-if="confirm" class="weui-dialog__btn weui-dialog__btn_primary" @click="onConfirm">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dialog',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      confirm: {
        type: Boolean,
        default: false
      },
      cancel: {
        type: Boolean,
        default: false
      },
      title: {
        default: null
      }
    },
    methods: {
      onConfirm(){
        this.$emit('onConfirm')
        this.$emit('input', false)
      },
      onCancel(){
        this.$emit('onCancel')
        this.$emit('input', false)
      }
    }
  }
</script>
