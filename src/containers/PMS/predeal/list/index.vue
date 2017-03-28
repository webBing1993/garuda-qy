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

    <div class="preBtn" @click="_sorkTime">时间正序</div>

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
        batch: false
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
      _orderClick(orderId) {
        console.log('_orderClick =======>');
        this.goto('/predeal/predetail/' + orderId);
      },
      _sorkTime(){
//        this.dataTime = preorderlist.dataTime;
        console.log('时间排序..');
        console.log(this.dataTime);
//        this.dataTime.sort((a, b) => {
//          return a.dataTime > b.dataTime;
//        })
      }
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
