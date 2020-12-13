import Network from "./network";

// 用户注册相关
export const registerUser = (data: {}) => Network.post("/register", data); // 普通注册
export const sendCode2Email = (data: {}) => Network.get("/emailcode", data); // email注册
export const sendCode2Phone = (data: {}) => Network.get("/smscode", data); // 手机号注册
export const loginUser = (data: {}) => Network.post("/login", data); // 用户登录

// 用户管理相关
export const getUsers = () => Network.get("/api/v1/users"); // 获取所有用户
export const createUsers = (data: {}) => Network.post("/api/v1/users", data); // 创建新用户
export const deleteUsers = (id: string) =>
  Network.delete(`/api/v1/users/${id}`); // 删除用户
export const updateUsers = (id: string, data: {}) =>
  Network.put(`/api/v1/users/${id}`, data);
