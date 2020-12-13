<template>
  <div class="Login">
    <div class="container">
      <h2 class="login-title">用户登录</h2>
      <el-form :model="loginData" :rules="loginRules" ref="form">
        <el-form-item prop="username">
          <el-input
            v-model="loginData.username"
            placeholder="请输入用户名 / 邮箱 / 手机号"
            prefix-icon="el-icon-user"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginData.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-bind:type="passInputType ? 'password' : 'text'"
          >
          </el-input>
          <i
            v-if="loginData.password"
            @click="passIsShow"
            class="iconfont"
            v-bind:class="passInputType ? 'icon-zhengyan' : 'icon-biyan'"
          ></i>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-row :gutter="15">
            <el-col :span="17">
              <el-input
                v-model="loginData.captcha"
                placeholder="请输入验证码,区分大小写！"
                prefix-icon="el-icon-key"
                @keyup.native.enter="onSubmit"
              >
              </el-input>
            </el-col>
            <el-col :span="7">
              <img
                class="captcha"
                src="http://127.0.0.1:7001/imagecode"
                ref="captchaImage"
                alt=""
                @click="updateCaptcha"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="go-user-register">
        <a href="javascript:;" @click="goUserRegister">立即注册</a>
      </div>
      <OtherLogin></OtherLogin>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
// Element组件表单类型
import { ElForm } from "element-ui/types/form";
import { loginUser } from "../api/index";
import OtherLogin from "../components/login/OtherLogin.vue";

@Component({
  name: "Login",
  components: {
    OtherLogin
  }
})
export default class Login extends Vue {
  // 动态绑定输入框数据
  private loginData = {
    type: "normal",
    username: "",
    email: "",
    phone: "",
    password: "",
    captcha: "",
    checked: true
  };
  /* ======================================================================= */
  // 用户名校验
  private validatePhone = (rule: any, value: string, callback: any) => {
    const normalReg = /^[A-Za-z0-9]{6,}$/;
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    const phoneReg = /^1[3456789]\d{9}$/;
    if (value === "") {
      callback(new Error("请输入用户名 / 邮箱 / 手机号！"));
    } else if (emailReg.test(value)) {
      this.loginData.email = this.loginData.username;
      this.loginData.type = "email";
      callback();
    } else if (phoneReg.test(value)) {
      this.loginData.phone = this.loginData.username;
      this.loginData.type = "phone";
      callback();
    } else if (normalReg.test(value)) {
      this.loginData.type = "normal";
      callback();
    } else {
      callback(new Error("用户名格式错误，请重新输入！"));
    }
  };
  // 密码校验
  private validatePass = (rule: any, value: string, callback: any) => {
    const reg = /^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\\.#%'\\+\\*\-:;^_`].*))[,\\.#%'\\+\\*\-:;^_`0-9A-Za-z]{8,}$/;
    if (value === "") {
      callback(new Error("请输入密码！"));
    } else if (value.length < 8) {
      callback(new Error("密码至少是8位！"));
    } else if (!reg.test(value)) {
      callback(new Error("密码必须包含字母、数字和特殊符号！"));
    } else callback();
  };
  // 验证码校验
  private validateCaptcha = (rule: any, value: string, callback: any) => {
    const reg = /^[A-Za-z0-9]{4}$/;
    if (value === "") {
      callback(new Error("请输入验证码！"));
    } else if (value.length < 4 || value.length > 4) {
      callback(new Error("验证码只能是4位！"));
    } else if (!reg.test(value)) {
      callback(new Error("验证码只能是字母和数字！"));
    } else callback();
  };
  // 注册校验规则
  private loginRules = {
    username: [{ validator: this.validatePhone, trigger: "blur" }],
    password: [{ validator: this.validatePass, trigger: "blur" }],
    captcha: [{ validator: this.validateCaptcha, trigger: "blur" }]
  };

  /* ======================================================================= */
  // 更新验证码
  @Ref() readonly captchaImage!: HTMLImageElement;
  updateCaptcha() {
    this.captchaImage.src = `http://127.0.0.1:7001/imagecode?r=${Math.random()}`;
  }
  // 提交登录
  @Ref() readonly form!: ElForm;
  private onSubmit() {
    this.form.validate((flag: boolean) => {
      if (flag) {
        loginUser(this.loginData)
          .then((response: any) => {
            // 进一步判断

            if (response.status === 200 && response.data.code === 200) {
              // 保存登录状态
              sessionStorage.setItem(
                "userInfo",
                JSON.stringify(response.data.data)
              );
              this.$router.push("/admin");
            } else {
              // 验证码过期，重新获取
              (this as any).$message.error(response.data.msg);
            }
          })
          .catch((error: any) => {
            // 登陆失败
            (this as any).$message.error(error.response.data.msg);
          });
      } else {
        (this as any).$message.error("登录失败，请检查表单！");
      }
    });
  }

  // 密码明文切换
  passInputType = true;
  passIsShow() {
    this.passInputType = !this.passInputType;
  }

  // 跳转到注册页面
  goUserRegister() {
    this.$router.push("/register");
  }
}
</script>

<style lang="scss" scope>
.Login {
  width: 100vw;
  height: 100vh;
  background: url("../assets/images/login-bg.jpg") no-repeat;
  background-size: cover;
  .container {
    width: 600px;
    height: auto;
    padding: 30px 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 2px #ddd;
  }
  .login-title {
    margin-bottom: 30px;
    text-align: center;
  }
  .el-form {
    .el-button {
      width: 100%;
    }
  }
  .el-form-item {
    position: relative;
    .iconfont {
      position: absolute;
      top: 0;
      right: 15px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .go-user-register {
    text-align: right;
    a {
      font-size: 14px;
    }
  }
  .captcha {
    width: 100%;
    height: 40px;
    cursor: pointer;
  }
}
</style>
