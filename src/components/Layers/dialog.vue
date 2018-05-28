<template>
  <div class="js_dialog" :class="{hide:!value}">
    <div class="UImask" @click="$emit('input',false)"></div>
    <div class="UIdialog">
      <div class="UIdialog_hd"><strong class="weui-dialog__title">{{title}}</strong></div>
      <div class="weui-dialog__bd">
        <slot>弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</slot>
      </div>
      <div class="weui-dialog__ft">
        <a v-if="cancel" class="weui-dialog__btn weui-dialog__btn_default" @click="onCancel">{{cancelVal}}</a>
        <a v-if="confirm" class="weui-dialog__btn weui-dialog__btn_default" @click="onConfirm">{{confirmVal}}</a>
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
      },
      confirmVal: {
        type: String,
        default: '是'
      },
      cancelVal: {
        type: String,
        default: '否'
      },
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
<style lang="less">
  @weuiDialogBackgroundColor: #FFFFFF;
  @weuiDialogLineColor: #D5D5D6;
  @weuiDialogLinkColor: #3CC51F;
  @weuiDialogLinkActiveBc: #EEEEEE;
  @weuiDialogGapWidth: 1.6em;
    .UIMask{
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 50%;
        bottom: 0;
        background: rgba(0, 0, 0, .6);
    }
   .UIdialog{
        text-align: left;
       position: fixed;
       z-index: 5000;
       width: 80%;
       max-width: 300px;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
       background-color:@weuiDialogBackgroundColor;
       text-align: center;
       border-radius: 3px;
       overflow: hidden;
   }
    .weui-dialog__hd {
      padding: 1.3em @weuiDialogGapWidth .5em;
    }
    .weui-dialog__title {
      font-weight: 400;
      font-size: 18px;
    }
    .weui-dialog__bd {
      padding: 0 @weuiDialogGapWidth .8em;
      min-height: 40px;
      font-size: 15px;
      line-height: 1.3;
      word-wrap: break-word;
      word-break: break-all;
      color: @weuiTextColorGray;
      &:first-child{
        padding:2.7em 20px 1.7em;
        color:#353535;
      }
    }
    .weui-dialog__ft {
      position: relative;
      line-height: 48px;
      font-size: 18px;
      display: flex;
      &:after {
        content: " ";
        .setTopLine(@weuiDialogLineColor);
      }
    }
    .weui-dialog__btn {
      display: block;
      flex: 1;
      color: @weuiDialogLinkColor;
      text-decoration: none;
      .setTapColor();
      &:active {
        background-color: @weuiDialogLinkActiveBc;
      }

      position: relative;
      &:after {
        content: " ";
        .setLeftLine(@weuiDialogLineColor);
      }
      &:first-child {
        &:after {
          display: none;
        }
      }
    }
    .weui-dialog__btn_default {
      color: #353535;
    }
    .weui-dialog__btn_primary {
      color: #0BB20C;
    }

    .weui-skin_android{
      .weui-dialog {
        text-align: left;
        box-shadow: 0 6px 30px 0 rgba(0, 0, 0, .1);
      }
      .weui-dialog__title{
        font-size: 21px;
      }
      .weui-dialog__hd{
        text-align: left;
      }
      .weui-dialog__bd{
        color:@weuiTextColorGray;
        padding:.25em @weuiDialogGapWidth 2em;
        font-size: 17px;
        text-align: left;
        &:first-child{
          padding:1.6em @weuiDialogGapWidth 2em;
          color:#353535;
        }
      }
      .weui-dialog__ft{
        display: block;
        text-align: right;
        line-height: 42px;
        font-size: 16px;
        padding:0 @weuiDialogGapWidth .7em;
        &:after{
          display: none;
        }
      }
      .weui-dialog__btn{
        display: inline-block;
        vertical-align: top;
        padding:0 .8em;
        &:after{
          display: none;
        }

        &:active{
          background-color: rgba(0,0,0,.06);
        }
        &:visited{
          background-color: rgba(0,0,0,.06);
        }
        &:last-child{
          margin-right: -.8em;
        }
      }
      .weui-dialog__btn_default {
        color: #808080;
      }
    }

    @media screen and (min-width: 1024px) {
      .weui-dialog {
        width: 35%;
      }
    }

</style>
