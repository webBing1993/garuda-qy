<template>
  <div>
    <p>预定信息</p>
    <p>orderID: {{route.params.id}}</p>

    <h2>{{checklist}}</h2>
    <input v-for="item in list" type="checkbox" :value="item" v-model="checklist">

    <button @click="ap">allpick</button>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    name: "prepaydetail",
    data(){
      return {
        list: [1, 2, 3, 4, 5],
        checklist: []
      }
    },
    computed: {
      ...mapState([
        'route'
      ])
    },
    methods: {
      ap(){
        this.checklist.length !== this.list.length
          ? (this.checklist = [], this.list.forEach(item => this.checklist.push(item)))
          : this.checklist = []
      }
    }
  }
</script>

<style scoped>
  @import "index.less";
</style>
