<template>
  <article>

    <div class="guestcard">
      <div class="hd">
        <ul>
          <li><span><abbr>姓名</abbr>{{detail.name}}</span></li>
          <li><span><abbr>性别</abbr>{{detail.sex}}</span><span><abbr>民族</abbr>{{detail.ethnicity}}</span></li>
          <li><span><abbr>生日</abbr>{{detail.dateOfBirth}}</span></li>
          <li><span><abbr>住址</abbr>{{detail.address}}</span></li>
          <li><span><abbr>身份证号</abbr>{{detail.idCard ? idnumber(detail.idCard) : ''}}</span></li>
        </ul>
        <img :src="detail.photo" alt="身份证照片">
      </div>
      <div class="bd">
        <p><span>现场图片</span><span>相似度： <abbr>{{detail.similarity}}%</abbr></span></p>
        <img :src="detail.livePhoto" alt="现场照片">
      </div>
    </div>

    <div class="report-info">
      <div class="info-item">
        <label class="item-left">房间号码:</label>
        <input type="number" class="item-right room-number" v-model="roomNumber"
               v-if="detail.reportInStatus !== 'SUCCESS'"/>
        <span class="item-right" v-else>{{roomNumber}}</span>
      </div>
      <div class="info-item">
        <label class="item-left">入住几晚:</label>
        <div class="item-right days-item" v-if="detail.reportInStatus !== 'SUCCESS'">
          <span class="days-reduce" @click="daysReduce">-</span>
          <input type="number" class="days" v-model="days"/>
          <span class="days-add" @click="daysAdd()">+</span>
        </div>
        <span class="item-right" v-else>{{days}}</span>
      </div>
      <div class="info-item">
        <label class="item-left">入住时间:</label>
        <span class="item-right">{{datetimeparse(inTimeFilter)}}</span>
      </div>

      <div class="info-item">
        <label class="item-left">离店时间:</label>
        <span class="item-right">{{datetimeparse(outTimeFilter)}}</span>
      </div>
      <x-button value="上传旅业系统" @onClick="isDialogShow" v-if="detail.reportInStatus !== 'SUCCESS'"
                :disabled="!roomNumber || !days || !inTimeFilter || !outTimeFilter"></x-button>
    </div>

    <Dialog v-model="showDialog" @onConfirm="setMultiConfirm" confirm cancel>
      <ul class="dialog-info">
        <li class="info-col"><span class="dialog-key">姓名：</span><span class="dialog-value">{{detail.name}}</span></li>
        <li class="info-col"><span class="dialog-key">证件号码：</span><span
          class="dialog-value">{{detail.idCard ? idnumber(detail.idCard) : ''}}</span></li>
        <li class="info-col"><span class="dialog-key">房间：</span><span class="dialog-value">{{roomNumber}}</span></li>
        <li class="info-col"><span class="dialog-key">入住天数：</span><span class="dialog-value">{{days}}</span></li>
        <li class="info-col"><span class="dialog-key">入住日期：</span><span
          class="dialog-value">{{datetimeparse(inTimeFilter)}}</span></li>
        <li class="info-col"><span class="dialog-key">离店日期：</span><span
          class="dialog-value">{{datetimeparse(outTimeFilter)}}</span></li>
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
        roomNumber: '',
        days: 1,
        inTimeFilter: Date.parse(new Date()),
        outTimeFilter: '',
        showDialog: false,
        isDaysListShow: false,
        selectList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    },
    computed: {
      ...mapState([
        'route'
      ]),
      identityId(){
        return this.route.params.id
      },
//      outTimeFilter() {
//        let nowDate = new Date();
//        let tempTime = nowDate.setTime(nowDate.getTime() + 24 * 60 * 60 * 1000 * this.days);
//        return tempTime;
//      }
    },
    methods: {
      ...mapActions([
        'replaceto',
        'newIdentityDetail',
        'reportLvYe'
      ]),
      isDialogShow() {
        if (this.roomNumber && this.days && this.inTimeFilter && this.outTimeFilter) {
          this.showDialog = true;
        } else {
          this.showDialog = false;
        }
      },
      daysReduce() {
        this.days !== 1 ? this.days = this.days - 1 : null
      },
      daysAdd() {
        this.days < 10 ? this.days = this.days + 1 : null
      },
      resetFilter() {
        this.days = '';
        this.roomNumber = '';
        this.inTimeFilter = '';
        this.outTimeFilter = '';
      },
      getDetail(){
        this.newIdentityDetail({
          identity_id: this.identityId,
          onsuccess: body => {
            this.detail = body.data;
            body.data.nights && (this.days = body.data.nights);
            body.data.roomNumber && (this.roomNumber = body.data.roomNumber);
            body.data.reportInTime && (this.inTimeFilter = body.data.reportInTime);
          }
        })
      },
      setMultiConfirm() {
        this.reportLvYe({
          lvyeReportRecordIds: this.detail.lvyeReportRecordId.split(' '),//旅业上报记录Id
          roomNumber: this.roomNumber,//房间号
          nights: this.days,//入住晚数
          inTime: this.inTimeFilter,//入住时间
          outTime: this.outTimeFilter,//离店时间
          onsuccess: () => {
            this.resetFilter();
            this.getDetail();
          }
        })
      },
    },
    watch: {
      identityId(val){
        val ? this.getDetail() : null
      },
      days(val) {
        let nowDate = new Date();
        let tempTime = nowDate.setTime(nowDate.getTime() + 24 * 60 * 60 * 1000 * this.days);
        this.outTimeFilter = tempTime;
      }
    },
    activated(){
      this.detail = {};
      this.getDetail();
      this.days === 1 &&(this.outTimeFilter = new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000));
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
