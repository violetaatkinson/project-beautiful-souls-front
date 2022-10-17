import http from "./BaseService";

export const getAdoptions = () => http.get("/adoptions").then((res) => res);

export const getAdoptionsDetail = (id) => http.get(`/adoptions/${id}`).then((res) => res);

export const createAdoption = (body) =>
  http.post("adoptions/create", body).then((res) => res);

export const updateAdoption = (id, body) =>
  http.post(`/adoptions/${id}`, body).then((res) => res);

export const deleteAdoption = (id) =>
  http.post(`/adoptions/${id}`).then((res) => res);