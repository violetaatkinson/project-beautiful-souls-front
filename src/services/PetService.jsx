import createHttp from "./BaseService";

const authenticatedHttp = createHttp(true);
const unauthenticatedHttp = createHttp(false);

export const getPets = () => authenticatedHttp.get("/adoptions").then((res) => res);

export const getMyPets = () => authenticatedHttp.get("/myadoptions").then((res) => res);

export const getPetDetail = (id) => unauthenticatedHttp.get(`/adoptions/${id}`).then((res) => res);

export const getLikedPets = () => authenticatedHttp.get(`/like`).then((res) => res);

export const createPet = (body) =>
  authenticatedHttp.post("/adoptions/create", body).then((res) => res);

export const updatePet = (id, body) =>
  authenticatedHttp.post(`/adoptions/${id}`, body).then((res) => res);

export const deletePet = (id) =>
  authenticatedHttp.delete(`/adoptions/${id}`).then((res) => res);

export const likePet = (id) =>
  authenticatedHttp.post(`/like/${id}`).then((res) => res);

export const dislikePet = (id) =>
  authenticatedHttp.post(`/dislike/${id}`).then((res) => res);