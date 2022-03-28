<template>
  <div class="paper">
    <el-form :inline="true" style="position: relative;">
      <el-form-item>
        <el-select v-model="params.ifOver" placeholder="请选择完成状态">
          <el-option label="全部" :value="-1"></el-option>
          <el-option label="未完成" :value="0"></el-option>
          <el-option label="已完成" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="params.ifStart" placeholder="请选择发布状态">
          <el-option label="全部" :value="-1"></el-option>
          <el-option label="未发布" :value="0"></el-option>
          <el-option label="已发布" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="params.name" placeholder="请输入试卷名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" 
                  @click="getList()">查询</el-button>
      </el-form-item>
      <div class="add-btns">
        <el-button @click="handleAdd()"><i class="el-icon-plus"></i> 新增试卷</el-button>
      </div>
    </el-form>
    <el-table :data="tableData"
              v-loading="loading"
              border
              style="width: 100%"
              :cell-style="cellStyle"
              :header-cell-style="headerCellStyle">
      <el-table-column type="index"
                      label="序号"
                      align="center"
                      width="60">
      </el-table-column>
      <el-table-column prop="name"
                      align="center"
                      label="试卷名称">
      </el-table-column>
      <el-table-column prop="userName"
                      align="center"
                      label="创建人">
      </el-table-column>
      <el-table-column align="center"
                      label="创建时间"
                      width="180">
        <template slot-scope="scope">
          {{dateFmt(scope.row.time)}}
        </template>
      </el-table-column>
      <el-table-column label="组卷"
                      align="center"
                      width="220">
        <template slot-scope="scope">
          <auto-combine :row="scope.row" />
          <el-button type="text"
                    :disabled="scope.row.ifStart == 1"
                    @click="assembly(scope.row.id)">手动组卷</el-button>
        </template>
      </el-table-column>
      <el-table-column label="试卷完成"
                      align="center"
                      width="160">
        <template slot-scope="scope">
          <span v-if="scope.row.ifOver == 1" style="margin-right: 6px;">已完成</span>
          <el-button v-else
                    type="text"
                    @click="finish(scope.row)">完成</el-button>
        </template>
      </el-table-column>
      <el-table-column label="试卷发布"
                      align="center"
                      width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.ifStart == 1"
                    type="text"
                    @click="publish(scope.row, 0)">取消发布</el-button>
          <el-button v-else
                    type="text"
                    @click="publish(scope.row, 1)">发布</el-button>
          <el-button type="text"
                    @click="preview(scope.row.id, scope.row.ifOver)">预览</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                      align="center"
                      width="200">
        <template slot-scope="scope">
          <el-button type="text"
                    :disabled="scope.row.ifStart == 1"
                    @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text"
                    :class="scope.row.ifStart == 1 ? '' : 'red'"
                    :disabled="scope.row.ifStart == 1"
                    @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination class="pagination"
                  hide-on-single-page
                  :current-page.sync="params.page"
                  :page-size="params.pageSize"
                  @current-change="handlePageChange"
                  layout="prev, pager, next, jumper"
                  :page-count="total">
    </el-pagination>

    <el-dialog :visible.sync="dialogVisible"
                width="680px"
                custom-class="dialog-reset"
                :show-close="false"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
      <h2>{{textMap[dialogStatus]}}</h2>
      <el-form :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="130px">
        <el-form-item label="试卷标题：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入试卷标题"></el-input>
        </el-form-item>
        <!-- <el-form-item label="试卷说明：" prop="introduce">
          <el-input v-model="ruleForm.introduce" type="textarea" placeholder="请输入说明"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        <el-button @click="submitForm()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { paperList, addPaper, updPaper, delPaper, paperOver, paperStart } from '@/api/paper'
import { mapGetters } from 'vuex'
import { dateFmt } from '@/utils/time'
import AutoCombine from '@/components/autoCombine'
export default {
  components:{AutoCombine},
  data(){
     return {
      cellStyle: {
        height: '55px',
      },
      headerCellStyle: {
        height: '55px',
        color: '#333',
        background: ' rgba(46, 92, 138, 0.11)',
        borderColor: '#ddd'
      },
      loading: false,
      total: 0,
      params: {
        page: 1,
        pageSize: 10,
        name: '',
        ifOver: -1,
        ifStart: -1,
      },
      tableData: [],
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        add: '新增试卷',
        edit: '编辑试卷'
      },
      ruleForm: {
        id: undefined,
        name: '',
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      }
    }
  },
    computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      const query = { ...this.params }
      if(this.params.ifOver == -1) {
        query.ifOver = undefined
      }
      if(this.params.ifStart == -1) {
        query.ifStart = undefined
      }
      paperList(query).then(data => {
        this.tableData = data.list
        this.total = data.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handlePageChange(page) {
      this.params.page = page
      this.getList()
    },
    dateFmt (time) {
      return dateFmt(time, 'YYYY-MM-DD HH:mm')
    },

    handleAdd() {
      this.ruleForm = {
        id: undefined,
        userId: this.userId,
        name: '',
      }
      this.dialogStatus = 'add'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    handleEdit(data) {
      this.ruleForm = {
        id: data.id,
        name: data.name,
      }
      this.dialogStatus = 'edit'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if(valid) {
          if(this.dialogStatus == 'add') {
            addPaper(this.ruleForm).then(() => {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.getList()
              this.dialogVisible = false
            })
          }else {
            updPaper(this.ruleForm).then(() => {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.getList()
              this.dialogVisible = false
            })
          }
        }
      })
    },

    handleDel(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delPaper({ id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          if(this.tableData.length < 2 && this.params.page > 1) {
            this.params.page -= 1
          }
          this.getList()
        })
      }).catch(() => { });
    },

    // 组卷
    assembly(id) {
      this.$router.push({
        path: '/test-paper',
        query: {
          p_id: id
        }
      })
    },
    // 预览
    preview(id, ifOver) {
      this.$router.push({
        path: '/preview-paper',
        query: {
          p_id: id,
          nd: ifOver == 1 ? undefined : 1
        }
      })
    },
    // 完成
    finish(item) {
      this.$confirm('确定已完成这张试卷吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        paperOver({id: item.id}).then(() => {
          this.getList()
        })
      }).catch(() => { });
    },
    // 发布
    publish(item, ptype) {
      if(item.ifOver == 0&&ptype == 1) {
        this.$message({
          type: 'warning',
          message: '请先完成试卷!'
        });
        return 
      }
      this.$confirm(`确定${ptype==0?'取消':''}发布这张试卷吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        paperStart({id: item.id, ifStart: ptype}).then(() => {
          this.getList()
        })
      }).catch(() => { });
    }
  }
}
</script>

<style lang="scss" scoped>
  .paper {
  width: 100%;
  .add-btns {
    position: absolute;
    top: 0;
    right: 0;
  }
  .red {
    color: red;
  }
}
</style>