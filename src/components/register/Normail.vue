<template>
  <div class="Normail">
    <el-form :model="registerData" :rules="registerRules" ref="form">
      <el-form-item prop="username">
        <el-input
          v-model="registerData.username"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerData.password"
          placeholder="请输入密码"
          type="password"
          prefix-icon="el-icon-lock"
        >
        </el-input>
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
              placeholder="请输入验证码"
              prefix-icon="el-icon-key"
            >
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
        <el-button type="primary" @click="onSubmit">注册</el-button>
      </el-form-item>
      <el-form-item prop="checked">
        <el-checkbox v-model="registerData.checked">
          <p>
            阅读并接受
            <a href="#">《用户协议》</a>
            及
            <a href="#">《隐私权保护声明》</a>
          </p>
        </el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
// Element组件表单类型
import { ElForm } from "element-ui/types/form";
import { registerUser } from "../../api/index";

@Component({
  name: "Normail",
  components: {}
})
export default class Normail extends Vue {
  // 动态绑定输入框数据
  private registerData = {
    type: "normal",
    username: "",
    password: "",
    checkPassword: "",
    captcha: "",
    checked: true
  };
  // 用户名校验
  private validateName = (rule: any, value: string, callback: any) => {
    const reg = /^[A-Za-z0-9]{6,}$/;
    if (value === "") {
      callback(new Error("请输入用户名！"));
    } else if (value.length < 6) {
      callback(new Error("用户名至少是6位！"));
    } else if (!reg.test(value)) {
      callback(new Error("用户名只能是字母或数字！"));
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
    username: [{ validator: this.validateName, trigger: "blur" }],
    password: [{ validator: this.validatePass, trigger: "blur" }],
    checkPassword: [{ validator: this.validatePass2, trigger: "blur" }],
    captcha: [{ validator: this.validateCaptcha, trigger: "blur" }],
    checked: [{ validator: this.validateChecked, trigger: "change" }]
  };

  // 重新获取验证码
  /*
      readonly:只读
      !: 必须有
      ?: 可选
      HTMLImageElement: 类型
  */
  @Ref() readonly captchaImage!: HTMLImageElement;
  private updateCaptcha() {
    this.captchaImage.src = `http://127.0.0.1:7001/imagecode?r=${Math.random()}`;
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
              // 验证码过期或失败，重新获取
              this.updateCaptcha();
              (this as any).$message.error(response.data.msg);
            }
          })
          .catch((error: any) => {
            // 注册失败，重新获取验证码
            this.updateCaptcha();
            (this as any).$message.error(error.response.data.msg);
          });
      } else {
        (this as any).$message.error("注册失败，请检查表单！");
      }
    });
  }

  // 重置表单
  // public: 公有方法，提供外界 => Register > handleClick方法使用
  public resetForm() {
    this.form.resetFields();
  }
}
</script>

<style lang="scss" scope>
.Normail {
}
</style>
