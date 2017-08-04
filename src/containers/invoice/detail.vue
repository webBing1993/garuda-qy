<template>
  <div>
    <Group>
      <Cell title="房间信息" />
      <Cell>
        <div class="cell-body">
          <p>
            <span class="cell-key2 cell-value-title">房间号：</span>
            <span class="cell-value">201,202</span>
          </p>
          <p>
            <span class="cell-key2 cell-value-title">联系人：</span>
            <span class="cell-value">张三</span>
          </p>
          <p v-if="true">
            <span class="cell-key2 cell-value-title">联系电话：</span>
            <span class="cell-value">18642432834</span>
          </p>
          <p v-if="true">
            <span class="cell-key2 cell-value-title">备注：</span>
            <span class="cell-value">12:00 领取</span>
          </p>
        </div>
      </Cell>
    </Group>
    <Group>
      <Cell title="发票抬头" />
      <Cell>
        <div class="cell-body">
          <p>
            <span class="cell-key2 cell-value-title">类型：</span>
            <span class="cell-value">单位·增值税专用发票</span>
          </p>
          <p>
            <span class="cell-key2 cell-value-title">名称：</span>
            <span class="cell-value">测试</span>
          </p>
          <p>
            <span class="cell-key2 cell-value-title">税号：</span>
            <span class="cell-value">1247474747474747474</span>
          </p>
          <p>
            <span class="cell-key2 cell-value-title">单位地址：</span>
            <span class="cell-value">上海市杨浦区控江路1690号</span>
          </p>
          <p>
            <span class="cell-key2 cell-value-title">电话号码：</span>
            <span class="cell-value">45464897</span>
          </p>
          <p>
            <span class="cell-key2 cell-value-title">开户银行：</span>
            <span class="cell-value">工商银行</span>
          </p>
          <p>
            <span class="cell-key2 cell-value-title">银行账户：</span>
            <span class="cell-value">fortrun1</span>
          </p>
        </div>
      </Cell>
    </Group>
    <p class="tip"><span class="tip-title">已处理：</span>2017/07/31 12:10</p>
    <div class="button-group">
      <XButton value="填充发票信息" default @click.native="submit"></XButton>
    </div>
    <Dialog v-model="showDialog" confirmVal="确定" @onConfirm="dialogConfirm" confirm>
      <div>
        <div class="warning-box">
          <div class="warning"></div>
        </div>
        <p class="dialog-msg">{{dialogMsg}}</p>
      </div>
    </Dialog>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

module.exports = {
  name: 'InvoiceDetail',
  data() {
    return {
      showDialog: false,
      dialogMsg: '请先打开开票软件的开票页面'
    }
  },
  computed: {
    ...mapState([
      'yunbaInstance',
      'yunbaConnected',
      'AppParams'
    ])
  },
  watch: {
      yunbaConnected(val) {
        val && this.setPublishCallback({
          onSuccess: (data) => {
            console.log(data);
            
          }
        })
      }
    },
  methods: {
    ...mapActions([
      'goto',
      'yunbaConnect',
      'yunbaSubscribe',
      'yunbaPublish',
      'setPublishCallback',
    ]),
    submit() {
      // this.showDialog = true;
      // this.goto('/invoice/detail/666/result');
      let data = {
        a: 1
      }
      this.publish(data);
    },
    dialogConfirm() {
      this.showDialog = false;
    },
    subscribe(topic) {
      this.yunbaSubscribe({
        info: {
          'topic': 'orders/' + topic
        },
        subscribeCallback: () => console.log('subscribe', 'lisijing')
      })
    },
    publish(msg) {
      this.yunbaPublish({
        info: {
          'topic': 'orders/' + 666,
          'msg': JSON.stringify(msg)
        },
        publishCallback: () => console.log('publish', '3074')
      })
    },
  },
  mounted() {
    // this.yunbaConnect();
    // this.subscribe(666);
  }
}

</script>
<style lang="less" scoped>
.cell-value-title {
  color: #8A8A8A;
}

.warning-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.warning {
  display: block;
  height: 60px;
  width: 60px;
  background: url('data:image/svg+xml;charset=utf8,<svg width="60px" height="60px" viewBox="0 0 121 121" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="15.发票" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="填开发票2" transform="translate(-315.000000, -399.000000)"><g id="大图标/警告" transform="translate(310.000000, 394.000000)"><path d="M126,66.2469136 C126,32.0860741 98.9139259,5 64.7530864,5 C32.0860741,5 5,32.0860741 5,66.2469136 C5,98.9139259 32.0860741,126 64.7530864,126 C98.9139259,126 126,98.9139259 126,66.2469136 Z" id="Fill-" fill="#F76260"></path><path d="M61.9973917,37 L67.0026083,37 C68.1041422,37 68.9673817,37.8944904 68.927145,38.9979003 L67.5363356,77.1379999 C67.5163345,77.6864904 67.0564136,78.1344299 66.509222,78.1344299 L62.490778,78.1344299 C61.9509752,78.1344299 61.483732,77.688313 61.4636644,77.1379999 L60.072855,38.9979003 C60.0327246,37.8974059 60.8942627,37 61.9973917,37 Z M64.5,93 C62.0147186,93 60,90.9592514 60,88.4418605 C60,85.9244695 62.0147186,83.8837209 64.5,83.8837209 C66.9852814,83.8837209 69,85.9244695 69,88.4418605 C69,90.9592514 66.9852814,93 64.5,93 Z" id="Path-" fill="#FFFFFF"></path></g></g></g></svg>')
}

.dialog-msg {
  padding: 28px 0;
}

.tip {
  padding: 10px 15px;
  font-size: 14px;
  color: #4A4A4A;
}

.tip-title {
  color: #80C435;
}

</style>
