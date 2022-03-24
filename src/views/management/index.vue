<template>
  <div class="container">
    <el-container>
      <el-header height="100px">
        <Top />
      </el-header>
      <el-container>
        <el-aside width="250px">
          <ul class="menu">
            <li
              class="menu-item"
              :class="$route.path == '/management/user' ? 'is-active' : ''"
            >
              <router-link :to="{ name: 'user' }" class="link">
                <img src="../../assets/img/nav_logo/user.png" alt="" />
                <span>用户管理</span>
              </router-link>
            </li>
            <li
              class="menu-item"
              :class="
                $route.path == '/management/simulationScore' ? 'is-active' : ''
              "
            >
              <router-link :to="{ name: 'simulationScore' }" class="link">
                <img src="../../assets/img/nav_logo/simulation.png" alt="" />
                <span>仿真成绩</span>
              </router-link>
            </li>
            <li
              class="menu-item"
              :class="
                $route.path == '/management/examineScore' ? 'is-active' : ''
              "
            >
              <router-link :to="{ name: 'examineScore' }" class="link">
                <img src="../../assets/img/nav_logo/theory.png" alt="" />
                <span>理论成绩</span>
              </router-link>
            </li>
            <li
              class="menu-item"
              :class="
                $route.path.indexOf('/management/questionBank') > -1
                  ? 'is-active'
                  : ''
              "
            >
              <router-link :to="{ name: 'questionBank' }" class="link">
                <img src="../../assets/img/nav_logo/question.png" alt="" />
                <span>题库管理</span>
              </router-link>
            </li>
            <li
              class="menu-item"
              v-if="userType == 0"
              :class="
                $route.path == '/management/ratingSettings' ? 'is-active' : ''
              "
            >
              <router-link :to="{ name: 'ratingSettings' }" class="link">
                <img src="../../assets/img/nav_logo/rating.png" alt="" />
                <span>评分设置</span>
              </router-link>
            </li>
          </ul>
        </el-aside>
        <el-main>
          <div class="main-box">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Top from "@/Layout/components/Top.vue";
import {mapGetters} from 'vuex'
export default {
  components: { Top },
  computed:{
    ...mapGetters([
      'userType'
    ])
  }
};
</script>
<style lang="scss" scoped>
.container,
.el-container{
  height: 100%;
.el-header{
  padding: 0;
}
.el-aside{
  background: #103871;
  .menu{
    border: 0;
    margin-top: 70px;
    background: #103871;
    color: white;
    .menu-item{
      margin: 10px 0;
      height: 52px;
      line-height: 52px;
      padding-left: 40px !important;
      font-size: 18px;
      font-weight: 400;
      color: #fff;
      &.is-active,&:hover{
        color:#f2f2f2;
        background: #5278AF;
      }
      .link{
        display: block;
      }
      img{
        width: 22px;
        margin-right: 20px;
        vertical-align: text-bottom;
      }
    }
  }
  
}
  .el-main {
    padding: 30px;
    padding-top: 50px;
  }
}
</style>
