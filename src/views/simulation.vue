<template>
  <div class="box">
    <div class="bg">
      <div class="top cont">
        <TopBtn />
      </div>
      <div class="type">
        <div :class="isexam == 0 ? 'on' : ''" @click="handleType(0)">
          学习模式
        </div>
        <div :class="isexam == 1 ? 'on' : ''" @click="handleType(1)">
          考核模式
        </div>
      </div>
      <div class="simulation">
        <div class="cont">
          <p>
            本项目包括患者问诊、药物正常的体内代谢过程并模拟不同情况下的药物代谢，同时穿插着知识点的考核。理论与考核完美结合，让学生在仿真中探索学习，培养学生科研素质，创新思维和职业素养。
          </p>
          <div>
            <span @click="handleU3d(simulationList[0])">进入仿真 > ></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 学习成果 -->
    <div class="content cont">
      <div class="contit">
        <h3>学习成果</h3>
      </div>
      <Record />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getWebglUrl, simulationList } from "@/utils/simulation";
import TopBtn from "../components/TopBtn.vue";
import Record from '../components/Record'
export default {
  components: { TopBtn, Record },
  data() {
    return {
      isexam: 0, //0学习模式
      simulationList,
    };
  },
  computed: {
    ...mapGetters(["userType", "userId", "uesName", "appId"]),
  },
  methods: {
    handleU3d(item) {
      let eId = {
        experId: item.id,
        u3dname: item.name,
        maxScore: item.Score,
        seq: item.seq,
        appId: this.appId,
      };
      const url = getWebglUrl(
        this.isexam ? item.href : item.training,
        this.userId,
        this.userName,
        this.isexam,
        eId
      );
      //window.open(url)
      window.open(item.training);
    },
    handleType(type) {
      this.isexam = type;
    },
  },
};
</script>
<style lang="scss">
.box {
  background: #fff;
  position: relative;
}
.bg {
  background: url(~@/assets/img/banner2.png) center;
  height: 570px;
  overflow: hidden;
  .top {
    padding-top: 25px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 90px;
  }
  .type {
    display: flex;
    justify-content: center;
    div {
      font-size: 22px;
      padding: 0 50px;
      height: 60px;
      margin: 0 50px;
      line-height: 56px;
      cursor: pointer;
      text-align: center;
      border: #fff solid 2px;
      color: #fff;
      &:hover {
        background: rgba(#fff, 0.1);
      }
      &.on {
        background: #103871;
        border: 2px solid #103871;
        &:hover {
          background: rgba(#103871, 0.9);
        }
      }
    }
  }
  .simulation {
    background: url(~@/assets/img/banner_simula.png) left no-repeat;
    height: 240px;
    position: relative;
    margin-top: 105px;
    padding-top: 20px;
    p {
      width: 64%;
      color: #fff;
      font-size: 25px;
      font-weight: 300;
    }
    div {
      width: 64%;
      color: #fff;
      position: relative;
      padding-top: 25px;
      > span {
        position: absolute;
        right: 0;
        display: block;
        border: 2px solid #fff;
        border-radius: 25px;
        height: 50px;
        line-height: 46px;
        width: 173px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
.content {
  text-align: center;
  padding: 50px;
  margin-top: 50px;
  background: #fff;
}
</style>
