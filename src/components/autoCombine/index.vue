<template>
  <div class="auto">
    <el-button type="text"
              :disabled="row.ifStart == 1"
              @click="autoOpen()">自动选题</el-button>
    <el-dialog :append-to-body="true"
              :show-close="false"
              width="670px"
              :close-on-click-modal="false"
              :close-on-press-escape="false"
              :visible.sync="dialogVisible">
      <h2>自动选题</h2>
      <div class="inputnum" v-show="!listShow">
        <label>请输入所需题目数量：</label>
        <el-input v-model="params.pageSize"></el-input>
      </div>
      <p class="stati" v-show="listShow">总分{{totalScore}}分</p>
      <ul v-loading="loading" v-show="listShow">
        <li v-for="(item, num) in list" :key="item.id">
          <p>
            <span>{{num + 1}}.</span>
            <span>【{{item.type == 1 ? '单选' : '多选'}}】</span>
            <span>【{{item.level}}分】</span>
            {{item.stem}}
          </p>
          <div class="answers" v-for="(answer,index) in item.answers" :key="index+'ans'">
            <span class="ans_box"><i class="el-icon-check" v-if="item.results.includes(answer.option)"></i></span>
            <span>{{answer.option}}.</span>
            <span>{{answer.cont}}</span>
          </div>
        </li>
      </ul>
      <div slot="footer" style="text-align: center;">
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        <el-button v-show="!listShow" @click="confirm()">确认</el-button>
        <el-button v-show="listShow" type="primary" plain @click="listShow = false">重新选题</el-button>
        <el-button v-show="listShow" @click="submit()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { questionList } from '@/api/question'
import { addPaperQuestion } from '@/api/paper'
import { mapGetters } from 'vuex'
export default {
  props: ['row'],
  data () {
    return {
      dialogVisible: false,
      params: {
        page: 1,
        pageSize: null,
        auto: 1
      },
      list: [],
      totalScore: null,
      loading: false,
      listShow: false
    };
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    autoOpen () {
      this.dialogVisible = true
      this.listShow = false
      this.params.pageSize = null
    },
    confirm() {
      if(!/^[1-9]|[1-9]\d $/.test(this.params.pageSize)) {
        this.$message.error('请输入正确的数字')
        return
      }
      questionList(this.params).then(data => {
        let scoreSt = 0
        data.list.forEach(v => {
          v.answers = JSON.parse(v.branch)
          v.results = v.result.split(',')
          scoreSt += v.level
        })
        console.log(scoreSt)
        this.list = data.list
        this.totalScore = scoreSt
        this.listShow = true
      })
    },
    submit() {
      let result = []
      this.list.forEach(el => {
        result.push(el.id)
      })
      addPaperQuestion({tpId: this.row.id, ids: result.join()}).then(() => {
        this.$message({
          type: 'success',
          message: '添加题目成功！'
        })
        this.dialogVisible = false
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.auto {
  display: inline-block;
  margin-right: 6px;
}
h2 {
  text-align: center;
}
.inputnum {
  margin: 50px 0;
  display: flex;
  label {
    width: 40%;
    font-size: 18px;
    line-height: 40px;
  }
}
.stati {
  margin-top: 10px;
  font-weight: 600;
}
ul {
  width: 100%;
  height: 520px;
  overflow-y: auto;
  margin-top: 10px;
  li {
    position: relative;
    margin-bottom: 20px;
    >p {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 1.5;
      color: #333;
    }
    .answers {
      margin-bottom: 10px;
      font-size: 15px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #555;
      &:first-child {
        .ans_box {
          top: 1px !important;
        }
      }
    }
  }
}
.ans_box {
  margin: 0 10px;
  cursor: pointer;
  display: inline-block;
  position: relative;
  top: 3px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background: #b1b1b1;
  border-radius: 50%;
  color: #fff;
  border: 1px solid #dcdfe6;
}
</style>