<template>
  <article>
    <div class="today-detail" v-if="detail">
      <Group title="主单信息">
        <Cell title="订单号" :value="detail.order_pmsid"></Cell>
        <Cell title="预订人" :value="detail.owner"></Cell>
        <Cell title="手机号" :value="detail.owner_tel"></Cell>
        <Cell title="入住时间" :value="detail.in_time | datetimeparse"></Cell>
        <Cell title="离店时间" :value="detail.out_time | datetimeparse"></Cell>
        <Cell title="房型" v-for="(item,index) in detail.rooms_plan" :key="'rooms_plan'+index"
              :value="item.room_type + '*' + item.room_count"></Cell>
      </Group>

      <Group :title="index == 0? '房间信息' : null"
             v-if="detail.suborders"
             v-for="(item,index) in detail.suborders"
             :key="'guests'+index">
        <Cell :title="`<div style='color: #4a4a4a'>${item.room_type_name +' '+item.room_number}</div>`"></Cell>
        <Cell :title="getGuestItem(item)"/>
      </Group>
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
        'getorderdetail'
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
      getGuestItem(item){
        if (item.guests) {
          let dom = ``;
          item.guests.forEach(i => dom += `<div style="display: flex;color: #4a4a4a;justify-content: space-between;line-height: 2;"><span>${i.name} ${i.idcard}</span></div>`)
          return dom
        }
      },
    },
    watch: {
      routeId() {
        this.getDetail();
      }
    },
    mounted() {
      this.getDetail();
    }
  }
</script>
