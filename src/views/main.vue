<template>
  <div class="main">
    <div class="bg">
      <div class="cont">
        <div class="simula">
          <div class="link">
            <p><router-link to="simulation">仿真实验 ></router-link></p>
          </div>
        </div>
        <div class="theory">
          <div>
            <div class="link">
              <p>
                <router-link to="theory">理论学习</router-link>
              </p>
            </div>
          </div>
          <div>
            <div class="link">
              <p>
                <router-link to="theoretical">理论考核 ></router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="content cont">
        <Comment />
      </div>
  </div>
</template>
<script>
import Comment from '../components/Comment/index.vue'
export default {
  components:{
    Comment
  }
};
</script>
<style lang="scss">
.main {
  .bg {
    overflow: hidden;
    height: 561px;
    background: url(~@/assets/img/banner1.png) center;
    padding-top: 108px;
    color: #fff;
    .cont {
      display: flex;
    }
    .simula {
      width: 816px;
      height: 453px;
      background: url(~@/assets/img/bg_simula.png) center;
      margin-right: 20px;
      position: relative;
      > .link {
        height: 128px;
        line-height: 128px;
        padding-right: 100px;
        p {
          font-size: 36px;
        }
      }
    }
    .theory {
      width: calc(100% - 836px);
      > div {
        height: 216px;
        position: relative;
        &:first-child {
          background: url(~@/assets/img/bg_learn.png) center;
          margin-bottom: 20px;
        }
        &:last-child {
          background: url(~@/assets/img/bg_exam.png) center;
        }
        .link {
          height: 77px;
          line-height: 77px;
          padding-right: 30px;
          p {
            font-size: 30px;
          }
        }
      }
    }
    .link {
      width: 100%;
      background: rgba($color: #0b3168, $alpha: 0.67);
      position: absolute;
      bottom: 0;
      p {
        text-align: right;
        font-family: SimHei;
      }
    }
  }
  .content {
    background: #fff;
    margin-top: 50px;
    padding: 50px;
  }
}
</style>
