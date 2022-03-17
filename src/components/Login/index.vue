<template>
  <div class="login">
    <div v-if="!isLogin" class="login">
      <p @click="handleLogin()">登录</p>
      <!-- <p>|</p>
            <p @click="handleRegister()">注册</p> -->
    </div>
    <div v-else class="login">
      <p>欢迎：{{ userName }}</p>
      <p v-if="!appId">|</p>
      <p @click="logout()" v-if="!appId">退出</p>
    </div>
    <!-- 登录 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="600px"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center
    >
      <div class="logindialog" >
        <h2>{{ textMap[dialogStatus] }}</h2>
        <i class="close" @click="dialogVisible = false"></i>
        <el-form
          v-if="dialogStatus == 'login'"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
        >
          <el-form-item prop="no">
            <span class="svg-container">
              <img src="../../assets/img/login_svg/no.png" alt="" />
            </span>
            <el-input v-model="loginForm.no" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <span class="svg-container">
              <img src="../../assets/img/login_svg/password.png" alt="" />
            </span>
            <el-input
              type="password"
              v-model="loginForm.pwd"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userType">
            <span class="svg-container">
              <img src="../../assets/img/login_svg/role.png" alt="" />
            </span>
            <el-select v-model="loginForm.userType" placeholder="请选择身份">
              <el-option label="学生" :value="3"></el-option>
              <el-option label="老师" :value="2"></el-option>
              <el-option label="专家" :value="1"></el-option>
              <el-option label="管理员" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <div class="btns">
            <el-button
              type="primary"
              @click="submitForm()"
              style="margin-right: 30px"
              >确 定</el-button
            >
            <el-button type="primary" plain @click="psLogin()" disabled
              >公测入口</el-button
            >
          </div>
        </el-form>
        <!-- 注册 -->
        <el-form
          v-else
          :model="registerForm"
          :rules="registerRules"
          ref="registerForm"
        >
          <el-form-item prop="name">
            <span class="svg-container">
              <img src="../../assets/img/login_svg/role.png" alt="" />
            </span>
            <el-input v-model="registerForm.name" placeholder="昵称"></el-input>
          </el-form-item>
          <el-form-item prop="no">
            <span class="svg-container">
              <img src="../../assets/img/login_svg/no.png" alt="" />
            </span>
            <el-input
              v-model="registerForm.no"
              placeholder="账号（学号）"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <span class="svg-container">
              <img src="../../assets/img/login_svg/password.png" alt="" />
            </span>
            <el-input
              type="password"
              v-model="registerForm.pwd"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userType">
            <span class="svg-container">
              <img src="../../assets/img/login_svg/role.png" alt="" />
            </span>
            <el-select v-model="registerForm.userType" placeholder="请选择身份">
              <el-option label="学生" :value="3"></el-option>
              <el-option label="老师" :value="2"></el-option>
              <el-option label="专家" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addUser } from "@/api/user";
import { getQueryString } from "@/utils";
export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (/[\u4E00-\u9FA5]/g.test(value)) {
        callback(new Error("不能输入中文"));
      } else if (value.length < 6) {
        callback(new Error("不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      isLogin: false,
      dialogVisible: false,
      dialogStatus: "",
      textMap: {
        login: "登录",
        register: "注册",
      },
      loginForm: {
        no: "",
        pwd: "",
        userType: null,
      },
      loginRules: {
        no: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pwd: [{ required: true, trigger: "blur", validator: validatePassword }],
        userType: [{ required: true, trigger: "blur", message: "请选择身份" }],
      },
      registerForm: {
        name: "",
        no: "",
        pwd: "",
        userType: null,
      },
      registerRules: {
        no: [{ required: true, trigger: "blur", validator: validatePassword }],
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        pwd: [{ required: true, trigger: "blur", validator: validatePassword }],
        userType: [
          { required: true, message: "请选择身份", trigger: "change" },
        ],
      },
    };
  },
  // created() {
  //   // 如果是对接平台跳转过来的，isLogin默认为true
  //   if (getQueryString("appId")) {
  //     this.isLogin = true;
  //   } else {
  //     this.isLogin = this.userName ? true : false;
  //   }
  // },
  computed: {
    ...mapGetters(["userName", "appId"]),   
  },
  methods: {
    handleLogin() {
      this.dialogVisible = true;
      this.dialogStatus = "login";
      this.$nextTick(() => {
        this.$refs.loginForm.resetFields();
      });
    },
    psLogin() {
      // 评审员登录
      this.dialogStatus = "login";
      this.loginForm.no = "expert";
      this.loginForm.pwd = "123456";
      this.loginForm.userType = 1;
      this.submitForm();
    },
    handleRegister() {
      this.dialogVisible = true;
      this.dialogStatus = "register";
      this.$nextTick(() => {
        this.$refs.registerForm.resetFields();
      });
    },
    submitForm() {
      if (this.dialogStatus == "register") {
        // 注册
        const params_register = { ...this.registerForm };
        if (this.loginForm.userType == 1) {
          params_register.userType = 2;
        }
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            addUser(params_register).then(() => {
              this.dialogVisible = false;
              this.$message({
                message: "注册用户成功",
                type: "success",
              });
            });
          }
        });
      } else {
        // 登录
        const params = { ...this.loginForm };
        if (this.loginForm.userType == 1) {     
          params.userType = 2;
        }
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch("user/login", params).then((data) => {
              if (data && data.role == params.userType) {
                this.isLogin = true;
                this.dialogVisible = false;
                this.$message({
                  message: "登录成功",
                  type: "success",
                });
              } else {
                this.$message({
                  message: "身份选择错误",
                  type: "error",
                });
              }
            });
          }
        });
      }
    },
    logout() {
      this.$store.dispatch("user/logout").then(() => {
        this.isLogin = false;
        this.$message({
          message: "已退出登录",
          type: "success",
        });
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

/* reset element-ui css */
.logindialog {
  .el-form {
    width: 70%;
    margin: 0 auto;
  }
  .el-form-item {
    margin-bottom: 40px;
    border-bottom: 2px solid #e7e7e7;
    background: #fafdff;
  }

  .el-input,
  .el-select {
    display: inline-block;
    width: 100%;
    height: 50px;
    border-radius: 50px;
    border: 0;
    font-size: 18px;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 15px 12px 15px;
      height: 50px;
      margin-left: 30px;
    }
    .el-input__suffix {
      right: 15px;
    }
  }
  .el-form-item__error {
    padding-top: 10px;
    left: 45px;
  }
}
</style>
<style lang="scss" scoped>
.login {
  display: flex;
  p {
    margin-right: 10px;
    font-size: 18px;
    color: white;
    cursor: pointer;
  }
}
.logindialog {
  padding-top: 30px;
  .close {
    width: 45px;
    height: 45px;
    background: url(~@/assets/img/close.png) center;
    background-size: cover;
    position: absolute;
    top: 25px;
    right: 28px;
    cursor: pointer;
  }
  h2 {
    position: relative;
    top: -55px;
    color: #103871;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    font-family: Source Han Sans CN;
  }
  .svg-container {
    position: absolute;
    margin-top: 10px;
  }
  .btns {
    text-align: center;
    margin-bottom: 30px;
  }
  .el-button {
    width: 140px;
    height: 45px;
    border-radius: 48px;
    margin: 20px auto 0;
  }
}
</style>
