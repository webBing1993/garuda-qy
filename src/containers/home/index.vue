<template>
  <div class="home">
    <p @click="popupShow = !popupShow">popup</p>
    <popup v-model="popupShow"
           :maskShow="true"
           :bottom="false"
           :top="false"
           :center="true"
           :Animation="true">
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
