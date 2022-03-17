<template >
  <div class="topbox-cont" :class="isManagement ? 'padd' : 'cont'">
    <div class="left">
      <span class="topbox-back" @click="handleBack">
        <img src="../../assets/img/back.png" alt="">
      </span>
      <router-link to="/index">
      <img src="../../assets/img/logo.png" alt="">
      <p>{{TITLE}}</p></router-link>
    </div>
    <router-link v-if='userType < 3 && !appId'
                 class="management"
                 :to="isManagement ? '/main' : '/management'">
                 <img v-if="isManagement" src="../../assets/img/home.png" alt="">
                 <img v-else src="../../assets/img/go.png" alt="">
                 {{isManagement ? '前往主页' : "管理界面"}}
                 </router-link>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
data() {
  return {
    isManagement: this.$router.path.indexOf('management')!=-1
  }
},
computed:{
...mapGetters([
  'userType',
  'appId'
])
},
methods:{
    handleBack(){
      this.$router.go(-1)
    }
  }

}
</script>

<style lang="scss" scoped>
.topbox {
  height: 100px;
  background: $themeColor;
  position: relative;
  padding-top: 25px;
  .padd {
    padding: 0 95px;
  }
  .topbox-cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    color: $white;
    .left {
      display: flex;
      align-items: center;
      .topbox-back {
        cursor: pointer;
        position: relative;
      }
      img {
        margin-right: 45px;
      }
      p {
        font-size: 30px;
        font-weight: 300;
      }
    }
    .management {
      font-weight: 300;
      font-size: 22px;
      img {
        width: 27px;
        vertical-align: bottom;
      }
    }
  }
}
</style>