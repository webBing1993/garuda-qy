<template>
  <article>
    <Group v-for="(item,index) in recordlist" :key="'record'+index">
      <Cell :title="getTitle(item)"></Cell>
      <Cell :title="getBody(item)" link></Cell>
    </Group>
    <footer>
      <x-button value="添加新订单" @onClick="goto('/record/new')"></x-button>
    </footer>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    data(){
      return {
        recordlist: []
      }
    },
    methods: {
      ...mapActions([
        'getrecord',
        'goto'
      ]),
      getTitle(item){
        return `<div><span class="cell-title">订单号：</span>${item.order_pmsid}</div>`
      },
      getBody(item){
        let temp = `<div class="cell-temp"><span class="cell-title">预订人：</span>${item.owner + item.owner_tel}</div>`
        item.rooms_plan.forEach(i => temp += `<div class="cell-temp"><span class="cell-title">房型：</span>${i.room_type + '*' + i.room_count}</div>`)
        return temp
      }
    },
    mounted(){
      this.getrecord({
        onsuccess: body => this.recordlist = body.data
      })
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
