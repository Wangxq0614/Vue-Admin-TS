import Network from "./network";

export const registerUser = (data: {}) => Network.post("/register", data); // 普通注册
export const sendCode2Email = (data: {}) => Network.get("/emailcode", data); // email注册
export const sendCode2Phone = (data: {}) => Network.get("/smscode", data); // 手机号注册
