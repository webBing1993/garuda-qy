<!--订单中心-->
<template>
  <article>
    <header class="tab-wrapper">
      <tab active-color="#5077AA">
        <tab-item v-for="(item,index) in tabMenu"
                  :selected="currentTab === index"
                  :key="index" @on-item-click="tabToggle(index)">{{item}}
        </tab-item>
      </tab>
      <div class="batchbar" v-if="batch">
        <span class="allpick" :class="{batch:batchlist.length === tobeconfirmed.length}" @click="allPick">全选</span>
        <span @click="cancelPick">取消操作</span>
      </div>

    </header>

    <div class="list-wrapper">
        <div class="orderTitle">
          <span @click="syncTime">同步</span>
          <span>
            <x-input  placeholder="输入手机号或姓名拼音" v-model="searchOrder">
            <i slot="label" style="padding-right:10px;display:block;" class="iconfont icon-sousuo" width="24" height="24"></i>
            </x-input>
          </span>
        </div>
      <div v-show="!currentTab" :class="{batch}">
        <p v-show="(!tobeconfirmed||tobeconfirmed.length === 0) && tobeConfirmedPageIndex > 0" class="no-data">暂无数据</p>

        <div class="orderCell" v-for="(item,index) in renderList" :key="index">
          <div class="orderCellTitle">
            <div>
              <span class="orderCellKey">订单号：</span>
              <span>{{item.order_pmsid}}</span>
            </div>
            <div v-if="item.prepay_code==null">
              <span class="cell-right other" @click="showStatusDialog(item)">{{item.precheckin_status==1?'未确认':item.payinfo.pay_mode==1?'现付房费':'不需现付房费'}}<i v-if="item.precheckin_status==6" class="iconfont icon-huodongbiaoqian"></i> </span>
            </div>
          </div>
          <div class="space"></div>
          <div class="orderCellBody">
            <div>
              <p>
                <span class="orderCellKey">预订人：</span>
                <span>{{item.owner}} {{item.owner_tel}}</span>
              </p>
              <p class="space10"></p>
              <p v-for="(i,k) in item.rooms_plan" :key="k">
                <span class="orderCellKey">房型：</span>
                <span>{{i.room_type}}X{{i.room_count}}</span>
              </p>
              <p class="space10"></p>
              <!--<p>-->
                <!--<span class="orderCellKey">预付款：</span>-->
                <!--<span>¥{{item.payinfo.pms_pay／100}}</span>-->
              <!--</p>-->
              <p class="space10"></p>
              <p>
                <span class="orderCellKey">入住：</span>
                <span>{{datetimeparse(item.in_time,'YYMMDD')}}</span>
                <span style="margin-left:1rem;color: #959595">离店：</span><span>{{datetimeparse(item.out_time,'YYMMDD')}}</span><span class="dayCount">{{item|filterStayDay}}</span>
              </p>
              <p class="space10"></p>
            </div>
            <div class="iconfont icon-erweima1" @click="_getQart(item)"></div>
            <div class="setArrowRight" @click="orderClick(item.order_id)"></div>
          </div>
          <!--<div class="orderCellFooter">-->
            <!--<p>-->
              <!--<span class="orderCellKey">分享码：</span>-->
              <!--<span>{{item.share_code}}</span>-->
            <!--</p>-->
            <!--<x-button mini value="生成二维码" @onClick="_getQart(item)"></x-button>-->
            <!--&lt;!&ndash;<button v-on:click="_getQart(item,index)">生成二维码1</button>&ndash;&gt;-->
          <!--</div>-->
          <Cell v-if="item.remark" :title="getCellFooter(item)"/>
        </div>
      </div>


      <div v-show="currentTab">
        <div class="orderCell" v-for="(item,index) in renderList" :key="index">
          <div class="orderCellTitle">
            <div>
              <span class="orderCellKey">订单号：</span>
              <span>{{item.order_pmsid}}</span>
            </div>
            <div v-if="item.prepay_code==null">
              <span class="cell-right other" @click="(confirmOrderStatus=true,checkIndex=0,checkItem=item)">{{item.precheckin_status==1?'未确认':item.payinfo.pay_mode==1?'现付房费':'不需现付房费'}}<i v-if="item.precheckin_status==6" class="iconfont icon-huodongbiaoqian"></i> </span>
              <!--<span v-if="item.payinfo.pay_mode&&item.payinfo.pay_mode!=1&&item.payinfo.pay_mode!=2">后付/挂账/公账等</span>-->
            </div>
            <!--<div v-if="item.prepay_code&&item.prepay_code!=null">-->
              <!--<span class="cell-right other" v-if="item.prepay_code && item.prepay_code=='PRETOTALPAY'">全额预付 </span>-->
              <!--<span class="cell-right other" v-if="item.prepay_code && item.prepay_code=='SHOPPAY'">现付</span>-->
              <!--<span class="cell-right other" v-if="item.prepay_code && item.prepay_code=='CREDITPAY'">信用后付</span>-->
              <!--<span class="cell-right other" v-if="item.prepay_code && item.prepay_code=='COMPANYPAY'">公司挂账</span>-->
              <!--<span class="cell-right other" v-if="item.prepay_code && item.prepay_code=='FREEPAY'">免单</span>-->
              <!--<span class="cell-right other" v-if="item.prepay_code && item.prepay_code=='NOTKNOWPAY'">未知</span>-->
            <!--</div>-->
          </div>
          <div class="space"></div>
          <div class="orderCellBody">
            <div>
              <p>
                <span class="orderCellKey">预订人：</span>
                <span>{{item.owner}} {{item.owner_tel}}</span>
              </p>
              <p class="space10"></p>
              <p v-for="(i,k) in item.rooms_plan" :key="k">
                <span class="orderCellKey">房型：</span>
                <span>{{i.room_type}}X{{i.room_count}}</span>
              </p>
              <p class="space10"></p>
              <!--<p>-->
                <!--<span class="orderCellKey">预付款：</span>-->
                <!--<span>¥{{item.payinfo.pms_pay／100}}</span>-->
              <!--</p>-->
              <p class="space10"></p>
              <p>
                <span class="orderCellKey">入住：</span>
                <span>{{datetimeparse(item.in_time,'YYMMDD')}}</span>
                <span style="margin-left: 1rem;color: #959595">离店：</span><span>{{datetimeparse(item.out_time,'YYMMDD')}}</span><span class="dayCount">{{item|filterStayDay}}</span>
              </p>
              <p class="space10"></p>
            </div>
            <div class="iconfont icon-erweima1" @click="_getQart(item)"></div>
            <div class="setArrowRight" @click="orderClick(item.order_id)"></div>
          </div>
          <!--<div class="orderCellFooter">-->
            <!--<p>-->
              <!--<span class="orderCellKey">分享码：</span>-->
              <!--<span>{{item.share_code}}</span>-->
            <!--</p>-->
            <!--<x-button mini value="生成二维码" @onClick="_getQart(item)"></x-button>-->
            <!--&lt;!&ndash;<button v-on:click="_getQart(item,index)">生成二维码1</button>&ndash;&gt;-->
          <!--</div>-->
          <Cell v-if="item.remark" :title="getCellFooter(item)"/>
        </div>
      </div>

    </div>
    <!--<footer v-show="route.params.tab == 0 && tobeconfirmed.length !== 0 && tobeConfirmedPageIndex > 0">-->
      <!--<div class="button-group">-->
        <!--<x-button v-if="batch" value="未支付" @onClick="setMultiConfirm" warn/>-->
        <!--<x-button class="blue-btn" v-else @onClick="goPick" value="未支付批量处理"/>-->
      <!--</div>-->
    <!--</footer>-->

    <!--<footer v-show="route.params.tab == 1">-->
      <!--<div class="listFilter">-->
         <!--<span class="filter" @click="showDialog">-->
            <!--<abbr>筛选</abbr>-->
         <!--</span>-->
      <!--</div>-->
    <!--</footer>-->

    <div class="dialog">
      <Dialog v-model="IsshowDialog" mask-z-index="1" confirm cancel cancelVal="取消" confirmVal="确定" @onConfirm="confirmHandle" @onCancel="cancel">
        <p class="filterTop">筛选</p>
        <group>
          <!--<x-input title="房号" novalidate placeholder="请输入房号" v-model="roomNum" placeholder-align="left"></x-input>-->
          <x-input title="姓名" novalidate placeholder="" v-model="customerName"
                   placeholder-align="right"></x-input>
          <!--<cell title= "房型" @onClick="roomTypeShow = true" link :value="selectedRoomType"></cell>-->
          <popup-picker :popup-style="{'z-index':'5002','max-height':'250px'}"
                        v-model="defaultRoomType"
                        :title="roomTitle"
                        :data="roomList">
          </popup-picker>
          <!--<cell title="起始日期" @onClick="isTimerConterShow = true" link-->
          <!--:value="datetimeparse(periodFilter[0],'YYMMDD')"></cell>-->
          <!--<cell title="截止日期" @onClick="isTimerConterShow = true" link-->
          <!--:value="datetimeparse(periodFilter[1],'YYMMDD')"></cell>-->
        </group>
      </Dialog>
    </div>

    <div class="QrCode" v-model="showQrcode" v-show="showQrcode">
      <div class="mask"></div>
      <div class="qrContent">
        <div class="qrTitle">
          <p>二维码</p>
          <!--<p @click="showQrcode=false">X</p>-->
          <p @click="_close">X</p>
        </div>
        <div id="qrcode" ref="qrcode"></div>
      </div>
    </div>
    <Dialog confirm cancel v-model="confirmOrderStatus" @onConfirm="confirmOrder" confirm cancel  :isDisabled='checkIndex==0'>
      <h3 style="text-align: left;color: #000000;margin-bottom: 2rem">请确认订单状态</h3>
      <ul v-for="(item,index) in statusList">
        <li class="orderStatusBtn" :class="{checkStatus:index+1==checkIndex}" @click="(checkIndex=index+1,payMode=item.value)">{{item.name}}</li>
      </ul>
      <div style="text-align: left;color: #000000;margin-bottom: 2rem" v-if="!freeDepositCheck">
        <span>免押</span><input type="checkbox" style="margin-left: 1rem;width: 1rem;height:1rem;" v-model="freeDeposit">
      </div>
    </Dialog>
    <!--<div id="qrcode" ref="qrcode"></div>-->
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import { PopupPicker, Picker, Popup,XInput,Tab, TabItem} from 'vux'


  export default {
      name: "prepay",
      components: {
          // PopupRadio,
          PopupPicker,
          Picker,
          Popup,
          XInput,
          Tab,
          TabItem
      },

      data () {
          return {
//        tabmenu: ["待确认", "已确认"],
              batch: false,
              batchlist: [],
              tobeconfirmed: [],
              confirmed: [],
              tobeConfirmedPageIndex: 0,
              confirmedPageIndex: 0,
              roomNum: '',
              customerName: '',
              roomTitle: "房型",
              roomTypeShow: false,
              roomList: [],
              roomType: '',
              roomTypeId: '',
              getedRoomList: [],
              defaultRoomType: ['全部房型'],
              selectedRoomType: '',
              IsshowDialog: false,
              isTimerConterShow: false,
              periodFilter: [null, null],
              showQrcode: false,
              i: false,
              confirmOrderStatus: false,
              checkIndex: 0,
              statusList: [{name: '现付房费', value: 1}, {name: '不需现付房费', value: 2}],
              payMode: 1,
              freeDeposit: false,
              checkItem: {},
              searchOrder: '',
              resultList: []
          }
      },
      filters: {
          filterStayDay(val){
              let _value=Math.floor((val.out_time-val.in_time)/3600000/24);
              if (_value<1){
                  return '1晚'
              }else{
                  return  _value+'晚'
              }
          }
      },
      computed: {
          ...mapState ([
              'Interface',
              'route',
              'hotel',
              'isFreeDeposit'
          ]),
          freeDepositCheck () {
              return this.isFreeDeposit && this.isFreeDeposit == 'true' ? true : false
          },
          currentTab () {
              return parseInt (this.route.params.tab)
          },

          renderList () {
              return this.resultList;
          },

          tabMenu () {
              let menu = [];
              menu[0] = `待确认(${this.tobeconfirmed.length})`;
              menu[1] = `已确认(${this.confirmed.length})`;
              return menu;
          }
      },

      methods: {
          ...mapActions ([
              'goto',
              'replaceto',
              'getconfirmelist',
              'filtrateConfirmelist',
              'multiconfirm',
              'hotelrefresh',
              'searchRoom',
              'changeStatus'
          ]),
          convertlist(list){
              list.forEach(item=>{
                  if(typeof item.ownerPinYing == 'undefined'){
                      this.$set(item,'ownerPinYing','');
                  }
                  item.ownerPinYing=this.pinYing.pinyinConvert(item.owner);
                  if(typeof item.owerFirstPY =='undefined') {
                      this.$set (item,'owerFirstPY', []);
                  }
                  item.owerFirstPY=this.pinYing.makeFirstPy(item.owner);
              })
              return list
          },
          showStatusDialog (item) {
              this.confirmOrderStatus = true,
                  this.payMode = item.payinfo.pay_mode,
                  this.checkIndex = 0,
                  this.checkItem = item
          },
          //弹出对话框改订单状态
          confirmOrder () {
              console.log ('checkItem:', this.checkItem)
              this.changeStatus ({
                  data: {
                      order_id: this.checkItem.order_id,
                      hotel_id: this.hotel.hotel_id,
                      pay_mode: this.payMode,
                      is_free_deposit: this.freeDeposit
                  },
                  onsuccess: (body => {
                      this.refreshList ()
                  })
              })
          },
          tabToggle (index) {
              this.replaceto ('/prepay/' + index);
              this.refreshList();
              console.log ('this.resultList:', this.resultList);
          },
          confirmMode (item) {
              return item.payinfo
                  ? item.payinfo.confirm_mode === 2 ? '(手动确认)' : ''
                  : ''
          },


          getCellFooter (item) {
              return `<p><span class="cell-key">备注：</span><span class="cell-value">${item.remark}</span></p>`
          },

          goPick () {
              // 批量选择
              this.batchlist = []
              this.batch = true
          },

          cancelPick () {
              // 退出批量选择
              this.batchlist = []
              this.batch ? this.batch = false : null
          },

          allPick () {
              // 全选和取消全选
              if (this.batchlist.length === this.tobeconfirmed.length) {
                  this.batchlist = []
              } else {
                  this.batchlist = [];
                  this.tobeconfirmed.forEach (
                      item => this.batchlist.push (item.order_id)
                  )
              }
          },

          orderClick: function (orderId) {
              //非批量模式下点击订单跳转至详情页面
              if (!this.batch) {
                  this.batchlist = []
                  this.goto ('/prepay/detail/' + orderId)
              }
          },

          setMultiConfirm () {
              if (this.batchlist.length != 0) {
                  this.multiconfirm ({
                      order_ids: this.batchlist,
                      onsuccess: () => {
                          this.batchlist.forEach (item => {
                              let tempIndex = this.tobeconfirmed.findIndex (i => i.order_id === item);
                              tempIndex > -1
                                  ? this.tobeconfirmed.splice (tempIndex, 1)
                                  : null
                          });
                          this.cancelPick ()
                      }
                  })
              }
          },

          syncTime () {
              this.hotelrefresh ({
                  onsuccess: (body => {
                      this.refreshList ();
                  })
              })
          },
          getList (status, callback) {
              this.getconfirmelist ({
                  precheckin_status: status,
                  like_owner: '',
                  pms_room_type_id: '',
                  onsuccess: callback
              })
          },
          initList () {
              this.tobeConfirmedPageIndex = 0
              this.confirmedPageIndex = 0
              this.getList (1, body => {
                  this.tobeconfirmed = this.convertlist(body.data);
                  this.tobeConfirmedPageIndex++;
                  this.resultList = this.tobeconfirmed;
              })
              this.getList (2, body => {
                  this.confirmed = this.convertlist(body.data),
                  this.confirmedPageIndex++
              })
              console.log('zzz:',this.tobeconfirmed )
              console.log('sss:',this.confirmed)
          },

          refreshList () {
              this.tobeconfirmed = [];
              this.confirmed = [];
              this.searchOrder='';
              this.getList (1, body => {
                  this.tobeconfirmed = this.convertlist(body.data);
                  this.getList (2, body => {
                      this.confirmed = this.convertlist(body.data);
                      if (this.currentTab == 0) {
                          this.resultList = this.tobeconfirmed;
                      } else if (this.currentTab == 1) {
                          this.resultList = this.confirmed;
                      }
                  });
              });
          },
      getRoomTypeList(){
        this.roomList = []
        this.searchRoom({
          onsuccess: body => {
            this.getedRoomList = body.data;
            let list = body.data;
            let tempList = ['全部房型']
            list.forEach((item, index) => {
              tempList.push(item.room_type_name)
            })
            this.roomList.push(tempList)
            console.log('------->', this.roomList)
          }
        })
      },

      searchRoomType() {
        this.roomList1 = [{name: '全部房型', value: ''}];
        this.roomList = [];
        this.searchRoom({
          onsuccess: body => {
            let list = body.data;
            list.forEach((item, index) => {
              this.roomList1.push({name: item.room_type_name, value: item.room_type_id});
            });
            this.roomList.push(this.roomList1);
          }
        })
      },

      selectOne(par){
        this.selectedRoomType = par;
      },

      showDialog(){
        this.IsshowDialog = true;
        this.getRoomTypeList();
      },

      //筛选取消处理
      cancel() {
        this.IsshowDialog = false;
      },

      //筛选确定处理
      confirmHandle() {
        console.log('入住人', this.customerName)
        console.log('房型', this.defaultRoomType)
        this.getedRoomList.map((item, index) => {
          if (item.room_type_name == this.defaultRoomType[0]) {
            this.roomTypeId = item.room_type_id
          }
        })
        this.getconfirmelist({
          precheckin_status: 2,
          like_owner: this.customerName,
          pms_room_type_id: this.roomTypeId,
          onsuccess: body => (this.confirmed = [...body.data], this.confirmedPageIndex++)
        });
        this.IsshowDialog = false;
      },

      resetFilter() {
        console.log('resetFilter');
        this.periodFilter = [null, null]
      },

      _getQart(item, index){
        document.getElementById('qrcode').innerHTML=''
        this.showQrcode = true;
        let order_id = item.order_id
        let hotel_id = this.hotel.hotel_id
//        if (this.i == false) {
        let qrcode = new QRCode(this.$refs.qrcode, {
          width: 180,//设置宽高
          height: 180,
          colorDark: '#000000',
          colorLight: '#ffffff',
        });
        console.log('生成二维码是', "https://wqt.fortrun.cn/q?hotel_id=" + hotel_id + "&signpost=BIND_ORDER&order_id=" + order_id)
        qrcode.makeCode("https://wqt.fortrun.cn/q?hotel_id=" + hotel_id + "&signpost=BIND_ORDER&order_id=" + order_id);
//        }
//        this.i = true;

      },
      _close(){
        this.showQrcode = false
      },

      getQrCode(){
        this._getQart()
      }

    },

    watch: {
        searchOrder(val,old) {
            let callBack=i =>{
                return i.indexOf(val.toUpperCase())> -1||i.indexOf(val)> -1
            };
            if (val=='') {
                this.resultList =(this.currentTab==0?this.tobeconfirmed:this.confirmed);
            }
            if (val && val.split('').some(i => !/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(i))) {//验证特殊字符
                console.log('特殊字符')
                this.searchOrder = old;
            }
            if (val) {
                let filterList=[];
                filterList =(this.currentTab==0?this.tobeconfirmed:this.confirmed);
                this.resultList = filterList.filter(item=> {
                    console.log(item.ownerPinYing.indexOf(val) )
                   return item.owner_tel.toString().indexOf(val) > -1||item.owner.indexOf(val) > -1||item.ownerPinYing.indexOf(val) > -1||item.owerFirstPY.some(callBack);

                })

            }
        },
      currentTab(val) {
        this.cancelPick();
        // typeof val === 'number' && !isNaN(val)
        //   ? this.tobeConfirmedPageIndex == 0 || this.confirmedPageIndex == 0 ? this.initList() : this.refreshList()
        //   : null;

      }
    },

    mounted(){
      this.tobeConfirmedPageIndex == 0 || this.confirmedPageIndex == 0 ? this.initList() : this.refreshList()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";

</style>
