<template>
  <div class="question">
    <div class="top">
      <div class="left">
        <el-select v-model="listQuery.type"
                  placeholder="请选择分类">
          <el-option label="全部"
                    :value="-1"></el-option>
          <el-option v-for="item in subjectList" 
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"></el-option>
        </el-select>
        <el-select v-model="listQuery.type"
                  placeholder="请选择题型">
          <el-option label="全部"
                    :value="-1"></el-option>
          <el-option label="单选"
                    :value="1"></el-option>
          <el-option label="多选"
                    :value="2"></el-option>
        </el-select>
        <el-input class="searchInput"
                  v-model="listQuery.stem"
                  placeholder="请输入题目名称"
                  @keyup.enter.native="getQuestionList()">
        </el-input>
        <el-button type="primary"
                  icon="el-icon-search"
                  @click="getQuestionList()">查询</el-button>
      </div>
      <div>
        <el-button icon="el-icon-plus"
                  @click="handleAdd()">添加题目</el-button>
        <el-button @click="handleDownload()"><i class="el-icon-download"></i> 模板下载</el-button>
        <el-upload 
          class="upload"
          action=""
          :before-upload="beforeUpload"
          :multiple="false"
          :show-file-list="false"
          :http-request="upload">
          <el-button><i class="el-icon-plus"></i> 批量导入</el-button>
        </el-upload>
      </div>
    </div>
    <el-table :data="list"
              v-loading="loading"
              style="width: 100%"
              :show-header="false">
      <el-table-column label="题目">
        <template slot-scope="scope">
          <p class="title">
            <span>【{{scope.row.type == 1 ? '单选' : '多选'}}】</span>
            <span>【{{scope.row.subName}}】</span>
            <span>【{{scope.row.level}}分】</span>
            {{scope.row.stem}}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                      align="center"
                      width="200">
        <template slot-scope="scope">
          <el-button type="text"
                    @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text"
                    style="color: red;"
                    @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination class="pagination"
                  hide-on-single-page
                  :current-page.sync="listQuery.page"
                  :page-size="listQuery.pageSize"
                  @current-change="handleCurrentChange"
                  layout="total, prev, pager, next, jumper"
                  :page-count="total">
    </el-pagination>

    <el-dialog :visible.sync="dialogVisible"
                width="850px"
                custom-class="dialog-reset"
                :show-close="false"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
      <h2>{{isAdd ? '新增题目': '编辑题目'}}</h2>
      <el-form :model="form"
              :rules="rules"
              ref="form"
              label-width="130px">
        <el-form-item label="题干："
                      prop="stem">
          <el-input v-model="form.stem" placeholder="请输入题干"></el-input>
        </el-form-item>
        <div class="between">
          <el-form-item label="科目："
                        prop="subId">
            <el-select v-model="form.subId"
                      placeholder="请选择科目">
              <el-option v-for="item in subjectList" 
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型："
                        prop="type">
            <el-select v-model="form.type"
                      placeholder="请选择题型">
              <el-option label="单选"
                        :value="1"></el-option>
              <el-option label="多选"
                        :value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="题支："
                      prop="branch"
                      style="position: relative;">
          <span class="tip">*</span>
          <div class="tabOpt" @click="addOpt()" v-if="answers.length<6">
              <i class="el-icon-plus"></i> 题支
          </div>
          <div class="circul" v-for="(answer,index) in answers" :key="index+'ans'">
              <span style="margin-right:10px">{{answer.option}}</span>
              <span class="tabRemove" v-if="index==(answers.length-1)&&answer.option!=='B'">
                  <i class="el-icon-remove" @click="remove(index)"></i>
              </span>
              <el-input v-model="answer.cont" maxlength="150" style="width:69%;" placeholder="请输入题支"></el-input>
              <span @click="toggle(answer.option)" class="sel_box"><i class="el-icon-check" v-show="result.includes(answer.option)"></i></span>
              <span>正确答案</span>
          </div>
        </el-form-item>
        <el-form-item label="分值："
                      prop="level">
          <el-input v-model="form.level" placeholder="请输入分值"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        <el-button @click="submitForm()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { questionList, delQuestion, addQuestion, updQuestion } from '@/api/question'
import { questionTemplate } from '@/api/template'
import { mapGetters } from 'vuex'
import { subjectList } from '@/api/subject' 
export default {
  data() {
    return {
      subjectList: [],
      listQuery: {
        page: 1,
        pageSize: 10,
        subId: -1,
        type: -1,
        stem: "",
      },
      total:0,
      list:null,
      loading:false,
      dialogVisible:false,
      form:{
        userId:this.userId,
        userName:this.userName,
        stem:'',
        type:null,
        subId:null,
        branch:'',
        result:'',
        level:''
      },
      rules:{
        stem:[
          {required:true,message:'请输入题目题干',trigger:'blur' }
        ],
        type:[
          {
            required:true,message:'请输入题目题型',trigger:'change'
          }
        ],
        subId:[
          {required:true,message:'请选择题目分类',trigger:'change'}
        ],
        level:[
          { required:true,message:'请输入题目分值',trigger:'blur'}
        ],
      },
      answers:[
        {
          option:'A',
          cont:'',
        },
        {
          option:'B',
          cont:'',
        }
      ],
      result:[],
      isAdd:true
    };
  }, 
  created(){
    this.getAllSubject()
    this.getQuestionList()
  },
  computed:{
    ...mapGetters([
      'userId',
      'userName'
    ])
  },
  methods:{
    //题目列表
    getQuestionList(){
      this.loading = true
      const params = {...this.listQuery}
      if(this.listQuery.type == -1){
        params.type = undefined
      }
      if(this.listQuery.subId == -1){
        params.subId = undefined
      }
      questionList(params).then((data) => {
        this.total = data.total
        this.list = data.list
        this.loading = false
      })
    },
    handleCurrentChange(page){
      this.listQuery.page= page
      this.getQuestionList()
    },
    getAllSubject(){
      subjectList().then(data => {
        this.subjectList = data.list
      })
    },
    handleDownload(){
      window.open(process.env.VUE_APP_BASE_API + '/questionmodule.xlsx')
    },upload(obj){
      let fd = new FormData()
      fd.append('file',obj.file)
      fd.append('userId',this.userId)
      fd.append('userName',this.userName)
      questionTemplate(fd),then(()=>{
        this.$message({
          message:'上传成功',
          type:'success'
        })
        this.getQuestionList()
      })
    },
        beforeUpload (file) {
      const isDoc = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isExcel = file.type === 'application/vnd.ms-excel'
      // const isLtMB = file.size / 1024 / 1024 < 10;
      if (!isExcel && !isDoc) {
        this.$message.error('上传文件只能是EXCEL格式!');
        return false
      }
      // if (!isLtMB) {
      //   this.$message.error('上传文件大小不能超过 10MB!');
      //   return false
      // }
      return true
    },

    handleAdd(){
      this.isAdd = true
      this.form = {
        userId:this.userId,
        userName:this.userName,
        stem:'',
        type:null,
        subId: null,
        branch: '',
        result: '',
        level: ''
      }
      this.answers = [
        {
          option:'A',
          cont:'',
        },
        {
          option:'B',
          cont:'',
        }
      ]
      this.result=[]
      this.dialogVisible = true

      this.$nextTick(function(){
        this.$refs.form.clearValidate()
      })
    },
    handleEdit (item) {
      this.isAdd = false
      this.form = {
        userId: item.userId,
        userName: item.userName,
        stem: item.stem,
        type: item.type,
        subId: item.subId,
        branch: '',
        result: '',
        level: item.level
      }
      this.answers = JSON.parse(item.branch)
      this.result = item.result.split(',')
      this.dialogVisible = true
      this.$nextTick(function () {
        this.$refs.form.clearValidate();
      });
    },
    addOpt(){
      let newObj = {
        option:String.fromCharCode(65 + this.answers.length),
        cont:''
      }
      this.answers.push(newObj)
    },
    remove(i){
      this.answers.splice(i,1)
    },
    toggle(ans){
      if(this.result.includes(ans)){
        this.result = this.result.filter( item => item != ans)
      }else{
        this.result.push(ans)
      }
    },
    submitForm(){
      this.$refs.form.validate((valid)=>{
        if(valid){
          for(let i in this.answers){
            if(!this.answers[i].cont){
              this.$message.info(`请填写${this.answers[i].option}选项的题干`)
              return
            }
          }
          if(this.result.length==0){
            this.$message.info('请选择正确答案')
            return
          }
          if(this.form.type == 1&&this.result.length>1){
            this.$message.info('单选题只能选一个正确答案')
            return
          }
          let params = {
            ...this.form
          }
          params.branch = JSON.stringify(this.answers)
          params.result = this.result.sort().join()
          if(this.isAdd){
            //添加
            addQuestion(params).then(()=>{
              this.$message({
                type:'success',
                message:'创建题目成功！'
              })
              this.getQuestionList()
              this.dialogVisible = false
            })
          }else{
            //修改
            updQuestion(params).then(()=>{
              this.$message({
                type:'success',
                message:'编辑题目成功！'
              })
              this.getQuestionList()
              this.dialogVisible = false
            })
          }
        }else{
          return false
        }
      })
    },
    handleDel (id) {
      this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delQuestion({ id }).then(() => {
          if(this.list.length < 2 && this.listQuery.page > 1) {
            this.listQuery.page -= 1
          }
          this.getQuestionList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }).catch(() => {});
    },
  }
};
</script>

<style lang="scss" scoped>
.question {
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .left {
      display: flex;
    }
    .el-select {
      margin-right: 10px;
    }
    .searchInput {
      margin-right: 10px;
      width: 250px;
    }
    .upload {
      display: inline-block;
      margin-left: 10px;
    }
  }
  .title {
    width: 100%;
    font-size: 16px;
    span {
      font-weight: 600;
      max-width: 700px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .tip {
    position: absolute;
    color: #F56C6C;
    font-size: 20px;
    left: -85px;
    font-weight: 700;
  }
  .between {
    display: flex;
    justify-content: space-between;
  }
  .tabOpt {
    width: 190px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #dcdfe6;
    padding-left: 30px;
    background: #fff;
    font-size: 18px;
    cursor: pointer;
  }
  .circul{
    display: flex;
    margin: 10px 0;
    position: relative;
    font-size: 18px;
    .tabRemove{
        font-size: 15px;
        color: brown;
        position: absolute;
        left: -10px;
        top: -10px;
        cursor: pointer;
    }
    .sel_box {
      margin: 0 10px;
      cursor: pointer;
      display: inline-block;
      font-size: 20px;
      width: 38px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      background: #fff;
      border: 1px solid #dcdfe6;
      margin-right: 5px;
    }
  }
}</style>
