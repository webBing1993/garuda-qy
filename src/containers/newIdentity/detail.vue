<template>
  <article>

    <div class="guestcard" v-for="item in detail.guests">
      <div class="hd">
        <ul>
          <li><span><abbr>姓名</abbr>{{item.name}}</span></li>
          <li><span><abbr>性别</abbr>{{item.sex}}</span><span><abbr>民族</abbr>{{item.ethnicity}}</span></li>
          <li><span><abbr>生日</abbr>{{item.date_of_birth}}</span></li>
          <li><span><abbr>住址</abbr>{{item.address}}</span></li>
          <li><span><abbr>身份证号</abbr>{{idnumber(item.idcard)}}</span></li>
        </ul>
        <img :src="item.photo" alt="身份证照片">
      </div>
      <div class="bd">
        <p><span>现场图片</span><span>相似度： <abbr>{{item.similarity}}%</abbr></span></p>
        <img :src="item.live_photo" alt="现场照片">
      </div>
    </div>

    <div class="order-info">
      <div class="info-col"><label>房间号码:</label><input type="number" v-model="roomNumber"></div>
      <div class="info-col"><label>入住几晚:</label><input type="number" v-model="days"></div>
      <div class="info-col"><label>入住时间:</label><span class="select-time">{{datetimeparse(inTimeFilter)}}</span></div>
      <div class="info-col"><label>离店时间:</label><span class="select-time">{{datetimeparse(outTimeFilter)}}</span></div>
      <x-button value="上传旅业系统" @onClick="showDialog = true"></x-button>
    </div>

    <Dialog v-model="showDialog" @onConfirm="setMultiConfirm" confirm cancel>
      <ul class="dialog-info">
        <li class="info-col"><span class="dialog-key">姓名：</span><span class="dialog-value">{{detail.guests ? detail.guests[0].name :''}}</span></li>
        <li class="info-col"><span class="dialog-key">证件号码：</span><span class="dialog-value">{{detail.guests ? idnumber(detail.guests[0].idcard) :''}}</span></li>
        <li class="info-col"><span class="dialog-key">房间：</span><span class="dialog-value">{{roomNumber}}</span></li>
        <li class="info-col"><span class="dialog-key">入住天数：</span><span class="dialog-value">{{days}}</span></li>
        <li class="info-col"><span class="dialog-key">入住日期：</span><span class="dialog-value">{{datetimeparse(inTimeFilter)}}</span></li>
        <li class="info-col"><span class="dialog-key">离店日期：</span><span class="dialog-value">{{datetimeparse(outTimeFilter)}}</span></li>
      </ul>
    </Dialog>

  </article>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  module.exports = {
    data(){
      return {
        detail: {},
        roomNumber:'',
        days: null,
        inTimeFilter: Date.parse(new Date()),
        outTimeFilter:'',
        showDialog: false,
      }
    },
    computed: {
      ...mapState([
        'route'
      ]),
      identityId(){
        return this.route.params.id
      },
    },
    methods: {
      ...mapActions([
        'replaceto',
        'getIdentity',
        'setUploadStatus'
      ]),
      resetFilter() {
        this.days = '';
        this.room_number = '';
        this.inTimeFilter = '';
        this.outTimeFilter = '';
      },
      getDetail(){
        this.getIdentity({
          identity_id: this.identityId,
          onsuccess: body => this.detail = body.data
        })
      },
      setMultiConfirm() {
        this.setUploadStatus({
          identity_id: this.detail.guests ? this.detail.guests[0].idcard.split(' '):'',//转数组
          room_number: this.roomNumber,
          days: this.days,
          in_time: this.inTimeFilter,
          out_time: this.outTimeFilter,
          onsuccess: () => {
            this.resetFilter();
          }
        })
      },
    },
    watch: {
      identityId(val){
        val ? this.getDetail() : null
      },
      days(val){
        this.outTimeFilter = '';
        let nowDate = new Date();
        let tempTime = nowDate.setTime(nowDate.getTime()+24*60*60*1000*val);
        this.outTimeFilter = tempTime
      },
    },
    activated(){
      this.detail = {};
      this.getDetail();
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
