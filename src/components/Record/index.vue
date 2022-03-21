<template>
  <div class="recordbox">
    <div class="title" v-if="!exportShow">
      <p>
        {{ TITLE }}<span>实训人数：{{ num }}人</span>
      </p>
    </div>
    <div class="time" v-if="exportShow">
      <div>
        <el-select
          v-model="listQuery.userId"
          filterable
          :filter-method="handleFilter"
        >
          <el-option label="全部" :value="-1"></el-option>
          <div v-infinite-scroll="load" style="overflow-y: auto">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option></div
        ></el-select>
        <el-button
          type="primary"
          style="margin-left: 20px"
          @click="getRecordList()"
        >
          查询
        </el-button>
      </div>
      <el-button @click="handleExport">成绩导出</el-button>
    </div>
    <el-table
      :data="recordList"
      v-loading="loading"
      border
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="headerCellStyle"
    >
      <el-table-column type="index" label="序号" align="center" width="80">
      </el-table-column>
      <el-table-column prop="username" align="center" label="操作人">
      </el-table-column>
      <el-table-column align="center" width="160" label="开始时间">
        <template slot-scope="scope">
          {{ dataFmt(scope.row.startTime) }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="160" label="结束时间">
        <template slot-scope="scope">
          {{ dateFmt(scope.row.stopTime) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        align="center"
        label="实训得分"
      ></el-table-column>
      <el-table-column label="实验报告" align="center" width="150">
        <template slot-scope="scope">
          <TopBtn :rId="scope.row.id" v-if="!exportShow" />
          <div v-else>
            <el-button type="text" @click="handleReport(scope.row.reposrtId)"
              >查看</el-button
            >
            <el-button type="text" @click="mark(scope.row)">打分</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="reportScore"
        align="center"
        label="报告得分"
      ></el-table-column>
      <el-table-column prop="score" label="总得分">
        <template slot-scope="scope">
          <span>{{ scope.row.totalScore }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="score"
                       align="center"
                       label="评语">
                       <template slot-scope="scope">
                        
          <span>{{comtFmt(scope.row.totalScore)}}</span>
                           
                         
                       </template></el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      hide-on-single-page
      :current-page.sync="listQuery.page"
      :page-size="listQuery.pageSize"
      @current-change="change"
      layout="prev,pager,next,jumper"
      :page-count="total"
    ></el-pagination>

    <el-dialog
      :visible.sync="dialogVisible"
      width="600px"
      custom-class="dialog-reset"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <h2>报告评分</h2>
      <el-form :model="ruleForm" ref="ruleForm" label-width="130px">
        <el-form-item label="学校：">
          {{ userDetail.school }}
        </el-form-item>
        <el-form-item label="院系：">
          {{ userDetail.college }}
        </el-form-item>
        <el-form-item label="专业：">
          {{ userDetail.major }}
        </el-form-item>
        <el-form-item label="班级">
          {{ userDetail.classes }}
        </el-form-item>
        <el-form-item label="姓名：">
          {{ userDetail.name }}
        </el-form-item>
        <el-form-item label="得分：">
          <el-input v-model="ruleForm.score"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="dialogVisible = false"
          >取消</el-button
        >
        <el-button @click="submit()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { userList, userDetail } from "@/api/user";
import { recordList } from "@/api/record";
import { addTemplate } from "@/api/template";
import { downloadUrl } from "@/api/file";
import { dateFmt } from "@/api/export";
import { findRemark } from "@/api/remark";
import { mapGetters } from "vuex";
import TopBtn from "../TopBtn/index.vue";
export default {
  props: ["isUserId", "export", "isExam"],
  components: { TopBtn },
  data() {
    return {
      exportShow: this.export,
      cellStyle: {
        height: "55px",
      },
      headerCellStyle: {
        height: "55px",
        color: "#333",
        background: "rgba(46,96,138,0.11)",
        borderColor: "#ddd",
      },
      loading: false,
      total: 0,
      time: null,
      listQuery: {
        page: 1,
        pageSize: 10,
        userId: -1,
        isexam: undefined,
      },
      recordList: [],
      num: 10,
      remarkList: [],
      userParam: {
        role: 3,
        name: "",
        page: 1,
        pageSize: 10,
      },
      userList: [],
      userTotal: 0,
      dialogVisible: false,
      userDetail: {},
      ruleForm: {
        score: null,
      },
      tempRow: {},
    };
  },
  created() {
    this.getRemark();
    this.getUsers();
    this.getRecordList();
  },
  methods: {
    getRecordList() {
      //考核记录
      this.loading = true;
      if (this.isUserId) {
        this.listQuery.userId = this.isUserId;
      } else {
        this.listQuery.userId = -1;
      }
      const params = { ...this.listQuery };
      if (this.listQuery.userId == -1) {
        params.userId = undefined;
      }
      recordList(params).then((data) => {
        this.total = data.total;
        data.list.forEach((el) => {
          if (el.reportScore) {
            if (!el.reportScore) {
              el.reportScore =
                el.score > 5 ? el.score - 5 + Math.ceil(10 * Math.random()) : 5;
              el.totalScore =
                (el.score * Number(this.remarkList[4].result)) / 100 +
                (el.reportScore * Number(this.remarkList[5].result)) / 100;
            } else {
              el.reportScore = Number(el.reportScore);
              el.totalScore = Number(el.totalScore);
            }
          } else {
            el.reportScore = 0;
            el.totalScore =
              (el.score * Number(this.remarkList[4].result)) / 100;
          }
        });
        this.recordList = data.list;
        this.loading = false;
      });
    },
    dateFmt(time) {
      return dateFmt(time, "YYYY-MM-DD  HH:mm");
    },
    change(page) {
      this.listQuery.page = page;
      this.getRecordList();
    },
    comtFmt(num) {
      let commt = "";
      switch (num) {
        case 0 <= num < 60:
          commt = this.remarkList[0].result;
          break;
        case 60 <= num < 70:
          commt = this.remarkList[1].result;
          break;
        case 70 <= num < 90:
          commt = this.remarkList[2].result;
          break;
        case 90 <= num <= 100:
          commt = this.remarkList[3].result;
          break;
        default:
          commt = "";
      }
      return commt;
    },
    getUsers(){
      userList(this.userParam).then(data =>{
        this.userList = data.list
        this.userParamTotal = data.total
      })
    },
    handleFilter(query){
      if(query != ''){
        this.userParam .name = query
        this.userParam.page  =1
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
    handleReport(fid){
      if(!fid){
        this.$message.error('暂未上传实验报告')
        return
      }
      window.open(downloadUrl(fid))
    },

    //算分
    getRemark(){
      findRemark().then(data => {
        this.remarkList = data.list
      })
    },
    //打分
    mark(row){
      this.tempRow = row
      userDetail({id:row.userId}).then(data => {
        this.userDetail =data
        this.dialogVisible = true
      })
    },
    submit(){
      let scoreTotal = this.tempRow.score * Number(this.remarkList[4].result) / 100 + (this.ruleForm.score * Number(this.remarkList[5].result) / 100)
    addTemplate({
      id:this.tempRow.id,
      fileId: this.tempRow.reposrtId,
      score: this.ruleForm.score,
      totalScore:scoreTotal
    }).then(()=>{
      this.getRecordList()
      this.dialogVisible = false
    })
    },
    handleExport(){
      if(!this.recordList.length){
        this.$message({
          type:'warning',
          message:'暂无成绩可以导出'
        })
        return false
      }
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
  border-left: 8px solid #ddd;
  padding-left: 5px;
  margin-bottom: 25px;
  > p{
    font-size: 20px;
    font-weight: bold;
    color: #333;
    font-family: Source Han Sans CN;
    >span {
      margin-left: 66px;
    }
  }
}
.time {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
