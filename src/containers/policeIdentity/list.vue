<!--公安核验列表-->
<template>
  <article>
    <header class="tab-wrapper">
      <tab active-color="#5077AA">
        <tab-item v-for="(item,index) in tabMenu"
                  :key="index"
                  :class="{'vux-1px-r': index===0}"
                  :selected="currentTab === index"
                  @on-item-click="toggleTab(index)">{{item}}
        </tab-item>
      </tab>
    </header>
    <div class="searchTitle">
      <span>
          <x-input  placeholder="输入姓名查找" v-model="searchName"  @on-click-clear-icon="clearInput" @on-enter="searchItem">
          <i slot="label" style="padding-right:10px;display:block;" class="iconfont icon-sousuo" width="24" height="24"></i>
          </x-input>
      </span>
      <span @click="searchItem">查询</span>
    </div>
      <!--待处理列表-->
      <div v-show="!currentTab ">
        <scroller :pullup-config="Interface.scrollerUp"
                  @on-pullup-loading="loadingList0"
                  lock-x
                  use-pullup
                  height="-40"
                  v-model="tobeHandledScroller"
                  :scrollbarY=true bounce ref="scrollerBottom0">
          <div class="list-wrapper" >
            <p v-show="(!tobeHandled||tobeHandled.length === 0) && tobeHandledPageIndex > 0" class="no-data">暂无数据</p>
            <div class="todoListGroup" v-for="(item,index) in renderTodoHandelList">
              <div class="titleDate">{{titleFilter(index)}}</div>
              <div class="cell-body" :class="{'fontColorTip':true}">
                <p><span class="cell-key">姓名：</span><span class="cell-value "
                                                          :class="{redTip:item.identityStatus=='AUTO_REFUSED'||item.identityStatus=='FAILED'}">{{item.name}}</span>
                </p>
                <p><span class="cell-key">身份证：</span><span class="cell-value"
                                                           :class="{redTip:item.identityStatus=='AUTO_REFUSED'||item.identityStatus=='FAILED'}">{{idnumber(item.idCard)}}</span>
                  <span class="cell-right arrowRight">
                  {{datetimeparse(item.createdTime, 'hhmm')}}
                  <!--<img src="../../../static/icon/arow.png" alt="" class="cellImg">-->
                  <a href="javascript:void 0"class="cellImg iconfont icon-gengduo" @click="orderClick(item.lvyeReportRecordId)"></a>
                  </span>
                </p>
                <p v-if="item.scene==='UNDOCUMENTED_CHECK'">
                <span class="cell-value"
                      :class="{'redTip':item.identityStatus=='AUTO_REFUSED'||item.identityStatus=='FAILED','blueTip':item.identityStatus=='PENDING','greenTip':item.identityStatus=='AUTO_AGREED'}">
                  无证核验 {{item.identityStatus == 'AUTO_REFUSED' ? '验证不通过' : item.identityStatus == 'PENDING' ? '验证完成' : item.identityStatus == 'AUTO_AGREED' ? '验证通过' : item.identityStatus == 'FAILED' ? '验证失败' : '验证失败'}}
                </span>
                <p v-if="item.reportInStatus === 'FAILED'" class="redTip" style="border-top: 1px solid #eeeeee;margin-top: 0.5rem;padding-top: 0.5rem">
                    旅业上传失败
                  <span class="reportLvyeBtn" @click="reporetLvyes(item)">重新上传</span>
                </p>
              </div>
            </div>
          </div>
        </scroller>
      </div >
      <!--已处理列表-->
      <div v-show="currentTab" >
        <scroller :pullup-config="Interface.scrollerUp"
                  @on-pullup-loading="loadingList1"
                  lock-x
                  use-pullup
                  height="-40"
                  v-model="handledScroller"
                  scrollbarY bounce ref="scrollerBottom1" >
          <div class="list-wrapper" >
            <p v-show="(!handled||handled.length === 0) && handledPageIndex > 0" class="no-data">暂无数据</p>
            <div class="handledListGroup" v-for="(item,index) in renderHandelList">
              <div class="titleDate">{{titleHandledFilter(index)}}</div>
              <div class="cell-body" :class="{'fontColorTip':true}">
                <p>
                  <span class="cell-key">姓名：<span class="cell-value" >{{item.name}}</span></span>
                </p>
                <p>
                  <span class="cell-key">身份证：<span class="cell-value" >{{idnumber(item.idCard)}}</span></span>
                  <span class="cell-right arrowRight"  @click="orderClick(item.lvyeReportRecordId)">
                    <a href="javascript:void 0"class="cellImg iconfont icon-gengduo"></a>
                  </span>
                </p>
                <p style="height: 1rem">
                  <span style="float:right;color: #DF4A4A">{{item.identityStatus === 'REFUSED' ? '已拒绝' : ''}}</span>
                  <span style="float: right;color: #2986df">{{item.reportInStatus === 'SUCCESS' ? '已上传旅业' : ''}}</span>
                  <span style="float: right;color: #dfb321">{{item.reportInStatus === 'PENDING' ? '上传中' : ''}}</span>
                </p>
              </div>
            </div>
          </div>
        </scroller>
      </div>

    <!--///////////////以下是弹窗部分-->
    <footer v-if="route.params.tab == 0 &&tobeHandledConfig.enable_identity_check_undocumented==='true'">
      <div class="button-group">
        <x-button class="blue-btn" @onClick="showwithoutLicenseDialog()" value="无证核验"/>
      </div>
    </footer>

    <footer v-if="currentTab">
      <div class="listFilter">
    <span class="filter" @click="isCalendarShow = true">
    <abbr v-if="periodFilter[0]">{{datetimeparse(periodFilter[0])}} - {{datetimeparse(periodFilter[1])}}</abbr>
    <abbr v-else>筛选</abbr>
    </span>
      </div>
    </footer>

    <popup v-model="isCalendarShow" maskShow bottom animationTopBottom>
      <calendar v-model="periodFilter" @onReset="resetFilter" @onCancel="isCalendarShow = false"></calendar>
    </popup>
    <Dialog v-show="!select" v-model="showInfoDialog" confirm cancel @onCancel="infoDialogCancel"
            @onConfirm="setMultiConfirm">
      <ul class="dialog-info">
        <li class="info-col"><span class="dialog-key">姓名：</span><span
          class="dialog-value">{{selectedName.join()}}</span></li>
        <li class="info-col"><span class="dialog-key">房间：</span><span class="dialog-value">{{roomNumber}}</span></li>
        <li class="info-col"><span class="dialog-key">入住天数：</span><span class="dialog-value">{{days}}</span></li>
        <li class="info-col"><span class="dialog-key">入住日期：</span><span
          class="dialog-value">{{datetimeparse(inTimeFilter)}}</span></li>
        <li class="info-col"><span class="dialog-key">离店日期：</span><span
          class="dialog-value">{{datetimeparse(outTimeFilter)}}</span></li>
      </ul>
    </Dialog>
    <!--无证核验弹窗-->
    <div class="nocheckDialogs">
      <Dialog v-model="without_license" @onConfirm="makeSureVerify" confirm cancel cancelVal="取消" confirmVal="确定">
        <div class="withoutLicenseCon">
          <div class="title">无证核验</div>
          <group>
            <x-input title="姓名：" placeholder="核验人姓名"
                     :show-clear="true"
                     v-model="guestName"
                     placeholder-align="right"></x-input>
            <x-input title="身份证：" placeholder="核验人身份证号"
                     :show-clear="true"
                     v-model="idCard"
                     placeholder-align="right"></x-input>
            <x-input title="地址：" placeholder="核验人地址"
                     :show-clear="true"
                     type="text"
                     v-model="guestAddress"
                     placeholder-align="right"></x-input>
            <div class="onspace"></div>
            <div class="popup">
              <popup-picker title="民族："
                            :data="NationList"
                            v-model="defaultNation"
                            @on-change="nationOnChange"
                            :popup-style="{'z-index':'5002','max-height':'235px'}"></popup-picker>
              <div class="onspace"></div>
              <div v-if="getedEquipmentList.length>1">
                <popup-picker title="设备："
                              :data="EquipmentList"
                              v-model="defaultEquipment"
                              @on-change="EquipmentOnChange"
                              :popup-style="{'z-index':'5002','max-height':'235px'}"></popup-picker>
              </div>
            </div>
            <!--<div class="onspace"></div>-->
            <div class="Equipment" v-if="getedEquipmentList.length==1">
              <p>设备：</p>
              <p>{{sinerEquipmentName}}</p>
            </div>
          </group>

        </div>
      </Dialog>
    </div>

    <div class="noCheckAlert">
      <Dialog v-model="showAlert" title="提示" @onConfirm="showAlert=false" confirm confirmVal="确定">
        <div>金额不足暂无法使用，请及时充值！</div>
      </Dialog>
    </div>
    <!--////////////////////弹窗部分-->
  </article>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import {Tab, TabItem, XDialog, Group, XInput, PopupPicker, Picker, Popup,Scroller,Alert} from 'vux'
    module.exports = {
        name: 'List',
        components: {
            XDialog, Group, XInput, PopupPicker, Picker, Popup, Tab, TabItem,Scroller,Alert
        },
        data(){
            return {
//        tabMenu: ['待办理', '已办理'],
                showHandledList:false,
                tobeHandled: [],
                tobeHandledConfig: {},
                handled: [],
                mylist: [],
                batch: false,
                batchlist: [],
                tobeHandledPageIndex: 0,
                handledPageIndex: 0,
                periodFilter: [null, null],
                isCalendarShow: false,
                roomNumber: '',
                showDialog: false,
                showInfoDialog: false,
                select: true,
                resultList: [],
                isErrorNumber: false,
                canSearch: true,
                flag: true,
                without_license: false,
                guestName: '',
                idCard: '',
                guestAddress: '',
                NationList: [],
                getedNationList: [],
                EquipmentList: [],
                getedEquipmentList: [],
                sinerEquipmentName: '',
                defaultNation: ["汉族"],
                NationId: '01',
                devaiceId: '',
                defaultEquipment: [],//默认设备名称,
                handledScroller: {pullupStatus: 'default'},
                tobeHandledScroller:{pullupStatus: 'default'},
                onFetching0:false,
                onFetching1:false,
                offset0:0,
                offset1:0,
                currentPage:0,
                tobeHandledTotal:0,
                handledTotal:0,
                todayStart:'',
                todayEnd:'',
                showAlert:false,
                days: 1,
                inTimeFilter: Date.parse(new Date()),
                outTimeFilter: '',
                searchName:""
            }
        },
        computed: {
            ...mapState([
                'route',
                'Interface',
                'roomNumberList',
                'checkedOrder',
                'surplusTime'
            ]),
            renderList() {
                return NationList;
            },
            currentTab(){
                return parseInt(this.route.params.tab)//返回0，1
            },
            tabMenu() {
                let menu = [];
                menu[0] = `待处理(${this.tobeHandledTotal})`;
                if(this.showHandledList){
                    menu[1] = `已处理(${this.handledTotal})`;
                }
                return menu;
                // let menu = [];
                // menu[0] = `待处理`;
                // menu[1] = `已处理`;
                // return menu;
            },
            renderTodoHandelList(){
                return this.tobeHandled
            },
            renderHandelList(){
                return this.handled;
            },
            renderList(){
                return this.currentTab ? this.sortByTime(this.handled, 'createdTime') : this.tobeHandled

            },
            renderPageIndex(){
                return this.currentTab ? this.handledPageIndex : this.tobeHandledPageIndex
            },
            selectedName() {
                let names = [];
                this.tobeHandled.forEach(i => {
                    let tempIndex = this.batchlist.findIndex(id => i.lvyeReportRecordId === id);
                    tempIndex > -1 && names.push(i.name);
                });
                return names;
            },
            isDisabled(){
                if (this.roomNumberList.length > 0) {
                    let isRightInputRoomNumber = this.roomNumberList.some(i => i === this.roomNumber);
                    return !this.roomNumber || (typeof this.days === 'string' && !this.days ) || !this.inTimeFilter || !this.outTimeFilter || this.isErrorNumber || !isRightInputRoomNumber
                } else {
                    return !this.roomNumber || (typeof this.days === 'string' && !this.days ) || this.days < 0 || !this.inTimeFilter || !this.outTimeFilter || this.isErrorNumber
                }
            }
        },
        methods: {
            ...mapActions([
                'replaceto',
                'goto',
                'reportLvYe',
                'newIdentityList',
                'getNationality',//民族列表
                'hotelEquipment',//设备列表
                'withoutIdCard',//设备列表
                'getRoomNumberList',
                'getShowPoliceConfigs',
                'showtoast'

                // 'forwardTo'
            ]),
            ...mapMutations([
                'CHECKORDERITEM'
            ]),
            clearInput(){
                console.log(2324)
            },
            reporetLvyes(item){
                this.reportLvYe({
                    lvyeReportRecordIds: item.lvyeReportRecordId.split(' '),//旅业上报记录Id
                    roomNumber: item.roomNumber,//房间号
                    nights: +this.days,//入住晚数
                    inTime: this.inTimeFilter,//入住时间
                    outTime: this.outTimeFilter,//离店时间
                    guestType:item.guestType,
                    onsuccess: () => {
                        this.initList();
                    }
                })
            },
            showwithoutLicenseDialog(){
                if(this.surplusTime==0){
                    this.showAlert=true;
                }else {
                    this.Nationality();
                    this.gethotelEquipment();
                    this.without_license = true
                }
            },
            nationOnChange(val){
                console.log('val是', val)
                this.NationId = ''
                for (var i = 0; i < this.getedNationList.length; i++) {
                    if (val[0] == this.getedNationList[i].nation_name) {
                        this.NationId = this.getedNationList[i].nation_id
                    }
                }
                // console.log('民族Id是', this.NationId)
            },
            EquipmentOnChange(val){
                console.log('val是', val)
                this.devaiceId = ''
                for (var i = 0; i < this.getedEquipmentList.length; i++) {
                    if (val[0] == this.getedEquipmentList[i].name) {
                        this.devaiceId = this.getedEquipmentList[i].id
                    }
                }
                // console.log('设备Id是', this.devaiceId)
            },
            //民族列表
            Nationality(){
                let temp = [];
                let temp2 = [];
                this.NationList = []
                this.getNationality({
                    onsuccess: body => {
                        temp = body.data
                        this.getedNationList = body.data
                        for (var i = 0; i < temp.length; i++) {
                            temp2.push(temp[i].nation_name);
                        }
                        this.NationList.push(temp2)
                        console.log(this.NationList)
                    }

                })
                console.log(this.NationList)
            },

            //设备列表
            gethotelEquipment(){
              let temp = [];
              let temp2 = [];
              this.EquipmentList = []
              this.sinerEquipmentName = ''
              this.getedEquipmentList = []
              this.defaultEquipment = []
              this.hotelEquipment({
                onsuccess: body => {
                  temp = body.data;
//                  console.log('设备列表是',temp)
                  if (temp && temp != null) {
                    this.getedEquipmentList = body.data;
                    this.sinerEquipmentName = body.data[0].name;
                    this.defaultEquipment.push(body.data[0].name)
                    this.devaiceId = body.data[0].id
                    for (var i = 0; i < temp.length; i++) {
                      temp2.push(temp[i].name);
                    }
                    this.EquipmentList.push(temp2);
                    console.log('-------->', this.sinerEquipmentName)
                  }
                }


              })

            },

      //      取消核验
            cansoleVerify(){
              console.log(this.guestName, this.idCard, this.guestAddress)
              this.without_license = false
            },

      //      确认核验
            makeSureVerify(){
                if(this.guestName!=''&& this.idCard!=''&& this.guestAddress!=''){
                    this.withoutIdCard({
                        guest_name: this.guestName,
                        id_card: this.idCard,
                        nation_id: this.NationId,
                        address: this.guestAddress,
                        device_id: this.devaiceId,
                        onsuccess: (body) => {
                            this.without_license = false
                        }
                    })
                }else {
                    return;
                }


            },

            //标题日期筛选
            titleFilter(index){
              if (this.tobeHandled.length > 0) {
                return index
                  ? this.datetimeparse(this.tobeHandled[index].createdTime) === this.datetimeparse(this.tobeHandled[index - 1].createdTime)
                    ? null : this.datetimeparse(this.tobeHandled[index].createdTime)
                  : this.datetimeparse(this.tobeHandled[index].createdTime)
              }
            },
            resultPick(item) {
              this.canSearch = false;
              this.roomNumber = item;
              this.resultList = [];
              this.isErrorNumber = false
            },
            infoDialogCancel(){
              this.showInfoDialog = false;
              this.select = true;
              this.showDialog = true;
            },
            isInfoDialogShow() {
              if (!this.isDisabled) {
                this.select = false;
                this.resultList = [];
                this.showDialog = false;
                this.showInfoDialog = true;
              }
            },
            daysReduce() {
              this.days >= 1 ? this.days = +this.days - 1 : null
            },
            daysAdd() {
              this.days <= 30 ? this.days = +this.days + 1 : null
            },
            titleHandledFilter(index){
              if (this.handled.length > 0) {
                return index
                  ? this.datetimeparse(this.handled[index].createdTime) === this.datetimeparse(this.handled[index - 1].createdTime)
                    ? null : this.datetimeparse(this.handled[index].createdTime)
                  : this.datetimeparse(this.handled[index].createdTime)
              }
            },
            goPick(){
              // 批量选择
              this.batchlist = [];
              this.batch = true;
            },
            cancelPick(){
              // 退出批量选择
              this.batchlist = [];
              this.batch ? this.batch = false : null;
              this.select = true;
              this.roomNumber = '';
            },
            orderClick (lvyeReportRecordId) {
              //非批量模式下点击订单跳转至详情页面
              if (!this.batch) {
                this.batchlist = [];
                this.goto('/policeIdentity/'+lvyeReportRecordId)
              }
            },
            setMultiConfirm() {
              if (this.batchlist.length !== 0 && this.roomNumber && +this.days >= 0 && this.inTimeFilter && this.outTimeFilter) {
                this.reportLvYe({
                  lvyeReportRecordIds: this.batchlist,
                  roomNumber: this.roomNumber, //房间号码
                  nights: +this.days, //入住几晚
                  inTime: this.inTimeFilter, //入住几晚
                  outTime: this.outTimeFilter, //入住几晚
                  onsuccess: () => {
                    this.batchlist.forEach(item => {
                      let tempIndex = this.tobeHandled.findIndex(i => i.lvyeReportRecordId === item);
                      tempIndex > -1
                        ? this.tobeHandled.splice(tempIndex, 1)
                        : null
                    });
                    this.cancelPick()
                  },
                  onfail: (body) => {
                    this.showDialog = false;
                    this.select = true;
                  }
                })
              }
            },
            getList(callback, reportInStatus,timeStart,timeEnd,searchName,page) {
                this.newIdentityList ({
                    data: {
                        createTimeStart:timeStart,
                        createTimeEnd:timeEnd,
                        // identityStatuses: identStatus,
                        reportInStatuses: reportInStatus,//需要的入住上报旅业状态
                        desc: true,
                        name:searchName
                    },
                    limit:15,
                    offset:page,
                    onsuccess: callback
                })
            },
              //tab切换时
            toggleTab(index){
                let newpath = this.route.path.replace(this.route.params.tab, index);
                this.replaceto(newpath)
                this.initList();
            },
             //未处理下拉刷新列表加载
            loadingList0() {
                if (this.onFetching0) {
                    console.log ('不能再请求1了')
                    // do nothing
                    return;
                } else {
                    setTimeout(() => {
                        this.offset0=this.offset0+15;
                        this.getList(((body,headers) => {
                            this.tobeHandledTotal=headers.get('x-total-count');
                            this.tobeHandled = [...this.tobeHandled,...body.data.content];
                            this.tobeHandledScroller.pullupStatus = 'default';
                            if(body.data.content=null||body.data.content.length==0) {
                                this.tobeHandledScroller.pullupStatus = 'disabled';
                            };
                        }), ["NONE","PENDING","FAILED"],'','',this.searchName,this.offset0);
                        //$nextTick是为了数据改变了等待dom渲染后使用
                        this.$nextTick(() => {
                            this.$refs.scrollerBottom0.reset();
                        });
                        this.onFetching0 = false
                    }, 500);
                }
            },
            //已处理下拉刷新加载
            loadingList1(){
                let searchName='';
                if (this.onFetching1) {
                    console.log('不能再请求0了')
                    // do nothing
                    return;
                }else{
                    this.onFetching1 = true;
                    setTimeout(() => {
                        this.offset1=this.offset1+15;
                        this.getList(((body,headers) => {
                            this.handledTotal=headers.get('x-total-count');
                            this.handled = [...this.handled,...body.data.content];
                            this.handledScroller.pullupStatus = 'default';
                            if(body.data.content=null||body.data.content.length==0) {
                                this.handledScroller.pullupStatus = 'disabled';
                            };
                        }),["SUCCESS","UNREPORTED"],this.todayStart,this.todayEnd,this.searchName,this.offset1);
                        //$nextTick是为了数据改变了等待dom渲染后使用
                        this.$nextTick(() => {
                            this.$refs.scrollerBottom1.reset();
                        });
                        this.onFetching1= false
                    }, 500);
                }
            },
            //切换列表
            toggleTab(index){
                let newpath = this.route.path.replace(this.route.params.tab, index);
                this.replaceto(newpath)
                this.initList();
            },
            searchItem(){
                if(this.currentTab==0){
                    this.initTobeHandled(this.searchName);
                }else {
                    this.initHandled(this.searchName);
                }
            },
            //待处理列表
            initTobeHandled(searchName){
                this.getList(((body,headers) => {
                    this.tobeHandledTotal=headers.get('x-total-count');
                    this.tobeHandled = [...body.data.content];
                    this.tobeHandledConfig = {...body.data.config};
                    this.tobeHandledScroller.pullupStatus='enabled';
                    if(body.data.content=null||body.data.content.length==0||this.tobeHandledTotal<=15) {
                        this.tobeHandledScroller.pullupStatus = 'disabled';
                    };
                    this.$nextTick(() => {
                        this.$refs.scrollerBottom0.reset({top:0});
                    });
                }), ["NONE","PENDING","FAILED"],'','',searchName,0);
            },
            //已处理列表
            initHandled(searchName){
                this.getList(((body,headers) => {
                    this.handledTotal=headers.get('x-total-count');
                    this.handled = [...body.data.content];
                    this.handledScroller.pullupStatus = 'enabled';
                    if(body.data.content=null||body.data.content.length==0||this.handledTotal<=15) {
                        this.handledScroller.pullupStatus = 'disabled';
                    };
                    this.$nextTick(() => {
                        this.$refs.scrollerBottom1.reset({top:0});
                    });
                }), ["SUCCESS","UNREPORTED"],this.todayStart,this.todayEnd,searchName,0);
            },
            //初始化列表
            initList(){
                let str='';
                this.initTobeHandled(str);
                this.initHandled(str);
            },
            resetList(){
                this.handled = [];
                this.tobeHandled = [];
            },
            resetFilter() {
                this.periodFilter = [null, null]
            },
            getConfig(){
                this.getShowPoliceConfigs({
                    onsuccess:(body)=> {
                        if (body.data=='true') {
                            this.showHandledList = true
                        }
                    }
                });
            }
        },
        mounted(){
            this.todayStart=this.timeFetch().todayStart;
            this.todayEnd=this.timeFetch().todayEnd;
            this.initList();
            this.getRoomNumberList();
            this.getConfig();
            this.days === 1 && (this.outTimeFilter = new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000));

            },
        watch: {
            periodFilter(){
                this.initList();
            },

            days(val, old) {
                if (val && !/^\d+$/.test(val) && !/^[0-9]*$ /.test(val)) {
                    this.days = 0;
                }
                if (val > 31) {
                    this.days = 0;
                }
                let nowDate = new Date();
                let tempTime = nowDate.setTime(nowDate.getTime() + 24 * 60 * 60 * 1000 * this.days);
                this.outTimeFilter = tempTime;
            },
            roomNumber(val, old) {
                if (!val) {
                    this.resultList = [];
                    this.isErrorNumber = false;
                }
                if (!this.canSearch) {
                    return;
                }
                if (val && val.split('').some(i => !/^[A-Za-z0-9]+$/.test(i))) {//验证特殊字符，不支持中文，只能字母和数字
                    this.roomNumber = old
                }
                if (this.roomNumberList.length > 0 && val) {
                    this.resultList = [];
                    this.resultList = this.roomNumberList.filter(room => room.toString().indexOf(val) > -1);
                    if (this.resultList.length === 0) {
                        this.isErrorNumber = true;
                    }
                }
            },
            resultList(val, old) {
                if (old.length > 0) this.canSearch = true
            }
        }
    }
</script>

<style lang="less" scoped>
  @import "index.less";
  article{
    /*margin-bottom: 4rem;*/
    height: 100%;
  }
  .policeWrap{
    padding-bottom: 0;
  }
  .list-wrapper{
    position: relative;
    padding-top: 0;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
  }
  .xs-container{
    /*padding-top: 2rem;*/
  }
  .icon-gengduo{
    display: inline-block;

    color: #4A4A4A;
    &:before{
      width: 2rem;
      height: 2rem;
    }
  }
  .reportLvyeBtn{
    display: inline-block;
    width: 5rem;
    height: 1.8rem;
    background: #3F6CA5;
    color: #FFFFFF;
    text-align: center;
    float: right;
    border-radius: 3px;
  }
  /*.icon-gengduo{*/
    /*color: #3F6CA5;*/
    /*font-size: 18px;*/
  /*}*/
</style>
