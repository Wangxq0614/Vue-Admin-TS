<template>
  <div class="Login">
    <div class="container">
      <h2 class="login-title">用户登录</h2>
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-user">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="15">
            <el-col :span="16">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key">
              </el-input>
            </el-col>
            <el-col :span="8">
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";

@Component({
  name: "Login",
  components: {},
})
export default class Login extends Vue {
  @Ref() readonly captchaImage!: HTMLImageElement;
  updateCaptcha() {
    this.captchaImage.src = `http://127.0.0.1:7001/imagecode?r=${Math.random()}`;
  }

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
  .go-user-register {
    text-align: right;
    a {
      font-size: 14px;
    }
  }
}
</style>
