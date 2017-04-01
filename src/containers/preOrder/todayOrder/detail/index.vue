<template>
  <div v-if="isNotEmpty(todaydetail)" class="predetail-container">
    <div class="warning-title" v-show="todaydetail.warning">
      <div class="title-body">❗️{{todaydetail.warning}}</div>
      <div class="title-footer"><input type="button" value="已手工入账"></div>
    </div>

    <!-- 预订信息 -->
    <div class="cell-title">预订信息</div>
    <div class="predetail-cell">
      <div class="cell-body">订单号</div>
      <div class="cell-footer">{{todaydetail.order_id}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">预订人</div>
      <div class="cell-footer">{{todaydetail.owner}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">手机号</div>
      <div class="cell-footer">{{todaydetail.owner_tel}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">入离时间</div>
      <div class="cell-footer">
        {{todaydetail.in_time.year}}/{{todaydetail.in_time.month}}/{{todaydetail.in_time.day}}-{{todaydetail.out_time.year}}/{{todaydetail.out_time.month}}/{{todaydetail.out_time.day}}
      </div>
    </div>

    <!-- PMS支付信息 -->
    <div class="cell-title">PMS支付信息</div>
    <div class="predetail-cell">
      <div class="cell-body">应付房费</div>
      <div class="cell-footer">¥{{todaydetail.payinfo.total_roomfee}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">已付</div>
      <div class="cell-footer">¥{{todaydetail.payinfo.pms_pay}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">备注</div>
      <div class="cell-footer">{{(todaydetail.remark || '无')}}</div>
    </div>
    <div class="cell-title">支付信息</div>
    <div class="predetail-cell">
      <div class="cell-body">已付</div>
      <div class="cell-footer">{{todaydetail.payinfo.user_pay}}</div>
    </div>

    <!-- 选房信息 -->
    <div class="cell-title">选房信息</div>
    <div class="predetail-cell select-roomCell" v-for="item in todaydetail.suborders">
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
      <div class="cell-footer">{{todaydetail.invoice.title}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">开票类型</div>
      <div class="cell-footer">{{todaydetail.invoice.type}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">领取方式</div>
      <div class="cell-footer">{{todaydetail.invoice.media}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">开票内容</div>
      <div class="cell-footer">{{todaydetail.invoice.category}}</div>
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
        <div class="log-cell" v-for="item in todaydetail.logs">
          <div class="log-header">{{item.date}}</div>
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
  import _dataUtil from '../../../../store/actions/dataUtil';

  module.exports = {
    name: 'predetails',
    data(){
      return {
        popupShow: false,
        inTime: '',
        outTime: ''
      }
    },
    computed: {
      ...mapState([
        'route',
        'todaydetail',
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'todayorderdetail',
      ]),
      isNotEmpty(obj){
        for (var key in obj) {
          return true;
        }
        return false;
      },
      _formatData(){
        let enterTime = new Date(parseInt(this.inTime));
        let leaveTime = new Date(parseInt(this.outTime));
        let year = enterTime.getFullYear();
        let month = enterTime.getMonth() + 1;

        console.log("============enterTime=============");
        console.log(enterTime);
        console.log(year + "年" + month + "月");
      }
    },
    created(){
      this.todayorderdetail();
    },
    updated(){
//      this._formatData();
    },
    mounted() {

//      console.log('mounted predetail  111111');
//      this.inTime = null ? this.inTime = this.todaydetail.in_time : null;
//      this.outTime = null ? '空' : '非空';
//      this.outTime = this.todaydetail.out_time;
//      console.log(this.inTime);
//      console.log(this.outTime);
//      console.log('======222');
      this.inTime = this.todaydetail.in_time;
      this.outTime = this.todaydetail.out_time;
    }
  }
</script>

