import createHttp from "./BaseService";

const http = createHttp(true);

export const getCurrentUser = () => http.get("/users/me");

export const getDetail = (id) => http.get(`/users/${id}`).then((res) => res); 
// esto lo tendria que usar en mi perfil

export const createUser = (body) =>
  http.post("/users", body).then((res) => res); // esto lo use en el register

export const updateUser = (id, body) =>
  http.put(`/users/${id}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    }}).then((res) => res);

export const deleteUser = (id) =>
  http.delete(`/users/${id}`).then((res) => res);

export const getLikes = () => http.get('/like')