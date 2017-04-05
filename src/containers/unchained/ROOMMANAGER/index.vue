<template>
  <article>
    <header>
      <Tab>
        <TabItem v-for="(item,index) in tabmenu"
                 :value="item"
                 :key="index"
                 :selected="tabSelected === item"
                 @onSelected="tabSelected = item"/>
      </Tab>
      <div class="toolbar" v-show="isBatch == false">
        <div :class="{reverse:showFloorList}" @click="showFloorList = true, showRoomTypeList = false">{{floorFilter}}
        </div>
        <div :class="{reverse:showRoomTypeList}" @click="showRoomTypeList = true, showFloorList = false">
          {{roomTypeFilter}}
        </div>
        <div @click="isBatch = true, showRoomTypeList = false, showFloorList = false">批量选择</div>
      </div>
      <div class="cancelbar" v-show="isBatch == true">
        <div @click="isBatch = false, batchlist = [], showRoomTypeList = false, showFloorList = false">取消</div>
      </div>
    </header>

    <scroller v-if="tabSelected == '备选房'"
              :pulldown-config="app.scroller.config"
              height="-86"
              use-pulldown
              lock-x>
      <section>
        <checker class="rooms clearfix"
                 :class="{isBatch}"
                 v-model="batchlist"
                 type="checkbox"
                 default-item-class="item"
                 selected-item-class="selected">
          <checker-item v-for="(item,index) in roomlist"
                        :class="{disabled:item.room_status == 2}"
                        :key="item.room_id"
                        :value="item.room_id"
                        v-show="isRoomShow(item)">
            <div class="room-wrap" @click="roomClick(item)">
              <div class="room-item" :class="'roomstatus' + item.room_status">
                <p>{{getRoomTypeName(item.room_type_id)}}</p>
                <p>{{item.room_number}}</p>
                <p>{{item.guest_name||item.owner_name}}</p>
              </div>
            </div>
          </checker-item>
        </checker>
      </section>
    </scroller>

    <scroller v-if="tabSelected == '所有房'"
              :pulldown-config="app.scroller.config"
              height="-86"
              use-pulldown
              lock-x>
      <section>
        <checker class="rooms clearfix"
                 :class="{isBatch}"
                 v-model="batchlist"
                 type="checkbox"
                 default-item-class="item"
                 selected-item-class="selected">
          <checker-item v-for="(item,index) in roomlist"
                        :key="item.room_id"
                        :value="item.room_id"
                        v-show="isRoomShow(item)">
            <div class="room-wrap" @click="roomClick(item)">
              <div class="room-item" :class="item.config.enabled_pick ? 'enable':''">
                <p>{{getRoomTypeName(item.room_type_id)}}</p>
                <p>{{item.room_number}}</p>
                <p>{{item.guest_name||item.owner_name}}</p>
              </div>
            </div>

          </checker-item>
        </checker>
      </section>
    </scroller>

    <footer>
      <section v-if="isBatch" class="buttons">
        <div v-show="tabSelected == '所有房'" class="botton-wrap">
          <x-button value="设为空净" primary/>
        </div>
        <div v-show="tabSelected == '所有房'" class="botton-wrap">
          <x-button value="设为空脏"/>
        </div>
        <div v-show="tabSelected == '备选房'" class="botton-wrap">
          <x-button value="设为备选" primary/>
        </div>
        <div v-show="tabSelected == '备选房'" class="botton-wrap">
          <x-button value="移除备选"/>
        </div>
      </section>
      <ul v-else>
        <li v-for="(item,index) in statusFilter"
            :key="'statusFilter'+index"
            :class="{active:item.active}"
            @click="statusFilterCurrent = item.status">
          <p>{{item.name}}</p><span>{{item.count}}</span>
        </li>
      </ul>
    </footer>

    <popup v-model="showFloorList" maskShow :top="86">
      <div class="pick-box">
        <p @click="(floorFilterCurrent = null,showFloorList = false)">全部楼层</p>
        <p v-for="item in floorList" @click="(floorFilterCurrent = item.floor_id,showFloorList = false)">
          {{item.floor_name}}</p>
      </div>
    </popup>

    <popup v-model="showRoomTypeList" maskShow :top="86">
      <div class="pick-box">
        <p @click="(roomTypeFilterCurrent = null,showRoomTypeList = false)">全部房型</p>
        <p v-for="item in roomTypeList" @click="(roomTypeFilterCurrent = item.room_type_id,showRoomTypeList = false)">
          {{item.room_type_name}}
        </p>
      </div>
    </popup>

    <Dialog v-model="showDialog" class="room-status-dialog">
      <div class="payloadinfo">
        <p class="room-type">{{getRoomTypeName(payloading.room_type_id)}}</p>
        <h1 class="room-number">{{payloading.room_number}}</h1>
      </div>

      <section class="button-box">
        <div v-if="tabSelected == '所有房'">
          <x-button value="设为备选" primary></x-button>
          <x-button value="移除备选"></x-button>
        </div>
        <div v-else>
          <div v-if="payloading.room_status == 2">
            <x-button value="退房" alert/>
          </div>
          <div v-else>
            <x-button value="设为空净" primary/>
            <x-button value="设为空脏"/>
            <x-button value="转入住" class="checkin"/>
            <x-button value="取消订单" class="cancelorder" warn/>
          </div>
        </div>
      </section>
    </Dialog>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    name: "roommanager",
    data(){
      return {
        tabmenu: ["备选房", "所有房"],
        tabSelected: "备选房",

        roomTypeList: [
          {
            room_type_id: 'DCF',
            room_type_name: '大床房'
          }, {
            room_type_id: 'SCF',
            room_type_name: '双床房'
          }],
        floorList: [
          {
            floor_id: 111,
            floor_name: '1层'
          }, {
            floor_id: 222,
            floor_name: '2层'
          }, {
            floor_id: 333,
            floor_name: '3层'
          }, {
            floor_id: 444,
            floor_name: '4层'
          },],
        roomlist: [
          {
            room_id: '111111',//房间id
            room_number: '103',//房间号
            room_status: 0, //0:空净 1:空脏 2:在住
            room_type_id: 'DCF', //房型代码
            floor_id: 111, //楼层id
            config: {
              enabled_pick: true, //是否允许自助选房
            },
            owner_name: 'ted',
            guest_name: ''
          }, {
            room_id: '111112',//房间id
            room_number: '102',//房间号
            room_status: 0, //0:空净 1:空脏 2:在住
            room_type_id: 'DCF', //房型代码
            floor_id: 111, //楼层id
            config: {
              enabled_pick: true, //是否允许自助选房
            },
            owner_name: 'ted',
            guest_name: ''
          }, {
            room_id: '111113',//房间id
            room_number: '204',//房间号
            room_status: 1, //0:空净 1:空脏 2:在住
            room_type_id: 'SCF', //房型代码
            floor_id: 222, //楼层id
            config: {
              enabled_pick: true, //是否允许自助选房
            },
            owner_name: 'ted',
            guest_name: 'alan'
          }, {
            room_id: '111114',//房间id
            room_number: '304',//房间号
            room_status: 2, //0:空净 1:空脏 2:在住
            room_type_id: 'SCF', //房型代码
            floor_id: 333, //楼层id
            config: {
              enabled_pick: false, //是否允许自助选房
            },
            owner_name: 'ted',
            guest_name: 'alan'
          }, {
            room_id: '111115',//房间id
            room_number: '405',//房间号
            room_status: 2, //0:空净 1:空脏 2:在住
            room_type_id: 'asd', //房型代码
            floor_id: 444, //楼层id
            config: {
              enabled_pick: false, //是否允许自助选房
            },
            owner_name: '',
            guest_name: ''
          }, {
            room_id: '111116',//房间id
            room_number: '206',//房间号
            room_status: 0, //0:空净 1:空脏 2:在住
            room_type_id: 'DCF', //房型代码
            floor_id: 222, //楼层id
            config: {
              enabled_pick: false, //是否允许自助选房
            },
            owner_name: '',
            guest_name: ''
          },],

        showFloorList: false,
        floorFilterCurrent: null,

        showRoomTypeList: false,
        roomTypeFilterCurrent: null,

        statusFilterCurrent: null,

        isBatch: false,
        batchlist: [],

        showDialog: false,
        payloading: {}
      }
    },
    filters: {},
    computed: {
      ...mapState([
        'app',
        'route',
      ]),
      floorFilter(){
        return this.floorFilterCurrent == null
          ? '全部楼层'
          : this.floorList.filter(i => i.floor_id == this.floorFilterCurrent)[0].floor_name
      },
      roomTypeFilter(){
        console.log(typeof this.roomTypeFilterCurrent)

        return this.roomTypeFilterCurrent == null
          ? '全部房型'
          : this.roomTypeList.filter(i => i.room_type_id == this.roomTypeFilterCurrent)[0].room_type_name
      },
      statusFilter(){
        return [{
          name: '全部备选',
          count: this.roomlist.length,
          status: null,
          active: this.statusFilterCurrent == null
        }, {
          name: '预定',
          status: 3,
          count: this.roomlist.filter(i => i.owner_name && i.room_status !== 2).length,
          active: this.statusFilterCurrent == 3
        }, {
          name: '空净',
          status: 0,
          count: this.roomlist.filter(i => i.room_status == 0).length || 0,
          active: this.statusFilterCurrent == 0
        }, {
          name: '空脏',
          status: 1,
          count: this.roomlist.filter(i => i.room_status == 1).length || 0,
          active: this.statusFilterCurrent == 1
        }, {
          name: '在住',
          status: 2,
          count: this.roomlist.filter(i => i.room_status == 2).length || 0,
          active: this.statusFilterCurrent == 2
        }]
      }
    },
    methods: {
      isRoomShow(item){
        let floor = this.floorFilterCurrent === null || this.floorFilterCurrent == item.floor_id
        let roomtype = this.roomTypeFilterCurrent === null || this.roomTypeFilterCurrent == item.room_type_id
        let status = this.statusFilterCurrent == 3 ? !!item.owner_name && item.room_status !== 2 : this.statusFilterCurrent === null || this.statusFilterCurrent == item.room_status
        return status && floor && roomtype
      },
      getRoomTypeName(val){
        let list = this.roomTypeList.filter(i => i.room_type_id == val)
        return list.length > 0 ? list[0].room_type_name : val
      },
      roomClick (item) {
        //非批量模式下点击房间
        if (!this.isBatch) {
          this.batchlist = []
          this.payloading = item
          this.showDialog = true
        }
      },
      reset(){
        this.floorFilterCurrent = null
        this.roomTypeFilterCurrent = null
        this.statusFilterCurrent = null
        this.isBatch = false
        this.batchlist = []
        this.showFloorList = false
        this.showRoomTypeList = false
        this.showDialog = false
        this.payloading = {}
      }
    },
    watch: {
      tabSelected(){
        this.reset()
      }
    }
  }
</script>


<style scoped lang="less">
  @import "index.less";
</style>
