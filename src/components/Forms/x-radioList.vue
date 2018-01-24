<template>
  <div>
    <label class="radioList_cell" v-for="(one, index) in options">
      <div style="flex: 1">
        <p>{{one}}</p>
      </div>
      <div class="" v-on:click="onClick(index)" v-show="clicked[0]">
        <input type="checkbox" class="Radiolist_check" v-model="currentValue" :value="one">
        <img src="./duigou.png" alt="" width="20px" height="20px"/>
      </div>
    </label>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        currentValue: this.value,
        clicked:[true]
      }
    },
    props: {
      options: {
        type: Array,
        required: true,
        default: () => []
      },
      value: {
        default: null
      }
    },
    methods: {
      onClick(ev) {
          console.log(ev)
          this.clicked=true;

        this.$emit('onClick');
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
      },
      currentValue (newVal) {
        this.$emit('on-change', newVal)
        this.$emit('Bindtap', newVal)
      }
    },
  }
</script>

<style lang="less">
  .radioList_cell {
    background-color: #f2f2f2;
    padding: 15px 15px;
    position: relative; //这个是为了兼容cells容器onepx方案被before挡住而做的
    display: flex;
    align-items: center;
    &:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #D9D9D9;
      color: #D9D9D9;
      transform-origin: 0 0;
      transform: scaleY(0.5);
      left: 20px;
    }
    &:first-child {
      &:before {
        display: none;
      }
    }
  }

  .Radiolist_check {
    position: absolute;
    left: -9999em;
  }

  .weui-cell__bd {

  }

</style>
