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

    <!--<switchs title="aa"></switchs>-->
    <div class="list-wrapper">
        <div class="orderTitle">
          <span @click="syncTime">同步</span>
          <span>
            <x-input  placeholder="输入手机号或姓名拼音快速索引" v-model="searchOrder">
            <i slot="label" style="padding-right:10px;display:block;" class="iconfont icon-sousuo" width="24" height="24"></i>
            </x-input>
          </span>
        </div>
      <div v-show="!currentTab" :class="{batch}">
        <p v-show="(!tobeconfirmed||tobeconfirmed.length === 0) && tobeConfirmedPageIndex > 0" class="no-data">暂无数据</p>
        <!--<checker type="checkbox" v-model="batchlist"-->
                 <!--default-item-class="checker-item" selected-item-class="selected">-->
          <!--<checker-item v-for="(item,index) in tobeconfirmed" :key="index" :value="item.order_id">-->
            <!--<Group>-->
              <!--<Cell :title="getCellTitle(item)"></Cell>-->
              <!--<Cell :title="getTobeConfirmedCellBody(item)" link @onClick="orderClick(item.order_id)"/>-->
              <!---->
              <!--<Cell v-if="item.remark" :title="getCellFooter(item)"/>-->
            <!--</Group>-->
          <!--</checker-item>-->
        <!--</checker>-->
        <div class="orderCell" v-for="(item,index) in renderList" :key="index">
          <div class="orderCellTitle">
            <div>
              <span class="orderCellKey">订单号：</span>
              <span>{{item.order_pmsid}}</span>
            </div>
            <div v-if="item.prepay_code==null">
              <span class="cell-right other" @click="showStatusDialog(item)">{{item.precheckin_status==1?'未确认':item.payinfo.pay_mode==1?'房费现付':'不需房费现付'}}<i v-if="item.precheckin_status==6" class="iconfont icon-huodongbiaoqian"></i> </span>
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
                <!--<span>¥{{item.payinfo.pms_pay*1000}}</span>-->
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
              <span class="cell-right other" @click="(confirmOrderStatus=true,checkIndex=0,checkItem=item)">{{item.precheckin_status==1?'未确认':item.payinfo.pay_mode==1?'房费现付':'不需房费现付'}}<i v-if="item.precheckin_status==6" class="iconfont icon-huodongbiaoqian"></i> </span>
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
                <!--<span>¥{{item.payinfo.pms_pay*1000}}</span>-->
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

    <footer v-show="route.params.tab == 1">
      <div class="listFilter">
         <span class="filter" @click="showDialog">
            <abbr>筛选</abbr>
         </span>
      </div>
    </footer>

    <div class="dialog">
      <Dialog v-model="IsshowDialog" mask-z-index="1">
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
          <div>
            <div class="invoiceBtn" @click=cancel>取消</div>
            <div class="invoiceBtn" @click=confirmHandle>确定</div>
          </div>
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
    <Dialog confirm cancel v-model="confirmOrderStatus" @onConfirm="confirmOrder" confirm cancel>
      <h3 style="text-align: left;color: #000000;margin-bottom: 2rem">请确认订单状态</h3>
      <ul v-for="(item,index) in statusList">
        <li class="orderStatusBtn" :class="{checkStatus:index+1==checkIndex}" @click="(checkIndex=index+1,payMode=item.value)">{{item.name}}</li>
      </ul>
      <div style="text-align: left;color: #000000;margin-bottom: 2rem" v-if="!freeDepositCheck">
        <span>不需支付押金</span><input type="checkbox" style="margin-left: 1rem;width: 1rem;height:1rem;" v-model="freeDeposit">
      </div>
    </Dialog>
    <!--<div id="qrcode" ref="qrcode"></div>-->
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import {XDialog, PopupRadio, PopupPicker, Picker, Popup,XInput,Tab, TabItem} from 'vux'


  export default{
    name: "prepay",

    components: {
      XDialog,
      PopupRadio,
      PopupPicker,
      Picker,
      Popup,
      XInput,
      Tab,
      TabItem
    },

    data(){
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
        confirmOrderStatus:false,
        checkIndex:1,
        statusList:[{name:'房费现付',value:1},{name:'不需现付房费',value:2}],
        payMode:1,
        freeDeposit:false,
        checkItem:{},
          searchOrder:'',
          resultList:[]
      }
    },
    filters:{
        filterStayDay(val){
            return Math.ceil((val.out_time-val.in_time)/3600000/24)+'晚'
        }
    },
    computed: {
      ...mapState([
        'Interface',
        'route',
        'hotel',
          'isFreeDeposit'
      ]),
        freeDepositCheck(){
            return this.isFreeDeposit!==null&&this.isFreeDeposit=='true'?true:false
        },
      currentTab(){
        return parseInt(this.route.params.tab)
      },

      renderList(){
          return this.resultList;
      },

      tabMenu() {
        let menu = [];
        menu[0] = `待确认(${this.tobeconfirmed.length})`;
        menu[1] = `已确认(${this.confirmed.length})`;
        return menu;
      }
    },

    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'getconfirmelist',
        'filtrateConfirmelist',
        'multiconfirm',
        'hotelrefresh',
        'searchRoom',
        'changeStatus'
      ]),
        showStatusDialog(item){
            this.confirmOrderStatus=true,
            this.payMode=item.payinfo.pay_mode,
            this.checkIndex=0,
            this.checkItem=item
        },
        //弹出对话框改订单状态
        confirmOrder(){
            console.log('checkItem:',this.checkItem)
            this.changeStatus({
                data:{
                    order_id:this.checkItem.order_id,
                    hotel_id:this.hotel.hotel_id,
                    pay_mode:this.payMode,
                    is_free_deposit:this.freeDeposit
                },
                onsuccess:(body=>{
                    this.refreshList()
                })
            })
        },
        tabToggle(index){
            this.replaceto('/prepay/'+index);
            if(this.currentTab==1){
                this.resultList =this.confirmed;
            }else if(this.currentTab==0){
                this.resultList =this.tobeconfirmed;
            }
            console.log('this.resultList:',this.resultList);
        },
      confirmMode(item){
        return item.payinfo
          ? item.payinfo.confirm_mode === 2 ? '(手动确认)' : ''
          : ''
      },

      getCellTitle(item){
        // let paystatus = item.payinfo.pay_mode;
        let paystatusdom = ``
        // if (paystatus) {
          // paystatusdom = paystatus === 1
          //   ? `<span class="cell-right other">现付 <abbr style="color: #4A4A4A">${this.confirmMode(item)}</abbr></span>`
          //   : paystatus === 2
          //     ? `<span class="cell-right primary">预付 <abbr style="color: #4A4A4A">${this.confirmMode(item)}</abbr></span>`
          //     : `<span class="cell-right warn" style="display: flex;flex-direction: column;text-align: right">后付/挂账/公账等 <abbr style="color: #4A4A4A">${this.confirmMode(item)}</abbr></span>`
        // }
          paystatusdom=`<span class="cell-right other" @click="confirmOrderStatus=true,checkIndex=0,checkItem=item">${item.precheckin_status==1?'未确认':item.pay_mode==1?'房费现付':'不需房费现付'}<i v-if="item.precheckin_status==6" class="iconfont icon-huodongbiaoqian"></i> </span>`


          return `<p><span class="cell-key">订单号：</span><span class="cell-value">${item.order_pmsid}</span>${paystatusdom || ''}</p>`
      },

      getTobeConfirmedCellBody(item){
        let roomtypewords = ''
        item.rooms_plan.forEach(i => roomtypewords += (i.room_type + 'x' + i.room_count))
        let paiddom = item.payinfo.staff_pay !== null ? `<span class="cell-right"><span class="cell-key">已付：</span>${'¥' + (item.payinfo.staff_pay / 100 || 0)}</span>` : ``

        return `<div class="cell-body">` +
          `<p><span class="cell-key">预订人：</span><span class="cell-value">${item.owner + ' ' + item.owner_tel}</span></p>` +
          `<p><span class="cell-key">房型：</span><span class="cell-value">${roomtypewords}</span></p>` +
          `</div>`
      },

      getCellBody(item){
        let roomtypewords = ''
        item.rooms_plan.forEach(i => roomtypewords += (i.room_type + 'x' + i.room_count))
        let paiddom = item.payinfo.staff_pay !== null ? `<span class="cell-right"><span class="cell-key">已付：</span>${'¥' + (item.payinfo.staff_pay / 100 || 0)}</span>` : ``

        return `<div class="cell-body">` +
          `<p><span class="cell-key">预订人：</span><span class="cell-value">${item.owner + ' ' + item.owner_tel}</span></p>` +
          `<p><span class="cell-key">房型：</span><span class="cell-value">${roomtypewords}</span></p>` +
          `<p><span class="cell-key">分享码：</span><span style="color: #32ABE5" class="cell-value">${item.share_code ? item.share_code : '暂无分享码'}</span></p>` +
          `</div>`
      },

      getCellFooter(item){
        return `<p><span class="cell-key">备注：</span><span class="cell-value">${item.remark}</span></p>`
      },

      goPick(){
        // 批量选择
        this.batchlist = []
        this.batch = true
      },

      cancelPick(){
        // 退出批量选择
        this.batchlist = []
        this.batch ? this.batch = false : null
      },

      allPick(){
        // 全选和取消全选
        if (this.batchlist.length === this.tobeconfirmed.length) {
          this.batchlist = []
        } else {
          this.batchlist = [];
          this.tobeconfirmed.forEach(
            item => this.batchlist.push(item.order_id)
          )
        }
      },

      orderClick: function (orderId) {
        //非批量模式下点击订单跳转至详情页面
        if (!this.batch) {
          this.batchlist = []
          this.goto('/prepay/detail/' + orderId)
        }
      },

      setMultiConfirm() {
        if (this.batchlist.length != 0) {
          this.multiconfirm({
            order_ids: this.batchlist,
            onsuccess: () => {
              this.batchlist.forEach(item => {
                let tempIndex = this.tobeconfirmed.findIndex(i => i.order_id === item);
                tempIndex > -1
                  ? this.tobeconfirmed.splice(tempIndex, 1)
                  : null
              });
              this.cancelPick()
            }
          })
        }
      },

      syncTime(){
        this.hotelrefresh({
          onsuccess: (body) => this.refreshList()
        })
      },

      getList(status, callback){
        this.getconfirmelist({
          precheckin_status: status,
          like_owner: '',
          pms_room_type_id: '',
          onsuccess: callback
        })
      },

      initList(){
        this.tobeConfirmedPageIndex = 0
        this.confirmedPageIndex = 0
        if (this.renderList.length === 0) {
          this.getList(1, body => {
              this.tobeconfirmed = [...body.data];
              this.tobeConfirmedPageIndex++;
              this.resultList=this.tobeconfirmed;
          })
          this.getList(2, body => (this.confirmed = [...body.data], this.confirmedPageIndex++))
        }
      },

      refreshList(){
        this.tobeconfirmed = []
        this.confirmed = []
        if (this.currentTab == 0) {
          this.getList(1, body => {
              this.tobeconfirmed = [...body.data];
              this.resultList=this.tobeconfirmed
          })
        } else if (this.currentTab == 1) {
          this.getList(2, body => {
              this.confirmed = [...body.data];
              this.resultList=this.confirmed
          })
        }
//        this.getList(this.currentTab+1, body => this.currentTab==2 ? this.confirmed = [...body.data] : this.tobeconfirmed = [...body.data])

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
            // console.log(old)
            console.log(val)
            if (val=='') {
                this.resultList =(this.currentTab==0?this.tobeconfirmed:this.confirmed);
            }
            if (val && val.split('').some(i => !/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(i))) {//验证特殊字符
                console.log('特殊字符')
                this.searchOrder = old;
            }
            if (this.resultList.length > 0 && val) {
                this.resultList = this.resultList.filter(item=> item.owner_tel.toString().indexOf(val) > -1||item.owner.indexOf(val) > -1);
                console.log(this.resultList)
            }
        },
      currentTab(val) {
        this.cancelPick();
        // typeof val === 'number' && !isNaN(val)
        //   ? this.tobeConfirmedPageIndex == 0 || this.confirmedPageIndex == 0 ? this.initList() : this.refreshList()
        //   : null;
          this.initList()
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
