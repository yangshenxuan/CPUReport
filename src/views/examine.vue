<template>
  <div class="exam">
    <div class="top">
      <div class="nav cont">
        <span @click="$router.go(-1)">
          <img src="../assets/img/back.png" alt="" />
        </span>
        <router-link to="/index">
          <img src="../assets/img/logo.png" alt=""
        /></router-link>
        <p>{{ TITLE }}</p>
      </div>
    </div>
    <div class="examine-content cont" v-loading="loading">
      <div class="cont-wrapper">
        <div class="contit">
          <h3>理论考核-{{ paperInfo.paperName }}</h3>
          <p>
            <span>--共{{ questionList.length }}题</span
            ><span>总分{{ paperInfo.totalScore }}分</span>
          </p>
        </div>
        <div
          class="question"
          v-for="(item, index) in questionList"
          :key="index"
        >
          <p>
            <span>{{ index + 1 }}</span>
            <span style="font-weight: 600"
              >【{{ item.type == 1 ? "单选" : "多选" }}】</span
            >
            <span style="font-weight: 600">【{{ item.score }}分】 </span>
            {{ item.stem }}
          </p>

          <div class="divider"></div>
          <div class="option-box">
            <div
              class="option"
              :class="item.results.includes(option.option) ? 'on' : ''"
              v-for="(option, i) in item.options"
              :key="i"
            >
              <span
                class="answer-box"
                @click="choose(item.id, index, option.option)"
                ><i
                  class="el-icon-check"
                  v-if="item.results.includes(option.option)"
                ></i
              ></span>
              <span style="margin-right: 5px">{{ option.option }}.</span>
              <span>{{ option.cont }}</span>
            </div>
            <p class="tip" v-show="quesIds.includes(item.id)">请选择正确答案</p>
          </div>
        </div>
        <div class="submit-btn">
          <el-button type="primary" style="width: 150px" @click="submit()"
            >提交</el-button
          >
        </div>
      </div>
    </div>
    <Button />
    <!-- 弹框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="530px"
    >
      <div slot="title" style="text-align: center">成绩</div>
      <div class="score-box">
        <img :src="scoreText.src" alt="" />
        <p>
          {{ scoreText.text }} <span class="score">{{ score }}</span
          >分
        </p>
      </div>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="$router.go(-1)">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { paperQuestionList, testSubmit } from "@/api/paper";
import Button from "@/Layout/components/Bottom.vue";
import { mapGetters } from "vuex";
export default {
  components: { Button },
  data() {
    return {
      questionList: [],
      paperInfo: {
        paperName: "",
        totalScore: null,
      },
      loading: false,
      quesIds: [],
      dialogVisible: true,
      score: null,
    };
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapGetters(["userId"]),
    scoreText() {
      const obj = {
        text: null,
        src: null,
      };
      if (100 >= this.score >= 90) {
        obj.text = "恭喜你";
        obj.src = require("../assets/img/90-100.png");
      } else if (this.score >= 70) {
        obj.text = "恭喜你 ";
        obj.src = require("../assets/img/70-89.png");
      } else if (this.score >= 60) {
        obj.text = "恭喜你 ";
        obj.src = require("../assets/img/60-69.png");
      } else {
        obj.text = "可惜 ";
        obj.src = require("../assets/img/0-59.png");
      }
      return obj;
    },
  },
  methods: {
    getList() {
      this.loading = true;
      paperQuestionList({ tpId: this.$route.query.p_id }).then((data) => {
        data.wz.forEach((v) => {
          v.options = JSON.parse(v.branch);
          v.results = [];
        });
        this.questionList = data.wz;
        this.paperInfo = {
          paperName: data.tpName,
          totalScore: data.wzScore,
        };
        this.loading = false;
      });
    },
    choose(id, i, answer) {
      if (this.questionList[i].results.includes(answer)) {
        this.questionList[i].results = this.questionList[i].results.filter(
          (item) => item != answer
        );
      } else {
        this.questionList[i].results.push(answer);
      }
      if (this.quesIds.includes(id)) {
        this.quesIds = this.quesIds.filter((el) => el != id);
      }
    },
    submit() {
      let temp = [];
      this.questionList.forEach((el) => {
        if (!el.results.length) {
          temp.push(el.id);
        }
      });
      if (temp.length) {
        this.quesId = temp;
        this.$message.error("有题目还没有作答");
        return false;
      }
      let wz = [];
      this.questionList.forEach((el) => {
        wz.push({ id: el.id, result: el.results.sort().join() });
      });
      const submitForm = {
        userId: this.userId,
        tpId: this.$route.query.p_id,
        result: JSON.stringify({ wz }),
      };
      testSubmit(submitForm).then((data) => {
        this.dialogVisible = true;
        this.score = data.score;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.exam {
  width: 100%;
  min-height: 100%;
  background: rgba($color: #103871, $alpha: 0.08);
  .top {
    height: 120px;
    background: url("../assets/img/header.png") no-repeat;
    padding-top: 35px;
    .nav {
      display: flex;
      align-items: center;
      span {
        cursor: pointer;
        position: relative;
      }
      img {
        margin-right: 45px;
      }
      p {
        font-size: 30px;
        font-weight: 300;
        color: #fff;
      }
    }
  }
  .examine-content {
    background: #fff;
    margin-top: 20px;
    margin-bottom: 100px;
    .cont-wrapper {
      padding: 30px 20px;
      .contit {
        border: 2px solid #e5e5e5;
        border-bottom: none;
        padding: 40px 0;
        margin-bottom: 0px;
        p {
          display: flex;
          align-items: flex-end;
          color: black;
          font-size: 15px;
          span {
            padding-left: 20px;
          }
        }
      }
      .question {
        border: 2px solid #e5e5e5;
        padding: 40px 178px 35px 85px;
        color: black;
        p {
          font-size: 18px;
          line-height: 1.5;
          font-family: Source Han Sans CN;
          font-weight: 500;
        }
        .divider {
          height: 1px;
          width: 100%;
          background: #e5e5e5;
          margin: 20px 0;
        }
        .option-box {
          font-size: 16px;
          color: #555;
          font-family: Source Han Sans CN;
          font-weight: 400;
          .option {
            background: #eef1f7;
            border-radius: 4px;
            line-height: 32px;
            margin-bottom: 5px;
            &.on,
            &:hover {
              background: #4269a1;
              color: #fff;
              .answer-box {
                background: #fff;
                color: #4269a1;
              }
            }
            &.on {
              .answer-box {
                top: 0;
              }
            }
          }
          .answer-box {
            margin: 0 10px;
            cursor: pointer;
            display: inline-block;
            position: relative;
            top: 4px;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            background: #b1b1b1;
            border-radius: 50%;
            color: #fff;
          }
        }
        .tip {
          color: #f63e3e;
          font-size: 14px;
          position: absolute;
        }
      }
      .submit-btn {
        text-align: center;
        border: 2px solid #e5e5e5;
        padding: 80px 0;
        border-top: none;
      }
    }
  }
    .score-box {
      text-align: center;
      font-size: 16px;
      .score {
        font-size: 32px;
        color: black;
        font-weight: 700;
      }
    }
}
</style>
