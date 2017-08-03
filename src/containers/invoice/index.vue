<template>
    <scroller :pulldown-config="Interface.scroller"
              :depend="dataList"
              @on-pulldown-loading="refreshList"
              lock-x
              use-pulldown
              height="-44">
      <div class="scroller-wrap">
        <p v-if="(!dataList || dataList.length === 0) && page > 0 " class="no-data">暂无数据</p>
        <Group @click.native="goDetail" v-for="(item,index) in dataList" :key="index">
          <Cell title="hahaha"/>
          <Cell title="xixixixixixixixixi"/>
        </Group>
      </div>
    </scroller>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  module.exports = {
    name: 'Invoice',
    data(){
      return {
        dataList: [1,2,3,4],
        page: 0
      }
    },
    computed: {
      ...mapState([
        'Interface',
        'route',
      ])
    },
    methods: {
      ...mapActions([
        'goto',
        'replaceto',
        'getInvoiceList'
      ]),
      goDetail() {
        this.goto('/invoice/666');
      },
      getList(callback) {
        this.getInvoiceList({
          scope: 0,
          invoice_status: 1,
          onsuccess: callback
        })
      },
      initList(){
        if (this.dataList.length === 0) {
          this.getList(body => (this.dataList = [...body.data], this.page++))
        }
      },
      refreshList(){
        this.getList(body => this.dataList = [...body.data])
      },
    },
    mounted(){
        // this.initList();
    }
  }

</script>
