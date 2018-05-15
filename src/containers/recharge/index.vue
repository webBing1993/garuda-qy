<!--订单中心-->
<template>
  <article>
    <header class="tab-wrapper">
      <tab active-color="#5077AA">
        <tab-item v-for="(item,index) in tabMenu"
                 :key="index"
                 :selected="currentTab === index"
                 @click.native="replaceto('/recharge/'+index)">{{item}}
        </tab-item>
      </tab>
    </header>
    <div class="list-wrapper">
      <div v-if="currentTab === 0">
        <!--首冲-->
        <div class="rechargeContent">
          <div class="row">
            <span class="title">酒店名称</span>``````````````````````````
            <span>{{hotelRechargeInfo.hotel_name}}</span>
          </div>
          <div  v-if="!hotelRechargeInfo.is_first">
            <div class="row">
              <span class="title">余额</span>
              <span>￥{{hotelRechargeInfo.balance}}</span>
            </div>
            <div class="row">
              <span class="title">使用次数</span>
              <span>{{usedNum}}</span>
              <span class="dateShow" @click="isCalendarShow=true">
               {{datetimeparse(periodFilter[0],'YYYYMMDD')-datetimeparse(periodFilter[1],'YYYYMMDD')}} <x-icon type="ios-arrow-down"  size="18" class="chargeIcon"></x-icon>
              </span>
            </div>
            <div class="row">
              <span class="title">剩余次数</span>
              <span>{{hotelRechargeInfo.surplus_time}}</span>
            </div>
          </div>
        </div>
        </div>
      <div v-if="currentTab === 1">
        <div class="rechargeContent1" v-for="(item,index) in Rechargelist">
          <div class="clo">
            <p class="title">充值时间</p>
            <p class="cont">{{datetimeparse(item.recharge_time,'YYYYMMDDhhmm')}}</p>
          </div>
          <div class="clo">
            <p class="title">充值金额</p>
            <p class="cont">{{item.pay_fee}}</p>
          </div>
          <div class="clo">
            <p class="title">充值方式</p>
            <p class="cont">{{item.pay_way}}</p>
          </div>
        </div>
      </div>
      <div v-if="currentTab === 2">
        <div class="rechargeContent1">
          <div class="clo">
            <p class="title">姓名</p>
            <p class="cont">张三的歌</p>
          </div>
          <div class="clo">
            <p class="title">身份证号码</p>
            <p class="cont">1233456767890987654</p>
          </div>
          <div class="clo">
            <p class="title">查验结果</p>
            <p class="cont">isOK</p>
          </div>
        </div>
      </div>
    </div>
    <popup v-model="isCalendarShow"
           maskShow
           bottom
           animationTopBottom>
      <calendar v-model="periodFilter" @onReset="resetFilter" @onCancel="isCalendarShow = false"></calendar>
    </popup>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import {XDialog, PopupRadio, PopupPicker, Picker,Tab, TabItem,Group
  } from 'vux'

  export default{
    name: "recharge",

    components: {
      XDialog,
      PopupRadio,
      PopupPicker,
      Picker,
      Tab,
      TabItem,
      Group,
    },

    data(){
      return {
          hotelRechargeInfo:{},
          Rechargelist: [],
          isFirstRech:true,
          usedNum:'',
          date:'',
          isCalendarShow:false,
          periodFilter:[]

      }
    },

    computed: {
      ...mapState([
        'Interface',
        'route',
        'hotel'
      ]),
      currentTab(){
        console.log(this.route.params.tab)
        return parseInt(this.route.params.tab)
      },
      renderList() {
        if (this.currentTab == 0) {
            return this.hotelRechargeInfo
        } else if (this.currentTab == 1) {
          return this.Rechargelist
        } else if (this.currentTab == 2) {

        }
      },
      tabMenu() {
        let menu = [];
//        menu[0] = `待确认(${this.tobeconfirmed.length})`;
//        menu[1] = `已确认(${this.confirmed.length})`;
        menu[0] = `充值()`;
        menu[1] = `充值详情()`;
        menu[2] = `核验详情(1)`;
        return menu;
      }
    },

    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        "getRechargeInfo",
        "getRechargelist",
        "getRechargeUsedNum"
      ]),
      _getRechargelist(){
        this.Rechargelist = [];
        this.Rechargelist = [
          {
            "recharge_time": 1511582381000,
            "pay_way": "支付宝",
            "pay_fee": 3000
          },
          {
            "recharge_time": 1511582381000,
            "pay_way": "银联",
            "pay_fee": 3000
          },
          {
            "recharge_time": 1511582381000,
            "pay_way": "微信支付",
            "pay_fee": 3000
          }]
        this.getRechargelist({
            hotel_id: this.hotel.hotel_id,
            onsuccess: body => {
               this.Rechargelist = [...body];
           }
        })
      },
        //获取充值信息
        resetFilter(){
          this.periodFilter='';
          this.isCalendarShow=false
        },
      getRechargeInfos(){
        this.getRechargeInfo({
          hotel_id: this.hotel.hotel_id,
          onsuccess: body => (this.hotelRechargeInfo = body.data)
        })

      },
        getUsedNum(){
          this.getRechargeUsedNum({
              hotelId:this.hotel.hotel_id,
              onsuccess:body=>{
                  this.usedNum=body.data;
              }
          })
        },
      inputShow(){
      },
      initList(){
        this._getRechargelist();
      },
      refreshList(){

      },
      GETFAKEDATA(){
          this.hotelRechargeInfo={
              "hotel_name": "充值测试酒店",
              "balance": 300,
              "surplus_time": 30,
              "pay_fee": 3000,
              "is_first":false
          }
      },
      onChange(){

      }
    },

    watch: {
//      currentTab: function (val, oldval) {
//        this.cancelPick();
//        typeof val === 'number' && !isNaN(val)
//          ? this.tobeConfirmedPageIndex == 0 || this.confirmedPageIndex == 0 ? this.initList() : this.refreshList()
//          : null;
//      }
        periodFilter(val){
            if(val!==''){
                this.getUsedNum()
            }
        }
    },

    mounted(){
      // this.initList();
      // this.getRechargeInfos();
        this.getUsedNum();
      this.GETFAKEDATA()
    }
  }
</script>

<style scoped lang="less">
  @import "./index.less";
</style>
