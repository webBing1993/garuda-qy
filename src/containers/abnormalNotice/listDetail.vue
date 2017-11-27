<template>
  <article>
    <div class="list_wrap" v-for="detailItem in dataList">
      <group>
        <cell :title="detailItem.notice_type"></cell>
        <div class="cellBox">
          <div v-if="detailItem.notice_type=='退款异常'">
            <p class="cell2">退款金额<span>¥ {{detailItem.refund_fee}}</span></p>
            <ul>
              <li><span><abbr>订单号：</abbr>{{detailItem.order_id}}</span></li>
              <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers}}</span></li>
              <li><span><abbr>退款时间：</abbr>{{datetimeparse(detailItem.refund_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
            <ul>
              <li><span><abbr>交易单号：</abbr>{{detailItem.out_trade_no}}</span></li>
              <li><span><abbr>支付方式：</abbr>{{detailItem.pay_way}}</span></li>
              <li><span><abbr>支付金额：</abbr>{{detailItem.pay_fee}}</span></li>
              <li><span><abbr>支付时间：</abbr>{{datetimeparse(detailItem.pay_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
          </div>
          <div v-if="detailItem.notice_type=='退款入账异常'">
            <p class="cell2">支付金额<span>¥ {{detailItem.pay_fee}}</span></p>
            <ul>
              <li><span><abbr>订单号：</abbr>{{detailItem.order_id}}</span></li>
              <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers}}</span></li>
              <li><span><abbr>退款状态：</abbr>{{detailItem.refund_status}}</span></li>
              <li><span><abbr>PMS退款入住状态：</abbr>{{detailItem.pms_refund_status}}</span></li>
              <li><span><abbr>退款时间：</abbr>{{datetimeparse(detailItem.refund_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
            <ul>
              <li><span><abbr>交易单号：</abbr>{{detailItem.out_trade_no}}</span></li>
              <li><span><abbr>支付方式：</abbr>{{detailItem.pay_way}}</span></li>
              <li><span><abbr>支付金额：</abbr>{{detailItem.pay_fee}}</span></li>
              <li><span><abbr>支付时间：</abbr>{{datetimeparse(detailItem.pay_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
          </div>
          <div v-if="detailItem.notice_type=='支付入账异常'">
            <ul>
              <li><span><abbr>订单号：</abbr>{{detailItem.order_id}}</span></li>
              <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers}}</span></li>
              <li><span><abbr>交易单号：</abbr>{{detailItem.out_trade_no}}</span></li>
              <li><span><abbr>支付方式：</abbr>{{detailItem.pay_way}}</span></li>
              <li><span><abbr>支付金额：</abbr>{{detailItem.pay_fee}}</span></li>
              <li><span><abbr>支付时间：</abbr>{{datetimeparse(detailItem.pay_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
          </div>
          <div v-if="detailItem.notice_type=='人脸验证异常'">
            <ul>
              <li><span><abbr>旅客姓名：</abbr>{{detailItem.name}}</span></li>
              <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers}}</span></li>
              <li><span><abbr>验证时间：</abbr>{{datetimeparse(detailItem.facein_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
          </div>
          <div v-if="detailItem.notice_type=='入住信息上传旅业系统异常'||detailItem.notice_type=='退房信息上传旅业系统异常'">
            <ul>
              <li v-for="i in detailItem.lvye_data"><span><abbr>{{i.room}}房间：</abbr><abbr v-for="m in i.names">{{m}}， </abbr></span></li>
              <li><span><abbr>时间：</abbr>{{datetimeparse(detailItem.lvye_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
          </div>
          <div v-if="detailItem.notice_type=='发卡异常'">
            <ul>
              <li><span><abbr>订单号：</abbr>{{detailItem.order_id}}</span></li>
              <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers}}</span></li>
              <li><span><abbr>姓名：</abbr>{{detailItem.name}}</span></li>
            </ul>
          </div>
          <div v-if="detailItem.notice_type=='退房异常'">
            <ul  >
              <li><span><abbr>订单号：</abbr>{{detailItem.order_id}}</span></li>
              <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers}}</span></li>
            </ul>
            <ul  >
              <li><span><abbr>支付金额：</abbr>{{detailItem.pay_fee}}</span></li>
              <li><span><abbr>消费金额：</abbr>{{detailItem.consume}}</span></li>
              <li><span><abbr>入住时间：</abbr>{{datetimeparse(detailItem.in_time,'YYYYMMDD hhmm')}}</span></li>
              <li><span><abbr>退房申请时间：</abbr>{{datetimeparse(detailItem.out_app_time,'YYYYMMDD hhmm')}}</span></li>
            </ul>
          </div>
          <div v-if="detailItem.notice_type=='回收卡槽已满'||detailItem.notice_type=='设备缺卡'||detailItem.notice_type=='设备无卡'">
            <img v-if="detailItem.notice_type=='回收卡槽已满'||detailItem.notice_type=='设备缺卡'" class= deviceImg src="../../../static/icon/device2.png" alt="">
            <img v-if="detailItem.notice_type=='设备无卡'" class= deviceImg src="../../../static/icon/device1.png" alt="">
          </div>
          <p class="abnormalReason">{{detailItem.exception_errcode}}</p>
          <h5 style="color:#FF0A03;padding-top: 1rem" v-if="detailItem.notice_type=='退款入账异常'">退款码 : {{detailItem.refund_code}} ( {{detailItem.refund_name}} )</h5>
          <h5 style="color:#FF0A03;padding-top: 1rem" v-if="detailItem.notice_type=='支付入账异常'">支付码 : {{detailItem.pay_code}} ( {{detailItem.pay_name}} )</h5>
          <div style="height:4rem">
            <div class="button-group">
              <x-button value="我知道了" @onClick="confirmHandel(detailItem)" v-if="!detailItem.confirm_flag"></x-button>
            </div>
            <cell :title="'确认时间:'+'  '+datetimeparse(detailItem.confirmTime,'YYYYMMDD hhmm')" v-if="detailItem.confirm_flag"></cell>
          </div>
        </div>
      </group>
    </div>
    <h4 class="abnormalRecord" @onClick="showRecords"><span>查看本周异常历史记录</span></h4>
  </article>

</template>
<script>
  import {Group, Cell} from 'vux'
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default{
    components: {
      Group,
      Cell
    },
    name: "abnormalNotice",
    data(){
      return {
        titleName:2,
        dataList: [{
          order_id: 2412,
          confirm_flag: false,
          notice_type: '退款异常',
          refund_fee: '100.00',
          orderNum: 'Apple',
          room_numbers: '203',
          reason: '哈哈哈哈哈哈',
          pay_way: '支付宝',
          refund_time: 54534534,
          exception_errcode: "加塞发丝发哈是否能吃UI发动机负担库松斯基复IE哦单位",
          out_trade_no: 65412324,
          pay_fee: 435,
          refund_time: 6754214,
          pay_time: 78906432,
          confirmTime:''
        }, {
          order_id: 43512,
          confirm_flag: false,
          notice_type: '退款入账异常',
          refund_fee: '100.00',
          orderNum: 'Apple',
          refund_status: "退款处理中",
          room_numbers: '203',
          reason: '哈哈哈哈哈哈',
          pay_way: '支付宝',
          refund_time: 54534534,
          exception_errcode: "加塞发丝发哈是否能吃UI发动机负担库松斯基复IE哦单位",
          out_trade_no: 65412324,
          pay_fee: '453',
          refund_time: 6754214,
          pms_refund_status: "失败",
          pay_time: 78906432,
          refund_code: 342,
          refund_name: "微信小程序-退款",
          confirmTime: ''
        }, {
          order_id: 43512,
          confirm_flag: false,
          notice_type: '支付入账异常',
          orderNum: 'Apple',
          room_numbers: '203',
          reason: '哈哈哈哈哈哈',
          pay_way: '支付宝',
          exception_errcode: "加塞发丝发哈是否能吃UI发动机负担库松斯基复IE哦单位",
          out_trade_no: 65412324,
          pay_fee: '890',
          pay_time: 78906432,
          pay_code: 654,
          pay_name: "微信小程序-支付",
          confirmTime: ''
        }, {
          confirm_flag: false,
          notice_type: '人脸验证异常',
          room_numbers: '203',
          exception_errcode: "加塞发丝发哈是否能吃UI发动机负担库松斯基复IE哦单位",
          facein_time: 6789,
          name: '张三'
        }, {
          confirm_flag: false,
          notice_type: '入住信息上传旅业系统异常',
          room_numbers: '203',
          exception_errcode: "加塞发丝发哈是否能吃UI发动机负担库松斯基复IE哦单位",
          facein_time: 6789,
          name: '张三',
          lvye_data: [{
            room: 201,
            names: ["张三", "李四"]
          }, {
            room: 202,
            names: ["Zoe", "Victoria"]
          }],
          lvye_time: 54321345
        }, {
          confirm_flag: false,
          notice_type: '退房信息上传旅业系统异常',
          room_numbers: '203',
          exception_errcode: "加塞发丝发哈是否能吃UI发动机负担库松斯基复IE哦单位",
          facein_time: 6789,
          name: '张三',
          lvye_data: [{
            room: 201,
            names: ["张三", "李四"]
          }, {
            room: 202,
            names: ["Zoe", "Victoria"]
          }],
          lvye_time: 54321345
        },
          {
            notice_type: '发卡异常',
            confirm_flag: false,
            room_numbers: 451234,
            order_id: 234,
            name: 'zhangsan',
            exception_errcode: "加塞发丝发哈是否能吃UI发动机负担库松斯基复IE哦单位",
          },
          {
            notice_type: '退房异常',
            room_numbers: 451234,
            order_id: 234,
            consume: 453,
            in_time: 67890,
            out_app_time: 13246578,
            exception_errcode: "加塞发丝发哈是否能吃UI发动机负担库松斯基复IE哦单位",
          },
          {
            notice_type: '回收卡槽已满',
            exception_errcode: '如下图所示，按箭头所指的地方，取出存卡盒，进行回收。'
          },
          {
            notice_type: '设备缺卡',
            exception_errcode: '预留门卡数量不足，请尽快拔出箭头所指卡槽壳后补充门卡'
          },
          {
            notice_type: '设备无卡',
            exception_errcode: '预留门卡数量不足，请尽快拔出箭头所指卡槽壳后补充门卡'
          }
        ],
        listData:[]
      }
    },
    computed:{
      ...mapState([
        'hotel'
      ])
//      notice_type(){
//        switch (this.titleName){
//          case 1 :
//            return '退款异常';
//            break;
//          case 2 :
//            return '退款入账异常';
//            break;
//        }
//      }
    },
    methods:{
      ...mapActions([
        'goto',
        'replaceto',
        'getAbnormallist',
        'exceptionsHandel'
      ]),
      //初始化异常列表数据
      initList()
      {
        this.getAbnormallist({
          is_history:false,
          onsuccess:body => {
            console.log(body.data)
            this.dataList = body.data;
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
            item.confirm_flag=!item.confirm_flag;
          }
        })
      },
      //显示异常列表
      showRecords()
      {

      }
    },
    mounted()
    {
      //this.initList();
    }
  }
</script>
<style scoped lang="less">
  @import "index.less";

</style>

