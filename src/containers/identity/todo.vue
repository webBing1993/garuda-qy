<template>
  <article>
    <Group>
      <Cell title="预订人" :value="detail.order.owner"></Cell>
      <Cell title="手机号" :value="detail.order.phone_number"></Cell>
      <Cell title="入住日期" :value="datetimeparse(detail.order.in_time) +'-' +datetimeparse(detail.order.out_time)"></Cell>
      <Cell title="房间" v-if="detail.room" :value="detail.room.room_type_name + detail.room.room_number"></Cell>
    </Group>
    <!--<div class="guestcard" v-for="item in detail.guests">-->
    <div class="guestcard">
      <div class="hd">
        <ul>
          <li><span><abbr>姓名</abbr>{{detail.guest.name}}</span></li>
          <li><span><abbr>性别</abbr>{{detail.guest.sex}}</span><span><abbr>民族</abbr>{{detail.guest.ethnicity}}</span></li>
          <li><span><abbr>生日</abbr>{{detail.guest.date_of_birth}}</span></li>
          <li><span><abbr>住址</abbr>{{detail.guest.address}}</span></li>
          <li><span><abbr>身份证号</abbr>{{detail.guest.idcard?idnumber(detail.guest.idcard):"空"}}</span></li>
        </ul>
        <img :src="detail.guest.photo" alt="身份证照片">
      </div>
      <div class="bd">
        <p><span>现场图片</span><span v-if="hotelConfig.identity_check_channel==='YOUTU'&& hotelConfig.show_similarity=== 'true'">相似度： <abbr>{{detail.guest.similarity}}%</abbr></span></p>
        <img :src="detail.guest.live_photo" alt="现场照片">
      </div>
    </div>

    <p class="tips" v-if="identityResult">{{identityResult}}</p>

    <div v-if="detail.guest.identity_status === 'PENDING'" class="button-group">
      <XButton value="验证通过" primary @onClick="setidentitystatus(1)"></XButton>
      <XButton value="拒绝" warn @onClick="setidentitystatus(0)"></XButton>
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
        console.log(this.detail.guest.identity_id)
        console.log(this.detail.guest.identity_id)
        return this.detail.guest.identity_id
      },
      suborderId(){
          console.log(this.detail.guest.suborder_id)
          return this.detail.guest.suborder_id
      },
      identityGuestId(){
          console.log(this.route.params.id)
        return this.route.params.id
      },
      identityResult(){
        return this.detail.status && this.detail.status !== 'PENDING'
          ? this.detail.status === 'AGREED' || this.detail.status === 'AUTO_AGREED'
            ? '已通过'
            : '已拒绝'
          : ''
      }
    },
    methods: {
      ...mapActions([
        'getIdentity',
        'setIdentityStatus'
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
      setidentitystatus(val){
        this.setIdentityStatus({
          identity_id: this.identityId,
          suborder_id: this.suborderId,
          status: val ? 'AGREED' : 'REFUSED',
          onsuccess: body => {
            this.getDetail();
            this.detail.status = val ? 'AGREED' : 'REFUSED'
          }
        })
      }
    },
    watch: {
      identityGuestId(val){
        val ? this.getDetail() : null
      }
    },
    activated(){
      this.getDetail()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
