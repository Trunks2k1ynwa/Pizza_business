import http from "./http.js";

export const Login = (data) => {
  return http.post("accounts/login", { data });
};
