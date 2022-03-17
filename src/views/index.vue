<template>
  <!-- 顶部导航栏 -->
  <div class="main">
    <div class="banner">
      <div class="top">
        <div class="cont topm">
          <img src="../assets/img/logo.png" alt="" />
          <Login />
        </div>
      </div>
      <div class="cont">
        <div class="banner-m">
          <h1>{{ TITLE }}</h1>
          <div class="divide"></div>
          <p>
            阿托伐他汀临床常用于治疗高脂血症。本虚拟仿真教学系统将带领学生以药物的视角，探究阿托伐他汀在体内的处置过程，系统性的阐述通过口服给药后，阿托伐他汀在体内的吸收，分布，代谢，排泄等药物代谢动力学过程，并突出肠道及肝脏中的药物转运体以及代谢酶对上述进程的影响。此外，我们还将探讨在存在药物药物相互作用或患者存在肝损伤情况时，阿托伐他汀的体内药物代谢动力学过程的改变。希望同学们通过系统性的学习牢记药物在体内的处置过程，并理解药物转运体和代谢酶对药物处置的重要贡献。
          </p>
        </div>
      </div>
    </div>
    <!-- 主体 -->
    <div class="content">
      <div class="cont">
        <div class="contbox">
          <div class="cont-m navbox">
            <div >
              <ul class="nav">
                <li>
                  <a
                    href="javascript:void(0)"
                    @click="handleClick(urlApi + '/cslgxy/doc/sbs.pdf')"
                    rel="noopener noreferrer"
                  >
                    <img src="../assets/img/tickets.png" alt="" />
                    <p>申报书</p>
                    <i class="el-icon-arrow-right"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    @click="handleClick(urlApi + '/cslgxy/video/jjsp.mp4')"
                    rel="noopener noreferrer"
                  >
                    <!-- noopener 防止window.opener被滥用 noreferrer解决兼容性问题-->
                    <img src="../assets/img/video1.png" alt="" />
                    <p>项目简介视频</p>
                    <i class="el-icon-arrow-right"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    @click="handleClick(urlApi + '/cslgxy/video/dysp.mp4')"
                    rel="noopener noreferrer"
                  >
                    <img src="../assets/img/video2.png" alt="" />
                    <p>操作导引视频</p>
                    <i class="el-icon-arrow-right"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    @click="handleClick(urlApi + '/cslgxy/video/dysp.mp4')"
                    rel="noopener noreferrer"
                  >
                    <img src="../assets/img/teams.png" alt="" />
                    <p>教学团队</p>
                    <i class="el-icon-arrow-right"></i>
                  </a>
                </li>
              </ul>
              <div class="simuTip">
                <p>{{ TITLE }}</p>
              </div>
            </div>

            <div class="simulation_container">
              <div class="cont-t">
                <h2>虚拟仿真</h2>
                <p>Simulation training</p>
              </div>
              <div class="simulation">
                <div class="simulationa" @click="waitDialogVisible = true">
                  <span>点击进入</span>
                  <span>>></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      <div class="contbox">
        <div class="cont-t">
          <h2>理论学习</h2>
          <span @click="getMore()">更多 >></span>
        </div>
        <div class="cont-m">
          <ul class="theory">
            <li v-for="(item, index) in theory" :key="index">
              <img :src="item.img" alt="" />
              <div class="theory-t">
                <h3>{{ item.name }}</h3>
                <a href="javascript:void(0)" @click="handleClick(item.href)">查看</a>
              </div>
              <div class="theory-b">{{ item.time }}</div>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="cont bottom-m">
        <div class="bottom-c">
          <p>helpful links</p>
          <div class="divider"></div>
          <div class="bottom-s">
            <div>
              <h2>技术支持：</h2>
              <p>
                <a href="http://www.yysmart.net" target="_blank"
                  ><img src="../assets/img/yysmart_logo.png" alt=""
                /></a>
              </p>
            </div>
            <div>
              <h2>技术支持电话：</h2>
              <p>025-52311600</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="waitDialogVisible" width="30%">
      <div class="wait">
        <i class="el-icon-warnng-outline"></i>
        <h5>当前排队人数（0）</h5>
        <p>本实验项目支持最大并发访问数1000</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="waitDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleWait()">确定</el-button></span
      >
    </el-dialog>
  </div>
</template>
<script>
import Login from "@/components/Login";
export default {
  data() {
    return {
      waitDialogVisible: false,
      theory: [
        {
          type: "视频",
          name: "细胞冻存及复苏三维原理动画",
          href: this.urlApi + "/cslgxy/video/xbsx.mp4",
          img: this.urlApi + "/cslgxy/pic/dcfs.jpg",
          time: "2020-07-06",
        },
        {
          type: "视频",
          name: "细胞脂质体转染三维原理动画",
          href: this.urlApi + "/cslgxy/video/zr.mp4",
          img: this.urlApi + "/cslgxy/pic/xbzr.jpg",
          time: "2020-07-06",
        },
        {
          type: "视频",
          name: "细胞筛选三维原理动画",
          href: this.urlApi + "/cslgxy/video/xbdcfs.mp4",
          img: this.urlApi + "/cslgxy/pic/xbsx.jpg",
          time: "2020-07-06",
        },
        {
          type: "视频",
          name: "荧光染料掺入法定量PCR检测DNA三维原理动画",
          href: this.urlApi + "/cslgxy/video/pcr.mp4",
          img: this.urlApi + "/cslgxy/pic/pcr.jpg",
          time: "2020-07-06",
        },
      ],
    };
  },
  components: {
    Login,
  },

  methods: {
    handleClick(url) {
        window.open(url);
    },
      handleWait(){
    this.$router.push({path:'/main'})
  },
  getMore(){
        this.$router.push({name: 'theory'})
  }
  }
};
</script>
<style lang="scss" scoped>
.content {
  background: #f0f0f0;
  padding-bottom: 80px;
}
.wait {
  padding: 30px;
  text-align: center;
  h5 {
    font-size: 25px;
    margin: 30px 0;
  }
  i {
    font-size: 50px;
    color: rgb(221, 157, 20);
  }
}

.top {
  height: 80px;
  background: rgba(#010805, 0.6);
  padding: 18px 0;
  .topm {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.banner {
  height: 544px;
  background: url(~@/assets/img/banner.png) top center no-repeat;
}
.banner-m {
  margin-top: 101px;
  color: #f2f2f2;
  h1 {
    font-size: 60px;
    font-weight: bold;
    padding-top: 15px;
    padding-bottom: 20px;
  }
  .divide {
    width: 715px;
    height: 1px;
    background: rgba($color: #c6c9ce, $alpha: 0.6);
    margin-bottom: 5px;
  }
  p {
    width: 888px;
    font-size: 19px;
    line-height: 35px;
  }
}

.navbox {
  display: flex;
  justify-content: space-between;

  .nav {
    top: -60px;
    position: relative;
    background: #103871;
    width: 400px;

    li {
      font-size: 20px;
      height: 100px;
      line-height: 100px;
      color: #fff;
      a {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-left: 40px;
      }
      &:hover {
        background: #001d47;
      }
      i {
        font-size: 25px;
      }
      p {
        width: 200px;
        font-family: Source Han Sans CN;
        font-weight: 500;
      }
    }
  }
  .simuTip {
    position: relative;

    top: -20px;
    width: 1080px;
    height: 160px;
    background: #103871;
    padding-top: 50px;
    padding-left: 69px;
    > p {
      color: #f2f2f2;
      width: 272px;
      font-size: 21px;
    }
  }
}

.simulation_container {
  position: relative;
  padding-top: 70px;
  left: -650px;
}
.simulation {
  width: 775px;
  height: 374px;
  background: url(~@/assets/img/img-ul.png);
  text-align: center;
  padding: 273px 70px 0;
  display: flex;
  justify-content: flex-end;
  font-weight: normal;
  .simulationa {
    width: 180px;
    height: 48px;
    line-height: 44px;
    border: 2px solid #fff;
    border-radius: 24px;
    background: rgba($color: #fff, $alpha: 0.1);
    color: #fff;
    font-family: Adobe Heiti Std;
    padding: 0 30px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }
}

.theory {
  display: flex;
  justify-content: space-between;
}

.theory li {
  width: 260px;
  height: 300px;
  background: #fafafa;
  position: relative;
}

.theory li:hover {
  box-shadow: 0px 15px 41px 10px rgba(18, 42, 1, 0.2);
}

.theory li:hover a {
  background: #103871;
  color: #fff;
}
.theory li:hover:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 150px;
  top: 0;
  left: 0;
  background: rgba(#051f15, 0.6);
}

.theory li img {
  height: 150px;
  width: 100%;
}

.theory-t {
  padding: 17px 0;
  margin: 0px 10px;
  border-bottom: 1px solid #e4e4e4;
}

.theory-t h3 {
  font-size: 14px;
  color: #333333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  white-space: inherit;
  height: 38px;
}

.theory-t a {
  font-size: 12px;
  width: 72px;
  height: 24px;
  color: #103871;
  border: 1px solid #103871;
  display: block;
  text-align: center;
  line-height: 24px;
  border-radius: 24px;
  margin-top: 15px;
}

.theory-b {
  margin: 0 10px;
  font-size: 12px;
  color: #999999;
  padding: 10px 2px;
}
.bottom {
  height: 301px;
  background: url(~@/assets/img/footer-bg.png) top center;
  .bottom-m {
    display: flex;
    justify-content: space-between;
    padding-top: 65px;
    color: #fafafa;
    .bottom-c {
      > p {
        font-size: 14px;
        text-transform: uppercase;
        color: #fff;
      }
      p {
        font-family: Source Han Sans CN;
      }
      .divider {
        width: 146px;
        height: 1px;
        background: #e8f6fd;
        margin: 15px 0 30px;
      }
      .bottom-s {
        display: flex;
        > div {
          &:first-child {
            margin-right: 370px;
          }
          h2 {
            font-size: 24px;
            margin-bottom: 25px;
          }
          p {
            font-size: 20px;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
