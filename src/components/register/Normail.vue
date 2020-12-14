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
// 校验规则
import {
  validateName,
  validatePass,
  validateCaptcha,
  validateChecked
} from "../../tools/index";

@Component({
  name: "Normail",
  components: {}
})
export default class Normail extends Vue {
  /* =====================================普通注册数据校验======================================= */
  // 动态绑定输入框数据
  private registerData = {
    type: "normal",
    username: "",
    password: "",
    captcha: "",
    checked: true
  };

  // 注册校验规则
  private registerRules = {
    username: [{ validator: validateName, trigger: "blur" }],
    password: [{ validator: validatePass, trigger: "blur" }],
    captcha: [{ validator: validateCaptcha, trigger: "blur" }],
    checked: [{ validator: validateChecked, trigger: "change" }]
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

  // 密码明文切换
  private passInputType = true;
  private passIsShow() {
    this.passInputType = !this.passInputType;
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
