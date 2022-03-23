<template>
  <div class="replybox">
    <div class="title" v-if="!exportShow">
      <p>
        理论考核<span>考核人数:{{ num }}人</span>
      </p>
    </div>
    <div class="time" v-if="exportShow">
      <div style="display：flex;">
        <el-select
          v-model="listQuery.userId"
          filterable
          :filter-method="handleFilter"
        >
          <el-option label="全部" :value="-1"></el-option>
          <div v-infinite-scroll="load" style="overflow-y: auto">
            <el-option
              v-for="item in userList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option></div
        ></el-select>
        <el-select
          v-model="listQuery.tpId"
          style="margin-left: 20px"
          filterable
          :filter-method="handlePaperFilter"
        >
          <el-option label="全部" :value="-1"></el-option>
          <div v-infinite-scroll="loadPaper" style="overflow-y: auto">
            <el-option
              v-for="item in paperList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option></div
        ></el-select>
        <el-button
          type="primary"
          style="margin-left: 20px"
          @click="getReplyList()"
          >查询</el-button
        >
      </div>
      <el-button @click="handleExport">成绩导出</el-button>
    </div>
    <el-table
      :data="replyList"
      v-loading="loading"
      border
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="headerCellStyle"
    >
      <el-table-column type="index" label="序号" align="center" width="80">
      </el-table-column>
      <el-table-column prop="school" align="center" label="学校">
      </el-table-column>
      <el-table-column prop="college" align="center" label="学院">
      </el-table-column>
      <el-table-column prop="major" align="center" label="专业">
      </el-table-column>
      <el-table-column prop="classes" align="center" label="班级">
      </el-table-column>
      <el-table-column prop="userName" align="center" label="姓名">
      </el-table-column>
      <el-table-column prop="tpName" align="center" label="试卷名">
      </el-table-column>
      <el-table-column align="center" width="180" label="答题时间">
        <template slot-scope="scope">
          {{ dateFmt(scope.row.time) }}
        </template>
      </el-table-column>
      <el-table-column prop="score" align="center" label="分数">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail(scope.row)">{{
            scope.row.score
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination class="pagination"
                   hide-on-single-page
                   :current-page.sync="listQuery.page"
                   :page-size="listQuery.pageSize"
                   @current-change='change'
                   layout="prev,pager,next,jumper"
                   :page-count="total"></el-pagination>
    <el-dialog title="答题记录"
               :append-to-body='true'
               width="670px"
               :close-on-click-modal='false'
               :close-on-press-escape='false'
               :visible.sync='dialogVisible'>
    <p class="tip">{{paperInfo.name}}<span>共{{questionList.length}}题</span><span>总分{{paperInfo.totalScore}}分</span><span>得分{{paperInfo.score}}分</span></p>
    <ul class="fixed">
      <li v-for="(item,num) in questionList" :key="item.id">
        <p>
          <span>{{num + 1}}.</span>
          <span>【{{item.type == 1 ? '单选':'多选'}}】</span>
          <span>【{{item.score}}分】</span>
          {{item.stem}}
        </p>
        <div class="option" v-for="(answer,index) in item.options" :class="item.results.includes(answer.option)?'on':''" :key="index+'ans'">
          <span class="ans_box"><i class="el-icon-check" v-if="item.results.includes(answer.option)"></i></span>
          <span>{{answer.option}}.</span>
          <span>{{answer.cont}}</span>
        </div>
        <p class="answer"><span>正确答案：{{item.result}}</span></p>
      </li>
    </ul>
               </el-dialog>
  </div>
</template>
<script>
import {testRecord} from '@/api/paper'
import {dateFmt} from '@/utils/time'
import {getReply} from '@/api/export'
import {mapGetters} from 'vuex'
import {userList} from '@/api/user'
import {paperList,paperQuestionList} from '@/api/paper'
export default {
  props:['isUserId','export'],
  data(){
    return{
      exportShow: this.export,
      cellStyle:{
        height:'55px'
      },
      headerCellStyle:{
        height:'55px',
        color:'#333',
        background:'rgba(46,92,138,0.11)',
        borderColor:'#ddd'
      },
      loading:false,
      total:0,
      listQuery:{
        userId:-1,
        tpId:-1,
        page:1,
        pageSize:10
      },
      replyList: null,
      num:10,
      userParam:{
        role:3,
        name:'',
        page:1,
        pageSize:10
      },
      userList:[],
      userTotal:0,
      paperParam:{
        page:1,
        pageSize:10,
        name:'',
        ifOver:1,
        ifStart:1
      },
      paperList:[],
      paperTotal:0,
      dialogVisible:false,
      questionList:[],
      paperInfo:{
        name:'',
        totalScore:null,
        score:null
      },
      results:[]
    }
  },
  created(){
    this.getUsers()
    this.getPapers()
    this.getReplyList()
  },
  computed:{
    ...mapGetters([
      'userId'
    ])
  },
  methods:{
    //考核记录
    getReplyList(){
      this.loading = true
      if(this.isUserId){
        this.listQuery.userId=this.isUserId
      }
      const params = {...this.listQuery}
      if(this.listQuery.userId == -1){
        params.userId = undefined
      }
      if(this.listQuery.tpId == -1){
        params.tpId = undefined
      }
      testRecord(params).then((data)=>{
        this.total = data.total
        this.replyList = data.list
        this.num = data.person
        this.loading = false
      })
    },
    change(page){
      this.listQuery.page = page
      this.getReplyList()
    },
    dateFmt(time){
      return dateFmt(time,'YYYY-MM-DD HH:mm')
    },
    getUsers(){
      userList(this.userParam).then(data =>{
        this.userList = data.list
        this.userTotal = data.total
      })
    },
    handleFilter(query){
      if(query != ''){
        this.userParam.name = query
        this.userParam.page = 1
        this.getUsers()
      }
    },
    load(){
      if(this.userParam.page < this.userTotal){
        this.userParam.page+=1
        userList(this.userParam).then(data=>{
          this.userList = this.userList.concat(data.list)
        })
      }
    },
    getPapers(){
      paperList(this.paperParam).then(data => {
        this.paperList = data.list
        this.paperTotal = data.total
      })
    },
    handlePaperFilter(query){
      if(query != ''){
        this.paperParam.name = query
        this.paperParam.page = 1
        this.getPapers()
      }
    },
    loadPaper(){
      if(this.paperParam.page < this.paperTotal){
        this.paperParam.page+=1
        userList(this.paperParam).then(data => {
          this.paperList = this.paperList.concat(data.list)
        })
      }
    },
    handleDetail(row) {
      const tempRes = JSON.parse(row.result).wz
      paperQuestionList({ tpId: row.tpId }).then(data => {
        data.wz.forEach(v => {
          v.options = JSON.parse(v.branch)
          v.results = tempRes.filter(item => item.id == v.id)[0].result.split(',')
        })
        this.paperInfo = {
          name: data.tpName,
          totalScore: data.wzScore,
          score: row.score
        }
        this.questionList = data.wz
        this.dialogVisible = true
      })
    },
    //成绩导出
    handleExport(){
      if(!this.replyList.length){
        this.$message({
          type:'warning',
          message:'暂无成绩可以导出'
        })
        return false
      }
      window.open(getReply(this.listQuery))
    }
  }
};
</script>
<style lang="scss">
.time .el-date-editor .el-range-separator {
  width: 6%;
}
</style>
<style lang="scss" scoped>
.title {
  text-align: left;
  border-left: 8px solid black;
  padding-left: 5px;
  margin-bottom: 25px;
  > p{
    font-size: 22px;
    font-weight: bold;
    color: #333;
    font-family: Source Han Sans CN;
    >span {
      margin-left: 26px;
      font-size: 18px;
      font-weight: 500;
    }
  }
}
.time {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}
.tip {
  font-weight: 700;
  margin-bottom: 10px;
  span {
    margin-left: 20px;
  }
}
.fixed {
  height: 600px;
  overflow-y: auto;
  width: 100%;
  overflow-y: auto;
  li {
    position: relative;
    margin-bottom: 20px;
    >p {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 1.5;
      color: #333;
      margin-bottom: 15px;
    }
    .option {
      background: #eef1f7;
      border-radius: 4px;
      line-height: 32px;
      margin-bottom: 5px;
      margin-left: 10px;
      font-size: 15px;
      color: #555;
      font-weight: 400;
      &.on {
        background: #4269A1;
        color: #fff;
        .ans_box {
          background: #fff;
          color: #4269A1;
          top: 0;
        }
      }
    }
    .answer {
      color: #08a55c;
      padding-left: 12px;
    }
  }
  .ans_box {
    margin: 0 10px;
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
}</style>
