<template>
  <article>
    <scroller lock-x :depend="[roomCount,roomPrice]">
      <section class="wrap">
        <Group>
          <XInput title="订单号" v-model="detail.order_pmsid"/>
          <Cell title="订单来源" :value="getSourceName(detail.source_id)" @onClick="isSourceListShow = true" link/>
        </Group>

        <Group title="预订人信息">
          <XInput title="姓名" v-model="detail.owner"/>
          <XInput title="手机号" type="number" v-model="detail.owner_tel"/>
        </Group>

        <Group title="房间信息">
          <Cell title="房型" :value="getRoomTypeName(detail.room_type_id)" @onClick="isRoomTypeListShow = true" link/>
          <Cell title="入住时间" :value="detail.in_time | datetimeparse"
                @onClick="isCalendarShow = true, calendarType = 'IN'"
                link/>
          <Cell title="离店时间" :value="detail.out_time | datetimeparse"
                @onClick="isCalendarShow = true, calendarType = 'OUT'"
                link/>
          <XInput title="房价￥"
                  v-model="item.price"
                  v-for="(item,index) in roomPrice"
                  :key="'roomPrice'+index"
                  :placeholder="item.date | datetimeparse"/>
        </Group>

        <Group v-if="detail.room_type_id">
          <Cell title="房间数量" :value="roomCount" @onClick="isRoomCountShow = true" link/>
          <Cell title="房号"
                :value="item.room_number"
                v-for="(item,index) in roomNumbers"
                :key="'roomNumbers'+index"
                @onClick="isRoomPickShow = true, roomNumberIndex = index"
                link/>
        </Group>

        <Group title="预付/备注">
          <XInput title="金额" v-model="detail.payinfo.staff_pay"></XInput>
          <XTextarea placeholder="备注" v-model="detail.remark"></XTextarea>
        </Group>

        <div class="button-group">
          <XButton v-if="orderId" value="修改"></XButton>
          <XButton v-if="orderId" value="删除" warn></XButton>
          <XButton v-else value="添加"></XButton>
        </div>
      </section>
    </scroller>

    <Actionsheet v-model="isSourceListShow" :menu="sourceMenu" @onClick="toggleSource" cancel/>
    <Actionsheet v-model="isRoomTypeListShow" :menu="roomTypeMenu" @onClick="toggleRoomType" cancel/>
    <Actionsheet v-model="isRoomCountShow" :menu="[1,2,3,4]" @onClick="toggleRoomCount" cancel/>
    <popup v-model="isCalendarShow"
           maskShow
           bottom
           animationTopBottom>
      <calendar v-if="calendarType === 'IN'" v-model="detail.in_time" @onCancel="isCalendarShow = false"/>
      <calendar v-if="calendarType === 'OUT'" v-model="detail.out_time" @onCancel="isCalendarShow = false"/>
    </popup>

    <Dialog v-model="isRoomPickShow" title="选择房间" cancel>
      <p v-if="cleanRoomForPick.length">空净房</p>
      <section class="roompick-group">
        <div class="clean" v-for="item in cleanRoomForPick">
          <p>{{item.room_number}}</p>
        </div>
      </section>

      <p v-if="dirtyRoomForPick.length">空脏房</p>
      <section class="roompick-group">
        <div class="dirty" v-for="item in dirtyRoomForPick">
          <p>{{item.room_number}}</p>
        </div>
      </section>

    </Dialog>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    data(){
      return {
        sourcelist: [],
        roomtypelist: [],
        roomlist: [],
        isSourceListShow: false,
        isRoomTypeListShow: false,
        isCalendarShow: false,
        isRoomCountShow: false,
        isRoomPickShow: false,

        calendarType: null,
        roomNumberIndex: null,

        detail: {
          type: "IMPORT",
          order_pmsid: '',
          source_id: '',
          owner: '',
          owner_tel: '',
          in_time: Date.parse(new Date()),
          out_time: Date.parse(new Date()) + 86400000,
          room_type_id: '',
          payinfo: {
            staff_pay: null,
          },
          rooms_plan: [{
            room_count: 1,
          }],
        },
      }
    },
    computed: {
      ...mapState([
        'route'
      ]),
      orderId(){
        return this.route.params.id
      },
      sourceMenu(){
        let list = []
        this.sourcelist.forEach(i => list.push(i.source_name))
        return list
      },
      roomTypeMenu(){
        let list = []
        this.roomtypelist.forEach(i => list.push(i.room_type_name))
        return list
      },
      roomPrice(){
        let list = []
        let gap = parseInt(this.detail.out_time) - parseInt(this.detail.in_time)
        for (let i = 0; i * 86400000 < gap; i++) {
          list.push({
            date: this.detail.in_time + i * 86400000,
            price: null,
          })
        }
        return list
      },
      roomCount(){
        let roomcount = 0
        this.detail.rooms_plan.forEach(i => roomcount += i.room_count)
        return roomcount
      },
      roomNumbers(){
        let list = []
        for (let i = 0; i < this.roomCount; i++) {
          list.push({
            room_number: null,
            room_type_id: this.detail.room_type_id,
          })
        }
        return list
      },
      cleanRoomForPick(){
        return this.roomlist.filter(i => i.config.enabled_pick && i.room_type_id === this.detail.room_type_id && i.room_status === 0)
      },
      dirtyRoomForPick(){
        return this.roomlist.filter(i => i.config.enabled_pick && i.room_type_id === this.detail.room_type_id && i.room_status === 1)
      }
    },
    methods: {
      ...mapActions([
        'getroomlist',
        'getsourcelist',
        'getroomtypelist'
      ]),
      getRoomList(){
        this.getroomlist({
          onsuccess: body => this.roomlist = body.data
        })
      },
      getSourceList(){
        this.getsourcelist({onsuccess: body => this.sourcelist = body.data})
      },
      getSourceName(source_id){
        return source_id ? this.sourcelist.filter(i => i.source_id === source_id)[0].source_name : '未选择'
      },
      getRoomTypeList(){
        this.getroomtypelist({onsuccess: body => this.roomtypelist = body.data})
      },
      getRoomTypeName(room_type_id){
        return room_type_id ? this.roomtypelist.filter(i => i.room_type_id === room_type_id)[0].room_type_name : '未选择'
      },
      toggleSource(source_name){
        source_name !== 'cancel' ? this.detail.source_id = this.sourcelist.filter(i => i.source_name === source_name)[0].source_id : null
      },
      toggleRoomType(room_type_name){
        room_type_name !== 'cancel' ? this.detail.room_type_id = this.roomtypelist.filter(i => i.room_type_name === room_type_name)[0].room_type_id : null
      },
      toggleRoomCount(room_count){
        room_count !== 'cancel' ? this.detail.rooms_plan[0].room_count = room_count : null
      },

    },
    mounted(){
      this.getSourceList()
      this.getRoomTypeList()
      this.getRoomList()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
