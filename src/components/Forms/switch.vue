<template>
  <div class="switch_cell">
    <div class="switch_header">{{title}}</div>
    <div class="switch_body">
      <label class="switch_cp">
        <input class="switch_input" type="checkbox" v-model="currentValue"/>
        <div class="switch-cp__box"@click="onClick"></div>
      </label>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        currentValue: this.value
      }
    },
    props: {
      title: {
        type: String,
        required: true
      },
      disabled: Boolean,
      value: {
        type: Boolean,
        default: false
      }
    },
    methods:{
      onClick () {
        this.$emit('on-click', !this.currentValue, this.currentValue)
      },
    },
    watch: {
      currentValue (val) {
        this.$emit('input', val)
        this.$emit('on-change', val)
      },
      value (val) {
        this.currentValue = val
      }
    }
  }
</script>
<style>
  .switch_cell {
    padding: 15px 15px;
    position: relative;
    display: flex;
    align-items: center;
    background-color: #f2f2f2;

  }
  .switch_cp{

  }
  .switch_input{
    position: absolute;
    left: -9999px;
  }
   .switch-cp__box{
    position: relative;
    width: 60px;
    height: 30px;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: 16px;
    box-sizing: border-box;
    background-color: #DFDFDF;
    transition: background-color .1s, border .1s;

  }
  .switch-cp__box :before{
     content: " ";
     position: absolute;
     top: 0;
     left: 0;
     width: 30px;
     height: 28px;
     border-radius: 15px;
     background-color: #FDFDFD;
     transition:transform .35s cubic-bezier(0.45, 1, 0.4, 1);
   }
  .switch-cp__box:after{
     content: " ";
     position: absolute;
     top: 0;
     left: 0;
     width: 30px;
     height: 28px;
     border-radius: 15px;
     background-color: #FFFFFF;
     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
     transition:transform .35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
   }
</style>
