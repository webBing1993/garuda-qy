<template>
  <div class="message">
    <div class="toolbar">
      <icon type="success" v-show="isAllChecked"></icon>
      <icon type="circle" v-show="!isAllChecked"></icon>
      <span @click="allCheck">全选</span>
      <span @click="clearChecked">取消操作</span>
    </div>
    <scroller>
      <section class="order-list">
        <span>{{checkedlist}}</span>
        <checker v-model="checkedlist"
                 type="checkbox"
                 default-item-class="item"
                 selected-item-class="selected">
          <checker-item v-for="(item,index) in list" :value="item.orderId" :key="index">
            <div class="list-item">
              <icon type="success"></icon>
              <icon type="circle"></icon>
              <ul>
                <li>
                  <span class="left"> 订单号：</span>
                  <span>{{item.orderId}}</span>
                </li>
                <li>
                  <span class="left">预定人：</span>
                  <span>{{item.booker}}</span>
                  <span>{{item.phoneNum}}</span>
                </li>
                <li>
                  <span class="left">房型：</span>
                  <span>{{item.roomType}}x{{item.roomCount}}</span>
                </li>
              </ul>
            </div>
          </checker-item>
        </checker>

      </section>
    </scroller>

  </div>
</template>

<script>
  export default{
    name: "message",
    data() {
      return {
        list: [{
          orderId: 230420402402403,
          booker: "张三",
          phoneNum: "15829321022",
          roomType: "大床房",
          roomCount: 2,
        }, {
          orderId: 230420402402402,
          booker: "张三",
          phoneNum: "15829321022",
          roomType: "大床房",
          roomCount: 2,
        }],
        checkedlist: []
      }
    },
    methods: {
      allCheck: function () {
        this.checkedlist.length === this.list.length
          ? this.checkedlist = []
          : (this.checkedlist = [], this.list.forEach((item) => {
              this.checkedlist.push(item.orderId)
            })
          )
      },
      clearChecked: function () {
        this.checkedlist = []
      }
    },
    computed: {
        isAllChecked: function () {
          return this.checkedlist.length === this.list.length
        }
    }
  }
</script>

<style scoped lang="less">
  @import "./index.less";
</style>
