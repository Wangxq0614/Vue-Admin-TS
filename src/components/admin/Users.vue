<template>
  <div class="Users">
    <!-- 导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <a href="/admin" @click="restDefaultActivePath">首页</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 头部操作区域 -->
      <div class="box-card-header">
        <el-row>
          <el-col :span="20">
            <el-form :inline="true" :model="searchData">
              <el-form-item>
                <el-select v-model="searchData.role" placeholder="--所有角色--">
                  <el-option label="管理员" value="manger"></el-option>
                  <el-option label="普通用户" value="normal"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select
                  v-model="searchData.origin"
                  placeholder="--所有来源--"
                >
                  <el-option label="本地注册" value="local"></el-option>
                  <el-option label="Github" value="github"></el-option>
                  <el-option label="QQ" value="qq"></el-option>
                  <el-option label="微信" value="weixin"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="searchData.type" placeholder="--所有用户--">
                  <el-option label="用户名" value="username"></el-option>
                  <el-option label="邮箱" value="email"></el-option>
                  <el-option label="手机" value="phone"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="searchData.key"
                  placeholder="--关键字--"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="exportUserInfo"
                  >导出搜索结果</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="showAddUserDialog">
              添加用户
            </el-button>
            <el-button type="primary" @click="importUsers">导入用户</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 主体表格区域 -->
      <div class="box-card-main">
        <el-table
          :data="tableData"
          :stripe="true"
          :border="true"
          style="width: 100%"
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="username" label="姓名"> </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column prop="phone" label="电话"> </el-table-column>
          <el-table-column prop="roleName" label="角色" width="160">
          </el-table-column>
          <el-table-column label="状态" width="100">
            <!-- 作用域插槽 -->
            <template v-slot="scope">
              <el-switch
                v-model="scope.row.userState"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <!-- 作用域插槽 -->
            <template v-slot="scope">
              <!-- 编辑用户 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="showEditUserDialog(scope.row)"
              ></el-button>
              <!-- 删除用户 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deleteUsers(scope.row.id)"
              ></el-button>
              <!-- 设置用户 -->
              <el-button type="warning" icon="el-icon-setting"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 底部分页区域 -->
    <div class="box-card-botoom">
      <el-card class="box-card">
        <el-pagination
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
        >
        </el-pagination>
      </el-card>
    </div>

    <!-- 添加用户弹框 -->
    <div class="add-users">
      <el-dialog
        title="添加用户"
        :visible.sync="addUserDialogVisible"
        width="30%"
        @close="closeDialog"
      >
        <!-- 添加用户表单 -->
        <el-form :model="addUserData" :rules="addUserRules" ref="form">
          <el-form-item prop="username">
            <el-input
              v-model="addUserData.username"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              v-model="addUserData.email"
              placeholder="请输入邮箱"
              prefix-icon="el-icon-message"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input
              v-model="addUserData.phone"
              placeholder="请输入手机"
              prefix-icon="el-icon-phone"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="addUserData.password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-bind:type="passInputType ? 'password' : 'text'"
            >
            </el-input>
            <i
              v-if="addUserData.password"
              @click="passIsShow"
              class="iconfont"
              v-bind:class="passInputType ? 'icon-zhengyan' : 'icon-biyan'"
            ></i>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addUserDialogVisible = false">
            取 消
          </el-button>
          <el-button type="primary" @click="createUser">
            确 定
          </el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 编辑用户弹框 -->
    <div class="edit-users">
      <el-dialog
        title="编辑用户"
        :visible.sync="editUserDialogVisible"
        width="30%"
        @close="closeDialog"
      >
        <!-- 编辑用户表单 -->
        <el-form :model="editUserData" :rules="editUserRules" ref="form">
          <el-form-item prop="username">
            <el-input
              v-model="editUserData.username"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              v-model="editUserData.email"
              placeholder="请输入邮箱"
              prefix-icon="el-icon-message"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input
              v-model="editUserData.phone"
              placeholder="请输入手机"
              prefix-icon="el-icon-phone"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="editUserData.password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-bind:type="passInputType ? 'password' : 'text'"
            >
            </el-input>
            <i
              v-if="editUserData.password"
              @click="passIsShow"
              class="iconfont"
              v-bind:class="passInputType ? 'icon-zhengyan' : 'icon-biyan'"
            ></i>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editUserDialogVisible = false">
            取 消
          </el-button>
          <el-button type="primary" @click="editUser">
            确 定
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
// Element组件表单类型
import { ElForm } from "element-ui/types/form";
import {
  getUsers,
  createUsers,
  deleteUsers,
  updateUsers
} from "../../api/index";

@Component({
  name: "Users",
  components: {}
})
export default class Users extends Vue {
  // 获取所有用户数据
  private tableData = [];
  created(): void {
    getUsers()
      .then((response: any) => {
        if (response.status === 200 && response.data.code === 200) {
          this.tableData = response.data?.data?.users;
        }
      })
      .catch(error => {
        (this as any).$message.error(error.response.data.msg);
      });
  }

  // 校验规则
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
  private validateEmail = (rule: any, value: string, callback: any) => {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (value && !reg.test(value)) {
      callback(new Error("请输入正确的邮箱！"));
    } else callback();
  };
  private validatePhone = (rule: any, value: string, callback: any) => {
    const reg = /^1[3456789]\d{9}$/;
    if (value && !reg.test(value)) {
      callback(new Error("请手机号有误, 或此手机号暂不支持！"));
    } else callback();
  };
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
  private validateEditPass = (rule: any, value: string, callback: any) => {
    const reg = /^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\\.#%'\\+\\*\-:;^_`].*))[,\\.#%'\\+\\*\-:;^_`0-9A-Za-z]{8,}$/;
    if (value) {
      if (value.length < 8) {
        callback(new Error("密码至少是8位！"));
      } else if (!reg.test(value)) {
        callback(new Error("密码必须包含字母、数字和特殊符号！"));
      }
    } else callback();
  };

  /* =====================================搜索用户======================================= */
  // 搜索数据
  private searchData = {
    role: "",
    origin: "",
    type: "",
    key: ""
  };
  // 提交搜索
  private onSubmit() {
    0;
  }

  /* =====================================导入用户======================================= */
  private importUsers() {
    0;
  }

  /* =====================================导出用户======================================= */
  // 导出用户信息
  private exportUserInfo() {
    0;
  }

  /* =====================================添加用户======================================= */
  // 数据检验
  private addUserRules = {
    username: [{ validator: this.validateName, trigger: "blur" }],
    email: [{ validator: this.validateEmail, trigger: "blur" }],
    phone: [{ validator: this.validatePhone, trigger: "blur" }],
    password: [{ validator: this.validatePass, trigger: "blur" }]
  };
  // 动态绑定输入框数据
  private addUserData = {
    username: "",
    email: "",
    phone: "",
    password: ""
  };
  // 显示添加用户输入框
  private addUserDialogVisible = false;
  private showAddUserDialog() {
    this.addUserDialogVisible = true;
  }
  // 创建用户
  private createUser() {
    this.form.validate((flag: boolean) => {
      if (flag) {
        createUsers(this.addUserData)
          .then((response: any) => {
            // 进一步判断
            if (response.status === 200 && response.data.code === 200) {
              // 添加成功，关闭弹框
              this.addUserDialogVisible = false;
              const newUsers: {} = response.data.data;
              (this as any).tableData.push(newUsers);
              (this as any).$message.success("添加成功！");
            } else {
              // 添加失败
              (this as any).$message.error(response.data.msg);
            }
          })
          .catch((error: any) => {
            // 添加失败
            (this as any).$message.error(error.response.data.msg);
          });
      } else {
        (this as any).$message.error("添加失败，请检查表单！");
      }
    });
  }

  /* =====================================删除用户======================================= */
  private async deleteUsers(id: string) {
    deleteUsers(id)
      .then((response: any) => {
        // 进一步判断
        if (response.status === 200 && response.data.code === 200) {
          // 遍历查找当前点击对应的用户
          const idx = this.tableData.findIndex((obj: any) => {
            return obj.id === id;
          });
          this.tableData.splice(idx, 1);
          (this as any).$message.success("删除用户成功！");
        } else {
          (this as any).$message.success(response.data.msg);
        }
      })
      .catch((error: any) => {
        // 删除失败
        (this as any).$message.error("删除用户失败！");
      });
  }

  /* =====================================编辑用户======================================= */
  // 数据检验
  private editUserRules = {
    username: [{ validator: this.validateName, trigger: "blur" }],
    email: [{ validator: this.validateEmail, trigger: "blur" }],
    phone: [{ validator: this.validatePhone, trigger: "blur" }],
    password: [{ validator: this.validateEditPass, trigger: "blur" }]
  };
  // 编辑用户数据
  private editUserData = {
    id: "",
    username: "",
    email: "",
    phone: "",
    password: ""
  };
  // 显示 / 隐藏编辑用户框
  private editUserDialogVisible = false;
  private showEditUserDialog(user: any) {
    this.editUserDialogVisible = true;
    // 直接赋值会触发双向绑定，所以需要在修改成功之后再赋值
    this.editUserData = Object.assign(this.editUserData, user);
  }
  // 编辑用户
  private editUser() {
    this.form.validate((flag: boolean) => {
      if (flag) {
        updateUsers(this.editUserData.id, this.editUserData)
          .then((response: any) => {
            if (response.status === 200 && response.data.code === 200) {
              // 修改成功，关闭弹框
              this.editUserDialogVisible = false;
              const idx = this.tableData.findIndex((obj: any) => {
                return obj.id === this.editUserData.id;
              });
              // 直接给数组的某一个元素赋值，不能够触发vue界面更新
              this.$set(this.tableData, idx, this.editUserData);
              (this as any).$message.success("更新用户成功");
            } else {
              // 添加失败
              (this as any).$message.error(response.data.msg);
            }
          })
          .catch((error: any) => {
            // 添加失败
            (this as any).$message.error(error.response.data.msg);
          });
      } else {
        (this as any).$message.error("更新用户信息失败，请检查表单！");
      }
    });
  }

  /* =====================================other======================================= */
  // 清除缓存中保存的默认路径
  private restDefaultActivePath() {
    sessionStorage.removeItem("activePath");
  }
  // 重置表单
  @Ref() readonly form!: ElForm;
  private closeDialog() {
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
.Users {
  > .el-card {
    margin-top: 20px;
  }
  .box-card-header {
  }
  .box-card-main {
  }
  .box-card-botoom {
    margin-top: 15px;
    background-color: #fff;
  }
  .add-users,
  .edit-users {
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
  }
}
</style>
