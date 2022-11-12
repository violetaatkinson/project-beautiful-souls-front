import createHttp from "./BaseService";

const authenticatedHttp = createHttp(true)
const unauthenticatedHttp = createHttp(false)

export const getCurrentUser = () => authenticatedHttp.get("/users/me");

export const getDetail = (id) => unauthenticatedHttp.get(`/users/${id}`).then((res) => res); 
// esto lo tendria que usar en mi perfil

export const createUser = (body) =>
authenticatedHttp.post("/users", body).then((res) => res); // esto lo use en el register

export const updateUser = (id, body) =>
authenticatedHttp.put(`/users/${id}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    }}).then((res) => res);

export const deleteUser = (id) =>
authenticatedHttp.delete(`/users/${id}/delete`).then((res) => res);

export const getLikes = () => authenticatedHttp.get('/like')

export const getUsers = () => authenticatedHttp.get('/users')
export const getUsersLiked = () => authenticatedHttp.get('/users/liked')