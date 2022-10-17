import http from "./BaseService";

export const login = (body) =>
  http.post("/login", body).then((res) => res);