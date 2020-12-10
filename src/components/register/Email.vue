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
          v-bind:type="[passInputType ? 'password' : 'text']"
        >
        </el-input>
        <i
          v-if="registerData.password"
          @click="passIsShow"
          class="iconfont"
          v-bind:class="[passInputType ? 'icon-zhengyan' : 'icon-biyan']"
        ></i>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input
          v-model="registerData.checkPassword"
          placeholder="请再次输入密码"
          type="password"
          prefix-icon="el-icon-lock"
        >
        </el-input>
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

@Component({
  name: "Email",
  components: {}
})
export default class Email extends Vue {
  // 动态绑定输入框数据
  private registerData = {
    type: "email",
    email: "",
    password: "",
    checkPassword: "",
    captcha: "",
    checked: true
  };
  // 获取验证码倒计时
  private getCode = {
    isDisabled: false,
    intervalTime: 60
  };

  /* ======================================================================= */
  // 邮箱校验
  private validateEmail = (rule: any, value: string, callback: any) => {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (value === "") {
      callback(new Error("请输入邮箱！"));
    } else if (!reg.test(value)) {
      callback(new Error("请输入正确的邮箱！"));
    } else callback();
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
  // 确认密码校验
  private validatePass2 = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== this.registerData.password) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
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
  // 用户协议校验
  private validateChecked = (rule: any, value: string, callback: any) => {
    if (!value) {
      callback(new Error("请阅读并同意用户协议！"));
    } else {
      callback();
    }
  };
  // 注册校验规则
  private registerRules = {
    email: [{ validator: this.validateEmail, trigger: "blur" }],
    password: [{ validator: this.validatePass, trigger: "blur" }],
    checkPassword: [{ validator: this.validatePass2, trigger: "blur" }],
    captcha: [{ validator: this.validateCaptcha, trigger: "blur" }],
    checked: [{ validator: this.validateChecked, trigger: "change" }]
  };

  /* ======================================================================= */

  // 发送邮箱验证码
  private sendEmailCode() {
    // validateFiled； 对单个表单验证
    this.form.validateField("email", emailCode => {
      if (!emailCode) {
        // 禁用获取验证码
        this.isDisabledSendCode();
        // 发送验证码
        sendCode2Email({ email: this.registerData.email })
          .then((response: any) => {
            // 进一步判断
            if (response.status === 200 && response.data.code === 200) {
              // 验证码发送成功
              (this as any).$message.success("验证码已发送！");
            } else {
              // 验证码过期或发送失败，重新获取
              (this as any).$message.error(response.data.msg);
            }
          })
          .catch((error: any) => {
            // 注册失败
            (this as any).$message.error(error.response.data.msg);
          });
      }
    });
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
  passInputType = true;
  passIsShow() {
    this.passInputType = !this.passInputType;
  }

  // 获取验证码按钮是或否可用
  private isDisabledSendCode() {
    this.getCode.isDisabled = true;

    const timerId = setInterval(() => {
      this.getCode.intervalTime--;
      if (this.getCode.intervalTime <= 0) {
        clearInterval(timerId);
        this.getCode = {
          isDisabled: false,
          intervalTime: 60
        };
      }
    }, 1000);
  }
}
</script>

<style lang="scss" scope>
.Email {
}
</style>
