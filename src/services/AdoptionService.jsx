import createHttp from "./BaseService";

const authenticatedHttp = createHttp(true)
const unauthenticatedHttp = createHttp(false)

export const getAdoptions = () => authenticatedHttp.get("/adoptions").then((res) => res);

export const getAdoptionsDetail = (id) => unauthenticatedHttp.get(`/adoptions/${id}`).then((res) => res);

export const getLikedAdoptions = (id) => unauthenticatedHttp.get(`/like/${id}`).then((res) => res);

export const createAdoption = (body) =>
authenticatedHttp.post("adoptions/create", body).then((res) => res);

export const updateAdoption = (id, body) =>
authenticatedHttp.post(`/adoptions/${id}`, body).then((res) => res);

export const deleteAdoption = (id) =>
authenticatedHttp.post(`/adoptions/${id}`).then((res) => res);

export const likeAdoptions = (id) =>
authenticatedHttp.post(`/like/${id}`).then((res) => res);



