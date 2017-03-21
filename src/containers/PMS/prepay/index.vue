<template>
  <article>
    <header>
      <Tab active-color="#373946" defaultColor="#8F8F8F" activeColor="#373946">
        <TabItem v-for="(item,index) in tabmenu"
                 :key="index"
                 @click.native="currenttab = item"
                 :selected="currenttab === item">{{item}}
        </TabItem>
      </Tab>
      <div class="toolbar" v-if="batch">
        <span @click="allPick">全选</span>
        <span @click="cancelPick">取消操作</span>
      </div>
      <span>选择订单: {{batchlist}}</span>
    </header>

    <section v-show="currenttab ==='待确认'" class="tobeconfirmed" :class="{'checklist':batch}">
      <checker v-model="batchlist"
               type="checkbox"
               default-item-class="item"
               selected-item-class="selected">
        <checker-item v-for="(item,index) in tbc" :key="index" :value="item.orderId">
          <Group class="group" @click.native="orderClick">
            <cell>
              <span>订单号：</span>
              <span>{{item.orderId}}</span>
            </cell>
            <cellbox>
              <ul>
                <li>
                  <span>预订人：</span>
                  <span>{{item.booker}}</span>
                  <span>{{item.phoneNum}}</span>
                </li>
                <li>
                  <span>房型：</span>
                  <span>{{item.roomType}}x{{item.roomCount}}</span>
                </li>
                <li>
                  <span>房费：{{item.fee}}</span>
                  <span>已付：{{item.prepay}}</span>
                </li>
              </ul>
            </cellbox>
            <cell v-if="item.remark">
              <span>备注：</span>
              <span>{{item.remark}}</span>
            </cell>
          </Group>
        </checker-item>
      </checker>
      <footer>
        <btn v-if="batch" red>未支付</btn>
        <flexbox v-else>
          <flexbox-item>
            <btn>拉取新订单</btn>
          </flexbox-item>
          <flexbox-item>
            <btn reverse @onClick="batch = true,batchlist=[]">无信息批量处理</btn>
          </flexbox-item>
        </flexbox>
      </footer>
    </section>

    <section v-show="currenttab ==='已确认'" class="confirmed">
      confirmed
    </section>
  </article>
</template>

<script>
  export default{
    name: "prepay",
    data(){
      return {
        currenttab: "待确认",
        tabmenu: ["待确认", "已确认"],
        batch: false,
        batchlist: [],
        tbc: [{
          orderId: 230420402402403,
          booker: "张三",
          phoneNum: "15829321022",
          roomType: "大床房",
          roomCount: 2,
          fee: 80000,
          prepay: 0,
          remark: ''
        }, {
          orderId: 230420402402404,
          booker: "张三",
          phoneNum: "15829321022",
          roomType: "大床房",
          roomCount: 2,
          fee: 80000,
          prepay: 50000,
          remark: '此订单已在携程支付500元'
        }, {
          orderId: 230420402402405,
          booker: "张三",
          phoneNum: "15829321022",
          roomType: "大床房",
          roomCount: 2,
          fee: 80000,
          prepay: 50000,
        }, {
          orderId: 230420402402406,
          booker: "张三",
          phoneNum: "15829321022",
          roomType: "大床房",
          roomCount: 2,
          fee: 80000,
          prepay: 50000,
        }]
      }
    },
    methods: {
      allPick(){
        if (this.batchlist.length === this.tbc.length) {
          this.batchlist = []
        } else {
          this.batchlist = []
          this.tbc.forEach(item => {
            this.batchlist.push(item.orderId)
          })
        }
      },
      cancelPick(){
        this.batchlist = []
        this.batch = false
      },
      orderClick(){
        !this.batch ? ( this.batchlist = [], console.log("goto order") ) : null
      }
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
