<template>
  <div>
    <popup v-model="popupShow"
           :maskShow="true"
           :bottom="true"
           :top="false"
           :atCenter="false"
           :fromBottom="true">
      <calendar @onCancel="popupShow= false"></calendar>
    </popup>
  </div>
</template>

<script>
  export default{
    name: "home",
    data(){
      return {
        popupShow: true
      }
    }
  }
</script>

<style scoped>
  @import "index.less";
</style>
