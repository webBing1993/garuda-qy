<template>
  <div>
    <router-view></router-view>
    <Toast v-model="Interface.toast.show" :title="Interface.toast.text"/>
    <Toast v-model="Interface.loading.show" loading/>
    <!--<audio id="audio" hidden src="/i/master/garuda-qy/static/4182.wav" ref="audio"></audio>-->
    <Progress v-model="Interface.progress.show" :isOk="Interface.progress.isOk"></Progress>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    name: 'app',
    computed: {
      ...mapState([
        'AppParams',
        'VersionParam',
        'Interface',
        'hotel',
        'route',
      ]),
      currentMsg(){
        return this.AppParams.msg
      },
      currentApp(){
        return this.AppParams.app
      },
      sessionId(){
        return this.AppParams.session
      },
    },
    methods: {
        ...mapActions ([
            'settitle',
            'urlquery',
            'login',
            'replaceto',
            'getHotelConfigVersion',
            'getServiceConfigs',
            'getRechargeInfo',
            'get_is_free_deposit_config'
        ]),
        ...mapMutations ([
            'SERVICECONFIG'
        ]),
        crossroad () {
            if (this.currentMsg) {
                this.replaceto (this.currentMsg);
            } else {
                let path = ''
                switch (this.currentApp) {
                    case 'prepay':
                        path = '/precheckin/prepay/0'
                        break;
                    case 'record':
                        path = '/record'
                        break;
                    case 'precheckin-today':
                        path = '/precheckin/order/today/0'
                        break;
                    case 'precheckin-history':
                        path = '/precheckin/order/history/0'
                        break;
                    case 'roommanager':
                        path = '/roommanager'
                        break;
                    case 'verification':
                        path = '/new-policeIdentity/handle/0'
                        break;
                    case 'policeIdentity-today':
                        path = '/policeIdentity/today/0'
                        break;
                    case 'policeIdentity-history':
                        path = '/policeIdentity/history/0'
                        break;
                    case 'livein-today':
                        path = '/livein/today'
                        break;
                    case 'livein':
                        path = '/livein/all'
                        break;
                    case 'invoice':
                        path = '/invoice/0'
                        break;
                    case 'checkout':
                        path = '/checkout/0';
                        break;
                    case 'refund':
                        path = '/refund';
                        break;
                    case 'setting':
                        path = '/setting'
                        break;
                    case 'wqt':
                        path = '/home'
                        break;
                    case 'online':
                        path = '/onlineTool/onlineList'
                        break;
                }
                this.replaceto (path)
            }
        },
        initMTA () {
            let sid;
            if (process.env.NODE_ENV === 'test') {
                sid = "500509944";
            } else if (process.env.NODE_ENV === 'production') {
                sid = "500434237";
            }

            var _mtac = {};
            (function () {
                var mta = document.createElement ("script");
                mta.src = "http://pingjs.qq.com/h5/stats.js?v2.0.4";
                mta.setAttribute ("name", "MTAH5");
                mta.setAttribute ("sid", sid);
                var s = document.getElementsByTagName ("script")[0];
                s.parentNode.insertBefore (mta, s);
            }) ();
        },
        //获取酒店业务模块配置
        getServiceConfig () {
            this.getServiceConfigs ({
                hotelId: this.hotel.hotel_id,
                onsuccess: body => {
                    this.SERVICECONFIG (body.data)
                }
            })
        },
    },
    watch: {
      AppParams(val){
          this.login(val);//存sessionId和hotelId
      },
      $route(val){
        const path = val.fullPath;
        let title = '微前台';
        path.match(/record/) ? title = '录入修改' : null
        path.match(/roommanager/) ? title = '房态管理' : null
        path.match(/prepay/) ? title = '订单中心' : null
        path.match(/identity\/\d+/) ? title = '入住核验' : null
        path.match(/identity\/detail/) ? title = '入住核验详情' : null
        path.match(/identity\/todo/) ? title = '待核验' : null
        path.match(/policeIdentity\/./) ? title = '公安验证详情' : null
        path.match(/policeIdentity\/handle/) ? title = '公安验证' : null
        path.match(/policeIdentity\/orderSearch/) ? title = '查询订单' : null
          path.match(/livein\/./) ? title = '入住单详情' : null
        path.match(/livein\/today/) ? title = '当日入住' : null
        path.match(/livein\/all/) ? title = '全部在住' : null
        path.match(/invoice/) ? title = '发票中心' : null
        path.match(/checkout/) ? title = '退房申请' : null;
        path.match(/bill/) ? title = '账务管理' : null;
        path.match(/receive/) ? title = '住离信息' : null;
        path.match(/abnormalNotice\/listDetail/) ? title = '异常提醒' : null;
        path.match(/suspicious\/suspiciousList/) ? title = '可疑人员' : null;
        path.match(/suspicious\/susDetail/) ? title = '可疑人员详情' : null;
        path.match(/onlineTool\/onlineList/) ? title = '人证通上线' : null;
        path.match(/onlineTool\/onlineList/) ? title = '人证通上线' : null;
        path.match(/onlineTool\/onlineDetail/) ? title = '酒店详情页' : null;
        path.match(/onlineTool\/onlineDevice/) ? title = '添加设备' : null;
        path.match(/onlineTool\/hotelBasicInfo/) ? title = '酒店基本信息' : null;
        path.match(/recharge/) ? title = '充值中心' : null;
        path.match(/dirtyroom/) ? title = '脏房处理' : null;
        this.settitle(title)
      },
      sessionId(val){
        if (val) {
          this.getServiceConfig();
          this.get_is_free_deposit_config();
          this.getRechargeInfo ({
              hotel_id: this.hotel.hotel_id
          });
          this.$nextTick(() => this.crossroad());
        }
      }
    },
      mounted(){
          if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'prod') {
              this.initMTA();
          }
          this.urlquery({   //存AppParams,开发者工具输入地址后进入此页执行查询AppParams
              callback:()=>{
                  // console.log('zhengsijieCallBack')
              }
          })
      }
  }
</script>

<style lang="less">
  @import "./assets/styles/index.less";
</style>
