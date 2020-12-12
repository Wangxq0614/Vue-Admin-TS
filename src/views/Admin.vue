<template>
  <div class="Admin">
    <el-container>
      <el-header>
        <a class="header-left" @click="toggleIsCollapse">
          <img src="../assets/images/logo.png" alt="" />
        </a>
        <div class="header-right">
          <img class="user-icon" src="../assets/images/login-bg.jpg" />
          <p class="user-name">用户名</p>
          <el-button class="user-out" @click="loginOut">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <!-- 垂直侧边栏 -->
          <el-menu
            background-color="#fff"
            text-color="#333"
            active-text-color="#409eff"
            :router="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-active="defaultActivePath"
          >
            <!-- 一级菜单 -->
            <el-submenu
              v-for="item in menus"
              :key="item.menuName"
              :index="item.menuName"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.menuName }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item-group>
                <el-menu-item
                  :index="subItem.path"
                  v-for="subItem in item.children"
                  :key="subItem.menuName"
                  @click="changeDefaultActivePath(subItem.path)"
                >
                  <template slot="title">
                    <i :class="subItem.icon"></i>
                    <span>{{ subItem.menuName }}</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <!-- 路由出口 -->
            <router-view></router-view>
          </el-main>
          <el-footer>
            <p>Vue-TypeScript后台管理系统</p>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Cookies from "js-cookie";

@Component({
  name: "Admin",
  components: {}
})
export default class Admin extends Vue {
  // 菜单栏所需数据
  private menus = [
    {
      menuName: "用户管理",
      path: "",
      icon: "el-icon-setting",
      children: [
        {
          menuName: "用户列表",
          path: "/users",
          icon: "el-icon-user",
          children: []
        }
      ]
    },
    {
      menuName: "权限管理",
      path: "",
      icon: "el-icon-collection",
      children: [
        {
          menuName: "角色列表",
          path: "/roles",
          icon: "el-icon-view",
          children: []
        },
        {
          menuName: "权限列表",
          path: "/rights",
          icon: "el-icon-unlock",
          children: []
        }
      ]
    }
  ];
  // 左侧菜单栏是否需要折叠
  private isCollapse = false;
  private toggleIsCollapse() {
    this.isCollapse = !this.isCollapse;
  }
  // 默认页面 / 刷新之后展示上一次页面
  private defaultActivePath = "";
  private changeDefaultActivePath(path: string) {
    this.defaultActivePath = path;
    sessionStorage.setItem("activePath", path);
  }
  created(): void {
    const path = sessionStorage.getItem("activePath");
    this.defaultActivePath = path ? path : "";
  }
  // 退出登录
  private loginOut() {
    Cookies.remove("token");
    this.$router.push("/login");
  }
}
</script>

<style lang="scss" scope>
.Admin {
  width: 100vw;
  height: 100vh;
  .el-container {
    width: 100%;
    height: 100%;
    background-color: #f1f1f1;
  }
  .el-header {
    height: 80px !important;
    background-color: #409eff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left {
      img {
        min-width: 171px;
      }
    }
    .header-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user-icon {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
      .user-name {
        margin: 0 15px;
        color: #333;
      }
      .user-out {
        padding: 10px;
      }
    }
  }
  .el-aside {
    transition: all 0.1s linear;
    background-color: #fff;
  }
  .el-main {
    background-color: #f1f1f1;
  }
  .el-footer {
    height: 64px !important;
    line-height: 64px;
    background-color: #fff;
    align-items: center;
    > p {
      text-align: center;
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
