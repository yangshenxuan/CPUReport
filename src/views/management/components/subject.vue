<template>
  <div class="subject">
    <el-form :inline="true" style="position: relative">
      <el-form-item>
        <el-input v-model="params.name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
      </el-form-item>
      <div class="add-btns">
        <el-button @click="handleAdd()"
          ><i class="el-icon-plus"></i>新增科目</el-button
        >
      </div>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      max-height="630px"
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="headerCellStyle"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="content"
        align="center"
        label="分类说明"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDel(scope.row.id)"
            >删除</el-button
          >
        </template></el-table-column
      ></el-table
    >

    <el-dialog
      :visible.sync="dialogVisible"
      width="680px"
      custom-class="dialog-reset"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <h2>{{ textMap[dialogStatus] }}</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="130px"
      >
        <el-form-item label="分类名称：" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入分类名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类说明：" prop="content">
          <el-input
            v-model="ruleForm.content"
            type="textarea"
            placeholder="请输入说明"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="dialogVisible = false"
          >取消</el-button
        >
        <el-button @click="submitForm()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { subjectList, addSubject, delSubject, updSubject } from "@/api/subject";
import { dateFmt } from "@/utils/time";
export default {
  data() {
    return {
      cellStyle: {
        height: "55px",
      },
      headerCellStyle: {
        height: "55px",
        color: "#333",
        background: " rgba(46, 92, 138, 0.11)",
        borderColor: "#ddd",
      },
      loading: false,
      params: {
        name: "",
      },
      tableData: [],
      dialogVisible: false,
      dialogStatus: "",
      textMap: {
        add: "新增分类",
        edit: "编辑分类",
      },
      ruleForm: {
        id: undefined,
        name: "",
        content: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      subjectList(this.params).then((data) => {
        this.tableData = data.list;
        this.loading = false;
      });
    },
    dateFmt(time) {
      return dateFmt(time, "YYYY-MM-DD HH:mm:ss");
    },
    handleDel(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该记录，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delSubject({ id }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功！",
          });
          this.getList();
        });
      });
    },

    handleEdit(data) {
      this.ruleForm = {
        id: data.id,
        name: data.name,
        content: data.content,
      };
      this.dialogStatus = "edit";
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
    },
        handleAdd() {
      this.ruleForm = {
        id: undefined,
        name: "",
        content: "",
      };
      this.dialogStatus = "add";
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.dialogStatus == "add") {
            addSubject(this.ruleForm).then(() => {
              this.$message({
                type: "success",
                message: "添加成功！",
              });
              this.getList();
              this.dialogVisible = false;
            });
          } else {
            updSubject(this.ruleForm).then(() => {
              this.$message({
                type: "success",
                message: "修改成功！",
              });
              this.getList();
              this.dialogVisible = false;
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.subject {
  width: 100%;
  .add-btns {
    position: absolute;
    top: 0;
    right: 0;
  }
}</style>
