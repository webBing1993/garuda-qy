<template>
  <article>
    <Group>
      <Cell title="预订人" :value="detail.owner"></Cell>
      <Cell title="手机号" :value="detail.phone_number"></Cell>
      <Cell title="入住日期" :value="detail.in_time | datetimeparse"></Cell>
      <Cell title="离店日期" :value="detail.out_time | datetimeparse"></Cell>
      <Cell title="房间" v-if="detail.room" :value="detail.room.room_type_name + detail.room.room_number"></Cell>
    </Group>

    <div class="guestcard">
      <div class="hd">
        <ul>
          <li><span><abbr>姓名</abbr>张三</span></li>
          <li><span><abbr>性别</abbr>男</span><span><abbr>民族</abbr>汉</span></li>
          <li><span><abbr>生日</abbr>男</span></li>
          <li><span><abbr>住址</abbr>男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男</span></li>
          <li><span><abbr>身份证号</abbr>310113199202270035</span></li>
        </ul>
        <img src="" alt="身份证照片">
      </div>
      <div class="bd">
        <p><span>现场图片</span><span>相似度： <abbr>94%</abbr></span></p>
        <img src="" alt="现场照片">
      </div>
    </div>
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
    mounted(){
      this.getDetail()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
