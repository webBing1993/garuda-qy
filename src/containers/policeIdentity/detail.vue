<template>
  <div class="detailPage">
    <article v-if="detail" >
      <!--上传旅业的信息-->
      <div class="report-info">
        <div>
          <div class="info-item" v-if="showGuestType&&detail.guestType!=='STAFF'">
            <label class="item-left">房间号码:</label>
            <input class="item-right room-number  item2" v-model="roomNumber" :disabled="guestType=='STAFF'" v-if="detail.reportInStatus !== 'SUCCESS'&&detail.reportInStatus!='PENDING'" @keyup.13="enterToLvye($event)"/>
            <span class="item-right" v-else>{{detail.roomNumber}}</span>
          </div>
          <div class="info-item" v-if="showGuestType">
            <!--<label class="item-left">住客类型:</label>-->
            <selector class="item-right guestType item1"  placeholder="请选择" v-model="guestType" name="district" :options="guestTypelist" v-if="detail.reportInStatus !== 'SUCCESS'&&detail.reportInStatus!='PENDING'&&detail.guestType!=='STAFF'"></selector>
            <span class="item-right" v-else>{{detail.guestType|filterGuestType}}</span>
          </div>
        </div>
        <p class="error-room-number" v-if="isErrorNumber && roomNumberList.length>0">酒店无该房间，请重新输入</p>
        <div class="searchRoom">
          <label>搜索结果</label>
          <ul class="searchRoom-result" v-if="resultList.length > 0">
            <li v-for=" result in resultList" @click="resultPick(result)">{{result}}</li>
          </ul>
        </div>
        <div class="info-item photoTime" >
          <label class="item-left">拍照时间:</label>
          <span class="item-right">{{datetimeparse(detail.createdTime,'YYYYMMDDhhmmss')}}</span>
        </div>
        <p class="fail-tip" v-if="detail.reportInStatus && detail.reportInStatus === 'FAILED'" style="margin-bottom: 10px"><span style="color: #ff2d0c;padding-right: 10px;">上传旅业系统失败，请重试</span> {{datetimeparse(detail.reportInTime,'YYYYMMDD hhmm')}}</p>
        <p v-if="detail.reportInStatus &&detail.reportInStatus === 'SUCCESS'" style="margin-bottom: 10px"><span style="color: #80C435;padding-right: 10px;">旅业系统上传成功</span> {{datetimeparse(detail.reportInTime,'YYYYMMDD hhmm')}}</p>
        <p v-if="detail.reportInStatus &&detail.reportInStatus === 'PENDING'" style="margin-bottom: 10px"><span style="color: #c4a726;padding-right: 10px;">上传中！</span> {{datetimeparse(detail.reportInTime,'YYYYMMDD hhmm')}}</p>
        <p v-if="detail.reportInStatus &&detail.identityStatus === 'REFUSED'" style="margin-bottom: 10px;"><span style="color: #ff2d0c;padding-right: 10px;">已拒绝</span>
        <p v-if="detail.scene==='UNDOCUMENTED_CHECK'&&detail.identityStatus==='FAILED'" style="color: #df3200;margin-top: 0.5rem">验证失败</p>
      </div>
      <!--订单信息-->
      <p class="orderTitle" @click="goto('/policeIdentity/orderSearch')">查询其他订单</p>
      <div class="orderInfo" v-for="(item,index) in renderOrderList">
        <div class="content">
          <div v-if="orderOpen">
            <p class="orderItem">
              <span class="titleInfo">订单号：</span><span>{{item.order_no}}</span>
              <span class="roomStatus" @click="(confirmOrderStatus=true,checkIndex=0,checkItem=item)">{{item.precheckin_status==1?'未确认':item.pay_mode==1?'房费现付':'不需房费现付'}}<i v-if="item.pay_mode==2" class="iconfont icon-huodongbiaoqian"></i></span>

            </p>
            <div class="line"></div>
            <p class="orderItem">
              <span class="titleInfo">预定人：</span><span>{{item.owner}}</span><span style="margin-left: 1rem">{{item.owner_tel}}</span>
            </p>
            <p class="orderItem">
              <span class="titleInfo" style="vertical-align: top">房型：</span>
              <span class="ItemValue">
                <ul v-for="room in item.room_type_info">
                  <li style="list-style: none">
                    <span>{{room.room_type_name}}X{{room.room_count}}</span>
                    <ul v-for="i in item.rooms" style="display: inline-block;margin-left: 1rem">
                      <li style="list-style: none;margin-right: 0.5rem" v-if="i.room_type_name==room.room_type_name">{{i.room_no}}</li>
                    </ul>
                  </li>
                </ul>
              </span>
            </p>
            <p class="orderItem">
              <span class="titleInfo">预付款：</span><span>¥ {{item.pms_prepay*1000}}</span>
            </p>
            <p class="orderItem">
              <span class="titleInfo">入住：</span><span>{{datetimeparse(item.in_time,'YYYYMMDD')}}</span>
              <span style="color: #8A8A8A;margin-left: 1rem">离店：</span><span>{{datetimeparse(item.out_time,'YYYYMMDD')}}</span>
            </p>
            <p class="orderItem">
              <span class="titleInfo">备注：</span><span>{{item.remark}}</span>
            </p>
            <span class="orderButton" @click='shareSreenOrCheckIn(item)'>{{item.show_checkin?'入住':'分享到屏幕'}}</span>
            <p class="showOrder" @click="orderOpen=!orderOpen"><x-icon type="ios-arrow-up"  size="25"></x-icon></p>

          </div>
          <div v-if="!orderOpen">
            <p class="orderItem">
              <span class="titleInfo">订单号：</span><span>{{item.order_no}}</span>
              <span style="float: right;">{{item.owner}}<span style="margin-left: 1rem">{{item.owner_tel}}</span></span>
            </p>
            <p class="showOrder" @click="orderOpen=!orderOpen"><x-icon type="ios-arrow-down"  size="25"></x-icon></p>
          </div>
        </div>
      </div>
      <!--人证通身份信息-->
      <div class="guestcard">
        <div class="bd">
          <p><span>现场图片</span><span v-if="this.hotelConfig.show_similarity==='true'">相似度： <abbr style="color: #56e846">{{detail.similarity}}%</abbr></span></p>
          <img :src="detail.livePhoto" alt="现场照片">
        </div>
        <div class="hd">
          <ul>
            <li><span><abbr>姓名</abbr>{{detail.name}}</span></li>
            <li><span><abbr>性别</abbr>{{detail.sex}}</span><span><abbr>民族</abbr>{{detail.ethnicity}}</span></li>
            <li><span><abbr>住址</abbr>{{detail.address}}</span></li>
            <li><span><abbr>身份证号</abbr>{{detail.idCard ? idnumber(detail.idCard) : ''}}</span></li>
          </ul>
          <img :src="detail.photo" alt="身份证照片" class="policeIdentityImg">
        </div>
      </div>

      <div class="footButton" v-if="buttonGroupShow">
        <x-button :value="detail.reportInStatus && detail.reportInStatus === 'FAILED' ? '重新上传旅业系统' : '上传旅业系统'"
                  @onClick="setMultiConfirm"
                  :disabled="isDisabled" v-if="guestType!=='STAFF'"></x-button>
        <x-button value="通过"
                  @onClick="accessBtn"v-if="guestType=='STAFF'"></x-button>
        <x-button value='拒绝' @onClick="isRejectDialogShow"></x-button>
      </div>
      <!--<Dialog v-model="showDialog" @onConfirm="setMultiConfirm" confirm cancel>-->
        <!--<ul class="dialog-info">-->
          <!--<li class="info-col"><span class="dialog-key">姓名：</span><span class="dialog-value">{{detail.name}}</span></li>-->
          <!--<li class="info-col"><span class="dialog-key">证件号码：</span><span-->
            <!--class="dialog-value">{{detail.idCard ? idnumber(detail.idCard) : ''}}</span></li>-->
          <!--<li class="info-col"><span class="dialog-key">房间：</span><span class="dialog-value">{{roomNumber}}</span></li>-->
          <!--<li class="info-col"><span class="dialog-key">入住天数：</span><span class="dialog-value">{{days}}</span></li>-->
          <!--<li class="info-col"><span class="dialog-key">入住日期：</span><span-->
            <!--class="dialog-value">{{datetimeparse(inTimeFilter)}}</span></li>-->
          <!--<li class="info-col"><span class="dialog-key">离店日期：</span><span-->
            <!--class="dialog-value">{{datetimeparse(outTimeFilter)}}</span></li>-->
        <!--</ul>-->
      <!--</Dialog>-->
      <Dialog confirm cancel v-model="rejectDialog" @onConfirm="rejectConfirm" confirm cancel>
        <p>是否确认拒绝</p>
        <br>
        <p style="color: #808080;font-size: 14px">请客人重新办理公安验证</p>
      </Dialog>

      <Dialog confirm cancel v-model="similarityCheck" @onConfirm="reporetLvyes" confirm cancel>
        <p style="color: #000000;font-size: 14px">此人相似度太低 <br> 是否确认上传</p>
      </Dialog>
      <Dialog confirm cancel v-model="confirmOrderStatus" @onConfirm="confirmOrder" confirm cancel>
        <h3 style="text-align: left;color: #000000;margin-bottom: 2rem">请确认订单状态</h3>
        <ul v-for="(item,index) in statusList">
          <li class="orderStatusBtn" :class="{checkStatus:index==checkIndex}" @click="(checkIndex=index,payMode=item.value)">{{item.name}}</li>
        </ul>
        <div style="text-align: left;color: #000000;margin-bottom: 2rem">
          <span>不需支付押金</span><input type="checkbox" style="margin-left: 1rem;width: 1rem;height:1rem;" v-model="isFreeDeposit">
        </div>
      </Dialog>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
  import { Selector, Group} from 'vux'
  module.exports = {
    data(){
      return {
        //认证通状态数据
        detail: {},
        roomNumber: '',
        days: 1,
        inTimeFilter: Date.parse(new Date()),
        outTimeFilter: '',
        showDialog: false,
        isDaysListShow: false,
        resultList: [],
        isErrorNumber: false,
        canSearch: true,
        isWxPayBtnShow: false,//微信支付入住按钮显示
        hotelConfig:{},
        rejectDialog:false,
        similarityCheck :false,
        guestType:'LODGER',
        guestTypelist:[{key: 'LODGER', value: '住客'}, {key: 'VISITOR', value: '访客'},{key: 'STAFF', value: '酒店工作人员'}],
          //值房通状态数据
          checkIndex:0,
          statusList:[{name:'房费现付',value:1},{name:'不需现付房费',value:2}],
          confirmOrderStatus:false,
          orderStatus:0,
          orderOpen:true,
          payMode:1,
          isFreeDeposit:true,
          checkItem:{},
          list:[]

      }
    },
      filters:{
          filterGuestType(val){
              if(val=='LODGER'){
                  return '住客'
              }else if(val=='VISITOR'){
                  return '访客'
              }else if(val=='STAFF'){
                  return '酒店工作人员'
              }
          },
          filterRoomsNum(val){
              let str='收费服务';
              // switch(val){
              //     case 1:
              //     str= '房费现付';
              //     break;
              //     case 2:
              //     str= '不需房费现付';
              //     break;
              // }
              return str;
          }
      },
      components: {
          Group,
          Selector
      },
    computed: {
        // reportInStatus === 'SUCCESS' &&  payInfo.payStatus !== 'NONE' && isCheckIn === false 显示入住按钮
      ...mapState([
        'route',
        'roomNumberList',
        'orderList',
        'checkedOrder',
        'currentLvyeRecordId',
        'hotel'
      ]),
      renderOrderList(){
          // let fakeList=[{
          //     order_no:"1245253525",//订单号,
          //     order_id:"52523552",//订单ID
          //     owner_tel:"1873155253",//手机号
          //     owner:"郑斯斯",//预订人姓名
          //     hotel_id:"",//酒店ID
          //     remark:"携程预定",//备注
          //     in_time:1538471246118,//入住时间
          //     out_time:1539784184264,//离店时间
          //     in_day:"",//入住天数
          //     show_checkin:true,
          //     rooms:[{
          //         room_type_name:"大床房",
          //         room_no:"",//房间号
          //         suboder_id:"",//子单ID
          //         is_select:""//如果通过身份证查询 则会选择身份证入住的房间 如果通过房间号查询，则会显示该房间号
          //     }],
          //     room_type_info:[
          //         {room_type_name:"温馨圆房", room_count:3,},{room_type_name:"大床房", room_count:2},{room_type_name:"温馨圆房", room_count:3,},{room_type_name:"大床房", room_count:2},{room_type_name:"温馨圆房", room_count:3,},{room_type_name:"大床房", room_count:2}
          //     ],
          //     config:{
          //         support_zft:"",//是否支持值房通
          //         enabled_sign:true,//是否支持签名
          //     },
          //     prepay_code:"",
          //     pay_mode:2, //订单已确认 可以有两种 1为现付 2为预付
          //     precheckin_status:3,//确认状态  只有为6的订单并且不需要签名的订单，并且rooms的数量为1，才可以出现入住按钮  1为未确认 大于1都为已确认订单
          //     pms_prepay: 5.3//预付金额 单位是分
          // }]
          // list=fakeList;
          // console.log('renderOrderList:',this.list)
          return this.list;

      },
      identityId(){
        return this.route.params.id
      },
      isDisabled(){
          if (this.roomNumberList.length > 0) {
              let isRightInputRoomNumber = this.roomNumberList.some(i => i === this.roomNumber);
              return !this.roomNumber  || this.isErrorNumber ||!isRightInputRoomNumber
          } else {
              return !this.roomNumber
          }
      },
        buttonGroupShow(){
            if(this.detail.identityStatus == 'REFUSED'||this.detail.identityStatus == 'AGREED'||this.detail.reportInStatus=='PENDING'){
                return false;
            }else {
                return true;
            }
        },
        showGuestType(){
            if(this.detail.reportInStatus=='PENDING'||this.detail.identityStatus == 'REFUSED'){
                return false;
            }else {
                return true
            }
        }
    },
      watch: {
          renderOrderList(val){
              // console.log('此时的renderOrderList：',val)
          },
          checkedOrder(val){
              console.log('此时的checkedOrder：',this.checkedOrder)
          },
          buttonGroupShow(val){
              if(val){
                  this.guestType=null;
              }
          },
          guestType(val){
              if(val=="STAFF") {
                  this.roomNumber='';
              }
          },
          detail(val){
              if(val.reportInStatus!=='SUCCESS') {
                  this.roomNumber='';
              }
          },
          identityId(val){
              val ? this.resetFilter() : null
          },
          days(val, old) {
              if (val && !/^\d+$/.test(val) && !/^[0-9]*$ /.test(val)) this.days = 0;//非负整数，数字
              if (val > 31) this.days = 31;
              let nowDate = new Date();
              let tempTime = nowDate.setTime(nowDate.getTime() + 24 * 60 * 60 * 1000 * this.days);
              this.outTimeFilter = tempTime;
          },
          roomNumber(val,old) {
              if (!val) {
                  this.resultList = [];
                  this.isErrorNumber = false;
              }
              if (!this.canSearch) return;
              if (val && val.split('').some(i => !/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(i))) {//验证特殊字符
                  this.roomNumber = old
              }
              if (this.roomNumberList.length > 0 && val && this.detail.reportInStatus !== 'SUCCESS' && this.detail.reportInStatus !== 'FAIL') {
                  this.resultList = [];
                  this.resultList = this.roomNumberList.filter(room => room.toString().indexOf(val) > -1);
                  if (this.resultList.length === 0) this.isErrorNumber = true;
              }
          },
          resultList(val, old) {
              if (old.length > 0) this.canSearch = true
          },
          // routeParam(val){
          //     console.log('val:',val)
          // }
      },
    methods: {
      ...mapActions([
          'goto',
          'replaceto',
          'newIdentityDetail',
          'reportLvYe',
          'getRoomNumberList',
          'rejectStatus',
          'changeStatus',
          'suborderCheckIn',
          'searchOrderList',
          'shareQrCode'
      ]),
      ...mapMutations([
        'DEVICEID',
        'SEARCHORDERLIST',
        'CHECKORDERITEM',
        'CURRENTLVYERECORDID'
      ]),
      ////////////////////////值房通逻辑/////////////////////////////////
      //查选中情况
        isResetCheckedOrder(){
          let arr=[];
          if(this.currentLvyeRecordId==''){
              console.log('currentLvyeRecordId为空！！')
              this.CHECKORDERITEM(arr);
              this.CURRENTLVYERECORDID(this.$route.params.id);
          }else {
              if(this.currentLvyeRecordId!==this.$route.params.id){
                  console.log('this.currentLvyeRecordId:',this.currentLvyeRecordId)
                  console.log('this.$route.params.id:',this.$route.params.id)
                  this.CHECKORDERITEM(arr);
                  this.CURRENTLVYERECORDID(this.$route.params.id);
              }else {
                  return
              }
          }
      },
      //查询订单列表
      searchRztOrderList(){
          this.searchOrderList({
              data:{
                  "hotel_id":this.hotel.hotel_id,//酒店ID,初始查询必给
                  "idcard_no":this.detail.idCard,//身份证号，初始查询必给
                  "idcard_name":this.detail.name,//身份证姓名，初始查询必给
                  "room_no":this.detail.roomNumber?this.detail.roomNumber:'',//房间号
                  "status":"",//订单状态
                  "like_info":"",//姓名拼音或者手机号
                  "order_id":''
              },
              onsuccess:(body=>{
                  this.SEARCHORDERLIST(body.data);
                  if(this.checkedOrder.length!==0){
                      this.list= this.checkedOrder;
                      console.log('有checkedOrder！！！！')
                  }else{
                      this.list= this.orderList;
                      console.log('没有checkedOrder')
                  }
                  console.log('zsj####this.list:',this.list)
              })
          })
        },
        //房间号查订单
        searchOrderByRoomNum(){
            this.searchOrderList({
                data:{
                    "hotel_id":this.hotel.hotel_id,//酒店ID
                    "idcard_no":'',//身份证号
                    "idcard_name":'',//身份证姓名
                    "room_no":this.roomNumber,//房间号
                    "status":"",//订单状态
                    "like_info":"",//姓名拼音或者手机号
                    "order_id":''
                },
                onsuccess:(body=>{
                    this.SEARCHORDERLIST(body.data);
                    if(this.checkedOrder!==[]){
                        this.list= this.checkedOrder;
                    }else{
                        this.list= this.orderList;
                        console.log('zsj')
                    }
                })
            })
        },
      initOrderList(){
          if(this.roomNumber){
              console.log('手动输入房间')
              this.searchOrderByRoomNum();
          }else {
              console.log('没有输入房间')
              this.searchRztOrderList();
          };
          //如果是查订单呢？？？？？？
      },
      //弹出对话框改订单状态
      confirmOrder(){
          console.log('checkItem:',this.checkItem)
          this.changeStatus({
              data:{
                  order_id:this.checkItem.order_id,
                  hotel_id:this.hotel.hotel_id,
                  pay_Mode:this.payMode,
                  is_free_deposit:this.isFreeDeposit
              },
              onsuccess:(body=>{
                  this.initOrderList();
              })
          })
      },
        //点击分享到屏幕或入住
        shareSreenOrCheckIn(item){
            if(item.precheckin_status==1){
                this.confirmOrderStatus=true;
                return
            }else {
                if(item.show_checkin){
                    this.CheckIn(item);
                }else {
                    this.shareSreen(item);
                }
            }
        },
        //分享到屏幕
        shareSreen(item){
          this.shareQrCode({
              data:{
                  "order_id":item.order_id,
                  "hotel_id":this.hotel.hotel_id,
                  "idcard_no":this.detail.idCard,
                  "idcard_name":this.detail.name,
                  suborder_id:item.suboder_id,
                  room_no:item.rooms[0].room_no
              },
              onsuccess:(body=>{
              })
          })
        },
        //入住
        CheckIn(item){
          this.suborderCheckIn({
              data:{
                  suborder_id:item.suboder_id,
                  room_no:item.rooms[0].room_no,
                  guests:[{
                      name:this.detail.name,
                      idcard:this.detail.idCard
                  }],
                  hotel_id:this.hotel.hotel_id,
              },
              onsuccess:(body=>{
                  this.goto(-1);
              })
          })
        },

  ////////////////////////认证通逻辑/////////////////////////////////
        //enter键事件上传旅业
      enterToLvye (event) {
          if(this.detail.identityStatus === 'REFUSED'){
              return
          }else {
              if(event.keyCode == 13){
                  if(this.isErrorNumber){
                      return
                  }else {
                      this.setMultiConfirm();
                  }

              }
          }
      },
      rejectConfirm(){
        this.rejectStatus({
          status:'REFUSED',
          identity_id: this.detail.identityId,
          onsuccess: body => {
            this.goto(-1)
            console.log('已经拒绝')
          }
        })
      },
      isRejectDialogShow(){
        this.rejectDialog=true;
      },
      resultPick(item) {
        this.canSearch = false;
        this.roomNumber = item;
        this.resultList = [];
        this.isErrorNumber = false;
        this.searchOrderByRoomNum()
      },
      isDialogShow() {
        if (!this.isDisabled) {
          this.resultList = [];
          if(this.guestType=='LODGER'){
              this.showDialog = true;
          }else {
              this.showDialog = false;
              this.setMultiConfirm()
          }
        }
      },
      daysReduce() {
        this.days >= 1 ? this.days = +this.days - 1 : null
      },
      daysAdd() {
        this.days <= 30 ? this.days = +this.days + 1 : null
      },
      resetFilter() {
        this.days = 1;
        this.roomNumber = '';
        this.guestType='LODGER';
        this.inTimeFilter = Date.parse(new Date());
        this.isWxPayBtnShow = false;
      },
        //公安验证详情
      getDetail(){
        this.newIdentityDetail({
          identity_id: this.identityId,
          onsuccess: body => {
            this.hotelConfig=body.data.config;
            this.detail = body.data.content;
            typeof this.detail.nights === 'number' && (this.days = this.detail.nights);
            this.detail.roomNumber && (this.roomNumber = this.detail.roomNumber);
            this.detail.reportInTime && (this.inTimeFilter = this.detail.reportInTime);
            if (this.detail.roomNumber && (typeof this.detail.nights === 'number' && this.detail.nights >= 0)) this.isWxPayBtnShow = true;
            this.detail.deviceId && this.DEVICEID(this.detail.deviceId);
            //拿订单
            this.initOrderList();
          }
        })
      },
        //上传旅业前多次确认
      setMultiConfirm() {
          if(this.isDisabled){
              return
          }else {
              if (this.detail.similarity<70){
                  this.similarityCheck=true;
              }else {
                  this.reporetLvyes();
              }
          }
         },
      accessBtn() {
          if (this.detail.similarity<70){
              this.similarityCheck=true;
          }else {
              this.reporetLvyes();
          }
      } ,
        //上传旅业
        reporetLvyes(){
            this.reportLvYe({
                lvyeReportRecordIds: this.detail.lvyeReportRecordId.split(' '),//旅业上报记录Id
                roomNumber: this.roomNumber,//房间号
                nights: +this.days,//入住晚数
                inTime: this.inTimeFilter,//入住时间
                outTime: this.outTimeFilter,//离店时间
                guestType:this.guestType,
                onsuccess: () => {
                    this.resetFilter();
                    this.goto(-1)
                }
            })
        }
    },
    activated(){
        this.getDetail();
        this.isResetCheckedOrder();

    },
    created(){
      this.detail = {};
      this.getDetail();
      this.isResetCheckedOrder();
      if (this.roomNumberList.length === 0) this.getRoomNumberList();
      this.days === 1 && (this.outTimeFilter = new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000));
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
