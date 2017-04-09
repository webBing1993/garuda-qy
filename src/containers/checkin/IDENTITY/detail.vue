<template>
  <article>
    <group title="预定信息">
      <cell title="预订人" :value="identityinfo.owner"/>
      <cell title="手机号" :value="identityinfo.phone_number"/>
      <cell title="入住时间" :value="identityinfo.in_time | datetimeparse"/>
      <cell title="离店时间" :value="identityinfo.out_time | datetimeparse"/>
      <cell title="房型" :value="identityinfo.room.room_type_name"/>
    </group>

    <group title="验证信息">
      <cell :title="identityinfo.room.room_number" :value="identityinfo.created_time | datetimeparse('','验证时间：')"/>
      <section class="guestinfo" v-for="item in identityinfo.guests">
        <p><span>姓名</span>{{item.name}}</p>
        <p><span>民族</span>{{item.ethnicity}}</p>
        <p><span>身份证</span>{{item.idcard}}</p>
        <p><span>地址</span>{{item.address}}</p>
        <div class="photos">
          <img src="" alt="身份证照片">
          <img src="" alt="当前照片">
        </div>
        <p class="similarity">相似度 {{item.similarity}}%</p>
      </section>
    </group>
  </article>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

  module.exports = {
    data(){
      return {
        identityinfo: {
          identity_id: '',
          owner: "张三",
          phone_number: "17867894324",
          in_time: "1491384458000",
          out_time: "1491384458000",
          room: {
            room_type_name: "大床房",
            room_number: "203",
          },
          guests: [{
            name: "张三", //姓名
            sex: "男", //性别
            ethnicity: "汉", //民族
            date_of_birth: "", //生日
            address: "上海市控江路1690", //住址
            idcard: "230988392980230", //身份证号码
            photo: "", //身份证照片url
            live_photo: "", //现在抓拍的照片url
            similarity: "77" //相似度65"
          },{
            name: "张三", //姓名
            sex: "男", //性别
            ethnicity: "汉", //民族
            date_of_birth: "", //生日
            address: "上海市控江路1690", //住址
            idcard: "230988392980230", //身份证号码
            photo: "", //身份证照片url
            live_photo: "", //现在抓拍的照片url
            similarity: "77" //相似度65"
          },],
          created_time: "1491384458000", //验证时间
          status: "PENDING" //PENDING待审核、AGREED通过、REFUSED拒绝
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "index.less";
</style>
