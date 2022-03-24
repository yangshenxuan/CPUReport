<template>
  <div class="user">
    <div class="nav">
      <span :class="params.role == 3 ? 'on' : ''" @click.prevent="roleChange(3)"
        >学生</span
      >
      <span :class="params.role == 2 ? 'on' : ''" @click.prevent="roleChange(2)"
        >老师</span
      >
    </div>
    <el-divider></el-divider>
    <el-form :inline="true" style="position: relative">
      <el-form-item>
        <el-input placeholder="请输入名称" v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUserList()">查询</el-button>
      </el-form-item>
      <div class="add-btns">
        <el-button @click="handleAdd()"
          ><i class="el-icon-plus"></i>添加用户</el-button
        >
        <el-button @click="handleDownload()"
          ><i class="el-icon-download"></i>模板下载</el-button
        >
        <el-upload
          class="upload"
          action=""
          :before-upload="beforeUpload"
          :multiple="false"
          :show-file-list="false"
          :http-request="upload"
        >
          <el-button><i class="el-icon-plus">批量导入</i></el-button>
        </el-upload>
      </div>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="headerCellStyle"
    >
      <el-table-column type="index" label="序号" align="center" width="60">
      </el-table-column>
      <el-table-column prop="school" align="center" label="学校">
      </el-table-column>
      <el-table-column prop="college" align="center" label="学院">
      </el-table-column>
      <el-table-column
        prop="major"
        v-if="params.role == 3"
        align="center"
        label="专业"
      >
      </el-table-column>
      <el-table-column
        prop="classes"
        v-if="params.role == 3"
        align="center"
        label="班级"
      >
      </el-table-column>
      <el-table-column prop="no" align="center" label="账号"> </el-table-column>
      <el-table-column prop="name" align="center" label="名称">
      </el-table-column>
      <el-table-column prop="role" align="center" label="身份">
        <template slot-scope="scope">
          {{ roleFmt(scope.row.role) }}
        </template>
      </el-table-column>
      <el-table-column prop="time" align="center" width="160" label="创建时间">
        <template slot-scope="scope">
          {{ dateFmt(scope.row.time) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleDel(scope.row.id, 1 - scope.row.display)"
            >{{ scope.row.display == 0 ? "禁用" : "启用" }}</el-button
          >
          <el-button type="text" @click="handleReset(scope.row)"
            >重置密码</el-button
          >
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      hide-on-single-page
      :current-page.sync="params.page"
      :page-size="params.pageSize"
      @current-change="handlePageChange"
      layout="prev,pager,next,jumper"
      :page-count="total"
    ></el-pagination>

    <el-dialog
      :visible.sync="dialogVisible"
      width="680px"
      custom-class="dialog-reset"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <h2>{{ dialogStatus == "add" ? "添加" : "编辑" }}用户</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="名称：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="学校：" prop="school">
          <el-input
            v-model="ruleForm.school"
            placeholder="请输入学校"
          ></el-input>
        </el-form-item>
        <el-form-item label="院系：" prop="college">
          <el-input
            v-model="ruleForm.college"
            placeholder="请输入院系"
          ></el-input>
        </el-form-item>
        <el-form-item label="专业：" prop="major" v-if="params.role == 3">
          <el-input
            v-model="ruleForm.major"
            placeholder="请输入专业"
          ></el-input>
        </el-form-item>
        <el-form-item label="班级：" prop="classes" v-if="params.role == 3">
          <el-input
            v-model="ruleForm.classes"
            placeholder="请输入班级"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号：" prop="no" v-if="dialogStatus == 'add'">
          <el-input v-model="ruleForm.no" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pwd" v-if="dialogStatus == 'add'">
          <el-input
            v-model="ruleForm.pwd"
            show-password
            placeholder="请输入密码"
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
import { userList, addUser, resetPwd, updUser } from "@/api/user";
import { userTemplate } from "@/api/template";
import { dateFmt } from "@/utils/time";
import md5 from "js-md5";
export default {
  data() {
    return {
      cellStyle: {
        height: "55px",
      },
      headerCellStyle: {
        height: "55px",
        color: "#333",
        background: "rgba(46,92,138,0.11)",
        borderColor: "#ddd",
      },
      loading: false,
      total: 0,
      params: {
        page: 1,
        pageSize: 10,
        name: "",
        role: 3,
      },
      tableData: [],
      dialogStatus: "add",
      dialogVisible: false,
      ruleForm: {
        id: undefined,
        name: "",
        role: null,
        school: "",
        college: "",
        major: "",
        classes: "",
        no: "",
        pwd: "",
      },
      rules: {
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        role: [{ required: true, message: "请选择身份", trigger: "change" }],
        school: [{ required: true, message: "请输入学校", trigger: "blur" }],
        college: [{ required: true, message: "请输入院系", trigger: "blur" }],
        major: [{ required: true, message: "请输入专业", trigger: "blur" }],
        classes: [{ required: true, message: "请输入班级", trigger: "blur" }],
        no: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.loading = true;
      userList(this.params)
        .then((data) => {
          this.tableData = data.list;
          this.total = data.total;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handlePageChange(page) {
      this.params.page = page;
      this.getUserList();
    },
    roleChange(role) {
      this.params.role = role;
      this.params.page = 1;
      this.getUserList();
    },
    dateFmt(time) {
      return dateFmt(time, "YYYY-MM-DD HH:mm");
    },
    roleFmt(role) {
      switch (role) {
        case 0:
          return "管理员";
        case 1:
          return "专家";
        case 2:
          return "老师";
        case 3:
          return "学生";
        default:
          return "";
      }
    },

    handleDownload() {
      window.open(process.env.VUE_APP_BASE_API + "/usermodule.xlsx");
    },
    upload(obj) {
      let fd = new FormData();
      fd.append("file", obj.file);
      fd.append("role", this.params.role);
      fd.append("pwd", md5("123456"));
      userTemplate(fd).then(() => {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.getUserList();
      });
    },
    beforeUpload(file) {
      const isDoc =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const isExcel = file.type === "application/vnd.ms-excel";

      if (!isExcel && !isDoc) {
        this.$message.error("上传文件只能是EXCEL文件！");
        return false;
      }
      return true;
    },

    handleAdd() {
      this.ruleForm = {
        id: undefined,
        name: "",
        role: this.params.role,
        school: "",
        college: "",
        major: "",
        classes: "",
        no: "",
        pwd: "",
      };
      this.dialogStatus = "add";
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
    },
    handleEdit(row) {
      this.ruleForm = {
        id: row.id,
        name: row.name,
        role: row.role,
        school: row.school,
        college: row.college,
        major: row.major,
        classes: row.classes,
      };
      this.dialogStatus = "edit";
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.dialogStatus == "add") {
            const paramsForm = { ...this.ruleForm };
            paramsForm.pwd = md5(paramsForm.pwd);
            addUser(paramsForm).then(() => {
              this.$message({
                type: "success",
                message: "添加新用户成功！",
              });
              this.getUserList();
              this.dialogVisible = false;
            });
          } else {
            updUser(this.ruleForm).then(() => {
              this.$message({
                type: "success",
                message: "成功修改用户！",
              });
              this.getUserList();
              this.dialogVisible = false;
            });
          }
        }
      });
    },
    handleReset(row) {
      this.$confirm(`确定将账号${row.no}的密码重置为123456?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          resetPwd({ no: row.no, pwd: md5("123456") }).then(() => {
            this.$message({
              type: "success",
              message: "重置成功！",
            });
            this.getUserList();
          });
        })
        .catch(() => {});
    },
    handleDel(id, hidden) {
      this.$confirm(`确定${hidden == 0 ? "启用" : "禁用"}此账号？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updUser({ id, display: hidden }).then(() => {
            this.$message({
              type: "success",
              message: `${hidden == 0 ? "启用" : "禁用"}成功`,
            });
            this.getUserList();
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  width: 100%;
  .nav {
    padding-left: 12px;
    span {
      display: inline-block;
      margin-right: 60px;
      cursor: pointer;
      &.on {
        position: relative;
        color: #103871;
        &::before {
          content: "";
          display: block;
          position: absolute;
          left: -12px;
          bottom: 0;
          width: 10px;
          height: 22px;
          background-color: #103871;
        }
      }
    }
  }
  .add-btns {
    position: absolute;
    top: 0;
    right: 0;
    .upload {
      display: inline-block;
      margin-left: 10px;
    }
  }
}
</style>
