<template>
  <div v-if="isNotEmpty(orderdetail)" class="predetail-container">
    <div class="warning-title" v-show="!is_recording_success">
      <div class="title-body" v-if="!is_recording_success">️入账失败</div>
      <div class="title-footer" @click="confirmPmsResult"><input type="button" value="已手工入账"></div>
    </div>

    <!-- 预订信息 -->
    <div class="cell-title">预订信息</div>
    <div class="predetail-cell">
      <div class="cell-body">订单号</div>
      <div class="cell-footer">{{orderdetail.order_pmsid}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">预订人</div>
      <div class="cell-footer">{{orderdetail.owner}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">手机号</div>
      <div class="cell-footer">{{orderdetail.owner_tel}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">入离时间</div>
      <div class="cell-footer">
        {{orderdetail.in_time |datetimeparse}}-{{orderdetail.out_time |datetimeparse}}
      </div>
    </div>

    <!-- PMS支付信息 -->
    <div class="cell-title">PMS支付信息</div>
    <div class="predetail-cell">
      <div class="cell-body">应付房费</div>
      <div class="cell-footer">¥{{orderdetail.payinfo.total_roomfee}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">已付</div>
      <div class="cell-footer">¥{{orderdetail.payinfo.pms_pay}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">备注</div>
      <div class="cell-footer">{{(orderdetail.remark || '无')}}</div>
    </div>
    <div class="cell-title">支付信息</div>
    <div class="predetail-cell">
      <div class="cell-body">已付</div>
      <div class="cell-footer">￥{{orderdetail.payinfo.user_pay}}</div>
    </div>

    <!-- 选房信息 -->
    <div class="cell-title">选房信息</div>
    <div class="predetail-cell select-roomCell" v-for="item in orderdetail.suborders">
      <div class="cell-box">
        <div class="box-title">{{item.room_type_name}}{{item.room_number}}</div>
        <div v-for="itm in item.guests">
          <div class="box-text">{{itm.name}} {{itm.idcard}}</div>
        </div>
      </div>
    </div>

    <!-- 发票信息 -->
    <div class="cell-title">发票信息</div>
    <div class="predetail-cell">
      <div class="cell-body">发票抬头</div>
      <div class="cell-footer">{{orderdetail.invoice.title}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">开票类型</div>
      <div class="cell-footer">{{orderdetail.invoice.type}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">领取方式</div>
      <div class="cell-footer">{{orderdetail.invoice.media}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">开票内容</div>
      <div class="cell-footer">{{orderdetail.invoice.category}}</div>
    </div>
    <div class="predetail-btn" @click="popupShow = !popupShow">
      <div class="log-btn">操作日志</div>
    </div>

    <!-- log 弹窗 -->
    <popup v-model="popupShow"
           :maskShow="true"
           :top="true"
           :animationTop="true">
      <div class="log-box">
        <span class="log-title">操作日志</span>
        <div class="log-cell">
          <div class="log-header">日期</div>
          <div class="log-body textAlign">内容</div>
          <div class="log-footer">操作人</div>
        </div>
        <div class="log-cell" v-for="item in orderdetail.logs">
          <div class="log-header">{{item.date | datetimeparse('YYYY/MM/DD hh:mm')}}</div>
          <div class="log-body">{{item.action}}</div>
          <div class="log-footer">{{item.operator}}</div>
        </div>
        <span class="logBtn" @click="popupShow = false">确定</span>
      </div>
    </popup>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
  import './index.less';
  module.exports = {
    name: 'predetails',
    data(){
      return {
        orderdetail: {},
        popupShow: false,
        inTime: '',
        outTime: ''
      }
    },
    computed: {
      ...mapState([
        'route',
        'orderdetail',
      ]),
      is_recording_success() {
        return this.orderdetail.status.is_recording_success
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'getorderdetail',
        'conformPmsSync'
      ]),
      isNotEmpty(obj){
        for (var key in obj) {
          return true;
        }
        return false;
      },
      confirmPmsResult() {
        this.conformPmsSync({
          order_id: this.$route.params.id,
          action: 'SETACCOUNT',
          onsuccess: body => this.orderdetail.status.is_recording_success = true
        })
      }
    },
    mounted() {
      this.getorderdetail({
        order_id: this.$route.params.id,
        onsuccess: body => {
          this.orderdetail = body.data
        }
      })
    }
  }
</script>

