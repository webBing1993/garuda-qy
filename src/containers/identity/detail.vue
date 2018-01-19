<template>
  <article>
    <Group>
      <Cell title="预订人" :value="detail.order.owner"></Cell>
      <Cell title="手机号" :value="detail.order.phone_number"></Cell>
      <Cell title="入离日期" :value="datetimeparse(detail.order.in_time) +'-' +datetimeparse(detail.order.out_time)"></Cell>
      <Cell title="房间" v-if="detail.room" :value="detail.room.room_type_name + detail.room.room_number"></Cell>
      <Cell title="验证时间" :value="datetimeparse(detail.guest.identity_check_time)"></Cell>
    </Group>

    <!--<div class="guestcard" v-for="item in detail.guests">-->
    <div class="guestcard">
      <div class="hd">
        <ul>
          <li><span><abbr>姓名</abbr>{{detail.guest.name}}</span></li>
          <li><span><abbr>性别</abbr>{{detail.guest.sex}}</span><span><abbr>民族</abbr>{{detail.guest.ethnicity}}</span>
          </li>
          <li><span><abbr>生日</abbr>{{detail.guest.date_of_birth}}</span></li>
          <li><span><abbr>住址</abbr>{{detail.guest.address}}</span></li>
          <li><span><abbr>公民身份证号号码</abbr>{{detail.guest.idcard ? idnumber(detail.guest.idcard) : "空"}}</span></li>
        </ul>
        <img :src="detail.guest.photo" alt="身份证照片">
      </div>
      <div class="bd">
        <p><span>现场图片</span><span v-if="hotelConfig.show_similarity==='true'">相似度： <abbr>{{detail.guest.similarity}}%</abbr></span></p>
        <img :src="detail.guest.live_photo" alt="现场照片">
      </div>
    </div>

    <!--lvye-->
    <div v-if="policeIdentitySuccess">
      <p class="upload-time">{{lvyeStatusName}}</p>
      <!--<div class="button-group">-->
      <!--<x-button v-if="!btnPresent.status || btnPresent.hasNext"-->
      <!--:value="btnPresent.status ? '下一个' : '上传旅业系统'"-->
      <!--:plain="!!btnPresent.status"-->
      <!--@onClick="btnPresent.callback"></x-button>-->
      <!--</div>-->
      <div class="button-group">
        <x-button v-if="!lvyeUploadSuccess"
                  value="上传旅业系统"

                  @onClick="btnPresent.callback"></x-button>
      </div>
    </div>
  </article>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  module.exports = {
    data(){
      return {
        detail: {},
        hotelConfig:{}
      }
    },
    computed: {
      ...mapState([
        'route'
      ]),
      identityId(){
        console.log(this.detail.guest)
        return this.detail.guest.identity_id
      },
      identityGuestId(){
        return this.route.params.id

      },
      identityResult(){
        return this.detail.status && this.detail.status !== 'PENDING'
          ? this.detail.status === 'AGREED' || this.detail.status === 'AUTO_AGREED'
            ? '已通过'
            : '已拒绝'
          : ''
      },
      policeIdentitySuccess(){
        return this.detail.guest.identity_status === 'AUTO_AGREED' || this.detail.guest.identity_status === 'AGREED'
      },
      lvyeUploadSuccess(){
//        return this.detail.lvye_report_status !== 'FAILED'
        return this.detail.lvye_report.lvye_report_in_status == 'FORBID' || this.detail.lvye_report.lvye_report_in_status === 'SUCCESS'
      },
      btnPresent(){
        return {
          status: this.lvyeUploadSuccess,
          hasNext: !!this.detail.next_identity_id,
          callback: () => this.lvyeUploadSuccess ? this.replaceto('/identity/detail/' + this.detail.next_identity_id) : this.setuploadstatus()
        }
      },
      lvyeStatusName(){
        if (this.detail.lvye_report.lvye_report_in_status === 'SUBMITTED' || this.detail.lvye_report.lvye_report_in_status === 'PENDING') {
          return '正在上传旅业系统'
        } else if (this.detail.lvye_report.lvye_report_in_status === 'FAILED') {
          return '上传旅业系统失败'
        } else if (this.detail.lvye_report.lvye_report_in_status ==='NONE') {
          return '未上传旅业系统'
        } else if (this.detail.lvye_report.lvye_report_in_status === 'SUCCESS') {
          return '已成功上传旅业系统。' + this.datetimeparse(this.detail.lvye_report.lvye_report_out_time, 'YYMMDD hhmm')
        }
//        return this.detail.lvye_report_status === 'SUBMITTED' || this.detail.lvye_report_status === 'PENDING'
//          ? '正在上传旅业系统'
//          : this.detail.lvye_report_status === 'FAILED' || !this.detail.lvye_report_status
//            ? '上传旅业系统失败，请重试'
//            : '已成功上传旅业系统。' + this.datetimeparse(this.detail.lvye_report_time, 'YYMMDD hhmm')
      }
    },
    methods: {
      ...mapActions([
        'replaceto',
        'getIdentity',
//        'setIdentityStatus',
        'setUploadStatus'
      ]),
      getDetail(){
        this.getIdentity({
          identityGuestId: this.identityGuestId,
          onsuccess: body => {
            this.detail = body.data.content;
            this.hotelConfig=body.data.config;
          }
        })
      },
//      setidentitystatus(val){
//        this.setIdentityStatus({
//          identity_id: this.identityId,
//          suborder_id: this.detail.suborder_id,
//          status: val ? 'AGREED' : 'REFUSED',
//          onsuccess: body => this.detail.status = val ? 'AGREED' : 'REFUSED'
//        })
//      },
      setuploadstatus(){
        this.setUploadStatus({
          identity_id: this.identityId,
          onsuccess: body => this.getDetail()
        })
      },
    },
    watch: {
      identityId(val){
        val ? this.getDetail() : null
      }
    },
    activated(){
      this.detail = {}
      this.getDetail()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>


<!--<template>-->
<!--<article>-->
<!--<scroller v-if="detail.identity_id" lock-x :depend="detail">-->
<!--<div class="scroller-wrap">-->
<!--<group title="预订信息">-->
<!--<cell title="预订人" :value="detail.owner"/>-->
<!--<cell title="手机号" :value="detail.phone_number"/>-->
<!--<cell title="入住时间" :value="datetimeparse(detail.in_time)"/>-->
<!--<cell title="离店时间" :value="datetimeparse(detail.out_time)"/>-->
<!--<cell title="房型" :value="detail.room.room_type_name"/>-->
<!--</group>-->
<!--<group title="验证信息">-->
<!--<cell :title="detail.room.room_number" :value="datetimeparse(detail.created_time,'','验证时间：')"/>-->
<!--<div class="guestinfo" v-for="item in detail.guests">-->
<!--<p><span>姓名</span>{{item.name}}</p>-->
<!--<p><span>民族</span>{{item.ethnicity}}</p>-->
<!--<p><span>身份证</span>{{item.idcard}}</p>-->
<!--<p><span>地址</span>{{item.address}}</p>-->
<!--<div class="photos">-->
<!--<img :src="item.photo" alt="身份证照片">-->
<!--<img :src="item.live_photo" alt="当前照片">-->
<!--</div>-->
<!--<p class="similarity">相似度 {{item.similarity}}%</p>-->
<!--</div>-->
<!--</group>-->
<!--</div>-->
<!--</scroller>-->
<!--</article>-->
<!--</template>-->

<!--<script type="text/ecmascript-6">-->
<!--import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';-->

<!--module.exports = {-->
<!--data(){-->
<!--return {-->
<!--detail: {}-->
<!--}-->
<!--},-->
<!--computed: {-->
<!--...mapState([-->
<!--'route'-->
<!--]),-->
<!--identityId(){-->
<!--return this.route.params.id-->
<!--}-->
<!--},-->
<!--methods: {-->
<!--...mapActions([-->
<!--'getIdentity'-->
<!--]),-->
<!--getDetail(){-->
<!--this.getIdentity({-->
<!--identity_id: this.identityId,-->
<!--onsuccess: body => this.detail = body.data-->
<!--})-->
<!--}-->
<!--},-->
<!--watch: {-->
<!--identityId(val){-->
<!--val ? this.getDetail() : null-->
<!--}-->
<!--},-->
<!--activated(){-->
<!--this.getDetail()-->
<!--}-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="less">-->
<!--@import "index.less";-->
<!--</style>-->
