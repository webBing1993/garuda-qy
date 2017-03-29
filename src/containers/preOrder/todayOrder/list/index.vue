<template>
  <article>
    <header>
      <Tab active-color="#373946">
        <TabItem v-for="(item,index) in iscancelled"
                 :key="index"
                 :selected="route.params.tab == index"
                 @click.native="goto('/predeal/'+index)">{{item}}
        </TabItem>
      </Tab>
    </header>

    <scroller v-show="route.params.tab == 0" ref="tableft" lock-x>
      <section>
        <preorderitem v-for="(item,index) in preorderlist0"
                      :key="index"
                      :value="item.orderId"
                      @onClick="_orderClick(item.orderId)" :item="item" :arrow="!batch"/>
      </section>
    </scroller>

    <scroller v-show="route.params.tab == 1" ref="tabright" lock-x>
      <section>
        <preorderitem v-for="(item,index) in preorderlist1" key="index" :item="item" arrow/>
      </section>
    </scroller>

    <div class="preBtn" @click="_showSortBox">时间正序</div>
    <popup v-model="popupShow"
           :maskShow="true"
           :bottom="true"
           :top="false"
           :atCenter="false"
           :fromBottom="true">
      <!--<calendar @onCancel="popupShow= false"></calendar>-->
      <div class="mask-container">
        <div class="sort-box">
          <div class="sotr-text">预登记时间从早到晚</div>
          <div class="sotr-text">预登记时间从早到晚</div>
        </div>
        <div class="mask"></div>
      </div>
    </popup>


    <!--<div class="mask-container" v-show="true">-->
    <!--<div class="sort-box">-->
    <!--<div class="sotr-text">预登记时间从早到晚</div>-->
    <!--<div class="sotr-text">预登记时间从早到晚</div>-->
    <!--</div>-->
    <!--<div class="mask"></div>-->
    <!--</div>-->
  </article>
</template>
<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import './index.less';

  module.exports = {
    name: 'predeal',
    data(){
      return {
        iscancelled: ["待入住", "已取消"],
        dataTime: [],
        batch: false,
        showSort: false,
        sortMenus: {
          menu1: '预登记时间从早到晚',
          menu2: '预登记时间从晚到早'
        },
        popupShow: false
      }
    },
    computed: {
      ...mapState([
        'route',
        'preorderlist0',
        'preorderlist1',
      ]),
      isShowSort(){
        return showSort
      }
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
      _orderClick(orderId) {
        console.log('_orderClick =======>');
        this.goto('/predeal/predetail/' + orderId);
      },
      _showSortBox(){
//        this.dataTime = preorderlist.dataTime;
        console.log('时间排序..');
        this.popupShow = true;
//        this.dataTime.sort((a, b) => {
//          return a.dataTime > b.dataTime;
//        })
      },

      _sortClick(key) {
        console.log(key)
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
