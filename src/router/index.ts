import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Cookies from "js-cookie";

Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        name: "Welcome",
        component: () => import("../components/admin/Welcome.vue"),
      },
      {
        path: "/users",
        name: "Users",
        component: () => import("../components/admin/Users.vue"),
      },
      {
        path: "/roles",
        name: "Roles",
        component: () => import("../components/admin/Roles.vue"),
      },
      {
        path: "/rights",
        name: "Rights",
        component: () => import("../components/admin/Rights.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// 添加路由守卫，实现权限控制
router.beforeEach((to, from, next) => {
  // 当用户访问login或register页面时，放行
  if (to.path === "/login" || to.path === "/register") {
    return next();
  }
  // 获取登录状态
  // const token = sessionStorage.getItem("userInfo");
  const token = Cookies.get("token");
  console.log(token);

  if (!token) {
    return next("/login");
  } else {
    next();
  }
});
export default router;
