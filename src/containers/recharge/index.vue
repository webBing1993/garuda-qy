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
        <div class="rechargeContent" v-if="hotelRechargeInfo.is_first">
          <div class="row">
            <span class="title">酒店名称</span>
            <span>{{hotelRechargeInfo.hotel_name}}</span>
          </div>
          <div class="row">
            <span class="title">充值金额</span>
            <div class="rechargeMony">
              <x-input @on-focus="inputShow" class="monyInp" novalidate placeholder="请输入充值金额" :show-clear="true"></x-input>
            </div>
            <div class="payBtn">支付</div>
          </div>
        </div>
        <!--续充-->
        <div class="rechargeContent" v-if="!hotelRechargeInfo.is_first">
          <div class="row">
            <span class="title">酒店名称</span>
            <span>{{hotelRechargeInfo.hotel_name}}</span>
          </div>
          <div class="row">
            <span class="title">余额</span>
            <span>￥{{hotelRechargeInfo.balance}}</span>
          </div>
          <div class="row">
            <span class="title">使用次数</span>
            <span>{{hotelRechargeInfo.hotel_name}}</span>

          </div>
          <div class="row">
            <span class="title">剩余次数</span>
            <span>{{hotelRechargeInfo.surplus_time}}</span>
          </div>
          <div class="row">
            <span class="title">充值金额</span>
            <div class="rechargeMony">
              <x-input @on-focus="inputShow" class="monyInp" novalidate placeholder="请输入充值金额" :show-clear="true"></x-input>
            </div>
            <div class="payBtn">支付</div>
          </div>
        </div>
        <!--点击支付显示二维码-->
        <div class="rechargeContent">
          <div class="row" style="line-height: 300px;text-align: center;font-size: 20px">
            二维码
          </div>
        </div>
        <!--扫码后支付完成-->
        <div class="rechargeContent">
          <div class="row">
            <i></i>
            <h3 style="text-align: center">支付完成</h3>
            <div class="payBtn">申请发票</div>
          </div>
        </div>
        <!--选择发票-->
        <div class="rechargeContent">
          <div class="row">
            <span class="title">发票类型</span>
            <span>个票</span>
          </div>
          <div class="row">
            <span class="title">抬头名称</span>
            <span>上海复创</span>
          </div>
          <div class="row">
            <span class="title">税号</span>
            <span>234567890987654323456789</span>
          </div>
          <div class="row">
            <span class="title">单位地址</span>
            <span>上海市杨浦区控江路1550号1706</span>
          </div>
          <div class="row">
            <span class="title">电话号码</span>
            <span>3456787654345678</span>
          </div>
          <div class="row">
            <span class="title">开户银行</span>
            <span>绿云测试</span>
          </div>
          <div class="row">
            <div class="payBtn">提交</div>
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
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import {XDialog, PopupRadio, PopupPicker, Picker, Popup,Tab, TabItem} from 'vux'

  export default{
    name: "recharge",

    components: {
      XDialog,
      PopupRadio,
      PopupPicker,
      Picker,
      Popup,
      Tab,
      TabItem
    },

    data(){
      return {
        hotelRechargeInfo:{},
        Rechargelist: [],
        isFirstRech:true,
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
      getRechargeInfos(){
        this.getRechargeInfo({
          hotel_id: this.hotel.hotel_id,
            onsuccess: body => (this.hotelRechargeInfo = body.data)
        })

      },
      _mackSurePay(){
          console.log('确认支付')
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
      }
    },

    watch: {
//      currentTab: function (val, oldval) {
//        this.cancelPick();
//        typeof val === 'number' && !isNaN(val)
//          ? this.tobeConfirmedPageIndex == 0 || this.confirmedPageIndex == 0 ? this.initList() : this.refreshList()
//          : null;
//      }
    },

    mounted(){
      // this.initList();
      // this.getRechargeInfos();
        this.GETFAKEDATA()
    }
  }
</script>

<style scoped lang="less">
  @import "./index.less";
</style>
