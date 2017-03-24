<template>
  <div class="message">
    <div class="toolbar" v-show="!noneChecked">
      <icon type="success" v-show="isAllChecked"></icon>
      <icon type="circle" v-show="!isAllChecked"></icon>
      <span @click="allCheck">全选</span>
      <span @click="clearChecked">取消操作</span>
    </div>
    <scroller lock-x>
      <section class="order-list" :class="{'noneChecked':noneChecked}">
        <span>{{checkedlist}}</span>
        <checker v-model="checkedlist"
                 type="checkbox"
                 default-item-class="item"
                 selected-item-class="selected">
          <checker-item v-for="(item,index) in orderlist.tobeconfirmed" :value="item.orderId" :key="index">
            <div class="list-item">
              <icon type="success" ></icon>
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
    <footer>
      <flexbox>
        <flexbox-item>
          <btn @onClick="showConfirm">补发短信</btn>
        </flexbox-item>
        <flexbox-item>
          <btn red @click.native="deleteList">删除</btn>
        </flexbox-item>
      </flexbox>
    </footer>
    <confirm v-model="confirmShow"
              confirm-text="是"
             cancel-text="否">
      <p style="text-align:center;">确认批量补发短信？</p>
    </confirm>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  export default{
    name: "message",
    data() {
      return {
        checkedlist: [],
        confirmShow: false,
        batch: false
      }
    },
    methods: {
      allCheck: function () {
        this.checkedlist.length === this.orderlist.tobeconfirmed.length
          ? this.checkedlist = []
          : (this.checkedlist = [], this.orderlist.tobeconfirmed.forEach((item) => {
              this.checkedlist.push(item.orderId)
            })
          )
      },
      clearChecked: function () {
        this.checkedlist = []
      },
      showConfirm: function () {
        this.confirmShow = true
      },
      deleteList: function () {
          const checkedNum= this.checkedlist.length;
          if(checkedNum != 0){
            this.orderlist.tobeconfirmed.forEach((i)=> {
                this.checkedlist.forEach((j) => {
                    if(j ==i.orderId){
                      this.orderlist.tobeconfirmed.splice(i,checkedNum);
                      this.checkedlist.splice(i,checkedNum)
                    }
                })
            })
          }

      },
      ...mapActions([
        'tobeconfirmed',
      ]),
    },
    computed: {
      ...mapState([
        'orderlist'
      ]),
      isAllChecked: function () {
        return this.checkedlist.length === this.orderlist.tobeconfirmed.length
      },
      noneChecked: function () {
        return this.checkedlist.length === 0
      }
    },
    mounted(){
      //获取tobeconfirmed&confirmed列表
      this.tobeconfirmed()
    }
  }
</script>

<style scoped lang="less">
  @import "./index.less";
</style>
