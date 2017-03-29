<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in iscancelled"
                 :key="index"
                 :selected="route.params.tab == index"
                 @click.native="goto('/preOrder/todayOrder/'+index)">{{item}}
        </TabItem>
      </Tab>
    </header>

    <scroller height="-44" v-show="route.params.tab == 0" ref="tableft" lock-x>
      <section>
        <preorderitem v-for="(item,index) in preorderlist0"
                      :key="index"
                      :value="item.order_id"
                      @onClick="_gotodetail(item.order_id)" :item="item" :arrow="!batch"/>
      </section>
    </scroller>

    <scroller height="-44" v-show="route.params.tab == 1" ref="tabright" lock-x>
      <section>
        <preorderitem v-for="(item,index) in preorderlist1" key="index" :item="item" arrow/>
      </section>
    </scroller>

    <!-- 弹出层 -->
    <div class="preBtn" @click="_showSortBox">时间正序</div>
    <div class="sortContainer" v-show="showSort">
      <div class="sortMask" @click="_hidSortBox"></div>
      <div class="sortContent animationTopBottom">
        <div class="sortText" v-for="item in sortMenus" v-model="sortMenus" @click="_sortClick(item)">{{item}}</div>
      </div>
    </div>
  </article>
</template>
<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import './index.less';

  module.exports = {
    name: 'todayOrder',
    data(){
      return {
        iscancelled: ["待入住", "已取消"],
        dataTime: [],
        batch: false,
        showSort: false,
        sortMenus: ['预登记时间从早到晚', '预登记时间从晚到早']
      }
    },
    computed: {
      ...mapState([
        'route',
        'preorderlist0',
        'preorderlist1',
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'preorder0',
        'preorder1'
      ]),
      reset: function (ref, param) {
        //重置scroller高度
        this.$nextTick(() => this.$refs[ref].reset(param))
      },
      _gotodetail(orderId) {
        this.goto('/preOrder/todayOrder/predetail/' + orderId);
        console.log('goto predetail ===> 1111111')
      },
      _showSortBox(){
        this.showSort = true;
      },
      _hidSortBox(){
        this.showSort = false;
      },

      _sortClick(key) {
        this._hidSortBox();
//        this.dataTime = preorderlist.dataTime;
//        this.dataTime.sort((a, b) => {
//          return a.dataTime > b.dataTime;
//        })
        if (key == '预登记时间从早到晚') {
          console.log(key + '0');
        } else {
          console.log(key + "1");
        }
      },
    },
    watch: {
      'route.params.tab': function (val) {
        //切换标签卡时
        if (val == 0) {
          this.reset('tableft');
          console.log('tableft 0');
        } else {
          this.reset('tabright');
          console.log('tabright 1');
        }
      },
      'preorderlist0': function () {
        //preorderlist0 列表变化时
        this.reset('tableft')
      },
      'preorderlist1': function () {
        //preorderlist1列表变化时
        this.reset('tabright')
      }
    },

    mounted(){
      this.preorder0();
      this.preorder1();
    }
  }
</script>
