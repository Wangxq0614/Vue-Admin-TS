// 发送验证码
/**
 * type: 请求类型
 * sendApi: 请求地址
 * obj: 请求参数
 * that: this实例
 */
const sendCode = (type: string, sendApi: any, obj: {}, that: any) => {
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

export { sendCode };

// private sendPhonelCode() {
//   // validateFiled； 对单个表单验证
//   this.form.validateField("phone", phoneCode => {
//     if (!phoneCode) {
//       // 禁用获取验证码
//       this.isDisabledSendCode();
//       // 发送验证码
//       sendCode2Phone({ email: this.registerData.phone })
//         .then((response: any) => {
//           // 进一步判断
//           if (response.status === 200 && response.data.code === 200) {
//             // 验证码发送成功
//             (this as any).$message.success("验证码已发送！");
//           } else {
//             // 验证码过期或发送失败，重新获取
//             (this as any).$message.error(response.data.msg);
//           }
//         })
//         .catch((error: any) => {
//           // 注册失败
//           this.$message.error(error.response.data.msg);
//         });
//     }
//   });
// }
