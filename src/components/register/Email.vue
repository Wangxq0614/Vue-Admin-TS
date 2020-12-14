<template>
  <div class="Email">
    <el-form :model="registerData" :rules="registerRules" ref="form">
      <el-form-item prop="email">
        <el-input
          v-model="registerData.email"
          placeholder="请输入邮箱"
          prefix-icon="el-icon-message"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerData.password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          v-bind:type="passInputType ? 'password' : 'text'"
        >
        </el-input>
        <i
          v-if="registerData.password"
          @click="passIsShow"
          class="iconfont"
          v-bind:class="passInputType ? 'icon-zhengyan' : 'icon-biyan'"
        ></i>
      </el-form-item>

      <el-form-item prop="captcha">
        <el-row :gutter="15">
          <el-col :span="16">
            <el-input
              v-model="registerData.captcha"
              placeholder="请输入验证码,区分大小写！"
              prefix-icon="el-icon-key"
              @keyup.native.enter="onSubmit"
            >
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-button @click="sendEmailCode" :disabled="getCode.isDisabled">
              {{
                getCode.isDisabled
                  ? getCode.intervalTime + "s"
                  : "获取验证码..."
              }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">注册</el-button>
      </el-form-item>
      <el-form-item prop="checked">
        <el-checkbox v-model="registerData.checked">
          阅读并接受
          <a href="#">《用户协议》</a>
          及
          <a href="#">《隐私权保护声明》</a>
        </el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
// Element组件表单类型
import { ElForm } from "element-ui/types/form";
import { sendCode2Email, registerUser } from "../../api/index";
import {
  sendCode,
  validateEmail,
  validatePass,
  validateCaptcha,
  validateChecked
} from "../../tools/index";

@Component({
  name: "Email",
  components: {}
})
export default class Email extends Vue {
  /* =====================================email注册数据校验======================================= */
  // 动态绑定输入框数据
  private registerData = {
    type: "email",
    email: "",
    password: "",
    captcha: "",
    checked: true
  };

  // 注册校验规则
  private registerRules = {
    email: [{ validator: validateEmail, trigger: "blur" }],
    password: [{ validator: validatePass, trigger: "blur" }],
    captcha: [{ validator: validateCaptcha, trigger: "blur" }],
    checked: [{ validator: validateChecked, trigger: "change" }]
  };

  // 发送邮箱验证码
  // 获取验证码倒计时
  private getCode = {
    isDisabled: false,
    intervalTime: 60
  };
  private sendEmailCode() {
    const emailCode = { email: this.registerData.email };
    sendCode("email", sendCode2Email, emailCode, this);
  }

  // 提交注册
  @Ref() readonly form!: ElForm;
  private onSubmit() {
    this.form.validate((flag: boolean) => {
      if (flag) {
        registerUser(this.registerData)
          .then((response: any) => {
            // 进一步判断
            if (response.status === 200 && response.data.code === 200) {
              // 注册成功，跳转到登录页面
              (this as any).$message.success("注册成功！");
              setTimeout(() => {
                this.$router.push("/login");
              }, 1000);
            } else {
              // 验证码过期，重新获取
              (this as any).$message.error(response.data.msg);
            }
          })
          .catch((error: any) => {
            // 注册失败
            (this as any).$message.error(error.response.data.msg);
          });
      } else {
        (this as any).$message.error("注册失败，请检查表单！");
      }
    });
  }

  // 重置表单
  public resetForm() {
    this.form.resetFields();
  }

  // 密码明文切换
  private passInputType = true;
  private passIsShow() {
    this.passInputType = !this.passInputType;
  }
}
</script>

<style lang="scss" scope>
.Email {
}
</style>
