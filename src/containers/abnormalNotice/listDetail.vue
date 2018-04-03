<template>
  <div>
  <scroller :pullup-config="Interface.scrollerUp"
            @on-pullup-loading="refreshList"
            lock-x
            use-pullup
            height="-40"
            v-model="scroller"
            scrollbarY bounce ref="scrollerBottom">
    <div class="scroller-wrap">
      <article>
       <p v-if="!renderHandelList || renderHandelList.length === 0" class="no-data">暂无数据</p>
       <div class="list_wrap" v-for="detailItem in renderHandelList">
        <group>
          <cell :title="setTitle(detailItem.notice_type)"></cell>
          <div class="cellBox">
            <div v-if="detailItem.notice_type=='TUIKUAN'">
              <p class="cell2">退款金额<span>¥ {{detailItem.refund_fee|transYuan}}元</span></p>
              <ul>
                <li><span><abbr>订单号：</abbr>{{detailItem.order_id}}</span></li>
                <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers|showRoomNum}}</span></li>
                <li><span><abbr>退款时间：</abbr>{{datetimeparse(detailItem.refund_time,'YYYYMMDD hhmm')}}</span></li>
              </ul>
              <ul>
                <li><span><abbr>支付单号：</abbr>{{detailItem.out_trade_no}}</span></li>
                <li><span><abbr>支付方式：</abbr>{{detailItem.pay_way}}</span></li>
                <li><span><abbr>支付金额：</abbr>{{detailItem.pay_fee|transYuan}}元</span></li>
                <li><span><abbr>支付时间：</abbr>{{datetimeparse(detailItem.pay_time,'YYYYMMDD hhmm')}}</span></li>
              </ul>
            </div>
            <div v-if="detailItem.notice_type=='TUIKUANRUZHANG'">
              <p class="cell2">支付金额<span>¥ {{detailItem.pay_fee|transYuan}}元</span></p>
              <ul>
                <li><span><abbr>订单号：</abbr>{{detailItem.order_id}}</span></li>
                <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers|showRoomNum}}</span></li>
                <li><span><abbr>PMS退款入帐状态：</abbr>{{detailItem.pms_refund_status}}</span></li>
                <li><span><abbr>提交时间：</abbr>{{datetimeparse(detailItem.refund_time,'YYYYMMDD hhmm')}}</span></li>
              </ul>
              <!--<ul>-->
                <!--<li><span><abbr>交易单号：</abbr>{{detailItem.out_trade_no}}</span></li>-->
                <!--<li><span><abbr>支付方式：</abbr>{{detailItem.pay_way}}</span></li>-->
                <!--<li><span><abbr>支付金额：</abbr>{{detailItem.pay_fee|transYuan}}元</span></li>-->
                <!--<li><span><abbr>支付时间：</abbr>{{datetimeparse(detailItem.pay_time,'YYYYMMDD hhmm')}}</span></li>-->
              <!--</ul>-->
            </div>
            <div v-if="detailItem.notice_type=='ZHIFURUZHANG'">
              <ul>
                <li><span><abbr>订单号：</abbr>{{detailItem.order_id}}</span></li>
                <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers|showRoomNum}}</span></li>
                <li><span><abbr>交易单号：</abbr>{{detailItem.out_trade_no}}</span></li>
                <li><span><abbr>支付方式：</abbr>{{detailItem.pay_way}}</span></li>
                <li><span><abbr>支付金额：</abbr>{{detailItem.pay_fee|transYuan}}元</span></li>
                <li><span><abbr>支付时间：</abbr>{{datetimeparse(detailItem.pay_time,'YYYYMMDD hhmm')}}</span></li>
              </ul>
            </div>
            <div v-if="detailItem.notice_type=='RENLIAN'">
              <ul>
                <li><span><abbr>旅客姓名：</abbr>{{detailItem.facein_name}}</span></li>
                <li><span><abbr>房间号：</abbr>{{detailItem.facein_room}}</span></li>
                <li><span><abbr>验证时间：</abbr>{{datetimeparse(detailItem.facein_time,'YYYYMMDD hhmm')}}</span></li>
              </ul>
            </div>
            <div v-if="detailItem.notice_type=='RULVYE'||detailItem.notice_type=='LILVYE'">
              <ul>
                <li><span><abbr>设备名称：</abbr>{{detailItem.device_name}}</span></li>
              </ul>
              <ul>
                <li v-for="i in detailItem.lvye_data"><span><abbr>{{i.room}} 房间：</abbr><abbr>{{i.names|showRoomNum}}</abbr></span></li>
                <li><span><abbr>时间：</abbr>{{datetimeparse(detailItem.lvye_time,'YYYYMMDD hhmm')}}</span></li>
              </ul>
            </div>
            <div v-if="detailItem.notice_type=='FAKA'">
              <ul>
                <li><span><abbr>设备名称：</abbr>{{detailItem.device_name}}</span></li>
              </ul>
              <ul>
                <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers|showRoomNum}}</span></li>
                <li><span><abbr>姓名：</abbr>{{detailItem.facein_name}}</span></li>
                <li><span><abbr>失败时间：</abbr>{{datetimeparse(detailItem.faka_time,'YYYYMMDD hhmm')}}</span></li>
              </ul>
            </div>
            <div v-if="detailItem.notice_type=='TUIFANG'">
              <ul>
                <li><span><abbr>订单号：</abbr>{{detailItem.order_id}}</span></li>
                <li><span><abbr>房间号：</abbr>{{detailItem.room_numbers|showRoomNum}}</span></li>
              </ul>
              <ul>
                <li><span><abbr>支付金额：</abbr>{{detailItem.pay_fee|transYuan}}元</span></li>
                <li><span><abbr>消费金额：</abbr>{{detailItem.consume|transYuan}}元</span></li>
                <li><span><abbr>入住时间：</abbr>{{datetimeparse(detailItem.in_time,'YYYYMMDD hhmm')}}</span></li>
                <li><span><abbr>退房申请时间：</abbr>{{datetimeparse(detailItem.out_app_time,'YYYYMMDD hhmm')}}</span></li>
              </ul>
            </div>
            <div v-if="detailItem.notice_type=='HUISHOU'||detailItem.notice_type=='QUEKA'||detailItem.notice_type=='WUKA'">
              <ul>
                <li><span><abbr>设备名称：</abbr>{{detailItem.device_name}}</span></li>
              </ul>
              <img v-if="detailItem.notice_type=='WUKA'||detailItem.notice_type=='QUEKA'" class= deviceImg src="../../../static/icon/device2.png" alt="">
              <img v-if="detailItem.notice_type=='HUISHOU'" class= deviceImg src="../../../static/icon/device1.png" alt="">
            </div>
            <p class="abnormalReason" v-if="detailItem.notice_type!='TUIKUANRUZHANG'">{{detailItem.exception_errcode|filter_reason}}</p>
            <h5 style="color:#FF0A03;padding-top: 1rem" v-if="detailItem.notice_type=='TUIKUANRUZHANG'">退款码 : {{detailItem.refund_code}} ( {{detailItem.refund_name}} )</h5>
            <h5 style="color:#FF0A03;padding-top: 1rem" v-if="detailItem.notice_type=='ZHIFURUZHANG'">支付码 : {{detailItem.pay_code}} ( {{detailItem.pay_name}} )</h5>
            <div style="height:4rem">
              <div class="button-group" v-if ='detailItem.notice_type!="RENLIAN"'>
                <x-button value="我知道了" @onClick="confirmHandel(detailItem)" v-if="!detailItem.confirm_flag"></x-button>
              </div>
              <div class="button-group" v-if ='detailItem.notice_type=="RENLIAN"'>
                <x-button value="去人工核验" @onClick="confirmHandel(detailItem)" v-if="!detailItem.confirm_flag"></x-button>
              </div>
              <cell :title="'确认时间:'+'  '+datetimeparse(detailItem.confirm_time,'YYYYMMDD hhmm')" v-if="detailItem.confirm_flag"></cell>
            </div>
          </div>
        </group>
      </div>
      <h4 class="abnormalRecord"  @click="showRecords" v-if="isShowRecord"><div class="abnormalRecord2">查看本周异常历史记录</div></h4>
      </article>
    </div>
  </scroller>
  </div>
</template>
<script>

  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import { Scroller } from 'vux'
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
    name: "abnormalNotice",
    components: {Scroller},
    data(){
      return {
        onFetching:false,
        abnormalList:[],
        isShowRecord:false,
        abPage:1,
        pageIndex1:1,
        pageIndex2:1,
        renderList:[],
          scroller: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
      }
    },
    filters:{
      showRoomNum:function (val) {
        if(val) {
          return val.join(',')
        }
      },
      transYuan:function (val) {
        if(val) {
          return val/100
        }
      },
      filter_reason:function (val) {
        switch (val) {
          case '161001' :
            return '该订单已经退过款';
            break;
          case '161002' :
            return '退款失败';
            break;
          case '161003' :
            return '退款订单不存在';
            break;
          case '161004' :
            return '余额不足';
            break;
          case '161005' :
            return '特约子商户商户号未授权服务商的产品权限';
            break;
          case '161006' :
            return '服务异常';
            break;
          case 'pms_110101' :
            return '脏房不能入住';
            break;
          case 'pms_130101' :
            return '账务不平';
            break;
          case 'pms_130102'  :
            return '时间不对';
            break;
          case 'pms_110103' :
            return '入住时间大于离店时间';
            break;
          case 'pms_140101' :
            return '入住人已经登记到其他房间';
            break;
          case 'pms_120101' :
            return '支付入账异常';
            break;
          case 'pms_110102' :
            return '入住人已经登记到其他房间';
            break;
          case 'pms_120102' :
            return '新系统接口问题，PMS退款入账失败，请与微前台运营人员联系,4001-690-890';
            break;
          case 'pms_140102' :
            return '入住房间不存在';
            break;
          case 'pms_100101' :
            return '不能分脏房';
            break;
          case 'pms_100102' :
            return '房间被占用';
            break;
          case '190134' :
            return '人脸识别失败';
            break;
          case '190125' :
            return '旅业入住上报 - 上报失败';
            break;
          case '230119' :
            return '旅业离店上报 - 未找到对应身份验证信息';
            break;
          case '230120' :
            return '旅业离店上报 - 入住未上报旅业系统';
            break;
          case '230121' :
            return '旅业离店上报 - 上报失败';
            break;
          case '190150' :
            return '旅业上传超时';
            break;
          case '190151' :
            return '数据库参数不正确';
            break;
          case '190152' :
            return '写卡失败';
            break;
          case '190135' :
            return '底座发卡失败';
            break;
          case '230108' :
            return 'PMS退房失败';
            break;
          case '190133' :
            return '回收卡槽满';
            break;
          case '190131' :
            return '设备发卡槽无剩余门卡';
            break;
          case '190132' :
            return '设备房卡剩余量过低';
            break;
          default:
            return null
        }
      }
    },
    computed:{
      ...mapState([
        'hotel',
        'Interface'
      ]),
      renderHandelList(){
        return this.renderList;
      }
    },
    methods:{
      ...mapActions([
        'goto',
        'replaceto',
        'getAbnormalList',
        'exceptionsHandel',
      ]),

      //设置异常项标题
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
            return enumWarnType.checkOutlvyeWarn;
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
            return enumWarnType.cardUnenoughWarn;
            break;
        }
      },
      //请求异常列表数据
      getList(isHistory,page)
      {
        this.getAbnormalList({
          is_history:isHistory,
          currentPage:page,
          onsuccess:body => {
            this.abnormalList =  body.data.list;
//            console.log('长度：'+this.abnormalList.length)
            this.renderList=[...this.renderList,...this.abnormalList];
            if(body.data.record){
              this.isShowRecord=body.data.record;
            };
            //判断请求的是异常页面还是历史记录页面
            if(isHistory){
              this.isShowRecord=false;
              this.abPage=2;
            }else if(!isHistory){
              this.abPage=1;
            };
            if(this.abnormalList.length==0||this.abnormalList==null){
              this.scroller.pullupStatus = 'disabled';
              return;
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
            item.confirm_time=_time.getTime();
            if(item.notice_type=='RENLIAN'){
                     this.goto(`/identity/todo/${item.identity_check_guest_id}`)
            }
            item.confirm_flag=!item.confirm_flag;
            if(!this.isShowRecord){
              this.isShowRecord=true;
            }
          }
        })
      },
      //下拉刷新列表，按需加载
      refreshList(){
        if (this.onFetching) {
          // do nothing
          return;
        }else{
          this.onFetching = true;
          setTimeout(() => {
              if(this.abPage===2){
                this.pageIndex2++;
                this.getList(true,this.pageIndex2);
              }else if(this.abPage===1){
                this.pageIndex1++;
                this.getList(false,this.pageIndex1);
              };
              console.log('第'+this.pageIndex2+'页');
              this.scroller.pullupStatus = 'default';
              //$nextTick是为了数据改变了等待dom渲染后使用
              this.$nextTick(() => {
                  this.$refs.scrollerBottom.reset();
              });
              this.onFetching = false
          }, 500);
        }
      },
      //显示异常列表
      showRecords()
      {
        this.renderList=[];
        this.getList(true,this.pageIndex2);
        this.scroller.pullupStatus = 'enabled';
      }
    },
    mounted()
    {
      this.getList(false,this.pageIndex1);
    }
  }
</script>
<style scoped lang="less">
  @import "index.less";

</style>

