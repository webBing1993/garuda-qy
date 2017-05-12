<template>
  <article>
    <div class="today-detail" v-if="detail">
      <div class="recording" v-if="detail.status && !detail.status.is_recording_success">
        <div class="title-body">入账失败</div>
        <a @click="confirmPmsResult">已手工入账</a>
      </div>
      <Group title="主单信息">
        <Cell title="订单号" :value="detail.order_pmsid"></Cell>
        <Cell title="预订人" :value="detail.owner"></Cell>
        <Cell title="手机号" :value="detail.owner_tel"></Cell>
        <Cell title="入离时间" :value="datetimeparse(detail.in_time) + ' - '+ datetimeparse(detail.out_time)"></Cell>
        <Cell title="房型" v-for="(item,index) in detail.rooms_plan" :key="'rooms_plan'+index"
              :value="item.room_type + 'x' + item.room_count"></Cell>
      </Group>
      <div v-for="(item,index) in detail.suborders"
           :key="'guests'+index"
           v-if="detail.suborders && item.status.is_checkin">
        <Group :title="index === 0 ? '房间信息' : null">
          <Cell
            :title="`<div style='color: #4a4a4a'>${(item.room_number || '未选房')+ ' ' + item.room_type_name}</div>`"></Cell>
          <Cell :title="getGuestItem(item)"/>
        </Group>
        <p style="color: #DF4A4A;margin: 15px;font-size: 13px"
           v-if="item.lvye_report_status !== 'SUCCESS'">
          当前入住房间信息上网上传旅业系统，您可以前往‘公安验证-当日验证’已通过列表进行旅业系统上传；或点击该链接进行操作。
          <a v-if="item.identity_id" style="color: #25B8F1; border-bottom: 1px solid #25B8F1"
             @click="goto('/identity/' + item.identity_id)">上传旅业系统</a></p>
      </div>

    </div>
  </article>
</template>
<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  module.exports = {
    name: 'liveindetail',
    data() {
      return {
        detail: {},
      }
    },
    computed: {
      routeId() {
        return this.$route.params.id
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'getorderdetail',
        'conformPmsSync'
      ]),
      getDetail() {
        this.getorderdetail({
          order_id: this.routeId,
          roomfee: 0,
          suborder: 1,
          invoice: 0,
          log: 0,
          onsuccess: body => {
            this.detail = body.data
          }
        })
      },
      confirmPmsResult() {
        this.conformPmsSync({
          order_id: this.routeId,
          action: 'SETACCOUNT',
          onsuccess: body => this.detail.status.is_recording_success = true
        })
      },
    },
    watch: {
      routeId(val) {
        val ? this.getDetail() : null;
      }
    },
    mounted() {
      this.getDetail();
    }
  }
</script>
<style scoped lang="less">
  @import "index.less";
</style>
