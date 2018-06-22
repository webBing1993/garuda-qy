<!--脏房-->
<template>
  <article>
    <header class="tab-wrapper">
      <Tab active-color="#5077AA">
        <TabItem v-for="(item,index) in tabMenu"
                 :key="index"
                 :class="{'vux-1px-r': index===0}"
                 :selected="currentTab === index"
                 @click.native="replaceto('/dirtyroom/'+index)">{{item}}
        </TabItem>
      </Tab>
    </header>

    <div class="list-wrapper">
      <!--待处理-->
      <div v-if="currentTab===0">
        <p v-show="(!tobeconfirmed||tobeconfirmed.length === 0)" class="no-data">暂无数据</p>
        <div  v-for="(item,index) in tobeconfirmed" :key="index" :value="item.order_id">
            <div class="content">
              <div class="title">
                <div>
                  <span>{{item.room_no}}</span>
                  <span>({{item.room_type_name}})</span>
                </div>
                <div>
                  {{datetimeparse(item.createdTime,'YYYYMMDD hhmm')}}
                </div>
              </div>
              <div class="space"></div>
              <div class="body">
                <div v-for="(citem,cindex) in item.name">
                  <p><span>入住人</span><span>{{citem}}</span></p>
                  <!--<p><span>入住人</span><span>张三</span></p>-->
                  <!--<p><span>入住人</span><span>张三</span></p>-->
                </div>
                <div>
                  <p><span>入离时间</span><span>{{item.in_out_time}}</span></p>
                </div>
              </div>
              <div class="footer" @click="handle(item.sub_id)">通知打扫</div>
            </div>
          </div>
      </div>

      <!--已处理-->
      <div v-if="currentTab===1">
        <p v-show="(!confirmed||confirmed.length === 0)" class="no-data">暂无数据</p>
        <div v-for="(item,index) in confirmed" :key="index" :value="item.order_id">
          <div class="content">
            <div class="title">
              <div>
                <span>{{item.room_no}}</span>
                <span>({{item.room_type_name}})</span>
              </div>
              <div>
                {{datetimeparse(item.createdTime,'YYYYMMDD hhmm')}}
              </div>
            </div>
            <div class="space"></div>
            <div class="body">
              <div v-for="(citem,cindex) in item.name">
                <p><span>入住人</span><span>{{citem}}</span></p>
                <!--<p><span>入住人</span><span>张三</span></p>-->
                <!--<p><span>入住人</span><span>张三</span></p>-->
              </div>
              <div>
                <p><span>入离时间</span><span>{{item.in_out_time}}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

</article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import {XDialog, PopupRadio, PopupPicker, Picker, Popup} from 'vux'

  export default{
    name: "prepay",

    components: {
      XDialog,
      PopupRadio,
      PopupPicker,
      Picker,
      Popup
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

      renderList(){
        return this.currentTab == 2 ? this.confirmed : this.tobeconfirmed
      },

      tabMenu() {
        let menu = [];
        menu[0] = `未处理(${this.tobeconfirmed.length})`;
        menu[1] = `已处理(${this.confirmed.length})`;
        return menu;
      }
    },
    methods:{
      ...mapActions([
        'goto',
        'replaceto',
        'getDirtyRoomList',
        'handleDirtyRoom',
      ]),
        //标题日期筛选
        titleFilter(index,arr){
            if (arr.length > 0) {
                return index
                    ? this.datetimeparse(arr[index].createdTime) === this.datetimeparse(arr[index - 1].createdTime)
                        ? null : this.datetimeparse(arr[index].createdTime)
                    : this.datetimeparse(arr[index].createdTime)
            }
        },
        listHandle(arr) {
            if (arr && arr.length > 0) {
                for (var i = 0; i < arr.length - 1; i++) {
                    for (var j = 0; j < arr.length - i - 1; j++) {
                        if (arr[j].createdTime > arr[j + 1].createdTime) {//从小到大排序
                            var temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                        }
                    }
                }
            };
            console.log(arr)
            return arr;
        },
        initList(){
        let hotel_id = this.hotel.hotel_id
        this.tobeConfirmedPageIndex = 0
        this.confirmedPageIndex = 0
        this.getDirtyRoomList({
          hotel_id:hotel_id,
          is_deal_with:'0',
          onsuccess: body => (this.tobeconfirmed = this.listHandle(body.data), this.tobeConfirmedPageIndex++)
        })
        this.getDirtyRoomList({
          hotel_id:hotel_id,
          is_deal_with:'1',
          onsuccess: body => (this.confirmed =this.listHandle(body.data), this.confirmedPageIndex++)
        })

      },
        handle(obj){
            let hotel_id = this.hotel.hotel_id;
            this.handleDirtyRoom({
                hotel_id:hotel_id,
                sub_id:obj,
                is_deal_with:'1',
                onsuccess:(res)=> {
                    console.log('修改成功')
                    this.initList()
                }
            })
        },

    },
    mounted(){
      this.initList()
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
