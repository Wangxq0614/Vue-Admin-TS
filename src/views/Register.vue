<template>
  <div class="Register">
    <div class="container">
      <h2 class="register-title">
        用户注册
      </h2>
      <el-tabs
        tab-position="left"
        style="height: 385px"
        @tab-click="handleClick"
      >
        <el-tab-pane label="普通注册"
          ><Normal ref="normalForm"></Normal
        ></el-tab-pane>
        <el-tab-pane label="邮箱注册"
          ><Email ref="emailForm"></Email
        ></el-tab-pane>
        <el-tab-pane label="手机注册"
          ><Phone ref="phoneForm"></Phone
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import Normal from "../components/register/Normail.vue";
import Email from "../components/register/Email.vue";
import Phone from "../components/register/Phone.vue";

@Component({
  name: "Register",
  components: {
    Normal,
    Email,
    Phone
  }
})
export default class Register extends Vue {
  // 重置表单
  @Ref() readonly normalForm!: Normal;
  @Ref() readonly emailForm!: Email;
  @Ref() readonly phoneForm!: Phone;
  // private: 私有方法
  private handleClick() {
    this.normalForm.resetForm();
    this.emailForm.resetForm();
    this.phoneForm.resetForm();
  }
}
</script>

<style lang="scss" scope>
.Register {
  width: 100vw;
  height: 100vh;
  background: url("../assets/images/register-bg.jpg") no-repeat;
  background-size: cover;
  .container {
    width: 600px;
    height: auto;
    padding: 30px 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 2px #ddd;
  }
  .register-title {
    margin-bottom: 30px;
    text-align: center;
  }
  .el-form {
    padding-right: 15px;
    .el-button {
      width: 100%;
    }
    .captcha {
      width: 100%;
      height: 40px;
      cursor: pointer;
    }
  }
}
</style>
