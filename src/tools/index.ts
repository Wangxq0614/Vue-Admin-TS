// 发送验证码
/**
 * type: 请求类型
 * sendApi: 请求地址
 * obj: 请求参数
 * that: this实例
 */
export const sendCode = (type: string, sendApi: any, obj: {}, that: any) => {
  // validateFiled； 对单个表单验证
  that.form.validateField(type, (flag: boolean) => {
    if (!flag) {
      // 禁用获取验证码
      that.getCode.isDisabled = true;
      const timerId = setInterval(() => {
        that.getCode.intervalTime--;
        if (that.getCode.intervalTime <= 0) {
          clearInterval(timerId);
          that.getCode = {
            isDisabled: false,
            intervalTime: 60,
          };
        }
      }, 1000);
      // 发送验证码
      sendApi(obj)
        .then((response: any) => {
          // 进一步判断
          if (response.status === 200 && response.data.code === 200) {
            // 验证码发送成功
            that.$message.success("验证码已发送！");
          } else {
            // 验证码过期或发送失败，重新获取
            that.$message.error(response.data.msg);
          }
        })
        .catch((error: any) => {
          // 注册失败
          that.$message.error(error.response.data.msg);
        });
    } else {
      that.$message.error("发送失败，请检查表单！");
    }
  });
};

// 用户注册验证规则
//用户名校验
export const validateName = (rule: any, value: string, callback: any) => {
  const reg = /^[A-Za-z0-9]{6,}$/;
  if (value === "") {
    callback(new Error("请输入用户名！"));
  } else if (value.length < 6) {
    callback(new Error("用户名至少是6位！"));
  } else if (!reg.test(value)) {
    callback(new Error("用户名只能是字母或数字！"));
  } else callback();
};
// 邮箱校验
export const validateEmail = (rule: any, value: string, callback: any) => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (value === "") {
    callback(new Error("请输入邮箱！"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入正确的邮箱！"));
  } else callback();
};
// 手机号校验
export const validatePhone = (rule: any, value: string, callback: any) => {
  const reg = /^1[3456789]\d{9}$/;
  if (value === "") {
    callback(new Error("请输入手机号！"));
  } else if (!reg.test(value)) {
    callback(new Error("请手机号有误, 或此手机号暂不支持！"));
  } else callback();
};
// 密码校验
export const validatePass = (rule: any, value: string, callback: any) => {
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
export const validateCaptcha = (rule: any, value: string, callback: any) => {
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
export const validateChecked = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error("请阅读并同意用户协议！"));
  } else {
    callback();
  }
};
