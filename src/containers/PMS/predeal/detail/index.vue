<template>
  <div class="predetail-container">
    <div class="predetail-title">
      <div class="title-body">❗️{{predetaildata.warning}}</div>
      <div class="title-footer"><input type="button" value="已手工入账"></div>
    </div>

    <!-- 预订信息 -->
    <div class="cell-title">预订信息</div>
    <div class="predetail-cell">
      <div class="cell-body">订单号</div>
      <div class="cell-footer">{{predetaildata.order_id}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">预订人</div>
      <div class="cell-footer">{{predetaildata.owner}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">手机号</div>
      <div class="cell-footer">{{predetaildata.owner_tel}}</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">入离时间</div>
      <div class="cell-footer">{{predetaildata.in_time}}-{{predetaildata.out_time}}</div>
    </div>

    <!-- PMS支付信息 -->
    <div class="cell-title">PMS支付信息</div>
    <div class="predetail-cell">
      <div class="cell-body">应付房费</div>
      <div class="cell-footer">¥400（¥200x2)</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">已付</div>
      <div class="cell-footer">¥200</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">备注</div>
      <div class="cell-footer">无</div>
    </div>
    <div class="cell-title">支付信息</div>
    <div class="predetail-cell">
      <div class="cell-body">已付</div>
      <div class="cell-footer">¥400</div>
    </div>
    <!-- 选房信息 -->
    <div class="cell-title">选房信息</div>
    <div class="predetail-cell marginBot">
      <div class="cell-box" v-for="item in predetail.suborders">
        <div class="box-title">{{item.room_type_name}}{{item.room_number}}</div>
        <div v-for="item in predetail.suborders.guests">
          <div class="box-text">{{item.name}} {{item.idcard}}</div>
          <div class="box-text">{{item.name}} {{item.idcard}}</div>
        </div>
      </div>
    </div>



    <!--<div class="predetail-cell">-->
      <!--<div class="cell-box">-->
        <!--<div class="box-title">大床房204</div>-->
        <!--<div class="box-text">张三 13163556666</div>-->
        <!--<div class="box-text">李四 13163556666</div>-->
      <!--</div>-->
    <!--</div>-->

    <!-- 发票信息 -->
    <div class="cell-title">发票信息</div>
    <div class="predetail-cell">
      <div class="cell-body">发票抬头</div>
      <div class="cell-footer">上海复创****公司</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">开票类型</div>
      <div class="cell-footer">公司·增值税专用发票</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">领取方式</div>
      <div class="cell-footer">电子发票</div>
    </div>
    <div class="predetail-cell">
      <div class="cell-body">开票内容</div>
      <div class="cell-footer">住宿费</div>
    </div>
    <div class="predetail-btn" @click="_logbtn">
      <div class="log-btn">操作日志</div>
    </div>

    <!-- log 弹窗 -->
    <div class="log-container" v-show="logShowHind">
      <div class="log-mask" @click="_logHide"></div>
      <div class="log-box">
        <span class="log-title">操作日志</span>
        <div class="log-cell">
          <div class="log-header">日期</div>
          <div class="log-body textAlign">内容头</div>
          <div class="log-footer">操作人</div>
        </div>
        <div class="log-cell" v-for="item in predetaildata.logs">
          <div class="log-header">{{item.date}}</div>
          <div class="log-body">{{item.action}}</div>
          <div class="log-footer">{{item.operator}}</div>
        </div>
        <span class="logBtn" @click="_logHide">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
  import './index.less';

  module.exports = {
    name: 'predetails',
    data(){
      return {
        logShowHind: false
      }
    },
    computed: {
      ...mapState([
        'route',
        'predetaildata',
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'predetail'
      ]),
      _logbtn(){
        this.logShowHind = true;
      },
      _logHide () {
        console.log('on hide');
        this.logShowHind = false;
      }
    },
    mounted() {
      console.log('2222222222');
      this.predetail();
    }
  }
</script>

