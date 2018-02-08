<template>
  <!--<Group>-->
  <!--<Cell :title="liveInCellTitle()"/>-->
  <!--<Cell :title="liveInBody()"/>-->
  <!--</Group>-->
  <div>
    <div class="center" v-for="(item,index) in rendAbsentList" :key="index">
      <p class="title">{{item.room_no}} <span>同住人未办理入住</span></p>
      <div>
        <p>入住人</p>
        <p>{{item.guest_name}}</p>
      </div>
      <div>
        <p>状态</p>
        <p>{{item.order_no=='I'?"已入住":"未入住"}}</p>
      </div>
      <div>
        <p>订单号</p>
        <p>{{item.order_no}}</p>
      </div>
      <div>
        <p>预订人</p>
        <p>{{item.owner}}</p>
      </div>
      <div>
        <p>手机号码</p>
        <p>{{item.owner_tel}}</p>
      </div>
      <div class="space"></div>
      <div>
        <x-button value="我知道了" @onClick="_makeSureIKnow(item)"></x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'list',
    data() {
      return {
        todayList: [],
        rendAbsentList: []
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route',
        'hotel',
      ]),
      renderList() {
//        return this.rendAbsentList;
//        return this.sortByTime(this.checkOutList, 'created_time');
      },


    },
    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'getAbsentList',
        'setRemindStatus'

      ]),
      initList(){
        this.getAbsentList({
          onsuccess: body => (this.rendAbsentList = [...body.data])
        })
      },
      _makeSureIKnow(item){
        let remindId=item.remind_noshow_id
        this.setRemindStatus({
          remindId: remindId,
          onsuccess: body => this.replaceto('notLiveIn/list')
        })

      }
//      liveInCellTitle(){
//        return '302同住人未办理入住'
//      },
//      liveInBody(){
//        let dom = '';
//        dom += `<div class="center">
//         <div class="itemlist">
//          <p class="itemtiele">入住人</p>
//          <p class="itemtiele">李四</p>
//        </div>
//        <div class="itemlist">
//          <p class="itemtiele">状态</p>
//          <p class="itemtiele">李四</p>
//        </div>
//        <div class="itemlist">
//          <p class="itemtiele">订单号</p>
//          <p class="itemtiele">李四</p>
//        </div>
//        <div class="itemlist">
//          <p class="itemtiele">预订人</p>
//          <p class="itemtiele">张三</p>
//        </div>
//        <div class="itemlist">
//          <p class="itemtiele">手机号码</p>
//          <p class="itemtiele">1876457765547</p>
//        </div>
//        </div>`
//        return dom
//      }
    },
    mounted() {
      this.initList();
    },
  }
</script>
<style lang="less">
  @import "./index.less";
</style>
