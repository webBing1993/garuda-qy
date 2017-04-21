<template>
  <article>
    <scroller lock-x :depend="detail">
      <div class="scroller-wrap">
        <Group>
          <Cell title="预订人" :value="detail.owner"></Cell>
          <Cell title="手机号" :value="detail.phone_number"></Cell>
          <Cell title="入住日期" :value="detail.in_time | datetimeparse"></Cell>
          <Cell title="离店日期" :value="detail.out_time | datetimeparse"></Cell>
          <Cell title="房间" v-if="detail.room" :value="detail.room.room_type_name + detail.room.room_number"></Cell>
        </Group>

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
      </div>
    </scroller>
  </article>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  module.exports = {
    data(){
      return {
        detail: {}
      }
    },
    computed: {
      ...mapState([
        'route'
      ]),
      identityId(){
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
          identity_id: this.identityId,
          onsuccess: body => this.detail = body.data
        })
      },
      setidentitystatus(val){
        this.setIdentityStatus({
          identity_id: this.identityId,
          suborder_id: this.detail.suborder_id,
          status: val ? 'AGREED' : 'REFUSED',
          onsuccess: body => this.detail.status = val ? 'AGREED' : 'REFUSED'
        })
      }
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
<!--<cell title="入住时间" :value="detail.in_time | datetimeparse"/>-->
<!--<cell title="离店时间" :value="detail.out_time | datetimeparse"/>-->
<!--<cell title="房型" :value="detail.room.room_type_name"/>-->
<!--</group>-->
<!--<group title="验证信息">-->
<!--<cell :title="detail.room.room_number" :value="detail.created_time | datetimeparse('','验证时间：')"/>-->
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
