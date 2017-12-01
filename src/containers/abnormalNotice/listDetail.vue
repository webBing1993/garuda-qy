<template>
  <article>
    <div class="list_wrap" v-for="detailItem in abnormalList">
      <p v-if="!abnormalList || abnormalList.length === 0" class="no-data">暂无数据</p>
      <group>
        <cell :title="setTitle(detailItem.notice_type)"></cell>
        <div class="cellBox">
          <div v-if="detailItem.notice_type=='TUIKUAN'">
            <p class="cell2">退款金额<span>¥ {{detailItem.refund_fee}}元</span></p>
            <ul>
              <li><span><abbr>订单号：</abbr>{{detailItem.order_id}}</span></li>
              <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers|showRoomNum}}</span></li>
              <li><span><abbr>退款时间：</abbr>{{datetimeparse(detailItem.refund_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
            <ul>
              <li><span><abbr>支付单号：</abbr>{{detailItem.out_trade_no}}</span></li>
              <li><span><abbr>支付方式：</abbr>{{detailItem.pay_way}}</span></li>
              <li><span><abbr>支付金额：</abbr>{{detailItem.pay_fee}}元</span></li>
              <li><span><abbr>支付时间：</abbr>{{datetimeparse(detailItem.pay_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
          </div>
          <div v-if="detailItem.notice_type=='TUIKUANRUZHANG'">
            <p class="cell2">支付金额<span>¥ {{detailItem.pay_fee}}元</span></p>
            <ul>
              <li><span><abbr>订单号：</abbr>{{detailItem.order_id}}</span></li>
              <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers|showRoomNum}}</span></li>
              <li><span><abbr>退款状态：</abbr>{{detailItem.refund_status}}</span></li>
              <li><span><abbr>PMS退款入住状态：</abbr>{{detailItem.pms_refund_status}}</span></li>
              <li><span><abbr>退款时间：</abbr>{{datetimeparse(detailItem.refund_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
            <ul>
              <li><span><abbr>交易单号：</abbr>{{detailItem.out_trade_no}}</span></li>
              <li><span><abbr>支付方式：</abbr>{{detailItem.pay_way}}</span></li>
              <li><span><abbr>支付金额：</abbr>{{detailItem.pay_fee}}元</span></li>
              <li><span><abbr>支付时间：</abbr>{{datetimeparse(detailItem.pay_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
          </div>
          <div v-if="detailItem.notice_type=='ZHIFURUZHANG'">
            <ul>
              <li><span><abbr>订单号：</abbr>{{detailItem.order_id}}</span></li>
              <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers|showRoomNum}}</span></li>
              <li><span><abbr>交易单号：</abbr>{{detailItem.out_trade_no}}</span></li>
              <li><span><abbr>支付方式：</abbr>{{detailItem.pay_way}}</span></li>
              <li><span><abbr>支付金额：</abbr>{{detailItem.pay_fee}}元</span></li>
              <li><span><abbr>支付时间：</abbr>{{datetimeparse(detailItem.pay_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
          </div>
          <div v-if="detailItem.notice_type=='RENLIAN'">
            <ul>
              <li><span><abbr>旅客姓名：</abbr>{{detailItem.name}}</span></li>
              <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers|showRoomNum}}</span></li>
              <li><span><abbr>验证时间：</abbr>{{datetimeparse(detailItem.facein_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
          </div>
          <div v-if="detailItem.notice_type=='RULVYE'||detailItem.notice_type=='LILVYE'">
            <ul>
              <li v-for="i in detailItem.lvye_data"><span><abbr>{{i.room}} 房间：</abbr><abbr>{{i.names|showRoomNum}}</abbr></span></li>
              <li><span><abbr>时间：</abbr>{{datetimeparse(detailItem.lvye_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
          </div>
          <div v-if="detailItem.notice_type=='FAKA'">
            <ul>
              <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers|showRoomNum}}</span></li>
              <li><span><abbr>姓名：</abbr>{{detailItem.facein_name}}</span></li>
              <li><span><abbr>失败时间：</abbr>{{datetimeparse(detailItem.faka_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
          </div>
          <div v-if="detailItem.notice_type=='TUIFANG'">
            <ul  >
              <li><span><abbr>订单号：</abbr>{{detailItem.order_id}}</span></li>
              <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers|showRoomNum}}</span></li>
            </ul>
            <ul  >
              <li><span><abbr>支付金额：</abbr>{{detailItem.pay_fee}}</span></li>
              <li><span><abbr>消费金额：</abbr>{{detailItem.consume}}元</span></li>
              <li><span><abbr>入住时间：</abbr>{{datetimeparse(detailItem.in_time,'YYYYMMDD hhmm')}}</span></li>
              <li><span><abbr>退房申请时间：</abbr>{{datetimeparse(detailItem.out_app_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
          </div>
          <div v-if="detailItem.notice_type=='HUISHOU'||detailItem.notice_type=='QUEKA'||detailItem.notice_type=='WUKA'">
            <img v-if="detailItem.notice_type=='回收卡槽已满'||detailItem.notice_type=='设备缺卡'" class= deviceImg src="../../../static/icon/device2.png" alt="">
            <img v-if="detailItem.notice_type=='设备无卡'" class= deviceImg src="../../../static/icon/device1.png" alt="">
          </div>
          <p class="abnormalReason">{{detailItem.exception_errcode}}</p>
          <h5 style="color:#FF0A03;padding-top: 1rem" v-if="detailItem.notice_type=='TUIKUANRUZHANG'">退款码 : {{detailItem.refund_code}} ( {{detailItem.refund_name}} )</h5>
          <h5 style="color:#FF0A03;padding-top: 1rem" v-if="detailItem.notice_type=='ZHIFURUZHANG'">支付码 : {{detailItem.pay_code}} ( {{detailItem.pay_name}} )</h5>
          <div style="height:4rem">
            <div class="button-group" v-if ='detailItem.notice_type!="人脸验证异常"'>
              <x-button value="我知道了" @onClick="confirmHandel(detailItem)" v-if="!detailItem.confirm_flag"></x-button>
            </div>
            <div class="button-group" v-if ='detailItem.notice_type=="人脸验证异常"'>
              <x-button value="去人工核验" @onClick="confirmHandel(detailItem)" v-if="!detailItem.confirm_flag"></x-button>
            </div>
            <cell :title="'确认时间:'+'  '+datetimeparse(detailItem.confirm_time,'YYYYMMDD hhmm')" v-if="detailItem.confirm_flag"></cell>
          </div>
        </div>
      </group>
    </div>
    <h4 class="abnormalRecord" @click="showRecords" v-if="isShowRecord"><span>查看本周异常历史记录</span></h4>
  </article>

</template>
<script>

  import {Group, Cell} from 'vux'
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  const enumWarnType={
    refundWarn:`退款异常`,
    refundEnCountWarn:'退款入账异常',
    payEnCountWarn:'支付入账异常',
    faceCheckWarn:'人脸验证异常',
    checkInlvyeWarn:'入住旅业上传异常',
    checkOutlvyeWarn:'退房旅业上传异常',
    cardOutWarn:'发卡异常',
    checkOutWarn:'退房异常',
    cardFullWarn:'回收卡槽已满',
    cardUnenoughWarn:'设备缺卡',
    noCardWarn:'设备无卡'
  }

  export default{
    components: {
      Group,
      Cell
    },
    name: "abnormalNotice",
    data(){
      return {
        abnormalList:[],
        isShowRecord:false
      }
    },
    filters:{
      showRoomNum:function (val) {
        if(val) {
          return val.join(',')
        }
      }
    },
    computed:{
      ...mapState([
        'hotel'
      ])
    },
    methods:{
      ...mapActions([
        'goto',
        'replaceto',
        'getAbnormalList',
        'exceptionsHandel',
      ]),
      setTitle(title){
        switch (title)
        {
          case "TUIKUAN":
            return enumWarnType.refundWarn;
            break;
          case "ZHIFURUZHANG":
            return enumWarnType.payEnCountWarn;
            break;
          case "TUIKUANRUZHANG":
            return enumWarnType.refundEnCountWarn;
            break;
          case "RENLIAN":
            return enumWarnType.faceCheckWarn;
            break;
          case "RULVYE":
            return enumWarnType.checkInlvyeWarn;
            break;
          case "LILVYE":
            return enumWarnType.checkOutlvyeWarn
            break;
          case "FAKA":
            return enumWarnType.cardOutWarn;
            break;
          case "TUIFANG":
            return enumWarnType.checkOutWarn;
            break;
          case "HUISHOU":
            return enumWarnType.cardFullWarn;
            break;
          case "WUKA":
            return enumWarnType.noCardWarn;
            break;
          case "QUEKA":
            break;
            return enumWarnType.cardUnenoughWarn;
        }
      },
      //异常列表数据
      getList(isHistory)
      {
        this.getAbnormalList({
          is_history:isHistory,
          onsuccess:body => {
            this.abnormalList = body.data.list;
            if(body.data.record){
              this.isShowRecord=body.data.record;
            };
            if(isHistory){
              this.isShowRecord=false;
            }
          }
        })
      },
      //确认'我知道了'处理
      confirmHandel(item)
      {
        this.exceptionsHandel({
          exception_id:item.exception_id,
          onsuccess:() => {
            let _time=new Date();
            item.confirmTime=_time.getTime();
            if(item.notice_type=='RENLIAN'){
                this.goto(`/identity/todo/${item.identity_guest_id}`)
            }
            item.confirm_flag=!item.confirm_flag;
            if(!this.isShowRecord){
              this.isShowRecord=true;
            }
          }
        })
      },
      //显示异常列表
      showRecords()
      {
        this.getList(true)
      }
    },
    mounted()
    {
      this.getList(false);
    }
  }
</script>
<style scoped lang="less">
  @import "index.less";

</style>

