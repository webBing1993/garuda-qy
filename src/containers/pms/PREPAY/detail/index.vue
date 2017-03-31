<template>
  <div>
    <p>预定信息</p>
    <p>orderID: {{route.params.id}}</p>

    <h2>{{checklist}}</h2>

    <Group>
      <div>
        <label class="weui-cell weui-check__label" v-for="(one, index) in list">
            <input type="checkbox" class="weui-check" v-model="checklist" :value="one">
            <i class="weui-icon-checked"></i>
        </label>
      </div>
    </Group>


    <label v-for="item in list" style="display: block">
      <p><input type="checkbox" :value="item" v-model="checklist"></p>
    </label>

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
