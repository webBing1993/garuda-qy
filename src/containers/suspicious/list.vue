<template>
  <article>
    <header class="tab-wrapper">
      <tab active-color="#5077AA">
        <tab-item v-for="(item,index) in tabMenu"
                  :selected="currentTab === index"
                  :key="index" @on-item-click="toggleTab(index)">{{item}}

        </tab-item>
      </tab>
    </header>
    <div style="margin-top: 2.8rem" class="list1" v-show="currentTab==0">
      <scroller :pullup-config="Interface.scrollerUp"
                @on-pullup-loading="refreshList0"
                lock-x
                use-pullup
                height="-40"
                v-model="suspiciousScroll"
                scrollbarY ref="scrollerBottom0">
        <div class="list-wrapper">
          <div>
            <p v-show="(!suspiciousPerson||suspiciousPerson.length === 0) "class="no-data">暂无数据</p>
            <div v-for="(item,index) in suspiciousPerson" class="suspiciousList" >
              <div class="suspiciousCon" @click="suspiciousHandel(item.illegal_guest_id)">
                <div class="timeLine">
                  <span>{{datetimeparse(item.filming_time,'YYYYMMDD')}}</span>
                </div>
                <div class="suspiciousItem">
                  <img width="80" height="80" :src="item.facial_pic" alt="无人脸图" class="suspiciousImg">
                  <!--<div class="txt1">相似度：{{item.similarity}}</div>-->
                  <div class="txt2">{{datetimeparse(item.filming_time,'hhmm:ss')}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>

    <div style="padding-top: 2.8rem" class="list2" v-show="currentTab==1">
      <scroller :pullup-config="Interface.scrollerUp"
                @on-pullup-loading="refreshList1"
                lock-x
                use-pullup
                v-model="handledScroll"
                height="-40"
                scrollbarY bounce ref="scrollerBottom1">
        <div class="list-wrapper">
          <div>
            <p v-show="(!handledPerson||handledPerson.length === 0) "class="no-data">暂无数据</p>
            <div v-for="(item,index) in handledPerson" class="suspiciousList" >
              <div class="suspiciousCon" @click="suspiciousHandel(item.illegal_guest_id)">
                <div class="timeLine">
                  <span>{{datetimeparse(item.filming_time,'YYYYMMDD')}}</span>
                </div>
                <div class="suspiciousItem">
                  <img width="80" height="80" :src="item.facial_pic" alt="无人脸图" class="suspiciousImg">
                  <!--<div class="txt1">相似度：{{item.similarity}}</div>-->
                  <div class="txt2">{{datetimeparse(item.filming_time,'hhmm:ss')}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>

    <div div style="margin-top: 2.8rem" class="list3" v-show="currentTab==2" >
       <ul>
           <li v-for="(item,index) in whiteList" @click="selected(item)">
             <img :src="item.img_url" class="bmdImg" :alt="null">
             <div class="item-check">
               <a href="javascript:void 0" class="iconfont"
                  :class="{'icon-roundcheck':!item.removed, 'icon-roundcheckfill': item.removed}">
               </a>
             </div>
           </li>
       </ul>
      <x-button value="删除照片" class="delBtn" @onClick="showDelDialog=true" v-show="whiteList.length>0">
      </x-button>
    </div>
    <Dialog v-model="showDelDialog" @onConfirm="delWhiteItemList" confirm cancel>
      <p>确认删除？</p>
    </Dialog>
  </article>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import {Tab, TabItem,Scroller} from 'vux'
    module.exports = {
        name:'suspicious',
        components: {Scroller,Tab, TabItem},
        data(){
          return{
              suspiciousPerson:[],
              handledPerson:[],
              suspiciousScroll: {pullupStatus: 'default'},
              handledScroll: {pullupStatus: 'default'},
              onFetching0:false,
              onFetching1:false,
              offset0:0,
              offset1:0,
              total0:0,
              total1:0,
              total2:0,
              whiteList:[{},{},{},{},{},{}],
              flag:false,
              idsList:[],
              showDelDialog:false
          }
        },
        computed: {
            ...mapState ([
                'route',
                'Interface'
            ]),
            currentTab(){
                return parseInt(this.route.params.tab)
            },
            tabMenu() {
                // this.initList();
                let menu = [];
                menu[0] = `未处理(${this.total0})`;
                menu[1] = `已处理(${this.total1})`;
                menu[2] = `白名单(${this.total2})`;
                return menu;
            }
        },
        methods:{
            ...mapActions([
                'replaceto',
                'goto',
                'getSuspicious',
                'getWhiteList',
                'delWhiteItem'
            ]),
            toggleTab(index){
                let newpath = this.route.path.replace(this.route.params.tab, index)
                this.replaceto(newpath);
                this.initList();
            },
            getWhiteLists(){
                this.getWhiteList({
                    limit:100000,
                    offset:0,
                    data:{
                        createTimeStart:'',
                        createTimeEnd:'',
                        removed:false
                    },
                    onsuccess:(body,headers)=>{
                        this.total2=headers.get('x-total-count');
                        this.whiteList=body.data;
                    }
                })

            },
            delWhiteItemList(){
                this.whiteList.forEach(item=>{
                    if(item.removed){
                        this.idsList.push(item.id)
                    }
                });
                this.delWhiteItem({
                    data:{
                        'ids':this.idsList
                    },
                    onsuccess:body=>{
                        this.getWhiteLists();
                    }
                })
            },
            selected(item){
                // if(typeof item.checked == 'undefined'){
                //     this.$set(item,'checked',false)
                // }else {
                //     item.checked = !item.checked;
                // }
                item.removed = !item.removed;

            },
            //可疑人员详情页
            suspiciousHandel(suspiciousId){
                this.goto('/suspicious/susDetail/'+suspiciousId)
            },
            initList(){
                this.getSuspiciousList(((body,headers)=>{
                    this.total0=headers.get('x-total-count');
                    this.suspiciousPerson=[...body.data];
                    this.suspiciousScroll.pullupStatus = 'enabled';
                    if(body.data=null||body.data.length==0||this.total0<=15) {
                        this.suspiciousScroll.pullupStatus = 'disabled';
                        console.log(32)
                    };
                    this.$nextTick(() => {
                        this.$refs.scrollerBottom0.reset({top:0});
                    });
                }),['NONE'],0);
                this.getSuspiciousList(((body,headers)=> {
                    this.total1 = headers.get ('x-total-count');
                    this.handledPerson = [...body.data];
                    this.handledScroll.pullupStatus = 'enabled';
                    if(body.data=null||body.data.length==0||this.total1<=15) {
                        console.log(32)
                        this.handledScroll.pullupStatus = 'disabled';
                    }
                    this.$nextTick(() => {
                        this.$refs.scrollerBottom1.reset({top:0});
                    });
                }),['READ'],0);
                this.getWhiteLists();
            },
            getSuspiciousList(callback,status,page){
                this.getSuspicious({
                    offset:page,
                    limit:15,
                    data:{
                        createTimeStart:'',
                        createTimeEnd:'',
                        statuses:status
                    },
                    onsuccess:callback
                });
            },
            refreshList0(){
                if (this.onFetching0) {
                    // do nothing
                    return;
                }else{
                    this.onFetching0 = true;
                    setTimeout(() => {
                        this.offset0=this.offset0+15;
                        console.log('第'+this.offset0+'起');
                        this.getSuspiciousList(((body,headers)=>{
                                this.total0=headers.get('x-total-count');
                                this.suspiciousPerson=[...this.suspiciousPerson,...body.data];
                                this.suspiciousScroll.pullupStatus = 'default';
                                if(body.data=null||body.data.length==0) {
                                    this.suspiciousScroll.pullupStatus = 'disabled';
                                };
                        }),['NONE'],this.offset0)
                        //$nextTick是为了数据改变了等待dom渲染后使用
                        this.$nextTick(() => {
                            this.$refs.scrollerBottom0.reset();
                        });
                        this.onFetching0 = false
                    }, 500);
                }
            },
            refreshList1(){
                if (this.onFetching1) {
                    // do nothing
                    return;
                }else{
                    this.onFetching1 = true;
                    setTimeout(() => {
                        this.offset1=this.offset1+15;
                        console.log('第'+this.offset1+'起');
                        this.getSuspiciousList(((body,headers)=> {
                            this.total1 = headers.get ('x-total-count');
                            this.handledPerson = [...this.handledPerson, ...body.data];
                            this.handledScroll.pullupStatus = 'default';
                             if(body.data=null||body.data.length==0) {
                                this.handledScroll.pullupStatus = 'disabled';
                            };
                        }),['READ'],this.offset1);
                        //$nextTick是为了数据改变了等待dom渲染后使用
                        this.$nextTick(() => {
                            this.$refs.scrollerBottom1.reset();
                        });
                        this.onFetching1 = false
                    }, 500);
                }
            }
        },
        mounted(){
            this.initList();
        }
    }
</script>
<style lang="less" scoped>
  @import "index.less";
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .list-wrapper{
    position: relative;
    padding-top: 0;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
  }
  .xs-container{
    padding-top: 2rem;
  }
  .list3{
    position: relative;
    width: 100%;
    ul{
      margin-left: 0.5rem;
      li{
        margin-top: 0.3rem;
         display: inline-block;
          width: 5.3rem;
          height: 5.3rem;
          border: 1px solid #9A9A9A;
          /*background: #EC8B89;*/
          margin-right: 0.2rem;
          position: relative;
        .bmdImg{
          width: 100%;
          height: 100%;
        }
        .item-check{
          position: absolute;
          top: 0.1rem;
          right: 0.3rem;
          /*margin: 0 0.5rem 0.2rem 0.2rem;*/
          a{
            /*font-size: 18px;*/
            display: inline-block;
          }
          a.iconfont{
            font-size: 20px;
          }
          a:before{
            width: 100%;
            height: 100%;
          }
          .iconfont.icon-roundcheck{
            color: #ffcd57;
          }
          .iconfont.icon-roundcheckfill{
            color: #ffcd57;
          }
        }
      }
    }
    .delBtn{
      position:absolute;
      width: 86%;
      left:50%;
      margin-left: -43%;
      margin-top: 1rem;
      background: #EC8B89;
      color: #ffffff;
      /*margin-left: 0.5rem;*/
    }
  }
</style>
