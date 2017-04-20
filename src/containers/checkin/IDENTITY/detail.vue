<template>
  <article>
    <scroller v-if="detail.identity_id" lock-x :depend="detail">
      <div class="scroller-wrap">
        <group title="预定信息">
          <cell title="预订人" :value="detail.owner"/>
          <cell title="手机号" :value="detail.phone_number"/>
          <cell title="入住时间" :value="detail.in_time | datetimeparse"/>
          <cell title="离店时间" :value="detail.out_time | datetimeparse"/>
          <cell title="房型" :value="detail.room.room_type_name"/>
        </group>
        <group title="验证信息">
          <cell :title="detail.room.room_number" :value="detail.created_time | datetimeparse('','验证时间：')"/>
          <div class="guestinfo" v-for="item in detail.guests">
            <p><span>姓名</span>{{item.name}}</p>
            <p><span>民族</span>{{item.ethnicity}}</p>
            <p><span>身份证</span>{{item.idcard}}</p>
            <p><span>地址</span>{{item.address}}</p>
            <div class="photos">
              <img :src="item.photo" alt="身份证照片">
              <img :src="item.live_photo" alt="当前照片">
            </div>
            <p class="similarity">相似度 {{item.similarity}}%</p>
          </div>
        </group>
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
      }
    },
    methods: {
      ...mapActions([
        'getIdentity'
      ]),
      getDetail(){
        this.getIdentity({
          identity_id: this.identityId,
          onsuccess: body => this.detail = body.data
        })
      }
    },
    watch: {
      identityId(val){
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
