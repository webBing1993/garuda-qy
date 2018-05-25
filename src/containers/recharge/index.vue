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
            <span class="title">酒店名称</span>
            <span>{{hotelRechargeInfo.hotel_name}}</span>
          </div>
          <!--续冲-->
          <div  v-if="!hotelRechargeInfo.is_first">
            <div class="row">
              <span class="title">余额</span>
              <span>￥{{hotelRechargeInfo.balance/100}}</span>
            </div>
            <div class="row">
              <span class="title">总使用次数</span>
              <span>{{usedNum}}</span>
              <span class="filterBtn" @click="isCalendarShow=true" v-if="flag">筛选</span>
              <span class="dateShow" @click="isCalendarShow=true" v-if="!flag">
               {{datetimeparse(periodFilter[0],'YYYYMMDD')+' - '+datetimeparse(periodFilter[1],'YYYYMMDD')}} <x-icon type="ios-arrow-down"  size="18" class="chargeIcon"></x-icon>
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
            <p class="cont">{{item.pay_fee/100}}</p>
          </div>
          <!--<div class="clo">-->
            <!--<p class="title">充值方式</p>-->
            <!--<p class="cont">{{item.pay_way}}</p>-->
          <!--</div>-->
        </div>
      </div>
      <div v-if="currentTab === 2">
        <div class="rechargeContent1" v-for="item in noIdentityDetailList">
          <div class="clo">
            <p class="title">姓名</p>
            <p class="cont">{{item.name}}</p>
          </div>
          <div class="clo">
            <p class="title">身份证号码</p>
            <p class="cont">{{idnumber(item.idcard)}}</p>
          </div>
          <div class="clo">
            <p class="title">查验结果</p>
            <p class="cont" :class="{redTip:item.status=='REFUSED'||item.status=='AUTO_REFUSED'||item.status=='FAILED','blueTip':item.status=='PENDING','greenTip':item.status=='AUTO_AGREED'||item.status=='AGREED'}">{{item.status|filterResult}}</p>
          </div>
        </div>
      </div>
    </div>
    <popup v-model="isCalendarShow"
           maskShow
           bottom
           animationTopBottom>
      <calendar v-model="periodFilter"  :titleBar=false  @onCancel="isCalendarShow = false"></calendar>
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
          periodFilter:[null,null],
          offset:0,
          page:1,
          limit:50,
          limit2:50,
          noIdentityDetailList:[],
          flag:true
      }
    },
    filters:{
        filterResult(val){
            switch (val){
                case 'REFUSED':
                    return '拒绝' ;
                case 'PENDING':
                    return '待审核';
                case 'AGREED':
                    return '通过';
                case 'AUTO_AGREED':
                    return '自动通过';
                case 'AUTO_REFUSED':
                    return '自动拒绝';
                case 'FAILED':
                    return '验证失败'
            }
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
      tabMenu() {
        let menu = [];
//        menu[0] = `待确认(${this.tobeconfirmed.length})`;
//        menu[1] = `已确认(${this.confirmed.length})`;
        menu[0] = `充值`;
        menu[1] = `充值详情(${this.Rechargelist.length})`;
        menu[2] = `核验详情(${this.noIdentityDetailList.length})`;
        return menu;
      }
    },

    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        "getRechargeInfo",
        "getRechargelist",
        "getRechargeUsedNum",
        'getNoIdentityDetailList'
      ]),
        //
        // resetFilter(){
        //   this.periodFilter=[null,null];
        //   this.isCalendarShow=false
        // },
        //获取充值信息
      getRechargeInfos(){
          try{
              this.getRechargeInfo({
                  hotel_id: this.hotel.hotel_id,
                  onsuccess: body => {
                      if(body.data){
                          this.hotelRechargeInfo = body.data;
                          this.usedNum= body.data.use_time;
                      }
                  }
              })
          }catch (err){
              console.log('zsj',err)
          }


      },
        //充值列表
      getRechargelists(){
        this.getRechargelist({
            offset:this.offset,
            limit:this.limit,
            hotel_id: this.hotel.hotel_id,
            onsuccess: body => {
                this.Rechargelist = [...body.data];
            }

        })
      },
        //无证核验详情列表
        getNoIdentityDetailLists(){
          this.getNoIdentityDetailList({
              page:this.page,
              limit:this.limit2,
              onsuccess:body=>{
                  this.noIdentityDetailList=body.data.list;
              }
          })
        },
        //充值使用次数
        getUsedNum(){
          this.getRechargeUsedNum({
              hotelId:this.hotel.hotel_id,
              start_time:this.periodFilter[0],
              end_time:this.periodFilter[1],
              onsuccess:body=>{
                  this.usedNum=body.data;
                  console.log('this.usedNum:',this.usedNum)
              }
          })
        },
      initList(){
        this.getRechargeInfos();
        this.getRechargelists();
        this.getNoIdentityDetailLists()
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
            console.log('zsjhhhh')
            if(val.length!==0){
                this.flag=false
                this.getUsedNum()
            }
        }
    },

    mounted(){
      this.initList();
    }
  }
</script>

<style scoped lang="less">
  @import "./index.less";
</style>
