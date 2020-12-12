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
            <el-button type="primary" @click="addUser">添加用户</el-button>
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
            <template>
              <el-button type="primary" icon="el-icon-edit"></el-button>
              <el-button type="danger" icon="el-icon-delete"></el-button>
              <el-button type="warning" icon="el-icon-setting"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 底部分页区域 -->
      <div class="box-card-botoom">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Users",
  components: {}
})
export default class Users extends Vue {
  // 清除缓存中保存的默认路径
  private restDefaultActivePath() {
    sessionStorage.removeItem("activePath");
  }
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
  // 导出用户信息
  private exportUserInfo() {
    0;
  }
  // 添加用户
  private addUser() {
    0;
  }
  // 导入用户
  private importUsers() {
    0;
  }

  // 用户数据
  private tableData = [
    {
      username: "wangxq",
      email: "382024104@qq.com",
      phone: "18723720471",
      roleName: "超级管理员",
      avatarUrl: "",
      userState: true
    },
    {
      username: "wxq",
      email: "wxq@wangxiaoquan.com",
      phone: "",
      roleName: "普通用户",
      avatarUrl: "",
      userState: false
    }
  ];
}
</script>

<style lang="scss" scope>
.Users {
  .el-card {
    margin-top: 20px;
  }
  .box-card-header {
  }
  .box-card-main {
  }
  .box-card-botoom {
    margin-top: 20px;
  }
}
</style>
