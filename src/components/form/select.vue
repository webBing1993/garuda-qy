<template>
  <div class="weui-cell weui-cell_select">
    <div class="weui-cell__bd">
      <select class="weui-select" name="select1">
        <option selected="" value="1">微信号</option>
        <option value="2">QQ号</option>
        <option value="3">Email</option>
      </select>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      type: {
        default: 'text'
      },
      title: {
        default: null
      },
      value: {
        default: null
      },
      placeholder: {
        default: "请输入文本"
      },
      fill: {
        type: Boolean
      },
    },
    methods: {
      updateValue: function (value) {
        this.type == ('number' || 'Number')
          ? this.$emit('input', value ? Number(value) : value)
          : this.$emit('input', value)
      }
    }
  }
</script>
